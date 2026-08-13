import { create } from "zustand";
import { createProject, deleteProjectApi, getAllProjects, getProjectById, updateProjectApi } from "./projectApi";

const CACHE_TTL = 5 * 60 * 1000;
let projectsRequest = null;
let projectsFetchedAt = 0;

export const useProjectStore = create((set, get) => ({
  projects: [],
  project: null,
  isLoading: false,

  // Add a new project
  addProject: async (formData) => {
    set({ isLoading: true });
    try {
      const res = await await createProject(formData);
      // Update the store with the new project
      set((state) => ({
        projects: [...state.projects, res.data.data],
        isLoading: false,
      }));
      projectsFetchedAt = Date.now();

      return res.data.data; // optional: return created project
    } catch (err) {
      console.error(err);
      set({ isLoading: false });
      throw err;
    }
  },

  loadProjects: async (force = false) => {
    const state = get();
    const hasFreshCache =
      !force &&
      Array.isArray(state.projects) &&
      state.projects.length > 0 &&
      Date.now() - projectsFetchedAt < CACHE_TTL;

    if (hasFreshCache) return state.projects;
    if (projectsRequest) return projectsRequest;

    set({ isLoading: true });

    projectsRequest = (async () => {
      const res = await getAllProjects();
      const projects = Array.isArray(res?.data) ? res.data : [];

      set({
        projects,
        isLoading: false,
      });
      projectsFetchedAt = Date.now();
      return projects;
    })();

    try {
      return await projectsRequest;
    } catch (error) {
      console.error("Failed to load projects", error);
      set({ projects: [], isLoading: false });
      return [];
    } finally {
      projectsRequest = null;
    }
  },

// Update project
  updateProject: async (id, formData) => {
    set({ isLoading: true });
    try {
      const { data } = await updateProjectApi(id, formData);

      // Update store: replace the updated project
      set((state) => ({
        projects: state.projects.map((proj) =>
          proj._id === id ? data : proj
        ),
        isLoading: false,
      }));
      projectsFetchedAt = Date.now();

      return data;
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },

   // Delete a project
  deleteProject: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await deleteProjectApi(id);
      // Remove the deleted project from state
      set({ projects: get().projects.filter((p) => p._id !== id), isLoading: false });
      projectsFetchedAt = Date.now();
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },
  
   // Load single project by ID
  loadProjectDetails: async (id) => {
    set({ isLoading: true });
    try {
      const res = await getProjectById(id); // fetch from backend
      set({ projectDetails: res.data, isLoading: false });
    } catch (err) {
      console.error(err);
      set({ isLoading: false, projectDetails: null });
    }
  },

  clearProjectDetails: () => set({ projectDetails: null }),

}));
