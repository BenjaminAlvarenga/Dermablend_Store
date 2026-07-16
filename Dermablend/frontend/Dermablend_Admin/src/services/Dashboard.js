const BASE_URL = import.meta.env.VITE_API_URL;
const endpoint = "/dashboard";

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

const DashboardService = {
  getStats: () => request("/stats"),
};

export default DashboardService;
