import { useMemo, useState } from "react";
import { priceRanges } from "../data/products";

/**
 * useProductFilter
 * Centraliza el estado y la lógica de filtrado del catálogo: categoría activa,
 * búsqueda por texto, rango de precio y tipo de piel. Devuelve tanto el estado
 * como los setters, para que el componente de presentación (Catalog) se
 * mantenga simple y declarativo.
 */
export function useProductFilter(products) {
  const [category, setCategory] = useState("todos");
  const [search, setSearch] = useState("");
  const [priceRangeIds, setPriceRangeIds] = useState([]);
  const [skinType, setSkinType] = useState([]);

  function togglePriceRange(id) {
    setPriceRangeIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }

  function toggleSkinType(type) {
    setSkinType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }

  function clearFilters() {
    setPriceRangeIds([]);
    setSkinType([]);
    setSearch("");
  }

  const activeRanges = priceRanges.filter((r) => priceRangeIds.includes(r.id));

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = category === "todos" || p.category === category;
      const matchesSearch = p.name.toLowerCase().includes(search.trim().toLowerCase());
      const matchesPrice =
        activeRanges.length === 0 ||
        activeRanges.some((r) => p.price >= r.min && p.price <= r.max);
      const matchesSkin =
        skinType.length === 0 || skinType.some((t) => p.skinTypes?.includes(t));
      return matchesCategory && matchesSearch && matchesPrice && matchesSkin;
    });
  }, [products, category, search, activeRanges, skinType]);

  return {
    category,
    setCategory,
    search,
    setSearch,
    priceRangeIds,
    togglePriceRange,
    skinType,
    toggleSkinType,
    clearFilters,
    filtered,
  };
}
