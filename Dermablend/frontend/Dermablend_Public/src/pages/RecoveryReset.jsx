import React, { useState } from "react";
import { API_BASE_URL } from "../App.jsx";

function RecoveryReset({ token, navigateTo }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!newPassword || !confirmPassword) {
      setError("Por favor completa todos los campos.");
      return;
    }

    if (newPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/recovery/reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error al restablecer contraseña.");
      }
      setSuccess(data.message || "Contraseña restablecida exitosamente. Redirigiendo...");
      setTimeout(() => {
        // Clear search query parameters in URL
        window.history.pushState({}, document.title, window.location.pathname);
        navigateTo("home");
      }, 3000);
    } catch (err) {
      setError(err.message || "Error al restablecer la contraseña. El enlace puede haber expirado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container reset-container animate-fade-in">
      <div className="reset-card">
        <h2 className="reset-title">Restablecer Contraseña</h2>
        <p className="reset-desc">Ingresa tu nueva contraseña para recuperar el acceso a tu cuenta.</p>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit} className="reset-form">
          <div className="form-group">
            <label className="form-label">Nueva Contraseña</label>
            <input
              type="password"
              className="form-input"
              placeholder="Mínimo 6 caracteres"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Confirmar Contraseña</label>
            <input
              type="password"
              className="form-input"
              placeholder="Repite la contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? "Actualizando..." : "Restablecer Contraseña"}
          </button>
        </form>
      </div>

      <style>{`
        .reset-container {
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 80px;
          padding-bottom: 80px;
        }
        .reset-card {
          background-color: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 40px;
          width: 100%;
          max-width: 440px;
          box-shadow: var(--shadow-md);
        }
        .reset-title {
          font-family: var(--font-serif);
          font-size: 28px;
          color: var(--color-primary);
          margin-bottom: 12px;
          text-align: center;
        }
        .reset-desc {
          font-size: 14px;
          color: var(--color-text-muted);
          text-align: center;
          margin-bottom: 30px;
        }
        .reset-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
      `}</style>
    </div>
  );
}

export default RecoveryReset;
