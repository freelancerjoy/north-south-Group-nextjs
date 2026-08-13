import { create } from "zustand";
import { createNewsEvent, deleteNewsEventApi, getAllNewsEvent, getNewsEventById, updateNewsEventApi } from "./newsEventApi";

export const useNewsEventsStore = create((set) => ({
  newsEvents: [],
  newsEvent: null,
  isLoading: false,

  // Add a new newsEvents
  addNewsEvent: async (formData) => {
    set({ isLoading: true });
    try {
      const res = await await createNewsEvent(formData);
      // Update the store with the new newsEvents
      set((state) => ({
        newsEvents: [...state.newsEvents, res.data.data],
        isLoading: false,
      }));

      return res.data.data; // optional: return created newsEvents
    } catch (err) {
      console.error(err);
      set({ isLoading: false });
      throw err;
    }
  },

  loadNewsEvents: async () => {
    set({ isLoading: true });

    try {
      const res = await getAllNewsEvent();

      set({
        newsEvents: Array.isArray(res?.data) ? res.data : [],
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to load NewsEvents", error);
      set({ newsEvents: [], isLoading: false });
    }
  },

// Update NewsEvents
  updateNewsEvents: async (id, formData) => {
    set({ isLoading: true });
    try {
      const { data } = await updateNewsEventApi(id, formData);

      // Update store: replace the updated NewsEvents
      set((state) => ({
        newsEvents: state.newsEvents.map((proj) =>
          proj._id === id ? data : proj
        ),
        isLoading: false,
      }));

      return data;
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },

   // Delete a NewsEvents
  deleteNewsEvent: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await deleteNewsEventApi(id);
      // Remove the deleted NewsEvents from state
      set({ newsEvents: get().newsEvents.filter((p) => p._id !== id), isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },
  
   // Load single newsEvents by ID
  loadNewsEventDetails: async (id) => {
    set({ isLoading: true });
    try {
      const res = await getNewsEventById(id); // fetch from backend
      set({ newsEventDetails: res.data, isLoading: false });
    } catch (err) {
      console.error(err);
      set({ isLoading: false, newsEventDetails: null });
    }
  },

   clearError: () => set({ error: null }),
      clearMessage: () => set({ message: "" }),
}));
