import { notFound } from 'next/navigation';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Display } from '@/components/ui';
import { PlaceholderFrame } from '@/components/PlaceholderFrame';
import { getProductByHandle, getProducts } from '@/lib/products';
import type { Metadata } from 'next';
import PdpClient from './PdpClient';
import ProductGallery from './ProductGallery';

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) return { title: 'Not found' };
  return { title: product.title };
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const allProducts = await getProducts();
  const product = await getProductByHandle(handle);
  if (!product) notFound();
  const thumbnails = (product.images?.length ? product.images : [product.img]).filter(
    (img): img is string => Boolean(img),
  );
  const relatedProducts = allProducts
    .filter((candidate) => candidate.handle !== product.handle)
    .slice(0, 4);

  return (
    <div className="bg-bg font-sans text-ink">
      <Nav page="shop" />

      {/* Breadcrumb */}
      <div className="px-12 py-5 border-b border-rule text-[11px] tracking-[0.22em] uppercase text-ink-soft bg-surface font-sans">
        <a href="/shop" className="text-ink-soft no-underline">Shop</a>
        {' '}/ {product.collection} / <span className="text-ink">{product.title}</span>
      </div>

      {/* Main split */}
      <section className="ttk-pdp border-b border-rule">
        <div className="ttk-pdp-image bg-surface border-r border-rule">
          {thumbnails.length > 0 ? (
            <ProductGallery title={product.title} images={thumbnails} />
          ) : product.placeholder ? (
            <div className="max-w-[88%] w-full">
              <PlaceholderFrame tone={product.placeholder.tone} accent={product.placeholder.accent} caption={product.title} />
            </div>
          ) : null}
        </div>
        <PdpClient product={product} />
      </section>

      {/* Related products */}
      <section className="ttk-section">
        <Display size={36} italic as="h2" style={{ marginBottom: 40, fontSize: 'clamp(22px, 3vw, 36px)' }}>
          In the same series
        </Display>

        <div className="ttk-related">
          {relatedProducts.map((p) => (
            <a key={p.id} href={`/products/${p.handle}`} className="cursor-pointer no-underline">
              <div className="bg-surface aspect-[3/4] flex items-center justify-center p-5 border border-rule">
                {p.img
                  ? /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={p.img} alt={p.title} className="max-w-full max-h-full" />
                  : <PlaceholderFrame tone="ivory" accent="mustard" caption={p.title} />}
              </div>
              <div className="flex justify-between items-baseline mt-3.5">
                <div className="font-serif text-lg italic text-ink">{p.title}</div>
                <div className="text-xs text-ink-soft font-sans">{p.price}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
