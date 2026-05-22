import { ReactNode } from 'react';

type BrowserFrameProps = {
  url: string;
  accent?: string;
  wip?: boolean;
  children: ReactNode;
  tilt?: boolean;
};

export function BrowserFrame({
  url,
  accent = '#22d3ee',
  wip = false,
  children,
  tilt = true,
}: BrowserFrameProps) {
  return (
    <div
      className="browser-frame relative overflow-hidden"
      style={{
        borderRadius: 14,
        background: '#0f172a',
        border: '1px solid rgba(255,255,255,0.10)',
        boxShadow:
          '0 50px 100px -20px rgba(0,0,0,0.6), 0 25px 50px -15px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)',
        aspectRatio: '16/10',
        transform: tilt
          ? 'perspective(2000px) rotateY(-3deg) rotateX(2deg)'
          : 'none',
        transition:
          'transform 650ms cubic-bezier(.22,1,.36,1), box-shadow 350ms cubic-bezier(.22,1,.36,1)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(2,6,23,0.6)',
          flexShrink: 0,
        }}
      >
        {/* Traffic lights */}
        <div className="flex gap-1.5 shrink-0">
          {['#ff5f56', '#ffbd2e', '#27c93f'].map((c) => (
            <span
              key={c}
              style={{ width: 11, height: 11, borderRadius: '50%', background: c, display: 'block' }}
            />
          ))}
        </div>

        {/* URL bar */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 14px',
            borderRadius: 8,
            background: 'rgba(255,255,255,0.05)',
            fontFamily: 'var(--font-geist-mono, ui-monospace)',
            fontSize: 12,
            color: '#cbd5e1',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {/* lock icon */}
          <svg
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            style={{ flexShrink: 0, opacity: 0.7 }}
          >
            <circle cx="5.5" cy="5.5" r="5" stroke={accent} strokeWidth="1.5" fill="none" />
            <rect x="3.5" y="5" width="4" height="3" rx="0.5" fill={accent} opacity="0.6" />
            <rect x="4.5" y="3.5" width="2" height="2" rx="1" stroke={accent} strokeWidth="1.2" fill="none" />
          </svg>
          <span style={{ opacity: 0.6 }}>https://</span>
          {url}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {children}
      </div>

      {/* WIP badge */}
      {wip && (
        <div
          style={{
            position: 'absolute',
            top: 14,
            right: 14,
            fontFamily: 'var(--font-geist-mono, ui-monospace)',
            fontSize: 10,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontWeight: 600,
            padding: '5px 10px',
            borderRadius: 6,
            background: `color-mix(in oklab, ${accent} 18%, #020617)`,
            border: `1px solid color-mix(in oklab, ${accent} 40%, transparent)`,
            backdropFilter: 'blur(8px)',
            color: accent,
          }}
        >
          WIP
        </div>
      )}
    </div>
  );
}
