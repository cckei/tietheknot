import Link from 'next/link';
import { T, serif, sans } from '@/lib/tokens';

type NavPage = 'home' | 'shop' | 'about';

const LEFT_LINKS = [
  { label: 'Shop', href: '/shop', key: 'shop' },
  { label: 'Collections', href: '/shop', key: 'collections' },
  { label: 'Custom', href: '/about', key: 'custom' },
  { label: 'Journal', href: '/', key: 'journal' },
];

const MOBILE_LINKS = [
  { label: 'Shop', href: '/shop' },
  { label: 'About', href: '/about' },
  { label: 'Custom', href: '/about' },
  { label: 'Bag (0)', href: '/' },
];

const linkStyle = (active: boolean): React.CSSProperties => ({
  color: T.ink,
  textDecoration: 'none',
  borderBottom: active ? `1px solid ${T.ink}` : 'none',
  paddingBottom: 2,
  whiteSpace: 'nowrap' as const,
});

export function Nav({ page = 'home' }: { page?: NavPage }) {
  return (
    <header
      style={{
        borderBottom: `1px solid ${T.rule}`,
        background: T.bg,
        position: 'relative',
        zIndex: 5,
      }}
    >
      <div
        className="ttk-nav"
        style={{ fontFamily: sans, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 500 }}
      >
        {/* Left nav — hidden on mobile */}
        <nav className="ttk-nav-left">
          {LEFT_LINKS.map(({ label, href, key }) => (
            <Link key={label} href={href} style={linkStyle(page === key)}>
              {label}
            </Link>
          ))}
        </nav>

        {/* Logo — always visible */}
        <Link href="/" style={{ textAlign: 'center', textDecoration: 'none' }}>
          <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 26, color: T.ink, lineHeight: 1 }}>
            tietheknot
          </div>
          <div style={{ fontFamily: sans, fontSize: 9, letterSpacing: '0.42em', color: T.inkSoft, marginTop: 4 }}>
            F L O R I S T
          </div>
        </Link>

        {/* Right nav — hidden on mobile */}
        <nav className="ttk-nav-right" style={{ color: T.ink }}>
          <Link href="/about" style={linkStyle(page === 'about')}>About</Link>
          <span style={{ cursor: 'pointer' }}>Search</span>
          <span style={{ cursor: 'pointer' }}>Account</span>
          <span style={{ cursor: 'pointer' }}>
            Bag <span style={{ color: T.muted }}>(0)</span>
          </span>
        </nav>
      </div>

      {/* Mobile nav strip — shown only on mobile */}
      <nav
        className="ttk-nav-mobile"
        style={{
          fontFamily: sans,
          fontSize: 11,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          fontWeight: 500,
          borderTop: `1px solid ${T.rule}`,
        }}
      >
        {MOBILE_LINKS.map(({ label, href }) => (
          <Link key={label} href={href} style={{ color: T.ink, textDecoration: 'none', whiteSpace: 'nowrap' }}>
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
