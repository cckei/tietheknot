'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  createCart,
  addCartLines,
  removeCartLines,
  updateCartLines,
  fetchCart,
  type ShopifyCart,
  type ShopifyCartLine,
} from '@/lib/shopify';

// ─── Types ───────────────────────────────────────────────────────────────────

type CartItem = {
  id: string;           // Shopify cart line ID
  variantId: string;
  productId: string;
  title: string;
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
  loading: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const CART_ID_KEY = 'ttk-cart-id';
const CHECKOUT_PENDING_KEY = 'ttk-checkout-pending';

function formatPrice(amount: string, currencyCode: string): string {
  const num = Number(amount);
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(Number.isNaN(num) ? 0 : num);
}

function mapLine(line: ShopifyCartLine): CartItem {
  const { merchandise } = line;
  return {
    id: line.id,
    variantId: merchandise.id,
    productId: merchandise.product.id,
    title: merchandise.product.title,
    variantTitle: merchandise.title,
    price: formatPrice(merchandise.price.amount, merchandise.price.currencyCode),
    rawPrice: Number(merchandise.price.amount),
    currencyCode: merchandise.price.currencyCode,
    quantity: line.quantity,
    image: merchandise.product.images.edges[0]?.node.url,
    handle: merchandise.product.handle,
  };
}

// ─── Context ─────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const cartIdRef = useRef<string | null>(null);

  // On mount: restore cart — but clear it if user returned from Shopify checkout
  useEffect(() => {
    // If a checkout was initiated and the user came back from Shopify's domain,
    // treat this as a completed (or abandoned) checkout and wipe the cart.
    const pending = window.localStorage.getItem(CHECKOUT_PENDING_KEY);
    if (pending) {
      const referrer = document.referrer;
      const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? '';
      // Strip subdomain prefix (e.g. "tietheknot-florist.myshopify.com" → "tietheknot-florist")
      const storeName = shopifyDomain.split('.')[0];
      const cameFromShopify =
        referrer.includes('myshopify.com') ||
        referrer.includes('accounts.shopify.com') ||
        (storeName && referrer.includes(storeName));

      if (cameFromShopify) {
        window.localStorage.removeItem(CART_ID_KEY);
        window.localStorage.removeItem(CHECKOUT_PENDING_KEY);
        cartIdRef.current = null;
        return; // leave cart empty
      }
    }

    const savedId = window.localStorage.getItem(CART_ID_KEY);
    if (!savedId) return;
    cartIdRef.current = savedId;
    fetchCart(savedId).then((c) => {
      if (c) {
        setCart(c);
      } else {
        // Cart expired or invalid — start fresh
        window.localStorage.removeItem(CART_ID_KEY);
        cartIdRef.current = null;
      }
    });
  }, []);

  // Persist cartId whenever the cart changes
  useEffect(() => {
    if (cart?.id) {
      window.localStorage.setItem(CART_ID_KEY, cart.id);
      cartIdRef.current = cart.id;
    }
  }, [cart?.id]);

  const items = useMemo<CartItem[]>(
    () => (cart?.lines.edges ?? []).map((e) => mapLine(e.node)),
    [cart],
  );

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const totalAmount = cart?.cost.subtotalAmount;
  const formattedTotal = totalAmount
    ? formatPrice(totalAmount.amount, totalAmount.currencyCode)
    : '—';

  // ── Mutations ──────────────────────────────────────────────────────────────

  const addItem = useCallback(async (variantId: string, quantity = 1) => {
    setLoading(true);
    try {
      let updatedCart: ShopifyCart | null = null;

      if (!cartIdRef.current) {
        // No cart yet — create one
        updatedCart = await createCart([{ merchandiseId: variantId, quantity }]);
      } else {
        // Check if this variant already has a line in the cart
        const existingLine = cart?.lines.edges.find(
          (e) => e.node.merchandise.id === variantId,
        );
        if (existingLine) {
          // Bump quantity on the existing line
          updatedCart = await updateCartLines(cartIdRef.current, [
            { id: existingLine.node.id, quantity: existingLine.node.quantity + quantity },
          ]);
        } else {
          // Add a new line
          updatedCart = await addCartLines(cartIdRef.current, [
            { merchandiseId: variantId, quantity },
          ]);
        }
      }

      if (updatedCart) {
        setCart(updatedCart);
        setIsOpen(true);
      }
    } finally {
      setLoading(false);
    }
  }, [cart]);

  const removeItem = useCallback(async (lineId: string) => {
    if (!cartIdRef.current) return;
    setLoading(true);
    try {
      const updatedCart = await removeCartLines(cartIdRef.current, [lineId]);
      if (updatedCart) setCart(updatedCart);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateQuantity = useCallback(async (lineId: string, quantity: number) => {
    if (!cartIdRef.current) return;
    setLoading(true);
    try {
      const updatedCart = await updateCartLines(cartIdRef.current, [{ id: lineId, quantity }]);
      if (updatedCart) setCart(updatedCart);
    } finally {
      setLoading(false);
    }
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  async function handleCheckout() {
    if (!cart?.checkoutUrl || loading) return;

    // Mark that a checkout was initiated so we can clear the cart on return
    window.localStorage.setItem(CHECKOUT_PENDING_KEY, '1');

    // Append a return_to URL so Shopify redirects back after payment.
    // Shopify honours this on most checkout configurations; it is silently
    // ignored when not supported (e.g. customer-accounts checkout).
    const returnTo = `${window.location.origin}/order-confirmed`;
    const separator = cart.checkoutUrl.includes('?') ? '&' : '?';
    window.location.href = `${cart.checkoutUrl}${separator}return_to=${encodeURIComponent(returnTo)}`;
  }

  const value = useMemo<CartContextValue>(
    () => ({ items, totalQuantity, isOpen, loading, openCart, closeCart, addItem, removeItem, updateQuantity }),
    [items, totalQuantity, isOpen, loading, openCart, closeCart, addItem, removeItem, updateQuantity],
  );

  // ── Render ─────────────────────────────────────────────────────────────────

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
                    {item.variantTitle !== 'Default Title' && (
                      <div className="font-sans text-[10px] tracking-[0.14em] uppercase text-ink-soft mb-1.5">
                        {item.variantTitle}
                      </div>
                    )}
                    <div className="flex justify-between items-baseline mt-2">
                      {/* Quantity stepper */}
                      <div className="flex items-center gap-2 font-sans text-xs text-ink-soft">
                        <button
                          disabled={loading}
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="bg-transparent border border-rule w-6 h-6 flex items-center justify-center text-ink disabled:opacity-40"
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          disabled={loading}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="bg-transparent border border-rule w-6 h-6 flex items-center justify-center text-ink disabled:opacity-40"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-sans text-[13px] text-ink">{item.price}</span>
                    </div>
                    <button
                      disabled={loading}
                      onClick={() => removeItem(item.id)}
                      className="mt-2.5 bg-transparent border-none font-sans text-[10px] tracking-[0.18em] uppercase text-muted p-0 underline disabled:opacity-40"
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
              disabled={loading}
              className={`w-full py-4 bg-ink text-surface border-none font-sans text-[11px] tracking-[0.22em] uppercase transition-opacity ${loading ? 'opacity-70 cursor-wait' : 'cursor-pointer'}`}
            >
              {loading ? 'Updating…' : 'Checkout'}
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
