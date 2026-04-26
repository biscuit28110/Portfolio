"use client";

import { motion } from "framer-motion";

import { FeaturedProjectCard } from "@/components/projects/FeaturedProjectCard";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";

const featuredProject = projects.find((project) => project.featured);
const secondaryProjects = projects.filter((project) => !project.featured);

export function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-label="Section Projets"
      className="relative isolate overflow-hidden px-4 py-20 sm:px-6 md:px-10 md:py-24 lg:px-16"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/30 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.08),transparent_26%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.1),transparent_28%),linear-gradient(180deg,rgba(2,6,23,0.92),rgba(2,6,23,0.98))]" />
      <div className="skills-noise-overlay pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute left-[8%] top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-[10%] top-1/3 h-80 w-80 rounded-full bg-violet-500/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.45 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-12 max-w-3xl text-center md:mb-16"
        >
          <span className="mb-5 inline-flex max-w-full rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-medium tracking-[0.24em] text-slate-300 uppercase backdrop-blur-xl sm:text-[11px] sm:tracking-[0.32em]">
            Shipped products
          </span>
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl md:text-5xl">
            Projets
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
            Sites et produits web conçus pour des besoins réels, avec attention
            au design, à la performance et au déploiement.
          </p>
        </motion.div>

        <div className="space-y-8">
          {featuredProject ? <FeaturedProjectCard project={featuredProject} /> : null}

          <div className="grid gap-6 lg:grid-cols-2">
            {secondaryProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
