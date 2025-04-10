import { post } from "helpers/axios-helper";

const API_URL = "/tourist/book-tour";

const tourBookingService = {
  async bookTour(bookingData) {
    try {
      const response = await post(`${API_URL}/add-book-tour`, bookingData);
      return response.data;
    } catch (error) {
      console.error("Error booking tour:", error);
      throw error;
    }
  },
};

export default tourBookingService;
