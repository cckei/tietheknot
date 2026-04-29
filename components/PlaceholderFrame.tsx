type Tone = 'taupe' | 'sage' | 'ivory' | 'mist' | 'mustard' | 'rose';
type Accent = 'sage' | 'mustard' | 'cotton' | 'fern' | 'clay';

const TONE_PALETTES: Record<Tone, { bg: string; deep: string }> = {
  taupe:   { bg: '#e8dfd1', deep: '#c9bda5' },
  sage:    { bg: '#c7cdb3', deep: '#9ba588' },
  ivory:   { bg: '#efe9dc', deep: '#d6cdb8' },
  mist:    { bg: '#d4cfc3', deep: '#b3ad9d' },
  mustard: { bg: '#d9c58a', deep: '#ad9659' },
  rose:    { bg: '#e6d4cc', deep: '#c2a89c' },
};

const ACCENT_COLORS: Record<Accent, string> = {
  sage:    '#8a9170',
  mustard: '#c9a968',
  cotton:  '#faf7f2',
  fern:    '#6b7256',
  clay:    '#b08968',
};

export function PlaceholderFrame({
  tone = 'taupe',
  accent = 'sage',
  caption = 'Untitled',
}: {
  tone?: string;
  accent?: string;
  caption?: string;
}) {
  const p = TONE_PALETTES[tone as Tone] ?? TONE_PALETTES.taupe;
  const a = ACCENT_COLORS[accent as Accent] ?? ACCENT_COLORS.sage;

  return (
    <div
      className="w-full relative flex flex-col border border-rule"
      style={{
        background: '#faf7f2',
        padding: '14% 14% 16%',
        boxShadow: 'inset 0 0 0 8px #ffffff, 0 1px 0 rgba(0,0,0,0.02)',
      }}
    >
      <div className="flex-1 relative overflow-hidden min-h-[100px]" style={{ background: p.bg }}>
        {/* sky gradient */}
        <div
          className="absolute inset-0 h-[55%]"
          style={{ background: `linear-gradient(180deg, ${p.bg} 0%, ${p.deep}22 100%)` }}
        />
        {/* foliage left */}
        <div
          className="absolute opacity-[0.85]"
          style={{
            left: '8%', bottom: '14%', width: '28%', height: '30%',
            borderRadius: '50% 40% 55% 45%', background: a,
          }}
        />
        {/* foliage right */}
        <div
          className="absolute opacity-[0.55]"
          style={{
            right: '12%', bottom: '18%', width: '36%', height: '26%',
            borderRadius: '45% 55% 50% 40%', background: a,
          }}
        />
        {/* house body */}
        <div
          className="absolute"
          style={{ left: '38%', bottom: '20%', width: '14%', height: '18%', background: '#faf7f2' }}
        />
        {/* scattered dots — dried flowers */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${((i * 71) % 92) + 4}%`,
              bottom: `${((i * 13) % 32) + 2}%`,
              background: i % 3 === 0 ? '#faf7f2' : i % 3 === 1 ? '#c9a968' : a,
            }}
          />
        ))}
        {/* ground line */}
        <div
          className="absolute left-0 right-0 h-0.5"
          style={{ bottom: '4%', background: `${p.deep}88` }}
        />
      </div>
      <div className="mt-2 font-serif italic text-[10px] text-ink-soft text-center">
        {caption}
      </div>
    </div>
  );
}
