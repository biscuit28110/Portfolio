'use client';

import { useEffect, useState } from 'react';
import { ExperienceEntry } from '@/data/experience';
import { CareerNav } from './CareerNav';
import { CareerCard } from './CareerCard';

type CareerMapProps = {
  entries: ExperienceEntry[];
};

export function CareerMap({ entries }: CareerMapProps) {
  const [activeSlug, setActiveSlug] = useState(entries[0]?.slug ?? '');
  const [progress, setProgress] = useState(0);

  const activeIdx  = entries.findIndex((e) => e.slug === activeSlug);
  const activeEntry = entries[activeIdx] ?? entries[0];

  useEffect(() => {
    const cards = entries.map((e) => document.getElementById(`card-${e.slug}`)).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (observedEntries) => {
        for (const entry of observedEntries) {
          if (entry.isIntersecting) {
            const cardId = entry.target.id.replace('card-', '');
            const idx = entries.findIndex((e) => e.slug === cardId);
            if (idx !== -1) {
              setActiveSlug(entries[idx].slug);
              setProgress(((idx + 1) / entries.length) * 100);
            }
          }
        }
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );

    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, [entries]);

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
          display: 'grid',
          gridTemplateColumns: '320px 1fr',
          gap: 80,
          position: 'relative',
        }}
        className="career-map"
      >
        <CareerNav
          entries={entries}
          activeSlug={activeSlug}
          progress={progress}
          onSelect={setActiveSlug}
        />

        <div>
          {entries.map((entry) => (
            <CareerCard key={entry.slug} entry={entry} id={`card-${entry.slug}`} />
          ))}
        </div>
      </div>
    </>
  );
}
