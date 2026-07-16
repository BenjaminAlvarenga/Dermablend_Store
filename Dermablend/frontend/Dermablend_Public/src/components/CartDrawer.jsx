import { Link } from "react-router-dom";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import ProductVisual from "./ProductVisual";
import { products } from "../data/products";

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, increment, decrement, remove, total } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-espresso/50 transition-opacity ${
          cartOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setCartOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col border-l border-border-tan bg-cream-soft transition-transform duration-300 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Carrito de compras"
        aria-hidden={!cartOpen}
      >
        <div className="flex items-center justify-between border-b border-border-tan px-6 py-5">
          <h2 className="font-display text-lg font-medium text-espresso">Tu carrito</h2>
          <button
            onClick={() => setCartOpen(false)}
            aria-label="Cerrar carrito"
            className="rounded-full p-1.5 text-muted hover:bg-sand hover:text-espresso"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="scrollbar-thin flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <ShoppingBag className="h-9 w-9 text-muted-soft" strokeWidth={1.5} />
              <p className="font-body text-sm text-muted">
                Tu carrito está vacío. Explora el catálogo para empezar tu rutina.
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {cart.map((item) => {
                const meta = products.find((p) => p.id === item.id);
                return (
                  <li
                    key={item.id}
                    className="flex items-center gap-3 rounded-xl border border-border-tan bg-white p-3"
                  >
                    <ProductVisual swatch={meta?.swatch ?? "taupe"} size="thumb" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-body text-sm font-medium text-espresso">
                        {item.name}
                      </p>
                      <p className="font-body text-xs text-muted">${item.price.toFixed(2)} c/u</p>
                    </div>

                    <div className="flex items-center gap-2 rounded-full border border-border-tan px-1.5 py-1">
                      <button
                        onClick={() => decrement(item.id)}
                        aria-label={`Quitar una unidad de ${item.name}`}
                        className="rounded-full p-1 text-muted hover:text-espresso"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-4 text-center font-body text-sm text-espresso">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => increment(item.id)}
                        aria-label={`Añadir una unidad de ${item.name}`}
                        className="rounded-full p-1 text-muted hover:text-espresso"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => remove(item.id)}
                      aria-label={`Eliminar ${item.name} del carrito`}
                      className="rounded-full p-1.5 text-muted-soft hover:text-error"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="border-t border-border-tan px-6 py-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-body text-sm text-muted">Total</span>
            <span className="font-display text-xl font-semibold text-espresso">
              ${total.toFixed(2)}
            </span>
          </div>
          <Link
            to="/carrito"
            onClick={() => setCartOpen(false)}
            aria-disabled={cart.length === 0}
            className={`flex w-full items-center justify-center rounded-full bg-espresso py-3 font-body text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-taupe ${
              cart.length === 0 ? "pointer-events-none opacity-40" : ""
            }`}
          >
            Ver Carrito Completo
          </Link>
        </div>
      </aside>
    </>
  );
}
