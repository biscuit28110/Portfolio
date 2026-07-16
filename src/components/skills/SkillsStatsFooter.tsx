import { marqueeBands } from '@/data/skills';

const SHORT_LABELS = ['Frontend', 'Backend', 'Infra', 'IT Ops'];

const STATS = marqueeBands.map((band, i) => ({
  label: SHORT_LABELS[i] ?? band.label,
  color: band.color,
  count: band.skills.length,
}));

export function SkillsStatsFooter() {
  return (
    <div
      style={{
        marginTop: 48,
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
      className="skills-stats"
    >
      {STATS.map((s, i) => (
        <div
          key={s.label}
          className={`skills-stat-cell skills-stat-cell--${i}`}
          style={{
            padding: 'clamp(12px, 2vw, 16px) clamp(14px, 2.5vw, 24px)',
            borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: 'var(--font-geist-mono, ui-monospace)',
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: '#64748b',
              marginBottom: 8,
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, display: 'block' }} />
            {s.label}
          </div>
          <div>
            <span style={{ fontSize: 'clamp(24px, 2.8vw, 32px)', fontWeight: 600, color: '#fff', letterSpacing: '-0.025em', lineHeight: 1 }}>
              {s.count}
            </span>
            {' '}
            <span style={{ fontSize: 14, color: '#64748b', fontFamily: 'var(--font-geist-mono, ui-monospace)' }}>
              techs
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
