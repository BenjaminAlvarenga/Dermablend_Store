import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import EmployeesService from "../../services/Employees";

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
      const data = await EmployeesService.get();
      setDataEmployee(data);
    } catch (error) {
      console.log("Error al obtener los empleados:", error);
      toast.error("Error al obtener los empleados");
    }
  };

  const getEmployeeById = async (id) => {
    try {
      return await EmployeesService.getById(id);
    } catch (error) {
      console.log("Error al obtener el empleado:", error);
      toast.error("Error al obtener el empleado");
    }
  };

  const saveEmployeeForm = async (dataForm) => {
    try {
      await EmployeesService.post(dataForm);
      toast.success("Empleado guardado correctamente");
      navigate("/employees");
    } catch (error) {
      console.log("Error al enviar el empleado:", error);
      toast.error("Error al guardar el empleado");
    } finally {
      reset();
      getEmployees();
    }
  };

  const editEmployee = async (dataForm) => {
    try {
      await EmployeesService.put(id, dataForm);
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
      await EmployeesService.delete(id);
      toast.success("Empleado eliminado correctamente");
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
                name: employee?.name,
                email: employee?.email,
                role: employee?.role,
                hire_date: employee?.hire_date,
                salary: employee?.salary,
                status: employee?.status,
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