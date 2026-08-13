import { create } from "zustand";
import { createReview, deleteReviewApi, getAllReview, getReviewById, updateReviewApi } from "./reviewApi";

export const useReviewStore = create((set) => ({
  reviews: [],
  review: null,
  isLoading: false,

  // Add a new reviews
  addReviews: async (formData) => {
    set({ isLoading: true });
    try {
      const res = await await createReview(formData);
      // Update the store with the new reviews
      set((state) => ({
        reviews: [...state.reviews, res.data.data],
        isLoading: false,
      }));

      return res.data.data;
    } catch (err) {
      console.error(err);
      set({ isLoading: false });
      throw err;
    }
  },

  loadReviews: async () => {
    set({ isLoading: true });

    try {
      const res = await getAllReview();

      set({
        reviews: Array.isArray(res?.data) ? res.data : [],
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to load reviews", error);
      set({ reviews: [], isLoading: false });
    }
  },

// Update reviews
  updateReviews: async (id, formData) => {
    set({ isLoading: true });
    try {
      const { data } = await updateReviewApi(id, formData);

      // Update store: replace the updated reviews
      set((state) => ({
        reviews: state.reviews.map((proj) =>
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

   // Delete a reviews
  deleteReview: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await deleteReviewApi(id);
      // Remove the deleted reviews from state
      set({ reviews: get().reviews.filter((p) => p._id !== id), isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },
  
   // Load single reviews by ID
  loadReviewDetails: async (id) => {
    set({ isLoading: true });
    try {
      const res = await getReviewById(id); // fetch from backend
      set({ reviews: res.data, isLoading: false });
    } catch (err) {
      console.error(err);
      set({ isLoading: false, reviews: null });
    }
  },

   clearError: () => set({ error: null }),
      clearMessage: () => set({ message: "" }),
}));
