import { createContext, useContext, useEffect, useState } from 'react';
import { findDish } from './menu.js';

const CartContext = createContext(null);
const AuthContext = createContext(null);

function readStoredValue(key, fallback) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => readStoredValue('addis-eats-cart', {}));

  useEffect(() => {
    window.localStorage.setItem('addis-eats-cart', JSON.stringify(cart));
  }, [cart]);

  const items = Object.entries(cart)
    .map(([id, quantity]) => ({ dish: findDish(id), quantity }))
    .filter(({ dish }) => dish);
  const count = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, { dish, quantity }) => total + dish.price * quantity, 0);

  function addItem(id) {
    setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }));
  }

  function updateQuantity(id, quantity) {
    setCart((current) => {
      if (quantity < 1) return current;
      return { ...current, [id]: quantity };
    });
  }

  function removeItem(id) {
    setCart((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  }

  function clearCart() {
    setCart({});
  }

  return (
    <CartContext.Provider value={{ items, count, subtotal, addItem, updateQuantity, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => window.localStorage.getItem('addis-eats-user'));

  function signIn(email) {
    window.localStorage.setItem('addis-eats-user', email);
    setUser(email);
  }

  function signOut() {
    window.localStorage.removeItem('addis-eats-user');
    setUser(null);
  }

  return <AuthContext.Provider value={{ user, signIn, signOut }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}