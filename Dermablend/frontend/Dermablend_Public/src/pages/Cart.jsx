import React, { useState } from "react";
import { API_BASE_URL } from "../App.jsx";

function Cart({
  cart,
  user,
  token,
  updateCartQuantity,
  removeFromCart,
  clearCart,
  navigateTo,
  openAuth
}) {
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit_card");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderCompleteData, setOrderCompleteData] = useState(null);

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!user) {
      openAuth("login");
      return;
    }

    if (cart.length === 0) {
      setError("El carrito está vacío.");
      return;
    }

    if (!shippingAddress.trim()) {
      setError("Por favor escribe una dirección de envío.");
      return;
    }

    setLoading(true);

    try {
      const orderPayload = {
        client_id: user._id || user.id,
        products: cart.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price
        })),
        total_amount: calculateSubtotal(),
        payment_method: paymentMethod,
        shipping_address: shippingAddress.trim()
      };

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(orderPayload)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error al realizar el pedido.");
      }

      setOrderCompleteData(data.data);
      clearCart();
    } catch (err) {
      setError(err.message || "Error al completar tu compra.");
    } finally {
      setLoading(false);
    }
  };

  if (orderCompleteData) {
    return (
      <div className="container order-success-container animate-fade-in">
        {/* Animated Checkmark Icon */}
        <div className="checkmark-circle">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>

        <h1 className="success-title">¡Gracias por tu compra!</h1>
        <p className="success-desc">
          Tu pedido ha sido procesado de forma correcta. Puedes ver los detalles en tu cuenta de cliente.
        </p>

        <div className="order-summary-box">
          <div className="summary-row">
            <span className="label">ID de Pedido:</span>
            <span className="val">{orderCompleteData._id}</span>
          </div>
          <div className="summary-row">
            <span className="label">Total abonado:</span>
            <span className="val">${orderCompleteData.total_amount.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span className="label">Método de pago:</span>
            <span className="val">{orderCompleteData.payment_method.replace("_", " ")}</span>
          </div>
          <div className="summary-row">
            <span className="label">Dirección de envío:</span>
            <span className="val">{orderCompleteData.shipping_address}</span>
          </div>
        </div>

        <div className="success-actions">
          <button className="btn btn-primary" onClick={() => navigateTo("catalog")}>
            Seguir Comprando
          </button>
          <button className="btn btn-secondary" onClick={() => navigateTo("profile")}>
            Ver mis Pedidos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container cart-container animate-fade-in">
      <h1 className="cart-title">Tu Carrito de Compras</h1>

      {cart.length === 0 ? (
        <div className="empty-cart-view">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <h3>Tu carrito está vacío</h3>
          <p>Explora nuestras bases de alta cobertura y labiales para comenzar.</p>
          <button className="btn btn-primary" onClick={() => navigateTo("catalog")}>
            Ver Catálogo
          </button>
        </div>
      ) : (
        <div className="cart-layout">
          {/* Left Column: Cart Items list */}
          <div className="cart-items-col">
            <div className="cart-items-list">
              {cart.map((item) => (
                <div key={item.product_id} className="cart-item-card">
                  <div className="item-media" onClick={() => navigateTo("detail", item.product_id)}>
                    <img src={item.product.image} alt={item.product.name} />
                  </div>
                  <div className="item-info">
                    <h3 onClick={() => navigateTo("detail", item.product_id)}>{item.product.name}</h3>
                    <span className="item-category">{item.product.category}</span>
                    <span className="item-price-unit">${item.price.toFixed(2)} c/u</span>
                  </div>
                  <div className="item-actions">
                    <div className="quantity-selector">
                      <button
                        className="qty-btn"
                        onClick={() => updateCartQuantity(item.product_id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => updateCartQuantity(item.product_id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <span className="item-total-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      className="item-delete-btn"
                      onClick={() => removeFromCart(item.product_id)}
                      title="Eliminar"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Checkout Form Summary */}
          <div className="cart-summary-col">
            <div className="summary-card">
              <h3 className="summary-card-title">Resumen de Compra</h3>

              <div className="price-breakdown">
                <div className="price-row">
                  <span>Subtotal</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="price-row">
                  <span>Envío</span>
                  <span>{calculateSubtotal() >= 50 ? "Gratis" : "$5.00"}</span>
                </div>
                <div className="price-row total-price-row">
                  <span>Total</span>
                  <span>
                    ${(calculateSubtotal() + (calculateSubtotal() >= 50 ? 0 : 5)).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Form */}
              <form onSubmit={handleCheckoutSubmit} className="checkout-form">
                <h4 className="form-section-title">Datos de Envío</h4>

                {error && <div className="alert alert-error">{error}</div>}

                <div className="form-group">
                  <label className="form-label">Dirección de Envío</label>
                  <textarea
                    className="form-input"
                    rows="3"
                    placeholder="Calle, Número, Ciudad, CP..."
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <label className="form-label">Método de Pago</label>
                  <select
                    className="form-input"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="credit_card">Tarjeta de Crédito</option>
                    <option value="debit_card">Tarjeta de Débito</option>
                    <option value="bank_transfer">Transferencia Bancaria</option>
                  </select>
                </div>

                {!user ? (
                  <div className="checkout-login-warning">
                    <p>Inicia sesión como cliente para poder realizar el pedido.</p>
                    <button type="button" className="btn btn-secondary w-full" onClick={() => openAuth("login")}>
                      Iniciar Sesión
                    </button>
                  </div>
                ) : (
                  <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                    {loading ? "Procesando..." : "Realizar Pedido"}
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      )}

      {/* CSS Styles for Cart */}
      <style>{`
        .cart-container {
          padding-top: 40px;
          padding-bottom: 80px;
        }
        .cart-title {
          font-size: 34px;
          margin-bottom: 30px;
        }
        .empty-cart-view {
          text-align: center;
          padding: 80px 24px;
          background-color: var(--color-white);
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          display: flex;
          flex-direction: column;
          align-items: center;
          color: var(--color-text-muted);
          gap: 16px;
        }
        .empty-cart-view svg {
          color: var(--color-secondary);
        }
        .empty-cart-view h3 {
          font-size: 24px;
          color: var(--color-primary);
        }
        .empty-cart-view p {
          font-size: 14px;
          margin-bottom: 8px;
        }
        .cart-layout {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 40px;
        }
        .cart-items-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .cart-item-card {
          background-color: var(--color-white);
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .item-media {
          width: 72px;
          height: 72px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          background-color: var(--color-bg);
          cursor: pointer;
        }
        .item-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .item-info {
          flex: 1;
        }
        .item-info h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 4px;
          cursor: pointer;
        }
        .item-category {
          font-size: 11px;
          text-transform: uppercase;
          color: var(--color-text-muted);
          display: block;
          margin-bottom: 4px;
        }
        .item-price-unit {
          font-size: 13px;
          color: var(--color-text-muted);
        }
        .item-actions {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .quantity-selector {
          display: flex;
          align-items: center;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-full);
          background-color: var(--color-white);
          overflow: hidden;
        }
        .qty-btn {
          background: none;
          border: none;
          width: 32px;
          height: 36px;
          font-size: 16px;
          cursor: pointer;
        }
        .qty-value {
          width: 24px;
          text-align: center;
          font-weight: 600;
          font-size: 14px;
        }
        .item-total-price {
          font-family: var(--font-serif);
          font-size: 16px;
          font-weight: 700;
          color: var(--color-primary);
          width: 80px;
          text-align: right;
        }
        .item-delete-btn {
          background: none;
          border: none;
          color: var(--color-text-muted);
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .item-delete-btn:hover {
          color: var(--color-error);
        }
        .summary-card {
          background-color: var(--color-white);
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          padding: 32px;
          box-shadow: var(--shadow-sm);
        }
        .summary-card-title {
          font-size: 22px;
          margin-bottom: 20px;
        }
        .price-breakdown {
          border-bottom: 1px solid var(--color-border);
          padding-bottom: 20px;
          margin-bottom: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .price-row {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: var(--color-text-muted);
        }
        .total-price-row {
          font-size: 18px;
          font-weight: 700;
          color: var(--color-primary);
          border-top: 1px dashed var(--color-border);
          padding-top: 12px;
        }
        .form-section-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
          color: var(--color-primary);
        }
        .checkout-login-warning {
          background-color: var(--color-bg);
          border: 1px solid var(--color-border);
          padding: 16px;
          border-radius: var(--radius-md);
          text-align: center;
          font-size: 13px;
          color: var(--color-text-muted);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .order-success-container {
          max-width: 540px;
          margin: 60px auto;
          text-align: center;
          padding: 48px;
          background-color: var(--color-white);
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-md);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .checkmark-circle {
          width: 88px;
          height: 88px;
          border-radius: 50%;
          background-color: #E8F5E9;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }
        .success-title {
          font-size: 32px;
          margin-bottom: 12px;
        }
        .success-desc {
          font-size: 14px;
          color: var(--color-text-muted);
          margin-bottom: 30px;
        }
        .order-summary-box {
          background-color: var(--color-bg);
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
          width: 100%;
          padding: 20px;
          margin-bottom: 36px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          text-align: left;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 13.5px;
        }
        .summary-row .label {
          font-weight: 600;
          color: var(--color-text-muted);
        }
        .summary-row .val {
          font-weight: 500;
          color: var(--color-primary);
        }
        .success-actions {
          display: flex;
          gap: 16px;
        }

        @media (max-width: 900px) {
          .cart-layout { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .cart-item-card { flex-direction: column; align-items: flex-start; gap: 12px; }
          .item-actions { width: 100%; justify-content: space-between; }
        }
      `}</style>
    </div>
  );
}

export default Cart;
