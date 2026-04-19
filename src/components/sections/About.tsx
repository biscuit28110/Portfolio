"use client";

import { useInView } from "react-intersection-observer";
import { useRef } from "react";

export default function About() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });
   
  const containerRef = useRef(null);

  return (
    <section
      id="about"
      ref={ref}
      className={`min-h-[calc(100vh-4rem)] py-16 px-4 md:py-20 md:px-6 lg:px-12 ${inView ? "active-section" : ""}`}
      aria-label="Section À propos"
    >
      <div className="max-w-4xl mx-auto">
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6 md:text-4xl">
              À propos de moi
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="space-y-8">
            <div className="text-slate-300 leading-relaxed space-y-4">
              <p>
                Passionné par l'informatique depuis mon plus jeune âge, je mets mes compétences techniques au service de solutions innovantes et performantes. Mon parcours mêle expertise technique et approche pédagogique, toujours guidé par la volonté de partager et transmettre.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-7 w-7 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <svg className="h-3 w-3 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Spécialités</h3>
                    <p className="text-slate-400">Technicien Informatique | Développeur Web | Formateur</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-7 w-7 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <svg className="h-3 w-3 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M8 7h3m8 0v3m-3-3h-8m8 0V7a4 4 0 00-4-4H8a4 4 0 00-4 4v8m8-4v8"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Expérience</h3>
                    <p className="text-slate-400">+5 ans dans le domaine de l'informatique et du développement</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-0.5 h-[60px] bg-gradient-to-b from-cyan-400 to-blue-600 mx-auto mb-6"></div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 bg-blue-600 rounded-full"></div>
                  <span className="text-slate-300">Technologies modernes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 bg-blue-600 rounded-full"></div>
                  <span className="text-slate-300">Approche pédagogique</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 bg-blue-600 rounded-full"></div>
                  <span className="text-slate-300">Solutions sur mesure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}