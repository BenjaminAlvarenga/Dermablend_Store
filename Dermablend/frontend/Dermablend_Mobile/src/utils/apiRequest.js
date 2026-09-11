import { getApiUrl } from "../config/api";

const REQUEST_TIMEOUT_MS = 10000;

// Mensajes por defecto cuando el backend no envía un `message` utilizable,
// para nunca mostrar códigos o textos técnicos al usuario final.
const STATUS_FALLBACK_MESSAGES = {
  400: "La solicitud contiene datos inválidos. Revisa la información e intenta nuevamente.",
  401: "Tu sesión no es válida o ha expirado. Inicia sesión nuevamente.",
  403: "No tienes permiso para realizar esta acción.",
  404: "No se encontró la información solicitada.",
  409: "Ese dato ya está registrado. Intenta con otro.",
  500: "Ocurrió un problema en el servidor. Intenta nuevamente en unos minutos.",
};

function friendlyMessageFor(status, backendMessage) {
  if (backendMessage && typeof backendMessage === "string") return backendMessage;
  return STATUS_FALLBACK_MESSAGES[status] || "Ha ocurrido un problema. Intenta nuevamente.";
}

/**
 * Wrapper genérico de fetch para la API de Dermablend.
 * Centraliza timeout, headers, parseo de JSON y traducción de errores de red
 * o de servidor a mensajes amigables para el usuario final.
 *
 * @param {string} endpoint - Ruta relativa (ej: '/products', '/orders').
 * @param {Object} [options]
 * @param {string} [options.method='GET']
 * @param {Object} [options.body]
 * @param {string} [options.token] - JWT para el header Authorization.
 * @returns {Promise<Object>} JSON de la respuesta.
 * @throws {Error} Con un mensaje amigable listo para mostrar en UI y `.status` del HTTP.
 */
export async function apiRequest(endpoint, { method = "GET", body, token } = {}) {
  const url = `${getApiUrl()}${endpoint}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    let data = null;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {
      const error = new Error(friendlyMessageFor(response.status, data?.message));
      error.status = response.status;
      throw error;
    }

    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      const timeoutError = new Error(
        "El servidor no respondió a tiempo. Verifica que el backend esté corriendo y que tu celular esté en la misma red."
      );
      timeoutError.status = 0;
      throw timeoutError;
    }
    if (error.message === "Network request failed") {
      const networkError = new Error("No se pudo conectar con el servidor. Verifica tu conexión a internet.");
      networkError.status = 0;
      throw networkError;
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
