/**
 * Validation rules for client registration inputs
 */
export const validateClientRegister = (req, res, next) => {
    const { name, email, password, birthdate, phone, skin_type, skin_tone } = req.body;

    if (!name || !email || !password || !birthdate || !phone || !skin_type || !skin_tone) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required client fields"
        });
    }

    if (
        !name.trim() ||
        !email.trim() ||
        !password.trim() ||
        !birthdate.trim() ||
        !phone.trim() ||
        !skin_type.trim() ||
        !skin_tone.trim()
    ) {
        return res.status(400).json({
            success: false,
            message: "Required registration fields cannot be empty strings"
        });
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(String(email).trim())) {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid email address format"
        });
    }

    if (String(password).length < 6) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 6 characters long"
        });
    }

    if (isNaN(Date.parse(birthdate))) {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid date format for birthdate"
        });
    }

    next();
};

/**
 * Validation rules for employee registration inputs
 */
export const validateEmployeeRegister = (req, res, next) => {
    const { name, email, password, role, hire_date, salary } = req.body;

    if (!name || !email || !password || !role || !hire_date || salary === undefined) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required employee fields"
        });
    }

    if (!name.trim() || !email.trim() || !password.trim() || !role.trim() || !hire_date.trim()) {
        return res.status(400).json({
            success: false,
            message: "Required employee fields cannot be empty strings"
        });
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(String(email).trim())) {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid email address format"
        });
    }

    if (String(password).length < 6) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 6 characters long"
        });
    }

    if (isNaN(Date.parse(hire_date))) {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid date format for hire_date"
        });
    }

    if (Number(salary) <= 0) {
        return res.status(400).json({
            success: false,
            message: "Salary must be a positive number greater than 0"
        });
    }

    next();
};
