import { Router } from "express";
import {
    getAllClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient
} from "../controller/clientsController.js";
import { authMiddleware, roleMiddleware, selfOrRoles } from "../middlewares/authMiddleware.js";

const router = Router();

// Retrieve all clients - Admin and Employees only
router.get("/", authMiddleware, roleMiddleware(["Admin", "Employee"]), getAllClients);

// Retrieve client by ID - Admin, Employee, or the Client themselves
router.get("/:id", authMiddleware, selfOrRoles(["Admin", "Employee"]), getClientById);

// Create new client (e.g. signup) - Public
router.post("/", createClient);

// Update client - Admin or Client themselves
router.put("/:id", authMiddleware, selfOrRoles(["Admin", "Employee"]), updateClient);

// Delete client - Admin only
router.delete("/:id", authMiddleware, roleMiddleware(["Admin"]), deleteClient);

export default router;
