import apiInstance from "../../config/axios";


// Create a new Partners
export const createPartners = async (formData) => {
  try {
    const response = await apiInstance.post("/partners", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating Partners:", error);
    throw error;
  }
};


export const getAllPartners = async () => {
  try {
    const response = await apiInstance.get('/partners');
    return response.data;
  } catch (error) {
    console.error("Error fetching Partners:", error);
    throw error;
  }
};


// Update a  Partners by ID
export const updatePartnersApi = async (id, formData) => {
  try {
    const response = await apiInstance.put(`/partners/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating Partners ${id}:`, error);
    throw error;
  }
};

// Delete aPartners by ID
export const deletePartnersApi = async (id) => {
  try {
    const response = await apiInstance.delete(`/partners/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting Partners ${id}:`, error);
    throw error;
  }
};