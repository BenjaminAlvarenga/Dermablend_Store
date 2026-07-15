import { request } from "./api.js";

const OrdersService = {
  getClientOrders: async (clientId) => {
    return request(`/orders?client_id=${clientId}`, {
      method: "GET"
    });
  },

  createOrder: async (orderData) => {
    return request("/orders", {
      method: "POST",
      body: JSON.stringify(orderData)
    });
  },

  cancelOrder: async (orderId) => {
    return request(`/orders/${orderId}`, {
      method: "PUT",
      body: JSON.stringify({ status: "Cancelado" })
    });
  }
};

export default OrdersService;
