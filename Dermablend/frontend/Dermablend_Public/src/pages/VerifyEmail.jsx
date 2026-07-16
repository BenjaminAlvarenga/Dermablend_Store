import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../App.jsx";

function VerifyEmail({ token, navigateTo }) {
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Enlace de verificación inválido.");
      return;
    }

    fetch(`${API_BASE_URL}/auth/verify-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token })
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "No se pudo verificar tu cuenta.");
        }
        setStatus("success");
        setMessage(data.message || "Cuenta verificada correctamente. ¡Ya puedes realizar compras!");
      })
      .catch((err) => {
        setStatus("error");
        setMessage(err.message || "El enlace de verificación es inválido o ha expirado.");
      });
  }, [token]);

  return (
    <div className="container reset-container animate-fade-in">
      <div className="reset-card">
        <h2 className="reset-title">Confirmación de cuenta</h2>

        {status === "loading" && <p className="reset-desc">Verificando tu cuenta...</p>}
        {status === "success" && <div className="alert alert-success">{message}</div>}
        {status === "error" && <div className="alert alert-error">{message}</div>}

        <button
          className="btn btn-primary w-full"
          onClick={() => navigateTo("home")}
          style={{ marginTop: "20px" }}
        >
          Ir a la tienda
        </button>
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
          text-align: center;
        }
        .reset-title {
          font-family: var(--font-serif);
          font-size: 28px;
          color: var(--color-primary);
          margin-bottom: 20px;
        }
        .reset-desc {
          font-size: 14px;
          color: var(--color-text-muted);
        }
        .alert {
          text-align: left;
        }
      `}</style>
    </div>
  );
}

export default VerifyEmail;
