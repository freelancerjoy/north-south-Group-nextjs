import { create } from "zustand";
import { toast } from "react-toastify";
import apiInstance from "../../config/axios";

const unwrap = (response) => response.data?.data ?? response.data;
const CACHE_TTL = 5 * 60 * 1000;
let concernsRequest = null;
let concernsFetchedAt = 0;
let concernsLoaded = false;

export const useConcernStore = create((set, get) => ({
  concerns: [],
  concern: null,
  isLoading: false,
  error: null,

  loadConcerns: async (force = false) => {
    const state = get();
    const hasFreshCache =
      !force && concernsLoaded && Date.now() - concernsFetchedAt < CACHE_TTL;

    if (hasFreshCache) return state.concerns;
    if (concernsRequest) return concernsRequest;

    set({ isLoading: true, error: null });

    concernsRequest = (async () => {
      const response = await apiInstance.get("/concern");
      const concerns = unwrap(response);
      set({ concerns, isLoading: false });
      concernsFetchedAt = Date.now();
      concernsLoaded = true;
      return concerns;
    })();

    try {
      return await concernsRequest;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      toast.error("Failed to load concerns.");
      return [];
    } finally {
      concernsRequest = null;
    }
  },

  loadConcernById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiInstance.get(`/concern/${id}`);
      const concern = unwrap(response);
      set({ concern, isLoading: false });
      return concern;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      toast.error("Failed to load concern details.");
      throw err;
    }
  },

  loadConcernBySlug: async (slug) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiInstance.get(`/concern/${slug}`);
      const concern = unwrap(response);
      set({ concern, isLoading: false });
      return concern;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  createConcern: async (concernData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiInstance.post("/concern", concernData);
      const concern = unwrap(response);
      set((state) => ({ concerns: [...state.concerns, concern], isLoading: false }));
      concernsFetchedAt = Date.now();
      concernsLoaded = true;
      toast.success("Concern created successfully!");
      return concern;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      toast.error(err?.response?.data?.message || "Failed to create concern.");
      throw err;
    }
  },

  updateConcern: async (id, concernData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiInstance.put(`/concern/${id}`, concernData);
      const concern = unwrap(response);
      set((state) => ({
        concerns: state.concerns.map((item) =>
          item._id === id ? concern : item
        ),
        concern,
        isLoading: false,
      }));
      concernsFetchedAt = Date.now();
      concernsLoaded = true;
      toast.success("Concern updated successfully!");
      return concern;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      toast.error(err?.response?.data?.message || "Failed to update concern.");
      throw err;
    }
  },

  deleteConcern: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await apiInstance.delete(`/concern/${id}`);
      set((state) => ({
        concerns: state.concerns.filter((concern) => concern._id !== id),
        isLoading: false,
      }));
      concernsFetchedAt = Date.now();
      concernsLoaded = true;
      toast.success("Concern deleted successfully!");
    } catch (err) {
      set({ error: err.message, isLoading: false });
      toast.error("Failed to delete concern.");
      throw err;
    }
  },
}));
