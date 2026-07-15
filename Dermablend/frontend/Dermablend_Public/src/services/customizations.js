import { request } from "./api.js";

const CustomizationsService = {
  getClientCustomizations: async (clientId) => {
    return request(`/customizations?client_id=${clientId}`, {
      method: "GET"
    });
  },

  createCustomization: async (customData) => {
    return request("/customizations", {
      method: "POST",
      body: JSON.stringify(customData)
    });
  }
};

export default CustomizationsService;
