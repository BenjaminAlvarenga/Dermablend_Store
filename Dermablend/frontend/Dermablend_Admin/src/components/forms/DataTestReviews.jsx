const DataTestReviews = ({ id, register, errors, onSubmit, onCancel }) => {
  return (
    <section className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {id ? "Editar reseña" : "Crear reseña"}
          </h2>
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
          <label htmlFor="client_id" className="block text-sm font-medium text-gray-700">
            Cliente (ID)
          </label>
          <input
            type="text"
            id="client_id"
            {...register("client_id", { required: "El cliente es obligatorio" })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Ingresa el id del cliente"
          />
          {errors?.client_id ? (
            <p className="mt-1 text-sm text-red-600">{errors.client_id.message}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="product_id" className="block text-sm font-medium text-gray-700">
            Producto (ID)
          </label>
          <input
            type="text"
            id="product_id"
            {...register("product_id", { required: "El producto es obligatorio" })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Ingresa el id del producto"
          />
          {errors?.product_id ? (
            <p className="mt-1 text-sm text-red-600">{errors.product_id.message}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
            Calificación (1-5)
          </label>
          <input
            type="number"
            min="1"
            max="5"
            id="rating"
            {...register("rating", { required: "La calificación es obligatoria" })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Ingresa la calificación"
          />
          {errors?.rating ? (
            <p className="mt-1 text-sm text-red-600">{errors.rating.message}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
            Comentario
          </label>
          <textarea
            id="comment"
            rows={3}
            maxLength={200}
            {...register("comment")}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Escribe el comentario"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-300"
        >
          {id ? "Actualizar reseña" : "Crear reseña"}
        </button>
      </form>
    </section>
  );
};

export default DataTestReviews;
