// Home.jsx muestra el dashboard principal del admin una vez que ya está autenticado.
// También se asegura de que la página no esté disponible si no existe token.
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiTrendingUp, FiClipboard, FiCreditCard, FiUser } from "react-icons/fi";
import HomeCard from "../components/HomeCard.jsx";
import SalesBarChart from "../components/charts/SalesBarChart.jsx";
import NationalSalesDonut from "../components/charts/NationalSalesDonut.jsx";
import useDataDashboard from "../hooks/dashboard/useDataDashboard.jsx";

const Home = () => {
  const navigate = useNavigate();
  const token =
    localStorage.getItem("fakestore_token") ||
    sessionStorage.getItem("fakestore_token");
  const user =
    localStorage.getItem("fakestore_user") ||
    sessionStorage.getItem("fakestore_user") ||
    "Admin";

  const { stats, loading } = useDataDashboard();

  useEffect(() => {
    if (!token) navigate("/");
  }, [navigate, token]);

  if (loading || !stats) return null;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl text-[#3a1e08]">
        Bienvenido! <span className="font-bold">{user}</span>
      </h1>

      <div className="flex flex-wrap gap-4">
        <HomeCard
          label="Ventas totales"
          value={`$${stats.totalSales.toLocaleString()}`}
          icon={FiTrendingUp}
        />
        <HomeCard
          label="Pedidos Pendientes"
          value={stats.pendingOrders}
          sublabel="Requieren atención"
          icon={FiClipboard}
        />
        <HomeCard
          label="Productos Activos"
          value={stats.activeProducts}
          icon={FiCreditCard}
        />
        <HomeCard label="Nuevos Usuarios" value={stats.newUsers} icon={FiUser} />
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="min-w-0 lg:flex-[2]">
          <SalesBarChart data={stats.monthlySales} />
        </div>
        <div className="flex justify-center lg:block">
          <NationalSalesDonut percentage={stats.deliveredRate} />
        </div>
      </div>
    </div>
  );
};

export default Home;
