"use client";

import { motion } from "framer-motion";

import { SkillCard } from "@/components/skills/SkillCard";
import { skillCategories } from "@/data/skills";

export function SkillsSection() {
  return (
    <section
      id="skills"
      aria-label="Section Compétences"
      className="skills-aurora-section relative isolate overflow-hidden px-4 py-20 sm:px-6 md:px-10 md:py-24 lg:px-16"
    >
      <div className="skills-noise-overlay pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

      <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-[8%] top-1/3 h-80 w-80 rounded-full bg-violet-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute left-[6%] bottom-16 h-72 w-72 rounded-full bg-blue-500/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.45 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-12 max-w-3xl text-center md:mb-16"
        >
          <span className="mb-5 inline-flex max-w-full rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-medium tracking-[0.24em] text-slate-300 uppercase backdrop-blur-xl sm:text-[11px] sm:tracking-[0.32em]">
            Product-grade stack
          </span>
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl md:text-5xl">
            Compétences
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
            Technologies et domaines que j&apos;utilise pour construire,
            déployer et maintenir des applications modernes
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
