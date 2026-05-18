import { type ReactNode } from "react";

const variants = {
  default: "border-white/10 bg-white/5 text-slate-300",
  cyan:    "border-cyan-500/25 bg-cyan-500/10 text-cyan-300",
  blue:    "border-blue-500/25 bg-blue-500/10 text-blue-300",
  violet:  "border-violet-500/25 bg-violet-500/10 text-violet-300",
  emerald: "border-emerald-500/25 bg-emerald-500/10 text-emerald-300",
} as const;

type BadgeProps = {
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
};

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
