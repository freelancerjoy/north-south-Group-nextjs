import apiInstance from "../../config/axios";


// Create a SquareCity
export const createSquareCity = async (formData) => {
  try {
    const response = await apiInstance.post("/squareCity", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating Square City:", error);
    throw error;
  }
};


export const getSquareCity = async () => {
  try {
    const response = await apiInstance.get('/squareCity');
    return response.data;
  } catch (error) {
    console.error("Error fetching green city:", error);
    throw error;
  }
};


// Update a square City by ID
export const updateSquareCityApi = async (id, formData) => {
  try {
    const response = await apiInstance.put(`/squareCity/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating Square City ${id}:`, error);
    throw error;
  }
};

// Delete a SquareCity by ID
export const deleteSquareCityApi = async (id) => {
  try {
    const response = await apiInstance.delete(`/squareCity/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting Square City ${id}:`, error);
    throw error;
  }
};