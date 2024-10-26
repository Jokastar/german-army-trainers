"use client";

import React, { createContext, useContext, useState } from 'react';

// Create the Cart context
const CartContext = createContext();

// Cart Provider
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add product to cart (increase quantity if it already exists)
  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Remove product from cart if it exists
  const removeFromCart = (id) => {
    const existingproduct = cart.find(item => item.id === id);
    if (existingproduct) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      console.log("Product not in cart");
    }
  };

  // Clear the cart
  const clearCart = () => {
    setCart([]);
  };

  // Get the total price of all items in the cart
  const getTotal = () => {
    return cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  // Cart data and actions available throughout the app
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getTotal }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);

