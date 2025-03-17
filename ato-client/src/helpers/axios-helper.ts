import axios, { AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  },
);

export const get = <T>(url: string): Promise<AxiosResponse<T>> => {
  return axiosInstance.get<T>(url);
};

export const post = <T>(url: string, data: any): Promise<AxiosResponse<T>> => {
  return axiosInstance.post<T>(url, data);
};

export const put = <T>(url: string, data: any): Promise<AxiosResponse<T>> => {
  return axiosInstance.put<T>(url, data);
};

export const del = <T>(url: string): Promise<AxiosResponse<T>> => {
  return axiosInstance.delete<T>(url);
};
