import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import DashboardService from "../../services/Dashboard";

const useDataDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);

  const getStats = async () => {
    try {
      const data = await DashboardService.getStats();
      setStats(data);
    } catch (error) {
      console.log("Error al obtener las estadisticas:", error);
      toast.error("Error al obtener las estadisticas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    getStats();
  }, []);

  return { stats, loading };
};

export default useDataDashboard;
