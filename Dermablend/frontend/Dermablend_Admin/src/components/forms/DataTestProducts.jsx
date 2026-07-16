import { useState } from "react";
import UploadService from "../../services/Upload";

const DataTestProducts = ({ id, register, errors, onSubmit, onCancel, setValue, watch }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const imageUrl = watch ? watch("image") : "";

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");

    try {
      const result = await UploadService.uploadImage(file);
      setValue("image", result.url, { shouldValidate: true });
      setValue("public_id", result.public_id);
    } catch (error) {
      console.error("Error subiendo la imagen:", error);
      setUploadError(error.message || "Error al subir la imagen");
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {id ? "Editar producto" : "Crear producto"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Administra la información del producto.
          </p>
        </div>

        {id ? (
          <button
            type="button"
            onClick={onCancel}
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Cancelar edición
          </button>
        ) : null}
      </div>

      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nombre del producto
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "El nombre es obligatorio" })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Ingresa el nombre"
          />
          {errors?.name ? (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Categoría
          </label>
          <input
            type="text"
            id="category"
            {...register("category", { required: "La categoría es obligatoria" })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Ingresa la categoría"
          />
          {errors?.category ? (
            <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Precio
          </label>
          <input
            type="number"
            step="0.01"
            id="price"
            {...register("price", { required: "El precio es obligatorio" })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Ingresa el precio"
          />
          {errors?.price ? (
            <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
            Stock
          </label>
          <input
            type="number"
            id="stock"
            {...register("stock", { required: "El stock es obligatorio" })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Ingresa el stock"
          />
          {errors?.stock ? (
            <p className="mt-1 text-sm text-red-600">{errors.stock.message}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="shade" className="block text-sm font-medium text-gray-700">
            Tono
          </label>
          <input
            type="text"
            id="shade"
            {...register("shade", { required: "El tono es obligatorio" })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Ingresa el tono"
          />
          {errors?.shade ? (
            <p className="mt-1 text-sm text-red-600">{errors.shade.message}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="coverage_level" className="block text-sm font-medium text-gray-700">
            Nivel de cobertura
          </label>
          <input
            type="text"
            id="coverage_level"
            {...register("coverage_level", { required: "El nivel de cobertura es obligatorio" })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Ingresa el nivel de cobertura"
          />
          {errors?.coverage_level ? (
            <p className="mt-1 text-sm text-red-600">{errors.coverage_level.message}</p>
          ) : null}
        </div>

        <div>
          <span className="block text-sm font-medium text-gray-700">Tipos de piel compatibles</span>
          <div className="mt-1 flex gap-4">
            <label className="flex items-center gap-1 text-sm text-gray-700">
              <input
                type="checkbox"
                value="grasa"
                {...register("skin_type_compatible", { required: "Selecciona al menos un tipo de piel" })}
              />
              Grasa
            </label>
            <label className="flex items-center gap-1 text-sm text-gray-700">
              <input
                type="checkbox"
                value="seca"
                {...register("skin_type_compatible", { required: "Selecciona al menos un tipo de piel" })}
              />
              Seca
            </label>
            <label className="flex items-center gap-1 text-sm text-gray-700">
              <input
                type="checkbox"
                value="mixta"
                {...register("skin_type_compatible", { required: "Selecciona al menos un tipo de piel" })}
              />
              Mixta
            </label>
          </div>
          {errors?.skin_type_compatible ? (
            <p className="mt-1 text-sm text-red-600">{errors.skin_type_compatible.message}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Descripción
          </label>
          <textarea
            id="description"
            {...register("description", { required: "La descripción es obligatoria" })}
            rows={3}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Describe el producto"
          />
          {errors?.description ? (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Imagen
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <input type="hidden" {...register("image", { required: "La imagen es obligatoria" })} />
          <input type="hidden" {...register("public_id")} />

          {uploading ? (
            <p className="mt-1 text-sm text-gray-500">Subiendo imagen...</p>
          ) : null}
          {uploadError ? (
            <p className="mt-1 text-sm text-red-600">{uploadError}</p>
          ) : null}
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Vista previa"
              className="mt-2 h-24 w-24 rounded-lg border border-gray-200 object-cover"
            />
          ) : null}
          {errors?.image ? (
            <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="is_customizable"
            {...register("is_customizable")}
            className="h-4 w-4 rounded border-gray-300"
          />
          <label htmlFor="is_customizable" className="text-sm font-medium text-gray-700">
            Es personalizable
          </label>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-300"
        >
          {id ? "Actualizar producto" : "Crear producto"}
        </button>
      </form>
    </section>
  );
};

export default DataTestProducts;