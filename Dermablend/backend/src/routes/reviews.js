import { Router } from "express";
import {
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview
} from "../controller/reviewsController.js";
import { authMiddleware, roleMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// Public routes
router.get("/", getAllReviews);
router.get("/:id", getReviewById);

// Writing reviews is a Client-only action — Admin/Employee can view but not
// create/edit/delete reviews (the Admin panel is read-only for this entity).
router.post("/", authMiddleware, roleMiddleware(["Client"]), createReview);
router.put("/:id", authMiddleware, roleMiddleware(["Client"]), updateReview);
router.delete("/:id", authMiddleware, roleMiddleware(["Client"]), deleteReview);

export default router;
