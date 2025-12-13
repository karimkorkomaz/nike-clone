import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Load cart from localStorage on first load
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ===========================
  // ADD ITEM TO CART (fixed)
  // ===========================
  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);

      if (existing) {
        // Increase quantity if item already exists
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + 1 } : p
        );
      }

      // NEW item → ensure price is always a number
      return [
        ...prev,
        { 
          ...item, 
          price: Number(item.price),   // IMPORTANT FIX
          qty: 1 
        }
      ];
    });
  };

  // ===========================
  // REMOVE ITEM COMPLETELY
  // ===========================
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  // ===========================
  // CHANGE QTY (+/-)
  // ===========================
  const changeQty = (id, amount) => {
    setCart((prev) =>
      prev
        .map((p) =>
          p.id === id
            ? { ...p, qty: Math.max(1, p.qty + amount) }
            : p
        )
        .filter((p) => p.qty > 0)
    );
  };

  // ===========================
  // CLEAR CART (used after order success)
  // ===========================
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, changeQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
