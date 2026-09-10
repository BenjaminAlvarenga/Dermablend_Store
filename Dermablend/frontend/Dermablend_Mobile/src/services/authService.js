import { apiRequest } from "../utils/apiRequest";

/**
 * Servicio de autenticación - proporciona métodos para login y registro de clientes
 * contra el backend de Dermablend (rutas montadas bajo /api/auth).
 */
export const authService = {
  /**
   * Inicia sesión con email y contraseña (login unificado: clientes y empleados)
   * @param {Object} credentials - { email: string, password: string }
   * @returns {Promise<Object>} { success, message, token, user, type }
   * @throws {Error} Si las credenciales son inválidas
   */
  login: async ({ email, password }) => {
    return apiRequest("/auth/login", {
      method: "POST",
      body: { email: email.trim().toLowerCase(), password },
    });
  },

  /**
   * Registra un nuevo cliente
   * @param {Object} data - { name, email, password, birthdate, phone, skin_type, skin_tone }
   * @returns {Promise<Object>} { success, message, token, user }
   * @throws {Error} Si el email ya existe o hay error de validación
   */
  register: async ({ name, email, password, birthdate, phone, skin_type, skin_tone }) => {
    return apiRequest("/auth/register/client", {
      method: "POST",
      body: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        birthdate,
        phone: phone.trim(),
        skin_type,
        skin_tone,
        favorites: [],
      },
    });
  },

  /**
   * Obtiene el perfil actualizado del usuario autenticado.
   * @param {string} token
   * @returns {Promise<Object>} { success, user }
   */
  getProfile: async (token) => {
    return apiRequest("/auth/profile", { token });
  },
};
