import LoginService from "../services/login.service.js";
import Clients from "../models/clients.js";
import Employees from "../models/employees.js";

// Helper to set cookie
const setTokenCookie = (res, token) => {
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
};

/**
 * Controller for client login
 */
export const clientLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await LoginService.loginClient(email, password);
        setTokenCookie(res, result.token);
        
        return res.status(200).json({
            success: true,
            message: "Login successful",
            ...result
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Controller for employee login
 */
export const employeeLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await LoginService.loginEmployee(email, password);
        setTokenCookie(res, result.token);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            ...result
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Controller for unified login
 */
export const unifiedLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await LoginService.unifiedLogin(email, password);
        setTokenCookie(res, result.token);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            ...result
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Controller to fetch active profile details
 */
export const getProfile = async (req, res, next) => {
    try {
        const { id, type } = req.user;

        let user = null;
        if (type === "employee") {
            user = await Employees.findById(id).select("-password");
        } else {
            user = await Clients.findById(id).select("-password");
        }

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User profile not found"
            });
        }

        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        next(error);
    }
};
