'use client';

import { useState } from 'react';
import { Eyebrow, Display, Body, OutlineBtn } from '@/components/ui';
import type { Product } from '@/lib/products';
import { useCart } from '@/components/CartProvider';

function formatAmount(amount: number, currencyCode: string): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function PdpClient({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const productVariants =
    product.variants?.length
      ? product.variants
      : [{ id: `${product.id}-default`, title: 'Default', availableForSale: true, price: product.price, rawPrice: product.rawPrice, currencyCode: product.currencyCode }];
  const [variantId, setVariantId] = useState(productVariants[0].id);
  const selectedVariant = productVariants.find((v) => v.id === variantId) ?? productVariants[0];

  return (
    <div className="ttk-pdp-info">
      <Eyebrow>{product.collection}</Eyebrow>

      <Display size={56} italic style={{ marginTop: 20, marginBottom: 12, fontSize: 'clamp(28px, 4vw, 56px)' }}>
        {product.title}
      </Display>

      <div className="font-serif text-[22px] text-ink mb-8 flex gap-4 items-center flex-wrap">
        <span>{selectedVariant.price}</span>
      </div>

      <Body size={15} className="mb-8">
        {product.description || 'No description available.'}
      </Body>

      {/* Variant selector */}
      <div className="mb-7">
        <Eyebrow className="mb-3">Options</Eyebrow>
        <div className="flex gap-2.5 flex-wrap">
          {productVariants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => setVariantId(variant.id)}
              className={`px-4 py-2.5 font-sans text-[11px] tracking-[0.18em] uppercase border border-ink cursor-pointer transition-opacity ${selectedVariant.id === variant.id ? 'bg-ink text-surface' : 'bg-transparent text-ink'} ${!variant.availableForSale ? 'opacity-50' : ''}`}
            >
              {variant.title}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity + add to bag */}
      <div className="flex gap-3 mb-10 flex-wrap">
        <div className="flex items-center border border-ink font-sans text-[13px]">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-4 h-[46px] bg-transparent border-none text-ink text-base"
          >
            −
          </button>
          <span className="px-4 text-ink">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="px-4 h-[46px] bg-transparent border-none text-ink text-base"
          >
            +
          </button>
        </div>
        <OutlineBtn
          invert
          style={{ flex: 1, minWidth: 180 }}
          onClick={() =>
            addItem({
              productId: product.id,
              title: product.title,
              variantId: selectedVariant.id,
              variantTitle: selectedVariant.title,
              price: selectedVariant.price,
              rawPrice: selectedVariant.rawPrice,
              currencyCode: selectedVariant.currencyCode,
              quantity: qty,
              image: product.img,
              handle: product.handle,
            })
          }
        >
          Add to bag — {formatAmount(selectedVariant.rawPrice * qty, selectedVariant.currencyCode)}
        </OutlineBtn>
      </div>
    </div>
  );
}
