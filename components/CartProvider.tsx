'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { createShopifyCheckout } from '@/lib/shopify';

type CartItem = {
  id: string;
  productId: string;
  title: string;
  variantId: string;
  variantTitle: string;
  price: string;
  rawPrice: number;
  currencyCode: string;
  quantity: number;
  image?: string;
  handle: string;
};

type CartContextValue = {
  items: CartItem[];
  totalQuantity: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
};

const CART_STORAGE_KEY = 'ttk-cart';
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return;
    try {
      setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      window.localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const currencyCode = items[0]?.currencyCode ?? 'GBP';
  const totalPrice = items.reduce((sum, item) => sum + item.rawPrice * item.quantity, 0);
  const formattedTotal = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(totalPrice);

  const addItem = useCallback((item: Omit<CartItem, 'id'>) => {
    setItems((prev) => {
      const key = `${item.productId}:${item.variantId}`;
      const existing = prev.find((e) => e.id === key);
      if (existing) {
        return prev.map((e) => e.id === key ? { ...e, quantity: e.quantity + item.quantity } : e);
      }
      return [...prev, { ...item, id: key }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  async function handleCheckout() {
    if (items.length === 0 || checkingOut) return;
    setCheckingOut(true);
    const lines = items.map((item) => ({ merchandiseId: item.variantId, quantity: item.quantity }));
    const url = await createShopifyCheckout(lines);
    setCheckingOut(false);
    if (url) window.location.href = url;
  }

  const value = useMemo<CartContextValue>(
    () => ({ items, totalQuantity, isOpen, openCart, closeCart, addItem, removeItem }),
    [items, totalQuantity, isOpen, openCart, closeCart, addItem, removeItem],
  );

  return (
    <CartContext.Provider value={value}>
      {children}

      {/* Backdrop */}
      <div
        aria-hidden
        onClick={closeCart}
        className={`fixed inset-0 bg-ink/45 z-[99] transition-opacity duration-[350ms] ease-in ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Cart drawer */}
      <aside
        aria-label="Shopping bag"
        className={`fixed top-0 right-0 w-[min(420px,100vw)] h-[100dvh] bg-surface border-l border-rule z-[100] flex flex-col transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center pt-7 px-7 pb-5 border-b border-rule shrink-0">
          <span className="font-sans text-[11px] tracking-[0.22em] uppercase text-ink">
            Your Bag{totalQuantity > 0 ? ` (${totalQuantity})` : ''}
          </span>
          <button
            onClick={closeCart}
            aria-label="Close bag"
            className="bg-transparent border-none text-ink text-[26px] leading-none px-1"
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-7 py-6">
          {items.length === 0 ? (
            <p className="font-serif italic text-lg text-ink-soft text-center mt-16">
              Your bag is empty.
            </p>
          ) : (
            <div className="flex flex-col gap-7">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 items-start">
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-[100px] object-cover shrink-0 border border-rule"
                    />
                  ) : (
                    <div className="w-20 h-[100px] bg-bg shrink-0 border border-rule" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-serif italic text-base text-ink mb-1 leading-snug">
                      {item.title}
                    </div>
                    {item.variantTitle !== 'Default' && (
                      <div className="font-sans text-[10px] tracking-[0.14em] uppercase text-ink-soft mb-1.5">
                        {item.variantTitle}
                      </div>
                    )}
                    <div className="flex justify-between items-baseline mt-2">
                      <span className="font-sans text-xs text-ink-soft">Qty {item.quantity}</span>
                      <span className="font-sans text-[13px] text-ink">{item.price}</span>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="mt-2.5 bg-transparent border-none font-sans text-[10px] tracking-[0.18em] uppercase text-muted p-0 underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Checkout footer */}
        {items.length > 0 && (
          <div className="px-7 py-5 border-t border-rule shrink-0">
            <div className="flex justify-between mb-4 font-sans text-xs">
              <span className="uppercase tracking-[0.18em] text-ink-soft">Subtotal</span>
              <span className="text-ink">{formattedTotal}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={checkingOut}
              className={`w-full py-4 bg-ink text-surface border-none font-sans text-[11px] tracking-[0.22em] uppercase transition-opacity ${checkingOut ? 'opacity-70 cursor-wait' : 'cursor-pointer'}`}
            >
              {checkingOut ? 'Preparing...' : 'Checkout'}
            </button>
          </div>
        )}
      </aside>
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}
