import { request } from "./api.js";

const AuthService = {
  login: async (email, password) => {
    return request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
  },

  register: async (clientData) => {
    return request("/auth/register/client", {
      method: "POST",
      body: JSON.stringify(clientData)
    });
  },

  getProfile: async () => {
    return request("/auth/profile", {
      method: "GET"
    });
  }
};

export default AuthService;
