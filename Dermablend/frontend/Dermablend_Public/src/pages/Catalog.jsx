import React, { useState, useEffect } from "react";
import ProductsService from "../services/products.js";

function Catalog({
  navigateTo,
  addToCart,
  toggleFavorite,
  favorites,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Categories list
  const categories = [
    { label: "Todo", value: "" },
    { label: "Bases", value: "base" },
    { label: "Polvos", value: "polvo" },
    { label: "Labiales", value: "labial" }
  ];

  useEffect(() => {
    setLoading(true);

    ProductsService.getProducts(selectedCategory)
      .then((data) => {
        if (data.success && data.data) {
          setProducts(data.data);
        }
      })
      .catch((err) => console.error("Error loading catalog products:", err))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  // Client side search filtering
  const filteredProducts = products.filter((p) => {
    return p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
           p.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="container catalog-container animate-fade-in">
      {/* 1. Page Header */}
      <div className="catalog-header">
        <h1 className="catalog-title">Explorar Catálogo</h1>
        <p className="catalog-subtitle">Encuentra la fórmula y el tono perfecto para realzar tu piel.</p>
      </div>

      {/* 2. Filters & Searches Bar */}
      <div className="filter-bar">
        {/* Category Pill Filters */}
        <div className="category-filters">
          {categories.map((c) => (
            <button
              key={c.value}
              className={`filter-pill ${selectedCategory === c.value ? "active" : ""}`}
              onClick={() => setSelectedCategory(c.value)}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Catalog Search Input */}
        <div className="catalog-search-wrapper">
          <input
            type="text"
            className="form-input catalog-search-input"
            placeholder="Buscar por nombre, tono, tipo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery("")}>
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 3. Product Grid */}
      {loading ? (
        <div className="catalog-grid">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="card skeleton-card">
              <div className="skeleton img-skeleton"></div>
              <div className="skeleton text-skeleton-title"></div>
              <div className="skeleton text-skeleton-price"></div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="empty-catalog animate-fade-in">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          <h3>No se encontraron productos</h3>
          <p>Prueba buscando con otros términos o ajustando los filtros de categoría.</p>
          <button className="btn btn-secondary" onClick={() => { setSearchQuery(""); setSelectedCategory(""); }}>
            Restablecer Filtros
          </button>
        </div>
      ) : (
        <div className="catalog-grid">
          {filteredProducts.map((p) => {
            const isOutOfStock = p.stock <= 0;
            return (
              <div key={p._id} className="card product-card animate-fade-in">
                {/* Product Image Media */}
                <div className="card-media" onClick={() => navigateTo("detail", p._id)}>
                  <img src={p.image} alt={p.name} className="product-img" />
                  {p.is_customizable && <span className="custom-badge">A Medida</span>}
                  {isOutOfStock && <span className="out-of-stock-overlay">Agotado</span>}
                </div>

                {/* Product Card Details */}
                <div className="card-body">
                  <div className="card-meta-row">
                    <span className="product-category">{p.category}</span>
                    <span className="product-stock-status">
                      {isOutOfStock ? (
                        <span className="status-badge badge-red">Sin Stock</span>
                      ) : (
                        <span className="status-badge badge-green">{p.stock} unidades</span>
                      )}
                    </span>
                  </div>

                  <h3 className="product-title" onClick={() => navigateTo("detail", p._id)}>
                    {p.name}
                  </h3>

                  <p className="product-description-excerpt">
                    {p.description.length > 80 ? `${p.description.substring(0, 80)}...` : p.description}
                  </p>

                  <div className="product-footer">
                    <span className="product-price">${p.price.toFixed(2)}</span>
                    <button
                      className={`fav-toggle-btn ${favorites.includes(p._id) ? "favorited" : ""}`}
                      onClick={() => toggleFavorite(p._id)}
                      aria-label="Agregar a favoritos"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill={favorites.includes(p._id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                    </button>
                  </div>

                  <div className="card-actions-wrapper">
                    <button
                      className="btn btn-secondary btn-action-detail"
                      onClick={() => navigateTo("detail", p._id)}
                    >
                      Detalles
                    </button>
                    <button
                      className="btn btn-primary btn-action-add"
                      onClick={() => addToCart(p, 1)}
                      disabled={isOutOfStock}
                    >
                      {isOutOfStock ? "Sin Stock" : "Agregar"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CSS Styles for Catalog */}
      <style>{`
        .catalog-container {
          padding-top: 40px;
          padding-bottom: 80px;
        }
        .catalog-header {
          text-align: center;
          margin-bottom: 40px;
        }
        .catalog-title {
          font-size: 38px;
          margin-bottom: 10px;
        }
        .catalog-subtitle {
          color: var(--color-text-muted);
          font-size: 15px;
        }
        .filter-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 32px;
          gap: 20px;
          flex-wrap: wrap;
        }
        .category-filters {
          display: flex;
          gap: 12px;
        }
        .filter-pill {
          background-color: var(--color-white);
          color: var(--color-text-muted);
          border: 1px solid var(--color-border);
          padding: 8px 20px;
          border-radius: var(--radius-full);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition-smooth);
        }
        .filter-pill:hover, .filter-pill.active {
          background-color: var(--color-primary);
          color: var(--color-white);
          border-color: var(--color-primary);
        }
        .catalog-search-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .catalog-search-input {
          width: 320px;
          border-radius: var(--radius-full);
          padding-right: 40px;
        }
        .clear-search-btn {
          position: absolute;
          right: 14px;
          background: none;
          border: none;
          color: var(--color-text-muted);
          cursor: pointer;
          font-size: 12px;
        }
        .clear-search-btn:hover {
          color: var(--color-primary);
        }
        .catalog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        .card-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .status-badge {
          font-size: 10px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: var(--radius-full);
          text-transform: uppercase;
        }
        .badge-green {
          background-color: #E8F5E9;
          color: var(--color-success);
        }
        .badge-red {
          background-color: #FFEBEE;
          color: var(--color-error);
        }
        .product-description-excerpt {
          font-size: 13px;
          color: var(--color-text-muted);
          margin-bottom: 16px;
          line-height: 1.5;
        }
        .card-actions-wrapper {
          display: flex;
          gap: 12px;
          margin-top: auto;
        }
        .btn-action-detail {
          flex: 1;
          font-size: 13px;
          padding: 8px 0;
        }
        .btn-action-add {
          flex: 1.5;
          font-size: 13px;
          padding: 8px 0;
        }
        .out-of-stock-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(39, 18, 15, 0.4);
          color: var(--color-white);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-serif);
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 1px;
        }
        .empty-catalog {
          text-align: center;
          padding: 80px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          color: var(--color-text-muted);
        }
        .empty-catalog svg {
          color: var(--color-secondary);
          margin-bottom: 20px;
        }
        .empty-catalog h3 {
          font-size: 24px;
          color: var(--color-primary);
          margin-bottom: 8px;
        }
        .empty-catalog p {
          font-size: 14px;
          margin-bottom: 24px;
        }

        @media (max-width: 1024px) {
          .catalog-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .filter-bar { flex-direction: column; align-items: stretch; }
          .category-filters { overflow-x: auto; padding-bottom: 8px; }
          .catalog-search-input { width: 100%; }
        }
        @media (max-width: 480px) {
          .catalog-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

export default Catalog;
