import { Router } from "express";
import {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
} from "../controller/employeesController.js";
import { authMiddleware, roleMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// Protect all employee routes
router.use(authMiddleware);

// Get all employees - Admin only
router.get("/", roleMiddleware(["Admin"]), getAllEmployees);

// Get employee details - Admin, or the employee themselves
router.get("/:id", getEmployeeById);

// Create employee - Admin only
router.post("/", roleMiddleware(["Admin"]), createEmployee);

// Update employee - Admin, or the employee themselves
router.put("/:id", updateEmployee);

// Delete employee - Admin only
router.delete("/:id", roleMiddleware(["Admin"]), deleteEmployee);

export default router;
