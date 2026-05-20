'use client';

import { EducationEntry } from '@/data/experience';

type EducationGridProps = {
  entries: EducationEntry[];
};

export function EducationGrid({ entries }: EducationGridProps) {
  return (
    <div
      style={{
        marginTop: 120,
        paddingTop: 60,
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <h3
        style={{
          fontFamily: 'var(--font-geist-mono, ui-monospace)',
          fontSize: 11,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: '#64748b',
          marginBottom: 8,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span style={{ width: 24, height: 1, background: '#22d3ee', display: 'block' }} />
        02b — Formation
      </h3>
      <p
        style={{
          fontWeight: 600,
          fontSize: 'clamp(28px, 3.5vw, 48px)',
          letterSpacing: '-0.035em',
          color: '#fff',
          marginBottom: 40,
          lineHeight: 1.1,
        }}
      >
        Cursus & diplômes
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
        }}
        className="edu-grid"
      >
        {entries.map((edu) => (
          <div
            key={edu.slug}
            style={{
              padding: 28,
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 14,
              background: 'rgba(255,255,255,0.02)',
              transition: 'transform 250ms ease, border-color 250ms ease, background 250ms ease',
              cursor: 'default',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = 'translateY(-2px)';
              el.style.borderColor = 'rgba(34,211,238,0.25)';
              el.style.background = 'linear-gradient(135deg, rgba(34,211,238,0.04), rgba(139,92,246,0.02))';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = 'translateY(0)';
              el.style.borderColor = 'rgba(255,255,255,0.08)';
              el.style.background = 'rgba(255,255,255,0.02)';
            }}
          >
            <div style={{ fontFamily: 'var(--font-geist-mono, ui-monospace)', fontSize: 11, color: '#22d3ee', letterSpacing: '0.06em', marginBottom: 12 }}>
              {edu.period}
            </div>
            <h4 style={{ fontSize: 15, fontWeight: 600, color: '#fff', lineHeight: 1.4, marginBottom: 8 }}>
              {edu.title}
            </h4>
            <p style={{ fontSize: 13, color: '#64748b', marginBottom: 12, lineHeight: 1.5 }}>
              {edu.school}
            </p>
            <div style={{ fontFamily: 'var(--font-geist-mono, ui-monospace)', fontSize: 11, color: '#22d3ee', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              {edu.result}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
