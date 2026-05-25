'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ExperienceEntry } from '@/data/experience';
import { CareerNav } from './CareerNav';
import { CareerCard } from './CareerCard';

type CareerMapProps = {
  entries: ExperienceEntry[];
};

export function CareerMap({ entries }: CareerMapProps) {
  const [activeSlug, setActiveSlug] = useState(entries[0]?.slug ?? '');
  const [progress, setProgress] = useState(entries.length > 0 ? (1 / entries.length) * 100 : 0);

  const activeIdx   = entries.findIndex((e) => e.slug === activeSlug);
  const activeEntry = entries[activeIdx] ?? entries[0];

  /* Scroll listener — mobile only (desktop uses nav clicks) */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let rafId: number | null = null;

    const updateActive = () => {
      if (window.innerWidth >= 960) { rafId = null; return; }

      const anchor = window.innerHeight * 0.35;
      let bestIdx = 0;
      let bestDist = Infinity;

      entries.forEach((e, idx) => {
        const card = document.getElementById(`mobile-card-${e.slug}`);
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const dist = Math.abs(rect.top - anchor);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = idx;
        }
      });

      setActiveSlug(entries[bestIdx].slug);
      setProgress(((bestIdx + 1) / entries.length) * 100);
      rafId = null;
    };

    const onScroll = () => {
      if (rafId === null) rafId = requestAnimationFrame(updateActive);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateActive();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [entries]);

  const handleNavSelect = (slug: string) => {
    const idx = entries.findIndex((e) => e.slug === slug);
    setActiveSlug(slug);
    setProgress(((idx + 1) / entries.length) * 100);
  };

  return (
    <>
      {/* Indicateur de progression — mobile uniquement */}
      <div className="career-mobile-indicator">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 10,
          gap: 12,
        }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{
              fontFamily: 'var(--font-geist-mono, ui-monospace)',
              fontSize: 10,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#22d3ee',
              marginBottom: 3,
            }}>
              {activeEntry?.company}
            </div>
            <div style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#fff',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {activeEntry?.title}
            </div>
          </div>
          <div style={{
            fontFamily: 'var(--font-geist-mono, ui-monospace)',
            fontSize: 11,
            color: '#475569',
            letterSpacing: '0.04em',
            flexShrink: 0,
          }}>
            {activeIdx + 1}&thinsp;/&thinsp;{entries.length}
          </div>
        </div>
        <div style={{
          height: 2,
          background: 'rgba(255,255,255,0.06)',
          borderRadius: 2,
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${progress || (1 / entries.length) * 100}%`,
            background: 'linear-gradient(90deg, #22d3ee, #a78bfa)',
            borderRadius: 2,
            transition: 'width 400ms cubic-bezier(.22,1,.36,1)',
          }} />
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 80,
          position: 'relative',
        }}
        className="career-map"
      >
        {/* Nav sticky — desktop uniquement, hauteur = panel desktop */}
        <div style={{ width: 320, flexShrink: 0, alignSelf: 'stretch' }}>
          <CareerNav
            entries={entries}
            activeSlug={activeSlug}
            progress={progress}
            onSelect={handleNavSelect}
          />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Desktop — 1 seule carte active, animée */}
          <div className="career-desktop-panel">
            <AnimatePresence mode="wait">
              <CareerCard
                key={activeSlug}
                entry={activeEntry}
                id={`card-${activeEntry.slug}`}
                immediate
              />
            </AnimatePresence>
          </div>

          {/* Mobile — toutes les cartes empilées */}
          <div className="career-mobile-stack">
            {entries.map((entry) => (
              <CareerCard
                key={entry.slug}
                entry={entry}
                id={`mobile-card-${entry.slug}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
