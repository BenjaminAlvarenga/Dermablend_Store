import nodemailer from "nodemailer";
import { config } from "../config.js";

// Setup nodemailer transport
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: config.email.user_email,
        pass: config.email.user_password
    }
});

/**
 * Sends a password recovery email to a client or employee
 * @param {string} toEmail - Recipient email address
 * @param {string} token - Secure temporary token
 */
export async function sendRecoveryEmail(toEmail, token) {
    // Generate recovery link
    const recoveryUrl = `http://localhost:5173/reset-password?token=${token}`;

    const mailOptions = {
        from: `"Dermablend Store" <${config.email.user_email}>`,
        to: toEmail,
        subject: "Recuperación de Contraseña - Dermablend Store",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E8E2DA; border-radius: 8px;">
                <h2 style="color: #27120F; border-bottom: 2px solid #E5C1B2; padding-bottom: 10px;">Restablecer Contraseña</h2>
                <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta en Dermablend Store.</p>
                <p>Haz clic en el siguiente botón para establecer una nueva contraseña. Este enlace expira en 1 hora.</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${recoveryUrl}" style="background-color: #27120F; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 20px; font-weight: bold; display: inline-block;">Restablecer Contraseña</a>
                </div>
                <p style="color: #7E726D; font-size: 12px;">Si el botón no funciona, copia y pega este enlace en tu navegador:</p>
                <p style="color: #7E726D; font-size: 12px; word-break: break-all;">${recoveryUrl}</p>
                <p style="border-top: 1px solid #E8E2DA; padding-top: 15px; font-size: 12px; color: #A0948E;">Si no solicitaste este cambio, puedes ignorar este correo de forma segura.</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Recovery email sent successfully to ${toEmail}`);
    } catch (error) {
        console.error("Error sending recovery email:", error.message);
        // Fallback log of the recovery URL for debugging/testing
        console.log(`[FALLBACK DEBUG] Recovery URL for ${toEmail}: ${recoveryUrl}`);
        throw error;
    }
}

/**
 * Sends a password recovery code to an employee/admin (Admin panel flow)
 * @param {string} toEmail - Recipient email address
 * @param {string} code - 6-digit numeric recovery code
 */
export async function sendRecoveryCodeEmail(toEmail, code) {
    const mailOptions = {
        from: `"Dermablend Store" <${config.email.user_email}>`,
        to: toEmail,
        subject: "Código de Recuperación de Contraseña - Dermablend Store",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E8E2DA; border-radius: 8px;">
                <h2 style="color: #27120F; border-bottom: 2px solid #E5C1B2; padding-bottom: 10px;">Restablecer Contraseña</h2>
                <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta de administración en Dermablend Store.</p>
                <p>Usa el siguiente código en la pantalla de recuperación. Este código expira en 1 hora.</p>
                <div style="text-align: center; margin: 30px 0;">
                    <span style="display: inline-block; background-color: #27120F; color: #ffffff; padding: 14px 32px; border-radius: 8px; font-size: 28px; font-weight: bold; letter-spacing: 6px;">${code}</span>
                </div>
                <p style="border-top: 1px solid #E8E2DA; padding-top: 15px; font-size: 12px; color: #A0948E;">Si no solicitaste este cambio, puedes ignorar este correo de forma segura.</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Recovery code email sent successfully to ${toEmail}`);
    } catch (error) {
        console.error("Error sending recovery code email:", error.message);
        // Fallback log of the code for debugging/testing
        console.log(`[FALLBACK DEBUG] Recovery code for ${toEmail}: ${code}`);
        throw error;
    }
}

/**
 * Sends an account verification email to a newly registered client
 * @param {string} toEmail - Recipient email address
 * @param {string} token - Secure temporary token
 */
export async function sendVerificationEmail(toEmail, token) {
    const verifyUrl = `http://localhost:5173/verify-email?token=${token}`;

    const mailOptions = {
        from: `"Dermablend Store" <${config.email.user_email}>`,
        to: toEmail,
        subject: "Confirma tu cuenta - Dermablend Store",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E8E2DA; border-radius: 8px;">
                <h2 style="color: #27120F; border-bottom: 2px solid #E5C1B2; padding-bottom: 10px;">¡Bienvenido/a a Dermablend Store!</h2>
                <p>Gracias por registrarte. Antes de poder realizar compras necesitamos que confirmes tu correo electrónico.</p>
                <p>Haz clic en el siguiente botón para confirmar tu cuenta. Este enlace expira en 24 horas.</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${verifyUrl}" style="background-color: #27120F; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 20px; font-weight: bold; display: inline-block;">Confirmar mi cuenta</a>
                </div>
                <p style="color: #7E726D; font-size: 12px;">Si el botón no funciona, copia y pega este enlace en tu navegador:</p>
                <p style="color: #7E726D; font-size: 12px; word-break: break-all;">${verifyUrl}</p>
                <p style="border-top: 1px solid #E8E2DA; padding-top: 15px; font-size: 12px; color: #A0948E;">Si no creaste esta cuenta, puedes ignorar este correo de forma segura.</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Verification email sent successfully to ${toEmail}`);
    } catch (error) {
        console.error("Error sending verification email:", error.message);
        // Fallback log of the verification URL for debugging/testing
        console.log(`[FALLBACK DEBUG] Verification URL for ${toEmail}: ${verifyUrl}`);
        throw error;
    }
}
