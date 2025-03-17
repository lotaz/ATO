import { LoginRequest, LoginResponse } from "@/types/auth";
import { post } from "@/helpers/axios-helper";

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await post<LoginResponse>("/auth/login", data);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};
