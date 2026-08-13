import { create } from "zustand";
import {
  createPlotBookingApi,
  getAllPlotBookingsApi,
  deletePlotBookingApi,
} from "./plotBooking";

export const usePlotBookingStore = create((set, get) => ({
  bookings: [],
  bookingDetails: null,
  isLoading: false,
  error: null,

  // Create a new plot booking
  addBooking: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await createPlotBookingApi(formData);
      set((state) => ({
        bookings: [...state.bookings, res.booking],
        isLoading: false,
      }));
      return res.booking;
    } catch (err) {
      console.error(err);
      set({ isLoading: false, error: err.message });
      throw err;
    }
  },

  // Load all bookings
  loadBookings: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await getAllPlotBookingsApi();
      set({
        bookings: Array.isArray(res) ? res : [],
        isLoading: false,
      });
    } catch (err) {
      console.error(err);
      set({ bookings: [], isLoading: false, error: err.message });
    }
  },

  // Delete a booking
  deleteBooking: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await deletePlotBookingApi(id);
      set((state) => ({
        bookings: state.bookings.filter((b) => b._id !== id),
        isLoading: false,
      }));
    } catch (err) {
      console.error(err);
      set({ isLoading: false, error: err.message });
    }
  },

  // Clear error
  clearError: () => set({ error: null }),
}));
