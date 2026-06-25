import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const useFetchProducts = () => {
  const [dataProducts, setDataProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await fetch("apiurl");
      if (!response.ok) {
        toast.error("Error al obtener las ordenes");
        throw new Error("Error al obtener las ordenes");
      }
      const data = await response.json();
      setDataProducts(data);
    } catch (error) {
      console.log("Error al obtener las ordenes:", error);
      toast.error("Error al obtener las ordenes");
    }
  };

  const getProductById = async (id) => {
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
    getProducts();
  }, []);

  return { dataProducts, setDataProducts, getProducts, getProductById };
};

export default useFetchProducts;