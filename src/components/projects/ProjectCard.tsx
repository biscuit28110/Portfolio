"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { ProjectActions } from "@/components/projects/ProjectActions";
import { ProjectTag } from "@/components/projects/ProjectTag";
import type { ProjectEntry } from "@/data/projects";

type ProjectCardProps = {
  project: ProjectEntry;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.28 }}
      transition={{
        delay: index * 0.1,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -8, scale: 1.01 }}
      className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-[1px] shadow-[0_24px_80px_rgba(2,8,23,0.42)]"
    >
      <div className="absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_26%)] opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative flex h-full flex-col rounded-[calc(2rem-1px)] border border-white/10 bg-slate-950/72">
        <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10">
          <motion.div
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            className="absolute inset-0"
          >
            <Image
              src={project.desktopImage}
              alt={`Apercu desktop du projet ${project.title}`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0),rgba(2,6,23,0.72))]" />

          <div className="absolute left-4 top-4 inline-flex max-w-[calc(100%-5rem)] rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-[10px] font-medium tracking-[0.16em] text-slate-200 uppercase backdrop-blur-xl sm:left-5 sm:top-5 sm:max-w-none sm:text-[11px] sm:tracking-[0.22em]">
            {project.type}
          </div>

          <div className="absolute bottom-4 right-4 hidden w-[5.4rem] overflow-hidden rounded-[1.25rem] border border-white/15 bg-slate-950/80 p-1.5 shadow-[0_10px_30px_rgba(2,8,23,0.5)] backdrop-blur-xl sm:block">
            <div className="relative aspect-[9/19] overflow-hidden rounded-[0.95rem] border border-white/10">
              <Image
                src={project.mobileImage}
                alt={`Apercu mobile du projet ${project.title}`}
                fill
                className="object-cover object-top"
                sizes="86px"
              />
            </div>
          </div>
        </div>

        <div className="flex h-full flex-col gap-6 p-5 sm:p-6 md:p-7">
          <div>
            <h3 className="text-xl font-semibold tracking-[-0.04em] text-white sm:text-2xl">
              {project.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {project.summary}
            </p>
          </div>

          <div className="grid gap-4 text-sm leading-6 text-slate-300">
            <div>
              <p className="mb-1 text-[11px] font-semibold tracking-[0.25em] text-slate-500 uppercase">
                Role
              </p>
              <p>{project.role}</p>
            </div>
            <div>
              <p className="mb-1 text-[11px] font-semibold tracking-[0.25em] text-slate-500 uppercase">
                Ce que j&apos;ai construit
              </p>
              <ul className="space-y-2">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-auto space-y-5">
            <div className="flex flex-wrap gap-2.5">
              {project.stack.map((item) => (
                <ProjectTag key={item} label={item} />
              ))}
            </div>

            <ProjectActions liveUrl={project.liveUrl} githubUrl={project.githubUrl} />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
