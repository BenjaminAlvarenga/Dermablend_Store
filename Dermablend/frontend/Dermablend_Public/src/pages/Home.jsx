import React, { useState, useEffect } from "react";
import ProductsService from "../services/products.js";
import PromotionsService from "../services/promotions.js";

function Home({ navigateTo, addToCart, toggleFavorite, favorites }) {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingPromos, setLoadingPromos] = useState(true);

  useEffect(() => {
    // Fetch featured products
    ProductsService.getProducts()
      .then((data) => {
        if (data.success && data.data) {
          setFeaturedProducts(data.data.slice(0, 4));
        }
      })
      .catch((err) => console.error("Error loading featured products:", err))
      .finally(() => setLoadingProducts(false));

    // Fetch promotions
    PromotionsService.getActivePromotions()
      .then((data) => {
        if (data.success && data.data) {
          setPromotions(data.data);
        }
      })
      .catch((err) => console.error("Error loading promotions:", err))
      .finally(() => setLoadingPromos(false));
  }, []);

  const benefits = [
    {
      title: "Fórmulas Clínicas",
      desc: "Desarrollado con dermatólogos para cuidar tu piel sensible.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4.5 16.5c-1.5 1.26-2.5 3.19-2.5 5.5h20c0-2.31-1-4.24-2.5-5.5"></path>
          <path d="M12 2v10"></path>
          <path d="M8 8h8"></path>
          <circle cx="12" cy="12" r="10"></circle>
        </svg>
      )
    },
    {
      title: "Tonos Adaptables",
      desc: "Nuestra tecnología adapta el maquillaje a tu tono de piel exacto.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          <path d="M2 12h20"></path>
        </svg>
      )
    },
    {
      title: "100% Cruelty-Free",
      desc: "Orgullosamente libres de pruebas en animales en todos los productos.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 5c-1.5-1.5-4-2.5-6-1.5-3 1.5-2.5 5 1.5 8l4.5 4 4.5-4c4-3 4.5-6.5 1.5-8-2-1-4.5 0-6 1.5z"></path>
        </svg>
      )
    },
    {
      title: "Envío Exclusivo",
      desc: "Entregas empaquetadas de forma ecológica, gratis en compras mayores a $50.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="1" y="3" width="15" height="13"></rect>
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
          <circle cx="5.5" cy="18.5" r="2.5"></circle>
          <circle cx="18.5" cy="18.5" r="2.5"></circle>
        </svg>
      )
    }
  ];

  const categories = [
    { name: "Bases de Maquillaje", dbName: "base", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=400" },
    { name: "Polvos Compactos", dbName: "polvo", image: "https://images.unsplash.com/photo-1590156221122-c7b3cd685f20?auto=format&fit=crop&q=80&w=400" },
    { name: "Labiales Premium", dbName: "labial", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=400" }
  ];

  const testimonials = [
    { client: "Sofía M.", comment: "La base personalizada de Dermablend realmente se adapta a mi tono trigueño. No se siente pesada y dura todo el día.", rating: 5 },
    { client: "Camila R.", comment: "Tengo piel mixta y sensible. Sus polvos compactos son los únicos que no me causan brotes y controlan el brillo.", rating: 5 },
    { client: "Valeria D.", comment: "Los tonos de labiales son hermosos y la hidratación es espectacular. ¡Volveré a comprar de seguro!", rating: 4 }
  ];

  return (
    <div className="home-container animate-fade-in">
      {/* 1. Hero Section */}
      <section className="hero-section">
        <div className="container hero-inner">
          <div className="hero-content">
            <span className="hero-subtitle">Alta Cosmética Dermatológica</span>
            <h1 className="hero-title">La ciencia del cuidado, el arte de la belleza.</h1>
            <p className="hero-desc">
              Descubre productos hipoalergénicos diseñados para realzar tu belleza natural mientras protegen y nutren tu piel. Fórmulas de alta cobertura compatibles con tu tipo de piel.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => navigateTo("catalog")}>
                Explorar Catálogo
              </button>
              <button className="btn btn-secondary" onClick={() => navigateTo("customizer")}>
                Crear Tono Personalizado
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="visual-circle"></div>
            {/* SVG Illustration of Premium Cosmetics Bottle */}
            <svg viewBox="0 0 200 240" className="visual-bottle">
              <rect x="70" y="20" width="60" height="20" rx="3" fill="#D3AB80" />
              <rect x="85" y="40" width="30" height="15" fill="#3E2723" />
              <rect x="40" y="55" width="120" height="160" rx="16" fill="rgba(255,255,255,0.7)" stroke="#E8E2DA" strokeWidth="2" />
              <path d="M 40 100 Q 100 130 160 100" fill="none" stroke="#E5C1B2" strokeWidth="4" />
              <text x="100" y="145" textAnchor="middle" fontFamily="var(--font-serif)" fontSize="15" fontWeight="bold" fill="#3E2723">Dermablend</text>
              <text x="100" y="165" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="8" letterSpacing="1" fill="#7E726D">SKIN FOUNDATION</text>
            </svg>
          </div>
        </div>
      </section>

      {/* 2. Brand Benefits */}
      <section className="benefits-section">
        <div className="container">
          <div className="benefits-grid">
            {benefits.map((b, i) => (
              <div key={i} className="benefit-card">
                <div className="benefit-icon">{b.icon}</div>
                <h3 className="benefit-title">{b.title}</h3>
                <p className="benefit-desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Visual Categories */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Colecciones Exclusivas</h2>
          <div className="categories-grid">
            {categories.map((c, i) => (
              <div key={i} className="category-card" onClick={() => navigateTo("catalog")}>
                <div className="category-img-container">
                  <img src={c.image} alt={c.name} className="category-img" />
                </div>
                <div className="category-overlay">
                  <h3 className="category-name">{c.name}</h3>
                  <span className="category-link-text">Ver Colección &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Active Promotions */}
      {promotions.length > 0 && (
        <section className="promo-section">
          <div className="container">
            <div className="promo-banner">
              <div className="promo-badge">Oferta Limitada</div>
              <h2 className="promo-title">{promotions[0].namePromotion}</h2>
              <p className="promo-desc">{promotions[0].description}</p>
              <div className="promo-discount">-{promotions[0].discountPercentage}% de descuento</div>
              <button className="btn btn-accent" onClick={() => navigateTo("catalog")}>
                Aprovechar Descuento
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 5. Featured Products */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Los Favoritos de la Semana</h2>
            <button className="nav-link" onClick={() => navigateTo("catalog")}>
              Ver catálogo completo &rarr;
            </button>
          </div>

          {loadingProducts ? (
            <div className="featured-grid">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="card skeleton-card">
                  <div className="skeleton img-skeleton"></div>
                  <div className="skeleton text-skeleton-title"></div>
                  <div className="skeleton text-skeleton-price"></div>
                </div>
              ))}
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="empty-featured">No hay productos destacados actualmente.</div>
          ) : (
            <div className="featured-grid">
              {featuredProducts.map((p) => (
                <div key={p._id} className="card product-card">
                  <div className="card-media" onClick={() => navigateTo("detail", p._id)}>
                    <img src={p.image} alt={p.name} className="product-img" />
                    {p.is_customizable && <span className="custom-badge">A Medida</span>}
                  </div>
                  <div className="card-body">
                    <span className="product-category">{p.category}</span>
                    <h3 className="product-title" onClick={() => navigateTo("detail", p._id)}>{p.name}</h3>
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
                    <button className="btn btn-primary btn-add-cart" onClick={() => addToCart(p, 1)}>
                      Agregar al Carrito
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title text-center">Lo que dicen nuestras clientas</h2>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="card testimonial-card">
                <div className="stars">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <span key={idx} className={`star ${idx < t.rating ? "active" : ""}`}>&#9733;</span>
                  ))}
                </div>
                <p className="testimonial-comment">"{t.comment}"</p>
                <div className="testimonial-client">{t.client}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-brand-col">
            <div className="footer-logo">Dermablend</div>
            <p className="footer-desc">
              Uniendo dermatología y alta cosmética para entregar el cuidado que tu piel se merece.
            </p>
          </div>
          <div className="footer-links-col">
            <h4 className="footer-title">Navegación</h4>
            <button className="footer-link" onClick={() => navigateTo("home")}>Inicio</button>
            <button className="footer-link" onClick={() => navigateTo("catalog")}>Catálogo</button>
            <button className="footer-link" onClick={() => navigateTo("customizer")}>Personalizar</button>
          </div>
          <div className="footer-newsletter-col">
            <h4 className="footer-title">Newsletter</h4>
            <p className="footer-desc">Subscríbete para recibir lanzamientos y descuentos exclusivos.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Tu correo" className="newsletter-input" required />
              <button type="submit" className="newsletter-btn">&rarr;</button>
            </form>
          </div>
        </div>
        <div className="container footer-bottom">
          &copy; {new Date().getFullYear()} Dermablend Store. Todos los derechos reservados.
        </div>
      </footer>

      {/* CSS Styles for Home Section */}
      <style>{`
        .home-container {
          display: flex;
          flex-direction: column;
        }
        .hero-section {
          background: linear-gradient(135deg, #F3E5D8 0%, #FAF6F0 100%);
          padding: 80px 0;
          overflow: hidden;
        }
        .hero-inner {
          display: flex;
          align-items: center;
          gap: 40px;
        }
        .hero-content {
          flex: 1;
        }
        .hero-subtitle {
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 700;
          color: var(--color-accent-dark);
          display: inline-block;
          margin-bottom: 12px;
        }
        .hero-title {
          font-size: 46px;
          margin-bottom: 20px;
          color: var(--color-primary);
          line-height: 1.15;
        }
        .hero-desc {
          font-size: 16px;
          color: var(--color-text-muted);
          margin-bottom: 36px;
          max-width: 520px;
        }
        .hero-actions {
          display: flex;
          gap: 16px;
        }
        .hero-visual {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .visual-circle {
          position: absolute;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          background-color: var(--color-secondary);
          opacity: 0.3;
          z-index: 1;
        }
        .visual-bottle {
          width: 240px;
          height: auto;
          position: relative;
          z-index: 2;
          filter: drop-shadow(0 12px 24px rgba(62,39,35,0.1));
          animation: fadeIn 1s ease-out;
        }
        .benefits-section {
          padding: 60px 0;
          background-color: var(--color-white);
          border-bottom: 1px solid var(--color-border);
        }
        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
        }
        .benefit-card {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .benefit-icon {
          color: var(--color-accent-dark);
          margin-bottom: 16px;
        }
        .benefit-title {
          font-size: 18px;
          margin-bottom: 8px;
          font-weight: 600;
        }
        .benefit-desc {
          font-size: 13px;
          color: var(--color-text-muted);
        }
        .categories-section {
          padding: 80px 0;
        }
        .section-title {
          font-size: 32px;
          margin-bottom: 40px;
          text-align: center;
        }
        .text-center {
          text-align: center;
        }
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .category-card {
          position: relative;
          border-radius: var(--radius-lg);
          overflow: hidden;
          aspect-ratio: 4/5;
          cursor: pointer;
          box-shadow: var(--shadow-sm);
          transition: var(--transition-smooth);
        }
        .category-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-lg);
        }
        .category-img-container {
          width: 100%;
          height: 100%;
        }
        .category-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition-smooth);
        }
        .category-card:hover .category-img {
          transform: scale(1.08);
        }
        .category-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 24px;
          background: linear-gradient(0deg, rgba(39,18,15,0.7) 0%, rgba(39,18,15,0) 100%);
          color: var(--color-white);
          display: flex;
          flex-direction: column;
        }
        .category-name {
          color: var(--color-white);
          font-size: 22px;
          margin-bottom: 4px;
        }
        .category-link-text {
          font-size: 13px;
          font-weight: 500;
          color: var(--color-secondary);
        }
        .promo-section {
          padding: 40px 0;
        }
        .promo-banner {
          background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
          border-radius: var(--radius-lg);
          padding: 60px 40px;
          text-align: center;
          color: var(--color-white);
          box-shadow: var(--shadow-md);
        }
        .promo-badge {
          display: inline-block;
          background-color: var(--color-accent);
          color: var(--color-primary-dark);
          padding: 6px 16px;
          border-radius: var(--radius-full);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 20px;
          letter-spacing: 1px;
        }
        .promo-title {
          color: var(--color-white);
          font-size: 36px;
          margin-bottom: 12px;
        }
        .promo-desc {
          font-size: 16px;
          max-width: 600px;
          margin: 0 auto 24px;
          opacity: 0.85;
        }
        .promo-discount {
          font-size: 28px;
          font-family: var(--font-serif);
          font-weight: 700;
          color: var(--color-accent);
          margin-bottom: 28px;
        }
        .featured-section {
          padding: 80px 0;
        }
        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 40px;
        }
        .section-header .section-title {
          margin-bottom: 0;
        }
        .featured-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .product-card {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .card-media {
          width: 100%;
          aspect-ratio: 1/1;
          background-color: var(--color-white);
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }
        .product-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition-smooth);
        }
        .card-media:hover .product-img {
          transform: scale(1.06);
        }
        .custom-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background-color: var(--color-accent);
          color: var(--color-primary-dark);
          padding: 4px 10px;
          border-radius: var(--radius-full);
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
        }
        .card-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .product-category {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--color-text-muted);
          margin-bottom: 6px;
        }
        .product-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 12px;
          cursor: pointer;
          transition: var(--transition-fast);
          flex-grow: 1;
        }
        .product-title:hover {
          color: var(--color-accent-dark);
        }
        .product-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .product-price {
          font-size: 20px;
          font-family: var(--font-serif);
          font-weight: 700;
          color: var(--color-primary);
        }
        .fav-toggle-btn {
          background: none;
          border: none;
          color: var(--color-text-muted);
          cursor: pointer;
          transition: var(--transition-fast);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .fav-toggle-btn:hover, .fav-toggle-btn.favorited {
          color: var(--color-accent-dark);
        }
        .btn-add-cart {
          width: 100%;
          padding: 10px 0;
          font-size: 14px;
        }
        .skeleton-card {
          height: 380px;
          padding: 20px;
        }
        .img-skeleton {
          width: 100%;
          height: 200px;
          border-radius: var(--radius-md);
          margin-bottom: 16px;
        }
        .text-skeleton-title {
          width: 80%;
          height: 20px;
          margin-bottom: 12px;
        }
        .text-skeleton-price {
          width: 40%;
          height: 24px;
        }
        .testimonials-section {
          padding: 80px 0;
          background-color: var(--color-white);
          border-top: 1px solid var(--color-border);
        }
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .testimonial-card {
          padding: 32px;
          text-align: center;
        }
        .stars {
          color: #FFC107;
          margin-bottom: 12px;
          font-size: 18px;
        }
        .star {
          margin: 0 2px;
        }
        .testimonial-comment {
          font-style: italic;
          font-size: 14px;
          color: var(--color-text);
          margin-bottom: 16px;
        }
        .testimonial-client {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--color-primary);
        }
        .footer {
          background-color: var(--color-primary);
          color: var(--color-white);
          padding: 60px 0 30px;
        }
        .footer-inner {
          display: grid;
          grid-template-columns: 2fr 1fr 2fr;
          gap: 60px;
          margin-bottom: 40px;
        }
        .footer-logo {
          font-family: var(--font-serif);
          font-size: 28px;
          font-weight: 700;
          color: var(--color-accent);
          margin-bottom: 16px;
        }
        .footer-desc {
          font-size: 13px;
          opacity: 0.8;
          max-width: 320px;
        }
        .footer-title {
          color: var(--color-white);
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
        }
        .footer-link {
          background: none;
          border: none;
          color: var(--color-white);
          opacity: 0.8;
          font-size: 14px;
          text-align: left;
          cursor: pointer;
          display: block;
          padding: 6px 0;
          transition: var(--transition-fast);
        }
        .footer-link:hover {
          opacity: 1;
          color: var(--color-accent);
          padding-left: 4px;
        }
        .footer-newsletter-col .footer-desc {
          margin-bottom: 16px;
        }
        .newsletter-form {
          display: flex;
          position: relative;
          max-width: 320px;
        }
        .newsletter-input {
          flex: 1;
          padding: 12px 50px 12px 16px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255,255,255,0.2);
          background-color: rgba(255,255,255,0.05);
          color: var(--color-white);
          font-size: 13px;
        }
        .newsletter-btn {
          position: absolute;
          right: 4px;
          top: 4px;
          width: 36px;
          height: 36px;
          background-color: var(--color-accent);
          border: none;
          border-radius: 50%;
          color: var(--color-primary-dark);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 24px;
          text-align: center;
          font-size: 12px;
          opacity: 0.6;
        }

        @media (max-width: 1024px) {
          .hero-title { font-size: 36px; }
          .benefits-grid { grid-template-columns: repeat(2, 1fr); }
          .footer-inner { grid-template-columns: 1fr 1fr; gap: 40px; }
          .footer-newsletter-col { grid-column: span 2; }
        }
        @media (max-width: 768px) {
          .hero-inner { flex-direction: column; text-align: center; padding: 40px 0; }
          .hero-visual { display: none; }
          .hero-actions { justify-content: center; }
          .categories-grid { grid-template-columns: 1fr; }
          .featured-grid { grid-template-columns: repeat(2, 1fr); }
          .testimonials-grid { grid-template-columns: 1fr; }
          .footer-inner { grid-template-columns: 1fr; }
          .footer-newsletter-col { grid-column: span 1; }
        }
        @media (max-width: 480px) {
          .hero-actions { flex-direction: column; gap: 10px; }
          .featured-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

export default Home;
