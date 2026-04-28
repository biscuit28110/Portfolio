"use client";

import type { ReactNode } from "react";

import { motion } from "framer-motion";

import type { SkillCategory } from "@/data/skills";

/* ------------------------------------------------------------------ */
/* Icônes SVG inline par catégorie                                      */
/* ------------------------------------------------------------------ */
const icons: Record<SkillCategory["iconKey"], ReactNode> = {
  code: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  server: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <circle cx="6" cy="6" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="6" cy="18" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  ),
  cloud: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 16 12 12 8 16" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </svg>
  ),
  headset: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
      <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  ),
};

/* ------------------------------------------------------------------ */

type BentoCellProps = {
  category: SkillCategory;
  index: number;
  className?: string;
};

export function BentoCell({ category, index, className = "" }: BentoCellProps) {
  const { accentColor } = category;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        delay: index * 0.09,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      whileHover={{ y: -4, transition: { duration: 0.22, ease: "easeOut" } }}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-slate-950/80 backdrop-blur-2xl ${className}`}
    >
      {/* Ligne accent supérieure */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}80, transparent)`,
        }}
      />

      {/* Reflet haut-gauche (signature 21st.dev) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.055) 0%, transparent 35%)",
        }}
      />

      {/* Glow au hover en accent color */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${accentColor}18, transparent 65%)`,
        }}
      />

      {/* Contenu */}
      <div className="relative z-10 flex h-full flex-col p-6 md:p-7">
        {/* En-tête : titre + icône */}
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold tracking-tight text-white sm:text-lg">
              {category.title}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">
              {category.description}
            </p>
          </div>

          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
            style={{
              backgroundColor: `${accentColor}14`,
              border: `1px solid ${accentColor}30`,
              color: accentColor,
            }}
          >
            {icons[category.iconKey]}
          </div>
        </div>

        {/* Caption */}
        <p className="mb-5 text-xs leading-5 text-slate-500">{category.caption}</p>

        {/* Skills — chips monospace minimalistes */}
        <div className="mt-auto flex flex-wrap gap-2">
          {category.skills.map((skill) => (
            <span
              key={skill}
              className="inline-block rounded-lg border border-white/[0.07] bg-white/[0.04] px-2.5 py-[5px] font-mono text-[11px] text-slate-300 transition-colors duration-200 group-hover:border-white/[0.11] group-hover:text-slate-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
