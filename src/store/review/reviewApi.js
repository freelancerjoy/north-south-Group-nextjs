import apiInstance from "../../config/axios";


// Create a new review
export const createReview = async (formData) => {
  try {
    const response = await apiInstance.post("/review", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};


export const getAllReview = async () => {
  try {
    const response = await apiInstance.get('/review');
    return response.data;
  } catch (error) {
    console.error("Error fetching review:", error);
    throw error;
  }
};

// Get single review by ID
export const getReviewById = async (id) => {
  try {
    const response = await apiInstance.get(`/review/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching review ${id}:`, error);
    throw error;
  }
};

// Update a review by ID
export const updateReviewApi = async (id, formData) => {
  try {
    const response = await apiInstance.put(`/review/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating review ${id}:`, error);
    throw error;
  }
};

// Delete a review by ID
export const deleteReviewApi = async (id) => {
  try {
    const response = await apiInstance.delete(`/review/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting review ${id}:`, error);
    throw error;
  }
};