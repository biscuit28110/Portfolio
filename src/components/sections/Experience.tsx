"use client";

import { useInView } from "react-intersection-observer";

export default function Experience() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  const experiences = [
    {
      id: 1,
      title: "Technicien Informatique Senior",
      company: "Entreprise XYZ",
      period: "Jan 2022 - Présent",
      location: "Paris, France",
      description: "Gestion de l'infrastructure IT, support utilisateur de niveau 2/3, administration de serveurs Windows/Linux, déploiement de solutions de sécurité.",
      achievements: [
        "Réduction de 40% des incidents grâce à la mise en place de monitoring proactif",
        "Migration réussie vers une infrastructure cloud hybride",
        "Formation de 15+ utilisateurs sur les nouvelles outils et procédures"
      ]
    },
    {
      id: 2,
      title: "Développeur Web Freelance",
      company: "Indépendant",
      period: "Mar 2020 - Déc 2021",
      location: "Télétravail",
      description: "Développement de sites web et applications sur mesure pour des PME et startups, maintenance et optimisation de performances.",
      achievements: [
        "Livraison de 25+ projets web avec satisfaction client >95%",
        "Optimisation des temps de chargement de 60% en moyenne",
        "Implémentation de solutions e-commerce personnalisées"
      ]
    },
    {
      id: 3,
      title: "Formateur Informatique",
      company: "Centre de Formation ABC",
      period: "Sep 2018 - Fév 2020",
      location: "Lyon, France",
      description: "Animation de formations bureautique et initiation à la programmation pour des publics variés (débutants à intermédiaires).",
      achievements: [
        "Formation de 100+ apprenants sur les suites Office et Google Workspace",
        "Développement de supports pédagogiques adaptés à différents niveaux",
        "Taux de réussite aux certifications de 90%"
      ]
    }
  ];

  return (
    <section
      id="experience"
      ref={ref}
      className={`min-h-[calc(100vh-4rem)] py-20 px-6 md:px-12 ${inView ? "active-section" : ""}`}
      aria-label="Section Expérience"
    >
      <div className="max-w-4xl mx-auto">
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Mon parcours professionnel
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="space-y-8">
            {experiences.map((exp) => (
              <div key={exp.id} className="bg-slate-800/30 rounded-xl p-6 border-l-4 border-blue-500">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                    <p className="text-slate-400">{exp.company}</p>
                  </div>
                  <span className="text-slate-500 text-sm">{exp.period}</span>
                </div>
                
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 h-8 w-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <svg className="h-4 w-4 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 8c4 0 6 6 6 6h-12c0 0 2-6 6-6z"/>
                      <path d="M12 12v9"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-slate-300">{exp.location}</p>
                  </div>
                </div>
                
                <p className="text-slate-300 mb-4">{exp.description}</p>
                
                {exp.achievements && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-slate-200 mb-2">Réalisations clés :</h4>
                    <ul className="list-disc list-inside space-y-1 text-slate-300">
                      {exp.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}