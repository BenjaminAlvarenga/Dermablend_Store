import Orders from "../models/orders.js";
import Products from "../models/products.js";
import Clients from "../models/clients.js";

const MONTHS_ES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

/**
 * Aggregates KPIs for the admin dashboard homepage
 */
export const getDashboardStats = async (req, res, next) => {
    try {
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const [salesAgg, pendingOrders, activeProducts, newUsers, deliveredCount, totalOrders, monthlyAgg] =
            await Promise.all([
                Orders.aggregate([
                    { $match: { status: { $ne: "Cancelado" } } },
                    { $group: { _id: null, total: { $sum: "$total_amount" } } }
                ]),
                Orders.countDocuments({ status: "Pendiente" }),
                Products.countDocuments({ stock: { $gt: 0 } }),
                Clients.countDocuments({ createdAt: { $gte: startOfMonth } }),
                Orders.countDocuments({ status: "Entregado" }),
                Orders.countDocuments({}),
                Orders.aggregate([
                    { $match: { order_date: { $gte: startOfYear } } },
                    { $group: { _id: { $month: "$order_date" }, total: { $sum: "$total_amount" } } }
                ])
            ]);

        const totalSales = salesAgg[0]?.total || 0;
        const deliveredRate = totalOrders > 0
            ? Number(((deliveredCount / totalOrders) * 100).toFixed(1))
            : 0;

        const monthlyTotals = Array(12).fill(0);
        monthlyAgg.forEach(({ _id, total }) => {
            monthlyTotals[_id - 1] = total;
        });
        const maxMonthTotal = Math.max(...monthlyTotals, 0);
        const monthlySales = MONTHS_ES.map((month, index) => ({
            month,
            value: maxMonthTotal > 0
                ? Number(((monthlyTotals[index] / maxMonthTotal) * 100).toFixed(1))
                : 0
        }));

        return res.status(200).json({
            success: true,
            totalSales,
            pendingOrders,
            activeProducts,
            newUsers,
            deliveredRate,
            monthlySales
        });
    } catch (error) {
        next(error);
    }
};
