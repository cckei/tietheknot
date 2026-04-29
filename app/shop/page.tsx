import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Eyebrow, Display, Body } from '@/components/ui';
import { ProductCard } from '@/components/ProductCard';
import { getProducts } from '@/lib/products';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Shop' };

const DENSITIES = ['loose', 'standard', 'dense'] as const;
type Density = (typeof DENSITIES)[number];

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ collection?: string; density?: string; prices?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const products = await getProducts();

  const collections = ['All', ...Array.from(new Set(products.map((p) => p.collection)))];
  const activeCollection = resolvedSearchParams.collection ?? 'All';
  const density = (DENSITIES.includes(resolvedSearchParams.density as Density)
    ? resolvedSearchParams.density
    : 'standard') as Density;
  const showPrices = resolvedSearchParams.prices !== 'off';

  const filtered =
    activeCollection === 'All'
      ? products
      : products.filter((p) => p.collection === activeCollection);

  function filterUrl(collection: string) {
    return `/shop?${new URLSearchParams({ collection, density, prices: showPrices ? 'on' : 'off' })}`;
  }

  function densityUrl(d: Density) {
    return `/shop?${new URLSearchParams({ collection: activeCollection, density: d, prices: showPrices ? 'on' : 'off' })}`;
  }

  return (
    <div className="bg-bg font-sans text-ink">
      <Nav page="shop" />

      {/* Title band */}
      <section className="ttk-section-md border-b border-rule">
        <Eyebrow>
          {activeCollection === 'All'
            ? `${products.length} ${products.length === 1 ? 'piece' : 'pieces'} available`
            : `${filtered.length} ${filtered.length === 1 ? 'piece' : 'pieces'} in ${activeCollection}`}
        </Eyebrow>
        <Display size={72} italic style={{ marginTop: 20, fontSize: 'clamp(36px, 6vw, 72px)' }}>
          The catalogue.
        </Display>
        <Body size={15} className="max-w-[520px] mt-6">
          Browse our current edition. Each piece is one of one — when a garden is claimed, a new
          one takes its place on the shelf.
        </Body>
      </section>

      {/* Filter / sort bar */}
      <div className="ttk-shop-bar border-b border-rule bg-surface">
        <div className="ttk-shop-tabs font-sans text-[11px] tracking-[0.22em] uppercase">
          {collections.map((c) => {
            const active = activeCollection === c;
            return (
              <a
                key={c}
                href={filterUrl(c)}
                className={`cursor-pointer no-underline whitespace-nowrap pb-0.5 font-sans ${active ? 'text-ink border-b border-ink font-medium' : 'text-ink-soft'}`}
              >
                {c}
              </a>
            );
          })}
        </div>

        <div className="flex gap-3 text-[11px] tracking-[0.22em] uppercase shrink-0">
          {DENSITIES.map((d) => (
            <a
              key={d}
              href={densityUrl(d)}
              className={`cursor-pointer font-sans no-underline ${density === d ? 'text-ink underline' : 'text-muted'}`}
            >
              {d}
            </a>
          ))}
        </div>
      </div>

      {/* Product grid */}
      <section className="ttk-section-sm pb-24">
        {filtered.length === 0 ? (
          <Body size={15} className="text-center py-20">
            No pieces in this collection yet — check back soon.
          </Body>
        ) : (
          <div className="ttk-shop-grid" data-density={density}>
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} showPrice={showPrices} density={density} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
