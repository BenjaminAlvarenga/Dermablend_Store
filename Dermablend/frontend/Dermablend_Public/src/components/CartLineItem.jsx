import { Minus, Plus, Trash2 } from "lucide-react";
import ProductVisual from "./ProductVisual";
import { products } from "../data/products";

export default function CartLineItem({ item, onIncrement, onDecrement, onRemove }) {
  const meta = products.find((p) => p.id === item.id);
  const subtotal = item.price * item.qty;

  return (
    <div className="animate-rise flex items-center gap-4 rounded-xl border border-border-tan bg-white p-4">
      <ProductVisual swatch={meta?.swatch ?? "taupe"} size="thumb" />

      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-base font-medium text-espresso">
          {item.name}
        </p>
        <p className="font-body text-xs text-muted">{meta?.tone ?? "Dermablend Pro"}</p>
      </div>

      <div className="hidden items-center gap-2 rounded-full border border-border-tan px-1.5 py-1 sm:flex">
        <button
          onClick={() => onDecrement(item.id)}
          aria-label={`Quitar una unidad de ${item.name}`}
          className="rounded-full p-1.5 text-muted hover:text-espresso"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="w-5 text-center font-body text-sm text-espresso">
          {String(item.qty).padStart(2, "0")}
        </span>
        <button
          onClick={() => onIncrement(item.id)}
          aria-label={`Añadir una unidad de ${item.name}`}
          className="rounded-full p-1.5 text-muted hover:text-espresso"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-1">
        <span className="font-body text-[10px] uppercase tracking-wide text-muted-soft">
          Subtotal
        </span>
        <span className="font-body text-sm font-semibold text-espresso sm:text-base">
          ${subtotal.toFixed(2)}
        </span>
      </div>

      {/* mobile stepper */}
      <div className="flex items-center gap-1.5 sm:hidden">
        <button
          onClick={() => onDecrement(item.id)}
          aria-label={`Quitar una unidad de ${item.name}`}
          className="rounded-full border border-border-tan p-1 text-muted"
        >
          <Minus className="h-3 w-3" />
        </button>
        <span className="w-4 text-center font-body text-xs text-espresso">{item.qty}</span>
        <button
          onClick={() => onIncrement(item.id)}
          aria-label={`Añadir una unidad de ${item.name}`}
          className="rounded-full border border-border-tan p-1 text-muted"
        >
          <Plus className="h-3 w-3" />
        </button>
      </div>

      <button
        onClick={() => onRemove(item.id)}
        aria-label={`Eliminar ${item.name} del carrito`}
        className="shrink-0 rounded-full p-1.5 text-muted-soft hover:text-error"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
