import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (newItem) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.menuItem.id === newItem.menuItem.id &&
        JSON.stringify(item.customizations) === JSON.stringify(newItem.customizations)
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        return [...prevItems, { ...newItem, quantity: 1 }];
      }
    });
  };

  const addItemWithToast = (newItem) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.menuItem.id === newItem.menuItem.id &&
        JSON.stringify(item.customizations) === JSON.stringify(newItem.customizations)
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        return [...prevItems, { ...newItem, quantity: 1 }];
      }
    });
  };

  const removeItem = (menuItemId) => {
    setItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.menuItem.id !== menuItemId);
      return updatedItems;
    });
  };

  const updateQuantity = (menuItemId, quantity) => {
    if (quantity <= 0) {
      setItems(prevItems => {
        const updatedItems = prevItems.filter(item => item.menuItem.id !== menuItemId);
        return updatedItems;
      });
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.menuItem.id === menuItemId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast.success('Cart cleared');
  };

  const getItemQuantity = (menuItemId) => {
    const item = items.find(item => item.menuItem.id === menuItemId);
    return item ? item.quantity : 0;
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = items.reduce((sum, item) => {
    const itemPrice = item.menuItem.price;
    const customizationsPrice = item.customizations.reduce((customSum, custom) => customSum + custom.price, 0);
    return sum + (itemPrice + customizationsPrice) * item.quantity;
  }, 0);

  const value = {
    items,
    totalItems,
    totalPrice,
    addItem,
    addItemWithToast,
    removeItem,
    updateQuantity,
    clearCart,
    getItemQuantity,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
