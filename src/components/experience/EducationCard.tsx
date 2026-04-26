"use client";

import { motion } from "framer-motion";

import type { EducationEntry } from "@/data/experience";

type EducationCardProps = {
  item: EducationEntry;
  index: number;
};

export function EducationCard({ item, index }: EducationCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{
        delay: index * 0.08,
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl sm:p-6"
    >
      <p className="text-[11px] font-semibold tracking-[0.26em] text-slate-500 uppercase">
        {item.period}
      </p>
      <h3 className="mt-3 text-lg font-semibold tracking-[-0.03em] text-white sm:text-xl">
        {item.title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{item.school}</p>
      <p className="mt-4 text-sm text-cyan-200">{item.result}</p>
    </motion.article>
  );
}
