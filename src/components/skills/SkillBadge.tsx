"use client";

import { motion } from "framer-motion";

type SkillBadgeProps = {
  label: string;
  index: number;
  isActive: boolean;
};

export function SkillBadge({ label, index, isActive }: SkillBadgeProps) {
  return (
    <motion.span
      initial={false}
      animate={{
        y: isActive ? -3 : 0,
        scale: isActive ? 1.03 : 1,
        borderColor: isActive
          ? "rgba(103, 232, 249, 0.35)"
          : "rgba(148, 163, 184, 0.14)",
        backgroundColor: isActive
          ? "rgba(15, 23, 42, 0.72)"
          : "rgba(15, 23, 42, 0.52)",
      }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 18,
        delay: index * 0.03,
      }}
      className="inline-flex rounded-full border px-3 py-1 text-xs font-medium tracking-[0.18em] text-slate-200 uppercase backdrop-blur-md"
    >
      {label}
    </motion.span>
  );
}
