import { useForm } from "react-hook-form";
import { useToast } from "../context/ToastContext";

export default function Newsletter() {
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({ mode: "onBlur" });

  function onSubmit(data) {
    showToast(`¡Gracias por suscribirte, ${data.email}!`, { type: "success" });
    reset();
  }

  return (
    <section className="bg-gradient-to-br from-cream to-border-tan px-5 py-16 text-center sm:px-8">
      <p className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-taupe">
        Únete a nuestra comunidad
      </p>
      <h2 className="mx-auto mt-2 max-w-lg font-display text-3xl font-light text-espresso sm:text-4xl">
        Belleza <em className="italic text-taupe">exclusiva</em> en tu correo
      </h2>
      <p className="mx-auto mt-3 max-w-md font-body text-sm text-muted">
        Recibe tips de expertos, lanzamientos anticipados y descuentos
        especiales para suscriptoras.
      </p>

      {isSubmitSuccessful ? (
        <p className="mt-8 font-display text-xl italic text-taupe">
          ¡Gracias! Te has suscrito exitosamente. 🌹
        </p>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mx-auto mt-8 flex max-w-md flex-col gap-1 sm:flex-row sm:gap-0"
        >
          <div className="flex-1 text-left">
            <label htmlFor="newsletter-email" className="sr-only">
              Correo electrónico
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="tu@correo.com"
              aria-invalid={errors.email ? "true" : "false"}
              className={`w-full border bg-white px-5 py-3.5 font-body text-sm text-espresso placeholder:text-muted-soft focus:border-taupe sm:rounded-l-full ${
                errors.email ? "border-error" : "border-border-tan"
              }`}
              {...register("email", {
                required: "Ingresa tu correo para suscribirte.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Ingresa un correo válido.",
                },
              })}
            />
          </div>
          <button
            type="submit"
            className="bg-espresso px-7 py-3.5 font-body text-[11px] font-semibold uppercase tracking-wide text-white transition-colors hover:bg-taupe sm:rounded-r-full"
          >
            Suscribirme
          </button>
        </form>
      )}
      {errors.email && (
        <p role="alert" className="mt-2 font-body text-xs text-error">
          {errors.email.message}
        </p>
      )}
    </section>
  );
}
