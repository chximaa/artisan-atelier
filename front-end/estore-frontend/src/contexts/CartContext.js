import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCart, addToCart, updateCartItem, removeCartItem, clearCart } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchCart = async () => {
    if (!user) {
      setCart(null);
      return;
    }

    setLoading(true);
    try {
      const response = await getCart(user.id);
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addItem = async (productId, quantity) => {
    if (!user) return { success: false, error: 'Please login first' };

    try {
      const response = await addToCart(user.id, { productId, quantity });
      setCart(response.data);
      return { success: true, cart: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to add item' 
      };
    }
  };

  const updateItem = async (itemId, quantity) => {
    if (!user) return;

    try {
      const response = await updateCartItem(user.id, itemId, quantity);
      setCart(response.data);
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  const removeItem = async (itemId) => {
    if (!user) return;

    try {
      const response = await removeCartItem(user.id, itemId);
      setCart(response.data);
    } catch (error) {
      console.error('Error removing cart item:', error);
    }
  };

  const emptyCart = async () => {
    if (!user) return;

    try {
      await clearCart(user.id);
      setCart({ ...cart, items: [], totalAmount: 0, totalItems: 0 });
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      addItem,
      updateItem,
      removeItem,
      emptyCart,
      refreshCart: fetchCart
    }}>
      {children}
    </CartContext.Provider>
  );
};