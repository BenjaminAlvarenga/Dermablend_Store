import { getApiUrl } from "../config/api";

/**
 * Función auxiliar para hacer peticiones POST al servidor de autenticación
 * Maneja errores de red y parseo de JSON automáticamente
 *
 * @private
 * @param {string} endpoint - Ruta del endpoint (ej: '/auth/login', '/auth/register/client')
 * @param {Object} body - Datos a enviar en el body de la petición
 * @returns {Promise<Object>} Respuesta JSON del servidor
 * @throws {Error} Si la petición falla o el servidor retorna un error
 */
const REQUEST_TIMEOUT_MS = 10000;

async function authRequest(endpoint, body) {
  const url = `${getApiUrl()}${endpoint}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    let data = null;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {
      const message = data?.message || "Ocurrió un error al conectar con el servidor.";
      throw new Error(message);
    }

    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error(
        "El servidor no respondió a tiempo. Verifica que el backend esté corriendo y que tu celular esté en la misma red."
      );
    }
    if (error.message === "Network request failed") {
      throw new Error("No se pudo conectar con el servidor. Verifica tu conexión.");
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

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
    return authRequest("/auth/login", { email: email.trim().toLowerCase(), password });
  },

  /**
   * Registra un nuevo cliente
   * @param {Object} data - { name, email, password, birthdate, phone, skin_type, skin_tone }
   * @returns {Promise<Object>} { success, message, token, user }
   * @throws {Error} Si el email ya existe o hay error de validación
   */
  register: async ({ name, email, password, birthdate, phone, skin_type, skin_tone }) => {
    return authRequest("/auth/register/client", {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      birthdate,
      phone: phone.trim(),
      skin_type,
      skin_tone,
      favorites: [],
    });
  },
};
