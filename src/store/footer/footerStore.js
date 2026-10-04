import { create } from "zustand";
import { getFooterApi, updateFooterApi } from "./footerApi";

let request = null;
let fetchedAt = 0;
const CACHE_TTL = 60 * 1000;

export const useFooterStore = create((set, get) => ({
  footer: null,
  isLoading: false,
  loadFooter: async (force = false) => {
    if (!force && get().footer && Date.now() - fetchedAt < CACHE_TTL) return get().footer;
    if (request) return request;
    set({ isLoading: true });
    request = getFooterApi().then((res) => {
      set({ footer: res.data, isLoading: false });
      fetchedAt = Date.now();
      return res.data;
    }).catch((error) => {
      set({ isLoading: false });
      throw error;
    }).finally(() => { request = null; });
    return request;
  },
  updateFooter: async (data) => {
    set({ isLoading: true });
    try {
      const res = await updateFooterApi(data);
      set({ footer: res.data, isLoading: false });
      fetchedAt = Date.now();
      return res.data;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));
