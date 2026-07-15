import { Router } from "express";
import {
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview
} from "../controller/reviewsController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// Public routes
router.get("/", getAllReviews);
router.get("/:id", getReviewById);

// Protected routes (Requires login)
router.post("/", authMiddleware, createReview);
router.put("/:id", authMiddleware, updateReview);
router.delete("/:id", authMiddleware, deleteReview);

export default router;
