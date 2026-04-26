"use client";

type ExperienceBadgeProps = {
  label: string;
  accent?: "cyan" | "violet";
};

export function ExperienceBadge({
  label,
  accent = "cyan",
}: ExperienceBadgeProps) {
  const accentClass =
    accent === "violet"
      ? "border-violet-400/20 bg-violet-400/10 text-violet-100"
      : "border-cyan-400/20 bg-cyan-400/10 text-cyan-100";

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-medium tracking-[0.2em] uppercase backdrop-blur-md ${accentClass}`}
    >
      {label}
    </span>
  );
}
