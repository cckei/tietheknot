import { NavShell } from '@/components/NavShell';
import { Footer } from '@/components/Footer';
import { Eyebrow, Display, Body } from '@/components/ui';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'About' };

export default function AboutPage() {
  return (
    <div className="bg-bg font-sans text-ink">
      <NavShell page="about" />

      {/* Hero */}
      <section className="ttk-section text-center border-b border-rule pt-[120px]">
        <Eyebrow>Our story</Eyebrow>
        <Display
          size={92}
          italic
          style={{ marginTop: 32, maxWidth: 900, margin: '32px auto 0', fontSize: 'clamp(36px, 7vw, 92px)' }}
        >
          Flowers, preserved in their own time
        </Display>
        <Body size={17} style={{ maxWidth: 560, margin: '32px auto 0' }}>
          tietheknot.florist began in a sunlit studio in Hong Kong in 2018, with the simple idea that a
          bouquet need not end after a single week.
        </Body>
      </section>

      {/* Founder section */}
      <section className="ttk-section border-b border-rule">
        <div className="ttk-about-founder">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/product-04.png"
              alt="Cotton & Fern Wreath"
              className="w-full"
              style={{ boxShadow: '0 20px 60px -30px rgba(42,42,38,0.35)' }}
            />
          </div>

          <div className="pt-5">
            <Eyebrow>Founder&apos;s note</Eyebrow>
            <Display size={40} italic as="h2" style={{ marginTop: 16, marginBottom: 28, fontSize: 'clamp(24px, 3.5vw, 40px)' }}>
              On slow flowers.
            </Display>
            <div className="mb-5">
              <Body size={15} className="mb-4">We started tietheknot.florist in 2018 with a genuine appreciation for plants in all their forms — not just flowers at their peak, but dried stems, pressed leaves, and the quiet textures nature leaves behind.</Body>
              <Body size={15} className="mb-4">Dried flowers don't demand attention. They settle into a room, hold their shape, and stay. That understated quality is exactly what draws us to them — and to the slow, layered process of making with them.</Body>
              <Body size={15} className="mb-4">Each piece combines natural dried flowers, preserved botanicals and pressed elements, worked together until even the smallest detail feels right. The result is handmade work with a natural, art-led character — designed to be lived with, not just looked at.</Body>
              <Body size={15} className="mb-4">Originally a small studio in Hong Kong, we now work from the UK and ship to both. Our collection includes dried floral objects, home décor, bridal pieces, and botanical flower landscapes — framed artworks made entirely from real flowers.</Body>
            </div>
            <div className="mt-10 font-serif italic text-[22px] text-ink">
              — Pat, founder
            </div>
          </div>
        </div>
      </section>

      {/* Studio info grid */}
      <section className="ttk-section">
        <div className="ttk-about-info">
          {[
            ['Hong Kong', "Chai Wan"],
            ['United Kingdom', 'Woking, Surrey, England'],
          ].map(([title, body]) => (
            <div key={title} className="border-t border-rule pt-6">
              <Display size={28} italic as="h3" className="mb-4">{title}</Display>
              <Body size={14} style={{ whiteSpace: 'pre-line' }}>{body}</Body>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
