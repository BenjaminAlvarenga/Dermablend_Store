import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const useFetchOrders = () => {
  const [dataOrders, setDataOrders] = useState([]);

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
        toast.error("Error al obtener las ordenes");
        throw new Error("Error al obtener las ordenes");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Error al obtener las ordenes:", error);
      toast.error("Error al obtener las ordenes");
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return { dataOrders, setDataOrders, getOrders, getOrderById };
};

export default useFetchOrders;