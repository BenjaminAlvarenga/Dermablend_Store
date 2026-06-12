import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import useFetchEmployees from "./useFetchEmployees";

const useDataEmployee = (methods) => {
  const [dataEmployee, setDataEmployee] = useState([]);
  const { getEmployeeById, getEmployees } = useFetchEmployees();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const navigate = useNavigate();

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
    loadEmployee();
  }, [id]);

  return {
    dataEmployee,
    setDataEmployee,
    register,
    handleSubmit: handleSubmit(handleEmployeeAction),
    errors,
    getEmployeeById,
    handleUpdateEmployee,
    loadEmployee
  }
};

export default useDataEmployee;
