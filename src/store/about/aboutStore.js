import { create } from "zustand";
import { getAboutContentApi, updateAboutContentApi } from "./aboutApi";

export const useAboutStore = create((set) => ({
  aboutContent: null,
  isLoading: false,

  loadAboutContent: async () => {
    set({ isLoading: true });
    try {
      const res = await getAboutContentApi();
      set({ aboutContent: res.data, isLoading: false });
      return res.data;
    } catch (err) {
      console.error("Failed to load about content", err);
      set({ isLoading: false });
      throw err;
    }
  },

  updateAboutContent: async (payload) => {
    set({ isLoading: true });
    try {
      const res = await updateAboutContentApi(payload);
      set({ aboutContent: res.data, isLoading: false });
      return res.data;
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },
}));
