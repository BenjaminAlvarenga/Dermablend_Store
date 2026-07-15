const BASE_URL = "http://localhost:3000/api";

/**
 * Generic request helper for calling backend endpoints
 * @param {string} endpoint - API path (e.g. '/products')
 * @param {object} options - Fetch options (method, headers, body)
 */
export async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  
  // Set headers
  const headers = {
    "Content-Type": "application/json",
    ...options.headers
  };

  // Get token from localStorage
  const token = localStorage.getItem("dermablend_token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const fetchOptions = {
    ...options,
    headers
  };

  try {
    const response = await fetch(url, fetchOptions);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      // Create detailed error from backend message
      const errMsg = data.message || `HTTP error! Status: ${response.status}`;
      const error = new Error(errMsg);
      error.status = response.status;
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`API Request Error on ${endpoint}:`, error.message);
    throw error;
  }
}
