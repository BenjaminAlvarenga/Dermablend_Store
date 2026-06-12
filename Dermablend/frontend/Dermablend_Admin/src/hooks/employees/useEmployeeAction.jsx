import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useEmployeeAction = (getEmployees) => {
  const navigate = useNavigate();

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

  const handleUpdateEmployee = (id) => {
    navigate(`/employees/${id}`);
  };

  return { deleteEmployee, handleUpdateEmployee };
};

export default useEmployeeAction;
