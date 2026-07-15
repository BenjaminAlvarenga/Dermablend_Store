import LogoutService from "../services/logout.service.js";

/**
 * Controller to close sessions by clearing cookies
 */
export const logout = async (req, res, next) => {
    try {
        const result = LogoutService.logout(res);
        return res.status(200).json({
            success: true,
            ...result
        });
    } catch (error) {
        next(error);
    }
};
