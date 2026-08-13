import apiInstance from "../../config/axios";


// Create a new News Event
export const createNewsEvent = async (formData) => {
  try {
    const response = await apiInstance.post("/newsEvent", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating News Event:", error);
    throw error;
  }
};


export const getAllNewsEvent = async () => {
  try {
    const response = await apiInstance.get('/newsEvent');
    return response.data;
  } catch (error) {
    console.error("Error fetching News Event:", error);
    throw error;
  }
};

// Get single News Event by ID
export const getNewsEventById = async (id) => {
  try {
    const response = await apiInstance.get(`/newsEvent/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching News Event ${id}:`, error);
    throw error;
  }
};

// Update a News Event by ID
export const updateNewsEventApi = async (id, formData) => {
  try {
    const response = await apiInstance.put(`/newsEvent/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating News Event ${id}:`, error);
    throw error;
  }
};

// Delete a News Event by ID
export const deleteNewsEventApi = async (id) => {
  try {
    const response = await apiInstance.delete(`/newsEvent/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting News Event ${id}:`, error);
    throw error;
  }
};