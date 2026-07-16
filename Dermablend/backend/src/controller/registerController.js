import RegisterService from "../services/register.service.js";

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
 * Controller for client registration
 */
export const clientRegister = async (req, res, next) => {
    try {
        const result = await RegisterService.registerClient(req.body);
        setTokenCookie(res, result.token);

        return res.status(201).json({
            success: true,
            message: "Client registered successfully",
            ...result
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Controller for employee registration
 */
export const employeeRegister = async (req, res, next) => {
    try {
        const result = await RegisterService.registerEmployee(req.body);

        return res.status(201).json({
            success: true,
            message: "Employee registered successfully",
            ...result
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Controller to confirm a client account from the verification email link
 */
export const verifyEmail = async (req, res, next) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Verification token is required"
            });
        }

        const result = await RegisterService.verifyEmail(token);

        return res.status(200).json({
            success: true,
            ...result
        });
    } catch (error) {
        next(error);
    }
};
