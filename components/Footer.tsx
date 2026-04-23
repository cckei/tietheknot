import { T, serif, sans } from '@/lib/tokens';
import { Eyebrow } from './ui';

const FOOTER_LINKS = [
  { heading: 'Shop', items: ['Framed gardens', 'Wreaths', 'Dried bouquets', 'Home accessories'] },
  { heading: 'Studio', items: ['Our story', 'Custom commissions', 'Care guide', 'Journal'] },
  { heading: 'Contact', items: ['hello@tietheknot.florist', 'Visit by appointment', 'Instagram', 'Newsletter'] },
] as const;

export function Footer() {
  return (
    <footer style={{ padding: '60px 48px 32px', background: T.surface, borderTop: `1px solid ${T.rule}`, fontFamily: sans }}>
      <div className="ttk-footer-grid">
        <div>
          <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 28, color: T.ink }}>
            tietheknot
          </div>
          <p style={{ fontFamily: sans, fontSize: 13, lineHeight: 1.6, color: T.inkSoft, marginTop: 12, maxWidth: 280 }}>
            A quiet boutique of preserved and dried florals, composed by hand in small batches. Taipei, est. 2024.
          </p>
        </div>

        {FOOTER_LINKS.map(({ heading, items }) => (
          <div key={heading}>
            <Eyebrow style={{ marginBottom: 16 }}>{heading}</Eyebrow>
            {items.map((item) => (
              <div key={item} style={{ fontSize: 13, color: T.inkSoft, marginBottom: 8, cursor: 'pointer' }}>
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{ height: 1, background: T.rule, width: '100%' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24, fontSize: 11, color: T.muted, letterSpacing: '0.1em', flexWrap: 'wrap', gap: 8 }}>
        <span>© 2026 tietheknot.florist — All blooms handmade.</span>
        <span>Terms · Privacy · Shipping</span>
      </div>
    </footer>
  );
}
