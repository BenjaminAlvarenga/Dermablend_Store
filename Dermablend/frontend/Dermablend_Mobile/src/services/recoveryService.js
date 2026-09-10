import { apiRequest } from "../utils/apiRequest";

/**
 * Servicio de recuperación de contraseña contra los endpoints reales del
 * backend (/api/auth/recovery/*). El backend envía un correo con un enlace
 * que contiene un token de un solo uso (válido 1 hora); ese mismo token se
 * usa para completar el cambio de contraseña.
 */
export const recoveryService = {
  /**
   * Solicita el envío del correo de recuperación.
   * @param {string} email
   * @returns {Promise<{message: string}>}
   */
  requestRecovery: async (email) => {
    return apiRequest("/auth/recovery/request", {
      method: "POST",
      body: { email: email.trim().toLowerCase() },
    });
  },

  /**
   * Establece una nueva contraseña usando el token recibido por correo.
   * @param {Object} params
   * @param {string} params.token
   * @param {string} params.newPassword
   * @returns {Promise<{message: string}>}
   */
  resetPassword: async ({ token, newPassword }) => {
    return apiRequest("/auth/recovery/reset", {
      method: "POST",
      body: { token: token.trim(), newPassword },
    });
  },
};
