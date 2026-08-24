
import { create } from "zustand";
import apiInstance from "../../config/axios";
import { toast } from "react-toastify";

export const useHomeSliderStore = create((set, get) => ({
  slides: [],
  isLoading: false,
  
  loadSlides: async () => {
    set({ isLoading: true });
    try {
      const res = await apiInstance.get("/homeSlider");
      set({ slides: res.data?.data || [], isLoading: false });
    } catch (error) {
      console.error(error);
      set({ isLoading: false });
    }
  },

  addSlide: async (formData) => {
    set({ isLoading: true });
    try {
      const res = await apiInstance.post("/homeSlider", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Slide added successfully!");
      await get().loadSlides();
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add slide");
      set({ isLoading: false });
      throw error;
    }
  },

  updateSlide: async (id, formData) => {
    set({ isLoading: true });
    try {
      await apiInstance.put(`/homeSlider/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Slide updated successfully!");
      await get().loadSlides();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update slide");
      set({ isLoading: false });
      throw error;
    }
  },

  deleteSlide: async (id) => {
    set({ isLoading: true });
    try {
      await apiInstance.delete(`/homeSlider/${id}`);
      toast.success("Slide deleted successfully!");
      await get().loadSlides();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete slide");
      set({ isLoading: false });
      throw error;
    }
  },
}));

