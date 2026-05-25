'use client';

import { ExperienceEntry } from '@/data/experience';

type CareerNavProps = {
  entries: ExperienceEntry[];
  activeSlug: string;
  progress: number;
  onSelect: (slug: string) => void;
};

export function CareerNav({ entries, activeSlug, progress, onSelect }: CareerNavProps) {
  return (
    <nav
      aria-label="Navigation parcours"
      style={{
        position: 'sticky',
        top: 120,
        paddingLeft: 28,
        borderLeft: '1px solid rgba(255,255,255,0.08)',
      }}
      className="career-nav-wrap"
    >
      {/* Progress line */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: -1,
          top: 0,
          width: 1,
          height: `${progress}%`,
          background: 'linear-gradient(180deg, #22d3ee, #a78bfa)',
          boxShadow: '0 0 14px #22d3ee',
          transition: 'height 250ms ease',
          zIndex: 1,
        }}
      />

      <h4
        style={{
          fontFamily: 'var(--font-geist-mono, ui-monospace)',
          fontSize: 11,
          color: '#64748b',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 6,
        }}
      >
        Expériences
      </h4>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column' }}>
        {entries.map((entry) => {
          const isActive = entry.slug === activeSlug;
          return (
            <li key={entry.slug} style={{ position: 'relative' }}>
              {/* Dot */}
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: -32.5,
                  top: 22,
                  width: 9,
                  height: 9,
                  borderRadius: '50%',
                  zIndex: 2,
                  transition: 'all 350ms ease',
                  background: isActive
                    ? (entry.current ? '#34d399' : '#22d3ee')
                    : '#1e293b',
                  boxShadow: isActive
                    ? (entry.current
                        ? '0 0 0 3px #020617, 0 0 0 5px rgba(52,211,153,0.4), 0 0 14px #34d399'
                        : '0 0 0 3px #020617, 0 0 0 5px rgba(34,211,238,0.4), 0 0 14px #22d3ee')
                    : '0 0 0 3px #020617',
                  animation: (isActive && entry.current) ? 'career-dot-pulse 2.4s ease-in-out infinite' : 'none',
                }}
              />

              <button
                onClick={() => {
                  onSelect(entry.slug);
                  const card = document.getElementById(`card-${entry.slug}`);
                  if (card) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                style={{
                  display: 'block',
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: isActive ? '14px 0 14px 14px' : '14px 0 14px 4px',
                  transition: 'padding 300ms ease',
                  fontFamily: 'inherit',
                  color: 'inherit',
                }}
              >
                <span style={{ display: 'block', fontFamily: 'var(--font-geist-mono, ui-monospace)', fontSize: 11, color: '#64748b', letterSpacing: '0.04em', marginBottom: 2 }}>
                  {entry.period.split('-')[0].trim()}
                </span>
                <span style={{ display: 'block', fontSize: 15, fontWeight: 600, color: isActive ? '#fff' : '#94a3b8', transition: 'color 250ms ease' }}>
                  {entry.company}
                </span>
                <span style={{ display: 'block', fontFamily: 'var(--font-geist-mono, ui-monospace)', fontSize: 11, color: '#475569', letterSpacing: '0.02em', marginTop: 1 }}>
                  {entry.title.length > 30 ? entry.title.slice(0, 30) + '…' : entry.title}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
