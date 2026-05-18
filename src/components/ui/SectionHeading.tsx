"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <motion.div
      {...fadeUp(0)}
      className={`max-w-2xl space-y-4 ${isCenter ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-semibold tracking-[0.28em] text-slate-400 uppercase backdrop-blur-sm">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className={`text-base leading-7 text-slate-400 md:text-lg ${isCenter ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
