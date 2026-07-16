import { useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";
import ProductsService from "../../services/Products";

const DataTestOrders = ({ id, register, errors, control, onSubmit, onCancel }) => {
  const [products, setProducts] = useState([]);
  const { fields, append, remove } = useFieldArray({ control, name: "products" });

  useEffect(() => {
    ProductsService.get()
      .then((response) => setProducts(response.data || []))
      .catch(() => setProducts([]));
  }, []);

  const productName = (productId) =>
    products.find((p) => p._id === productId)?.name || productId;

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
          <span className="block text-sm font-medium text-gray-700">Productos</span>

          {id ? (
            // El backend no permite editar la lista de productos de una orden existente,
            // solo estado/pago/dirección. Se muestra en modo lectura.
            <ul className="mt-1 space-y-1 rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700">
              {fields.map((field) => (
                <li key={field.id}>
                  {productName(field.product_id)} — cantidad: {field.quantity}
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-1 space-y-2">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  <select
                    {...register(`products.${index}.product_id`, {
                      required: "Selecciona un producto",
                    })}
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="">Selecciona un producto</option>
                    {products.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.name} (stock: {p.stock})
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    min="1"
                    {...register(`products.${index}.quantity`, {
                      required: "Cantidad requerida",
                      min: { value: 1, message: "Mínimo 1" },
                      valueAsNumber: true,
                    })}
                    className="w-24 rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Cant."
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100"
                  >
                    Quitar
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => append({ product_id: "", quantity: 1 })}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                + Agregar producto
              </button>

              {errors?.products ? (
                <p className="mt-1 text-sm text-red-600">
                  {errors.products.message || "Agrega al menos un producto"}
                </p>
              ) : null}
            </div>
          )}
        </div>

        {id ? (
          <div>
            <label htmlFor="total_amount" className="block text-sm font-medium text-gray-700">
              Total
            </label>
            <input
              type="text"
              id="total_amount"
              readOnly
              {...register("total_amount")}
              className="mt-1 block w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-600 shadow-sm"
            />
            <p className="mt-1 text-xs text-gray-500">
              El total se calcula automáticamente a partir de los productos y no puede editarse aquí.
            </p>
          </div>
        ) : null}

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
