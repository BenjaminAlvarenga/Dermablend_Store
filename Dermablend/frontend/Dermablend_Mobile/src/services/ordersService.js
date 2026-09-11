import { apiRequest } from "../utils/apiRequest";

const ORDER_ERROR_MESSAGES = {
  "debes verificar tu correo electrónico antes de poder realizar una compra":
    "Debes verificar tu correo electrónico antes de poder realizar una compra.",
};

function translateOrderError(message) {
  if (!message) return "No fue posible completar tu pedido. Intenta nuevamente.";
  const key = message.trim().toLowerCase();
  if (ORDER_ERROR_MESSAGES[key]) return ORDER_ERROR_MESSAGES[key];
  if (key.startsWith("insufficient stock")) {
    return "Uno de los productos ya no tiene suficiente disponibilidad. Actualiza tu carrito.";
  }
  if (key.includes("does not exist")) {
    return "Uno de los productos de tu carrito ya no está disponible.";
  }
  return message;
}

/**
 * Crea un pedido a partir del carrito local. El backend recalcula precios y
 * valida stock, así que el carrito del cliente nunca se confía a ciegas.
 *
 * @param {Object} params
 * @param {string} params.clientId
 * @param {Array<{product_id: string, quantity: number}>} params.products
 * @param {"credit_card"|"debit_card"|"bank_transfer"} params.paymentMethod
 * @param {string} params.shippingAddress
 * @param {string} params.token
 */
export async function createOrder({ clientId, products, paymentMethod, shippingAddress, token }) {
  try {
    const data = await apiRequest("/orders", {
      method: "POST",
      token,
      body: {
        client_id: clientId,
        products,
        payment_method: paymentMethod,
        shipping_address: shippingAddress.trim(),
      },
    });
    return data.data;
  } catch (error) {
    const translated = new Error(translateOrderError(error.message));
    translated.status = error.status;
    throw translated;
  }
}
