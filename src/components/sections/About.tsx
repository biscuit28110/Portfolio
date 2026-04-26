"use client";

import { useInView } from "react-intersection-observer";

export default function About() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  return (
    <section
      id="about"
      ref={ref}
      className={`min-h-[calc(100vh-4rem)] px-4 py-16 sm:px-6 md:px-6 md:py-20 lg:px-12 ${inView ? "active-section" : ""}`}
      aria-label="Section À propos"
    >
      <div className="mx-auto max-w-4xl">
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              À propos
            </h2>
            <div className="mx-auto h-0.5 w-20 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600" />
          </div>

          <div className="space-y-8">
            <div className="space-y-7 text-slate-300">
              <p className="text-base leading-relaxed sm:text-lg">
                Profil polyvalent entre informatique, accompagnement logiciel et développement web, j&apos;interviens avec une approche simple : comprendre vite, structurer clairement, et apporter des solutions utiles.
              </p>

              <p className="leading-relaxed text-slate-400">
                Mon expérience comme formateur logiciel et hotliner m&apos;a permis de développer une vraie capacité d&apos;écoute, d&apos;analyse et de résolution. Aujourd&apos;hui, je recherche un CDI ou des missions freelance sur lesquelles je peux apporter une contribution concrète, fiable et durable.
              </p>
            </div>

            <div className="space-y-7">
              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-blue-600/20">
                  <svg className="h-3 w-3 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Positionnement</h3>
                  <p className="text-slate-400">Formateur logiciel | Technicien informatique | Développeur web</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-blue-600/20">
                  <svg className="h-3 w-3 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 7h3m8 0v3m-3-3h-8m8 0V7a4 4 0 00-4-4H8a4 4 0 00-4 4v8m8-4v8" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Objectif</h3>
                  <p className="text-slate-400">CDI ou missions freelance sur des projets concrets et exigeants</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
