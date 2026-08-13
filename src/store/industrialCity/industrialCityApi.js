import apiInstance from "../../config/axios";


// Create a industrialCity Event
export const createIndustrialCity = async (formData) => {
  try {
    const response = await apiInstance.post("/industrialCity", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating industrial City:", error);
    throw error;
  }
};


export const getIndustrialCity = async () => {
  try {
    const response = await apiInstance.get('/industrialCity');
    return response.data;
  } catch (error) {
    console.error("Error fetching industrial city:", error);
    throw error;
  }
};


// Update a industrialCity by ID
export const updateIndustrialCityApi = async (id, formData) => {
  try {
    const response = await apiInstance.put(`/industrialCity/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating industrial City ${id}:`, error);
    throw error;
  }
};

// Delete a industrialCity by ID
export const deleteIndustrialCityApi = async (id) => {
  try {
    const response = await apiInstance.delete(`/industrialCity/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting industrial City ${id}:`, error);
    throw error;
  }
};