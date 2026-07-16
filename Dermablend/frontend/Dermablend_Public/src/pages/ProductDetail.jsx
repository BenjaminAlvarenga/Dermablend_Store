import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../App.jsx";

function ProductDetail({
  productId,
  navigateTo,
  addToCart,
  toggleFavorite,
  favorites,
  user,
  token,
  openAuth
}) {
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Review Form States
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [canReview, setCanReview] = useState(false);
  const [checkingPurchase, setCheckingPurchase] = useState(false);

  useEffect(() => {
    if (!productId) return;

    setLoading(true);
    setReviewError("");

    // Fetch product details
    fetch(`${API_BASE_URL}/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setProduct(data.data);
          // Fetch related products of same category
          return fetch(`${API_BASE_URL}/products?category=${data.data.category}`);
        }
      })
      .then((res) => (res ? res.json() : null))
      .then((data) => {
        if (data && data.success && data.data) {
          // Filter out current product and take 3
          setRelatedProducts(data.data.filter((p) => p._id !== productId).slice(0, 3));
        }
      })
      .catch((err) => console.error("Error loading product details/related:", err));

    // Fetch reviews
    fetch(`${API_BASE_URL}/reviews?product_id=${productId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setReviews(data.data);
        }
      })
      .catch((err) => console.error("Error loading reviews:", err))
      .finally(() => setLoading(false));
  }, [productId]);

  // Only clients with a delivered order containing this product may review it
  useEffect(() => {
    if (!user || !productId || !token) {
      setCanReview(false);
      return;
    }

    setCheckingPurchase(true);
    const clientId = user._id || user.id;

    fetch(`${API_BASE_URL}/orders?client_id=${clientId}&status=Entregado`, {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => {
        const deliveredOrders = data.data || [];
        const purchased = deliveredOrders.some((order) =>
          order.products.some((p) => (p.product_id?._id || p.product_id) === productId)
        );
        setCanReview(purchased);
      })
      .catch((err) => {
        console.error("Error checking purchase history:", err);
        setCanReview(false);
      })
      .finally(() => setCheckingPurchase(false));
  }, [user, productId, token]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewError("");

    if (!newComment.trim()) {
      setReviewError("Por favor escribe un comentario.");
      return;
    }

    if (!user) {
      openAuth("login");
      return;
    }

    setSubmittingReview(true);

    try {
      const response = await fetch(`${API_BASE_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          client_id: user._id || user.id,
          product_id: productId,
          rating: Number(newRating),
          comment: newComment.trim()
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error al publicar la reseña.");
      }

      // Prepend review and clear form
      setReviews((prev) => [
        {
          ...data.data,
          client_id: { name: user.name } // fake population format for instant UI display
        },
        ...prev
      ]);
      setNewComment("");
      setNewRating(5);
      toast.success("¡Reseña publicada correctamente!");
    } catch (err) {
      const message = err.message || "Error al publicar la reseña.";
      setReviewError(message);
      toast.error(message);
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading && !product) {
    return (
      <div className="container product-detail-loading">
        <div className="skeleton detail-img-skeleton"></div>
        <div className="detail-text-skeleton-wrapper">
          <div className="skeleton title-skeleton"></div>
          <div className="skeleton desc-skeleton"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container empty-catalog">
        <h3>Producto no encontrado</h3>
        <button className="btn btn-primary" onClick={() => navigateTo("catalog")}>
          Volver al Catálogo
        </button>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;

  return (
    <div className="container detail-container animate-fade-in">
      {/* Back Button */}
      <button className="back-link" onClick={() => navigateTo("catalog")}>
        &larr; Volver al catálogo
      </button>

      {/* 1. Product Summary Grid */}
      <div className="detail-main-grid">
        {/* Left Column: Image Media */}
        <div className="detail-media">
          <img src={product.image} alt={product.name} className="detail-image" />
          {product.is_customizable && <span className="custom-badge-large">Fórmula Personalizable</span>}
        </div>

        {/* Right Column: Information panel */}
        <div className="detail-info">
          <span className="product-category-tag">{product.category}</span>
          <h1 className="product-title-large">{product.name}</h1>

          {/* Rating Summary */}
          <div className="rating-summary">
            <span className="stars-gold">
              &#9733; {reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : "5.0"}
            </span>
            <span className="reviews-count">({reviews.length} opiniones)</span>
          </div>

          <div className="price-tag-large">${product.price.toFixed(2)}</div>

          <p className="product-desc-large">{product.description}</p>

          {/* Specifications */}
          <div className="specifications-box">
            <div className="spec-row">
              <span className="spec-label">Tonalidad:</span>
              <span className="spec-value">{product.shade}</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">Cobertura:</span>
              <span className="spec-value">{product.coverage_level}</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">Tipos de Piel:</span>
              <span className="spec-value">
                {product.skin_type_compatible.map(tag => (
                  <span key={tag} className="skin-tag">{tag}</span>
                ))}
              </span>
            </div>
            <div className="spec-row">
              <span className="spec-label">Disponibilidad:</span>
              <span className={`spec-value ${isOutOfStock ? "out" : "in"}`}>
                {isOutOfStock ? "Agotado" : `${product.stock} unidades en stock`}
              </span>
            </div>
          </div>

          {/* Add to Cart Actions */}
          <div className="detail-actions">
            {!isOutOfStock && (
              <div className="quantity-selector">
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                >
                  -
                </button>
                <span className="qty-value">{quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                >
                  +
                </button>
              </div>
            )}

            <button
              className="btn btn-primary btn-add-cart-large"
              disabled={isOutOfStock}
              onClick={() => {
                addToCart(product, quantity);
                setQuantity(1);
              }}
            >
              {isOutOfStock ? "Agotado" : "Añadir al Carrito"}
            </button>

            <button
              className={`fav-btn-large ${favorites.includes(product._id) ? "favorited" : ""}`}
              onClick={() => toggleFavorite(product._id)}
              aria-label="Agregar a favoritos"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill={favorites.includes(product._id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>

          {product.is_customizable && (
            <div className="customization-suggestion">
              <p>✨ ¿Buscas algo exclusivo? Esta base se puede personalizar a tu tono de piel y acabado ideal.</p>
              <button className="btn btn-secondary btn-sm" onClick={() => navigateTo("customizer")}>
                Personalizar ahora
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 2. Reviews Section */}
      <div className="reviews-section-wrapper">
        <h2 className="section-title text-left">Opiniones de Clientes</h2>

        <div className="reviews-layout">
          {/* Reviews List */}
          <div className="reviews-list-col">
            {reviews.length === 0 ? (
              <p className="no-reviews">No hay reseñas para este producto aún. ¡Sé la primera en opinar!</p>
            ) : (
              <div className="reviews-list">
                {reviews.map((r, i) => (
                  <div key={i} className="review-item animate-fade-in">
                    <div className="review-item-header">
                      <span className="review-author">{r.client_id?.name || "Cliente verificado"}</span>
                      <span className="review-stars-gold">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <span key={idx} className={idx < r.rating ? "star-active" : "star-inactive"}>&#9733;</span>
                        ))}
                      </span>
                    </div>
                    <p className="review-comment-body">{r.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add Review Form */}
          <div className="review-form-col">
            <h3 className="review-form-title">Escribir una Reseña</h3>
            {reviewError && <div className="alert alert-error">{reviewError}</div>}
            
            {!user ? (
              <div className="review-form-login-prompt">
                <p>Debes iniciar sesión para publicar una reseña de producto.</p>
                <button className="btn btn-secondary" onClick={() => openAuth("login")}>
                  Iniciar Sesión
                </button>
              </div>
            ) : checkingPurchase ? (
              <div className="review-form-login-prompt">
                <p>Verificando tu historial de compras...</p>
              </div>
            ) : !canReview ? (
              <div className="review-form-login-prompt">
                <p>Solo puedes reseñar productos que ya hayas comprado y recibido.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="review-form-box">
                <div className="form-group">
                  <label className="form-label">Calificación</label>
                  <div className="stars-input">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        type="button"
                        className={`star-input-btn ${val <= newRating ? "selected" : ""}`}
                        onClick={() => setNewRating(val)}
                      >
                        &#9733;
                      </button>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Comentario</label>
                  <textarea
                    rows="4"
                    className="form-input"
                    placeholder="Escribe tu reseña sobre el tono, duración y textura..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-full" disabled={submittingReview}>
                  {submittingReview ? "Publicando..." : "Publicar Reseña"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* 3. Related Products */}
      {relatedProducts.length > 0 && (
        <div className="related-section">
          <h2 className="section-title text-left">Productos Relacionados</h2>
          <div className="related-grid">
            {relatedProducts.map((p) => (
              <div key={p._id} className="card product-card">
                <div className="card-media" onClick={() => navigateTo("detail", p._id)}>
                  <img src={p.image} alt={p.name} className="product-img" />
                </div>
                <div className="card-body">
                  <span className="product-category">{p.category}</span>
                  <h3 className="product-title" onClick={() => navigateTo("detail", p._id)}>{p.name}</h3>
                  <div className="product-footer" style={{ marginBottom: "0" }}>
                    <span className="product-price">${p.price.toFixed(2)}</span>
                    <button className="btn btn-secondary btn-sm" onClick={() => navigateTo("detail", p._id)}>
                      Ver
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CSS Styles for Detail */}
      <style>{`
        .detail-container {
          padding-top: 32px;
          padding-bottom: 80px;
        }
        .back-link {
          background: none;
          border: none;
          color: var(--color-text-muted);
          font-weight: 500;
          cursor: pointer;
          margin-bottom: 24px;
          font-size: 14px;
          transition: var(--transition-fast);
          display: flex;
          align-items: center;
        }
        .back-link:hover {
          color: var(--color-primary);
        }
        .detail-main-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 60px;
          margin-bottom: 80px;
        }
        .detail-media {
          background-color: var(--color-white);
          border-radius: var(--radius-lg);
          overflow: hidden;
          aspect-ratio: 1/1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--color-border);
        }
        .detail-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .custom-badge-large {
          position: absolute;
          top: 20px;
          left: 20px;
          background-color: var(--color-primary);
          color: var(--color-white);
          padding: 6px 16px;
          border-radius: var(--radius-full);
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .detail-info {
          display: flex;
          flex-direction: column;
        }
        .product-category-tag {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--color-accent-dark);
          margin-bottom: 8px;
        }
        .product-title-large {
          font-size: 42px;
          margin-bottom: 12px;
        }
        .rating-summary {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
        }
        .stars-gold {
          color: #FFC107;
          font-weight: 600;
        }
        .reviews-count {
          color: var(--color-text-muted);
          font-size: 14px;
        }
        .price-tag-large {
          font-size: 32px;
          font-family: var(--font-serif);
          font-weight: 700;
          color: var(--color-primary);
          margin-bottom: 24px;
        }
        .product-desc-large {
          color: var(--color-text-muted);
          font-size: 15px;
          line-height: 1.6;
          margin-bottom: 30px;
        }
        .specifications-box {
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
          padding: 20px 0;
          margin-bottom: 36px;
        }
        .spec-row {
          display: flex;
          margin-bottom: 10px;
          font-size: 14px;
        }
        .spec-row:last-child {
          margin-bottom: 0;
        }
        .spec-label {
          width: 140px;
          font-weight: 600;
          color: var(--color-primary);
        }
        .spec-value {
          color: var(--color-text);
        }
        .spec-value.in {
          color: var(--color-success);
          font-weight: 500;
        }
        .spec-value.out {
          color: var(--color-error);
          font-weight: 500;
        }
        .skin-tag {
          background-color: var(--color-bg);
          padding: 2px 8px;
          border-radius: var(--radius-sm);
          font-size: 12px;
          margin-right: 6px;
        }
        .detail-actions {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 30px;
        }
        .quantity-selector {
          display: flex;
          align-items: center;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-full);
          background-color: var(--color-white);
          overflow: hidden;
        }
        .qty-btn {
          background: none;
          border: none;
          width: 40px;
          height: 44px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          color: var(--color-primary);
          transition: var(--transition-fast);
        }
        .qty-btn:hover {
          background-color: var(--color-bg);
        }
        .qty-value {
          width: 32px;
          text-align: center;
          font-weight: 600;
          font-size: 15px;
        }
        .btn-add-cart-large {
          flex: 1;
          height: 44px;
        }
        .fav-btn-large {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid var(--color-border);
          background-color: var(--color-white);
          color: var(--color-text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .fav-btn-large:hover, .fav-btn-large.favorited {
          border-color: var(--color-accent);
          color: var(--color-accent-dark);
          background-color: var(--color-bg);
        }
        .customization-suggestion {
          background-color: rgba(229, 193, 178, 0.2);
          border-left: 4px solid var(--color-secondary);
          padding: 16px;
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .customization-suggestion p {
          font-size: 13px;
          font-weight: 500;
        }
        .product-detail-loading {
          padding: 80px 24px;
          display: flex;
          gap: 60px;
        }
        .detail-img-skeleton {
          width: 45%;
          height: 400px;
          border-radius: var(--radius-lg);
        }
        .detail-text-skeleton-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .title-skeleton {
          width: 60%;
          height: 40px;
        }
        .desc-skeleton {
          width: 100%;
          height: 120px;
        }
        .reviews-section-wrapper {
          margin-top: 80px;
          padding-top: 60px;
          border-top: 1px solid var(--color-border);
        }
        .reviews-layout {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 60px;
          margin-top: 30px;
        }
        .no-reviews {
          color: var(--color-text-muted);
          font-size: 14px;
          font-style: italic;
        }
        .reviews-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .review-item {
          padding: 20px;
          background-color: var(--color-white);
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
        }
        .review-item-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .review-author {
          font-weight: 600;
          font-size: 14px;
          color: var(--color-primary);
        }
        .review-stars-gold {
          color: #FFC107;
          font-size: 14px;
        }
        .star-inactive {
          color: #E8E2DA;
        }
        .review-comment-body {
          font-size: 13.5px;
          color: var(--color-text);
          line-height: 1.5;
        }
        .review-form-title {
          font-family: var(--font-serif);
          font-size: 20px;
          margin-bottom: 16px;
        }
        .review-form-box {
          background-color: var(--color-white);
          padding: 24px;
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
        }
        .stars-input {
          display: flex;
          gap: 6px;
        }
        .star-input-btn {
          background: none;
          border: none;
          font-size: 26px;
          color: #E8E2DA;
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .star-input-btn:hover, .star-input-btn.selected {
          color: #FFC107;
        }
        .review-form-login-prompt {
          text-align: center;
          padding: 30px;
          background-color: var(--color-white);
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
          color: var(--color-text-muted);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        .related-section {
          margin-top: 80px;
          padding-top: 60px;
          border-top: 1px solid var(--color-border);
        }
        .related-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 30px;
        }

        @media (max-width: 900px) {
          .detail-main-grid { grid-template-columns: 1fr; gap: 40px; }
          .reviews-layout { grid-template-columns: 1fr; gap: 40px; }
          .related-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

export default ProductDetail;
