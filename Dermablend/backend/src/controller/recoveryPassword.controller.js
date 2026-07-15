import RecoveryPasswordService from "../services/recoveryPassword.service.js";

/**
 * Controller to handle password recovery email requests
 */
export const clientRecoveryRequest = async (req, res, next) => {
    try {
        const { email } = req.body;
        const result = await RecoveryPasswordService.requestRecovery(email);

        return res.status(200).json({
            success: true,
            ...result
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Controller to handle password resets using recovery tokens
 */
export const clientRecoveryReset = async (req, res, next) => {
    try {
        const { token, newPassword } = req.body;
        const result = await RecoveryPasswordService.resetPassword(token, newPassword);

        return res.status(200).json({
            success: true,
            ...result
        });
    } catch (error) {
        next(error);
    }
};
