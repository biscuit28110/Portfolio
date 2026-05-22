'use client';

import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import { GradientText } from '@/components/ui/GradientText';
import { ReactNode } from 'react';

type SectionHeadingProps = {
  mono: string;
  title: ReactNode;
  align?: 'left' | 'center';
  accent?: string;
};

export function SectionHeading({
  mono,
  title,
  align = 'left',
  accent = '#22d3ee',
}: SectionHeadingProps) {
  const isCenter = align === 'center';

  return (
    <motion.div
      {...fadeUp(0)}
      className={isCenter ? 'mx-auto text-center' : ''}
      style={{ marginBottom: 72 }}
    >
      {/* Mono label */}
      <div
        className="flex items-center gap-2.5 mb-5"
        style={{ justifyContent: isCenter ? 'center' : 'flex-start' }}
      >
        {!isCenter && (
          <span style={{ width: 24, height: 1, background: accent, display: 'block', flexShrink: 0 }} />
        )}
        <span
          style={{
            fontFamily: 'var(--font-geist-mono, ui-monospace)',
            fontSize: 11,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#64748b',
            fontWeight: 500,
          }}
        >
          {mono}
        </span>
      </div>

      {/* H2 */}
      <h2
        style={{
          fontWeight: 600,
          fontSize: 'clamp(32px, 4vw, 52px)',
          lineHeight: 1.02,
          letterSpacing: '-0.035em',
          color: '#fff',
          maxWidth: isCenter ? undefined : '16ch',
        }}
      >
        {title}
      </h2>
    </motion.div>
  );
}

export { GradientText };
