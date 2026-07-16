import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import ReviewsService from "../../services/Reviews";

// Las reseñas son de solo lectura en el Admin (crear/editar/eliminar es
// exclusivo del cliente en la tienda pública), así que este hook solo lista.
const useDataReviews = () => {
  const [dataReviews, setDataReviews] = useState([]);
  const hasFetched = useRef(false);

  const getReviews = async () => {
    try {
      const data = await ReviewsService.get();
      setDataReviews(data.data || []);
    } catch (error) {
      console.log("Error al obtener las reseñas:", error);
      toast.error("Error al obtener las reseñas");
    }
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    getReviews();
  }, []);

  return {
    dataReviews,
    getReviews,
  }
};

export default useDataReviews;
