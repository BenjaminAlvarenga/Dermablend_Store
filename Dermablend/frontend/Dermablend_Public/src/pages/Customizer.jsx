import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../App.jsx";

function Customizer({ user, token, navigateTo, openAuth }) {
  const [customizableProducts, setCustomizableProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [selectedProductId, setSelectedProductId] = useState("");
  const [customShade, setCustomShade] = useState("#F5D6C4"); // default skin shade
  const [finishType, setFinishType] = useState("Matte");
  const [allergyNotes, setAllergyNotes] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Preset skin shade palettes for easy selection
  const shadePresets = [
    { name: "Porcelana Clara", hex: "#FCE5D8" },
    { name: "Marfil Cálido", hex: "#F5D6C4" },
    { name: "Beige Natural", hex: "#E9C0A7" },
    { name: "Miel Dorado", hex: "#D9A485" },
    { name: "Bronce Caliente", hex: "#C28965" },
    { name: "Marrón Espresso", hex: "#7E543A" }
  ];

  useEffect(() => {
    // Fetch customizable products
    fetch(`${API_BASE_URL}/products?is_customizable=true`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setCustomizableProducts(data.data);
          if (data.data.length > 0) {
            setSelectedProductId(data.data[0]._id);
          }
        }
      })
      .catch((err) => console.error("Error loading customizable products:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!user) {
      openAuth("login");
      return;
    }

    if (!selectedProductId || !customShade || !finishType) {
      setError("Por favor completa los campos requeridos.");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(`${API_BASE_URL}/customizations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          client_id: user._id || user.id,
          product_id: selectedProductId,
          custom_shade: customShade,
          finish_type: finishType,
          allergy_notes: allergyNotes.trim()
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error al guardar la fórmula.");
      }

      setSuccess("¡Fórmula guardada correctamente! La verás en tu perfil.");
      setTimeout(() => {
        navigateTo("profile");
      }, 1500);
    } catch (err) {
      setError(err.message || "Error al procesar la personalización.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container customizer-container animate-fade-in">
      <div className="customizer-header">
        <h1 className="customizer-title">Diseña tu Fórmula Exclusiva</h1>
        <p className="customizer-subtitle">
          Elige el producto base y adáptalo a tu tono de piel y acabado favorito. Guardaremos la fórmula en tu perfil.
        </p>
      </div>

      {!user ? (
        <div className="customizer-login-prompt">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <line x1="18" y1="8" x2="23" y2="13"></line>
            <line x1="23" y1="8" x2="18" y2="13"></line>
          </svg>
          <h3>Inicia sesión para personalizar</h3>
          <p>Para crear y guardar fórmulas a medida necesitas tener una cuenta de cliente activa.</p>
          <button className="btn btn-primary" onClick={() => openAuth("login")}>
            Iniciar Sesión
          </button>
        </div>
      ) : loading ? (
        <div className="customizer-loading">
          <div className="skeleton form-skeleton"></div>
        </div>
      ) : customizableProducts.length === 0 ? (
        <div className="empty-catalog">
          <h3>No hay productos personalizables disponibles</h3>
          <button className="btn btn-secondary" onClick={() => navigateTo("catalog")}>
            Ver Catálogo
          </button>
        </div>
      ) : (
        <div className="customizer-layout">
          {/* Left Column: Form Details */}
          <div className="customizer-form-col">
            {error && <div className="alert alert-error">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit} className="customizer-form-box">
              {/* Product selector */}
              <div className="form-group">
                <label className="form-label">Producto Base</label>
                <select
                  className="form-input"
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  required
                >
                  {customizableProducts.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.name} - ${p.price.toFixed(2)} ({p.shade})
                    </option>
                  ))}
                </select>
              </div>

              {/* Shade Selection Palette */}
              <div className="form-group">
                <label className="form-label">Tono de Piel Deseado</label>
                <p className="form-desc-text">Selecciona una de nuestras tonalidades de referencia:</p>
                <div className="shades-palette-grid">
                  {shadePresets.map((preset) => (
                    <button
                      key={preset.hex}
                      type="button"
                      className={`shade-circle-btn ${customShade === preset.hex ? "active" : ""}`}
                      style={{ backgroundColor: preset.hex }}
                      title={preset.name}
                      onClick={() => setCustomShade(preset.hex)}
                    />
                  ))}
                </div>
                <div className="custom-color-picker-row">
                  <span className="form-desc-text">O elige un color libremente:</span>
                  <input
                    type="color"
                    className="color-picker-input"
                    value={customShade}
                    onChange={(e) => setCustomShade(e.target.value)}
                  />
                  <span className="color-hex-label">{customShade.toUpperCase()}</span>
                </div>
              </div>

              {/* Finish selector */}
              <div className="form-group">
                <label className="form-label">Acabado de Textura</label>
                <div className="finish-radio-group">
                  {["Matte", "Satin", "Dewy", "Glow"].map((fin) => (
                    <button
                      key={fin}
                      type="button"
                      className={`finish-option-pill ${finishType === fin ? "active" : ""}`}
                      onClick={() => setFinishType(fin)}
                    >
                      {fin}
                    </button>
                  ))}
                </div>
              </div>

              {/* Allergy notes */}
              <div className="form-group">
                <label className="form-label">Notas de Alergias (Opcional)</label>
                <textarea
                  className="form-input"
                  rows="3"
                  placeholder="Ej: Sensible al ácido salicílico, libre de fragancias..."
                  value={allergyNotes}
                  onChange={(e) => setAllergyNotes(e.target.value)}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-full" disabled={saving}>
                {saving ? "Guardando Fórmula..." : "Guardar Fórmula de Personalización"}
              </button>
            </form>
          </div>

          {/* Right Column: Dynamic Bottle preview */}
          <div className="customizer-preview-col">
            <div className="bottle-preview-card">
              <h3 className="preview-card-title">Vista Previa de tu Fórmula</h3>
              
              <div className="preview-bottle-visual-wrapper">
                <div className="bottle-stem" style={{ backgroundColor: "#3E2723" }}></div>
                <div className="bottle-cap" style={{ backgroundColor: "#D3AB80" }}></div>
                {/* Bottle body displaying selected shade hex color */}
                <div
                  className="bottle-body"
                  style={{
                    backgroundColor: customShade,
                    boxShadow: `inset 0 0 20px rgba(0,0,0,0.1), 0 8px 30px rgba(0,0,0,0.05)`
                  }}
                >
                  <div className="bottle-label">
                    <span className="label-brand">Dermablend</span>
                    <span className="label-custom">A MEDIDA</span>
                    <span className="label-spec">{finishType.toUpperCase()}</span>
                  </div>
                </div>
              </div>

              <div className="preview-summary-specs">
                <div className="spec-item">
                  <span className="label">Base:</span>
                  <span className="val">
                    {customizableProducts.find(p => p._id === selectedProductId)?.name || "Ninguno"}
                  </span>
                </div>
                <div className="spec-item">
                  <span className="label">Tono Hex:</span>
                  <span className="val">{customShade.toUpperCase()}</span>
                </div>
                <div className="spec-item">
                  <span className="label">Acabado:</span>
                  <span className="val">{finishType}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Styles for Customizer */}
      <style>{`
        .customizer-container {
          padding-top: 40px;
          padding-bottom: 80px;
        }
        .customizer-header {
          text-align: center;
          margin-bottom: 40px;
        }
        .customizer-title {
          font-size: 38px;
          margin-bottom: 10px;
        }
        .customizer-subtitle {
          color: var(--color-text-muted);
          font-size: 15px;
          max-width: 650px;
          margin: 0 auto;
        }
        .customizer-login-prompt {
          text-align: center;
          padding: 80px 24px;
          background-color: var(--color-white);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--color-border);
          max-width: 500px;
          margin: 40px auto 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        .customizer-login-prompt svg {
          color: var(--color-secondary);
        }
        .customizer-login-prompt h3 {
          font-size: 24px;
          color: var(--color-primary);
        }
        .customizer-login-prompt p {
          font-size: 14px;
          color: var(--color-text-muted);
          margin-bottom: 8px;
        }
        .customizer-layout {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 60px;
          margin-top: 40px;
        }
        .customizer-form-box {
          background-color: var(--color-white);
          padding: 32px;
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-sm);
        }
        .form-desc-text {
          font-size: 13.5px;
          color: var(--color-text-muted);
          margin-bottom: 10px;
        }
        .shades-palette-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 12px;
          margin-bottom: 16px;
        }
        .shade-circle-btn {
          width: 100%;
          aspect-ratio: 1/1;
          border-radius: 50%;
          border: 2px solid transparent;
          cursor: pointer;
          transition: var(--transition-fast);
          box-shadow: var(--shadow-sm);
        }
        .shade-circle-btn:hover {
          transform: scale(1.1);
        }
        .shade-circle-btn.active {
          border-color: var(--color-primary);
          transform: scale(1.15);
        }
        .custom-color-picker-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .color-picker-input {
          width: 44px;
          height: 44px;
          border: none;
          border-radius: 50%;
          background: none;
          cursor: pointer;
        }
        .color-hex-label {
          font-family: var(--font-sans);
          font-weight: 600;
          color: var(--color-primary);
          font-size: 14px;
        }
        .finish-radio-group {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }
        .finish-option-pill {
          background-color: var(--color-bg);
          border: 1px solid var(--color-border);
          color: var(--color-text-muted);
          padding: 10px 0;
          text-align: center;
          border-radius: var(--radius-md);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .finish-option-pill:hover, .finish-option-pill.active {
          background-color: var(--color-primary);
          color: var(--color-white);
          border-color: var(--color-primary);
        }
        .bottle-preview-card {
          background-color: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 40px;
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .preview-card-title {
          font-size: 22px;
          margin-bottom: 30px;
        }
        .preview-bottle-visual-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 140px;
          margin-bottom: 36px;
        }
        .bottle-stem {
          width: 24px;
          height: 12px;
          border-radius: 4px 4px 0 0;
        }
        .bottle-cap {
          width: 48px;
          height: 32px;
          border-radius: 8px 8px 0 0;
        }
        .bottle-body {
          width: 110px;
          height: 160px;
          border-radius: 12px 12px 24px 24px;
          border: 2px solid var(--color-border);
          padding: 24px 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color var(--transition-smooth);
        }
        .bottle-label {
          background-color: rgba(255,255,255,0.85);
          backdrop-filter: blur(2px);
          border: 1px solid rgba(62,39,35,0.15);
          width: 100%;
          border-radius: 6px;
          padding: 10px 4px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .label-brand {
          font-family: var(--font-serif);
          font-size: 11px;
          font-weight: 700;
          color: var(--color-primary);
        }
        .label-custom {
          font-size: 7px;
          font-weight: 600;
          letter-spacing: 1px;
          color: var(--color-accent-dark);
          margin: 2px 0;
        }
        .label-spec {
          font-size: 7px;
          font-weight: 500;
          color: var(--color-text-muted);
        }
        .preview-summary-specs {
          width: 100%;
          border-top: 1px solid var(--color-border);
          padding-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .spec-item {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
        }
        .spec-item .label {
          font-weight: 600;
          color: var(--color-text-muted);
        }
        .spec-item .val {
          font-weight: 500;
          color: var(--color-primary);
        }

        @media (max-width: 900px) {
          .customizer-layout { grid-template-columns: 1fr; gap: 40px; }
        }
      `}</style>
    </div>
  );
}

export default Customizer;
