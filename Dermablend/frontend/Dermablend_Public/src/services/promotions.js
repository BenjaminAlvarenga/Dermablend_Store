import { request } from "./api.js";

const PromotionsService = {
  getActivePromotions: async () => {
    return request("/promotions?status=active", {
      method: "GET"
    });
  }
};

export default PromotionsService;
