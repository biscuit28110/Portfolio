"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp } from "@/lib/motion";

const contactLinks = [
  {
    label: "Email",
    value: "contact@traviss.dev",
    href: "mailto:contact@traviss.dev",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m2 7 10 7 10-7" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "traviss-talamaku",
    href: "https://www.linkedin.com/in/traviss-talamaku-ba6405168",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Localisation",
    value: "Paris, France",
    href: null,
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
];

const inputClass =
  "w-full rounded-xl border border-white/8 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-cyan-500/40 focus:bg-white/[0.06] focus:ring-1 focus:ring-cyan-500/20";

export default function Contact() {
  return (
    <SectionWrapper id="contact" ariaLabel="Section Contact" ambient="blue-cyan">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">

          {/* ── Colonne gauche ── */}
          <div className="space-y-10">
            <SectionHeading
              eyebrow="Contact"
              title="Travaillons ensemble"
              description="Disponible pour des missions en CDI ou freelance. N'hésitez pas à me contacter pour discuter de votre projet."
            />

            <motion.div {...fadeUp(0.06)} className="space-y-3">
              {contactLinks.map(({ label, value, href, icon }) => {
                const inner = (
                  <div className="flex items-center gap-4 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-4 transition-all duration-200 hover:border-white/15 hover:bg-white/[0.06]">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] text-slate-400">
                      {icon}
                    </span>
                    <div>
                      <p className="text-[11px] tracking-[0.18em] text-slate-500 uppercase">{label}</p>
                      <p className="mt-0.5 text-sm font-medium text-slate-200">{value}</p>
                    </div>
                    {href && (
                      <span className="ml-auto text-slate-600 transition-colors group-hover:text-slate-400">↗</span>
                    )}
                  </div>
                );
                return href ? (
                  <a key={label} href={href} target="_blank" rel="noreferrer" className="group block">
                    {inner}
                  </a>
                ) : (
                  <div key={label}>{inner}</div>
                );
              })}
            </motion.div>
          </div>

          {/* ── Colonne droite : formulaire ── */}
          <motion.div {...fadeUp(0.08)}>
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-6 sm:p-8">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
              <form className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-medium tracking-[0.12em] text-slate-400 uppercase">Nom</label>
                    <input type="text" id="name" className={inputClass} placeholder="Votre nom" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-medium tracking-[0.12em] text-slate-400 uppercase">Email</label>
                    <input type="email" id="email" className={inputClass} placeholder="votre@email.com" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs font-medium tracking-[0.12em] text-slate-400 uppercase">Sujet</label>
                  <input type="text" id="subject" className={inputClass} placeholder="Objet de votre message" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-medium tracking-[0.12em] text-slate-400 uppercase">Message</label>
                  <textarea id="message" rows={5} className={inputClass} placeholder="Décrivez votre projet ou votre demande..." required />
                </div>
                <button
                  type="submit"
                  className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl border border-cyan-500/25 bg-cyan-500/10 px-6 py-3.5 text-sm font-medium text-cyan-100 transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-500/15"
                >
                  Envoyer le message
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </SectionWrapper>
  );
}
