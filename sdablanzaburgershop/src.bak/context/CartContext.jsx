import React, { createContext, useEffect, useState, useMemo } from 'react';

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('burgerCart') || '[]');
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('burgerCart', JSON.stringify(cart));
    } catch (e) {
      // ignore
    }
  }, [cart]);

  const addItem = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id && i.name === item.name);
      if (existing) {
        return prev.map(i => i === existing ? { ...i, qty: (i.qty || 0) + (item.qty || 1) } : i);
      }
      return [...prev, { ...item, qty: item.qty || 1 }];
    });
  };

  const removeItem = (id) => setCart(prev => prev.filter(i => i.id !== id));

  const updateQty = (id, qty) => {
    const q = Number(qty) || 0;
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: q } : i).filter(i => i.qty > 0));
  };

  const clearCart = () => setCart([]);

  const total = useMemo(() => {
    return cart.reduce((sum, it) => sum + (Number(it.price) || 0) * (it.qty || 0), 0);
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateQty, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

