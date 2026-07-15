const DataTestOrders = ({ id, register, errors, onSubmit, onCancel }) => {
  return (
    <section className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {id ? "Editar orden" : "Crear orden"}
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
          <label htmlFor="total_amount" className="block text-sm font-medium text-gray-700">
            Total
          </label>
          <input
            type="number"
            step="0.01"
            id="total_amount"
            {...register("total_amount", { required: "El total es obligatorio" })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Ingresa el total"
          />
          {errors?.total_amount ? (
            <p className="mt-1 text-sm text-red-600">{errors.total_amount.message}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Estado
          </label>
          <select
            id="status"
            {...register("status")}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="Pendiente">Pendiente</option>
            <option value="Entregado">Entregado</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </div>

        <div>
          <label htmlFor="payment_method" className="block text-sm font-medium text-gray-700">
            Método de pago
          </label>
          <select
            id="payment_method"
            {...register("payment_method")}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="credit_card">Tarjeta de crédito</option>
            <option value="debit_card">Tarjeta de débito</option>
            <option value="bank_transfer">Transferencia bancaria</option>
          </select>
        </div>

        <div>
          <label htmlFor="shipping_address" className="block text-sm font-medium text-gray-700">
            Dirección de envío
          </label>
          <input
            type="text"
            id="shipping_address"
            {...register("shipping_address", { required: "La dirección es obligatoria" })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Ingresa la dirección de envío"
          />
          {errors?.shipping_address ? (
            <p className="mt-1 text-sm text-red-600">{errors.shipping_address.message}</p>
          ) : null}
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-300"
        >
          {id ? "Actualizar orden" : "Crear orden"}
        </button>
      </form>
    </section>
  );
};

export default DataTestOrders;