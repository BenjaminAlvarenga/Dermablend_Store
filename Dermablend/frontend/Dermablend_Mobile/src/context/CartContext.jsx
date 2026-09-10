import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartContext = createContext(null);
const CART_STORAGE_KEY = "dermablend:cart";
const SHIPPING_THRESHOLD = 50;
const SHIPPING_COST = 3.99;

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{ id, name, price, image, shade, stock, quantity }]
  const [isReady, setIsReady] = useState(false);
  const [lastAddedId, setLastAddedId] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem(CART_STORAGE_KEY)
      .then((raw) => {
        if (raw) setItems(JSON.parse(raw));
      })
      .catch((error) => {
        console.log("Error al cargar el carrito guardado:", error);
      })
      .finally(() => setIsReady(true));
  }, []);

  useEffect(() => {
    if (!isReady) return;
    AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items)).catch((error) => {
      console.log("Error al guardar el carrito:", error);
    });
  }, [items, isReady]);

  useEffect(() => {
    if (!lastAddedId) return;
    const timer = setTimeout(() => setLastAddedId(null), 1200);
    return () => clearTimeout(timer);
  }, [lastAddedId]);

  // Agrega un producto respetando el stock disponible. Si ya existe, suma la
  // cantidad sin nunca sobrepasar el stock reportado por el backend.
  const addItem = useCallback((product, quantity = 1) => {
    const availableStock = Number.isFinite(product.stock) ? product.stock : Infinity;
    if (availableStock <= 0) return { ok: false, message: "Este producto no tiene disponibilidad." };

    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        const nextQuantity = Math.min(existing.quantity + quantity, availableStock);
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: nextQuantity } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          shade: product.shade,
          category: product.category,
          stock: availableStock,
          quantity: Math.min(quantity, availableStock),
        },
      ];
    });
    setLastAddedId(product.id);
    return { ok: true };
  }, []);

  const increment = useCallback((id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.min(item.quantity + 1, item.stock ?? Infinity) }
          : item
      )
    );
  }, []);

  const decrement = useCallback((id) => {
    setItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 && subtotal < SHIPPING_THRESHOLD ? SHIPPING_COST : 0;
  const total = subtotal + shipping;
  const hasUnavailableItems = items.some(
    (item) => Number.isFinite(item.stock) && item.stock <= 0
  );

  const value = useMemo(
    () => ({
      items,
      isReady,
      itemCount,
      subtotal,
      shipping,
      shippingThreshold: SHIPPING_THRESHOLD,
      total,
      hasUnavailableItems,
      lastAddedId,
      addItem,
      increment,
      decrement,
      removeItem,
      clearCart,
    }),
    [items, isReady, itemCount, subtotal, shipping, total, hasUnavailableItems, lastAddedId, addItem, increment, decrement, removeItem, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartContext;
