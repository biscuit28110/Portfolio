/*
  Charte graphique — classes Tailwind de référence
  ──────────────────────────────────────────────────
  Backgrounds : bg-slate-950  bg-slate-900  bg-slate-800
  Borders     : border-white/8  border-white/5
  Accents     : text-cyan-400  text-blue-600  text-violet-500  text-emerald-400
  Texte       : text-white  text-slate-300  text-slate-400  text-slate-500
  Sections    : py-20 md:py-28  px-4 sm:px-6 md:px-10 lg:px-16
*/

export const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 as const },
  transition: { duration: 0.65, ease: EASE, delay },
});

export const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, amount: 0.3 as const },
  transition: { duration: 0.65, ease: EASE, delay },
});

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};
