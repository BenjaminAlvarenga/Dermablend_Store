import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const useDataOrders = (methods) => {
  const [dataOrders, setDataOrders] = useState([]);
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const navigate = useNavigate();

  const getOrders = async () => {
    try {
      const response = await fetch("apiurl");
      if (!response.ok) {
        toast.error("Error al obtener las ordenes");
        throw new Error("Error al obtener las ordenes");
      }
      const data = await response.json();
      setDataOrders(data);
    } catch (error) {
      console.log("Error al obtener las ordenes:", error);
      toast.error("Error al obtener las ordenes");
    }
  };

  const getOrderById = async (id) => {
    try {
      const response = await fetch(`apiurl/${id}`);
      if (!response.ok) {
        toast.error("Error al obtener la orden");
        throw new Error("Error al obtener la orden");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Error al obtener la orden:", error);
      toast.error("Error al obtener la orden");
    }
  };

  const saveOrderForm = async (dataForm) => {
    try {
      const response = await fetch("apiurl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataForm),
      });
      if (!response.ok) {
        toast.error("Error al guardar la orden");
        throw new Error("Error al guardar la orden");
      }
      toast.success("Orden guardada correctamente");
      navigate("/orders");
    } catch (error) {
      console.log("Error al enviar la orden:", error);
    } finally {
      reset();
      getOrders();
    }
  };

  const editOrder = async (dataForm) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataForm),
      });
      if (!response.ok) {
        toast.error("Error al actualizar la orden");
        throw new Error("Error al actualizar la orden");
      }
      toast.success("Orden actualizada correctamente");
      navigate("/orders");
    } catch (error) {
      console.log("Error al actualizar la orden:", error);
      toast.error("Error al actualizar la orden");
    } finally {
      reset();
      getOrders();
    }
  };

  const deleteOrder = async (id) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });
      toast.success("Orden eliminada correctamente");
      console.log("Orden eliminada:", response);
      getOrders();
    } catch (error) {
      console.error("Error eliminando la orden:", error);
      toast.error("Error al eliminar la orden");
    } finally {
      getOrders();
    }
  };

  const handleOrderAction = (dataForm) => {
    if(id) {
        editOrder(dataForm);
    }else{
        saveOrderForm(dataForm);
    }
  }

  const handleUpdateOrder = async (id) => {
    navigate(`/orders/${id}`);
  };

  const loadOrder = async () => {
    if(id) {
        const order = await getOrderById(id);
        if(order) {
            reset({
                client_id: order?.client_id,
                products: order?.products,
                total_amount: order?.total_amount,
                status: order?.status,
                payment_method: order?.payment_method,
                shipping_address: order?.shipping_address,
                order_date: order?.order_date,
            })
        }
    }
  }

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    loadOrder();
  }, [id]);

  return {
    dataOrders,
    setDataOrders,
    register,
    handleSubmit: handleSubmit(handleOrderAction),
    errors,
    getOrders,
    getOrderById,
    deleteOrder,
    handleUpdateOrder,
    loadOrder
  }
};

export default useDataOrders;
