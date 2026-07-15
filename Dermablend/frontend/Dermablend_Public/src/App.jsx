import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Catalog from "./pages/Catalog.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Customizer from "./pages/Customizer.jsx";
import Cart from "./pages/Cart.jsx";
import Profile from "./pages/Profile.jsx";
import AuthModal from "./components/AuthModal.jsx";
import RecoveryReset from "./pages/RecoveryReset.jsx";

// Base API URL pointing to our local backend server
export const API_BASE_URL = "http://localhost:3000/api";

function App() {
  // Global States
  const [view, setView] = useState("home"); // home, catalog, detail, customizer, cart, profile
  const [activeProductId, setActiveProductId] = useState(null);
  const [recoveryToken, setRecoveryToken] = useState("");

  // Handle URL query parameters on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get("view");
    const tokenParam = params.get("token");
    if (viewParam === "recovery-reset" && tokenParam) {
      setRecoveryToken(tokenParam);
      setView("recovery-reset");
    }
  }, []);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("dermablend_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem("dermablend_token") || null;
  });
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("dermablend_cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("dermablend_favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState("login"); // login, register, recovery

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem("dermablend_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("dermablend_favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Auth actions
  const handleLogin = (userData, tokenString) => {
    setUser(userData);
    setToken(tokenString);
    localStorage.setItem("dermablend_user", JSON.stringify(userData));
    localStorage.setItem("dermablend_token", tokenString);
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("dermablend_user");
    localStorage.removeItem("dermablend_token");
    setView("home");
  };

  // Validate session on mount
  useEffect(() => {
    if (token) {
      fetch(`${API_BASE_URL}/auth/profile`, {
        headers: { "Authorization": `Bearer ${token}` }
      })
        .then((res) => {
          if (!res.ok) throw new Error("Invalid session");
          return res.json();
        })
        .then((data) => {
          if (data.success && data.user) {
            setUser(data.user);
            localStorage.setItem("dermablend_user", JSON.stringify(data.user));
          }
        })
        .catch((err) => {
          console.error("Session verification failed. Logging out...", err.message);
          handleLogout();
        });
    }
  }, [token]);

  // Cart actions
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product_id === product._id);
      if (existing) {
        return prevCart.map((item) =>
          item.product_id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prevCart,
        {
          product_id: product._id,
          quantity: quantity,
          price: product.price,
          product: product
        }
      ];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.product_id !== productId));
  };

  const updateCartQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product_id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Favorites actions
  const toggleFavorite = (productId) => {
    setFavorites((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      return [...prev, productId];
    });
  };

  // Navigation router
  const navigateTo = (newView, productId = null) => {
    setView(newView);
    if (newView === "detail" && productId) {
      setActiveProductId(productId);
    } else {
      setActiveProductId(null);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Search execution
  const executeSearch = (query) => {
    setSearchQuery(query);
    setView("catalog");
  };

  // Render current view
  const renderView = () => {
    switch (view) {
      case "home":
        return (
          <Home
            navigateTo={navigateTo}
            addToCart={addToCart}
            toggleFavorite={toggleFavorite}
            favorites={favorites}
          />
        );
      case "catalog":
        return (
          <Catalog
            navigateTo={navigateTo}
            addToCart={addToCart}
            toggleFavorite={toggleFavorite}
            favorites={favorites}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        );
      case "detail":
        return (
          <ProductDetail
            productId={activeProductId}
            navigateTo={navigateTo}
            addToCart={addToCart}
            toggleFavorite={toggleFavorite}
            favorites={favorites}
            user={user}
            token={token}
            openAuth={() => {
              setAuthTab("login");
              setIsAuthOpen(true);
            }}
          />
        );
      case "customizer":
        return (
          <Customizer
            user={user}
            token={token}
            navigateTo={navigateTo}
            openAuth={() => {
              setAuthTab("login");
              setIsAuthOpen(true);
            }}
          />
        );
      case "cart":
        return (
          <Cart
            cart={cart}
            user={user}
            token={token}
            updateCartQuantity={updateCartQuantity}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            navigateTo={navigateTo}
            openAuth={() => {
              setAuthTab("login");
              setIsAuthOpen(true);
            }}
          />
        );
      case "profile":
        return (
          <Profile
            user={user}
            token={token}
            handleLogout={handleLogout}
            navigateTo={navigateTo}
          />
        );
      case "recovery-reset":
        return (
          <RecoveryReset
            token={recoveryToken}
            navigateTo={navigateTo}
          />
        );
      default:
        return <Home navigateTo={navigateTo} />;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar
        view={view}
        navigateTo={navigateTo}
        user={user}
        cartCount={cart.reduce((total, item) => total + item.quantity, 0)}
        favoritesCount={favorites.length}
        executeSearch={executeSearch}
        openAuth={(tab = "login") => {
          setAuthTab(tab);
          setIsAuthOpen(true);
        }}
        handleLogout={handleLogout}
      />

      <main style={{ flexGrow: 1, paddingBottom: "60px" }}>{renderView()}</main>

      {/* Auth Modal Trigger popup */}
      {isAuthOpen && (
        <AuthModal
          activeTab={authTab}
          setActiveTab={setAuthTab}
          onClose={() => setIsAuthOpen(false)}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
}

export default App;
