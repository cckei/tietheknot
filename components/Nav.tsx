'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { useCart } from './CartProvider';
import type { Collection } from '@/lib/products';

export type NavPage = 'home' | 'shop' | 'about' | 'flower-care';

function navLink(active: boolean) {
  return `text-ink no-underline pb-0.5 whitespace-nowrap ${active ? 'border-b border-ink' : ''}`;
}

function asideLink(active: boolean) {
  return `block no-underline py-3 text-[11px] tracking-[0.22em] uppercase font-medium ${active ? 'text-ink' : 'text-ink-soft'}`;
}

function asideSubLink(active: boolean) {
  return `block no-underline pl-4 text-[10px] tracking-[0.22em] uppercase ${active ? 'text-ink font-medium' : 'text-ink-soft'}`;
}

function subLink(active: boolean, dark = false) {
  if (dark) {
    return `block no-underline py-2 text-[10px] tracking-[0.22em] uppercase ${active ? 'text-white font-medium' : 'text-white/60'}`;
  }
  return `no-underline whitespace-nowrap text-[10px] tracking-[0.22em] uppercase ${active ? 'text-ink font-medium' : 'text-ink-soft'}`;
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden
    >
      <path
        d="M2 3.5L5 6.5L8 3.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden>
      <path d="M0 1h18M0 6h18M0 11h18" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function collectionShopUrl(title: string) {
  return `/shop?${new URLSearchParams({ collection: title })}`;
}

function CollectionsMenu({ collections }: { collections: Collection[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCollection = pathname === '/shop' ? searchParams.get('collection') : null;
  const onShop = pathname === '/shop' || pathname.startsWith('/products/');

  return (
    <div className="relative group">
      <Link href="/shop" className={`inline-flex items-center gap-1.5 ${navLink(onShop)}`}>
        Collections
        <ChevronDown className="shrink-0 transition-transform duration-150 group-hover:rotate-180" />
      </Link>
      <div
        className="absolute left-0 top-full z-10 bg-black px-4 py-3 flex flex-col gap-2 min-w-[200px] opacity-0 invisible pointer-events-none transition-opacity duration-150 group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:visible group-focus-within:pointer-events-auto"
        role="menu"
      >
        <Link href="/shop" role="menuitem" className={subLink(onShop && !activeCollection, true)}>
          All
        </Link>
        {collections.map(({ title }) => (
          <Link
            key={title}
            href={collectionShopUrl(title)}
            role="menuitem"
            className={subLink(activeCollection === title, true)}
          >
            {title}
          </Link>
        ))}
      </div>
    </div>
  );
}

function MobileAside({
  open,
  onClose,
  page,
  collections,
  totalQuantity,
  openCart,
}: {
  open: boolean;
  onClose: () => void;
  page: NavPage;
  collections: Collection[];
  totalQuantity: number;
  openCart: () => void;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCollection = pathname === '/shop' ? searchParams.get('collection') : null;
  const onShop = pathname === '/shop' || pathname.startsWith('/products/');
  const [collectionsOpen, setCollectionsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  if (!open) return null;

  return (
    <div className="ttk-nav-aside-root" role="dialog" aria-modal="true" aria-label="Menu">
      <button
        type="button"
        className="ttk-nav-aside-backdrop"
        onClick={onClose}
        aria-label="Close menu"
      />
      <aside className="ttk-nav-aside">
        <div className="flex items-center justify-between mb-10">
          <span className="font-serif italic text-[22px] text-ink">Menu</span>
          <button
            type="button"
            onClick={onClose}
            className="bg-transparent border-none text-ink p-1"
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="flex flex-col">
          <Link href="/" className={asideLink(page === 'home')} onClick={onClose}>
            Home
          </Link>
          {collections.length > 0 && (
            <div>
              <div className="flex items-center justify-between gap-3">
                <Link
                  href="/shop"
                  className={asideLink(onShop)}
                  onClick={onClose}
                >
                  Collections
                </Link>
                <button
                  type="button"
                  onClick={() => setCollectionsOpen((v) => !v)}
                  className="bg-transparent border-none text-ink p-1 shrink-0"
                  aria-expanded={collectionsOpen}
                  aria-label="Toggle collections"
                >
                  <ChevronDown
                    className={`transition-transform duration-150 ${collectionsOpen ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>
              {collectionsOpen && (
                // add border left
                <div className="flex flex-col gap-4 mt-2 mb-4 border-l border-rule"> 
                  <Link
                    href="/shop"
                    className={asideSubLink(onShop && !activeCollection)}
                    onClick={onClose}
                  >
                    All
                  </Link>
                  {collections.map(({ title }) => (
                    <Link
                      key={title}
                      href={collectionShopUrl(title)}
                      className={asideSubLink(activeCollection === title)}
                      onClick={onClose}
                    >
                      {title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          <Link href="/about" className={asideLink(page === 'about')} onClick={onClose}>
            About
          </Link>
          <Link href="/flower-care" className={asideLink(page === 'flower-care')} onClick={onClose}>
            Flower Care
          </Link>

          <button
            type="button"
            onClick={() => {
              onClose();
              openCart();
            }}
            className={`${asideLink(false)} bg-transparent border-none font-sans text-left w-full`}
          >
            Bag ({totalQuantity})
          </button>
        </nav>
      </aside>
    </div>
  );
}

function MobileAsideWithSearch({
  open,
  onClose,
  page,
  collections,
  totalQuantity,
  openCart,
}: {
  open: boolean;
  onClose: () => void;
  page: NavPage;
  collections: Collection[];
  totalQuantity: number;
  openCart: () => void;
}) {
  return (
    <Suspense fallback={null}>
      <MobileAside
        open={open}
        onClose={onClose}
        page={page}
        collections={collections}
        totalQuantity={totalQuantity}
        openCart={openCart}
      />
    </Suspense>
  );
}

export function Nav({
  page = 'home',
  collections = [],
}: {
  page?: NavPage;
  collections?: Collection[];
}) {
  const { totalQuantity, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-rule bg-bg relative z-[5]">
      <div className="ttk-nav font-sans text-[11px] tracking-[0.22em] uppercase font-medium">
        <nav className="ttk-nav-left">
          <Link href="/" className={navLink(page === 'home')}>
            Home
          </Link>
          {collections.length > 0 && (
            <Suspense
              fallback={
                <Link href="/shop" className={`inline-flex items-center gap-1.5 ${navLink(false)}`}>
                  Collections
                  <ChevronDown className="shrink-0" />
                </Link>
              }
            >
              <CollectionsMenu collections={collections} />
            </Suspense>
          )}
        </nav>

        <button
          type="button"
          className="ttk-nav-menu-btn bg-transparent border-none text-ink p-1"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <MenuIcon />
        </button>

        <Link href="/" className="text-center no-underline ttk-nav-logo">
          <img src="/assets/logo-h.png" alt="Tie the Knot" className="lg:h-[56px] md:h-[48px] h-[36px] w-auto" />
        </Link>

        <nav className="ttk-nav-right text-ink">
          <Link href="/about" className={navLink(page === 'about')}>About</Link>
          <Link href="/flower-care" className={navLink(page === 'flower-care')}>Flower Care</Link>
          <button
            onClick={openCart}
            className="bg-transparent border-none font-sans text-[11px] tracking-[0.22em] uppercase text-ink font-medium p-0"
          >
            Bag <span className="text-muted">({totalQuantity})</span>
          </button>
        </nav>

        <button
          type="button"
          onClick={openCart}
          className="ttk-nav-mobile-bag bg-transparent border-none font-sans text-[11px] tracking-[0.22em] uppercase text-ink font-medium p-0"
          aria-label="Open bag"
        >
          Bag ({totalQuantity})
        </button>
      </div>

      <MobileAsideWithSearch
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        page={page}
        collections={collections}
        totalQuantity={totalQuantity}
        openCart={openCart}
      />
    </header>
  );
}
