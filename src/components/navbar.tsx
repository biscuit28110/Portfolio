"use client";

import TypewriterText from "@/components/typewriter-text";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  
  // About section observer
  const { ref: aboutRef, inView: isAboutInView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });
  
  // Skills section observer
  const { ref: skillsRef, inView: isSkillsInView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });
  
  // Projects section observer
  const { ref: projectsRef, inView: isProjectsInView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });
  
  // Experience section observer
  const { ref: experienceRef, inView: isExperienceInView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });
  
  // Contact section observer
  const { ref: contactRef, inView: isContactInView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  useEffect(() => {
    if (isAboutInView) setActiveSection("about");
    else if (isSkillsInView) setActiveSection("skills");
    else if (isProjectsInView) setActiveSection("projects");
    else if (isExperienceInView) setActiveSection("experience");
    else if (isContactInView) setActiveSection("contact");
    else setActiveSection("hero");
  }, [isAboutInView, isSkillsInView, isProjectsInView, isExperienceInView, isContactInView]);

  return (
    <nav className="bg-base-100">
      <aside className="absolute left-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 md:flex">
        <button
          type="button"
          onClick={() => {
            const heroElement = document.getElementById("hero");
            if (heroElement) {
              heroElement.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className={`grid h-16 w-16 place-items-center rounded-full transition-all duration-300 ${activeSection === "hero" ? "bg-blue-600 text-white" : "bg-white/90 text-slate-700"}`}
          aria-label="Accueil"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 10.5 12 3l9 7.5" />
            <path d="M5.5 9.5V21h13V9.5" />
            <path d="M9.5 21v-6h5v6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => {
            const aboutElement = document.getElementById("about");
            if (aboutElement) {
              aboutElement.scrollIntoView({ behavior: "smooth" });
            }
          }}
          ref={aboutRef}
          className={`grid h-16 w-16 place-items-center rounded-full transition-all duration-300 ${activeSection === "about" ? "bg-blue-600 text-white" : "bg-white/90 text-slate-700"}`}
          aria-label="Profil"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => {
            const skillsElement = document.getElementById("skills");
            if (skillsElement) {
              skillsElement.scrollIntoView({ behavior: "smooth" });
            }
          }}
          ref={skillsRef}
          className={`grid h-16 w-16 place-items-center rounded-full transition-all duration-300 ${activeSection === "skills" ? "bg-blue-600 text-white" : "bg-white/90 text-slate-700"}`}
          aria-label="Parcours"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 6h14M5 12h14M5 18h9" />
            <circle cx="6.5" cy="6" r="1" fill="currentColor" stroke="none" />
            <circle cx="6.5" cy="12" r="1" fill="currentColor" stroke="none" />
            <circle cx="6.5" cy="18" r="1" fill="currentColor" stroke="none" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => {
            const projectsElement = document.getElementById("projects");
            if (projectsElement) {
              projectsElement.scrollIntoView({ behavior: "smooth" });
            }
          }}
          ref={projectsRef}
          className={`grid h-16 w-16 place-items-center rounded-full transition-all duration-300 ${activeSection === "projects" ? "bg-blue-600 text-white" : "bg-white/90 text-slate-700"}`}
          aria-label="Projets"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="5" width="16" height="14" rx="1" />
            <path d="M12 5v14" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => {
            const experienceElement = document.getElementById("experience");
            if (experienceElement) {
              experienceElement.scrollIntoView({ behavior: "smooth" });
            }
          }}
          ref={experienceRef}
          className={`grid h-16 w-16 place-items-center rounded-full transition-all duration-300 ${activeSection === "experience" ? "bg-blue-600 text-white" : "bg-white/90 text-slate-700"}`}
          aria-label="Contact"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3.5" y="5" width="17" height="14" rx="2" />
            <path d="M7.5 9h9M7.5 13h9M7.5 17h6" />
          </svg>
        </button>
      </aside>
      <div className="relative z-10 flex min-h-screen items-center md:pl-36">
        <div className="max-w-4xl">
          <h1 className="text-5xl font-mono leading-tight text-white md:text-8xl">
            <TypewriterText text="Traviss TALAMAKU" />
          </h1>
          <div className="   text-3xl font-medium text-slate-100">
            Technicien Informatique<span className="animate-pulse">|</span>
          </div>

          <div className="mt-5 flex items-center gap-8">
            <a
              href="https://www.linkedin.com/in/felix-vincent-arthur"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-6xl font-black leading-none text-white transition hover:text-cyan-300"
            >
              in
            </a>
            <a
              href="https://www.youtube.com/@tutoinformatique8500"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white text-black transition hover:bg-cyan-200"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M23 12s0-3.7-.47-5.49a2.9 2.9 0 0 0-2.04-2.04C18.7 4 12 4 12 4s-6.7 0-8.49.47a2.9 2.9 0 0 0 2.04 2.04C5.3 20 12 20 12 20s6.7 0 8.49-.47a2.9 2.9 0 0 0 2.04-2.04C23 15.7 23 12 23 12Zm-13 4V8l6 4-6 4Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
