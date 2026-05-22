'use client';

import { ProjectEntry } from '@/data/projects';

type SceneProgressIndicatorProps = {
  projects: ProjectEntry[];
  activeIndex: number;
  visible: boolean;
};

export function SceneProgressIndicator({ projects, activeIndex, visible }: SceneProgressIndicatorProps) {
  return (
    <div
      style={{
        position: 'fixed',
        right: 24,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        opacity: visible ? 1 : 0,
        transition: 'opacity 350ms ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
      className="hidden min-[961px]:flex"
      aria-hidden="true"
    >
      {projects.map((p, i) => {
        const isActive = i === activeIndex;
        return (
          <div key={p.slug} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span
              style={{
                fontFamily: 'var(--font-geist-mono, ui-monospace)',
                fontSize: 10.5,
                color: isActive ? '#fff' : '#64748b',
                letterSpacing: '0.04em',
                transition: 'color 250ms ease',
                textAlign: 'right',
                whiteSpace: 'nowrap',
              }}
            >
              {String(i + 1).padStart(2, '0')} {p.title}
            </span>
            <span
              style={{
                display: 'block',
                height: 1.5,
                borderRadius: 1,
                background: isActive ? p.accent.primary : '#334155',
                boxShadow: isActive ? `0 0 12px ${p.accent.primary}` : 'none',
                transition: 'width 350ms cubic-bezier(.22,1,.36,1), background 250ms ease, box-shadow 250ms ease',
                width: isActive ? 40 : 24,
                flexShrink: 0,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
