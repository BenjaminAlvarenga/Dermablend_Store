import React, { useState } from "react";

function Navbar({
  view,
  navigateTo,
  user,
  cartCount,
  favoritesCount,
  executeSearch,
  openAuth,
  handleLogout
}) {
  const [searchVal, setSearchVal] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    executeSearch(searchVal.trim());
  };

  const navItems = [
    { id: "home", label: "Inicio" },
    { id: "catalog", label: "Catálogo" },
    { id: "customizer", label: "Personalizar" }
  ];

  return (
    <header className="navbar-container">
      <div className="container navbar-inner">
        {/* Mobile Menu Button */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        {/* Brand Logo */}
        <div className="navbar-brand" onClick={() => navigateTo("home")}>
          Dermablend
        </div>

        {/* Desktop Navigation Link Menu */}
        <nav className="navbar-menu">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-link ${view === item.id ? "active" : ""}`}
              onClick={() => navigateTo(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Search & Actions Panel */}
        <div className="navbar-actions">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="search-input"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
            <button type="submit" className="search-btn" aria-label="Buscar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>

          {/* Favorites Button */}
          <button
            className="action-btn"
            onClick={() => navigateTo("catalog")}
            aria-label="Favoritos"
            title="Favoritos"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            {favoritesCount > 0 && <span className="badge-count">{favoritesCount}</span>}
          </button>

          {/* Cart Button */}
          <button
            className="action-btn"
            onClick={() => navigateTo("cart")}
            aria-label="Carrito"
            title="Carrito"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
          </button>

          {/* Profile Menu Dropdown */}
          <div className="profile-menu-container">
            {user ? (
              <>
                <button
                  className="profile-btn"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                >
                  <span className="profile-avatar">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="profile-name">{user.name.split(" ")[0]}</span>
                </button>

                {profileDropdownOpen && (
                  <div className="profile-dropdown">
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        navigateTo("profile");
                      }}
                    >
                      Mi Perfil
                    </button>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        handleLogout();
                      }}
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </>
            ) : (
              <button className="btn btn-primary btn-sm" onClick={() => openAuth("login")}>
                Ingresar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer animate-fade-in">
          <div className="mobile-drawer-header">
            <div className="navbar-brand">Dermablend</div>
            <button className="close-btn" onClick={() => setMobileMenuOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <nav className="mobile-nav">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`mobile-nav-link ${view === item.id ? "active" : ""}`}
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateTo(item.id);
                }}
              >
                {item.label}
              </button>
            ))}
            {user ? (
              <>
                <button
                  className="mobile-nav-link"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigateTo("profile");
                  }}
                >
                  Mi Perfil
                </button>
                <button
                  className="mobile-nav-link logout-link"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <button
                className="btn btn-primary"
                style={{ marginTop: "20px" }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuth("login");
                }}
              >
                Iniciar Sesión
              </button>
            )}
          </nav>
        </div>
      )}

      {/* CSS specific styles for Navbar */}
      <style>{`
        .navbar-container {
          position: sticky;
          top: 0;
          left: 0;
          width: 100%;
          background-color: rgba(250, 246, 240, 0.95);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid var(--color-border);
          z-index: 1000;
          box-shadow: var(--shadow-sm);
        }
        .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 76px;
        }
        .navbar-brand {
          font-family: var(--font-serif);
          font-size: 26px;
          font-weight: 700;
          color: var(--color-primary);
          cursor: pointer;
          letter-spacing: 0.5px;
          user-select: none;
        }
        .navbar-menu {
          display: flex;
          align-items: center;
          gap: 32px;
        }
        .nav-link {
          background: none;
          border: none;
          font-family: var(--font-sans);
          font-size: 15px;
          font-weight: 500;
          color: var(--color-text-muted);
          cursor: pointer;
          position: relative;
          padding: 8px 0;
          transition: var(--transition-fast);
        }
        .nav-link:hover, .nav-link.active {
          color: var(--color-primary);
        }
        .nav-link::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--color-accent);
          transition: var(--transition-fast);
        }
        .nav-link:hover::after, .nav-link.active::after {
          width: 100%;
        }
        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .search-form {
          position: relative;
          display: flex;
          align-items: center;
        }
        .search-input {
          width: 180px;
          padding: 8px 36px 8px 16px;
          border-radius: var(--radius-full);
          border: 1px solid var(--color-border);
          background-color: var(--color-white);
          font-size: 13px;
          transition: var(--transition-fast);
        }
        .search-input:focus {
          width: 240px;
          border-color: var(--color-accent);
        }
        .search-btn {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          color: var(--color-text-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
        }
        .search-btn:hover {
          color: var(--color-primary);
        }
        .action-btn {
          position: relative;
          background: none;
          border: none;
          color: var(--color-primary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px;
          border-radius: 50%;
          transition: var(--transition-fast);
        }
        .action-btn:hover {
          background-color: var(--color-border);
          color: var(--color-primary-light);
        }
        .badge-count {
          position: absolute;
          top: -2px;
          right: -2px;
          background-color: var(--color-primary);
          color: var(--color-white);
          font-size: 10px;
          font-weight: 700;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .profile-menu-container {
          position: relative;
        }
        .profile-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          cursor: pointer;
        }
        .profile-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: var(--color-secondary);
          color: var(--color-primary);
          font-weight: 600;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-sm);
        }
        .profile-name {
          font-size: 14px;
          font-weight: 500;
          color: var(--color-primary);
        }
        .profile-dropdown {
          position: absolute;
          top: 42px;
          right: 0;
          width: 160px;
          background-color: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-md);
          display: flex;
          flex-direction: column;
          padding: 8px 0;
          z-index: 1100;
        }
        .dropdown-item {
          background: none;
          border: none;
          text-align: left;
          padding: 10px 16px;
          font-size: 14px;
          color: var(--color-text);
          cursor: pointer;
          width: 100%;
          transition: var(--transition-fast);
        }
        .dropdown-item:hover {
          background-color: var(--color-bg);
          color: var(--color-primary);
        }
        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--color-primary);
          cursor: pointer;
        }
        .mobile-drawer {
          position: fixed;
          top: 0;
          left: 0;
          width: 280px;
          height: 100vh;
          background-color: var(--color-bg);
          box-shadow: var(--shadow-lg);
          z-index: 1200;
          display: flex;
          flex-direction: column;
          padding: 24px;
        }
        .mobile-drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 32px;
        }
        .close-btn {
          background: none;
          border: none;
          color: var(--color-primary);
          cursor: pointer;
        }
        .mobile-nav {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .mobile-nav-link {
          background: none;
          border: none;
          text-align: left;
          font-size: 18px;
          font-weight: 500;
          color: var(--color-text-muted);
          padding: 12px 0;
          cursor: pointer;
          border-bottom: 1px solid rgba(232, 226, 218, 0.4);
        }
        .mobile-nav-link.active {
          color: var(--color-primary);
          font-weight: 600;
        }
        .logout-link {
          color: var(--color-error);
          margin-top: auto;
        }
        .btn-sm {
          padding: 8px 16px;
          font-size: 13px;
        }

        @media (max-width: 768px) {
          .navbar-menu, .search-form {
            display: none;
          }
          .mobile-toggle {
            display: block;
          }
          .profile-name {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}

export default Navbar;
