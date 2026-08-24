import { create } from "zustand";
import { createCommercialProject, getCommercialProject, updateCommercialProjectApi } from "./commercialProjectApi";

export const useCommercialProjectStore = create((set) => ({
  commercialProject: null,
  isLoading: false,
  error: null,

  // Add a new CommercialProject
  addCommercialProject: async (formData) => {
    set({ isLoading: true });
    try {
      const res = await createCommercialProject(formData);
      const created = res?.data;
      set({ commercialProject: created, isLoading: false });
      return created;
    } catch (err) {
      console.error(err);
      set({ isLoading: false, error: err.message });
      throw err;
    }
  },

  // Load CommercialProject
  loadCommercialProject: async () => {
    set({ isLoading: true });
    try {
      const res = await getCommercialProject();
      set({
        commercialProject: res?.data || null,
        isLoading: false,
      });
    } catch (err) {
      console.error("Failed to load commercial project", err);
      set({ commercialProject: null, isLoading: false, error: err.message });
    }
  },

  // Update CommercialProject
  updateCommercialProject: async (id, formData) => {
    set({ isLoading: true });
    try {
      const res = await updateCommercialProjectApi(id, formData);
      const updated = res?.data;
      set({ commercialProject: updated, isLoading: false });
      return updated;
    } catch (err) {
      console.error(err);
      set({ isLoading: false, error: err.message });
      throw err;
    }
  },

  clearError: () => set({ error: null }),
}));

