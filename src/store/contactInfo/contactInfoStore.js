import { create } from "zustand";
import { getContactInfoApi, updateContactInfoApi } from "./contactInfoApi";

const CACHE_TTL = 5 * 60 * 1000;
let contactInfoRequest = null;
let contactInfoFetchedAt = 0;

export const useContactInfoStore = create((set, get) => ({
  contactInfo: null,
  isLoading: false,

  loadContactInfo: async (force = false) => {
    const state = get();
    const hasFreshCache =
      !force &&
      state.contactInfo &&
      Date.now() - contactInfoFetchedAt < CACHE_TTL;

    if (hasFreshCache) return state.contactInfo;
    if (contactInfoRequest) return contactInfoRequest;

    set({ isLoading: true });

    contactInfoRequest = (async () => {
      const res = await getContactInfoApi();
      set({ contactInfo: res.data, isLoading: false });
      contactInfoFetchedAt = Date.now();
      return res.data;
    })();

    try {
      return await contactInfoRequest;
    } catch (err) {
      console.error("Failed to load contact info", err);
      set({ isLoading: false });
      return null;
    } finally {
      contactInfoRequest = null;
    }
  },

  updateContactInfo: async (data) => {
    set({ isLoading: true });
    try {
      const res = await updateContactInfoApi(data);
      set({ contactInfo: res.data, isLoading: false });
      contactInfoFetchedAt = Date.now();
      return res.data;
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },
}));
