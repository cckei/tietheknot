'use client';

import Link from 'next/link';
import { useCart } from './CartProvider';

type NavPage = 'home' | 'shop' | 'about';

const LEFT_LINKS = [
  { label: 'Shop', href: '/shop', key: 'shop' },
  { label: 'Collections', href: '/shop', key: 'collections' },
  { label: 'Custom', href: '/about', key: 'custom' },
  { label: 'Journal', href: '/', key: 'journal' },
];

const MOBILE_LINKS = [
  { label: 'Shop', href: '/shop' },
  { label: 'About', href: '/about' },
  { label: 'Custom', href: '/about' },
];

function navLink(active: boolean) {
  return `text-ink no-underline pb-0.5 whitespace-nowrap ${active ? 'border-b border-ink' : ''}`;
}

export function Nav({ page = 'home' }: { page?: NavPage }) {
  const { totalQuantity, openCart } = useCart();

  return (
    <header className="border-b border-rule bg-bg relative z-[5]">
      <div className="ttk-nav font-sans text-[11px] tracking-[0.22em] uppercase font-medium">
        {/* Left nav — hidden on mobile */}
        <nav className="ttk-nav-left">
          {LEFT_LINKS.map(({ label, href, key }) => (
            <Link key={label} href={href} className={navLink(page === key)}>
              {label}
            </Link>
          ))}
        </nav>

        {/* Logo — always visible */}
        <Link href="/" className="text-center no-underline">
          <div className="font-serif italic text-[26px] text-ink leading-none">
            tietheknot
          </div>
          <div className="font-sans text-[9px] tracking-[0.42em] text-ink-soft mt-1">
            F L O R I S T
          </div>
        </Link>

        {/* Right nav — hidden on mobile */}
        <nav className="ttk-nav-right text-ink">
          <Link href="/about" className={navLink(page === 'about')}>About</Link>
          <span className="cursor-pointer">Search</span>
          <span className="cursor-pointer">Account</span>
          <button
            onClick={openCart}
            className="bg-transparent border-none font-sans text-[11px] tracking-[0.22em] uppercase text-ink font-medium p-0"
          >
            Bag <span className="text-muted">({totalQuantity})</span>
          </button>
        </nav>
      </div>

      {/* Mobile nav strip */}
      <nav className="ttk-nav-mobile font-sans text-[11px] tracking-[0.22em] uppercase font-medium border-t border-rule">
        {MOBILE_LINKS.map(({ label, href }) => (
          <Link key={label} href={href} className="text-ink no-underline whitespace-nowrap">
            {label}
          </Link>
        ))}
        <button
          onClick={openCart}
          className="bg-transparent border-none font-sans text-[11px] tracking-[0.22em] uppercase text-ink font-medium p-0 whitespace-nowrap"
        >
          Bag ({totalQuantity})
        </button>
      </nav>
    </header>
  );
}
