import { reactive } from "vue";

const STORAGE_KEY = "redmit-digital-cart";
function readSavedCart() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed.filter(item => item && item.id && item.type) : [];
  } catch {
    return [];
  }
}
const state = reactive({ items: readSavedCart() });
function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
}
export function useDigitalCart() {
  function add(item, type) {
    const id = item?.id;
    if (!id) return false;
    const normalizedType = type || item.cartType;
    if (!["DIGITAL_PRODUCT", "DIGITAL_ACCESS", "DIGITAL_ASSET", "DIGITAL_GROWTH", "DIGITAL_DV_APPLICATION"].includes(normalizedType)) return false;
    const existing = state.items.find(entry => entry.id === String(id) && entry.type === normalizedType);
    if (existing) existing.quantity += 1;
    else state.items.push({
      id: String(id),
      type: normalizedType,
      quantity: 1,
      name: item.name || item.title || "Digital item",
      price: Number(item.price) || 0,
      currency: item.currency || "USD",
      thumbnail: typeof item.thumbnail === "string" ? item.thumbnail : (item.thumbnail?.url || item.thumbnail?.path || item.profileUrl || item.profileImage || null),
    });
    persist();
    return true;
  }
  function remove(index) {
    state.items.splice(index, 1);
    persist();
  }
  function setQuantity(index, quantity) {
    if (!state.items[index]) return;
    const value = Math.max(1, Math.floor(Number(quantity) || 1));
    state.items[index].quantity = value;
    persist();
  }
  function clear() {
    state.items.splice(0, state.items.length);
    persist();
  }
  return { items: state.items, add, remove, setQuantity, clear };
}
