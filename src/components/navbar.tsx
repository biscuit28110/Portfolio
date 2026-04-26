"use client";

import { useEffect, useMemo, useState } from "react";
import TypewriterText from "@/components/typewriter-text";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = useMemo(
    () => [
      {
        id: "hero",
        label: "Accueil",
        icon: (
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 10.5 12 3l9 7.5" />
            <path d="M5.5 9.5V21h13V9.5" />
            <path d="M9.5 21v-6h5v6" />
          </svg>
        ),
      },
      {
        id: "about",
        label: "Profil",
        icon: (
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
          </svg>
        ),
      },
      {
        id: "skills",
        label: "Parcours",
        icon: (
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 6h14M5 12h14M5 18h9" />
            <circle cx="6.5" cy="6" r="1" fill="currentColor" stroke="none" />
            <circle cx="6.5" cy="12" r="1" fill="currentColor" stroke="none" />
            <circle cx="6.5" cy="18" r="1" fill="currentColor" stroke="none" />
          </svg>
        ),
      },
      {
        id: "projects",
        label: "Projets",
        icon: (
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="5" width="16" height="14" rx="1" />
            <path d="M12 5v14" />
          </svg>
        ),
      },
      {
        id: "experience",
        label: "Contact",
        icon: (
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3.5" y="5" width="17" height="14" rx="2" />
            <path d="M7.5 9h9M7.5 13h9M7.5 17h6" />
          </svg>
        ),
      },
    ],
    [],
  );

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.id);

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      let currentSection = sectionIds[0];

      sectionIds.forEach((sectionId) => {
        const element = document.getElementById(sectionId);

        if (element && scrollPosition >= element.offsetTop) {
          currentSection = sectionId;
        }
      });

      setActiveSection(currentSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [navItems]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="bg-base-100">
      <div className="fixed inset-x-0 top-0 z-30 px-4 py-4 md:hidden">
        <div className="mx-auto flex max-w-sm items-center justify-between rounded-full border border-white/10 bg-slate-950/65 px-4 py-3 backdrop-blur-xl">
          <span className="text-sm font-medium tracking-[0.22em] text-white uppercase">
            Menu
          </span>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label="Ouvrir le menu"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              {isMobileMenuOpen ? (
                <path d="M6 6l12 12M18 6 6 18" />
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>

        {isMobileMenuOpen ? (
          <div
            id="mobile-navigation"
            className="mx-auto mt-3 flex max-w-sm flex-col gap-2 rounded-[1.75rem] border border-white/10 bg-slate-950/88 p-3 shadow-[0_24px_80px_rgba(2,8,23,0.45)] backdrop-blur-xl"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`flex min-h-11 items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-blue-600 text-white"
                    : "bg-white/[0.04] text-slate-200"
                }`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/10">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <aside className="absolute left-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 md:flex">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollToSection(item.id)}
            className={`grid h-16 w-16 place-items-center rounded-full transition-all duration-300 ${
              activeSection === item.id ? "bg-blue-600 text-white" : "bg-white/90 text-slate-700"
            }`}
            aria-label={item.label}
          >
            {item.icon}
          </button>
        ))}
      </aside>
      <div className="relative z-10 flex min-h-screen items-center px-5 pt-28 pb-12 sm:px-8 md:px-0 md:pt-0 md:pb-0 md:pl-36">
        <div className="max-w-4xl">
          <h1 className="max-w-[10ch] text-4xl font-mono leading-[1.02] text-white sm:max-w-none sm:text-5xl md:text-8xl">
            <TypewriterText text="Traviss TALAMAKU" />
          </h1>
          <div className="mt-4 text-xl font-medium text-slate-100 sm:text-2xl md:text-3xl">
            Technicien Informatique<span className="animate-pulse">|</span>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-5 sm:gap-8">
            <a
              href="https://www.linkedin.com/in/traviss-talamaku-ba6405168"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="inline-flex min-h-11 items-center text-5xl font-black leading-none text-white transition hover:text-cyan-300 sm:text-6xl"
            >
              in
            </a>
            <a
              href="https://www.youtube.com/@tutoinformatique8500"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-white text-black transition hover:bg-cyan-200"
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
