"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { ProjectActions } from "@/components/projects/ProjectActions";
import { ProjectTag } from "@/components/projects/ProjectTag";
import type { ProjectEntry } from "@/data/projects";

type FeaturedProjectCardProps = {
  project: ProjectEntry;
};

export function FeaturedProjectCard({ project }: FeaturedProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.04] p-[1px] shadow-[0_32px_120px_rgba(2,8,23,0.5)]"
    >
      <div className="absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.2),transparent_26%)] opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative grid rounded-[calc(2.25rem-1px)] border border-white/10 bg-slate-950/75 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative min-h-[18rem] overflow-hidden border-b border-white/10 sm:min-h-[24rem] lg:min-h-[34rem] lg:border-r lg:border-b-0">
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 160, damping: 18 }}
            className="absolute inset-0"
          >
            <Image
              src={project.desktopImage}
              alt={`Apercu desktop du projet ${project.title}`}
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.08),rgba(2,6,23,0.68))]" />

          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="absolute bottom-5 right-5 hidden w-[9rem] overflow-hidden rounded-[1.6rem] border border-white/15 bg-slate-950/80 p-2 shadow-[0_16px_40px_rgba(2,8,23,0.55)] backdrop-blur-xl sm:block md:w-[11rem]"
          >
            <div className="relative aspect-[9/19] overflow-hidden rounded-[1.15rem] border border-white/10">
              <Image
                src={project.mobileImage}
                alt={`Apercu mobile du projet ${project.title}`}
                fill
                className="object-cover object-top"
                sizes="176px"
              />
            </div>
          </motion.div>
        </div>

        <div className="relative flex flex-col justify-between gap-6 p-5 sm:p-7 md:gap-8 md:p-10">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex max-w-full rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1.5 text-[10px] font-semibold tracking-[0.2em] text-cyan-200 uppercase sm:text-[11px] sm:tracking-[0.3em]">
                Featured build
              </span>
              <span className="text-[11px] tracking-[0.18em] text-slate-500 uppercase sm:text-xs sm:tracking-[0.24em]">
                {project.type}
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl md:text-4xl">
                {project.title}
              </h3>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
                {project.summary}
              </p>
            </div>

            <div className="grid gap-5 text-sm leading-6 text-slate-300">
              <div>
                <p className="mb-1 text-[11px] font-semibold tracking-[0.26em] text-slate-500 uppercase">
                  Role
                </p>
                <p>{project.role}</p>
              </div>
              <div>
                <p className="mb-1 text-[11px] font-semibold tracking-[0.26em] text-slate-500 uppercase">
                  Objectif
                </p>
                <p>{project.objective}</p>
              </div>
              <div>
                <p className="mb-1 text-[11px] font-semibold tracking-[0.26em] text-slate-500 uppercase">
                  Impact
                </p>
                <p>{project.impact}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {project.stack.map((item) => (
                <ProjectTag key={item} label={item} />
              ))}
            </div>
          </div>

          <ProjectActions liveUrl={project.liveUrl} githubUrl={project.githubUrl} />
        </div>
      </div>
    </motion.article>
  );
}
