import apiInstance from "../../config/axios";


// Create a contact
export const createContact = async (formData) => {
  try {
    const response = await apiInstance.post("/contact", formData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating contact:", error);
    throw error;
  }
};


export const getAllContact = async () => {
  try {
    const response = await apiInstance.get('/contact');
    return response.data;
  } catch (error) {
    console.error("Error fetching contact:", error);
    throw error;
  }
};

// Get single contact by ID
export const getContactById = async (id) => {
  try {
    const response = await apiInstance.get(`/contact/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching contact ${id}:`, error);
    throw error;
  }
};

// Update a contact by ID
export const updateContactApi = async (id, formData) => {
  try {
    const response = await apiInstance.put(`/contact/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating contact ${id}:`, error);
    throw error;
  }
};

// Delete a contact by ID
export const deleteContactApi = async (id) => {
  try {
    const response = await apiInstance.delete(`/contact/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting contact ${id}:`, error);
    throw error;
  }
};