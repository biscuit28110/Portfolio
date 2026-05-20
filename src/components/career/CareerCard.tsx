'use client';

import { ExperienceEntry } from '@/data/experience';

type CareerCardProps = {
  entry: ExperienceEntry;
  id: string;
};

const contractStyles: Record<string, { border: string; bg: string; color: string }> = {
  CDD:               { border: 'rgba(34,211,238,0.25)',  bg: 'rgba(34,211,238,0.08)',  color: '#22d3ee' },
  'Alternance / stage': { border: 'rgba(167,139,250,0.25)', bg: 'rgba(167,139,250,0.08)', color: '#a78bfa' },
  Mission:           { border: 'rgba(255,255,255,0.12)', bg: 'rgba(255,255,255,0.04)', color: '#94a3b8' },
};

export function CareerCard({ entry, id }: CareerCardProps) {
  const contractStyle = contractStyles[entry.contract] ?? contractStyles['Mission'];

  return (
    <article
      id={id}
      className="career-card"
      style={{
        padding: '64px 0',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        minHeight: '75vh',
        scrollMarginTop: 130,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* Header row: date + badges */}
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 3, height: 18, background: '#22d3ee', borderRadius: 2, display: 'block', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-geist-mono, ui-monospace)', fontSize: 12, color: '#64748b', letterSpacing: '0.04em' }}>
            {entry.period}
          </span>
        </span>

        {entry.current && (
          <span style={{
            padding: '6px 12px',
            borderRadius: 999,
            border: '1px solid rgba(52,211,153,0.25)',
            background: 'rgba(52,211,153,0.08)',
            color: '#34d399',
            fontSize: 12,
            fontWeight: 500,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 0 3px rgba(52,211,153,0.2)', animation: 'pulse-dot 2.4s ease-in-out infinite', display: 'block' }} />
            En poste
          </span>
        )}

        <span style={{
          padding: '6px 12px',
          borderRadius: 999,
          border: `1px solid ${contractStyle.border}`,
          background: contractStyle.bg,
          color: contractStyle.color,
          fontSize: 12,
          fontWeight: 500,
          fontFamily: 'var(--font-geist-mono, ui-monospace)',
          letterSpacing: '0.04em',
        }}>
          {entry.contract}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontWeight: 700,
          fontSize: 'clamp(24px, 3vw, 40px)',
          letterSpacing: '-0.035em',
          lineHeight: 1.08,
          color: '#fff',
          marginBottom: 8,
        }}
      >
        {entry.title}
      </h3>

      {/* Company · Location */}
      <p style={{ fontSize: 15, color: '#64748b', marginBottom: 20, fontFamily: 'var(--font-geist-mono, ui-monospace)', letterSpacing: '0.02em' }}>
        {entry.company} · {entry.location}
      </p>

      {/* Summary */}
      <p style={{ fontSize: 16, lineHeight: 1.65, color: '#cbd5e1', marginBottom: 24, maxWidth: '62ch' }}>
        {entry.summary}
      </p>

      {/* Impact callout */}
      <div
        style={{
          marginBottom: 28,
          padding: '18px 22px',
          background: 'linear-gradient(135deg, rgba(34,211,238,0.06), rgba(139,92,246,0.04))',
          border: '1px solid rgba(34,211,238,0.18)',
          borderLeftWidth: 3,
          borderRadius: '0 10px 10px 0',
          maxWidth: '64ch',
        }}
      >
        <div style={{ fontFamily: 'var(--font-geist-mono, ui-monospace)', fontSize: 10.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#22d3ee', marginBottom: 8, fontWeight: 600 }}>
          → Impact
        </div>
        <p style={{ fontSize: 14.5, lineHeight: 1.6, color: '#cbd5e1', margin: 0 }}>
          {entry.impact}
        </p>
      </div>

      {/* Highlights */}
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {entry.highlights.map((h, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22d3ee', boxShadow: '0 0 0 3px rgba(34,211,238,0.12)', display: 'block', marginTop: 7, flexShrink: 0 }} />
            <span style={{ fontSize: 14.5, lineHeight: 1.6, color: '#cbd5e1' }}>{h}</span>
          </li>
        ))}
      </ul>

      {/* Environment chips */}
      {entry.environment && entry.environment.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontFamily: 'var(--font-geist-mono, ui-monospace)', fontSize: 10.5, color: '#64748b', letterSpacing: '0.06em', textTransform: 'uppercase', alignSelf: 'center', marginRight: 4 }}>
            Env.
          </span>
          {entry.environment.map((env) => (
            <span
              key={env}
              style={{
                fontFamily: 'var(--font-geist-mono, ui-monospace)',
                fontSize: 11,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#94a3b8',
                padding: '5px 11px',
                borderRadius: 6,
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.025)',
              }}
            >
              {env}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
