import apiInstance from "../../config/axios";


// Create a new project
export const createProject = async (data) => {
  try {
    const response = await apiInstance.post("/project", data);
    return response.data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};


export const getAllProjects = async () => {
  try {
    const response = await apiInstance.get('/project');
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Get single project by ID
export const getProjectById = async (id) => {
  try {
    const response = await apiInstance.get(`/project/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching project ${id}:`, error);
    throw error;
  }
};

// Update a project by ID
export const updateProjectApi = async (id, data) => {
  try {
    const response = await apiInstance.put(`/project/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating project ${id}:`, error);
    throw error;
  }
};

// Delete a project by ID
export const deleteProjectApi = async (id) => {
  try {
    const response = await apiInstance.delete(`/project/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting project ${id}:`, error);
    throw error;
  }
};