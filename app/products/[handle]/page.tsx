import { notFound } from 'next/navigation';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Display } from '@/components/ui';
import { PlaceholderFrame } from '@/components/PlaceholderFrame';
import { PRODUCTS, getProductByHandle } from '@/lib/products';
import { T, serif, sans } from '@/lib/tokens';
import type { Metadata } from 'next';
import PdpClient from './PdpClient';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: { params: { handle: string } }): Promise<Metadata> {
  const product = getProductByHandle(params.handle);
  if (!product) return { title: 'Not found' };
  return { title: product.title };
}

const RELATED = [
  { img: '/assets/product-02.png', title: 'Seaside Cottage', price: 'NT$ 5,200', handle: 'seaside-cottage' },
  { img: '/assets/product-05.png', title: 'Meadow House No. II', price: 'NT$ 5,400', handle: 'meadow-house' },
  { ph: true, tone: 'ivory', accent: 'mustard', title: 'Autumn Field', price: 'NT$ 4,600', handle: 'autumn-field' },
  { ph: true, tone: 'sage', accent: 'fern', title: 'Fern Hollow', price: 'NT$ 5,000', handle: 'fern-hollow' },
];

const THUMBNAILS = [
  '/assets/product-03.png',
  '/assets/product-02.png',
  '/assets/product-05.png',
  '/assets/product-04.png',
];

export default function ProductPage({ params }: { params: { handle: string } }) {
  const product = getProductByHandle(params.handle);
  if (!product) notFound();

  return (
    <div style={{ background: T.bg, fontFamily: sans, color: T.ink }}>
      <Nav page="shop" />

      {/* Breadcrumb */}
      <div style={{ padding: '20px 48px', borderBottom: `1px solid ${T.rule}`, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: T.inkSoft, background: T.surface, fontFamily: sans }}>
        <a href="/shop" style={{ color: T.inkSoft, textDecoration: 'none' }}>Shop</a>
        {' '}/ {product.collection} / <span style={{ color: T.ink }}>{product.title}</span>
      </div>

      {/* Main split */}
      <section className="ttk-pdp" style={{ borderBottom: `1px solid ${T.rule}` }}>
        {/* Image gallery */}
        <div className="ttk-pdp-image" style={{ background: T.surface, borderRight: `1px solid ${T.rule}` }}>
          {product.img ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.img} alt={product.title} style={{ maxWidth: '88%', maxHeight: 560, boxShadow: '0 30px 80px -40px rgba(42,42,38,0.35)' }} />
          ) : product.placeholder ? (
            <div style={{ maxWidth: '88%', width: '100%' }}>
              <PlaceholderFrame tone={product.placeholder.tone} accent={product.placeholder.accent} caption={product.title} />
            </div>
          ) : null}

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            {THUMBNAILS.map((src, i) => (
              <div key={i} style={{ width: 72, height: 90, background: T.paper, border: `1px solid ${i === 0 ? T.ink : T.rule}`, padding: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" style={{ maxWidth: '100%', maxHeight: '100%' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Info — client component for interactive state */}
        <PdpClient product={product} />
      </section>

      {/* Story band */}
      <section className="ttk-section" style={{ background: T.surface, borderBottom: `1px solid ${T.rule}` }}>
        <div className="ttk-story">
          <div>
            <Display size={40} italic as="h2" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)' }}>
              Begun as a sketch<br />of my grandmother&apos;s<br />house.
            </Display>
          </div>
          <p style={{ fontFamily: sans, fontSize: 15, lineHeight: 1.6, color: T.inkSoft, margin: 0 }}>
            This piece took fourteen days to compose. The cottage is cut from a single sheet of
            cotton paper; the meadow is built up from preserved statice, dried chamomile and
            Japanese moss layered in three passes to give the field its depth. It is one of a series
            of six cottages, each a different season. A hand-written note of provenance is enclosed.
          </p>
        </div>
      </section>

      {/* Related products */}
      <section className="ttk-section">
        <Display size={36} italic as="h2" style={{ marginBottom: 40, fontSize: 'clamp(22px, 3vw, 36px)' }}>
          In the same series
        </Display>

        <div className="ttk-related">
          {RELATED.map((p, i) => (
            <a key={i} href={`/products/${p.handle}`} style={{ cursor: 'pointer', textDecoration: 'none' }}>
              <div style={{ background: T.surface, aspectRatio: '3/4', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, border: `1px solid ${T.rule}` }}>
                {p.ph
                  ? <PlaceholderFrame tone={p.tone} accent={p.accent} caption={p.title} />
                  : <img src={p.img} alt={p.title} style={{ maxWidth: '100%', maxHeight: '100%' }} />} {/* eslint-disable-line @next/next/no-img-element */}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 14 }}>
                <div style={{ fontFamily: serif, fontSize: 18, fontStyle: 'italic', color: T.ink }}>{p.title}</div>
                <div style={{ fontSize: 12, color: T.inkSoft, fontFamily: sans }}>{p.price}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
