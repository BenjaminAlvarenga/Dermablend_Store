import React from "react";

const DataProducts = ({
  id,
  name,
  setName,
  price,
  setPrice,
  category,
  setCategory,
  stock,
  setStock,
  image,
  setImage,
  onSubmit,
  onCancel,
  submitting,
  error,
  message,
}) => {
  return (
    <section className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {id ? "Editar registro" : "Crear registro"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Administra los datos de la API con nombre y edad.
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

      {error ? (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {message ? (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {message}
        </div>
      ) : null}

      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre del producto
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Ingresa el nombre"
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Precio
          </label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Ingresa el precio"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Categoría
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Ingresa la categoría"
          />
        </div>

        <div>
          <label
            htmlFor="stock"
            className="block text-sm font-medium text-gray-700"
          >
            Stock
          </label>
          <input
            type="text"
            id="stock"
            value={stock}
            onChange={(event) => setStock(event.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Ingresa el stock"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-300 disabled:cursor-not-allowed disabled:bg-blue-300"
        >
          {submitting
            ? "Guardando..."
            : id
              ? "Actualizar registro"
              : "Crear registro"}
        </button>
      </form>
    </section>
  );
};

export default DataProducts;
