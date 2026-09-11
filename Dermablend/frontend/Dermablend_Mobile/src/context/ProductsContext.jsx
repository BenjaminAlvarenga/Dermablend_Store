import { createContext, useCallback, useMemo, useRef, useState } from "react";
import { getProducts } from "../services/productsService";

const ProductsContext = createContext(null);

/**
 * Cachea el catálogo de productos en memoria para toda la sesión de la app.
 * Se precarga durante el Splash Screen (junto a la verificación de sesión)
 * para que Home/Productos se sientan instantáneos al iniciar sesión, y
 * expone `refresh` para recargar bajo demanda (pull-to-refresh).
 */
export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const hasLoadedOnce = useRef(false);

  const load = useCallback(async ({ isRefresh = false } = {}) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError("");

    try {
      const data = await getProducts();
      setProducts(data);
      hasLoadedOnce.current = true;
    } catch (err) {
      setError(err.message || "No fue posible cargar los productos.");
    } finally {
      if (isRefresh) setRefreshing(false);
      else setLoading(false);
    }
  }, []);

  // Usado por el Splash Screen: si ya se precargó (o está en curso), no repite
  // la petición; devuelve una promesa que resuelve cuando los datos están listos.
  const prefetch = useCallback(() => {
    if (hasLoadedOnce.current) return Promise.resolve();
    return load();
  }, [load]);

  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];

  const value = useMemo(
    () => ({
      products,
      categories,
      loading,
      refreshing,
      error,
      refresh: () => load({ isRefresh: true }),
      reload: load,
      prefetch,
    }),
    [products, categories, loading, refreshing, error, load, prefetch]
  );

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export default ProductsContext;
