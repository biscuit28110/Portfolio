'use client';

import { motion } from 'framer-motion';
import { ExperienceEntry } from '@/data/experience';
import { EASE } from '@/lib/motion';

type CareerCardProps = {
  entry: ExperienceEntry;
  id: string;
  immediate?: boolean;
};

const contractStyles: Record<string, { border: string; bg: string; color: string }> = {
  CDD:               { border: 'rgba(34,211,238,0.25)',  bg: 'rgba(34,211,238,0.08)',  color: '#22d3ee' },
  'Alternance / stage': { border: 'rgba(167,139,250,0.25)', bg: 'rgba(167,139,250,0.08)', color: '#a78bfa' },
  Mission:           { border: 'rgba(255,255,255,0.12)', bg: 'rgba(255,255,255,0.04)', color: '#94a3b8' },
};

/* Variants orchestrés — le parent déclenche la cascade sur les enfants */
const cardVariants = {
  hidden:   { opacity: 0, y: 32 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE, staggerChildren: 0.09, delayChildren: 0.06 } },
  exit:     { opacity: 0, y: -16, transition: { duration: 0.28, ease: EASE } },
};

const rowVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const highlightVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.42, ease: EASE } },
};

export function CareerCard({ entry, id, immediate = false }: CareerCardProps) {
  const contractStyle = contractStyles[entry.contract] ?? contractStyles['Mission'];

  return (
    <motion.article
      id={id}
      className="career-card"
      variants={cardVariants}
      initial="hidden"
      animate={immediate ? 'visible' : undefined}
      whileInView={!immediate ? 'visible' : undefined}
      viewport={!immediate ? { once: true, amount: 0.08 } : undefined}
      exit="exit"
      style={{
        padding: '64px 0',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        minHeight: '75vh',
        scrollMarginTop: 130,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* Header row: date + badges */}
      <motion.div
        variants={rowVariants}
        style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 3, height: 18, background: '#22d3ee', borderRadius: 2, display: 'block', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-geist-mono, ui-monospace)', fontSize: 12, color: '#64748b', letterSpacing: '0.04em' }}>
            {entry.period}
          </span>
        </span>

        {entry.current && (
          <span style={{
            padding: '6px 12px',
            borderRadius: 999,
            border: '1px solid rgba(52,211,153,0.25)',
            background: 'rgba(52,211,153,0.08)',
            color: '#34d399',
            fontSize: 12,
            fontWeight: 500,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 0 3px rgba(52,211,153,0.2)', animation: 'pulse-dot 2.4s ease-in-out infinite', display: 'block' }} />
            En poste
          </span>
        )}

        <span style={{
          padding: '6px 12px',
          borderRadius: 999,
          border: `1px solid ${contractStyle.border}`,
          background: contractStyle.bg,
          color: contractStyle.color,
          fontSize: 12,
          fontWeight: 500,
          fontFamily: 'var(--font-geist-mono, ui-monospace)',
          letterSpacing: '0.04em',
        }}>
          {entry.contract}
        </span>
      </motion.div>

      {/* Title */}
      <motion.h3
        variants={rowVariants}
        style={{
          fontWeight: 700,
          fontSize: 'clamp(24px, 3vw, 40px)',
          letterSpacing: '-0.035em',
          lineHeight: 1.08,
          color: '#fff',
          marginBottom: 8,
        }}
      >
        {entry.title}
      </motion.h3>

      {/* Company · Location */}
      <motion.p
        variants={rowVariants}
        style={{ fontSize: 15, color: '#64748b', marginBottom: 20, fontFamily: 'var(--font-geist-mono, ui-monospace)', letterSpacing: '0.02em' }}
      >
        {entry.company} · {entry.location}
      </motion.p>

      {/* Summary */}
      <motion.p
        variants={rowVariants}
        style={{ fontSize: 16, lineHeight: 1.65, color: '#cbd5e1', marginBottom: 24, maxWidth: '62ch' }}
      >
        {entry.summary}
      </motion.p>

      {/* Impact callout */}
      <motion.div
        variants={rowVariants}
        style={{
          marginBottom: 28,
          padding: '18px 22px',
          background: 'linear-gradient(135deg, rgba(34,211,238,0.06), rgba(139,92,246,0.04))',
          border: '1px solid rgba(34,211,238,0.18)',
          borderLeftWidth: 3,
          borderRadius: '0 10px 10px 0',
          maxWidth: '64ch',
        }}
      >
        <div style={{ fontFamily: 'var(--font-geist-mono, ui-monospace)', fontSize: 10.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#22d3ee', marginBottom: 8, fontWeight: 600 }}>
          → Impact
        </div>
        <p style={{ fontSize: 14.5, lineHeight: 1.6, color: '#cbd5e1', margin: 0 }}>
          {entry.impact}
        </p>
      </motion.div>

      {/* Highlights — stagger interne */}
      <motion.ul
        variants={listVariants}
        style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 10 }}
      >
        {entry.highlights.map((h, i) => (
          <motion.li
            key={i}
            variants={highlightVariants}
            style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22d3ee', boxShadow: '0 0 0 3px rgba(34,211,238,0.12)', display: 'block', marginTop: 7, flexShrink: 0 }} />
            <span style={{ fontSize: 14.5, lineHeight: 1.6, color: '#cbd5e1' }}>{h}</span>
          </motion.li>
        ))}
      </motion.ul>

      {/* Environment chips */}
      {entry.environment && entry.environment.length > 0 && (
        <motion.div
          variants={rowVariants}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}
        >
          <span style={{ fontFamily: 'var(--font-geist-mono, ui-monospace)', fontSize: 10.5, color: '#64748b', letterSpacing: '0.06em', textTransform: 'uppercase', alignSelf: 'center', marginRight: 4 }}>
            Env.
          </span>
          {entry.environment.map((env) => (
            <span
              key={env}
              style={{
                fontFamily: 'var(--font-geist-mono, ui-monospace)',
                fontSize: 11,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#94a3b8',
                padding: '5px 11px',
                borderRadius: 6,
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.025)',
              }}
            >
              {env}
            </span>
          ))}
        </motion.div>
      )}
    </motion.article>
  );
}
