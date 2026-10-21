import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CartItem, Product, ProductCategory, ProductColor } from '../types';
import { PRODUCTS } from '../data/products';

type ToastType = 'default' | 'success' | 'whatsapp';

export interface ToastAction {
  label: string;
  href: string;
}

interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: ToastType;
  action?: ToastAction;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, selectedSize: string, selectedColor: ProductColor, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, newQty: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  subtotal: number;
  toasts: ToastMessage[];
  addToast: (title: string, description?: string, type?: ToastType, action?: ToastAction) => void;
  removeToast: (id: string) => void;
  selectedProductForModal: Product | null;
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeCategory: ProductCategory | 'All';
  setActiveCategory: (c: ProductCategory | 'All') => void;
}

const CART_STORAGE_KEY = 'undignified_cart_v1';
const TOAST_DURATION_MS = 4000;

const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * Restore the cart from localStorage, re-reading each product from the catalog so
 * price changes apply and anything that no longer exists is dropped.
 */
function loadStoredCart(): CartItem[] {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored) as CartItem[];
    return parsed.flatMap((item) => {
      const product = PRODUCTS.find((p) => p.id === item.product?.id);
      // Drop items whose product, colour or size no longer exists in the catalog.
      const color = product?.colors.find((c) => c.name === item.selectedColor?.name);
      if (!product || !color || !product.sizes.includes(item.selectedSize) || !(item.quantity > 0)) return [];
      return [{ ...item, product, selectedColor: color }];
    });
  } catch {
    return [];
  }
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(loadStoredCart);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'All'>('All');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage unavailable or full: the cart still works for this session.
    }
  }, [items]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (title: string, description?: string, type: ToastType = 'default', action?: ToastAction) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, title, description, type, action }]);
      // Toasts with a link stay longer so there is time to use it.
      setTimeout(() => removeToast(id), action ? 10000 : TOAST_DURATION_MS);
    },
    [removeToast]
  );

  const addToCart = useCallback(
    (product: Product, selectedSize: string, selectedColor: ProductColor, quantity = 1) => {
      const itemId = `${product.id}-${selectedSize}-${selectedColor.name}`;
      setItems((prev) => {
        const existing = prev.find((item) => item.id === itemId);
        if (existing) {
          return prev.map((item) =>
            item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
          );
        }
        return [...prev, { id: itemId, product, selectedSize, selectedColor, quantity }];
      });
      addToast('Added to bag', `${product.name} · ${selectedSize} · ${selectedColor.name}`);
    },
    [addToast]
  );

  const removeFromCart = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const updateQuantity = useCallback(
    (itemId: string, newQty: number) => {
      if (newQty <= 0) {
        removeFromCart(itemId);
        return;
      }
      setItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item)));
    },
    [removeFromCart]
  );

  const clearCart = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const openProductModal = useCallback((product: Product) => setSelectedProductForModal(product), []);
  const closeProductModal = useCallback(() => setSelectedProductForModal(null), []);

  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items]
  );

  const value = useMemo<CartContextType>(
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isCartOpen,
      openCart,
      closeCart,
      totalItems,
      subtotal,
      toasts,
      addToast,
      removeToast,
      selectedProductForModal,
      openProductModal,
      closeProductModal,
      searchQuery,
      setSearchQuery,
      activeCategory,
      setActiveCategory,
    }),
    [
      items, addToCart, removeFromCart, updateQuantity, clearCart, isCartOpen, openCart, closeCart,
      totalItems, subtotal, toasts, addToast, removeToast, selectedProductForModal, openProductModal,
      closeProductModal, searchQuery, activeCategory,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
