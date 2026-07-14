import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import ClientsService from "../../services/Clients";

const useDataClients = (methods) => {
  const [dataClients, setDataClients] = useState([]);
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const navigate = useNavigate();

  const getClients = async () => {
    try {
      const data = await ClientsService.get();
      setDataClients(data);
    } catch (error) {
      console.log("Error al obtener los clientes:", error);
      toast.error("Error al obtener los clientes");
    }
  };

  const getClientById = async (id) => {
    try {
      return await ClientsService.getById(id);
    } catch (error) {
      console.log("Error al obtener el cliente:", error);
      toast.error("Error al obtener el cliente");
    }
  };

  const saveClientForm = async (dataForm) => {
    try {
      await ClientsService.post(dataForm);
      toast.success("Cliente guardado correctamente");
      navigate("/clients");
    } catch (error) {
      console.log("Error al enviar el cliente:", error);
      toast.error("Error al guardar el cliente");
    } finally {
      reset();
      getClients();
    }
  };

  const editClient = async (dataForm) => {
    try {
      await ClientsService.put(id, dataForm);
      toast.success("Cliente actualizado correctamente");
      navigate("/clients");
    } catch (error) {
      console.log("Error al actualizar el cliente:", error);
      toast.error("Error al actualizar el cliente");
    } finally {
      reset();
      getClients();
    }
  };

  const deleteClient = async (id) => {
    try {
      await ClientsService.delete(id);
      toast.success("Cliente eliminado correctamente");
    } catch (error) {
      console.error("Error eliminando al cliente:", error);
      toast.error("Error al eliminar al cliente");
    } finally {
      getClients();
    }
  };

  const handleClientAction = (dataForm) => {
    if(id) {
        editClient(dataForm);
    }else{
        saveClientForm(dataForm);
    }
  }

  const handleUpdateClient = async (id) => {
    navigate(`/clients/${id}`);
  };

  const loadClient = async () => {
    if(id) {
        const client = await getClientById(id);
        if(client) {
            reset({
                name: client?.name,
                email: client?.email,
                birthdate: client?.birthdate,
                phone: client?.phone,
                isActive: client?.isActive,
            })
        }
    }
  }

  useEffect(() => {
    getClients();
  }, []);

  useEffect(() => {
    loadClient();
  }, [id]);

  return {
    dataClients,
    setDataClients,
    register,
    handleSubmit: handleSubmit(handleClientAction),
    errors,
    getClients,
    getClientById,
    deleteClient,
    handleUpdateClient,
    loadClient
  }
};

export default useDataClients;
