import { create } from "zustand";
import { toast } from "react-toastify";
import apiInstance from "../../config/axios";

const unwrap = (response) => response.data?.data ?? response.data;
const CACHE_TTL = 5 * 60 * 1000;
let menuRequest = null;
let menuFetchedAt = 0;
let menuLoaded = false;

const getSortOrder = (item) => {
  const sortOrder = Number(item?.sortOrder);
  return Number.isFinite(sortOrder) ? sortOrder : Number.MAX_SAFE_INTEGER;
};

export const sortMenuItems = (items = []) =>
  [...items].sort((a, b) => {
    const orderDifference = getSortOrder(a) - getSortOrder(b);
    if (orderDifference !== 0) return orderDifference;
    return String(a?.label || "").localeCompare(String(b?.label || ""));
  });

export const useMenuStore = create((set, get) => ({
  concernMenuItems: [],
  isLoading: false,
  error: null,

  loadConcernMenuItems: async (force = false) => {
    const state = get();
    const hasFreshCache =
      !force && menuLoaded && Date.now() - menuFetchedAt < CACHE_TTL;

    if (hasFreshCache) return state.concernMenuItems;
    if (menuRequest) return menuRequest;

    set({ isLoading: true, error: null });

    menuRequest = (async () => {
      const response = await apiInstance.get("/menu/concerns");
      const items = sortMenuItems(unwrap(response));
      set({ concernMenuItems: items, isLoading: false });
      menuFetchedAt = Date.now();
      menuLoaded = true;
      return items;
    })();

    try {
      return await menuRequest;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      return [];
    } finally {
      menuRequest = null;
    }
  },

  saveConcernMenuItems: async (orderedItems) => {
    const previousItems = get().concernMenuItems;
    const nextItems = orderedItems.map((item, index) => ({
      ...item,
      sortOrder: index + 1,
    }));

    set({ concernMenuItems: nextItems, isLoading: true, error: null });

    try {
      const response = await apiInstance.patch("/menu/concerns", {
        items: nextItems.map((item) => ({
          id: item._id,
          sortOrder: item.sortOrder,
          isVisible: item.isVisible !== false,
        })),
      });
      const items = sortMenuItems(unwrap(response));
      set({ concernMenuItems: items, isLoading: false });
      menuFetchedAt = Date.now();
      menuLoaded = true;
      toast.success("Menu order updated successfully!");
      return items;
    } catch (err) {
      set({ concernMenuItems: previousItems, error: err.message, isLoading: false });
      toast.error(err?.response?.data?.message || "Failed to update menu order.");
      throw err;
    }
  },
}));
