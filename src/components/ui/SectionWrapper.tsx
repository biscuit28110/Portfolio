import { type ReactNode } from "react";

type AmbientVariant = "cyan-violet" | "violet-cyan" | "blue-cyan" | "none";

const ambientBlobs: Record<AmbientVariant, ReactNode> = {
  "cyan-violet": (
    <>
      <div className="pointer-events-none absolute left-[8%] top-1/4 h-80 w-80 rounded-full bg-cyan-500/[0.07] blur-[140px]" />
      <div className="pointer-events-none absolute right-[8%] bottom-1/4 h-80 w-80 rounded-full bg-violet-500/[0.07] blur-[140px]" />
    </>
  ),
  "violet-cyan": (
    <>
      <div className="pointer-events-none absolute left-[8%] top-1/4 h-80 w-80 rounded-full bg-violet-500/[0.07] blur-[140px]" />
      <div className="pointer-events-none absolute right-[8%] bottom-1/4 h-80 w-80 rounded-full bg-cyan-500/[0.07] blur-[140px]" />
    </>
  ),
  "blue-cyan": (
    <>
      <div className="pointer-events-none absolute left-[8%] top-1/4 h-80 w-80 rounded-full bg-blue-500/[0.07] blur-[140px]" />
      <div className="pointer-events-none absolute right-[8%] bottom-1/4 h-80 w-80 rounded-full bg-cyan-500/[0.07] blur-[140px]" />
    </>
  ),
  none: null,
};

type SectionWrapperProps = {
  id: string;
  ariaLabel?: string;
  ambient?: AmbientVariant;
  divider?: boolean;
  className?: string;
  children: ReactNode;
};

export function SectionWrapper({
  id,
  ariaLabel,
  ambient = "cyan-violet",
  divider = true,
  className = "",
  children,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`relative isolate overflow-hidden px-4 py-[var(--section-py)] sm:px-6 md:px-10 lg:px-16 ${className}`}
    >
      {divider && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      )}
      {ambientBlobs[ambient]}
      <div className="relative">{children}</div>
    </section>
  );
}
