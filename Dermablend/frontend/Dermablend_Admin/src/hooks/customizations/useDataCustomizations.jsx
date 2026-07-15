import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import CustomizationsService from "../../services/Customizations";

const useDataCustomizations = (methods) => {
  const [dataCustomizations, setDataCustomizations] = useState([]);
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const navigate = useNavigate();

  const getCustomizations = async () => {
    try {
      const data = await CustomizationsService.get();
      setDataCustomizations(data);
    } catch (error) {
      console.log("Error al obtener las personalizaciones:", error);
      toast.error("Error al obtener las personalizaciones");
    }
  };

  const getCustomizationById = async (id) => {
    try {
      return await CustomizationsService.getById(id);
    } catch (error) {
      console.log("Error al obtener la personalización:", error);
      toast.error("Error al obtener la personalización");
    }
  };

  const saveCustomizationForm = async (dataForm) => {
    try {
      await CustomizationsService.post(dataForm);
      toast.success("Personalización guardada correctamente");
      navigate("/customizations");
    } catch (error) {
      console.log("Error al enviar la personalización:", error);
      toast.error("Error al guardar la personalización");
    } finally {
      reset();
      getCustomizations();
    }
  };

  const editCustomization = async (dataForm) => {
    try {
      await CustomizationsService.put(id, dataForm);
      toast.success("Personalización actualizada correctamente");
      navigate("/customizations");
    } catch (error) {
      console.log("Error al actualizar la personalización:", error);
      toast.error("Error al actualizar la personalización");
    } finally {
      reset();
      getCustomizations();
    }
  };

  const deleteCustomization = async (id) => {
    try {
      await CustomizationsService.delete(id);
      toast.success("Personalización eliminada correctamente");
    } catch (error) {
      console.error("Error eliminando la personalización:", error);
      toast.error("Error al eliminar la personalización");
    } finally {
      getCustomizations();
    }
  };

  const handleCustomizationAction = (dataForm) => {
    if(id) {
        editCustomization(dataForm);
    }else{
        saveCustomizationForm(dataForm);
    }
  }

  const handleUpdateCustomization = async (id) => {
    navigate(`/customizations/${id}`);
  };

  const loadCustomization = async () => {
    if(id) {
        const customization = await getCustomizationById(id);
        if(customization) {
            reset({
                client_id: customization?.client_id,
                product_id: customization?.product_id,
                custom_shade: customization?.custom_shade,
                finish_type: customization?.finish_type,
                allergy_notes: customization?.allergy_notes,
            })
        }
    }
  }

  useEffect(() => {
    getCustomizations();
  }, []);

  useEffect(() => {
    loadCustomization();
  }, [id]);

  return {
    dataCustomizations,
    setDataCustomizations,
    register,
    handleSubmit: handleSubmit(handleCustomizationAction),
    errors,
    getCustomizations,
    getCustomizationById,
    deleteCustomization,
    handleUpdateCustomization,
    loadCustomization
  }
};

export default useDataCustomizations;
