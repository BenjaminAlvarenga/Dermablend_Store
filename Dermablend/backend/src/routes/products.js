import { Router } from "express";
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controller/productsController.js";
import { authMiddleware, roleMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// Public routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Protected routes (Admin & Employee only)
router.post("/", authMiddleware, roleMiddleware(["Admin", "Employee"]), createProduct);
router.put("/:id", authMiddleware, roleMiddleware(["Admin", "Employee"]), updateProduct);

// Admin only routes
router.delete("/:id", authMiddleware, roleMiddleware(["Admin"]), deleteProduct);

export default router;
