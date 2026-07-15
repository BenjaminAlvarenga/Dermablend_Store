import { request } from "./api.js";

const ProductsService = {
  getProducts: async (category = "") => {
    const endpoint = category ? `/products?category=${encodeURIComponent(category)}` : "/products";
    return request(endpoint, {
      method: "GET"
    });
  },

  getProductById: async (id) => {
    return request(`/products/${id}`, {
      method: "GET"
    });
  },

  getCustomizableProducts: async () => {
    return request("/products?is_customizable=true", {
      method: "GET"
    });
  }
};

export default ProductsService;
