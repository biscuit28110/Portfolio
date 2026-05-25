'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExperienceEntry } from '@/data/experience';
import { EASE } from '@/lib/motion';

type Props = {
  entries: ExperienceEntry[];
  activeIdx: number;
  activeSlug: string;
  progress: number;
};

export function CareerMobileHUD({ entries, activeIdx, activeSlug, progress }: Props) {
  const [visible, setVisible] = useState(false);
  const activeEntry = entries[activeIdx] ?? entries[0];

  useEffect(() => {
    const section = document.getElementById('experience');
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  if (!activeEntry) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="career-mobile-hud"
          initial={{ y: 100, opacity: 0, x: '-50%' }}
          animate={{ y: 0, opacity: 1, x: '-50%' }}
          exit={{ y: 100, opacity: 0, x: '-50%' }}
          transition={{ type: 'spring', damping: 24, stiffness: 280 }}
          style={{
            position: 'fixed',
            bottom: 28,
            left: '50%',
            zIndex: 200,
            width: 'min(360px, calc(100vw - 40px))',
            padding: '14px 18px 14px',
            borderRadius: 22,
            background: 'rgba(2, 6, 23, 0.78)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            border: '1px solid rgba(255,255,255,0.09)',
            boxShadow:
              '0 0 0 1px rgba(34,211,238,0.14), inset 0 1px 0 rgba(255,255,255,0.07), 0 24px 64px rgba(0,0,0,0.65), 0 0 80px rgba(34,211,238,0.05)',
          }}
        >
          {/* Company + counter */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ minWidth: 0, flex: 1, overflow: 'hidden' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22, ease: EASE }}
                >
                  <span style={{
                    display: 'block',
                    fontFamily: 'var(--font-geist-mono, ui-monospace)',
                    fontSize: 10,
                    letterSpacing: '0.09em',
                    textTransform: 'uppercase',
                    color: '#22d3ee',
                    marginBottom: 3,
                  }}>
                    {activeEntry.company}
                  </span>
                  <span style={{
                    display: 'block',
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#fff',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {activeEntry.title}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            <span style={{
              fontFamily: 'var(--font-geist-mono, ui-monospace)',
              fontSize: 11,
              color: '#475569',
              letterSpacing: '0.04em',
              flexShrink: 0,
              marginLeft: 16,
            }}>
              {activeIdx + 1}&thinsp;/&thinsp;{entries.length}
            </span>
          </div>

          {/* Progress bar */}
          <div style={{
            height: 2,
            background: 'rgba(255,255,255,0.06)',
            borderRadius: 2,
            overflow: 'hidden',
            marginBottom: 12,
          }}>
            <motion.div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #22d3ee, #a78bfa)',
                borderRadius: 2,
                boxShadow: '0 0 8px rgba(34,211,238,0.6)',
              }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.45, ease: EASE }}
            />
          </div>

          {/* Dots — pill actif, cercle inactif */}
          <div style={{ display: 'flex', gap: 5, justifyContent: 'center', alignItems: 'center' }}>
            {entries.map((e, i) => (
              <motion.div
                key={e.slug}
                animate={{
                  width: i === activeIdx ? 20 : 5,
                  background: i === activeIdx ? '#22d3ee' : 'rgba(255,255,255,0.12)',
                  boxShadow: i === activeIdx ? '0 0 8px rgba(34,211,238,0.7)' : 'none',
                }}
                transition={{ duration: 0.35, ease: EASE }}
                style={{ height: 5, borderRadius: 3 }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
