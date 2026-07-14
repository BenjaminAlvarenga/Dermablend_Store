import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import ReviewsService from "../../services/Reviews";

const useDataReviews = (methods) => {
  const [dataReviews, setDataReviews] = useState([]);
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const navigate = useNavigate();

  const getReviews = async () => {
    try {
      const data = await ReviewsService.get();
      setDataReviews(data);
    } catch (error) {
      console.log("Error al obtener las reseñas:", error);
      toast.error("Error al obtener las reseñas");
    }
  };

  const getReviewById = async (id) => {
    try {
      return await ReviewsService.getById(id);
    } catch (error) {
      console.log("Error al obtener la reseña:", error);
      toast.error("Error al obtener la reseña");
    }
  };

  const saveReviewForm = async (dataForm) => {
    try {
      await ReviewsService.post(dataForm);
      toast.success("Reseña guardada correctamente");
      navigate("/reviews");
    } catch (error) {
      console.log("Error al enviar la reseña:", error);
      toast.error("Error al guardar la reseña");
    } finally {
      reset();
      getReviews();
    }
  };

  const editReview = async (dataForm) => {
    try {
      await ReviewsService.put(id, dataForm);
      toast.success("Reseña actualizada correctamente");
      navigate("/reviews");
    } catch (error) {
      console.log("Error al actualizar la reseña:", error);
      toast.error("Error al actualizar la reseña");
    } finally {
      reset();
      getReviews();
    }
  };

  const deleteReview = async (id) => {
    try {
      await ReviewsService.delete(id);
      toast.success("Reseña eliminada correctamente");
    } catch (error) {
      console.error("Error eliminando la reseña:", error);
      toast.error("Error al eliminar la reseña");
    } finally {
      getReviews();
    }
  };

  const handleReviewAction = (dataForm) => {
    if(id) {
        editReview(dataForm);
    }else{
        saveReviewForm(dataForm);
    }
  }

  const handleUpdateReview = async (id) => {
    navigate(`/reviews/${id}`);
  };

  const loadReview = async () => {
    if(id) {
        const review = await getReviewById(id);
        if(review) {
            reset({
                client_id: review?.client_id,
                product_id: review?.product_id,
                rating: review?.rating,
                comment: review?.comment,
                review_date: review?.review_date,
            })
        }
    }
  }

  useEffect(() => {
    getReviews();
  }, []);

  useEffect(() => {
    loadReview();
  }, [id]);

  return {
    dataReviews,
    setDataReviews,
    register,
    handleSubmit: handleSubmit(handleReviewAction),
    errors,
    getReviews,
    getReviewById,
    deleteReview,
    handleUpdateReview,
    loadReview
  }
};

export default useDataReviews;