const BASE_URL = import.meta.env.VITE_API_URL;
const endpoint = "/reviews";
const request = async (path, options = {}) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });
  if (!response.ok) {
    console.log("FETCH ERROR");
    console.log("status:", response.status);
    console.log("url:", path);
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
};

const ReviewsService = {
  get: (params = {}) => {
    const query = new URLSearchParams(params).toString();

    return request(`${endpoint}${query ? `?${query}` : ""}`);
  },

  getById: (id) => request(`${endpoint}/${id}`),

  post: (data) =>
    request(endpoint, {
      method: "POST",

      body: JSON.stringify(data),
    }),

  put: (id, data) =>
    request(`${endpoint}/${id}`, {
      method: "PUT",

      body: JSON.stringify(data),
    }),

  delete: (id) =>
    request(`${endpoint}/${id}`, {
      method: "DELETE",
    }),
};

export default ReviewsService;
