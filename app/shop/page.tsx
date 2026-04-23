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

const COLS: Record<Density, number> = { loose: 2, standard: 3, dense: 4 };
const GAPS: Record<Density, number> = { loose: 48, standard: 32, dense: 20 };

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

  const cols = COLS[density];
  const gap = GAPS[density];

  function filterUrl(collection: string) {
    const params = new URLSearchParams({
      collection,
      density,
      prices: showPrices ? 'on' : 'off',
    });
    return `/shop?${params}`;
  }

  function densityUrl(d: Density) {
    const params = new URLSearchParams({
      collection: activeCollection,
      density: d,
      prices: showPrices ? 'on' : 'off',
    });
    return `/shop?${params}`;
  }

  return (
    <div style={{ background: T.bg, fontFamily: sans, color: T.ink }}>
      <Nav page="shop" />

      {/* Title band */}
      <section
        style={{ padding: '80px 48px 48px', borderBottom: `1px solid ${T.rule}` }}
      >
        <Eyebrow>Shop — 63 pieces available</Eyebrow>
        <Display size={72} italic style={{ marginTop: 20 }}>
          The catalogue.
        </Display>
        <Body size={15} style={{ maxWidth: 520, marginTop: 24 }}>
          Browse our current edition. Each piece is one of one — when a garden is claimed, a new
          one takes its place on the shelf.
        </Body>
      </section>

      {/* Filter / sort bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          padding: '20px 48px',
          borderBottom: `1px solid ${T.rule}`,
          background: T.surface,
          alignItems: 'center',
          gap: 24,
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 28,
            fontSize: 11,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            flexWrap: 'wrap',
          }}
        >
          {COLLECTIONS.map((c, i) => {
            const active = activeCollection === c;
            return (
              <a
                key={c}
                href={filterUrl(c)}
                style={{
                  cursor: 'pointer',
                  color: active ? T.ink : T.inkSoft,
                  borderBottom: active ? `1px solid ${T.ink}` : 'none',
                  paddingBottom: 2,
                  fontWeight: active ? 500 : 400,
                  textDecoration: 'none',
                  fontFamily: sans,
                }}
              >
                {c}
              </a>
            );
          })}
        </div>

        <div
          style={{
            display: 'flex',
            gap: 16,
            fontSize: 11,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: T.inkSoft,
            flexShrink: 0,
          }}
        >
          {DENSITIES.map((d) => (
            <a
              key={d}
              href={densityUrl(d)}
              style={{
                color: density === d ? T.ink : T.inkSoft,
                textDecoration: density === d ? 'underline' : 'none',
                cursor: 'pointer',
                fontFamily: sans,
                fontWeight: density === d ? 500 : 400,
              }}
            >
              {d}
            </a>
          ))}
        </div>
      </div>

      {/* Product grid */}
      <section style={{ padding: '56px 48px 96px' }}>
        {filtered.length === 0 ? (
          <Body size={15} style={{ textAlign: 'center', padding: '80px 0' }}>
            No pieces in this collection yet — check back soon.
          </Body>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gap,
            }}
          >
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                showPrice={showPrices}
                density={density}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 32,
            marginTop: 80,
            fontSize: 11,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            fontFamily: sans,
          }}
        >
          <span style={{ color: T.muted }}>← Prev</span>
          <span
            style={{ borderBottom: `1px solid ${T.ink}`, paddingBottom: 2, color: T.ink }}
          >
            01
          </span>
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
