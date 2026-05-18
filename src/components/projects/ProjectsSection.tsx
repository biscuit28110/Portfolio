"use client";

import { FeaturedProjectCard } from "@/components/projects/FeaturedProjectCard";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";

const featuredProject = projects.find((p) => p.featured);
const secondaryProjects = projects.filter((p) => !p.featured);

export function ProjectsSection() {
  return (
    <SectionWrapper id="projects" ariaLabel="Section Projets" ambient="cyan-violet">
      <div className="mx-auto max-w-6xl space-y-12">
        <SectionHeading
          eyebrow="Shipped products"
          title="Projets"
          description="Sites et produits web conçus pour des besoins réels, avec attention au design, à la performance et au déploiement."
        />

        <div className="space-y-6">
          {featuredProject ? <FeaturedProjectCard project={featuredProject} /> : null}
          <div className="grid gap-6 lg:grid-cols-2">
            {secondaryProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
