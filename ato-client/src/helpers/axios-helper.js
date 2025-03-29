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
    const token = localStorage.getItem("jwt_token");
    console.log("to", token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
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
    return axiosInstance.get(url);
  } catch (error) {}
};

export const post = (url, data) => {
  try {
    return axiosInstance.post(url, data);
  } catch (error) {
    console.log(error);
  }
};

export const put = (url, data) => {
  try {
    return axiosInstance.put(url, data);
  } catch (error) {
    console.log(error);
  }
};

export const del = (url) => {
  return axiosInstance.delete(url);
};
