/**
 * Validation rules for login inputs
 */
export const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required"
        });
    }

    if (!email.trim() || !password.trim()) {
        return res.status(400).json({
            success: false,
            message: "Email and password cannot be empty strings"
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
export default validateLogin;
