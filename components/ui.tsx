import type { CSSProperties, ReactNode } from 'react';
import { T, serif, sans } from '@/lib/tokens';

export function Eyebrow({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      style={{
        fontFamily: sans,
        fontSize: 10,
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        color: T.inkSoft,
        fontWeight: 500,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Display({
  children,
  size = 72,
  italic = false,
  as: Tag = 'h1',
  style,
}: {
  children: ReactNode;
  size?: number;
  italic?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'div';
  style?: CSSProperties;
}) {
  return (
    <Tag
      style={{
        fontFamily: serif,
        fontWeight: 400,
        fontSize: size,
        lineHeight: 1.02,
        letterSpacing: '-0.01em',
        color: T.ink,
        margin: 0,
        fontStyle: italic ? 'italic' : 'normal',
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

export function Body({
  children,
  size = 15,
  style,
}: {
  children: ReactNode;
  size?: number;
  style?: CSSProperties;
}) {
  return (
    <p
      style={{
        fontFamily: sans,
        fontSize: size,
        lineHeight: 1.6,
        color: T.inkSoft,
        margin: 0,
        ...style,
      }}
    >
      {children}
    </p>
  );
}

export function Rule({ style }: { style?: CSSProperties }) {
  return <div style={{ height: 1, background: T.rule, width: '100%', ...style }} />;
}

export function OutlineBtn({
  children,
  invert,
  style,
  onClick,
  type = 'button',
}: {
  children: ReactNode;
  invert?: boolean;
  style?: CSSProperties;
  onClick?: () => void;
  type?: 'button' | 'submit';
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        fontFamily: sans,
        fontSize: 11,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        fontWeight: 500,
        padding: '14px 28px',
        background: invert ? T.ink : 'transparent',
        color: invert ? T.surface : T.ink,
        border: `1px solid ${T.ink}`,
        cursor: 'pointer',
        display: 'inline-block',
        ...style,
      }}
    >
      {children}
    </button>
  );
}
