import { request } from "./api.js";

const ReviewsService = {
  getReviews: async (productId) => {
    return request(`/reviews?product_id=${productId}`, {
      method: "GET"
    });
  },

  createReview: async (reviewData) => {
    return request("/reviews", {
      method: "POST",
      body: JSON.stringify(reviewData)
    });
  }
};

export default ReviewsService;
