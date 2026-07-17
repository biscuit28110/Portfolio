'use client';

import { useRef } from 'react';
import { MarqueeBand as MarqueeBandType } from '@/data/skills';
import { SkillChip } from './SkillChip';

type MarqueeBandProps = {
  band: MarqueeBandType;
};

const DOT_SEPARATOR = (
  <span
    aria-hidden="true"
    style={{
      display: 'inline-block',
      width: 4,
      height: 4,
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.15)',
      margin: '0 34px',
      verticalAlign: 'middle',
      flexShrink: 0,
    }}
  />
);

export function MarqueeBand({ band }: MarqueeBandProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const animName = band.direction === 'rtl' ? 'marquee-rtl' : 'marquee-ltr';

  const chips = (
    <>
      {band.skills.map((skill, i) => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
          <SkillChip skill={skill} color={band.color} />
          {DOT_SEPARATOR}
        </span>
      ))}
    </>
  );

  return (
    <div
      className="marquee-band"
      style={{
        position: 'relative',
        height: 130,
        overflow: 'hidden',
        overflowX: 'clip', /* plus strict que hidden — résiste aux transforms GPU */
        display: 'flex',
        alignItems: 'center',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(255,255,255,0.01)',
        contain: 'layout',
        isolation: 'isolate',
      }}
      onPointerEnter={(e) => {
        if (e.pointerType === 'mouse' && trackRef.current)
          trackRef.current.style.animationPlayState = 'paused';
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === 'mouse' && trackRef.current)
          trackRef.current.style.animationPlayState = 'running';
      }}
    >
      {/* Left label overlay — largeur fixe (pas minWidth) et alignée sur le
          padding-left du track (.marquee-track) : sinon le texte du label
          peut pousser la boîte plus large que la zone que le track laisse
          libre, et le dégradé (calculé en % de la largeur de la boîte) ne
          masque plus assez loin — les logos qui défilent redeviennent
          visibles à travers le label pendant la boucle. */}
      <div
        className="marquee-label"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 32px 0 clamp(20px, 4vw, 56px)',
          background: `linear-gradient(to right, #020617 85%, transparent)`,
          width: 240,
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: band.color,
              boxShadow: `0 0 0 3px ${band.color}30`,
              display: 'block',
              flexShrink: 0,
              animation: 'pulse-dot 2.4s ease-in-out infinite',
            }}
          />
          <span
            className="marquee-label-text"
            style={{
              fontWeight: 600, fontSize: 14, color: '#fff', letterSpacing: '-0.01em',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}
          >
            {band.label}
          </span>
        </div>
        <span
          className="marquee-label-text"
          style={{
            fontFamily: 'var(--font-geist-mono, ui-monospace)', fontSize: 11, color: band.color, letterSpacing: '0.04em',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}
        >
          {band.sub}
        </span>
      </div>

      {/* Right fade */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: 100,
          background: 'linear-gradient(to left, #020617, transparent)',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />

      {/* Scrolling track */}
      <div
        ref={trackRef}
        className="marquee-track"
        style={{
          display: 'flex',
          alignItems: 'center',
          width: 'max-content',
          animation: `${animName} ${band.speed} linear infinite`,
          willChange: 'transform',
        }}
      >
        {/* First copy */}
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>{chips}</span>
        {/* Duplicate for seamless loop */}
        <span aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center' }}>{chips}</span>
      </div>
    </div>
  );
}
