import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { PRODUCTS, CURRENCIES, FREE_SHIPPING_THRESHOLD_INR, SHIPPING_FLAT_RATE_INR } from '../data/products';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('jyren_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('jyren_wishlist');
      return saved ? JSON.parse(saved) : ['jyr-ch01', 'jyr-ch02'];
    } catch (e) {
      return ['jyr-ch01', 'jyr-ch02'];
    }
  });

  const [currency, setCurrency] = useState('INR');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('jyren_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeColorFilter, setActiveColorFilter] = useState('All Colors');
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState(null);
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [discountCode, setDiscountCode] = useState('');

  const login = (userData) => {
    const newUser = {
      name: userData?.name || 'Samyuktha Menon',
      email: userData?.email || 'samyuktha@jyren.com',
      phone: userData?.phone || '+91 98765 43210',
      tier: 'Royal Guild VIP Patron'
    };
    setUser(newUser);
    try {
      localStorage.setItem('jyren_user', JSON.stringify(newUser));
    } catch (e) {}
    showToast(`✨ Welcome back, ${newUser.name.split(' ')[0]}!`);
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('jyren_user');
    } catch (e) {}
    showToast('You have been signed out.');
  };

  const notificationTimerRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem('jyren_cart', JSON.stringify(cart));
    } catch (e) {
      // Storage unavailable or full
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('jyren_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      // Storage unavailable or full
    }
  }, [wishlist]);

  const showNotification = (data) => {
    if (notificationTimerRef.current) clearTimeout(notificationTimerRef.current);
    if (typeof data === 'string') {
      setNotification({
        type: 'info',
        badge: 'JYREN ATELIER',
        title: data,
      });
    } else {
      setNotification(data);
    }
    notificationTimerRef.current = setTimeout(() => {
      setNotification(null);
    }, 4200);
  };

  const closeNotification = () => {
    if (notificationTimerRef.current) clearTimeout(notificationTimerRef.current);
    setNotification(null);
  };

  const showToast = (message) => {
    showNotification(message);
  };

  const addToCart = (product, optionOrParams = 'Standard Fit (Included)', qty = 1, surcharge = 0, size = '') => {
    if (!product) return;

    let finalOption = 'Standard Fit (Included)';
    let finalQty = 1;
    let finalSurcharge = 0;
    let finalSize = '';

    if (typeof optionOrParams === 'object' && optionOrParams !== null) {
      finalOption = optionOrParams.option || optionOrParams.blouseOption || product.customOptions?.[0]?.label || 'Standard Fit (Included)';
      finalQty = Math.max(1, Number(optionOrParams.quantity || optionOrParams.qty || 1));
      finalSurcharge = Number(optionOrParams.surcharge || 0);
      finalSize = optionOrParams.size || '';
    } else if (typeof optionOrParams === 'number') {
      // Handles (product, quantity, option, size, surcharge)
      finalQty = Math.max(1, optionOrParams);
      finalOption = typeof qty === 'string' ? qty : (product.customOptions?.[0]?.label || 'Standard Fit (Included)');
      finalSize = typeof surcharge === 'string' ? surcharge : '';
      finalSurcharge = typeof size === 'number' ? size : 0;
    } else {
      // Handles standard positional (product, option, qty, surcharge, size)
      finalOption = optionOrParams || product.customOptions?.[0]?.label || 'Standard Fit (Included)';
      finalQty = typeof qty === 'number' ? Math.max(1, qty) : 1;
      finalSurcharge = typeof surcharge === 'number' ? surcharge : 0;
      finalSize = typeof size === 'string' ? size : '';
    }

    const unitPriceINR = product.priceINR + (finalSurcharge || 0);
    const compositeOption = finalSize ? `${finalOption} (Size: ${finalSize})` : finalOption;

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.blouseOption === compositeOption
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += finalQty;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            product,
            blouseOption: compositeOption,
            size: finalSize,
            surcharge: finalSurcharge,
            unitPriceINR,
            quantity: finalQty,
          }
        ];
      }
    });

    showNotification({
      type: 'cart',
      badge: 'ADDED TO BAG',
      title: product.name,
      subtitle: compositeOption,
      price: formatPrice(unitPriceINR),
      image: product.image,
      actionText: 'VIEW BAG'
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
      );
    }
  };

  const toggleWishlist = (productId) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    setWishlist((prev) => {
      const isSaved = prev.includes(productId);
      if (isSaved) {
        showNotification({
          type: 'wishlist-removed',
          badge: 'WISHLIST UPDATED',
          title: product ? product.name : 'Exclusive Ensemble',
          subtitle: 'Removed from your private curation',
          image: product?.image,
        });
        return prev.filter((id) => id !== productId);
      } else {
        showNotification({
          type: 'wishlist-saved',
          badge: 'SAVED TO WISHLIST',
          title: product ? product.name : 'Exclusive Ensemble',
          subtitle: 'Reserved in your private bespoke curation',
          price: product ? formatPrice(product.priceINR) : undefined,
          image: product?.image,
        });
        return [...prev, productId];
      }
    });
  };

  const formatPrice = (amountINR) => {
    const curr = CURRENCIES[currency] || CURRENCIES.INR;
    const converted = amountINR * curr.rate;
    if (currency === 'INR') {
      return `${curr.symbol}${converted.toLocaleString('en-IN')}`;
    }
    return `${curr.symbol}${converted.toFixed(2)}`;
  };

  const subtotalINR = cart.reduce(
    (sum, item) => sum + (item.unitPriceINR || item.product.priceINR) * item.quantity,
    0
  );

  const discountAmountINR = appliedDiscount ? Math.round((subtotalINR * appliedDiscount.percent) / 100) : 0;
  const shippingINR = subtotalINR >= FREE_SHIPPING_THRESHOLD_INR || subtotalINR === 0 ? 0 : SHIPPING_FLAT_RATE_INR;
  const totalINR = subtotalINR - discountAmountINR + shippingINR;

  const freeShippingThresholdINR = FREE_SHIPPING_THRESHOLD_INR;
  const freeShippingProgress = Math.min(100, Math.round((subtotalINR / freeShippingThresholdINR) * 100));

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        wishlist,
        toggleWishlist,
        currency,
        setCurrency,
        formatPrice,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        quickViewProduct,
        setQuickViewProduct,
        activeColorFilter,
        setActiveColorFilter,
        activeCategory,
        setActiveCategory,
        notification,
        showNotification,
        closeNotification,
        toastMessage: notification ? (notification.title || notification.message) : null,
        showToast,
        subtotalINR,
        discountAmountINR,
        shippingINR,
        totalINR,
        freeShippingProgress,
        freeShippingThresholdINR,
        totalCartCount,
        discountCode,
        setDiscountCode,
        appliedDiscount,
        setAppliedDiscount,
        PRODUCTS,
        user,
        isLoggedIn: Boolean(user),
        isAuthModalOpen,
        setIsAuthModalOpen,
        login,
        logout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    return {
      PRODUCTS: PRODUCTS || [],
      cart: [],
      wishlist: [],
      currency: 'INR',
      formatPrice: (amt) => `₹${amt}`,
      isCartOpen: false,
      setIsCartOpen: () => {},
      isSearchOpen: false,
      setIsSearchOpen: () => {},
      isAuthModalOpen: false,
      setIsAuthModalOpen: () => {},
      user: null,
      isLoggedIn: false,
      login: () => {},
      logout: () => {},
      quickViewProduct: null,
      setQuickViewProduct: () => {},
      activeColorFilter: 'All Colors',
      setActiveColorFilter: () => {},
      activeCategory: 'all',
      setActiveCategory: () => {},
      notification: null,
      showNotification: () => {},
      closeNotification: () => {},
      toastMessage: null,
      showToast: () => {},
      subtotalINR: 0,
      discountAmountINR: 0,
      shippingINR: 0,
      totalINR: 0,
      freeShippingProgress: 0,
      freeShippingThresholdINR: 2999,
      totalCartCount: 0,
      discountCode: '',
      setDiscountCode: () => {},
      appliedDiscount: null,
      setAppliedDiscount: () => {},
      addToCart: () => {},
      removeFromCart: () => {},
      clearCart: () => {},
      updateQuantity: () => {},
      toggleWishlist: () => {},
      setCurrency: () => {}
    };
  }
  return context;
};
