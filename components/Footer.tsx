import { Eyebrow } from './ui';

const FOOTER_LINKS = [
  { heading: 'Shop', items: ['Framed gardens', 'Wreaths', 'Dried bouquets', 'Home accessories'] },
  { heading: 'Studio', items: ['Our story', 'Custom commissions', 'Care guide', 'Journal'] },
  { heading: 'Contact', items: ['hello@tietheknot.florist', 'Visit by appointment', 'Instagram', 'Newsletter'] },
] as const;

export function Footer() {
  return (
    <footer className="px-12 pt-[60px] pb-8 bg-surface border-t border-rule font-sans">
      <div className="ttk-footer-grid">
        <div>
          <div className="font-serif italic text-[28px] text-ink">tietheknot</div>
          <p className="font-sans text-[13px] leading-[1.6] text-ink-soft mt-3 max-w-[280px]">
            A quiet boutique of preserved and dried florals, composed by hand in small batches. Taipei, est. 2024.
          </p>
        </div>

        {FOOTER_LINKS.map(({ heading, items }) => (
          <div key={heading}>
            <Eyebrow className="mb-4">{heading}</Eyebrow>
            {items.map((item) => (
              <div key={item} className="text-[13px] text-ink-soft mb-2 cursor-pointer">
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="h-px bg-rule w-full" />

      <div className="flex justify-between mt-6 text-[11px] text-muted tracking-[0.1em] flex-wrap gap-2">
        <span>© 2026 tietheknot.florist — All blooms handmade.</span>
        <span>Terms · Privacy · Shipping</span>
      </div>
    </footer>
  );
}
