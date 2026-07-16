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

// Get all orders - Admin/Employee see everything, Clients only see their own (enforced in controller)
router.get("/", getAllOrders);

// Get order details - Admin, Employee, or the client who placed it
router.get("/:id", getOrderById);

// Create order - Anyone logged in (Clients)
router.post("/", createOrder);

// Update order status/shipping - Admin/Employee can edit anything,
// Clients can only cancel their own pending order (enforced in controller)
router.put("/:id", updateOrder);

// Delete order (with stock restoration) - Admin only
router.delete("/:id", roleMiddleware(["Admin"]), deleteOrder);

export default router;
