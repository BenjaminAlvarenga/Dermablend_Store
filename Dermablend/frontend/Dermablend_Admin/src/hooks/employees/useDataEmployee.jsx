import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const useDataEmployee = (methods) => {
  const [dataEmployee, setDataEmployee] = useState([]);
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const navigate = useNavigate();

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

  const getEmployeeById = async (id) => {
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

  const saveEmployeeForm = async (dataForm) => {
    try {
      const response = await fetch("apiurl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataForm),
      });
      if (!response.ok) {
        toast.error("Error al guardar el empleado");
        throw new Error("Error al guardar el empleado");
      }
      toast.success("Empleado guardado correctamente");
      navigate("/employees");
    } catch (error) {
      console.log("Error al enviar el empleado:", error);
    } finally {
      reset();
      getEmployees();
    }
  };

  const editEmployee = async (dataForm) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataForm),
      });
      if (!response.ok) {
        toast.error("Error al actualizar al empleado");
        throw new Error("Error al actualizar al empleado");
      }
      toast.success("Empleado actualizado correctamente");
      navigate("/employees");
    } catch (error) {
      console.log("Error al actualizar el empleado:", error);
      toast.error("Error al actualizar el empleado");
    } finally {
      reset();
      getEmployees();
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });
      toast.success("Empleado eliminado correctamente");
      console.log("Empleado eliminado:", response);
      getEmployees();
    } catch (error) {
      console.error("Error eliminando al empleado:", error);
      toast.error("Error al eliminar al empleado");
    } finally {
      getEmployees();
    }
  };

  const handleEmployeeAction = (dataForm) => {
    if(id) {
        editEmployee(dataForm);
    }else{
        saveEmployeeForm(dataForm);
    }
  }

  const handleUpdateEmployee = async (id) => {
    navigate(`/employees/${id}`);
  };

  const loadEmployee = async () => {
    if(id) {
        const employee = await getEmployeeById(id);
        if(employee) {
            reset({
                nombre: employee?.name,
                email: employee?.email,
                rol: employee?.role,
                fechaContratacion: employee?.hire_date,
                salario: employee?.salary,
                estatus: employee?.status,
            })
        }
    }
  }

  useEffect(() => {
    getEmployees();
  }, []);

  useEffect(() => {
    loadEmployee();
  }, [id]);

  return {
    dataEmployee,
    setDataEmployee,
    register,
    handleSubmit: handleSubmit(handleEmployeeAction),
    errors,
    getEmployees,
    getEmployeeById,
    deleteEmployee,
    handleUpdateEmployee,
    loadEmployee
  }
};

export default useDataEmployee;
