import { dashboardMock } from "../data/dashboardMock";

// TODO: cuando el backend tenga endpoints de estadisticas (orders/products/clients),
// reemplazar por un request() como en Orders.js/Products.js, ej:
// GET `${BASE_URL}/dashboard/stats`
const DashboardService = {
  getStats: async () => {
    return Promise.resolve(dashboardMock);
  },
};

export default DashboardService;
