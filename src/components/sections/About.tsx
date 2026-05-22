'use client';

import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import { BlobBg } from '@/components/ui/BlobBg';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GradientText } from '@/components/ui/GradientText';
import { useEffect, useRef, useState } from 'react';

function useCounter(target: number, suffix: string, trigger: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const duration = 1200;
    const step = Math.max(Math.ceil(duration / (target * 16)), 1);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + 1, target);
      setCount(current);
      if (current >= target) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [target, trigger]);
  return `${count}${suffix}`;
}

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [triggered, setTriggered] = useState(false);
  const display = useCounter(value, suffix, triggered);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTriggered(true); }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <span ref={ref}>{display}</span>;
}

const INFO = [
  { dt: 'Basé à',        dd: 'Paris · France' },
  { dt: 'Statut',        dd: 'CDI · Freelance' },
  { dt: 'Langues',       dd: 'Français · Anglais' },
  { dt: 'Disponibilité', dd: 'Immédiate' },
];

export default function About() {
  return (
    <section
      id="about"
      style={{ padding: 'clamp(100px, 10vw, 140px) 0', position: 'relative', overflow: 'hidden' }}
    >
      <BlobBg blobs={[
        { color: 'cyan',   size: 600, top: '-100px',    left: '-200px',  opacity: 0.07 },
        { color: 'violet', size: 500, bottom: '-200px', right: '-150px', opacity: 0.06 },
      ]} />

      {/* Container principal — 2 colonnes sur xl, centré sur mobile/tablette */}
      <div
        className="about-outer"
        style={{
          maxWidth: 'var(--maxw, 1280px)',
          margin: '0 auto',
          padding: '0 clamp(20px, 4vw, 56px)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div className="about-layout">
          {/* Colonne gauche — heading + bio */}
          <div className="about-col-left">
            <SectionHeading
              mono="01 — À propos"
              title={<>Développer, <GradientText>former</GradientText>,<br />diagnostiquer.</>}
              align="center"
            />

            <motion.div {...fadeUp(0.1)}>
              {/* Bio */}
              <div style={{ maxWidth: '58ch', margin: '0 auto' }}>
                <p style={{ fontSize: 'clamp(15px, 1.1vw, 17px)', lineHeight: 1.65, color: '#cbd5e1', marginBottom: '1.2em' }}>
                  Actuellement{' '}
                  <strong style={{ color: '#fff', fontWeight: 500 }}>
                    Formateur logiciel & Hotliner chez Turboself
                  </strong>,
                  j&apos;ai construit mon parcours entre{' '}
                  <GradientText>développement web et support informatique terrain</GradientText>.
                  Cette combinaison m&apos;a appris à autant construire des solutions qu&apos;à les expliquer et les maintenir.
                </p>
                <p style={{ fontSize: 'clamp(15px, 1.1vw, 17px)', lineHeight: 1.65, color: '#cbd5e1' }}>
                  Pédagogie, rigueur technique et sens du diagnostic — trois réflexes que j&apos;applique aussi bien en formation qu&apos;en développement.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Colonne droite — infos + CV + stats */}
          <motion.div {...fadeUp(0.2)} className="about-col-right">
            {/* Info list */}
            <dl
              className="about-info-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '20px 28px',
                paddingTop: 28,
                borderTop: '1px solid rgba(255,255,255,0.08)',
                textAlign: 'left',
              }}
            >
              {INFO.map(({ dt, dd }) => (
                <div key={dt}>
                  <dt style={{ fontFamily: 'var(--font-geist-mono, ui-monospace)', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#64748b', marginBottom: 6 }}>
                    {dt}
                  </dt>
                  <dd style={{ fontSize: 15, color: '#fff', margin: 0 }}>{dd}</dd>
                </div>
              ))}
            </dl>

            {/* CV button */}
            <a
              href="/assets/cv/tt-cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginTop: 28,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                padding: '14px 22px',
                border: '1px solid rgba(255,255,255,0.10)',
                borderRadius: 14,
                fontSize: 14,
                color: '#fff',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                textDecoration: 'none',
                transition: 'border-color 250ms ease, box-shadow 250ms ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(34,211,238,0.35)';
                el.style.boxShadow = '0 12px 40px -8px rgba(34,211,238,0.2)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(255,255,255,0.10)';
                el.style.boxShadow = 'none';
              }}
            >
              <span
                style={{
                  display: 'flex',
                  width: 34,
                  height: 34,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  background: 'rgba(34,211,238,0.10)',
                  border: '1px solid rgba(34,211,238,0.20)',
                  color: '#22d3ee',
                  flexShrink: 0,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </span>
              <span>
                Télécharger le CV — PDF
                <small style={{ color: '#64748b', fontFamily: 'var(--font-geist-mono, ui-monospace)', fontSize: 11, display: 'block' }}>
                  Mis à jour 2025
                </small>
              </span>
            </a>

            {/* Stats */}
            <div
              className="about-stats"
              style={{
                marginTop: 36,
                display: 'flex',
                justifyContent: 'center',
                gap: 48,
                flexWrap: 'wrap',
                paddingTop: 28,
                borderTop: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {[
                { value: 3, suffix: '+', label: "Années d'exp." },
                { value: 5, suffix: '+', label: 'Projets livrés' },
                { value: 1, suffix: '',  label: 'Poste actuel' },
              ].map(({ value, suffix, label }) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 700, lineHeight: 1, color: '#fff', letterSpacing: '-0.03em' }}>
                    <GradientText>
                      <AnimatedCounter value={value} suffix={suffix} />
                    </GradientText>
                  </div>
                  <div style={{ marginTop: 6, fontSize: 12, color: '#64748b', fontFamily: 'var(--font-geist-mono, ui-monospace)', letterSpacing: '0.04em' }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
