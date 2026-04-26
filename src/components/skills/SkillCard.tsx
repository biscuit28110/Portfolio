"use client";

import type { PointerEvent as ReactPointerEvent } from "react";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import type { Variants } from "framer-motion";

import { SkillBadge } from "@/components/skills/SkillBadge";
import type { SkillCategory } from "@/data/skills";

type SkillCardProps = {
  category: SkillCategory;
  index: number;
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 36, filter: "blur(10px)" },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: index * 0.12,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function SkillCard({ category, index }: SkillCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const springX = useSpring(pointerX, { stiffness: 140, damping: 16, mass: 0.35 });
  const springY = useSpring(pointerY, { stiffness: 140, damping: 16, mass: 0.35 });

  const rotateY = useTransform(springX, [-1, 1], [shouldReduceMotion || isTouchDevice ? 0 : -8, shouldReduceMotion || isTouchDevice ? 0 : 8]);
  const rotateX = useTransform(springY, [-1, 1], [shouldReduceMotion || isTouchDevice ? 0 : 8, shouldReduceMotion || isTouchDevice ? 0 : -8]);
  const translateX = useTransform(springX, [-1, 1], [shouldReduceMotion || isTouchDevice ? 0 : -8, shouldReduceMotion || isTouchDevice ? 0 : 8]);
  const translateY = useTransform(springY, [-1, 1], [shouldReduceMotion || isTouchDevice ? 0 : -6, shouldReduceMotion || isTouchDevice ? 0 : 6]);
  const parallaxX = useTransform(springX, [-1, 1], [shouldReduceMotion || isTouchDevice ? 0 : -10, shouldReduceMotion || isTouchDevice ? 0 : 10]);
  const parallaxY = useTransform(springY, [-1, 1], [shouldReduceMotion || isTouchDevice ? 0 : -8, shouldReduceMotion || isTouchDevice ? 0 : 8]);

  useEffect(() => {
    // Desactive les effets 3D sur mobile et appareils tactiles.
    const mediaQuery = window.matchMedia("(pointer: coarse), (max-width: 767px)");

    const syncInputMode = () => {
      setIsTouchDevice(mediaQuery.matches);
    };

    syncInputMode();
    mediaQuery.addEventListener("change", syncInputMode);

    return () => {
      mediaQuery.removeEventListener("change", syncInputMode);
    };
  }, []);

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || isTouchDevice || !cardRef.current) {
      return;
    }

    const bounds = cardRef.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    pointerX.set((x - 0.5) * 2);
    pointerY.set((y - 0.5) * 2);
  };

  return (
    <motion.article
      ref={cardRef}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => {
        setIsHovering(false);
        resetPointer();
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      style={{
        rotateX,
        rotateY,
        x: translateX,
        y: translateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative min-h-[320px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-[1px] shadow-[0_24px_80px_rgba(2,8,23,0.45)]"
    >
      <motion.div
        aria-hidden="true"
        animate={{
          opacity: isHovering ? 1 : 0.55,
          scale: isHovering ? 1.04 : 1,
        }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.25),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.22),transparent_30%)]"
      />

      <motion.div
        style={{
          x: parallaxX,
          y: parallaxY,
          transformStyle: "preserve-3d",
        }}
        className="relative flex h-full flex-col rounded-[calc(2rem-1px)] border border-white/10 bg-slate-950/70 p-5 backdrop-blur-2xl sm:p-6 md:p-7"
      >
        <div className="absolute inset-0 rounded-[inherit] bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_36%,transparent_64%,rgba(255,255,255,0.04))]" />

        <div className="relative z-10 flex h-full flex-col">
          <div className="mb-6 flex items-start justify-between gap-4 sm:mb-8">
            <div className="space-y-3">
              <span className="inline-flex max-w-full rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-cyan-200 uppercase sm:text-[11px] sm:tracking-[0.28em]">
                Expertise
              </span>
              <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                {category.title}
              </h3>
            </div>
            <div className="h-12 w-12 shrink-0 rounded-2xl border border-white/10 bg-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] sm:h-14 sm:w-14" />
          </div>

          <p className="relative z-10 max-w-xs text-sm leading-6 text-slate-300">
            {category.description}
          </p>

          <p className="relative z-10 mt-3 text-sm leading-6 text-slate-500">
            {category.caption}
          </p>

          <div className="relative z-10 mt-8 flex flex-wrap gap-2.5">
            {category.skills.map((skill, skillIndex) => (
              <SkillBadge
                key={skill}
                label={skill}
                index={skillIndex}
                isActive={isHovering}
              />
            ))}
          </div>

          <motion.div
            aria-hidden="true"
            animate={{
              opacity: isHovering ? 0.95 : 0.55,
              scale: isHovering ? 1.05 : 1,
            }}
            transition={{ type: "spring", stiffness: 160, damping: 16 }}
            className="pointer-events-none absolute -bottom-[4.5rem] left-1/2 h-36 w-36 -translate-x-1/2 rounded-full bg-cyan-400/18 blur-3xl"
          />
          <motion.div
            aria-hidden="true"
            animate={{
              opacity: isHovering ? 0.85 : 0.35,
              scale: isHovering ? 1.08 : 1,
            }}
            transition={{ type: "spring", stiffness: 160, damping: 18 }}
            className="pointer-events-none absolute -right-10 top-10 h-28 w-28 rounded-full bg-violet-500/20 blur-3xl"
          />
        </div>
      </motion.div>
    </motion.article>
  );
}
