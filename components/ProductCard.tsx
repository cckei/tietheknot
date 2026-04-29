import Link from 'next/link';
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
  const titleSize = density === 'dense' ? 'text-base' : 'text-xl';
  const padding = density === 'dense' ? 'p-4' : 'p-6';
  const gap = density === 'dense' ? 'mt-2.5' : 'mt-4';

  return (
    <Link href={`/products/${product.handle}`} className="no-underline block">
      <div className={`bg-surface aspect-[3/4] flex items-center justify-center border border-rule overflow-hidden ${padding}`}>
        {product.img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.img}
            alt={product.title}
            className="max-w-full max-h-full object-contain"
          />
        ) : product.placeholder ? (
          <PlaceholderFrame
            tone={product.placeholder.tone}
            accent={product.placeholder.accent}
            caption={product.title}
          />
        ) : null}
      </div>

      <div className={`flex justify-between items-baseline ${gap}`}>
        <div>
          <div className={`font-serif italic text-ink ${titleSize}`}>{product.title}</div>
          <div className="text-[10px] tracking-[0.2em] uppercase text-muted mt-1 font-sans">
            {product.collection}
          </div>
        </div>
        {showPrice && (
          <div className="text-xs text-ink-soft font-sans">{product.price}</div>
        )}
      </div>
    </Link>
  );
}
