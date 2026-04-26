"use client";

import { motion } from "framer-motion";

import { EducationCard } from "@/components/experience/EducationCard";
import { ExperienceCard } from "@/components/experience/ExperienceCard";
import { education, experiences } from "@/data/experience";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-label="Section Parcours professionnel"
      className="relative isolate overflow-hidden px-4 py-20 sm:px-6 md:px-10 md:py-24 lg:px-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.1),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.08),transparent_30%),linear-gradient(180deg,rgba(2,6,23,0.96),rgba(2,6,23,1))]" />
      <div className="skills-noise-overlay pointer-events-none absolute inset-0 opacity-25" />
      <div className="pointer-events-none absolute left-[8%] top-24 h-80 w-80 rounded-full bg-violet-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute right-[8%] bottom-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl space-y-14">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="mb-5 inline-flex max-w-full rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-medium tracking-[0.24em] text-slate-300 uppercase backdrop-blur-xl sm:text-[11px] sm:tracking-[0.32em]">
            Career path
          </span>
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl md:text-5xl">
            Parcours professionnel
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
            Un parcours entre support, deploiement, infrastructure, relation
            utilisateur et developpement, avec une approche tres operationnelle
            du terrain comme du produit.
          </p>
        </motion.div>

        <div className="space-y-6">
          {experiences.map((item, index) => (
            <ExperienceCard key={item.slug} item={item} index={index} />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl sm:p-7"
          >
            <p className="text-[11px] font-semibold tracking-[0.28em] text-slate-500 uppercase">
              Lecture du parcours
            </p>
            <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">
              Un profil transverse entre IT, support et produit
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Mon parcours relie assistance utilisateur, diagnostic, reseau,
              deploiement, exploitation et conception web. Cette polyvalence me
              permet d&apos;intervenir autant sur l&apos;usage concret d&apos;un
              outil que sur sa qualite technique, sa mise en production et sa
              fiabilite.
            </p>
          </motion.div>

          <div className="grid gap-4">
            {education.map((item, index) => (
              <EducationCard key={item.slug} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
