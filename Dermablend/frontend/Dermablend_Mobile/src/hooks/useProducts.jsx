import { useContext } from "react";
import ProductsContext from "../context/ProductsContext";

/**
 * Accede al catálogo de productos cacheado en ProductsContext (precargado
 * desde el Splash Screen). Todas las pantallas comparten los mismos datos
 * en vez de disparar una petición HTTP independiente cada una.
 */
export function useProducts() {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }

  return context;
}
