import { Search, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import ProductCard from "./ProductCard";
import { categories, priceRanges, skinTypes } from "../data/products";
import { Telescope } from "lucide-react";

export default function Catalog({
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
}) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <section id="catalogo" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16 sm:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-taupe">
            Catálogo completo
          </p>
          <h2 className="mt-2 font-display text-3xl font-light text-espresso sm:text-4xl">
            {filtered.length} productos
          </h2>
        </div>

        <label className="relative w-full sm:w-64">
          <span className="sr-only">Buscar producto</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar producto..."
            className="w-full rounded-full border border-border-tan bg-white py-2.5 pl-9 pr-4 font-body text-sm text-espresso placeholder:text-muted-soft focus:border-taupe"
          />
        </label>
      </div>

      <button
        onClick={() => setMobileFiltersOpen((v) => !v)}
        className="mb-4 flex items-center gap-2 rounded-full border border-border-tan px-4 py-2 font-body text-xs font-medium text-espresso lg:hidden"
        aria-expanded={mobileFiltersOpen}
      >
        <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={2} />
        Filtros
      </button>

      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        {/* Sidebar filters */}
        <aside
          className={`${mobileFiltersOpen ? "block" : "hidden"} rounded-2xl border border-border-tan bg-cream-soft p-5 lg:block lg:bg-transparent lg:p-0`}
        >
          <FilterGroup title="Categoría">
            <div className="flex flex-col gap-2">
              {categories
                .filter((c) => c.id !== "todos")
                .map((c) => (
                  <FilterCheckbox
                    key={c.id}
                    id={`cat-${c.id}`}
                    label={c.label}
                    checked={category === c.id}
                    onChange={() => setCategory(category === c.id ? "todos" : c.id)}
                  />
                ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Precio">
            <div className="flex flex-col gap-2">
              {priceRanges.map((r) => (
                <FilterCheckbox
                  key={r.id}
                  id={`price-${r.id}`}
                  label={r.label}
                  checked={priceRangeIds.includes(r.id)}
                  onChange={() => togglePriceRange(r.id)}
                />
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Tipo de piel">
            <div className="flex flex-col gap-2">
              {skinTypes.map((t) => (
                <FilterCheckbox
                  key={t}
                  id={`skin-${t}`}
                  label={t}
                  checked={skinType.includes(t)}
                  onChange={() => toggleSkinType(t)}
                />
              ))}
            </div>
          </FilterGroup>

          <button
            onClick={clearFilters}
            className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-full border border-border-tan py-2 font-body text-[11px] font-semibold uppercase tracking-wide text-muted hover:border-taupe hover:text-espresso"
          >
            <X className="h-3.5 w-3.5" strokeWidth={2} />
            Limpiar filtros
          </button>
        </aside>

        {/* Main grid */}
        <div>
          <div
            role="tablist"
            aria-label="Filtrar por categoría"
            className="mb-6 flex flex-wrap gap-2"
          >
            {categories.map((c) => {
              const isActive = category === c.id;
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setCategory(c.id)}
                  className={`rounded-full px-3.5 py-1.5 font-body text-[11px] font-semibold uppercase tracking-wide transition-colors ${
                    isActive
                      ? "bg-espresso text-white"
                      : "border border-border-tan bg-white text-muted hover:border-taupe hover:text-espresso"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <Telescope className="h-9 w-9 text-muted-soft" strokeWidth={1.5} />
              <p className="font-display text-lg text-espresso">
                No encontramos productos con esos filtros
              </p>
              <p className="max-w-sm font-body text-sm text-muted">
                Prueba limpiando algún filtro o busca con otro término.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} compact />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function FilterGroup({ title, children }) {
  return (
    <div className="mb-6">
      <p className="mb-3 border-b border-border-tan pb-2 font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-espresso">
        {title}
      </p>
      {children}
    </div>
  );
}

function FilterCheckbox({ id, label, checked, onChange }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center gap-2">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-3.5 w-3.5 accent-taupe"
      />
      <span className="font-body text-xs text-muted">{label}</span>
    </label>
  );
}
