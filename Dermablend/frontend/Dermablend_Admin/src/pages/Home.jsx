// Home.jsx muestra la pantalla principal del usuario una vez que ya está autenticado.
// También se asegura de que la página no esté disponible si no existe token.
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/UI/Nav.jsx"; // Componente de navegación que se muestra cuando el usuario está logueado.

const Home = () => {
  const navigate = useNavigate();
  const token =
    localStorage.getItem("fakestore_token") ||
    sessionStorage.getItem("fakestore_token");
  const user =
    localStorage.getItem("fakestore_user") ||
    sessionStorage.getItem("fakestore_user") ||
    "";

  useEffect(() => {
    if (!token) navigate("/");
  }, [navigate, token]);

  const handleLogout = () => {
    localStorage.removeItem("fakestore_token");
    localStorage.removeItem("fakestore_user");
    localStorage.removeItem("fakestore_email");
    sessionStorage.removeItem("fakestore_token");
    sessionStorage.removeItem("fakestore_user");
    sessionStorage.removeItem("fakestore_email");
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center flex-grow">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-blue-600">
            Bienvenido {user ? `, ${user}` : ""}
          </h1>
        </header>
        <main className="mt-8">
          <button
            onClick={handleLogout}
            className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Cerrar Sesión
          </button>
        </main>
      </div>
    </div>
  );
};

export default Home;
