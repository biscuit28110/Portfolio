'use client';

import { BlobBg } from '@/components/ui/BlobBg';
import { GradientText } from '@/components/ui/GradientText';
import { ContactForm } from '@/components/contact/ContactForm';

export default function Contact() {
  return (
    <section
      id="contact"
      style={{ padding: 'clamp(100px, 10vw, 140px) 0', position: 'relative', overflow: 'hidden' }}
    >
      <BlobBg blobs={[
        { color: 'cyan',   size: 600, top: '-100px', left: '-200px',  opacity: 0.07 },
        { color: 'violet', size: 500, bottom: '-150px', right: '-150px', opacity: 0.06 },
      ]} />

      <div
        style={{
          maxWidth: 780,
          margin: '0 auto',
          padding: '0 clamp(20px, 4vw, 56px)',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Mono label */}
        <div
          style={{
            fontFamily: 'var(--font-geist-mono, ui-monospace)',
            fontSize: 11,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#64748b',
            marginBottom: 28,
          }}
        >
          05 — Discutons
        </div>

        {/* H2 */}
        <h2
          style={{
            fontWeight: 600,
            fontSize: 'clamp(36px, 5.5vw, 80px)',
            lineHeight: 1.0,
            letterSpacing: '-0.04em',
            marginBottom: 48,
            background: 'linear-gradient(180deg, #fff 0%, #fff 30%, #94a3b8 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          On{' '}
          <GradientText>construit</GradientText>
          <br />
          quelque chose
          <br />
          ensemble ?
        </h2>

        {/* Form */}
        <ContactForm />
      </div>
    </section>
  );
}
