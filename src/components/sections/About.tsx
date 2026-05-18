"use client";

import Image from "next/image";
import {
  motion,
  useInView,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { fadeUp } from "@/lib/motion";

function useCounter(target: number, inView: boolean, duration = 1.4) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) { setCount(0); return; }
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
    <div ref={ref} className="flex flex-col gap-1">
      <span className="text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
        {count}<span className="text-cyan-400">{suffix}</span>
      </span>
      <span className="text-[11px] tracking-[0.12em] text-slate-500 uppercase">{label}</span>
    </div>
  );
}

function CvButton() {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [10, -10]), { stiffness: 260, damping: 24 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-10, 10]), { stiffness: 260, damping: 24 });
  const glareX = useTransform(rawX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(rawY, [-0.5, 0.5], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.13) 0%, transparent 55%)`;

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - left) / width - 0.5);
    rawY.set((e.clientY - top) / height - 0.5);
  }

  return (
    <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={() => { rawX.set(0); rawY.set(0); }} style={{ perspective: "900px" }}>
      <motion.a
        href="/assets/cv/tt-cv.pdf"
        download
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative inline-flex cursor-pointer items-center gap-4 overflow-hidden rounded-2xl px-7 py-4 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_0_1px_rgba(255,255,255,0.08),0_4px_24px_rgba(0,0,0,0.3)] transition-shadow duration-300 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.13),0_0_0_1px_rgba(34,211,238,0.35),0_8px_40px_rgba(34,211,238,0.1)]"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-white/[0.03]" />
        <div className="absolute inset-0 -translate-y-full bg-gradient-to-b from-cyan-500/12 to-violet-500/8 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
        <motion.div style={{ background: glare }} className="pointer-events-none absolute inset-0 rounded-2xl" />
        <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/8 transition-all duration-300 group-hover:border-cyan-400/30 group-hover:bg-cyan-400/15">
          <svg className="h-3.5 w-3.5 text-slate-300 transition-all duration-300 group-hover:translate-y-0.5 group-hover:text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </span>
        <span className="relative flex flex-col">
          <span className="text-sm font-medium leading-none text-white">Télécharger mon CV</span>
          <span className="mt-1 text-[11px] leading-none text-slate-500 transition-colors duration-300 group-hover:text-cyan-500/70">PDF · Mis à jour 2025</span>
        </span>
        <span className="relative ml-2 text-slate-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-cyan-400">→</span>
      </motion.a>
    </div>
  );
}

const cell = "relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03]";

export default function About() {
  return (
    <SectionWrapper id="about" ariaLabel="Section À propos" ambient="cyan-violet">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-4 lg:grid-cols-3">

          {/* ── Cellule bio — 2 colonnes ── */}
          <motion.div {...fadeUp(0)} className={`${cell} p-7 md:p-8 lg:col-span-2`}>
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
            <div className="space-y-6">
              <div>
                <span className="text-[11px] font-semibold tracking-[0.28em] text-cyan-400 uppercase">À propos</span>
                <h2 className="mt-2 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">Profil</h2>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Disponible
                </span>
                <span className="text-slate-700">·</span>
                <span className="text-xs tracking-[0.15em] text-slate-500 uppercase">CDI · Freelance</span>
              </div>
              <p className="text-base font-medium text-slate-300">
                Formateur Logiciel <span className="text-slate-600">&amp;</span> Développeur Web
              </p>
              <div className="space-y-3 border-l-2 border-white/8 pl-5">
                <p className="text-sm leading-7 text-slate-300">
                  Actuellement Formateur et Hotliner logiciel, j&apos;ai construit mon parcours entre
                  développement web et support informatique terrain. Cette combinaison m&apos;a appris
                  à autant construire des solutions qu&apos;à les expliquer et les maintenir.
                </p>
                <p className="text-sm leading-7 text-slate-400">
                  Pédagogie, rigueur technique et sens du diagnostic — trois réflexes que j&apos;applique
                  aussi bien en formation qu&apos;en développement.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Cellule photo — 2 rangées ── */}
          <motion.div {...fadeUp(0.06)} className={`${cell} overflow-hidden lg:row-span-2`}>
            <div className="relative h-64 w-full lg:h-full lg:min-h-[420px]">
              <Image
                src="/assets/images/cv.png"
                alt="Traviss Talamaku"
                fill
                className="object-cover object-top"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">Traviss Talamaku</span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-emerald-300">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    Open to work
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Cellule stats + CTA — 2 colonnes ── */}
          <motion.div {...fadeUp(0.1)} className={`${cell} p-7 md:p-8 lg:col-span-2`}>
            <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-start gap-8 sm:gap-12">
                <AnimatedStat raw={3} suffix="+" label="Ans d'expérience" />
                <div className="h-10 w-px shrink-0 self-center bg-white/8" />
                <AnimatedStat raw={5} suffix="+" label="Projets en prod" />
                <div className="h-10 w-px shrink-0 self-center bg-white/8" />
                <AnimatedStat raw={1} suffix="" label="Poste actuel" />
              </div>
              <div className="shrink-0">
                <CvButton />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </SectionWrapper>
  );
}
