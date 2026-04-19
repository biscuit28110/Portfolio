"use client";

export default function Footer() {
  return (
    <footer className="bg-slate-900/50 border-t border-slate-800/50">
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/felix-vincent-arthur"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="text-4xl font-black leading-none text-white transition hover:text-cyan-300"
              >
                in
              </a>
              <a
                href="https://www.youtube.com/@tutoinformatique8500"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-white text-black transition hover:bg-cyan-200"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M23 12s0-3.7-.47-5.49a2.9 2.9 0 0 0-2.04-2.04C18.7 4 12 4 12 4s-6.7 0-8.49.47a2.9 2.9 0 0 0-2.04 2.04C1 8.3 1 12 1 12s0 3.7.47 5.49a2.9 2.9 0 0 0 2.04 2.04C5.3 20 12 20 12 20s6.7 0 8.49-.47a2.9 2.9 0 0 0 2.04-2.04C23 15.7 23 12 23 12Zm-13 4V8l6 4-6 4Z" />
                </svg>
              </a>
            </div>
            <p className="text-center text-slate-400 max-w-2xl">
              © ${new Date().getFullYear()} Traviss TALAMAKU. Tous droits réservés.
            </p>
          </div>
          
          <div className="flex gap-4 text-slate-500 text-sm">
            <span>Accessibilité</span>
            <span>Confidentialité</span>
            <span>Conditions d&apos;utilisation</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
