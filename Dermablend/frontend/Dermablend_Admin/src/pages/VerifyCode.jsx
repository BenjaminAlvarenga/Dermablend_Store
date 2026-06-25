// Login.jsx contiene la pantalla de inicio de sesión.
// Para este ejemplo se usa un usuario fijo en memoria y se crea un token falso.
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../img/Dermablend.png";

// Lista de usuarios válidos usados solo para la demo del login.
// Esta lista no viene de ninguna API; es solo un conjunto de credenciales locales.
const users = [
  {
    id: 1,
    email: "john@gmail.com",
    username: "johnd",
    password: "12345",
  },
  {
    id: 2,
    email: "morrison@gmail.com",
    username: "mor_2314",
    password: "12345",
  },
  {
    id: 3,
    email: "kevin@gmail.com",
    username: "kevinryan",
    password: "12345",
  },
];

const VerifyCode = () => {
  // Estados para controlar los campos del formulario y su comportamiento.
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Si ya existe un token, el usuario ya está autenticado.
    // Entonces redirige directamente a la página de inicio.
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

    // Validación simple de los campos antes de continuar.
    if (!code.trim()) {
      setError("Código incorrecto");
      return;
    }

    setLoading(true);
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
            </label>
          </div>

          <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700">
                Código de verificación
              </label>
              <input
                type="text"
                placeholder="XXXXXX"
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

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-2xl bg-[#472825]/80 px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#472825]/65 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              <p>Confirmar código</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
