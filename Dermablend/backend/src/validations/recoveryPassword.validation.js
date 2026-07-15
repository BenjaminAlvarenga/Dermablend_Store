/**
 * Validation middleware for password recovery request input
 */
export const validateRecoveryRequest = (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Email is required"
        });
    }

    if (!email.trim()) {
        return res.status(400).json({
            success: false,
            message: "Email cannot be an empty string"
        });
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(String(email).trim())) {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid email address format"
        });
    }

    next();
};

/**
 * Validation middleware for password recovery reset input
 */
export const validateRecoveryReset = (req, res, next) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        return res.status(400).json({
            success: false,
            message: "Token and newPassword are required"
        });
    }

    if (!token.trim() || !newPassword.trim()) {
        return res.status(400).json({
            success: false,
            message: "Token and newPassword cannot be empty strings"
        });
    }

    if (String(newPassword).length < 6) {
        return res.status(400).json({
            success: false,
            message: "New password must be at least 6 characters long"
        });
    }

    next();
};
