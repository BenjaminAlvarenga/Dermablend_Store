import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../App.jsx";

function Profile({ user, token, handleLogout, navigateTo }) {
  const [orders, setOrders] = useState([]);
  const [customizations, setCustomizations] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingCustoms, setLoadingCustoms] = useState(true);
  const [activeTab, setActiveTab] = useState("orders"); // orders, customizations

  const clientId = user?._id || user?.id;

  useEffect(() => {
    if (!clientId) return;

    // Fetch client orders
    fetch(`${API_BASE_URL}/orders?client_id=${clientId}`, {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          // Sort by date newest first
          setOrders(data.data.sort((a, b) => new Date(b.order_date) - new Date(a.order_date)));
        }
      })
      .catch((err) => console.log("Error loading client orders:", err))
      .finally(() => setLoadingOrders(false));

    // Fetch client customizations
    fetch(`${API_BASE_URL}/customizations?client_id=${clientId}`, {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setCustomizations(data.data);
        }
      })
      .catch((err) => console.log("Error loading customizations:", err))
      .finally(() => setLoadingCustoms(false));
  }, [clientId, token]);

  const handleCancelOrder = async (orderId) => {
    const confirmCancel = window.confirm("¿Seguro que deseas cancelar este pedido? Se restablecerá el stock de los productos.");
    if (!confirmCancel) return;

    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ status: "Cancelado" })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error al cancelar pedido.");
      }

      // Update state order status locally
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: "Cancelado" } : o))
      );
      alert("Pedido cancelado correctamente.");
    } catch (err) {
      alert(err.message || "Error al procesar cancelación.");
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Entregado":
        return "badge-success";
      case "Cancelado":
        return "badge-error";
      default:
        return "badge-info"; // Pendiente
    }
  };

  if (!user) {
    return (
      <div className="container profile-login-prompt">
        <h3>Por favor inicia sesión</h3>
        <p>Necesitas estar autenticado para acceder a tu perfil de cliente.</p>
      </div>
    );
  }

  return (
    <div className="container profile-container animate-fade-in">
      <div className="profile-layout">
        {/* Left Column: Client Personal Specs */}
        <div className="profile-sidebar-col">
          <div className="card profile-user-card">
            <div className="profile-avatar-large">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h2 className="profile-user-name">{user.name}</h2>
            <span className="profile-user-email">{user.email}</span>

            <div className="profile-details-list">
              <div className="detail-item">
                <span className="label">Teléfono:</span>
                <span className="val">{user.phone}</span>
              </div>
              <div className="detail-item">
                <span className="label">Nacimiento:</span>
                <span className="val">{new Date(user.birthdate).toLocaleDateString()}</span>
              </div>
              <div className="detail-item">
                <span className="label">Tipo de Piel:</span>
                <span className="val capitalize">{user.skin_type}</span>
              </div>
              <div className="detail-item">
                <span className="label">Tono de Piel:</span>
                <span className="val capitalize">{user.skin_tone}</span>
              </div>
            </div>

            <button className="btn btn-secondary logout-btn" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Right Column: Order logs & custom formulas */}
        <div className="profile-content-col">
          {/* Tabs header */}
          <div className="profile-tabs">
            <button
              className={`profile-tab-btn ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              Mis Pedidos ({orders.length})
            </button>
            <button
              className={`profile-tab-btn ${activeTab === "customizations" ? "active" : ""}`}
              onClick={() => setActiveTab("customizations")}
            >
              Fórmulas Guardadas ({customizations.length})
            </button>
          </div>

          {/* Orders History Tab */}
          {activeTab === "orders" && (
            <div className="profile-tab-content">
              {loadingOrders ? (
                <div className="skeleton-list">
                  {[1, 2].map((n) => (
                    <div key={n} className="skeleton skeleton-item" style={{ height: "100px", marginBottom: "16px" }}></div>
                  ))}
                </div>
              ) : orders.length === 0 ? (
                <div className="empty-tab-state">
                  <p>Aún no has realizado ninguna compra.</p>
                  <button className="btn btn-primary" onClick={() => navigateTo("catalog")}>
                    Ver Catálogo
                  </button>
                </div>
              ) : (
                <div className="orders-list">
                  {orders.map((order) => (
                    <div key={order._id} className="card order-card">
                      <div className="order-card-header">
                        <div>
                          <span className="order-id-label">Pedido #{order._id.substring(18)}</span>
                          <span className="order-date-label">
                            {new Date(order.order_date).toLocaleDateString()}
                          </span>
                        </div>
                        <span className={`badge ${getStatusBadgeClass(order.status)}`}>
                          {order.status}
                        </span>
                      </div>

                      <div className="order-products-list">
                        {order.products.map((item, idx) => (
                          <div key={idx} className="order-product-item">
                            <span className="product-name">
                              {item.product_id?.name || "Producto Dermablend"}
                            </span>
                            <span className="product-qty-price">
                              {item.quantity} x ${item.price.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="order-card-footer">
                        <div className="order-shipping-summary">
                          <strong>Envío:</strong> {order.shipping_address}
                        </div>
                        <div className="order-total-summary">
                          <span>Total:</span>
                          <strong>${order.total_amount.toFixed(2)}</strong>
                        </div>
                      </div>

                      {order.status === "Pendiente" && (
                        <button
                          className="btn btn-secondary cancel-order-btn"
                          onClick={() => handleCancelOrder(order._id)}
                        >
                          Cancelar Pedido
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Customizations Tab */}
          {activeTab === "customizations" && (
            <div className="profile-tab-content">
              {loadingCustoms ? (
                <div className="skeleton-list">
                  {[1, 2].map((n) => (
                    <div key={n} className="skeleton skeleton-item" style={{ height: "100px", marginBottom: "16px" }}></div>
                  ))}
                </div>
              ) : customizations.length === 0 ? (
                <div className="empty-tab-state">
                  <p>Aún no has diseñado ninguna fórmula personalizada.</p>
                  <button className="btn btn-primary" onClick={() => navigateTo("customizer")}>
                    Personalizar Base
                  </button>
                </div>
              ) : (
                <div className="customizations-grid">
                  {customizations.map((custom) => (
                    <div key={custom._id} className="card custom-card-item">
                      <div className="custom-card-color-strip" style={{ backgroundColor: custom.custom_shade }}></div>
                      <div className="custom-card-body">
                        <h4 className="custom-base-name">
                          {custom.product_id?.name || "Base Personalizada"}
                        </h4>
                        <div className="custom-specs-row">
                          <span className="label">Acabado:</span>
                          <span className="val">{custom.finish_type}</span>
                        </div>
                        <div className="custom-specs-row">
                          <span className="label">Tono Hex:</span>
                          <span className="val">{custom.custom_shade.toUpperCase()}</span>
                        </div>
                        {custom.allergy_notes && (
                          <div className="custom-allergy-alert">
                            <strong>Alergias:</strong> {custom.allergy_notes}
                          </div>
                        )}
                        <span className="custom-date-label">
                          Creado el: {new Date(custom.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* CSS Styles for Profile */}
      <style>{`
        .profile-container {
          padding-top: 40px;
          padding-bottom: 80px;
        }
        .profile-layout {
          display: grid;
          grid-template-columns: 1fr 2.2fr;
          gap: 40px;
        }
        .profile-user-card {
          padding: 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .profile-avatar-large {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background-color: var(--color-secondary);
          color: var(--color-primary);
          font-size: 32px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          box-shadow: var(--shadow-sm);
        }
        .profile-user-name {
          font-size: 24px;
          margin-bottom: 4px;
        }
        .profile-user-email {
          font-size: 13.5px;
          color: var(--color-text-muted);
          margin-bottom: 24px;
        }
        .profile-details-list {
          width: 100%;
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
          padding: 20px 0;
          margin-bottom: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          text-align: left;
        }
        .profile-details-list .detail-item {
          display: flex;
          justify-content: space-between;
          font-size: 13.5px;
        }
        .profile-details-list .detail-item .label {
          font-weight: 600;
          color: var(--color-text-muted);
        }
        .profile-details-list .detail-item .val {
          font-weight: 500;
          color: var(--color-primary);
        }
        .capitalize {
          text-transform: capitalize;
        }
        .logout-btn {
          width: 100%;
          color: var(--color-error);
          border-color: rgba(198, 40, 40, 0.2);
        }
        .logout-btn:hover {
          background-color: #FFEBEE;
          border-color: var(--color-error);
        }
        .profile-tabs {
          display: flex;
          border-bottom: 2px solid var(--color-border);
          margin-bottom: 28px;
          gap: 24px;
        }
        .profile-tab-btn {
          background: none;
          border: none;
          font-family: var(--font-sans);
          font-size: 16px;
          font-weight: 600;
          color: var(--color-text-muted);
          padding-bottom: 14px;
          cursor: pointer;
          position: relative;
        }
        .profile-tab-btn.active {
          color: var(--color-primary);
        }
        .profile-tab-btn.active::after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2.5px;
          background-color: var(--color-accent);
        }
        .empty-tab-state {
          text-align: center;
          padding: 60px 24px;
          background-color: var(--color-white);
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          color: var(--color-text-muted);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        .orders-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .order-card {
          padding: 24px;
        }
        .order-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--color-border);
          padding-bottom: 14px;
          margin-bottom: 16px;
        }
        .order-id-label {
          font-family: var(--font-sans);
          font-weight: 600;
          color: var(--color-primary);
          font-size: 15px;
          margin-right: 12px;
        }
        .order-date-label {
          font-size: 13px;
          color: var(--color-text-muted);
        }
        .order-products-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 16px;
        }
        .order-product-item {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
        }
        .order-product-item .product-name {
          font-weight: 500;
          color: var(--color-text);
        }
        .order-product-item .product-qty-price {
          color: var(--color-text-muted);
        }
        .order-card-footer {
          border-top: 1px dashed var(--color-border);
          padding-top: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13.5px;
          margin-bottom: 14px;
        }
        .order-shipping-summary {
          max-width: 60%;
          color: var(--color-text-muted);
        }
        .order-total-summary {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 16px;
        }
        .order-total-summary strong {
          font-family: var(--font-serif);
          font-size: 20px;
          color: var(--color-primary);
        }
        .cancel-order-btn {
          width: 100%;
          padding: 8px 0;
          font-size: 13px;
          border-color: rgba(198, 40, 40, 0.2);
          color: var(--color-error);
        }
        .cancel-order-btn:hover {
          background-color: #FFEBEE;
          border-color: var(--color-error);
        }
        .customizations-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .custom-card-item {
          display: flex;
          flex-direction: column;
        }
        .custom-card-color-strip {
          height: 12px;
          width: 100%;
        }
        .custom-card-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .custom-base-name {
          font-family: var(--font-serif);
          font-size: 18px;
          margin-bottom: 4px;
        }
        .custom-specs-row {
          display: flex;
          justify-content: space-between;
          font-size: 13.5px;
        }
        .custom-specs-row .label {
          font-weight: 600;
          color: var(--color-text-muted);
        }
        .custom-specs-row .val {
          font-weight: 500;
          color: var(--color-primary);
        }
        .custom-allergy-alert {
          font-size: 12.5px;
          color: var(--color-error);
          background-color: #FFEBEE;
          padding: 6px 10px;
          border-radius: var(--radius-sm);
          margin-top: 4px;
        }
        .custom-date-label {
          font-size: 11px;
          color: var(--color-text-muted);
          margin-top: 8px;
          display: block;
        }
        .profile-login-prompt {
          text-align: center;
          padding: 100px 24px;
          color: var(--color-text-muted);
        }

        @media (max-width: 900px) {
          .profile-layout { grid-template-columns: 1fr; }
          .customizations-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

export default Profile;
