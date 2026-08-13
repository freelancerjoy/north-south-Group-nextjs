import { create } from "zustand";
import { createPartners, deletePartnersApi, getAllPartners, updatePartnersApi } from "./partnersApi";

const CACHE_TTL = 5 * 60 * 1000;
let partnersRequest = null;
let partnersFetchedAt = 0;

export const usePartnerStore = create((set, get) => ({
  partners: [],
  partner: null,
  isLoading: false,

  // Add a new partners
  addPartners: async (formData) => {
    set({ isLoading: true });
    try {
      const res = await createPartners(formData);
      // Update the store with the partners
      set((state) => ({
        partners: [...state.partners, res.data],
        isLoading: false,
      }));
      partnersFetchedAt = Date.now();

      return res.data;
    } catch (err) {
      console.error(err);
      set({ isLoading: false });
      throw err;
    }
  },

  loadPartners: async (force = false) => {
    const state = get();
    const hasFreshCache =
      !force &&
      Array.isArray(state.partners) &&
      state.partners.length > 0 &&
      Date.now() - partnersFetchedAt < CACHE_TTL;

    if (hasFreshCache) return state.partners;
    if (partnersRequest) return partnersRequest;

    set({ isLoading: true });

    partnersRequest = (async () => {
      const res = await getAllPartners();
      const partners = Array.isArray(res?.data) ? res.data : [];

      set({
        partners,
        isLoading: false,
      });
      partnersFetchedAt = Date.now();
      return partners;
    })();

    try {
      return await partnersRequest;
    } catch (error) {
      console.error("Failed to load partners", error);
      set({ partners: [], isLoading: false });
      return [];
    } finally {
      partnersRequest = null;
    }
  },

// Update partners
  updatePartners: async (id, formData) => {
    set({ isLoading: true });
    try {
      const { data } = await updatePartnersApi(id, formData);

      // Update store: replace the updated partners
      set((state) => ({
        partners: state.partners.map((proj) =>
          proj._id === id ? data : proj
        ),
        isLoading: false,
      }));
      partnersFetchedAt = Date.now();

      return data;
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },

   // Delete a partners
  deletePartners: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await deletePartnersApi(id);
      // Remove the deleted partners from state
      set({ partners: get().partners.filter((p) => p._id !== id), isLoading: false });
      partnersFetchedAt = Date.now();
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },
  
   clearError: () => set({ error: null }),
      clearMessage: () => set({ message: "" }),
}));
