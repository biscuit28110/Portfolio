"use client";

import { useInView } from "react-intersection-observer";

export default function Projects() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  const projectsData = [
    {
      id: 1,
      title: "Portfolio Personnel",
      description: "Site web responsive présentant mes compétences et projets avec des animations fluides.",
      image: "/placeholder-project-1.jpg",
      tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
      github: "#",
      demo: "#"
    },
    {
      id: 2,
      title: "Application de Gestion de Tâches",
      description: "App web complète pour gérer des projets collaboratifs avec authentification et base de données.",
      image: "/placeholder-project-2.jpg",
      tags: ["React", "Node.js", "MongoDB", "Express"],
      github: "#",
      demo: "#"
    },
    {
      id: 3,
      title: "Plateforme E-learning",
      description: "Plateforme éducative interactive avec cours vidéo, quiz et suivi de progression.",
      image: "/placeholder-project-3.jpg",
      tags: ["Vue.js", "Firebase", "Tailwind", "Chart.js"],
      github: "#",
      demo: "#"
    }
  ];

  return (
    <section
      id="projects"
      ref={ref}
      className={`min-h-[calc(100vh-4rem)] py-20 px-6 md:px-12 ${inView ? "active-section" : ""}`}
      aria-label="Section Projets"
    >
      <div className="max-w-4xl mx-auto">
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Mes projets
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="space-y-8">
            {projectsData.map((project) => (
              <div key={project.id} className="bg-slate-800/30 rounded-xl overflow-hidden hover:bg-slate-800/50 transition-all duration-300">
                <div className="p-6">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                  <p className="text-slate-300 mb-5 line-clamp-3">{project.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Voir la démo
                      <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l0 0 0 0 0 0M12 5a7 7 0 110 14 7 7 0 010-14z"/>
                      </svg>
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-slate-200 transition-opacity"
                    >
                      GitHub
                      <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Voir tous les projets
              <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l0 0 0 0 0 0M12 5a7 7 0 110 14 7 7 0 010-14z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}