import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Eyebrow, Display, Body } from '@/components/ui';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'About' };

export default function AboutPage() {
  return (
    <div className="bg-bg font-sans text-ink">
      <Nav page="about" />

      {/* Hero */}
      <section className="ttk-section text-center border-b border-rule pt-[120px]">
        <Eyebrow>Our story</Eyebrow>
        <Display
          size={92}
          italic
          style={{ marginTop: 32, maxWidth: 900, margin: '32px auto 0', fontSize: 'clamp(36px, 7vw, 92px)' }}
        >
          A quiet boutique<br />of everlasting blooms.
        </Display>
        <Body size={17} style={{ maxWidth: 560, margin: '32px auto 0' }}>
          tietheknot.florist began in a sunlit studio in Taipei in 2024, with the simple idea that a
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
            <Body size={15} className="mb-5">
              I grew up in my grandmother&apos;s flower shop in Tainan, where bouquets arrived by
              bicycle and always, at some point, had to be thrown away. That felt wrong to me — the
              labor, the color, the small worlds we made by arranging them — all gone in a week.
            </Body>
            <Body size={15} className="mb-5">
              tietheknot is my answer. We dry and preserve our own stems, compose them behind
              museum-grade glass, and sign each piece on the reverse. A garden you can live with for years.
            </Body>
            <Body size={15}>
              Every bloom is grown without pesticides by partner farms in Yilan and Nantou.
              Everything else — paper, paint, thread — is made by hand in our studio.
            </Body>
            <div className="mt-10 font-serif italic text-[22px] text-ink">
              — Mei Lin, founder
            </div>
          </div>
        </div>
      </section>

      {/* Studio info grid */}
      <section className="ttk-section">
        <div className="ttk-about-info">
          {[
            ['Studio', "Visit by appointment only — Saturdays, 2–6pm.\nNo. 14, Lane 3, Da'an District, Taipei."],
            ['Materials', 'Grown in Taiwan. Preserved using silica and slow-air methods. No dyes, no chemicals.'],
            ['Shipping', 'Worldwide, fully insured. Each piece is crated by hand and ships in 5–7 business days.'],
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
