import { Router } from "express";
import {
    clientRegister,
    clientLogin,
    employeeRegister,
    employeeLogin,
    unifiedLogin,
    logout,
    getProfile,
    clientRecoveryRequest,
    clientRecoveryReset
} from "../controller/authController.js";
import { authMiddleware, roleMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// Public auth routes
router.post("/register/client", clientRegister);
router.post("/login/client", clientLogin);
router.post("/login/employee", employeeLogin);
router.post("/login", unifiedLogin);
router.post("/logout", logout);
router.post("/recovery/request", clientRecoveryRequest);
router.post("/recovery/reset", clientRecoveryReset);

// Protected profile route
router.get("/profile", authMiddleware, getProfile);

// Register employee - protected so only Admin can register new employees
router.post("/register/employee", authMiddleware, roleMiddleware(["Admin"]), employeeRegister);

export default router;
