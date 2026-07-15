import { Router } from "express";
import {
    getAllCustomizations,
    getCustomizationById,
    createCustomization,
    updateCustomization,
    deleteCustomization
} from "../controller/customizationsController.js";
import { authMiddleware, roleMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// Protect all customizations routes
router.use(authMiddleware);

// Get all customizations - Admin and Employee only (to prepare custom products)
router.get("/", roleMiddleware(["Admin", "Employee"]), getAllCustomizations);

// Get customizations by ID - Admin, Employee, or the client who owns it
router.get("/:id", getCustomizationById);

// Create customization - Logged-in clients or Admin/Employee
router.post("/", createCustomization);

// Update customization - Client owner or Admin/Employee
router.put("/:id", updateCustomization);

// Delete customization - Client owner or Admin
router.delete("/:id", deleteCustomization);

export default router;
