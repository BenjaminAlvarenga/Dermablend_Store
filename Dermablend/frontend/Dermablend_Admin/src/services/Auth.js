const BASE_URL = import.meta.env.VITE_API_URL;
const endpoint = "/auth";

const request = async (path, options = {}) => {
  const response = await fetch(`${BASE_URL}${endpoint}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || `HTTP ${response.status}`);
  }

  return data;
};

const AuthService = {
  login: (email, password) =>
    request("/login/employee", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  logout: () => request("/logout", { method: "POST" }),

  getProfile: () => request("/profile"),

  requestRecovery: (email) =>
    request("/recovery/request", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),

  resetPassword: (token, newPassword) =>
    request("/recovery/reset", {
      method: "POST",
      body: JSON.stringify({ token, newPassword }),
    }),
};

export default AuthService;
