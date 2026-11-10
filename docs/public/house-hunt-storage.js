const INDEX_FILE = "listings.json";
const CONFLICT = "房源已在其他窗口更新或删除，请关闭窗口后重新操作。";
const VIDEO_NAME = /^tour-[a-f0-9-]{36}\.(mp4|mov|webm)$/;
let folder;

export async function chooseFolder() {
  if (!window.showDirectoryPicker || !navigator.locks) {
    throw new Error("当前浏览器无法直接写入文件夹。请使用电脑上的 Chrome 或 Edge。");
  }
  const selected = await window.showDirectoryPicker({ id: "binwind-house-hunt", mode: "readwrite" });
  await navigator.locks.request("binwind-house-hunt-files", async () => {
    const existing = await readListings(selected);
    if (existing === null) await writeFile(selected, INDEX_FILE, "[]\n");
  });
  folder = selected;
  return selected.name;
}

async function readListings(directory) {
  let handle;
  try {
    handle = await directory.getFileHandle(INDEX_FILE);
  } catch (error) {
    if (error.name === "NotFoundError") return null;
    throw error;
  }
  const content = await (await handle.getFile()).text();
  try {
    const items = JSON.parse(content);
    const ids = new Set();
    if (!Array.isArray(items)) throw new Error();
    for (const item of items) {
      if (!item || typeof item.id !== "string" || ids.has(item.id)
        || !["location", "wechat", "version", "updatedAt"].every((key) => typeof item[key] === "string")
        || !Array.isArray(item.tags) || !item.tags.every((tag) => typeof tag === "string")
        || (item.price !== null && !Number.isFinite(item.price))
        || !["month", "total"].includes(item.unit)
        || !Number.isInteger(item.rating) || item.rating < 0 || item.rating > 5
        || (item.video !== null && (typeof item.video !== "string" || !VIDEO_NAME.test(item.video)))) {
        throw new Error();
      }
      ids.add(item.id);
    }
    return items;
  } catch {
    throw new Error("listings.json 格式无效。请检查文件或选择其他文件夹。");
  }
}

async function writeFile(directory, name, content) {
  const handle = await directory.getFileHandle(name, { create: true });
  const stream = await handle.createWritable();
  try {
    await stream.write(content);
    await stream.close();
  } catch (error) {
    await stream.abort().catch(() => {});
    throw error;
  }
}

async function removeVideo(directory, name) {
  if (!name) return;
  try {
    await directory.removeEntry(name);
  } catch (error) {
    if (error.name !== "NotFoundError") console.warn("无法清理旧视频", name, error);
  }
}

function withListings(operation) {
  const directory = folder;
  return navigator.locks.request("binwind-house-hunt-files", async () => {
    const items = await readListings(directory);
    if (items === null) throw new Error("找不到 listings.json，请重新选择房源文件夹。");
    return operation(directory, items);
  });
}

export function listListings() {
  return withListings((directory, items) => items.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)));
}

export async function getVideo(name) {
  const handle = await folder.getFileHandle(name);
  return handle.getFile();
}

export async function saveListing(form, rating, existing) {
  const location = form.get("location").trim();
  const wechat = form.get("wechat").trim();
  const tags = [...new Set(form.get("tags").split(/[,，、]/).map((tag) => tag.trim()).filter(Boolean))];
  const rawPrice = form.get("price");
  const price = rawPrice === "" ? null : Number(rawPrice);
  const file = form.get("video");
  if (!location || tags.length > 12) throw new Error("请输入房源位置，最多可添加 12 个标签。");
  if (price !== null && (!Number.isFinite(price) || price < 0 || price > 9999999999)) {
    throw new Error("请输入有效的价格。");
  }
  if (file && !/\.(mp4|mov|webm)$/i.test(file.name)) throw new Error("请选择 MP4、MOV 或 WebM 视频。");
  if (file && (!file.size || file.size > 40_000_000)) throw new Error("请选择不超过 40 MB 的有效视频。");

  return withListings(async (directory, items) => {
    const current = existing && items.find((item) => item.id === existing.id);
    if (existing && current?.version !== existing.version) throw new Error(CONFLICT);

    const newVideo = file ? "tour-" + crypto.randomUUID() + "." + file.name.split(".").pop().toLowerCase() : null;
    const video = newVideo ?? (form.has("removeVideo") ? null : current?.video ?? null);
    const item = {
      id: current?.id ?? crypto.randomUUID(),
      location, wechat, price, unit: form.get("unit"), tags, rating, video,
      version: crypto.randomUUID(),
      updatedAt: new Date().toISOString(),
    };
    try {
      if (newVideo) await writeFile(directory, newVideo, file);
      const updated = [item, ...items.filter((entry) => entry.id !== item.id)];
      await writeFile(directory, INDEX_FILE, JSON.stringify(updated, null, 2) + "\n");
    } catch (error) {
      await removeVideo(directory, newVideo);
      throw error;
    }
    if (current?.video !== video && !items.some((entry) => entry.id !== item.id && entry.video === current?.video)) {
      await removeVideo(directory, current?.video);
    }
    return item;
  });
}

export function deleteListing(item) {
  return withListings(async (directory, items) => {
    const current = items.find((entry) => entry.id === item.id);
    if (current?.version !== item.version) throw new Error(CONFLICT);
    const remaining = items.filter((entry) => entry.id !== item.id);
    await writeFile(directory, INDEX_FILE, JSON.stringify(remaining, null, 2) + "\n");
    if (!remaining.some((entry) => entry.video === current.video)) await removeVideo(directory, current.video);
  });
}
