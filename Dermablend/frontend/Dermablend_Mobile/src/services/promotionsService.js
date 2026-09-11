import { apiRequest } from "../utils/apiRequest";

const normalizePromotion = (promotion) => ({
  id: promotion._id || promotion.id,
  name: promotion.namePromotion || "",
  description: promotion.description || "",
  discountPercentage: Number(promotion.discountPercentage ?? 0),
  startDate: promotion.start_date,
  endDate: promotion.end_date,
});

/**
 * Obtiene las promociones activas y vigentes (dentro de su rango de fechas)
 * desde /api/promotions. El backend sólo filtra por `status`; el filtro por
 * fecha se aplica aquí porque el endpoint no lo soporta directamente.
 */
export async function getActivePromotions() {
  const data = await apiRequest("/promotions?status=active");
  if (!Array.isArray(data?.data)) return [];

  const now = Date.now();
  return data.data
    .map(normalizePromotion)
    .filter((promo) => {
      const start = promo.startDate ? new Date(promo.startDate).getTime() : -Infinity;
      const end = promo.endDate ? new Date(promo.endDate).getTime() : Infinity;
      return now >= start && now <= end;
    });
}
