import { create } from "zustand";
import { createSquareCity, deleteSquareCityApi, getSquareCity, updateSquareCityApi } from "./squareCityApi";

export const useSquareCityStore = create((set, get) => ({
  squareCities: [],
  squareCity: null,
  isLoading: false,

  // Add a new squareCities
  addSquareCity: async (formData) => {
    set({ isLoading: true });
    try {
      const res = await createSquareCity(formData);
      // Update the store with the new squareCities
      set((state) => ({
        squareCities: [...state.squareCities, res.data.data],
        squareCity: Array.isArray(state.squareCity)
          ? [...state.squareCity, res.data.data]
          : [res.data.data],
        isLoading: false,
      }));

      return res.data.data; // optional: return created squareCities
    } catch (err) {
      console.error(err);
      set({ isLoading: false });
      throw err;
    }
  },

  loadSquareCity: async () => {
    set({ isLoading: true });

    try {
      const res = await getSquareCity();

      set({
        squareCity: Array.isArray(res?.data) ? res.data : [],
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to load squareCities", error);
      set({ squareCities: [], squareCity: [], isLoading: false });
    }
  },

// Update squareCities
  updateSquareCity: async (id, formData) => {
    set({ isLoading: true });
    try {
      const { data } = await updateSquareCityApi(id, formData);
      const updated = data?.data || data;
      set((state) => ({
        squareCities: state.squareCities.map((proj) =>
          proj._id === id ? updated : proj
        ),
        squareCity: Array.isArray(state.squareCity)
          ? state.squareCity.map((proj) => (proj._id === id ? updated : proj))
          : state.squareCity,
        isLoading: false,
      }));
      return updated;
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },

   // Delete a squareCities
  deleteSquareCity: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await deleteSquareCityApi(id);
      // Remove the deleted squareCities from state
      set({
        squareCities: get().squareCities.filter((p) => p._id !== id),
        squareCity: Array.isArray(get().squareCity)
          ? get().squareCity.filter((p) => p._id !== id)
          : get().squareCity,
        isLoading: false,
      });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },
  


    clearError: () => set({ error: null }),
      clearMessage: () => set({ message: "" }),

}));
