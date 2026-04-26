"use client";

type ProjectActionsProps = {
  liveUrl: string;
  githubUrl?: string;
};

export function ProjectActions({ liveUrl, githubUrl }: ProjectActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={liveUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2.5 text-sm font-medium text-cyan-100 transition-all duration-300 hover:border-cyan-300/50 hover:bg-cyan-300/15"
      >
        Voir le site
        <span aria-hidden="true">↗</span>
      </a>
      {githubUrl ? (
        <a
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-slate-200 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]"
        >
          Code source
          <span aria-hidden="true">↗</span>
        </a>
      ) : null}
    </div>
  );
}
