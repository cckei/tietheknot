import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Eyebrow, Display, Body, OutlineBtn } from '@/components/ui';
import { PlaceholderFrame } from '@/components/PlaceholderFrame';
import { getFeaturedProducts } from '@/lib/products';

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();
  return (
    <div className="bg-bg font-sans text-ink min-h-screen">
      <Nav page="home" />

      {/* ── Hero — editorial split (hidden) ──────────────────────────── */}
      <section className="hidden ttk-hero border-b border-rule">
        <div className="ttk-hero-image bg-surface border-r border-rule">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/product-03.png"
            alt="Cottage in Spring"
            className="max-w-[78%] max-h-[560px]"
            style={{ boxShadow: '0 20px 60px -30px rgba(42,42,38,0.35)' }}
          />
        </div>
        <div className="ttk-hero-copy">
          <div>
            <Eyebrow>Spring Catalogue — Vol. IV</Eyebrow>
            <Display size={82} italic style={{ marginTop: 28, marginBottom: 28, fontSize: 'clamp(38px, 6vw, 82px)' }}>
              Small worlds,<br />preserved in paper<br />&amp; bloom.
            </Display>
            <Body size={16} className="max-w-[420px]">
              Each framed garden is composed by hand from dried stems, cotton, moss and hand-cut
              paper — a quiet landscape to live with for years.
            </Body>
            <div className="flex gap-4 mt-10 flex-wrap">
              <Link href="/shop" className="no-underline"><OutlineBtn invert>Shop the catalogue</OutlineBtn></Link>
              <Link href="/about" className="no-underline"><OutlineBtn>Commission a piece</OutlineBtn></Link>
            </div>
          </div>
          <div className="mt-[72px]">
            <Eyebrow className="mb-4">In this volume</Eyebrow>
            {[
              ['01', 'Framed Gardens', '18 pieces'],
              ['02', 'Wreaths & Hoops', '9 pieces'],
              ['03', 'Dried Bouquets', '24 pieces'],
              ['04', 'Home Accessories', '12 pieces'],
            ].map(([n, t, c]) => (
              <div key={n} className="grid items-baseline py-3.5 border-t border-rule text-[13px]" style={{ gridTemplateColumns: '32px 1fr auto' }}>
                <span className="text-muted font-serif italic">{n}</span>
                <span className="font-serif text-xl">{t}</span>
                <span className="text-muted text-[11px] tracking-[0.12em]">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand story hero ─────────────────────────────────────────── */}
      <section className="ttk-brand-hero border-b border-rule">
        <div className="ttk-brand-hero-image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/hero.jpg" alt="tietheknot studio — preserved botanicals" />
        </div>
        <div className="ttk-brand-hero-copy">
          <div className="max-w-[560px]">
            <Eyebrow>Est. 2018 — Hong Kong &amp; the UK</Eyebrow>
            <Display
              size={52}
              italic
              style={{ marginTop: 24, marginBottom: 32, fontSize: 'clamp(30px, 3.8vw, 52px)', lineHeight: 1.08 }}
            >
              Designed to be<br />lived with,<br />not just looked at.
            </Display>
            <div className="w-9 h-px bg-rule mb-8" />
            <div className="flex flex-col gap-[22px]">
              {[
                'We started tietheknot.florist in 2018 with a genuine appreciation for plants in all their forms — not just flowers at their peak, but dried stems, pressed leaves, and the quiet textures nature leaves behind.',
                "Dried flowers don't demand attention. They settle into a room, hold their shape, and stay. That understated quality is exactly what draws us to them — and to the slow, layered process of making with them.",
                'Each piece combines natural dried flowers, preserved botanicals and pressed elements, worked together until even the smallest detail feels right. The result is handmade work with a natural, art-led character — designed to be lived with, not just looked at.',
                'Originally a small studio in Hong Kong, we now work from the UK and ship to both. Our collection includes dried floral objects, home décor, bridal pieces, and botanical flower landscapes — framed artworks made entirely from real flowers.',
              ].map((text, i) => (
                <Body key={i} size={14} style={{ lineHeight: 1.78 }}>{text}</Body>
              ))}
            </div>
            <div className="flex gap-4 mt-11 flex-wrap">
              <Link href="/shop" className="no-underline"><OutlineBtn invert>Shop the collection</OutlineBtn></Link>
              <Link href="/about" className="no-underline"><OutlineBtn>Our story</OutlineBtn></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured grid ────────────────────────────────────────────── */}
      <section className="ttk-section border-b border-rule">
        <div className="flex justify-between items-end mb-12 flex-wrap gap-4">
          <div>
            <Eyebrow>Currently on the table</Eyebrow>
            <Display size={48} italic as="h2" style={{ marginTop: 16, fontSize: 'clamp(28px, 4vw, 48px)' }}>
              Framed gardens
            </Display>
          </div>
          <Link
            href="/shop"
            className="font-sans text-[11px] tracking-[0.22em] uppercase border-b border-ink pb-1 text-ink no-underline whitespace-nowrap"
          >
            See all pieces →
          </Link>
        </div>

        <div className="ttk-grid-4">
          {featuredProducts.map((p) => (
            <Link key={p.id} href={`/products/${p.handle}`} className="no-underline">
              <div className="bg-surface aspect-[3/4] flex items-center justify-center p-6 border border-rule overflow-hidden">
                {p.img
                  ? /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={p.img} alt={p.title} className="max-w-full max-h-full" />
                  : <PlaceholderFrame tone="ivory" accent="mustard" caption={p.title} />}
              </div>
              <div className="flex justify-between mt-[18px] items-baseline">
                <div className="font-serif text-xl italic text-ink">{p.title}</div>
                <div className="text-xs text-ink-soft font-sans">{p.price}</div>
              </div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-muted mt-1 font-sans">{p.collection}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Process band ─────────────────────────────────────────────── */}
      <section className="ttk-section bg-surface border-b border-rule">
        <div className="ttk-grid-process">
          <div>
            <Eyebrow>The process</Eyebrow>
            <Display size={56} italic as="h2" style={{ marginTop: 20, fontSize: 'clamp(28px, 4vw, 56px)' }}>
              Four hands,<br />fourteen days.
            </Display>
            <Body size={15} className="max-w-[440px] mt-7">
              Every piece begins as a sketched landscape. We source and preserve the blooms
              ourselves — hydrangea, cotton, eucalyptus, statice — and compose them layer by layer
              behind glass. A single framed garden takes roughly two weeks from first stem to final seal.
            </Body>
          </div>

          <div className="ttk-grid-process-steps">
            {[
              ['i.', 'Sketch', 'A landscape drawn in pencil, to scale.'],
              ['ii.', 'Preserve', 'Blooms dried slowly in silica or air.'],
              ['iii.', 'Compose', 'Assembled behind museum-grade glass.'],
            ].map(([n, t, d]) => (
              <div key={n} className="py-6 border-t border-rule">
                <div className="font-serif italic text-[22px] text-sage mb-3">{n}</div>
                <div className="font-serif text-[22px] mb-2.5 text-ink">{t}</div>
                <Body size={13}>{d}</Body>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Journal teaser ───────────────────────────────────────────── */}
      <section className="ttk-section hidden">
        <div className="flex justify-between items-baseline mb-12 flex-wrap gap-4">
          <Display size={44} italic as="h2" style={{ fontSize: 'clamp(26px, 3.5vw, 44px)' }}>
            From the journal
          </Display>
          <span className="text-[11px] tracking-[0.22em] uppercase cursor-pointer border-b border-ink pb-1 font-sans text-ink whitespace-nowrap">
            Read all entries →
          </span>
        </div>

        <div className="ttk-grid-3">
          {[
            ['On drying hydrangea', 'April 12, 2026', 'Four small rules we follow each spring so the petals hold their blush.'],
            ['The shadow-box revival', 'March 28, 2026', 'A brief history of the Victorian curiosity that inspired our framed gardens.'],
            ['Visiting the studio', 'March 14, 2026', 'We now host small appointments on Saturday afternoons — here is what to expect.'],
          ].map(([t, d, b]) => (
            <article key={t} className="cursor-pointer">
              <div className="aspect-[4/3] bg-taupe border-b-2 border-sage" />
              <div className="py-5">
                <div className="text-[10px] tracking-[0.2em] uppercase text-muted mb-2.5 font-sans">{d}</div>
                <div className="font-serif text-[22px] italic mb-2.5 text-ink">{t}</div>
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
