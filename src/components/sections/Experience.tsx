'use client';

import { BlobBg } from '@/components/ui/BlobBg';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GradientText } from '@/components/ui/GradientText';
import { CareerMap } from '@/components/career/CareerMap';
import { experiences } from '@/data/experience';

export default function Experience() {
  return (
    <section
      id="experience"
      style={{ padding: 'clamp(100px, 10vw, 140px) 0', position: 'relative', overflowX: 'clip' }}
    >
      <BlobBg blobs={[
        { color: 'violet', size: 520, top: '10%',   right: '-180px', opacity: 0.06 },
        { color: 'cyan',   size: 480, bottom: '0',  left: '-200px',  opacity: 0.05 },
      ]} />

      <div
        style={{
          maxWidth: 'var(--maxw, 1280px)',
          margin: '0 auto',
          padding: '0 clamp(20px, 4vw, 56px)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <SectionHeading
          mono="02 — Parcours"
          title={<>De la technique<br />au <GradientText>terrain</GradientText>.</>}
          accent="#a78bfa"
        />

        <CareerMap entries={experiences} />
      </div>
    </section>
  );
}
