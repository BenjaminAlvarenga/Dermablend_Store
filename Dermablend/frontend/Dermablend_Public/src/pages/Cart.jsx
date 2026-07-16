import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, ShoppingBag, CreditCard, Wallet, Lock } from "lucide-react";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import CartLineItem from "../components/CartLineItem";
import ProductCard from "../components/ProductCard";

export default function Cart() {
  const { cart, increment, decrement, remove, subtotal, tax, taxRate, shipping, total } =
    useCart();

  const upsell = useMemo(() => {
    const cartIds = new Set(cart.map((item) => item.id));
    return products.filter((p) => !cartIds.has(p.id)).slice(0, 3);
  }, [cart]);

  return (
    <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-16">
      <div className="animate-rise max-w-lg">
        <p className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-taupe">
          Tu selección
        </p>
        <h1 className="mt-2 font-display text-3xl font-light text-espresso sm:text-4xl">
          Carrito de Compras
        </h1>
        <p className="mt-3 font-body text-sm leading-relaxed text-muted">
          Revisa tu rutina antes de continuar. Cada producto está listo para
          acompañarte todos los días.
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="animate-rise mt-10 flex flex-col items-center gap-4 rounded-2xl border border-border-tan bg-white px-6 py-20 text-center">
          <ShoppingBag className="h-10 w-10 text-muted-soft" strokeWidth={1.5} />
          <div>
            <p className="font-display text-xl text-espresso">
              Tu carrito está vacío
            </p>
            <p className="mt-1 font-body text-sm text-muted">
              Explora el catálogo y arma tu rutina ideal.
            </p>
          </div>
          <Link
            to="/#catalogo"
            className="rounded-full bg-espresso px-6 py-3 font-body text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-taupe"
          >
            Ir al Catálogo
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="flex flex-col gap-3">
            {cart.map((item) => (
              <CartLineItem
                key={item.id}
                item={item}
                onIncrement={increment}
                onDecrement={decrement}
                onRemove={remove}
              />
            ))}
          </div>

          <aside className="animate-rise h-fit rounded-2xl border border-border-tan bg-white p-6">
            <h2 className="font-display text-lg font-medium text-espresso">Resumen</h2>

            <div className="mt-4 flex flex-col gap-2 font-body text-sm">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span className="text-espresso">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Impuestos ({Math.round(taxRate * 100)}%)</span>
                <span className="text-espresso">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Envío</span>
                <span className={shipping === 0 ? "text-taupe" : "text-espresso"}>
                  {shipping === 0 ? "Gratis" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="font-body text-[11px] text-muted-soft">
                  Envío gratis en compras mayores a $50.
                </p>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border-tan pt-4">
              <span className="font-body text-sm text-muted">Total</span>
              <span className="font-display text-2xl font-semibold text-espresso">
                ${total.toFixed(2)}
              </span>
            </div>

            <Link
              to="/pago"
              className="mt-5 flex items-center justify-center gap-2 rounded-full bg-espresso py-3 font-body text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-taupe"
            >
              Proceder al Pago
              <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
            </Link>

            <div className="mt-4 flex items-start gap-2 rounded-xl border border-border-tan bg-cream-soft p-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-taupe" strokeWidth={1.75} />
              <p className="font-body text-xs leading-relaxed text-muted">
                Pago protegido: tus datos están cifrados de extremo a extremo.
              </p>
            </div>

            <div className="mt-4 flex items-center justify-center gap-4 text-muted-soft">
              <CreditCard className="h-4 w-4" strokeWidth={1.5} />
              <Wallet className="h-4 w-4" strokeWidth={1.5} />
              <Lock className="h-4 w-4" strokeWidth={1.5} />
            </div>
          </aside>
        </div>
      )}

      {upsell.length > 0 && (
        <div className="mt-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-light text-espresso">
              Completa tu Rutina
            </h2>
            <Link
              to="/#catalogo"
              className="font-body text-xs font-semibold uppercase tracking-wide text-taupe hover:text-espresso"
            >
              Ver todo el catálogo
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
            {upsell.map((product) => (
              <ProductCard key={product.id} product={product} compact />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
