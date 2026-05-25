import { SkillItem } from '@/data/skills';

type SkillChipProps = {
  skill: SkillItem;
  color: string;
};

export function SkillChip({ skill, color }: SkillChipProps) {
  if (skill.type === 'logo') {
    return (
      <span
        className="skill-chip skill-chip--logo"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 14,
          fontSize: 18,
          fontWeight: 600,
          color: '#fff',
          opacity: 0.85,
          letterSpacing: '-0.015em',
          cursor: 'default',
          transition: 'opacity 250ms ease, transform 250ms ease',
          ['--chip-color' as string]: color,
        }}
        onPointerEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.opacity = '1';
          el.style.transform = 'scale(1.05)';
          const img = el.querySelector('img') as HTMLImageElement | null;
          if (img) img.style.filter = `drop-shadow(0 0 12px ${color}) drop-shadow(0 0 24px ${color}80)`;
        }}
        onPointerLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.opacity = '0.85';
          el.style.transform = 'scale(1)';
          const img = el.querySelector('img') as HTMLImageElement | null;
          if (img) img.style.filter = 'none';
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={skill.iconUrl}
          alt={skill.name}
          width={26}
          height={26}
          style={{ display: 'block', objectFit: 'contain', transition: 'filter 250ms ease' }}
          loading="lazy"
        />
        {skill.name}
      </span>
    );
  }

  return (
    <span
      className="skill-chip skill-chip--mono"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        fontFamily: 'var(--font-geist-mono, ui-monospace)',
        fontSize: 15,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        color: '#94a3b8',
        cursor: 'default',
        transition: 'color 250ms ease',
      }}
      onPointerEnter={(e) => {
        (e.currentTarget as HTMLElement).style.color = '#fff';
        const dot = (e.currentTarget as HTMLElement).querySelector('span') as HTMLElement | null;
        if (dot) dot.style.boxShadow = `0 0 0 5px ${color}40`;
      }}
      onPointerLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color = '#94a3b8';
        const dot = (e.currentTarget as HTMLElement).querySelector('span') as HTMLElement | null;
        if (dot) dot.style.boxShadow = `0 0 0 3px ${color}30`;
      }}
    >
      <span
        style={{
          display: 'block',
          width: 7,
          height: 7,
          borderRadius: '50%',
          background: color,
          boxShadow: `0 0 0 3px ${color}30`,
          transition: 'box-shadow 250ms ease',
          flexShrink: 0,
        }}
      />
      {skill.name}
    </span>
  );
}
