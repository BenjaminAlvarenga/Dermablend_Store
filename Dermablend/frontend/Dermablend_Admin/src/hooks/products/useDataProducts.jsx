import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import ProductsService from "../../services/Products";
import { confirmToast } from "../../utils/confirmToast";

const useDataProducts = (methods) => {
  const [dataProducts, setDataProducts] = useState([]);
  const { id } = useParams();
  const hasFetched = useRef(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const data = await ProductsService.get();
      setDataProducts(data.data || []);
    } catch (error) {
      console.log("Error al obtener los productos:", error);
      toast.error("Error al obtener los productos");
    }
  };

  const getProductById = async (id) => {
    try {
      const response = await ProductsService.getById(id);
      return response.data;
    } catch (error) {
      console.log("Error al obtener el producto:", error);
      toast.error("Error al obtener el producto");
    }
  };

  const saveProductForm = async (dataForm) => {
    try {
      await ProductsService.post(dataForm);
      toast.success("Producto guardado correctamente");
      navigate("/products");
    } catch (error) {
      console.log("Error al enviar el producto:", error);
      toast.error("Error al guardar el producto");
    } finally {
      reset();
      getProducts();
    }
  };

  const editProduct = async (dataForm) => {
    try {
      await ProductsService.put(id, dataForm);
      toast.success("Producto actualizado correctamente");
      navigate("/products");
    } catch (error) {
      console.log("Error al actualizar el producto:", error);
      toast.error("Error al actualizar el producto");
    } finally {
      reset();
      getProducts();
    }
  };

  const deleteProduct = async (id) => {
    const confirmed = await confirmToast("¿Seguro que deseas eliminar este producto?");
    if (!confirmed) return;

    try {
      await ProductsService.delete(id);
      toast.success("Producto eliminado correctamente");
    } catch (error) {
      console.error("Error eliminando el producto:", error);
      toast.error("Error al eliminar el producto");
    } finally {
      getProducts();
    }
  };

  const handleProductAction = (dataForm) => {
    if(id) {
        editProduct(dataForm);
    }else{
        saveProductForm(dataForm);
    }
  }

  const handleUpdateProduct = async (id) => {
    navigate(`/products/${id}`);
  };

  const loadProduct = async () => {
    if(id) {
        const product = await getProductById(id);
        if(product) {
            reset({
                name: product?.name,
                category: product?.category,
                price: product?.price,
                stock: product?.stock,
                shade: product?.shade,
                coverage_level: product?.coverage_level,
                description: product?.description,
                is_customizable: product?.is_customizable,
                image: product?.image,
                skin_type_compatible: product?.skin_type_compatible,
            })
        }
    }
  }

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    getProducts();
  }, []);

  useEffect(() => {
    loadProduct();
  }, [id]);

  return {
    dataProducts,
    setDataProducts,
    register,
    handleSubmit: handleSubmit(handleProductAction),
    errors,
    getProducts,
    getProductById,
    deleteProduct,
    handleUpdateProduct,
    loadProduct
  }
};

export default useDataProducts;