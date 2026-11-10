const DATABASE = "binwind-house-hunt";
const CONFLICT = "房源已在其他窗口更新或删除，请关闭窗口后重新操作。";
let database;

export function openListings() {
  if (database) return Promise.resolve();
  return new Promise((resolve, reject) => {
    if (!globalThis.indexedDB) {
      reject(new Error("当前浏览器无法使用本地存储。"));
      return;
    }
    const request = indexedDB.open(DATABASE, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      db.createObjectStore("listings", { keyPath: "id" });
      db.createObjectStore("videos");
    };
    request.onsuccess = () => {
      database = request.result;
      resolve();
    };
    request.onerror = () => reject(new Error("无法打开本地存储，请检查浏览器设置。"));
  });
}

function transact(mode, operation) {
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(["listings", "videos"], mode);
    let result;
    let failure;
    transaction.oncomplete = () => resolve(result);
    transaction.onabort = () => {
      reject(failure ?? new Error(transaction.error?.name === "QuotaExceededError"
        ? "浏览器存储空间不足，请缩小视频文件后重试。"
        : "本地存储操作失败，请重试。"));
    };
    operation(
      transaction.objectStore("listings"),
      transaction.objectStore("videos"),
      (value) => { result = value; },
      (error) => { failure = error; transaction.abort(); },
    );
  });
}

export function listListings() {
  return transact("readonly", (listings, videos, finish) => {
    const request = listings.getAll();
    request.onsuccess = () => finish(request.result.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)));
  });
}

export function getVideo(id) {
  return transact("readonly", (listings, videos, finish) => {
    const request = videos.get(id);
    request.onsuccess = () => finish(request.result);
  });
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

  const id = existing?.id ?? crypto.randomUUID();
  const removeVideo = form.has("removeVideo");
  const item = {
    id, location, wechat, price, unit: form.get("unit"), tags, rating,
    video: Boolean(file || (existing?.video && !removeVideo)),
    version: crypto.randomUUID(),
    updatedAt: new Date().toISOString(),
  };
  return transact("readwrite", (listings, videos, finish, abort) => {
    const write = () => {
      listings.put(item);
      if (file) videos.put(file, id);
      else if (removeVideo) videos.delete(id);
      finish(item);
    };
    if (!existing) {
      write();
      return;
    }
    const request = listings.get(id);
    request.onsuccess = () => {
      if (request.result?.version !== existing.version) abort(new Error(CONFLICT));
      else write();
    };
  });
}

export function deleteListing(item) {
  return transact("readwrite", (listings, videos, finish, abort) => {
    const request = listings.get(item.id);
    request.onsuccess = () => {
      if (request.result?.version !== item.version) {
        abort(new Error(CONFLICT));
        return;
      }
      listings.delete(item.id);
      videos.delete(item.id);
    };
  });
}
