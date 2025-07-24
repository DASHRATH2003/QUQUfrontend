import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

// Helper function to format price to 2 decimal places
const formatPrice = (price) => {
  return parseFloat(price.toFixed(2));
};

// Debounce helper
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage or empty array
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart:', error);
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }, [cartItems]);

  // Debounced toast notification
  const showToast = useCallback(
    debounce((message) => {
      toast.success(message, {
        duration: 1000,
        position: 'top-right',
        style: {
          background: '#333',
          color: '#fff',
          padding: '4px 8px',
          fontSize: '14px',
          borderRadius: '4px',
        },
      });
    }, 300),
    []
  );

  // Add item to cart - optimized for instant response
  const addToCart = useCallback((product, quantity = 1) => {
    if (!product?.id) return;

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      // Update or add new item
      const newItems = existingItem
        ? prevItems.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        : [...prevItems, { ...product, quantity }];

      // Show notification with debounce
      showToast(
        existingItem 
          ? `+${quantity} ${product.name}`
          : `Added ${product.name}`
      );

      return newItems;
    });
  }, [showToast]);

  // Remove item from cart - optimized for instant response
  const removeFromCart = useCallback((productId) => {
    setCartItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === productId);
      if (itemToRemove) {
        showToast(`Removed ${itemToRemove.name}`);
      }
      return prevItems.filter(item => item.id !== productId);
    });
  }, [showToast]);

  // Update item quantity - optimized for instant response
  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      );

      const updatedItem = updatedItems.find(item => item.id === productId);
      if (updatedItem) {
        showToast(`Updated ${updatedItem.name}`);
      }

      return updatedItems;
    });
  }, [removeFromCart, showToast]);

  // Clear cart - optimized for instant response
  const clearCart = useCallback(() => {
    setCartItems([]);
    showToast('Cart cleared');
  }, [showToast]);

  // Get total price - memoized
  const getTotalPrice = useCallback(() => {
    return formatPrice(cartItems.reduce((total, item) => total + (item.price * item.quantity), 0));
  }, [cartItems]);

  // Get cart item count - memoized
  const getCartCount = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getCartCount,
    formatPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}; 