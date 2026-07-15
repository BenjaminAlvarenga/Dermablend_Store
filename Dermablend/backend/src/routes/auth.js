import { Router } from "express";

// Controllers
import {
    clientLogin,
    employeeLogin,
    unifiedLogin,
    getProfile
} from "../controller/login.controller.js";
import {
    clientRegister,
    employeeRegister
} from "../controller/register.controller.js";
import {
    clientRecoveryRequest,
    clientRecoveryReset
} from "../controller/recoveryPassword.controller.js";
import {
    logout
} from "../controller/logout.controller.js";

// Validations
import {
    validateLogin
} from "../validations/login.validation.js";
import {
    validateClientRegister,
    validateEmployeeRegister
} from "../validations/register.validation.js";
import {
    validateRecoveryRequest,
    validateRecoveryReset
} from "../validations/recoveryPassword.validation.js";

// Middlewares
import { authMiddleware, roleMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// Public auth routes (Original mappings for client/employee and unified)
router.post("/register/client", validateClientRegister, clientRegister);
router.post("/login/client", validateLogin, clientLogin);
router.post("/login/employee", validateLogin, employeeLogin);
router.post("/login", validateLogin, unifiedLogin);
router.post("/logout", logout);
router.post("/recovery/request", validateRecoveryRequest, clientRecoveryRequest);
router.post("/recovery/reset", validateRecoveryReset, clientRecoveryReset);

// Additional routes matching prompt specifications exactly
router.post("/register", validateClientRegister, clientRegister);
router.post("/recovery-password", validateRecoveryRequest, clientRecoveryRequest);
router.post("/reset-password", validateRecoveryReset, clientRecoveryReset);

// Protected profile route
router.get("/profile", authMiddleware, getProfile);

// Register employee - protected so only Admin can register new employees
router.post("/register/employee", authMiddleware, roleMiddleware(["Admin"]), validateEmployeeRegister, employeeRegister);

export default router;
