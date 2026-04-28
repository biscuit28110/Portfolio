"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";

// --- Compteur animé ---
function useCounter(target: number, inView: boolean, duration = 1.4) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) {
      const t = setTimeout(() => setCount(0), 0);
      return () => clearTimeout(t);
    }
    const steps = 48;
    const stepMs = (duration * 1000) / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      setCount(Math.round((target * current) / steps));
      if (current >= steps) clearInterval(timer);
    }, stepMs);

    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return count;
}

function AnimatedStat({ raw, suffix, label }: { raw: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.6 });
  const count = useCounter(raw, inView);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1.5">
      <span className="text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
        {count}
        <span className="text-cyan-400">{suffix}</span>
      </span>
      <span className="text-[11px] tracking-[0.12em] text-slate-500 uppercase">{label}</span>
    </div>
  );
}

// --- Bouton 3D avec tilt + glare ---
function CvButton() {
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [10, -10]), {
    stiffness: 260,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 260,
    damping: 24,
  });

  const glareX = useTransform(rawX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(rawY, [-0.5, 0.5], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.13) 0%, transparent 55%)`;

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - left) / width - 0.5);
    rawY.set((e.clientY - top) / height - 0.5);
  }

  function onMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="flex justify-center"
      style={{ perspective: "900px" }}
    >
      <motion.a
        href="/assets/cv/tt-cv.pdf"
        download
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative inline-flex cursor-pointer items-center gap-4 overflow-hidden rounded-2xl px-7 py-4 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_0_1px_rgba(255,255,255,0.08),0_4px_24px_rgba(0,0,0,0.3)] transition-shadow duration-300 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.13),0_0_0_1px_rgba(34,211,238,0.35),0_8px_40px_rgba(34,211,238,0.1)]"
      >
        {/* Fond de base */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-white/[0.03]" />
        {/* Fond hover slide */}
        <div className="absolute inset-0 -translate-y-full bg-gradient-to-b from-cyan-500/12 to-violet-500/8 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
        {/* Glare 3D */}
        <motion.div style={{ background: glare }} className="pointer-events-none absolute inset-0 rounded-2xl" />

        {/* Icône */}
        <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/8 transition-all duration-300 group-hover:border-cyan-400/30 group-hover:bg-cyan-400/15">
          <svg
            className="h-3.5 w-3.5 text-slate-300 transition-all duration-300 group-hover:translate-y-0.5 group-hover:text-cyan-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </span>

        {/* Texte */}
        <span className="relative flex flex-col">
          <span className="text-sm font-medium leading-none text-white">Télécharger mon CV</span>
          <span className="mt-1 text-[11px] leading-none text-slate-500 transition-colors duration-300 group-hover:text-cyan-500/70">
            PDF · Mis à jour 2025
          </span>
        </span>

        {/* Flèche */}
        <span className="relative ml-2 text-slate-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-cyan-400">
          →
        </span>
      </motion.a>
    </div>
  );
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.3 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay },
});

export default function About() {
  return (
    <section
      id="about"
      aria-label="Section À propos"
      className="relative isolate overflow-hidden px-4 pb-24 pt-10 sm:px-6 md:px-10 md:pb-32 md:pt-12 lg:px-16"
    >
      {/* Fond ambiant */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.07),transparent_45%),radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.07),transparent_45%),linear-gradient(180deg,rgba(2,6,23,0.98),rgba(2,6,23,0.95))]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative mx-auto max-w-3xl space-y-12">

        {/* Titre de section */}
        <motion.div {...fade(0)} className="text-center">
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl md:text-5xl">
            À Propos
          </h2>
        </motion.div>

        {/* En-tête rôle + dispo */}
        <motion.div {...fade(0.08)} className="space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            <span className="text-xs font-medium tracking-[0.2em] text-emerald-300 uppercase">Disponible</span>
            <span className="text-slate-700">·</span>
            <span className="text-xs tracking-[0.15em] text-slate-500 uppercase">CDI · Freelance</span>
          </div>
          <p className="text-lg font-medium tracking-tight text-slate-300 sm:text-xl">
            Formateur Logiciel <span className="text-slate-600">&amp;</span> Développeur Web
          </p>
        </motion.div>

        {/* Bio */}
        <motion.div {...fade(0.14)} className="space-y-4 border-l border-white/8 pl-5">
          <p className="text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
            Actuellement Formateur et Hotliner logiciel, j&apos;ai construit mon parcours entre
            développement web et support informatique terrain. Cette combinaison m&apos;a appris
            à autant construire des solutions qu&apos;à les expliquer et les maintenir.
          </p>
          <p className="text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
            Pédagogie, rigueur technique et sens du diagnostic — trois réflexes que j&apos;applique
            aussi bien en formation qu&apos;en développement.
          </p>
        </motion.div>

        {/* Stats animées */}
        <motion.div
          {...fade(0.2)}
          className="flex items-center justify-center gap-10 border-y border-white/6 py-8 sm:gap-16"
        >
          <AnimatedStat raw={3} suffix="+" label="Ans d'expérience" />
          <div className="h-10 w-px shrink-0 bg-white/8" />
          <AnimatedStat raw={5} suffix="+" label="Projets en prod" />
          <div className="h-10 w-px shrink-0 bg-white/8" />
          <AnimatedStat raw={1} suffix="" label="Poste actuel" />
        </motion.div>

        {/* Bouton CV 3D */}
        <motion.div {...fade(0.28)}>
          <CvButton />
        </motion.div>

      </div>
    </section>
  );
}
