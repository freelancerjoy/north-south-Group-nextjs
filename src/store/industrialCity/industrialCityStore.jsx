import { create } from "zustand";
import { createIndustrialCity, deleteIndustrialCityApi, getIndustrialCity, updateIndustrialCityApi } from "./industrialCityApi";

export const useIndustrialCityStore = create((set, get) => ({
  industrialCities: [],
  industrialCity: null,
  isLoading: false,
  error: null,

  // Add a new IndustrialCity
  addIndustrialCity: async (formData) => {
    set({ isLoading: true });
    try {
      const res = await createIndustrialCity(formData); // removed double await
      const created = res?.data;
      set((state) => ({
        industrialCities: [...state.industrialCities, created],
        industrialCity: Array.isArray(state.industrialCity)
          ? [...state.industrialCity, created]
          : [created],
        isLoading: false,
      }));
      return created;
    } catch (err) {
      console.error(err);
      set({ isLoading: false });
      throw err;
    }
  },

  // Load all industrialCities
  loadIndustrialCity: async () => {
    set({ isLoading: true });
    try {
      const res = await getIndustrialCity();
      set({
        industrialCity: Array.isArray(res?.data) ? res.data : [],
        isLoading: false,
      });
    } catch (err) {
      console.error("Failed to load industrial", err);
      set({ industrialCities: [], isLoading: false });
    }
  },

  // Update IndustrialCity
  updateIndustrialCity: async (id, formData) => {
    set({ isLoading: true });
    try {
      const { data } = await updateIndustrialCityApi(id, formData);
      const updated = data?.data || data;
      set((state) => ({
        industrialCities: state.industrialCities.map((proj) =>
          proj._id === id ? updated : proj
        ),
        industrialCity: Array.isArray(state.industrialCity)
          ? state.industrialCity.map((proj) => (proj._id === id ? updated : proj))
          : state.industrialCity,
        isLoading: false,
      }));
      return updated;
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },

  // Delete IndustrialCity
  deleteIndustrialCity: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await deleteIndustrialCityApi(id);
      set((state) => ({
        industrialCities: get().industrialCities.filter((p) => p._id !== id),
        industrialCity: Array.isArray(state.industrialCity)
          ? state.industrialCity.filter((p) => p._id !== id)
          : state.industrialCity,
        isLoading: false,
      }));
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
