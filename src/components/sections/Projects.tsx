'use client';

import { BlobBg } from '@/components/ui/BlobBg';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GradientText } from '@/components/ui/GradientText';
import { ProjectsStack } from '@/components/projects/ProjectsStack';

export default function Projects() {
  return (
    <section
      id="projects"
      style={{ paddingTop: 'clamp(100px, 10vw, 140px)', position: 'relative' }}
    >
      <BlobBg blobs={[
        { color: 'blue',   size: 520, top: '0',    left: '-160px',  opacity: 0.06 },
        { color: 'emerald', size: 400, top: '20%', right: '-140px', opacity: 0.05 },
      ]} />

      {/* Section heading — visible uniquement desktop (les scènes ont leur propre badge sur mobile) */}
      <div
        className="hidden min-[961px]:block"
        style={{
          maxWidth: 'var(--maxw, 1280px)',
          margin: '0 auto',
          padding: '0 clamp(20px, 4vw, 56px)',
          position: 'relative',
          zIndex: 1,
          marginBottom: 48,
        }}
      >
        <SectionHeading
          mono="04 — Projets"
          title={<>Des produits<br />qui <GradientText from="#60a5fa" to="#34d399">existent</GradientText>.</>}
          accent="#60a5fa"
        />
      </div>

      {/* Section heading mobile — compact, intégré dans le flux */}
      <div
        className="block min-[961px]:hidden"
        style={{
          maxWidth: 'var(--maxw, 1280px)',
          margin: '0 auto',
          padding: '0 clamp(20px, 4vw, 56px)',
          marginBottom: 40,
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 12,
        }}>
          <span style={{ width: 20, height: 1, background: '#60a5fa', display: 'block', flexShrink: 0 }} />
          <span style={{
            fontFamily: 'var(--font-geist-mono, ui-monospace)',
            fontSize: 11,
            letterSpacing: '0.06em',
            textTransform: 'uppercase' as const,
            color: '#64748b',
            fontWeight: 500,
          }}>04 — Projets</span>
        </div>
        <h2 style={{
          fontWeight: 600,
          fontSize: 'clamp(26px, 6vw, 36px)',
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          color: '#fff',
        }}>
          Des produits qui{' '}
          <GradientText from="#60a5fa" to="#34d399">existent</GradientText>.
        </h2>
      </div>

      {/* Cinematic stack — full bleed */}
      <ProjectsStack />
    </section>
  );
}
