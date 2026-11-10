const api = "./__house-hunt";
const data = "./house-hunt-data/";

export async function canEdit() {
  if (!["localhost", "127.0.0.1", "[::1]"].includes(location.hostname)) return false;
  const response = await fetch(api, { cache: "no-store" });
  return response.ok && (await response.json().catch(() => null))?.editable === true;
}

export async function listListings() {
  const response = await fetch(data + "listings.json", { cache: "no-store" });
  if (!response.ok) throw new Error("无法读取 listings.json。");
  const items = await response.json();
  return items.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function getVideo(name) {
  return data + encodeURIComponent(name);
}

async function mutate(form, action, existing) {
  form.set("action", action);
  if (existing) {
    form.set("id", existing.id);
    form.set("version", existing.version);
  }
  const response = await fetch(api, { method: "POST", body: form });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error);
  return result;
}

export function saveListing(form, rating, existing) {
  form.set("rating", String(rating));
  return mutate(form, "save", existing);
}

export function deleteListing(item) {
  return mutate(new FormData(), "delete", item);
}
