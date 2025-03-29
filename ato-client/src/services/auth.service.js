import { post } from "helpers/axios-helper";

const AUTH_API_URL = "/auth"; // Adjust this to match your API endpoint

const authService = {
  async login(loginDTO) {
    const response = await post(`${AUTH_API_URL}/login`, loginDTO);
    console.log(response.data);

    if (response.data.bear) {
      localStorage.setItem("jwt_token", response.data.bear);
    }

    return response.data;
  },

  logout() {
    localStorage.removeItem("jwt_token");
  },

  getCurrentToken() {
    return localStorage.getItem("jwt_token");
  },
};

export default authService;
