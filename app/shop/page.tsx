import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Eyebrow, Display, Body } from '@/components/ui';
import { ProductCard } from '@/components/ProductCard';
import { PRODUCTS } from '@/lib/products';
import { T, sans } from '@/lib/tokens';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Shop' };

const COLLECTIONS = ['All', 'Framed Gardens', 'Wreaths', 'Dried Bouquets', 'Home Accessories', 'Custom'];
const DENSITIES = ['loose', 'standard', 'dense'] as const;
type Density = (typeof DENSITIES)[number];

export default function ShopPage({
  searchParams,
}: {
  searchParams: { collection?: string; density?: string; prices?: string };
}) {
  const activeCollection = searchParams.collection ?? 'All';
  const density = (DENSITIES.includes(searchParams.density as Density)
    ? searchParams.density
    : 'standard') as Density;
  const showPrices = searchParams.prices !== 'off';

  const filtered =
    activeCollection === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.collection === activeCollection);

  function filterUrl(collection: string) {
    return `/shop?${new URLSearchParams({ collection, density, prices: showPrices ? 'on' : 'off' })}`;
  }

  function densityUrl(d: Density) {
    return `/shop?${new URLSearchParams({ collection: activeCollection, density: d, prices: showPrices ? 'on' : 'off' })}`;
  }

  return (
    <div style={{ background: T.bg, fontFamily: sans, color: T.ink }}>
      <Nav page="shop" />

      {/* Title band */}
      <section className="ttk-section-md" style={{ borderBottom: `1px solid ${T.rule}` }}>
        <Eyebrow>Shop — 63 pieces available</Eyebrow>
        <Display size={72} italic style={{ marginTop: 20, fontSize: 'clamp(36px, 6vw, 72px)' }}>
          The catalogue.
        </Display>
        <Body size={15} style={{ maxWidth: 520, marginTop: 24 }}>
          Browse our current edition. Each piece is one of one — when a garden is claimed, a new
          one takes its place on the shelf.
        </Body>
      </section>

      {/* Filter / sort bar */}
      <div className="ttk-shop-bar" style={{ borderBottom: `1px solid ${T.rule}`, background: T.surface }}>
        <div className="ttk-shop-tabs" style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
          {COLLECTIONS.map((c) => {
            const active = activeCollection === c;
            return (
              <a
                key={c}
                href={filterUrl(c)}
                style={{
                  cursor: 'pointer', color: active ? T.ink : T.inkSoft,
                  borderBottom: active ? `1px solid ${T.ink}` : 'none',
                  paddingBottom: 2, fontWeight: active ? 500 : 400,
                  textDecoration: 'none', fontFamily: sans, whiteSpace: 'nowrap',
                }}
              >
                {c}
              </a>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: 12, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', flexShrink: 0 }}>
          {DENSITIES.map((d) => (
            <a
              key={d}
              href={densityUrl(d)}
              style={{
                color: density === d ? T.ink : T.muted,
                textDecoration: density === d ? 'underline' : 'none',
                cursor: 'pointer', fontFamily: sans,
              }}
            >
              {d}
            </a>
          ))}
        </div>
      </div>

      {/* Product grid */}
      <section className="ttk-section-sm" style={{ paddingBottom: 96 }}>
        {filtered.length === 0 ? (
          <Body size={15} style={{ textAlign: 'center', padding: '80px 0' }}>
            No pieces in this collection yet — check back soon.
          </Body>
        ) : (
          <div className="ttk-shop-grid" data-density={density}>
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} showPrice={showPrices} density={density} />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 80, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', fontFamily: sans, flexWrap: 'wrap' }}>
          <span style={{ color: T.muted }}>← Prev</span>
          <span style={{ borderBottom: `1px solid ${T.ink}`, paddingBottom: 2, color: T.ink }}>01</span>
          <span style={{ color: T.inkSoft, cursor: 'pointer' }}>02</span>
          <span style={{ color: T.inkSoft, cursor: 'pointer' }}>03</span>
          <span style={{ color: T.muted }}>— 06</span>
          <span style={{ cursor: 'pointer', color: T.ink }}>Next →</span>
        </div>
      </section>

      <Footer />
    </div>
  );
}
