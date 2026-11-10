import { File } from "node:buffer";

import { randomUUID } from "node:crypto";
import { readFile, rename, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { Readable } from "node:stream";

const directory = fileURLToPath(new URL("../public/house-hunt-data/", import.meta.url));
const indexFile = join(directory, "listings.json");
const conflict = "房源已在其他窗口更新或删除，请刷新后重试。";
const maxBody = 40_016_384;
let pending = Promise.resolve();

function withListings(operation) {
  const result = pending.then(async () => operation(JSON.parse(await readFile(indexFile, "utf8"))));
  pending = result.catch(() => {});
  return result;
}

async function writeListings(items) {
  const temporary = indexFile + "." + randomUUID() + ".tmp";
  try {
    await writeFile(temporary, JSON.stringify(items, null, 2) + "\n", { flag: "wx" });
    await rename(temporary, indexFile);
  } finally {
    await rm(temporary, { force: true }).catch(console.warn);
  }
}

async function removeVideo(name) {
  if (typeof name === "string" && /^tour-[a-f0-9-]{36}\.(mp4|mov|webm)$/.test(name)) {
    await rm(join(directory, name), { force: true }).catch(console.warn);
  }
}

async function saveListing(form, rating, existing) {
  const location = String(form.get("location") ?? "").trim();
  const wechat = String(form.get("wechat") ?? "").trim();
  const tags = [...new Set(String(form.get("tags") ?? "").split(/[,，、]/).map((tag) => tag.trim()).filter(Boolean))];
  const rawPrice = form.get("price");
  const price = rawPrice === "" ? null : Number(rawPrice);
  const file = form.get("video");
  if (!location || tags.length > 12) throw new Error("请输入房源位置，最多可添加 12 个标签。");
  if (price !== null && (!Number.isFinite(price) || price < 0 || price > 9999999999)) {
    throw new Error("请输入有效的价格。");
  }
  if (file && !/\.(mp4|mov|webm)$/i.test(file.name)) throw new Error("请选择 MP4、MOV 或 WebM 视频。");
  if (file && (!file.size || file.size > 40_000_000)) throw new Error("请选择不超过 40 MB 的有效视频。");

  const unit = form.get("unit");
  if (!["month", "total"].includes(unit) || !Number.isInteger(rating) || rating < 0 || rating > 5
    || location.length > 150 || wechat.length > 100 || tags.join("、").length > 240
    || (file !== null && !(file instanceof File))) throw new Error("请检查房源信息。");
  return withListings(async (items) => {
    const current = existing && items.find((item) => item.id === existing.id);
    if (existing && current?.version !== existing.version) throw new Error(conflict);

    const newVideo = file ? "tour-" + randomUUID() + "." + file.name.split(".").pop().toLowerCase() : null;
    const video = newVideo ?? (form.has("removeVideo") ? null : current?.video ?? null);
    const item = {
      id: current?.id ?? randomUUID(),
      location, wechat, price, unit: form.get("unit"), tags, rating, video,
      version: randomUUID(),
      updatedAt: new Date().toISOString(),
    };
    try {
      if (newVideo) await writeFile(join(directory, newVideo), new Uint8Array(await file.arrayBuffer()), { flag: "wx" });
      const updated = [item, ...items.filter((entry) => entry.id !== item.id)];
      await writeListings(updated);
    } catch (error) {
      await removeVideo(newVideo);
      throw error;
    }
    if (current?.video !== video && !items.some((entry) => entry.id !== item.id && entry.video === current?.video)) {
      await removeVideo(current?.video);
    }
    return item;
  });
}

function deleteListing(item) {
  return withListings(async (items) => {
    const current = items.find((entry) => entry.id === item.id);
    if (current?.version !== item.version) throw new Error(conflict);
    const remaining = items.filter((entry) => entry.id !== item.id);
    await writeListings(remaining);
    if (!remaining.some((entry) => entry.video === current.video)) await removeVideo(current.video);
  });
}


async function* limitedBody(request) {
  let size = 0;
  for await (const chunk of request.iterator({ destroyOnReturn: false })) {
    size += chunk.length;
    if (size > maxBody) throw new Error("视频超过 40 MB。");
    yield chunk;
  }
}

export default function houseHuntApi() {
  return {
    name: "binwind-house-hunt",
    configureServer(server) {
      server.middlewares.use("/__house-hunt", async (req, res) => {
        const host = req.headers.host ?? "";
        const loopback = ["127.0.0.1", "::1", "::ffff:127.0.0.1"].includes(req.socket.remoteAddress);
        function send(status, body) {
          res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
          res.end(JSON.stringify(body));
        }
        if (!loopback || !/^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/.test(host)) {
          return send(403, { error: "请在本机打开开发页面。" });
        }
        if (req.method === "GET") return send(200, { editable: true });
        if (req.method !== "POST" || req.headers.origin !== "http://" + host) {
          return send(403, { error: "请从本地找房页面操作。" });
        }
        try {
          const request = new Request("http://" + host, {
            method: "POST",
            headers: { "Content-Type": req.headers["content-type"] ?? "" },
            body: Readable.toWeb(Readable.from(limitedBody(req))),
            duplex: "half",
          });
          const form = await request.formData();
          const id = form.get("id");
          const existing = id ? { id, version: form.get("version") } : null;
          if (form.get("action") === "delete" && existing) {
            await deleteListing(existing);
            return send(200, { ok: true });
          }
          if (form.get("action") !== "save") return send(400, { error: "操作无效。" });
          return send(200, await saveListing(form, Number(form.get("rating")), existing));
        } catch (error) {
          send(error.message === conflict ? 409 : 400, { error: error.code ? "无法写入仓库文件。" : error.message });
        }
      });
    },
  };
}
