'use client';

import Image from 'next/image';
import { ProjectEntry } from '@/data/projects';
import { BrowserFrame } from '@/components/ui/BrowserFrame';

type ProjectSceneProps = {
  project: ProjectEntry;
  index: number;
  total: number;
};

export function ProjectScene({ project, index, total }: ProjectSceneProps) {
  const { accent } = project;
  const sceneNum = String(index).padStart(2, '0');
  const urlDisplay = project.liveUrl.replace(/^https?:\/\//, '');

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
        overflow: 'hidden',
        isolation: 'isolate',
        zIndex: 1,
      }}
    >
      {/* Per-scene background gradient */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background: `
            radial-gradient(ellipse 60% 50% at 80% 30%, color-mix(in oklab, ${accent.primary} 12%, transparent), transparent 60%),
            radial-gradient(ellipse 50% 40% at 20% 80%, color-mix(in oklab, ${accent.secondary} 8%, transparent), transparent 60%)
          `,
          opacity: 0.7,
        }}
      />

      {/* Giant watermark number */}
      <div
        aria-hidden="true"
        className="proj-watermark"
        style={{
          position: 'absolute',
          right: '-3vw',
          bottom: '-12vh',
          fontSize: 'clamp(120px, 30vw, 520px)',
          lineHeight: 0.8,
          fontWeight: 800,
          color: 'rgba(255,255,255,0.025)',
          letterSpacing: '-0.06em',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 0,
          fontFamily: 'var(--font-geist-mono, ui-monospace)',
        }}
      >
        {sceneNum}
      </div>

      {/* Compteur mobile — caché sur desktop */}
      <div
        className="proj-mobile-counter"
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 'var(--maxw, 1280px)',
          margin: '0 auto',
          padding: '0 clamp(20px, 4vw, 56px)',
          width: '100%',
          marginBottom: 24,
          display: 'none',
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
      </div>

      {/* Content grid */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 'var(--maxw, 1280px)',
          margin: '0 auto',
          padding: '0 clamp(20px, 4vw, 56px)',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '0.95fr 1.35fr',
          gap: 64,
          alignItems: 'center',
        }}
        className="proj-scene__grid"
      >
        {/* Text column */}
        <div className="proj-text-col">
          {/* Badge */}
          <div
            style={{
              fontFamily: 'var(--font-geist-mono, ui-monospace)',
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
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
          </div>

          {/* Title */}
          <h3
            style={{
              fontWeight: 700,
              fontSize: 'clamp(40px, 4.5vw, 72px)',
              letterSpacing: '-0.04em',
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
          </h3>

          {/* Type mono */}
          <p
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
          </p>

          {/* Description */}
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.65,
              color: '#cbd5e1',
              maxWidth: '52ch',
              marginBottom: 28,
            }}
          >
            {project.summary}
          </p>

          {/* Stats row */}
          <div
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
              { label: 'Type',   value: project.type.split('/')[0].trim() },
              { label: 'Statut', value: project.status === 'wip' ? 'En cours' : 'En ligne' },
            ].map(({ label, value }, i, arr) => (
              <div
                key={label}
                style={{
                  flex: 1,
                  padding: '14px 16px',
                  borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                }}
              >
                <div style={{ fontFamily: 'var(--font-geist-mono, ui-monospace)', fontSize: 10.5, color: '#64748b', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>
                  {label}
                </div>
                <div style={{ fontSize: 18, fontWeight: 600, color: '#fff' }}>{value}</div>
              </div>
            ))}
          </div>

          {/* Stack chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
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
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '13px 22px',
                borderRadius: 999,
                background: `linear-gradient(135deg, ${accent.primary}, ${accent.secondary})`,
                color: '#020617',
                fontWeight: 600,
                fontSize: 14,
                textDecoration: 'none',
                boxShadow: `0 12px 32px -8px ${accent.primary}60`,
                transition: 'transform 250ms ease, box-shadow 250ms ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(-2px)';
                el.style.boxShadow = `0 20px 48px -8px ${accent.secondary}60`;
              }}
              onMouseLeave={(e) => {
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
                  borderRadius: 999,
                  border: `1px solid rgba(255,255,255,0.12)`,
                  color: '#fff',
                  fontWeight: 500,
                  fontSize: 14,
                  textDecoration: 'none',
                  transition: 'border-color 250ms ease, background 250ms ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = `${accent.primary}50`;
                  el.style.background = `${accent.primary}0a`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'rgba(255,255,255,0.12)';
                  el.style.background = 'transparent';
                }}
              >
                GitHub
              </a>
            )}
          </div>
        </div>

        {/* Browser frame column */}
        <div
          className="proj-browser-wrap proj-image-col"
          onMouseEnter={(e) => {
            const frame = e.currentTarget.querySelector('.browser-frame') as HTMLElement | null;
            if (frame) {
              frame.style.transform = 'perspective(2000px) rotateY(0) rotateX(0) translateY(-6px)';
              frame.style.boxShadow = `0 60px 120px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06), 0 0 60px -10px ${accent.primary}30`;
            }
          }}
          onMouseLeave={(e) => {
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
                <span style={{ fontFamily: 'var(--font-geist-mono, ui-monospace)', fontSize: 11, color: '#64748b', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Aperçu bientôt disponible
                </span>
              </div>
            )}
          </BrowserFrame>
        </div>
      </div>
    </div>
  );
}
