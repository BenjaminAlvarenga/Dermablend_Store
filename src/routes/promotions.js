import { Router } from "express";
import {
    getAllPromotions,
    getPromotionById,
    createPromotion,
    updatePromotion,
    deletePromotion
} from "../controller/promotionsController.js";
import { authMiddleware, roleMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// Public routes
router.get("/", getAllPromotions);
router.get("/:id", getPromotionById);

// Protected routes (Admin & Employee only)
router.post("/", authMiddleware, roleMiddleware(["Admin", "Employee"]), createPromotion);
router.put("/:id", authMiddleware, roleMiddleware(["Admin", "Employee"]), updatePromotion);

// Admin only routes
router.delete("/:id", authMiddleware, roleMiddleware(["Admin"]), deletePromotion);

export default router;
