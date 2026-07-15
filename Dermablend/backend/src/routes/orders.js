import { Router } from "express";
import {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
} from "../controller/ordersController.js";
import { authMiddleware, roleMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// Protect all order routes
router.use(authMiddleware);

// Get all orders - Admin and Employees only
router.get("/", roleMiddleware(["Admin", "Employee"]), getAllOrders);

// Get order details - Admin, Employee, or the client who placed it
router.get("/:id", getOrderById);

// Create order - Anyone logged in (Clients)
router.post("/", createOrder);

// Update order status/shipping - Admin and Employees only
router.put("/:id", roleMiddleware(["Admin", "Employee"]), updateOrder);

// Delete order (with stock restoration) - Admin only
router.delete("/:id", roleMiddleware(["Admin"]), deleteOrder);

export default router;
