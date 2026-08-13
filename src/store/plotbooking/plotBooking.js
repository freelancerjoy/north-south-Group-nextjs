import apiInstance from "../../config/axios";

// Create a new plot booking
export const createPlotBookingApi = async (formData) => {
  try {
    const response = await apiInstance.post("/plotBooking", formData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating plot booking:", error);
    throw error;
  }
};

// Get all plot bookings (optional, admin)
export const getAllPlotBookingsApi = async () => {
  try {
    const response = await apiInstance.get("/plotBooking");
    return response.data;
  } catch (error) {
    console.error("Error fetching plot bookings:", error);
    throw error;
  }
};

// Delete a plot booking by ID
export const deletePlotBookingApi = async (id) => {
  try {
    const response = await apiInstance.delete(`/plotBooking/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting plot booking ${id}:`, error);
    throw error;
  }
};
