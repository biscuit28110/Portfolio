"use client";

import { motion } from "framer-motion";

import { ExperienceBadge } from "@/components/experience/ExperienceBadge";
import type { ExperienceEntry } from "@/data/experience";

type ExperienceCardProps = {
  item: ExperienceEntry;
  index: number;
};

export function ExperienceCard({ item, index }: ExperienceCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.24 }}
      transition={{
        delay: index * 0.08,
        duration: 0.72,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-[1px] shadow-[0_24px_80px_rgba(2,8,23,0.4)]"
    >
      <div className="absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_28%)] opacity-75 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative rounded-[calc(2rem-1px)] border border-white/10 bg-slate-950/72 p-5 sm:p-6 md:p-8">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <ExperienceBadge label={item.contract} />
          {item.current ? <ExperienceBadge label="En poste" accent="violet" /> : null}
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.28em] text-slate-500 uppercase">
                {item.company}
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-white sm:text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {item.summary}
              </p>
            </div>

            <div>
              <p className="mb-2 text-[11px] font-semibold tracking-[0.26em] text-slate-500 uppercase">
                Missions principales
              </p>
              <ul className="space-y-2.5 text-sm leading-6 text-slate-300">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-[11px] font-semibold tracking-[0.26em] text-slate-500 uppercase">
                Periode
              </p>
              <p className="mt-2 text-sm text-slate-200">{item.period}</p>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-[11px] font-semibold tracking-[0.26em] text-slate-500 uppercase">
                Localisation
              </p>
              <p className="mt-2 text-sm text-slate-200">{item.location}</p>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-[11px] font-semibold tracking-[0.26em] text-slate-500 uppercase">
                Impact
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{item.impact}</p>
            </div>

            {item.environment ? (
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                <p className="mb-3 text-[11px] font-semibold tracking-[0.26em] text-slate-500 uppercase">
                  Environnement
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.environment.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] font-medium tracking-[0.18em] text-slate-200 uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
