import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const API_BASE_URL = publicRuntimeConfig.apiUrl;

export const getApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

export const isProduction = publicRuntimeConfig.environment === "production";
export const isDevelopment = publicRuntimeConfig.environment === "development";
