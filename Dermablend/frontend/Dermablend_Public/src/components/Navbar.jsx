import { Link } from "react-router-dom";
import { ShoppingBag, Search, User, Leaf } from "lucide-react";
import { useCart } from "../context/CartContext";

const links = [
  { label: "Novedades", href: "/#catalogo" },
  { label: "Rostro", href: "/#catalogo" },
  { label: "Labios", href: "/#catalogo" },
  { label: "Cuerpo", href: "/#catalogo" },
  { label: "Sets", href: "/#catalogo" },
];

export default function Navbar() {
  const { cartCount, setCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-border-tan/70 bg-cream-soft/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 font-display text-xl font-semibold tracking-tight text-espresso"
        >
          <Leaf className="h-4 w-4 text-taupe" strokeWidth={1.75} />
          Dermablend <span className="font-display italic font-light text-taupe">Pro</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="font-body text-[11px] font-medium uppercase tracking-[0.15em] text-muted transition-colors hover:text-taupe"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            aria-label="Buscar productos"
            className="rounded-full p-2 text-muted transition-colors hover:bg-sand hover:text-espresso"
          >
            <Search className="h-4 w-4" strokeWidth={1.75} />
          </button>
          <button
            aria-label="Cuenta"
            className="rounded-full p-2 text-muted transition-colors hover:bg-sand hover:text-espresso"
          >
            <User className="h-4 w-4" strokeWidth={1.75} />
          </button>
          <button
            onClick={() => setCartOpen(true)}
            aria-label={`Carrito, ${cartCount} artículos`}
            className="relative rounded-full p-2 text-muted transition-colors hover:bg-sand hover:text-espresso"
          >
            <ShoppingBag className="h-4 w-4" strokeWidth={1.75} />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-terracotta text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
