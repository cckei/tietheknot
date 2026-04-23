import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Eyebrow, Display, Body, OutlineBtn } from '@/components/ui';
import { PlaceholderFrame } from '@/components/PlaceholderFrame';
import { T, serif, sans } from '@/lib/tokens';

export default function HomePage() {
  return (
    <div style={{ background: T.bg, fontFamily: sans, color: T.ink, minHeight: '100vh' }}>
      <Nav page="home" />

      {/* ── Hero — editorial split ─────────────────────────────────────── */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: '1.05fr 1fr',
          borderBottom: `1px solid ${T.rule}`,
        }}
      >
        {/* Image panel */}
        <div
          style={{
            background: T.surface,
            padding: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRight: `1px solid ${T.rule}`,
            minHeight: 680,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/product-03.png"
            alt="Cottage in Spring"
            style={{
              maxWidth: '78%',
              maxHeight: 560,
              boxShadow: '0 20px 60px -30px rgba(42,42,38,0.35)',
            }}
          />
        </div>

        {/* Copy panel */}
        <div
          style={{
            padding: '80px 72px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <Eyebrow>Spring Catalogue — Vol. IV</Eyebrow>
            <Display size={82} italic style={{ marginTop: 28, marginBottom: 28 }}>
              Small worlds,
              <br />
              preserved in paper
              <br />& bloom.
            </Display>
            <Body size={16} style={{ maxWidth: 420 }}>
              Each framed garden is composed by hand from dried stems, cotton, moss and hand-cut
              paper — a quiet landscape to live with for years.
            </Body>
            <div style={{ display: 'flex', gap: 16, marginTop: 40 }}>
              <Link href="/shop" style={{ textDecoration: 'none' }}>
                <OutlineBtn invert>Shop the catalogue</OutlineBtn>
              </Link>
              <Link href="/about" style={{ textDecoration: 'none' }}>
                <OutlineBtn>Commission a piece</OutlineBtn>
              </Link>
            </div>
          </div>

          {/* Catalogue index list */}
          <div style={{ marginTop: 72 }}>
            <Eyebrow style={{ marginBottom: 16 }}>In this volume</Eyebrow>
            {[
              ['01', 'Framed Gardens', '18 pieces'],
              ['02', 'Wreaths & Hoops', '9 pieces'],
              ['03', 'Dried Bouquets', '24 pieces'],
              ['04', 'Home Accessories', '12 pieces'],
            ].map(([n, t, c]) => (
              <div
                key={n}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '32px 1fr auto',
                  padding: '14px 0',
                  borderTop: `1px solid ${T.rule}`,
                  alignItems: 'baseline',
                  fontSize: 13,
                }}
              >
                <span style={{ color: T.muted, fontFamily: serif, fontStyle: 'italic' }}>{n}</span>
                <span style={{ fontFamily: serif, fontSize: 20 }}>{t}</span>
                <span style={{ color: T.muted, fontSize: 11, letterSpacing: '0.12em' }}>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured grid ──────────────────────────────────────────────── */}
      <section style={{ padding: '96px 48px', borderBottom: `1px solid ${T.rule}` }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 48,
          }}
        >
          <div>
            <Eyebrow>Currently on the table</Eyebrow>
            <Display size={48} italic as="h2" style={{ marginTop: 16 }}>
              Framed gardens
            </Display>
          </div>
          <Link
            href="/shop"
            style={{
              fontFamily: sans,
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              borderBottom: `1px solid ${T.ink}`,
              paddingBottom: 4,
              color: T.ink,
              textDecoration: 'none',
            }}
          >
            See all 18 pieces →
          </Link>
        </div>

        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}
        >
          {[
            { img: '/assets/product-03.png', title: 'Cottage in Spring', price: 'NT$ 4,800', handle: 'cottage-spring' },
            { img: '/assets/product-02.png', title: 'Seaside Cottage', price: 'NT$ 5,200', handle: 'seaside-cottage' },
            { img: '/assets/product-05.png', title: 'Meadow House No. II', price: 'NT$ 5,400', handle: 'meadow-house' },
            { ph: true, tone: 'ivory', accent: 'mustard', title: 'Autumn Field', price: 'NT$ 4,600', handle: 'autumn-field' },
          ].map((p, i) => (
            <Link
              key={i}
              href={`/products/${p.handle}`}
              style={{ cursor: 'pointer', textDecoration: 'none' }}
            >
              <div
                style={{
                  background: T.surface,
                  aspectRatio: '3/4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 24,
                  border: `1px solid ${T.rule}`,
                  overflow: 'hidden',
                }}
              >
                {p.ph ? (
                  <PlaceholderFrame tone={p.tone} accent={p.accent} caption={p.title} />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.img} alt={p.title} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                )}
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: 18,
                  alignItems: 'baseline',
                }}
              >
                <div style={{ fontFamily: serif, fontSize: 20, fontStyle: 'italic', color: T.ink }}>
                  {p.title}
                </div>
                <div style={{ fontSize: 12, color: T.inkSoft, fontFamily: sans }}>{p.price}</div>
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
                Framed garden · one of one
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Process band ───────────────────────────────────────────────── */}
      <section
        style={{
          padding: '96px 48px',
          background: T.surface,
          borderBottom: `1px solid ${T.rule}`,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: 80,
            alignItems: 'center',
          }}
        >
          <div>
            <Eyebrow>The process</Eyebrow>
            <Display size={56} italic as="h2" style={{ marginTop: 20 }}>
              Four hands,
              <br />
              fourteen days.
            </Display>
            <Body size={15} style={{ maxWidth: 440, marginTop: 28 }}>
              Every piece begins as a sketched landscape. We source and preserve the blooms
              ourselves — hydrangea, cotton, eucalyptus, statice — and compose them layer by layer
              behind glass. A single framed garden takes roughly two weeks from first stem to final
              seal.
            </Body>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              ['i.', 'Sketch', 'A landscape drawn in pencil, to scale.'],
              ['ii.', 'Preserve', 'Blooms dried slowly in silica or air.'],
              ['iii.', 'Compose', 'Assembled behind museum-grade glass.'],
            ].map(([n, t, d]) => (
              <div
                key={n}
                style={{ padding: '24px 0', borderTop: `1px solid ${T.rule}` }}
              >
                <div
                  style={{
                    fontFamily: serif,
                    fontStyle: 'italic',
                    fontSize: 22,
                    color: T.sage,
                    marginBottom: 12,
                  }}
                >
                  {n}
                </div>
                <div style={{ fontFamily: serif, fontSize: 22, marginBottom: 10, color: T.ink }}>
                  {t}
                </div>
                <Body size={13}>{d}</Body>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Journal teaser ─────────────────────────────────────────────── */}
      <section style={{ padding: '96px 48px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 48,
          }}
        >
          <Display size={44} italic as="h2">
            From the journal
          </Display>
          <span
            style={{
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              borderBottom: `1px solid ${T.ink}`,
              paddingBottom: 4,
              fontFamily: sans,
              color: T.ink,
            }}
          >
            Read all entries →
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
          {[
            [
              'On drying hydrangea',
              'April 12, 2026',
              'Four small rules we follow each spring so the petals hold their blush.',
            ],
            [
              'The shadow-box revival',
              'March 28, 2026',
              'A brief history of the Victorian curiosity that inspired our framed gardens.',
            ],
            [
              'Visiting the studio',
              'March 14, 2026',
              'We now host small appointments on Saturday afternoons — here is what to expect.',
            ],
          ].map(([t, d, b]) => (
            <article key={t} style={{ cursor: 'pointer' }}>
              <div
                style={{
                  aspectRatio: '4/3',
                  background: T.taupe,
                  borderBottom: `2px solid ${T.sage}`,
                }}
              />
              <div style={{ padding: '20px 0' }}>
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: T.muted,
                    marginBottom: 10,
                    fontFamily: sans,
                  }}
                >
                  {d}
                </div>
                <div
                  style={{
                    fontFamily: serif,
                    fontSize: 22,
                    fontStyle: 'italic',
                    marginBottom: 10,
                    color: T.ink,
                  }}
                >
                  {t}
                </div>
                <Body size={13}>{b}</Body>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
