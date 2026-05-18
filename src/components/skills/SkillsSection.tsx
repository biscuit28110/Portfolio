"use client";

import { motion } from "framer-motion";
import { BentoCell } from "@/components/skills/BentoCell";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillCategories } from "@/data/skills";

export function SkillsSection() {
  return (
    <SectionWrapper id="skills" ariaLabel="Section Compétences" ambient="violet-cyan">
      <div className="mx-auto max-w-6xl space-y-12">
        <SectionHeading
          eyebrow="Stack technique"
          title="Compétences"
          description="Technologies et domaines que j'utilise pour construire, déployer et maintenir des applications modernes."
        />

        {/*
          Bento grid asymétrique — desktop 3 colonnes, 2 rangées :
          ┌──────────────────────┬───────────────┐
          │  Frontend (2 col)    │  Infra (tall) │
          ├──────────┬───────────┤               │
          │  Backend │  Support  │               │
          └──────────┴───────────┴───────────────┘
        */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:[grid-template-rows:minmax(240px,auto)_minmax(200px,auto)]">
          <BentoCell
            category={skillCategories[0]}
            index={0}
            className="min-h-[220px] md:col-span-2 lg:col-span-2 lg:col-start-1 lg:row-start-1"
          />
          <BentoCell
            category={skillCategories[2]}
            index={1}
            className="min-h-[220px] lg:col-start-3 lg:row-start-1 lg:row-span-2"
          />
          <BentoCell
            category={skillCategories[1]}
            index={2}
            className="min-h-[200px] lg:col-start-1 lg:row-start-2"
          />
          <BentoCell
            category={skillCategories[3]}
            index={3}
            className="min-h-[200px] lg:col-start-2 lg:row-start-2"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
