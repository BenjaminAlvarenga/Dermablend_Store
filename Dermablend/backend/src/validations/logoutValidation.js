/**
 * Validation rules for logout (no-op)
 */
export const validateLogout = (req, res, next) => {
    next();
};
export default validateLogout;
