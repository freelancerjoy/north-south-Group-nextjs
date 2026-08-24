import apiInstance from "../../config/axios";

export const createCommercialProject = async (formData) => {
  try {
    const response = await apiInstance.post("/commercialProject", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating commercial project:", error);
    throw error;
  }
};

export const getCommercialProject = async () => {
  try {
    const response = await apiInstance.get('/commercialProject');
    return response.data;
  } catch (error) {
    console.error("Error fetching commercial project:", error);
    throw error;
  }
};

export const updateCommercialProjectApi = async (id, formData) => {
  try {
    const response = await apiInstance.put(`/commercialProject/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating commercial project ${id}:`, error);
    throw error;
  }
};

