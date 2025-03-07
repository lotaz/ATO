import axios, { AxiosError, AxiosResponse } from 'axios';
import { enqueueSnackbar } from 'notistack';

const BASE_URL = `https://localhost:8081/api`;

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL, // Your base API URL
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add Bearer token from sessionStorage to Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token'); // Retrieve token from sessionStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response handling (optional)
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Handle token expiration or other errors
    if (error.response?.status === 401) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');

      enqueueSnackbar('Mã truy cập hết hạn vui lòng đăng nhập lại');
      // Handle token refresh logic here, if needed
      console.log('Token expired, need to refresh');
    }
    return Promise.reject(error);
  }
);

// Function to make GET request
const get = async <T>(url: string, params?: Record<string, any>): Promise<AxiosResponse<T>> => {
  try {
    const response = await axiosInstance.get<T>(url, { params });
    return response;
  } catch (error) {
    throw error;
  }
};

// Function to make POST request
const post = async <T>(url: string, data: Record<string, any>): Promise<AxiosResponse<T>> => {
  try {
    const response = await axiosInstance.post<T>(url, data);
    return response;
  } catch (error) {
    throw error;
  }
};

// Function to manually set the token in sessionStorage
const setToken = (token: string) => {
  sessionStorage.setItem('token', token); // Store the token in sessionStorage
};

// Function to clear the token
const clearToken = () => {
  sessionStorage.removeItem('token'); // Clear the token from sessionStorage
};

export { clearToken, get, post, setToken };
