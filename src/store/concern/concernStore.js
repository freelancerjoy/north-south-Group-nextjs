import { create } from "zustand";
import { toast } from "react-toastify";
import apiInstance from "../../config/axios";

const unwrap = (response) => response.data?.data ?? response.data;
const CACHE_TTL = 5 * 60 * 1000;
let concernsRequest = null;
let concernsFetchedAt = 0;
let concernsLoaded = false;

const getSortOrder = (concern) => {
  const sortOrder = Number(concern?.sortOrder);
  return Number.isFinite(sortOrder) ? sortOrder : Number.MAX_SAFE_INTEGER;
};

export const sortConcernList = (concerns = []) =>
  [...concerns].sort((a, b) => {
    const orderDifference = getSortOrder(a) - getSortOrder(b);
    if (orderDifference !== 0) return orderDifference;
    return String(a?.title || "").localeCompare(String(b?.title || ""));
  });

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
      const concerns = sortConcernList(unwrap(response));
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
      set((state) => ({ concerns: sortConcernList([...state.concerns, concern]), isLoading: false }));
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
        concerns: sortConcernList(state.concerns.map((item) =>
          item._id === id ? concern : item
        )),
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

  reorderConcerns: async (orderedConcerns) => {
    const previousConcerns = get().concerns;
    const nextConcerns = orderedConcerns.map((concern, index) => ({
      ...concern,
      sortOrder: index + 1,
    }));

    set({ concerns: nextConcerns, isLoading: true, error: null });

    try {
      const response = await apiInstance.patch("/concern/reorder", {
        items: nextConcerns.map((concern) => ({
          id: concern._id,
          sortOrder: concern.sortOrder,
        })),
      });
      const concerns = sortConcernList(unwrap(response));
      set({ concerns, isLoading: false });
      concernsFetchedAt = Date.now();
      concernsLoaded = true;
      toast.success("Concern order updated successfully!");
      return concerns;
    } catch (err) {
      set({ concerns: previousConcerns, error: err.message, isLoading: false });
      toast.error(err?.response?.data?.message || "Failed to update concern order.");
      throw err;
    }
  },

  deleteConcern: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await apiInstance.delete(`/concern/${id}`);
      set((state) => ({
        concerns: sortConcernList(state.concerns.filter((concern) => concern._id !== id)),
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
