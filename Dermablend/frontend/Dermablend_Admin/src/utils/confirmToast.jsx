import toast from "react-hot-toast";

// Shows a toast with "Cancelar"/"Eliminar" buttons instead of the native window.confirm().
// Resolves true if the user confirms, false if they cancel or dismiss it.
export const confirmToast = (message) => {
  return new Promise((resolve) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <span className="text-sm text-gray-800">{message}</span>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
              onClick={() => {
                toast.dismiss(t.id);
                resolve(false);
              }}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700"
              onClick={() => {
                toast.dismiss(t.id);
                resolve(true);
              }}
            >
              Eliminar
            </button>
          </div>
        </div>
      ),
      { duration: Infinity },
    );
  });
};
