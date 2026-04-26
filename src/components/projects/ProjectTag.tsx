"use client";

import { motion } from "framer-motion";

type ProjectTagProps = {
  label: string;
};

export function ProjectTag({ label }: ProjectTagProps) {
  return (
    <motion.span
      whileHover={{ y: -2, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 280, damping: 18 }}
      className="inline-flex rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[11px] font-medium tracking-[0.2em] text-slate-200 uppercase backdrop-blur-md"
    >
      {label}
    </motion.span>
  );
}
