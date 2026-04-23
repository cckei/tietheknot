import Link from 'next/link';
import { T, serif, sans } from '@/lib/tokens';
import { PlaceholderFrame } from './PlaceholderFrame';
import type { Product } from '@/lib/products';

export function ProductCard({
  product,
  showPrice = true,
  density = 'standard',
}: {
  product: Product;
  showPrice?: boolean;
  density?: 'loose' | 'standard' | 'dense';
}) {
  const titleSize = density === 'dense' ? 16 : 20;
  const padding = density === 'dense' ? 16 : 24;
  const gap = density === 'dense' ? 10 : 16;

  return (
    <Link href={`/products/${product.handle}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div
        style={{
          background: T.surface,
          aspectRatio: '3/4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding,
          border: `1px solid ${T.rule}`,
          overflow: 'hidden',
        }}
      >
        {product.img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.img}
            alt={product.title}
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
          />
        ) : product.placeholder ? (
          <PlaceholderFrame
            tone={product.placeholder.tone}
            accent={product.placeholder.accent}
            caption={product.title}
          />
        ) : null}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: gap,
          alignItems: 'baseline',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: serif,
              fontSize: titleSize,
              fontStyle: 'italic',
              color: T.ink,
            }}
          >
            {product.title}
          </div>
          <div
            style={{
              fontSize: 10,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: T.muted,
              marginTop: 4,
              fontFamily: sans,
            }}
          >
            {product.collection}
          </div>
        </div>

        {showPrice && (
          <div style={{ fontSize: 12, color: T.inkSoft, fontFamily: sans }}>{product.price}</div>
        )}
      </div>
    </Link>
  );
}
