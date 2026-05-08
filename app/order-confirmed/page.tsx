'use client';

import { useEffect } from 'react';
import Link from 'next/link';

const CART_ID_KEY = 'ttk-cart-id';
const CHECKOUT_PENDING_KEY = 'ttk-checkout-pending';

export default function OrderConfirmedPage() {
  useEffect(() => {
    // Clear cart — user has successfully checked out
    window.localStorage.removeItem(CART_ID_KEY);
    window.localStorage.removeItem(CHECKOUT_PENDING_KEY);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="font-sans text-[11px] tracking-[0.22em] uppercase text-ink-soft mb-6">
        Order Confirmed
      </p>
      <h1 className="font-serif italic text-[clamp(32px,5vw,64px)] text-ink leading-[1.1] mb-6">
        Thank you for your order.
      </h1>
      <p className="font-sans text-sm text-ink-soft max-w-md mb-10">
        You'll receive a confirmation email shortly. We'll be in touch when your arrangement is ready.
      </p>
      <Link
        href="/"
        className="font-sans text-[11px] tracking-[0.22em] uppercase text-ink border-b border-ink pb-0.5"
      >
        Back to home
      </Link>
    </main>
  );
}
