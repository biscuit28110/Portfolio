'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ProjectEntry } from '@/data/projects';
import { BrowserFrame } from '@/components/ui/BrowserFrame';

// ─── Deck-flip variants — mobile/tablette uniquement ───────────────────────

const makeCardV = (dir: number) => ({
  hidden: { rotateY: dir, scale: 0.88, opacity: 0 },
  visible: {
    rotateY: 0, scale: 1, opacity: 1,
    transition: { type: 'spring' as const, stiffness: 60, damping: 16 },
  },
});

const textColV = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.28 } },
};

const itemV = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1, y: 0,
    transition: { type: 'spring' as const, stiffness: 110, damping: 20 },
  },
};

const imageV = {
  hidden: { opacity: 0, scale: 0.93, y: 28 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { type: 'spring' as const, stiffness: 70, damping: 17, delay: 0.36 },
  },
};

function useIsMobile() {
  const [mob, setMob] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 960px)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 960px)');
    const h = (e: MediaQueryListEvent) => setMob(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);
  return mob;
}

// ───────────────────────────────────────────────────────────────────────────

type ProjectSceneProps = {
  project: ProjectEntry;
  index: number;
  total: number;
};

export function ProjectScene({ project, index, total }: ProjectSceneProps) {
  const mob = useIsMobile();
  const { accent } = project;
  const sceneNum = String(index).padStart(2, '0');
  const urlDisplay = project.liveUrl.replace(/^https?:\/\//, '');

  // Alternance gauche/droite pour l'effet "jeu de cartes retourné"
  const flipDir = index % 2 === 0 ? 85 : -85;
  const cardVariants = makeCardV(flipDir);

  // Stat Type — tronqué au premier séparateur (/ ou ·) pour éviter les débordements
  const typeShort = project.type.split(/[/·]/)[0].trim();

  return (
    <div
      id={`scene-${project.slug}`}
      className="proj-scene"
      style={{
        position: 'sticky',
        top: 0,
        minHeight: '100vh',
        padding: '80px 0',
        display: 'flex',
        alignItems: 'center',
        background: '#020617',
        isolation: 'isolate',
        zIndex: 1,
      }}
    >
      {/* Wrapper décoratif — overflow: hidden (compatible iOS Safari, remplace clip) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        {/* Gradient d'ambiance par scène */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(ellipse 60% 50% at 80% 30%, color-mix(in oklab, ${accent.primary} 12%, transparent), transparent 60%),
              radial-gradient(ellipse 50% 40% at 20% 80%, color-mix(in oklab, ${accent.secondary} 8%, transparent), transparent 60%)
            `,
            opacity: 0.7,
          }}
        />

        {/* Watermark — masqué sous 960px via globals.css */}
        <div
          className="proj-watermark"
          style={{
            position: 'absolute',
            right: 0,
            bottom: '-10vh',
            fontSize: 'clamp(120px, 30vw, 520px)',
            lineHeight: 0.8,
            fontWeight: 800,
            color: 'rgba(255,255,255,0.025)',
            letterSpacing: '-0.06em',
            userSelect: 'none',
            pointerEvents: 'none',
            fontFamily: 'var(--font-geist-mono, ui-monospace)',
          }}
        >
          {sceneNum}
        </div>
      </div>

      {/* Compteur mobile — visibility via globals.css */}
      <motion.div
        className="proj-mobile-counter"
        variants={mob ? itemV : undefined}
        initial={mob ? 'hidden' : false}
        whileInView={mob ? 'visible' : undefined}
        viewport={{ once: true, amount: 0.3 }}
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 'var(--maxw, 1280px)',
          margin: '0 auto',
          padding: '0 clamp(20px, 4vw, 56px)',
          width: '100%',
          marginBottom: 24,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ display: 'block', width: 20, height: 1, background: accent.primary, flexShrink: 0 }} />
          <span style={{
            fontFamily: 'var(--font-geist-mono, ui-monospace)',
            fontSize: 11,
            letterSpacing: '0.08em',
            textTransform: 'uppercase' as const,
            color: '#64748b',
          }}>
            {String(index).padStart(2, '0')}&thinsp;/&thinsp;{String(total).padStart(2, '0')}
          </span>
        </div>
      </motion.div>

      {/* Grille de contenu — deck flip sur mobile/tablette */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 'var(--maxw, 1280px)',
          margin: '0 auto',
          padding: '0 clamp(20px, 4vw, 56px)',
          width: '100%',
          display: 'grid',
          alignItems: 'center',
          ...(mob ? { transformPerspective: 1400 } : {}),
        }}
        className="proj-scene__grid"
        variants={mob ? cardVariants : undefined}
        initial={mob ? 'hidden' : false}
        whileInView={mob ? 'visible' : undefined}
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Colonne texte — stagger parent sur mobile */}
        <motion.div className="proj-text-col" variants={mob ? textColV : undefined}>

          {/* Badge */}
          <motion.div
            variants={mob ? itemV : undefined}
            style={{
              fontFamily: 'var(--font-geist-mono, ui-monospace)',
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase' as const,
              fontWeight: 600,
              color: accent.primary,
              marginBottom: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span style={{ display: 'block', width: 24, height: 1, background: accent.primary }} />
            {project.badge}
          </motion.div>

          {/* Titre */}
          <motion.h3
            variants={mob ? itemV : undefined}
            style={{
              fontWeight: 700,
              fontSize: 'clamp(28px, 4.5vw, 72px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.0,
              color: '#fff',
              marginBottom: 20,
            }}
          >
            {project.title.split(' ').map((word, wi) => {
              const isLast = wi === project.title.split(' ').length - 1;
              return isLast ? (
                <span
                  key={wi}
                  style={{
                    background: `linear-gradient(135deg, ${accent.primary}, ${accent.secondary})`,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {word}
                </span>
              ) : (
                <span key={wi}>{word} </span>
              );
            })}
          </motion.h3>

          {/* Type */}
          <motion.p
            variants={mob ? itemV : undefined}
            style={{
              fontFamily: 'var(--font-geist-mono, ui-monospace)',
              fontSize: 13,
              color: '#94a3b8',
              borderLeft: `2px solid ${accent.primary}`,
              paddingLeft: 16,
              marginBottom: 20,
              lineHeight: 1.5,
            }}
          >
            {project.type}
          </motion.p>

          {/* Description */}
          <motion.p
            variants={mob ? itemV : undefined}
            style={{
              fontSize: 16,
              lineHeight: 1.65,
              color: '#cbd5e1',
              maxWidth: '52ch',
              marginBottom: 28,
            }}
          >
            {project.summary}
          </motion.p>

          {/* Stats row */}
          <motion.div
            variants={mob ? itemV : undefined}
            style={{
              display: 'flex',
              gap: 0,
              marginBottom: 24,
              borderTop: '1px solid rgba(255,255,255,0.06)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {[
              { label: 'Année',  value: project.year },
              { label: 'Type',   value: typeShort },
              { label: 'Statut', value: project.status === 'wip' ? 'En cours' : 'En ligne' },
            ].map(({ label, value }, i, arr) => (
              <div
                key={label}
                className="proj-stat-cell"
                style={{
                  flex: 1,
                  padding: '14px 16px',
                  borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  overflow: 'hidden',
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-geist-mono, ui-monospace)',
                  fontSize: 10.5,
                  color: '#64748b',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: 4,
                }}>
                  {label}
                </div>
                <div
                  className="proj-stat-value"
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: '#fff',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {value}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Stack chips */}
          <motion.div
            variants={mob ? itemV : undefined}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}
          >
            {project.stack.map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: 'var(--font-geist-mono, ui-monospace)',
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  padding: '5px 11px',
                  borderRadius: 6,
                  border: '1px solid rgba(255,255,255,0.10)',
                  color: '#94a3b8',
                  background: 'rgba(255,255,255,0.03)',
                }}
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={mob ? itemV : undefined}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
          >
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '13px 22px',
                minHeight: 44,
                borderRadius: 999,
                background: `linear-gradient(135deg, ${accent.primary}, ${accent.secondary})`,
                color: '#020617',
                fontWeight: 600,
                fontSize: 14,
                textDecoration: 'none',
                boxShadow: `0 12px 32px -8px ${accent.primary}60`,
                transition: 'transform 250ms ease, box-shadow 250ms ease',
              }}
              onPointerEnter={(e) => {
                if (e.pointerType !== 'mouse') return;
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(-2px)';
                el.style.boxShadow = `0 20px 48px -8px ${accent.secondary}60`;
              }}
              onPointerLeave={(e) => {
                if (e.pointerType !== 'mouse') return;
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = `0 12px 32px -8px ${accent.primary}60`;
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Voir le site
            </a>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '13px 22px',
                  minHeight: 44,
                  borderRadius: 999,
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#fff',
                  fontWeight: 500,
                  fontSize: 14,
                  textDecoration: 'none',
                  transition: 'border-color 250ms ease, background 250ms ease',
                }}
                onPointerEnter={(e) => {
                  if (e.pointerType !== 'mouse') return;
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = `${accent.primary}50`;
                  el.style.background = `${accent.primary}0a`;
                }}
                onPointerLeave={(e) => {
                  if (e.pointerType !== 'mouse') return;
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'rgba(255,255,255,0.12)';
                  el.style.background = 'transparent';
                }}
              >
                GitHub
              </a>
            )}
          </motion.div>
        </motion.div>

        {/* Colonne image — scale-in décalé sur mobile */}
        <motion.div
          className="proj-browser-wrap proj-image-col"
          variants={mob ? imageV : undefined}
          onPointerEnter={(e) => {
            if (e.pointerType !== 'mouse') return;
            const frame = e.currentTarget.querySelector('.browser-frame') as HTMLElement | null;
            if (frame) {
              frame.style.transform = 'perspective(2000px) rotateY(0) rotateX(0) translateY(-6px)';
              frame.style.boxShadow = `0 60px 120px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06), 0 0 60px -10px ${accent.primary}30`;
            }
          }}
          onPointerLeave={(e) => {
            if (e.pointerType !== 'mouse') return;
            const frame = e.currentTarget.querySelector('.browser-frame') as HTMLElement | null;
            if (frame) {
              frame.style.transform = 'perspective(2000px) rotateY(-3deg) rotateX(2deg)';
              frame.style.boxShadow = '0 50px 100px -20px rgba(0,0,0,0.6), 0 25px 50px -15px rgba(0,0,0,0.4)';
            }
          }}
        >
          <BrowserFrame
            url={urlDisplay}
            accent={accent.primary}
            wip={project.status === 'wip'}
            tilt
          >
            {project.desktopImage ? (
              <Image
                src={project.desktopImage}
                alt={`Screenshot ${project.title}`}
                fill
                sizes="(max-width: 960px) 100vw, 60vw"
                style={{ objectFit: 'cover', objectPosition: 'top' }}
                priority={index <= 2}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: `linear-gradient(135deg, ${accent.primary}18, ${accent.secondary}12)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-geist-mono, ui-monospace)',
                  fontSize: 11,
                  color: '#64748b',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}>
                  Aperçu bientôt disponible
                </span>
              </div>
            )}
          </BrowserFrame>
        </motion.div>
      </motion.div>
    </div>
  );
}
