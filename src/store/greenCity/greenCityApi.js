import apiInstance from "../../config/axios";


// Create a new greenCity
export const createGreenCity = async (formData) => {
  try {
    const response = await apiInstance.post("/greenCity", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating greenCity:", error);
    throw error;
  }
};


export const getGreenCity = async () => {
  try {
    const response = await apiInstance.get('/greenCity');
    return response.data;
  } catch (error) {
    console.error("Error fetching green city:", error);
    throw error;
  }
};


// Update a GreenCity by ID
export const updateGreenCityApi = async (id, formData) => {
  try {
    const response = await apiInstance.put(`/greenCity/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating greenCity ${id}:`, error);
    throw error;
  }
};

// Delete a GreenCity by ID
export const deleteGreenCityApi = async (id) => {
  try {
    const response = await apiInstance.delete(`/greenCity/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting greenCity ${id}:`, error);
    throw error;
  }
};