"use client";

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/traviss-talamaku-ba6405168",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@tutoinformatique8500",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
        <path d="M23 12s0-3.7-.47-5.49a2.9 2.9 0 0 0-2.04-2.04C18.7 4 12 4 12 4s-6.7 0-8.49.47a2.9 2.9 0 0 0-2.04 2.04C1 8.3 1 12 1 12s0 3.7.47 5.49a2.9 2.9 0 0 0 2.04 2.04C5.3 20 12 20 12 20s6.7 0 8.49-.47a2.9 2.9 0 0 0 2.04-2.04C23 15.7 23 12 23 12Zm-13 4V8l6 4-6 4Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/6">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:px-10 lg:px-16">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">

          <div>
            <p className="text-sm font-semibold tracking-[-0.02em] text-white">Traviss Talamaku</p>
            <p className="mt-1 text-xs text-slate-500">
              Conçu avec Next.js &amp; Tailwind CSS
            </p>
          </div>

          <div className="flex items-center gap-3">
            {socials.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 bg-white/[0.04] text-slate-400 transition-all duration-200 hover:border-white/15 hover:bg-white/[0.08] hover:text-white"
              >
                {icon}
              </a>
            ))}
          </div>

          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Traviss Talamaku
          </p>

        </div>
      </div>
    </footer>
  );
}
