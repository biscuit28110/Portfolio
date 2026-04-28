"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import TypewriterText from "@/components/typewriter-text";

const ROLES = ["Technicien Informatique", "Développeur Web", "Passionné de Tech"];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleText, setRoleText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const navItems = useMemo(
    () => [
      {
        id: "hero",
        label: "Accueil",
        icon: (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
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
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
          </svg>
        ),
      },
      {
        id: "skills",
        label: "Parcours",
        icon: (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
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
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="5" width="16" height="14" rx="1" />
            <path d="M12 5v14" />
          </svg>
        ),
      },
      {
        id: "experience",
        label: "Contact",
        icon: (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
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

  useEffect(() => {
    const current = ROLES[roleIndex];

    if (!isDeleting && roleText === current) {
      const t = setTimeout(() => setIsDeleting(true), 2200);
      return () => clearTimeout(t);
    }

    if (isDeleting && roleText === "") {
      const t = setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((i) => (i + 1) % ROLES.length);
      }, 0);
      return () => clearTimeout(t);
    }

    const speed = isDeleting ? 45 : 80;
    const next = isDeleting
      ? current.slice(0, roleText.length - 1)
      : current.slice(0, roleText.length + 1);

    const t = setTimeout(() => setRoleText(next), speed);
    return () => clearTimeout(t);
  }, [roleText, isDeleting, roleIndex]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="bg-base-100">
      {/* Avatar circulaire desktop — visible uniquement sur la section hero */}
      <div className={`fixed top-5 right-6 z-40 hidden md:block transition-all duration-500 ${activeSection === "hero" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-white/25 ring-offset-2 ring-offset-slate-950 shadow-[0_0_28px_rgba(99,179,237,0.3)]">
          <Image
            src="/assets/images/cv.png"
            alt="Traviss Talamaku"
            fill
            className="object-cover object-top scale-125 translate-y-1"
            draggable={false}
          />
        </div>
      </div>

      <div className="fixed inset-x-0 top-0 z-30 px-4 py-4 md:hidden">
        <div className="mx-auto flex max-w-sm items-center justify-between rounded-full border border-white/10 bg-slate-950/65 px-4 py-3 backdrop-blur-xl">
          {/* Avatar intégré dans la barre mobile — visible uniquement sur la section hero */}
          <div className={`relative h-10 w-10 overflow-hidden rounded-full ring-1 ring-white/20 shadow-[0_0_12px_rgba(99,179,237,0.25)] transition-all duration-500 ${activeSection === "hero" ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"}`}>
            <Image
              src="/assets/images/cv.png"
              alt="Traviss Talamaku"
              fill
              className="object-cover object-top scale-125 translate-y-0.5"
              draggable={false}
            />
          </div>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label="Ouvrir le menu"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
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

      <aside className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 md:flex">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollToSection(item.id)}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            className={`flex items-center overflow-hidden rounded-full border transition-colors duration-300 ease-out ${
              activeSection === item.id
                ? "border-blue-500/40 bg-blue-600 text-white shadow-[0_0_24px_rgba(37,99,235,0.45)]"
                : "border-white/[0.08] bg-white/[0.06] text-white/60 backdrop-blur-md hover:border-white/20 hover:bg-white/[0.12] hover:text-white"
            }`}
            aria-label={item.label}
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center">
              {item.icon}
            </span>
            <span
              style={{
                maxWidth: hoveredItem === item.id ? "8rem" : "0px",
                paddingRight: hoveredItem === item.id ? "1.25rem" : "0px",
                transition: "max-width 0.3s ease-out, padding-right 0.3s ease-out",
                overflow: "hidden",
                whiteSpace: "nowrap",
                fontSize: "0.875rem",
                fontWeight: "600",
                letterSpacing: "0.025em",
              }}
            >
              {item.label}
            </span>
          </button>
        ))}
      </aside>
      <div className="relative z-10 flex min-h-screen items-center px-5 pt-28 pb-12 sm:px-8 md:px-0 md:pt-0 md:pb-0 md:pl-36">
        <motion.div
          className="max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="max-w-[10ch] text-4xl font-mono leading-[1.02] text-white sm:max-w-none sm:text-5xl md:text-8xl"
          >
            <TypewriterText text="Traviss TALAMAKU" />
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="mt-4 min-h-[1.4em] text-xl font-medium text-slate-100 sm:text-2xl md:text-3xl"
          >
            {roleText}
            <motion.span
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ duration: 0.9, repeat: Infinity, times: [0, 0.45, 0.5, 1] }}
            >
              |
            </motion.span>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-6 flex flex-wrap items-center gap-4"
          >
            <a
              href="https://www.linkedin.com/in/traviss-talamaku-ba6405168"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-white text-black transition hover:bg-cyan-200"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </motion.div>
        </motion.div>

        <motion.button
          type="button"
          onClick={() => scrollToSection("about")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 transition-colors hover:text-white/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          aria-label="Aller à la section suivante"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 24 24" className="h-11 w-11" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="8" y="3" width="8" height="14" rx="4" />
              <motion.line
                x1="12" y1="7" x2="12" y2="10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                animate={{ y: [0, 2, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
              <path d="M12 21v-4" strokeLinecap="round" />
              <path d="M9 19l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.button>
      </div>
    </nav>
  );
}
