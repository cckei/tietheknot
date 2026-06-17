import Link from 'next/link';
import { Eyebrow } from './ui';

const FOOTER_LINKS = [
  {
    heading: 'Contact',
    items: [
      { text: 'Whatsapp', href: 'https://wa.me/447512028633', external: true },
      { text: 'Instagram', href: 'https://www.instagram.com/tietheknot.floral', external: true },
    ],
  },
  {
    heading: 'Support',
    items: [
      { text: 'Flower Care Guide', href: '/flower-care' },
      { text: 'FAQ', href: '/faq' },
    ],
  },
] as const;

const LEGAL_LINKS = [
  { text: 'Privacy Policy', href: '/privacy' },
  { text: 'Terms of Service', href: '/terms' },
] as const;

export function Footer() {
  return (
    <footer className="px-12 pt-[60px] pb-8 bg-surface border-t border-rule font-sans">
      <div className="ttk-footer-grid">
        <div>
          <div className="font-serif italic text-[28px] text-ink">tietheknot</div>
          <p className="font-sans text-[13px] leading-[1.6] text-ink-soft mt-3 max-w-[280px]">
            Designed and crafted by TieTheKnot.Florist — where we celebrate the quiet poetry of flowers, preserved in time.
          </p>
        </div>

        {FOOTER_LINKS.map(({ heading, items }) => (
          <div key={heading}>
            <Eyebrow className="mb-4">{heading}</Eyebrow>
            {items.map((item) => (
              <div key={item.text} className="text-[13px] text-ink-soft mb-2">
                {'external' in item && item.external ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-inherit no-underline">
                    {item.text}
                  </a>
                ) : (
                  <Link href={item.href} className="text-inherit no-underline">
                    {item.text}
                  </Link>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="h-px bg-rule w-full" />

      <div className="flex justify-between mt-6 text-[11px] text-muted tracking-[0.1em] flex-wrap gap-2">
        <span>© 2026 tietheknot.florist — All blooms handmade.</span>
        <span className="flex gap-2 flex-wrap">
          {LEGAL_LINKS.map(({ text, href }, i) => (
            <span key={href} className="flex gap-2">
              {i > 0 && <span aria-hidden>·</span>}
              <Link href={href} className="text-muted no-underline hover:opacity-70">
                {text}
              </Link>
            </span>
          ))}
        </span>
      </div>
    </footer>
  );
}
