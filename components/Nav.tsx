import Link from 'next/link';
import { T, serif, sans } from '@/lib/tokens';

type NavPage = 'home' | 'shop' | 'about';

export function Nav({ page = 'home' }: { page?: NavPage }) {
  const leftLinks: { label: string; href: string; key: NavPage | string }[] = [
    { label: 'Shop', href: '/shop', key: 'shop' },
    { label: 'Collections', href: '/shop', key: 'collections' },
    { label: 'Custom', href: '/about', key: 'custom' },
    { label: 'Journal', href: '/', key: 'journal' },
  ];

  return (
    <header
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        padding: '22px 48px',
        borderBottom: `1px solid ${T.rule}`,
        background: T.bg,
        position: 'relative',
        zIndex: 5,
      }}
    >
      <nav
        style={{
          display: 'flex',
          gap: 32,
          fontFamily: sans,
          fontSize: 11,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          fontWeight: 500,
        }}
      >
        {leftLinks.map(({ label, href, key }) => (
          <Link
            key={label}
            href={href}
            style={{
              color: T.ink,
              textDecoration: 'none',
              borderBottom: page === key ? `1px solid ${T.ink}` : 'none',
              paddingBottom: 2,
            }}
          >
            {label}
          </Link>
        ))}
      </nav>

      <Link href="/" style={{ textAlign: 'center', textDecoration: 'none' }}>
        <div
          style={{
            fontFamily: serif,
            fontStyle: 'italic',
            fontSize: 26,
            color: T.ink,
            lineHeight: 1,
          }}
        >
          tietheknot
        </div>
        <div
          style={{
            fontFamily: sans,
            fontSize: 9,
            letterSpacing: '0.42em',
            color: T.inkSoft,
            marginTop: 4,
          }}
        >
          F L O R I S T
        </div>
      </Link>

      <nav
        style={{
          display: 'flex',
          gap: 28,
          justifyContent: 'flex-end',
          fontFamily: sans,
          fontSize: 11,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          fontWeight: 500,
        }}
      >
        <Link href="/about" style={{ color: T.ink, textDecoration: 'none' }}>
          About
        </Link>
        <span style={{ color: T.ink, cursor: 'pointer' }}>Search</span>
        <span style={{ color: T.ink, cursor: 'pointer' }}>Account</span>
        <span style={{ color: T.ink, cursor: 'pointer' }}>
          Bag <span style={{ color: T.muted }}>(0)</span>
        </span>
      </nav>
    </header>
  );
}
