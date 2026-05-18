"use client";

import { motion } from "framer-motion";
import { EducationCard } from "@/components/experience/EducationCard";
import { ExperienceCard } from "@/components/experience/ExperienceCard";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education, experiences } from "@/data/experience";
import { fadeUp } from "@/lib/motion";

export function ExperienceSection() {
  return (
    <SectionWrapper id="experience" ariaLabel="Section Parcours professionnel" ambient="violet-cyan">
      <div className="mx-auto max-w-6xl space-y-12">
        <SectionHeading
          eyebrow="Career path"
          title="Parcours"
          description="Un parcours entre support, déploiement, infrastructure et développement, avec une approche très opérationnelle du terrain."
        />

        <div className="space-y-4">
          {experiences.map((item, index) => (
            <ExperienceCard key={item.slug} item={item} index={index} />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            {...fadeUp(0)}
            className="rounded-2xl border border-white/8 bg-white/[0.03] p-6 sm:p-8"
          >
            <p className="text-[11px] font-semibold tracking-[0.28em] text-slate-500 uppercase">Lecture du parcours</p>
            <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">
              Un profil transverse entre IT, support et produit
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Mon parcours relie assistance utilisateur, diagnostic, réseau, déploiement,
              exploitation et conception web. Cette polyvalence me permet d&apos;intervenir
              autant sur l&apos;usage concret d&apos;un outil que sur sa qualité technique,
              sa mise en production et sa fiabilité.
            </p>
          </motion.div>

          <div className="grid gap-4">
            {education.map((item, index) => (
              <EducationCard key={item.slug} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
