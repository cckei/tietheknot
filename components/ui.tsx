import type { CSSProperties, ReactNode } from 'react';

export function Eyebrow({
  children,
  style,
  className,
}: {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <div
      className={`font-sans text-[10px] tracking-[0.28em] uppercase text-ink-soft font-medium ${className ?? ''}`}
      style={style}
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
  className,
}: {
  children: ReactNode;
  size?: number;
  italic?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'div';
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <Tag
      className={`font-serif font-normal leading-[1.02] tracking-[-0.01em] text-ink m-0 ${italic ? 'italic' : ''} ${className ?? ''}`}
      style={{ fontSize: size, ...style }}
    >
      {children}
    </Tag>
  );
}

export function Body({
  children,
  size = 15,
  style,
  className,
}: {
  children: ReactNode;
  size?: number;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <p
      className={`font-sans leading-[1.6] text-ink-soft m-0 ${className ?? ''}`}
      style={{ fontSize: size, ...style }}
    >
      {children}
    </p>
  );
}

export function Rule({ style, className }: { style?: CSSProperties; className?: string }) {
  return <div className={`h-px bg-rule w-full ${className ?? ''}`} style={style} />;
}

export function OutlineBtn({
  children,
  invert,
  style,
  onClick,
  type = 'button',
  disabled,
  className,
}: {
  children: ReactNode;
  invert?: boolean;
  style?: CSSProperties;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`font-sans text-[11px] tracking-[0.22em] uppercase font-medium py-[14px] px-7 border border-ink cursor-pointer inline-block ${invert ? 'bg-ink text-surface' : 'bg-transparent text-ink'} ${className ?? ''}`}
      style={style}
    >
      {children}
    </button>
  );
}
