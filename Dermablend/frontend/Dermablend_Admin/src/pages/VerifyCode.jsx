// VerifyCode.jsx recibe el código enviado por correo y la nueva contraseña,
// y llama al backend para completar el restablecimiento en un solo paso.
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../img/Dermablend.png";
import AuthService from "../services/Auth";

const VerifyCode = () => {
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    const token =
      localStorage.getItem("fakestore_token") ||
      sessionStorage.getItem("fakestore_token");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!code.trim()) {
      setError("Por favor ingresa el código que recibiste por correo.");
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setError("La nueva contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);

    try {
      await AuthService.resetPassword(code.trim(), newPassword);
      setSuccess("Contraseña restablecida correctamente. Redirigiendo...");
      setTimeout(() => navigate("/"), 2000);
    } catch (error_) {
      setError(
        error_.message || "El código es inválido o ha expirado. Intenta nuevamente.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[url('.././img/background_img.png')] bg-cover bg-center px-4 py-10 flex items-center justify-center ">
      <div className="flex w-full lg:max-w-xl sm:max-w-lg flex-col gap-8 rounded-4xl bg-white p-6 shadow-xl shadow-slate-200/50 sm:items-center">
        <div className="w-full">
          <div className="max-w-xl">
            <img src={logo} alt="" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 flex align-center justify-center">
              Introduce el código que te hemos enviado hacia tu correo electrónico
              {email ? ` (${email})` : ""}
            </label>
          </div>

          <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700">
                Código de verificación
              </label>
              <input
                type="text"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                placeholder="XXXXXX"
                className="w-full rounded-2xl border border-slate-200 bg-[#D3AB80]/70 px-4 py-3 text-slate-900 outline-none transition duration-200 focus:border-indigo-500 focus:bg-[#D3AB80]/50"
                required
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700">
                Nueva contraseña
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="w-full rounded-2xl border border-slate-200 bg-[#D3AB80]/70 px-4 py-3 text-slate-900 outline-none transition duration-200 focus:border-indigo-500 focus:bg-[#D3AB80]/50"
                required
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700">
                Confirmar contraseña
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Repite la contraseña"
                className="w-full rounded-2xl border border-slate-200 bg-[#D3AB80]/70 px-4 py-3 text-slate-900 outline-none transition duration-200 focus:border-indigo-500 focus:bg-[#D3AB80]/50"
                required
              />
            </div>

            {error && (
              <div
                className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                role="alert"
                aria-live="polite"
              >
                {error}
              </div>
            )}

            {success && (
              <div
                className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
                role="status"
                aria-live="polite"
              >
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-2xl bg-[#472825]/80 px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#472825]/65 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              <p>{loading ? "Restableciendo..." : "Restablecer contraseña"}</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
