import React, { createContext, useContext, useState } from 'react';

// Create the Cart context
const CartContext = createContext();

// Cart Provider
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add sneaker to cart (increase quantity if it already exists)
  const addToCart = (sneaker) => {
    const existingSneaker = cart.find(item => item.id === sneaker.id);
    if (existingSneaker) {
      setCart(cart.map(item => 
        item.id === sneaker.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...sneaker, quantity: 1 }]);
    }
  };

  // Remove sneaker from cart if it exists
  const removeFromCart = (id) => {
    const existingSneaker = cart.find(item => item.id === id);
    if (existingSneaker) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      console.log("Sneaker not in cart");
    }
  };

  // Clear the cart
  const clearCart = () => {
    setCart([]);
  };

  // Cart data and actions available throughout the app
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);
