const DataTestListReviews = ({ dataReviews }) => {
  return (
    <section className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      {!dataReviews?.length ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center text-gray-600">
          No hay registros disponibles.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="text-left text-sm font-semibold text-gray-600">
                <th className="px-4 py-3">Cliente</th>
                <th className="px-4 py-3">Producto</th>
                <th className="px-4 py-3">Calificación</th>
                <th className="px-4 py-3">Comentario</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dataReviews.map((item) => (
                <tr key={item._id} className="text-sm text-gray-700">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {item.client_id?.name || item.client_id}
                  </td>
                  <td className="px-4 py-3">{item.product_id?.name || item.product_id}</td>
                  <td className="px-4 py-3">{item.rating}</td>
                  <td className="px-4 py-3">{item.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default DataTestListReviews;
