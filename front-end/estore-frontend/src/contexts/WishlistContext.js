import React, { createContext, useState, useContext, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem('wishlist');
      const parsed = stored ? JSON.parse(stored) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // 🔥 SAFE ID HANDLING (IMPORTANT FIX)
  const getId = (p) => p?.id || p?._id;

  const toggle = (product) => {
    if (!product) return;

    const id = getId(product);
    if (!id) return;

    setWishlist((prev) => {
      const exists = prev.some((p) => getId(p) === id);

      if (exists) {
        return prev.filter((p) => getId(p) !== id);
      }

      return [...prev, product];
    });
  };

  const isWished = (productId) => {
    if (!productId) return false;
    return wishlist.some((p) => getId(p) === productId);
  };

  const clearWishlist = () => setWishlist([]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggle,
        isWished,
        count: wishlist.length,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};