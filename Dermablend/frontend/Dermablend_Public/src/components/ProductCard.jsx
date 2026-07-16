import { ShoppingBag, Star, Check } from "lucide-react";
import ProductVisual from "./ProductVisual";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

const badgeStyles = {
  bestseller: "bg-espresso text-white",
  nuevo: "bg-taupe text-white",
  favorito: "bg-espresso text-white",
  oferta: "bg-error text-white",
};

const badgeLabels = {
  bestseller: "Más vendido",
  nuevo: "Nuevo",
  favorito: "Favorita",
  oferta: "Oferta",
};

export default function ProductCard({ product, compact = false }) {
  const { addToCart, recentlyAddedId } = useCart();
  const { showToast } = useToast();

  const justAdded = recentlyAddedId === product.id;

  function handleAdd() {
    addToCart(product);
    showToast(`${product.name} se añadió al carrito`, {
      type: "success",
    });
  }

  return (
    <article className="animate-rise group flex flex-col overflow-hidden rounded-2xl border border-border-tan bg-white transition-shadow hover:shadow-[0_10px_32px_-12px_rgba(44,24,16,0.18)]">

      {/* Imagen del producto */}
      <div className="relative">
        <ProductVisual
          image={product.image}
          swatch={product.swatch}
          compact={compact}
        />

        {product.badge && (
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 font-body text-[10px] font-semibold uppercase tracking-wide ${badgeStyles[product.badge]}`}
          >
            {badgeLabels[product.badge]}
          </span>
        )}
      </div>

      <div className={`flex flex-1 flex-col gap-2 ${compact ? "p-4" : "p-5"}`}>
        <p className="font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-terracotta">
          {product.category}
        </p>

        <h3
          className={`font-display font-medium leading-snug text-espresso ${
            compact ? "text-lg" : "text-xl"
          }`}
        >
          {product.name}
        </h3>

        <p className="font-body text-xs text-muted">{product.tone}</p>

        {!compact && (
          <p className="font-body text-sm leading-relaxed text-muted">
            {product.description}
          </p>
        )}

        <div className="flex items-center gap-1">
          <div className="flex items-center gap-0.5 text-terracotta">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-3 w-3"
                strokeWidth={0}
                fill={i < product.rating ? "currentColor" : "#E8D5BC"}
              />
            ))}
          </div>

          <span className="font-body text-[11px] text-muted">
            ({product.reviews})
          </span>
        </div>

        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            {product.oldPrice && (
              <span className="font-body text-xs text-muted line-through">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}

            <span className="font-display text-lg font-semibold text-espresso">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleAdd}
            aria-label={`Añadir ${product.name} al carrito`}
            className="flex items-center gap-1.5 rounded-full bg-espresso px-3.5 py-2 font-body text-[11px] font-semibold uppercase tracking-wide text-white transition-colors hover:bg-taupe"
          >
            {justAdded ? (
              <>
                <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                Añadido
              </>
            ) : (
              <>
                <ShoppingBag className="h-3.5 w-3.5" strokeWidth={2} />
                Añadir
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}