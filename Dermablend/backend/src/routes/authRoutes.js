import { Router } from "express";

// Controllers
import {
    clientLogin,
    employeeLogin,
    unifiedLogin,
    getProfile
} from "../controller/loginController.js";
import {
    clientRegister,
    employeeRegister
} from "../controller/registerController.js";
import {
    clientRecoveryRequest,
    clientRecoveryReset
} from "../controller/recoveryPasswordController.js";
import {
    logout
} from "../controller/logoutController.js";

// Validations
import {
    validateLogin
} from "../validations/loginValidation.js";
import {
    validateClientRegister,
    validateEmployeeRegister
} from "../validations/registerValidation.js";
import {
    validateRecoveryRequest,
    validateRecoveryReset
} from "../validations/recoveryPasswordValidation.js";
import {
    validateLogout
} from "../validations/logoutValidation.js";

// Middlewares
import { authMiddleware, roleMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// Public auth routes (Original client/employee and unified mappings)
router.post("/register/client", validateClientRegister, clientRegister);
router.post("/login/client", validateLogin, clientLogin);
router.post("/login/employee", validateLogin, employeeLogin);
router.post("/login", validateLogin, unifiedLogin);
router.post("/logout", validateLogout, logout);
router.post("/recovery/request", validateRecoveryRequest, clientRecoveryRequest);
router.post("/recovery/reset", validateRecoveryReset, clientRecoveryReset);

// Target routes requested by prompt specifications exactly
router.post("/register", validateClientRegister, clientRegister);
router.post("/recovery-password", validateRecoveryRequest, clientRecoveryRequest);
router.post("/reset-password", validateRecoveryReset, clientRecoveryReset);

// Protected profile route
router.get("/profile", authMiddleware, getProfile);

// Register employee - protected so only Admin can register new employees
router.post("/register/employee", authMiddleware, roleMiddleware(["Admin"]), validateEmployeeRegister, employeeRegister);

export default router;
