import { create } from "zustand";
import { defaultHomeContent, mergeHomeContent } from "../../pages/home/defaultHomeContent";
import { getHomeContentApi, updateHomeContentApi } from "./homeContentApi";

let request = null;
let fetchedAt = 0;
const CACHE_TTL = 60 * 1000;

export const useHomeContentStore = create((set, get) => ({
  content: defaultHomeContent,
  isLoading: false,
  loadHomeContent: async (force = false) => {
    if (!force && fetchedAt && Date.now() - fetchedAt < CACHE_TTL) return get().content;
    if (request) return request;
    set({ isLoading: true });
    request = getHomeContentApi()
      .then((response) => {
        const content = mergeHomeContent(response?.data?.content);
        set({ content, isLoading: false });
        fetchedAt = Date.now();
        return content;
      })
      .catch(() => {
        set({ content: get().content || defaultHomeContent, isLoading: false });
        return get().content;
      })
      .finally(() => { request = null; });
    return request;
  },
  updateHomeContent: async (content) => {
    set({ isLoading: true });
    try {
      const response = await updateHomeContentApi(content);
      const next = mergeHomeContent(response?.data?.content);
      set({ content: next, isLoading: false });
      fetchedAt = Date.now();
      return next;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));
