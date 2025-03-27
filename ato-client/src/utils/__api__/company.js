import axios from "axios";
import { API_URLs } from "constants/api-url";
import { API_BASE_URL, isDevelopment } from "utils/api-config";

// Create axios instance with custom config
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  httpsAgent: isDevelopment
    ? new (require("https").Agent)({
        rejectUnauthorized: false,
      })
    : undefined,
});

export const getCompanyList = async () => {
  try {
    const response = await axiosInstance.get(API_URLs.COMPANY.LIST);
    return response.data;
  } catch (error) {
    console.error("Error fetching companies:", error);
    return [];
  }
};

export const getCompanyById = async (id) => {
  try {
    const response = await axiosInstance.get(API_URLs.COMPANY.DETAILS(id));
    return response.data;
  } catch (error) {
    console.error(`Error fetching company with id ${id}:`, error);
    throw error;
  }
};

export default {
  getCompanyList,
  getCompanyById,
};
