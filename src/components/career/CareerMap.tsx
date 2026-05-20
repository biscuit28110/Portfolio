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
  );
}
