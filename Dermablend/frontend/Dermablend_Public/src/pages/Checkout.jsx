import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  CreditCard,
  ShieldCheck,
  ShoppingBag,
  Check,
  Sparkles,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { products } from "../data/products";
import ProductVisual from "../components/ProductVisual";

const paymentMethods = [
  { id: "card", label: "Tarjeta" },
  { id: "credits", label: "Créditos Dermablend" },
  { id: "paypal", label: "PayPal" },
];

const fieldClass = (hasError) =>
  `w-full rounded-lg border bg-cream-soft px-3.5 py-2.5 font-body text-sm text-espresso placeholder:text-muted-soft focus:border-taupe ${
    hasError ? "border-error" : "border-border-tan"
  }`;
const labelClass = "mb-1.5 block font-body text-xs font-medium text-muted";

function FieldError({ message }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1 font-body text-xs text-error">
      {message}
    </p>
  );
}

export default function Checkout() {
  const { cart, subtotal, tax, shipping, total, clearCart } = useCart();
  const { showToast } = useToast();
  const [method, setMethod] = useState("card");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  function onSubmit() {
    setSubmitted(true);
    clearCart();
    showToast("¡Tu pedido fue confirmado con éxito!", { type: "success" });
  }

  if (cart.length === 0 && !submitted) {
    return (
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-16">
        <div className="animate-rise flex flex-col items-center gap-4 rounded-2xl border border-border-tan bg-white px-6 py-20 text-center">
          <ShoppingBag className="h-10 w-10 text-muted-soft" strokeWidth={1.5} />
          <div>
            <p className="font-display text-xl text-espresso">
              No hay productos que confirmar todavía
            </p>
            <p className="mt-1 font-body text-sm text-muted">
              Añade productos a tu carrito antes de proceder con el pago.
            </p>
          </div>
          <Link
            to="/#catalogo"
            className="rounded-full bg-espresso px-6 py-3 font-body text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-taupe"
          >
            Ir al Catálogo
          </Link>
        </div>
      </section>
    );
  }

  if (submitted) {
    return (
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-16">
        <div className="animate-rise mx-auto flex max-w-md flex-col items-center gap-4 rounded-2xl border border-taupe/30 bg-cream px-6 py-20 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-taupe text-white">
            <Check className="h-7 w-7" strokeWidth={2.5} />
          </div>
          <div>
            <p className="font-display text-2xl font-light text-espresso">
              ¡Pedido confirmado!
            </p>
            <p className="mt-2 font-body text-sm leading-relaxed text-muted">
              Gracias por tu compra. Te enviaremos un correo con los
              detalles de seguimiento de tu pedido.
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="rounded-full bg-espresso px-6 py-3 font-body text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-taupe"
          >
            Seguir Explorando
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-16">
      <p className="animate-rise font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-taupe">
        Último paso
      </p>
      <h1 className="animate-rise mt-2 font-display text-3xl font-light text-espresso sm:text-4xl">
        Proceder con el pago
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-5">
          <div className="animate-rise flex items-center gap-2 rounded-xl border border-taupe/25 bg-cream px-4 py-3 font-body text-xs font-medium text-taupe">
            <ShieldCheck className="h-4 w-4" strokeWidth={1.75} />
            Pago Seguro · conexión cifrada de extremo a extremo
          </div>

          <div className="animate-rise rounded-2xl border border-border-tan bg-white p-6">
            <h2 className="flex items-center gap-2 font-display text-base font-medium text-espresso">
              <MapPin className="h-4 w-4 text-taupe" strokeWidth={1.75} />
              Dirección de envío
            </h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="fullName" className={labelClass}>Nombre completo</label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Ana López"
                  aria-invalid={errors.fullName ? "true" : "false"}
                  className={fieldClass(errors.fullName)}
                  {...register("fullName", { required: "Ingresa el nombre del destinatario." })}
                />
                <FieldError message={errors.fullName?.message} />
              </div>
              <div>
                <label htmlFor="city" className={labelClass}>Ciudad</label>
                <input
                  id="city"
                  type="text"
                  placeholder="San Salvador"
                  aria-invalid={errors.city ? "true" : "false"}
                  className={fieldClass(errors.city)}
                  {...register("city", { required: "Ingresa tu ciudad." })}
                />
                <FieldError message={errors.city?.message} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="address" className={labelClass}>Dirección</label>
                <input
                  id="address"
                  type="text"
                  placeholder="Calle Los Almendros, Casa 12"
                  aria-invalid={errors.address ? "true" : "false"}
                  className={fieldClass(errors.address)}
                  {...register("address", { required: "Ingresa la dirección de envío." })}
                />
                <FieldError message={errors.address?.message} />
              </div>
              <div>
                <label htmlFor="postal" className={labelClass}>Código postal</label>
                <input
                  id="postal"
                  type="text"
                  placeholder="CP2101"
                  aria-invalid={errors.postal ? "true" : "false"}
                  className={fieldClass(errors.postal)}
                  {...register("postal", { required: "Ingresa el código postal." })}
                />
                <FieldError message={errors.postal?.message} />
              </div>
              <div>
                <label htmlFor="phone" className={labelClass}>Teléfono</label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="7000-1234"
                  aria-invalid={errors.phone ? "true" : "false"}
                  className={fieldClass(errors.phone)}
                  {...register("phone", {
                    required: "Ingresa un teléfono de contacto.",
                    minLength: { value: 8, message: "El teléfono debe tener al menos 8 dígitos." },
                  })}
                />
                <FieldError message={errors.phone?.message} />
              </div>
            </div>
          </div>

          <div className="animate-rise rounded-2xl border border-border-tan bg-white p-6">
            <h2 className="flex items-center gap-2 font-display text-base font-medium text-espresso">
              <CreditCard className="h-4 w-4 text-taupe" strokeWidth={1.75} />
              Método de pago
            </h2>

            <div className="mt-4 flex flex-wrap gap-2">
              {paymentMethods.map((pm) => {
                const isActive = method === pm.id;
                return (
                  <button
                    type="button"
                    key={pm.id}
                    onClick={() => setMethod(pm.id)}
                    aria-pressed={isActive}
                    className={`rounded-full px-4 py-2 font-body text-xs font-semibold uppercase tracking-wide transition-colors ${
                      isActive
                        ? "bg-espresso text-white"
                        : "border border-border-tan text-muted hover:border-taupe hover:text-espresso"
                    }`}
                  >
                    {pm.label}
                  </button>
                );
              })}
            </div>

            {method === "card" ? (
              <div className="mt-4 flex flex-col gap-4">
                <div>
                  <label htmlFor="cardNumber" className={labelClass}>Número de tarjeta</label>
                  <input
                    id="cardNumber"
                    type="text"
                    inputMode="numeric"
                    placeholder="0000 0000 0000 0000"
                    aria-invalid={errors.cardNumber ? "true" : "false"}
                    className={fieldClass(errors.cardNumber)}
                    {...register("cardNumber", {
                      required: "Ingresa el número de tarjeta.",
                      pattern: { value: /^[0-9\s]{13,19}$/, message: "Número de tarjeta inválido." },
                    })}
                  />
                  <FieldError message={errors.cardNumber?.message} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="expiry" className={labelClass}>Vencimiento (MM/AA)</label>
                    <input
                      id="expiry"
                      type="text"
                      placeholder="08/29"
                      aria-invalid={errors.expiry ? "true" : "false"}
                      className={fieldClass(errors.expiry)}
                      {...register("expiry", {
                        required: "Ingresa la fecha de vencimiento.",
                        pattern: { value: /^(0[1-9]|1[0-2])\/\d{2}$/, message: "Formato MM/AA." },
                      })}
                    />
                    <FieldError message={errors.expiry?.message} />
                  </div>
                  <div>
                    <label htmlFor="cvc" className={labelClass}>CVC</label>
                    <input
                      id="cvc"
                      type="text"
                      inputMode="numeric"
                      placeholder="123"
                      aria-invalid={errors.cvc ? "true" : "false"}
                      className={fieldClass(errors.cvc)}
                      {...register("cvc", {
                        required: "Ingresa el código de seguridad.",
                        pattern: { value: /^\d{3,4}$/, message: "CVC inválido." },
                      })}
                    />
                    <FieldError message={errors.cvc?.message} />
                  </div>
                </div>
              </div>
            ) : (
              <p className="mt-4 font-body text-sm leading-relaxed text-muted">
                Serás redirigido a completar el pago con{" "}
                {paymentMethods.find((p) => p.id === method)?.label} al confirmar tu pedido.
              </p>
            )}
          </div>
        </div>

        <aside className="animate-rise h-fit rounded-2xl border border-border-tan bg-white p-6">
          <h2 className="font-display text-lg font-medium text-espresso">
            Resumen del Pedido
          </h2>

          <ul className="mt-4 flex flex-col gap-3">
            {cart.map((item) => {
              const meta = products.find((p) => p.id === item.id);
              return (
                <li key={item.id} className="flex items-center gap-3">
                  <ProductVisual swatch={meta?.swatch ?? "taupe"} size="thumb" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-body text-xs font-medium text-espresso">
                      {item.name}
                    </p>
                    <p className="font-body text-[11px] text-muted-soft">
                      Cantidad: {item.qty}
                    </p>
                  </div>
                  <span className="shrink-0 font-body text-xs font-semibold text-espresso">
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-5 flex flex-col gap-2 border-t border-border-tan pt-4 font-body text-sm">
            <div className="flex justify-between text-muted">
              <span>Subtotal</span>
              <span className="text-espresso">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>Envío</span>
              <span className={shipping === 0 ? "text-taupe" : "text-espresso"}>
                {shipping === 0 ? "Gratis" : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-muted">
              <span>Impuestos</span>
              <span className="text-espresso">${tax.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-border-tan pt-4">
            <span className="font-display text-sm font-semibold uppercase tracking-wide text-espresso">
              Total
            </span>
            <span className="font-display text-2xl font-semibold text-espresso">
              ${total.toFixed(2)}
            </span>
          </div>

          <button
            type="submit"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-espresso py-3 font-body text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-taupe"
          >
            <Sparkles className="h-4 w-4" strokeWidth={2} />
            Confirmar Pedido
          </button>

          <p className="mt-3 font-body text-[11px] leading-relaxed text-muted-soft">
            Al confirmar aceptas nuestros Términos de Servicio y Política de
            Privacidad.
          </p>
        </aside>
      </form>
    </section>
  );
}
