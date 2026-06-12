import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const useFetchEmployees = () => {
  const [dataEmployee, setDataEmployee] = useState([]);

  const getEmployees = async () => {
    try {
      const response = await fetch("apiurl");
      if (!response.ok) {
        toast.error("Error al obtener los empleados");
        throw new Error("Error al obtener los empleados");
      }
      const data = await response.json();
      setDataEmployee(data);
    } catch (error) {
      console.log("Error al obtener los empleados:", error);
      toast.error("Error al obtener los empleados");
    }
  };

  const getUserById = async (id) => {
    try {
      const response = await fetch(`apiurl/${id}`);
      if (!response.ok) {
        toast.error("Error al obtener el empleado");
        throw new Error("Error al obtener el empleado");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Error al obtener el empleado:", error);
      toast.error("Error al obtener el empleado");
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return { dataEmployee, setDataEmployee, getEmployees, getUserById };
};

export default useFetchEmployees;