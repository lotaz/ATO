import axios from "axios";
import { API_URLs } from "constants/api-url";
import { get } from "helpers/axios-helper";
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

const getNavigation = async () => {
  const response = await axiosInstance.get("/api/health-beauty/navigation");
  return response.data;
};

const getTopNewProducts = async () => {
  try {
    const response = await axiosInstance.get(API_URLs.PRODUCT.LIST);
    return response.data;
  } catch (error) {
    return [];
  }
};

const getProducts = async () => {
  try {
    const response = await axiosInstance.get(API_URLs.PRODUCT.LIST);
    return response.data;
  } catch (error) {
    return [];
  }
};

const getServices = async () => {
  try {
    const response = await axiosInstance.get("/api/health-beauty/services");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getMainCarousel = async () => {
  const response = await axiosInstance.get("/api/health-beauty/main-carousel");
  return response.data;
};
const getCategories = async () => {
  try {
    const response = await axiosInstance.get(API_URLs.COMPANY.LIST);
    return response.data;
  } catch (error) {
    return [];
  }
};

const getTestimonials = async () => {
  console.log("response", "ol");
  const response = await axios.get("/api/health-beauty/testimonials");
  return response.data;
};

const getBrands = async () => {
  const response = await axios.get("/api/health-beauty/brands");
  return response.data;
};

const getBlogs = async () => {
  try {
    const response = await axiosInstance.get(API_URLs.BLOG.LIST);

    const blogs = response.data;

    return [blogs[0], blogs[1], blogs[2]];
  } catch (error) {
    return [];
  }
};
const getBlogById = async (id) => {
  try {
    const response = await axiosInstance.get(API_URLs.BLOG.DETAILS + "/" + id);

    return response.data;
  } catch (error) {
    return {};
  }
};

export default {
  getProducts,
  getServices,
  getNavigation,
  getTopNewProducts,
  getMainCarousel,
  getCategories,
  getTestimonials,
  getBrands,
  getBlogs,
  getBlogById,
};
