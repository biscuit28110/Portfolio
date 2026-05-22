type PillProps = {
  variant?: 'emerald' | 'cyan' | 'violet';
  label: string;
  sub?: string;
};

const variantStyles = {
  emerald: {
    border: 'rgba(52,211,153,0.25)',
    bg: 'rgba(52,211,153,0.06)',
    dot: '#34d399',
    dotGlow: 'rgba(52,211,153,0.18)',
    text: '#34d399',
  },
  cyan: {
    border: 'rgba(34,211,238,0.25)',
    bg: 'rgba(34,211,238,0.06)',
    dot: '#22d3ee',
    dotGlow: 'rgba(34,211,238,0.18)',
    text: '#22d3ee',
  },
  violet: {
    border: 'rgba(167,139,250,0.25)',
    bg: 'rgba(167,139,250,0.06)',
    dot: '#a78bfa',
    dotGlow: 'rgba(167,139,250,0.18)',
    text: '#a78bfa',
  },
};

export function Pill({ variant = 'emerald', label, sub }: PillProps) {
  const s = variantStyles[variant];
  return (
    <div
      className="inline-flex items-center gap-2.5"
      style={{
        padding: '8px 16px 8px 12px',
        borderRadius: '999px',
        border: `1px solid ${s.border}`,
        background: s.bg,
        fontSize: '13px',
        color: '#cbd5e1',
        fontWeight: 500,
      }}
    >
      <span
        className="shrink-0"
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: s.dot,
          boxShadow: `0 0 0 3px ${s.dotGlow}`,
          animation: 'pulse-dot 2.4s ease-in-out infinite',
          display: 'block',
        }}
      />
      <span style={{ color: s.text, fontWeight: 500 }}>{label}</span>
      {sub && <span style={{ color: '#64748b' }}>{sub}</span>}
    </div>
  );
}
