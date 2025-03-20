import axios from "axios";
import { API_BASE_URL } from "utils/api-config";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add auth tokens here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors here
    return Promise.reject(error);
  }
);

export const get = (url) => {
  try {
    console.log("url", url);
    return axiosInstance.get(url);
  } catch (error) {}
};

export const post = (url, data) => {
  return axiosInstance.post(url, data);
};

export const put = (url, data) => {
  return axiosInstance.put(url, data);
};

export const del = (url) => {
  return axiosInstance.delete(url);
};
