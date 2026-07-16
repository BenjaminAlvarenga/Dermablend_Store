/**
 * Generic validation middleware wrapper
 * @param {Function} validationFn - The validation function to execute
 */
export const runValidation = (validationFn) => {
    return (req, res, next) => {
        validationFn(req, res, next);
    };
};
export default runValidation;
