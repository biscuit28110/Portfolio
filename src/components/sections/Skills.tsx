'use client';

import { BlobBg } from '@/components/ui/BlobBg';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GradientText } from '@/components/ui/GradientText';
import { MarqueeBand } from '@/components/skills/MarqueeBand';
import { SkillsStatsFooter } from '@/components/skills/SkillsStatsFooter';
import { marqueeBands } from '@/data/skills';

export default function Skills() {
  return (
    <section
      id="skills"
      style={{ padding: 'clamp(100px, 10vw, 140px) 0', position: 'relative', overflow: 'hidden' }}
    >
      <BlobBg blobs={[
        { color: 'cyan',   size: 560, top: '-120px', right: '-160px', opacity: 0.06 },
        { color: 'violet', size: 480, bottom: '0',   left: '-180px',  opacity: 0.05 },
      ]} />

      {/* Heading inside container */}
      <div
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
          mono="03 — Compétences"
          title={<>Stack technique<br />& <GradientText>savoir-faire</GradientText>.</>}
          accent="#60a5fa"
        />
      </div>

      {/* Full-bleed marquees */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {marqueeBands.map((band) => (
          <MarqueeBand key={band.label} band={band} />
        ))}
      </div>

      {/* Stats footer inside container */}
      <div
        style={{
          maxWidth: 'var(--maxw, 1280px)',
          margin: '0 auto',
          padding: '0 clamp(20px, 4vw, 56px)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <SkillsStatsFooter />
      </div>
    </section>
  );
}
