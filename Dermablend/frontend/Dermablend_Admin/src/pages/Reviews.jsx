import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTestListReviews from "../components/lists/DataTestListReviews";
import useDataReviews from "../hooks/reviews/useDataReviews";

// Las reseñas solo se pueden leer desde el Admin: crearlas/editarlas/borrarlas
// es una acción exclusiva del cliente en la tienda pública.
const Reviews = () => {
  const navigate = useNavigate();
  const token =
    localStorage.getItem("fakestore_token") ||
    sessionStorage.getItem("fakestore_token");

  const { dataReviews } = useDataReviews();

  useEffect(() => {
    if (!token) navigate("/");
  }, [navigate, token]);

  return (
    <div>
      <div className="flex min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-50 px-4 py-10">
        <div className="mx-auto w-full max-w-6xl space-y-6">
          <header className="rounded-3xl px-6 py-8 text-white shadow-xl shadow-slate-200">
            <h1 className="text-3xl text-[#472825] font-bold sm:text-4xl">Reseñas</h1>
          </header>

          <DataTestListReviews dataReviews={dataReviews} />
        </div>
      </div>
    </div>
  );
};

export default Reviews;
