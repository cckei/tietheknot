'use client';

import { useState } from 'react';
import { Eyebrow, Display, Body, OutlineBtn } from '@/components/ui';
import { T, serif, sans } from '@/lib/tokens';
import type { Product } from '@/lib/products';

const SIZES = ['Small · 20×25cm', 'Medium · 30×40cm', 'Large · 40×50cm'];

const SPECS = [
  ['Materials', 'Preserved hydrangea, cotton, statice, eucalyptus, hand-cut paper, moss.'],
  ['Dimensions', '30 × 40 × 4.5 cm, oak shadow-box frame, anti-UV glass.'],
  ['Care', 'Keep from direct sunlight and humidity. Dust with a soft brush.'],
  ['Shipping', 'Ships in 5–7 business days. Worldwide, fully insured.'],
] as const;

function parsePrice(price: string): number {
  return parseInt(price.replace(/[^\d]/g, ''), 10) || 0;
}

export default function PdpClient({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const [variant, setVariant] = useState(SIZES[1]);
  const basePrice = parsePrice(product.price);

  return (
    <div style={{ padding: '64px 72px' }}>
      <Eyebrow>{product.collection} · One of One</Eyebrow>

      <Display size={56} italic style={{ marginTop: 20, marginBottom: 12 }}>
        {product.title}
      </Display>

      <div
        style={{
          display: 'flex',
          gap: 16,
          alignItems: 'center',
          fontFamily: serif,
          fontSize: 22,
          color: T.ink,
          marginBottom: 32,
        }}
      >
        <span>{product.price}</span>
        <span
          style={{
            fontSize: 12,
            color: T.muted,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontFamily: sans,
          }}
        >
          — incl. signed certificate
        </span>
      </div>

      <Body size={15} style={{ marginBottom: 32 }}>
        {product.description ??
          'A handmade piece composed from preserved florals, dried stems, and hand-cut paper behind museum-grade glass. Signed on the reverse.'}
      </Body>

      {/* Size selector */}
      <div style={{ marginBottom: 28 }}>
        <Eyebrow style={{ marginBottom: 12 }}>Size</Eyebrow>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {SIZES.map((v) => (
            <button
              key={v}
              onClick={() => setVariant(v)}
              style={{
                padding: '10px 16px',
                fontFamily: sans,
                fontSize: 11,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                background: variant === v ? T.ink : 'transparent',
                color: variant === v ? T.surface : T.ink,
                border: `1px solid ${T.ink}`,
                cursor: 'pointer',
              }}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity + add to bag */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 40 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            border: `1px solid ${T.ink}`,
            fontFamily: sans,
            fontSize: 13,
          }}
        >
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            style={{
              padding: '0 16px',
              height: 46,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 16,
              color: T.ink,
            }}
          >
            −
          </button>
          <span style={{ padding: '0 16px', color: T.ink }}>{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            style={{
              padding: '0 16px',
              height: 46,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 16,
              color: T.ink,
            }}
          >
            +
          </button>
        </div>
        <OutlineBtn
          invert
          style={{ flex: 1, padding: '14px 28px' }}
        >
          Add to bag — NT$ {(basePrice * qty).toLocaleString()}
        </OutlineBtn>
      </div>

      {/* Specs table */}
      <div>
        {SPECS.map(([h, b]) => (
          <div
            key={h}
            style={{
              display: 'grid',
              gridTemplateColumns: '140px 1fr',
              padding: '16px 0',
              borderTop: `1px solid ${T.rule}`,
              fontSize: 13,
              gap: 16,
              alignItems: 'baseline',
            }}
          >
            <span
              style={{
                fontSize: 10,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: T.muted,
                fontFamily: sans,
              }}
            >
              {h}
            </span>
            <span style={{ color: T.inkSoft, lineHeight: 1.6, fontFamily: sans }}>{b}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
