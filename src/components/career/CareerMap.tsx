'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExperienceEntry } from '@/data/experience';
import { CareerNav } from './CareerNav';
import { CareerCard } from './CareerCard';
import { EASE } from '@/lib/motion';

type CareerMapProps = {
  entries: ExperienceEntry[];
};

function MobileSeparator({
  filled,
  active,
  label,
}: {
  filled: boolean;
  active: boolean;
  label: string;
}) {
  return (
    <div style={{ position: 'relative', height: 28, display: 'flex', alignItems: 'center' }}>
      {/* Track */}
      <div style={{
        position: 'absolute',
        left: 0,
        right: 0,
        height: 1,
        background: 'rgba(255,255,255,0.06)',
      }} />

      {/* Fill — le pill est enfant et surfe sur son bord droit */}
      <motion.div
        animate={{
          width: filled ? '100%' : '0%',
          boxShadow: active
            ? '0 0 14px 2px rgba(34,211,238,0.55), 0 0 4px rgba(34,211,238,0.85)'
            : filled
              ? '0 0 6px rgba(34,211,238,0.22)'
              : '0 0 0px transparent',
        }}
        transition={{ duration: 0.55, ease: EASE }}
        style={{
          position: 'absolute',
          left: 0,
          height: 2,
          background: 'linear-gradient(90deg, #22d3ee, #a78bfa)',
          borderRadius: 1,
          overflow: 'visible',
        }}
      >
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0, scale: 0.65, y: '-50%' }}
              animate={{ opacity: 1, scale: 1,   y: '-50%' }}
              exit={{    opacity: 0, scale: 0.65, y: '-50%' }}
              transition={{ type: 'spring', damping: 18, stiffness: 260 }}
              style={{
                position: 'absolute',
                right: 0,
                top: '50%',
                background: 'rgba(2, 6, 23, 0.84)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(34,211,238,0.28)',
                borderRadius: 12,
                overflow: 'hidden',
                minWidth: 76,
                zIndex: 10,
              }}
            >
              {/* Fill interne qui se remplit de gauche à droite */}
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.65, ease: EASE, delay: 0.08 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, rgba(34,211,238,0.18), rgba(167,139,250,0.13))',
                }}
              />
              {/* Label au-dessus du fill */}
              <span style={{
                position: 'relative',
                zIndex: 1,
                display: 'block',
                padding: '5px 11px',
                fontSize: 10,
                fontFamily: 'var(--font-geist-mono, ui-monospace)',
                fontWeight: 600,
                color: '#22d3ee',
                letterSpacing: '0.07em',
                whiteSpace: 'nowrap',
              }}>
                {label}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

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

  const total = String(entries.length).padStart(2, '0');

  return (
    <div
      style={{ display: 'flex', alignItems: 'flex-start', gap: 80, position: 'relative' }}
      className="career-map"
    >
      {/* Nav sticky — desktop uniquement */}
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

        {/* Mobile — cartes empilées avec séparateurs pill */}
        <div className="career-mobile-stack">
          {entries.map((entry, i) => (
            <div key={entry.slug}>
              {i > 0 && (
                <MobileSeparator
                  filled={activeIdx >= i}
                  active={activeIdx === i}
                  label={`${String(i + 1).padStart(2, '0')} · ${total}`}
                />
              )}
              <CareerCard
                entry={entry}
                id={`mobile-card-${entry.slug}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
