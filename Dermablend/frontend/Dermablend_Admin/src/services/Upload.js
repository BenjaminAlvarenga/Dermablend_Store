const BASE_URL = import.meta.env.VITE_API_URL;
const endpoint = "/upload";

const UploadService = {
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    // No seteamos Content-Type a mano: el browser arma el boundary del
    // multipart automáticamente a partir del FormData.
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || `HTTP ${response.status}`);
    }

    return data;
  },
};

export default UploadService;
