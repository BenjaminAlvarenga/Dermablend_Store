import { Router } from "express";
import { getDashboardStats } from "../controller/dashboardController.js";
import { authMiddleware, roleMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/stats", authMiddleware, roleMiddleware(["Admin", "Employee"]), getDashboardStats);

export default router;
