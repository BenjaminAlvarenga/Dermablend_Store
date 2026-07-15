// Datos de ejemplo mientras el backend no expone endpoints de estadisticas.
// Estructura pensada para que DashboardService.getStats() la reemplace 1 a 1
// por la respuesta real de la API sin tener que tocar los componentes.
export const dashboardMock = {
  totalSales: 4500,
  pendingOrders: 12,
  activeProducts: 86,
  newUsers: 134,
  deliveredRate: 92.6,
  monthlySales: [
    { month: "Ene", value: 20 },
    { month: "Feb", value: 35 },
    { month: "Mar", value: 65 },
    { month: "Abr", value: 30 },
    { month: "May", value: 20 },
    { month: "Jun", value: 40 },
    { month: "Jul", value: 0 },
    { month: "Ago", value: 0 },
    { month: "Sep", value: 0 },
    { month: "Oct", value: 0 },
    { month: "Nov", value: 0 },
    { month: "Dic", value: 0 },
  ],
};
