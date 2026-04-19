"use client";

import { useInView } from "react-intersection-observer";

export default function Contact() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  return (
    <section
      id="contact"
      ref={ref}
      className={`min-h-[calc(100vh-4rem)] py-20 px-6 md:px-12 ${inView ? "active-section" : ""}`}
      aria-label="Section Contact"
    >
      <div className="max-w-4xl mx-auto">
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Contactez-moi
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid gap-8 md:grid-cols-[1fr_1fr]">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-4">Me contacter</h3>
              <p className="text-slate-300 mb-6">
                Vous avez un projet, une question ou simplement envie de discuter ? 
                N'hésitez pas à me contacter via le formulaire ci-dessous ou par l'un de mes moyens de contact directs.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-8 w-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <svg className="h-4 w-4 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 13.08z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Email</h4>
                    <p className="text-slate-300">contact@traviss.dev</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-8 w-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <svg className="h-4 w-4 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.56l2.38 4.7A1 1 0 009.37 8h3.26a1 1 0 01.94.56l2.38 4.7A1 1 0 0014.63 17h3.28a1 1 0 01.94.56l2.38 4.7a1 1 0 01-.94 1.54H21a2 2 0 012 2v1a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Téléphone</h4>
                    <p className="text-slate-300">+33 6 12 34 56 78</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-8 w-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <svg className="h-4 w-4 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 11.9 11.9 0 01-8.4 4.2 8 8 0 01-5.8-2.4 8.4 8.4 0 01-.5-2.1 8.5 8.5 0 01-1 1.8 8.4 8.4 0 01-.3-.5A12.07 12.07 0 013 11.5a12 12 0 016.6 2 9 9 0 011.8-.6 12.08 12.08 0 016 0c1.02.06 2.04.12 3.04.18 1 1.04 1.17 2.49.94 3.81-.24 1.32-.56 2.66-.94 3.81A12.08 12.08 0 0121 11.5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Localisation</h4>
                    <p className="text-slate-300">Paris, France</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800/30 rounded-xl p-6">
              <form className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-slate-300 mb-2">Nom</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="Votre nom"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-slate-300 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-slate-300 mb-2">Message</label>
                  <textarea
                    id="message"
                    rows="5"
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="Votre message..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium py-3 px-6 rounded-xl hover:opacity-90 transition-opacity"
                >
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}