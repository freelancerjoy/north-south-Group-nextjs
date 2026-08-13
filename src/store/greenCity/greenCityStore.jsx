import { create } from "zustand";
import { createGreenCity, deleteGreenCityApi, getGreenCity, updateGreenCityApi } from "./greenCityApi";

export const useGreenCityStore = create((set, get) => ({
  greenCities: [],
  greenCity: null,
  isLoading: false,

  // Add a new newsEvents
  addGreenCity: async (formData) => {
    set({ isLoading: true });
    try {
      const res = await createGreenCity(formData);
      // Update the store with the new newsEvents
      set((state) => ({
        greenCities: [...state.greenCities, res.data.data],
        greenCity: Array.isArray(state.greenCity)
          ? [...state.greenCity, res.data.data]
          : [res.data.data],
        isLoading: false,
      }));

      return res.data.data; // optional: return created newsEvents
    } catch (err) {
      console.error(err);
      set({ isLoading: false });
      throw err;
    }
  },

  loadGreenCity: async () => {
    set({ isLoading: true });

    try {
      const res = await getGreenCity();

      set({
        greenCity: Array.isArray(res?.data) ? res.data : [],
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to load greenCities", error);
      set({ greenCities: [], greenCity: [], isLoading: false });
    }
  },

// Update greenCities
  updateGreenCity: async (id, formData) => {
    set({ isLoading: true });
    try {
      const { data } = await updateGreenCityApi(id, formData);
      const updated = data?.data || data;

      // Update store: replace the updated greenCities
      set((state) => ({
        greenCities: state.greenCities.map((proj) =>
          proj._id === id ? updated : proj
        ),
        greenCity: Array.isArray(state.greenCity)
          ? state.greenCity.map((proj) => (proj._id === id ? updated : proj))
          : state.greenCity,
        isLoading: false,
      }));

      return updated;
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },

   // Delete a greenCities
  deleteGreenCity: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await deleteGreenCityApi(id);
      // Remove the deleted greenCities from state
      set({
        greenCities: get().greenCities.filter((p) => p._id !== id),
        greenCity: Array.isArray(get().greenCity)
          ? get().greenCity.filter((p) => p._id !== id)
          : get().greenCity,
        isLoading: false,
      });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

   clearError: () => set({ error: null }),
   clearMessage: () => set({ message: "" }),
}));
