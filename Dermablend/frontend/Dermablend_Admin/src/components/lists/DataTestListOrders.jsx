import React from "react";
 
const DataTestList2A = ({
  dataTest,
  loading,
  error,
  onAdd,
  onEdit,
  onDelete,
}) => {
  return (
    <section className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      {loading ? (
        <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-6 text-center text-gray-600">
          Cargando datos...
        </div>
      ) : null}
 
      {error ? (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}
 
      {!loading && !dataTest.length ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center text-gray-600">
          No hay registros disponibles.
        </div>
      ) : null}
 
      {!loading && dataTest.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="text-left text-sm font-semibold text-gray-600">
                <th className="px-4 py-3">Cliente</th>
                <th className="px-4 py-3">Productos</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Metodo de pago</th>
                <th className="px-4 py-3">Direcciones</th>
                <th className="px-4 py-3 text-end">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dataTest.map((item) => (
                <tr key={item.id} className="text-sm text-gray-700">
                  <td className="px-4 py-3">{item.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{item.cancion}</td>
                  <td className="px-4 py-3">{item.cantante}</td>
                  <td className="px-4 py-3">{item.nacionalidad}</td>
                  <td className="px-4 py-3">{item.metodoPago}</td>
                  <td className="px-4 py-3">{item.metodoPago}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(item)}
                        className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(item.id)}
                        className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
};
 
export default DataTestList2A;
 
 