"use client";

import { motion } from "framer-motion";

import { BentoCell } from "@/components/skills/BentoCell";
import { skillCategories } from "@/data/skills";

export function SkillsSection() {
  return (
    <section
      id="skills"
      aria-label="Section Compétences"
      className="relative isolate overflow-hidden px-4 py-20 sm:px-6 md:px-10 md:py-28 lg:px-16"
    >
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute left-1/2 top-32 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-500/[0.07] blur-[130px]" />
      <div className="pointer-events-none absolute right-[10%] top-1/3 h-72 w-72 rounded-full bg-violet-500/[0.07] blur-[140px]" />
      <div className="pointer-events-none absolute bottom-16 left-[8%] h-64 w-64 rounded-full bg-blue-500/[0.06] blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* En-tête — aligné à gauche, style éditorial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl md:text-5xl">
            Compétences
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-400 md:text-lg">
            Technologies et domaines que j&apos;utilise pour construire,
            déployer et maintenir des applications modernes.
          </p>
        </motion.div>

        {/*
          Bento grid asymétrique — desktop 3 colonnes, 2 rangées :
          ┌──────────────────────┬───────────────┐
          │  Frontend (2 col)    │  Infra (tall) │
          ├──────────┬───────────┤               │
          │  Backend │  Support  │               │
          └──────────┴───────────┴───────────────┘
        */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:[grid-template-rows:minmax(240px,auto)_minmax(200px,auto)]">
          {/* Frontend — grande cellule (2 col sur lg) */}
          <BentoCell
            category={skillCategories[0]}
            index={0}
            className="min-h-[220px] md:col-span-2 lg:col-span-2 lg:col-start-1 lg:row-start-1"
          />

          {/* Infrastructure — cellule tall (2 rangées sur lg) */}
          <BentoCell
            category={skillCategories[2]}
            index={1}
            className="min-h-[220px] lg:col-start-3 lg:row-start-1 lg:row-span-2"
          />

          {/* Backend */}
          <BentoCell
            category={skillCategories[1]}
            index={2}
            className="min-h-[200px] lg:col-start-1 lg:row-start-2"
          />

          {/* Support IT */}
          <BentoCell
            category={skillCategories[3]}
            index={3}
            className="min-h-[200px] lg:col-start-2 lg:row-start-2"
          />
        </div>
      </div>
    </section>
  );
}
