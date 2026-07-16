import { useForm } from "react-hook-form";
import { X, Sparkles } from "lucide-react";
import { useToast } from "../context/ToastContext";

const undertones = [
  { id: "frio", label: "Frío (rosado/azulado)" },
  { id: "calido", label: "Cálido (dorado/amarillento)" },
  { id: "neutro", label: "Neutro" },
];

export default function ToneFinderModal({ open, onClose }) {
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  if (!open) return null;

  function onSubmit(data) {
    showToast(
      `Gracias, ${data.name}. Te enviaremos tu recomendación de tono a ${data.email}.`,
      { type: "success" }
    );
    reset();
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-espresso/50 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tone-finder-title"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-rise w-full max-w-md rounded-2xl border border-border-tan bg-white p-6 sm:p-8"
      >
        <div className="mb-5 flex items-start justify-between">
          <div>
            <p className="inline-flex items-center gap-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-taupe">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
              Asesoría de tono
            </p>
            <h2 id="tone-finder-title" className="mt-1 font-display text-2xl font-light text-espresso">
              Encuentra tu tono ideal
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="rounded-full p-1.5 text-muted hover:bg-sand hover:text-espresso"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
          <div>
            <label htmlFor="tone-name" className="mb-1.5 block font-body text-xs font-medium text-muted">
              Nombre
            </label>
            <input
              id="tone-name"
              type="text"
              aria-invalid={errors.name ? "true" : "false"}
              className={`w-full rounded-lg border bg-cream-soft px-3.5 py-2.5 font-body text-sm text-espresso placeholder:text-muted-soft focus:border-taupe ${
                errors.name ? "border-error" : "border-border-tan"
              }`}
              placeholder="Tu nombre"
              {...register("name", { required: "Cuéntanos cómo te llamas." })}
            />
            {errors.name && (
              <p role="alert" className="mt-1 font-body text-xs text-error">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="tone-email" className="mb-1.5 block font-body text-xs font-medium text-muted">
              Correo electrónico
            </label>
            <input
              id="tone-email"
              type="email"
              aria-invalid={errors.email ? "true" : "false"}
              className={`w-full rounded-lg border bg-cream-soft px-3.5 py-2.5 font-body text-sm text-espresso placeholder:text-muted-soft focus:border-taupe ${
                errors.email ? "border-error" : "border-border-tan"
              }`}
              placeholder="tu@correo.com"
              {...register("email", {
                required: "Necesitamos tu correo para enviarte el resultado.",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Ingresa un correo válido." },
              })}
            />
            {errors.email && (
              <p role="alert" className="mt-1 font-body text-xs text-error">
                {errors.email.message}
              </p>
            )}
          </div>

          <fieldset>
            <legend className="mb-2 font-body text-xs font-medium text-muted">
              ¿Cuál es tu subtono de piel?
            </legend>
            <div className="flex flex-col gap-2">
              {undertones.map((u) => (
                <label key={u.id} htmlFor={`undertone-${u.id}`} className="flex items-center gap-2">
                  <input
                    id={`undertone-${u.id}`}
                    type="radio"
                    value={u.id}
                    className="h-3.5 w-3.5 accent-taupe"
                    {...register("undertone", { required: "Selecciona un subtono." })}
                  />
                  <span className="font-body text-sm text-espresso">{u.label}</span>
                </label>
              ))}
            </div>
            {errors.undertone && (
              <p role="alert" className="mt-1 font-body text-xs text-error">
                {errors.undertone.message}
              </p>
            )}
          </fieldset>

          <button
            type="submit"
            className="mt-2 rounded-full bg-espresso py-3 font-body text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-taupe"
          >
            Obtener mi recomendación
          </button>
        </form>
      </div>
    </div>
  );
}
