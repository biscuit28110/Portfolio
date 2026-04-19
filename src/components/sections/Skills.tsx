"use client";

import { useInView } from "react-intersection-observer";

export default function Skills() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  const skillsData = [
    { name: "JavaScript/TypeScript", level: 90 },
    { name: "React/Next.js", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "HTML5/CSS3", level: 95 },
    { name: "Tailwind CSS", level: 90 },
    { name: "Python", level: 75 },
    { name: "SQL/NoSQL", level: 70 },
    { name: "Git/GitHub", level: 85 },
  ];

  return (
    <section
      id="skills"
      ref={ref}
      className={`min-h-[calc(100vh-4rem)] py-20 px-6 md:px-12 ${inView ? "active-section" : ""}`}
      aria-label="Section Compétences"
    >
      <div className="max-w-4xl mx-auto">
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Mes compétences
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="space-y-8">
            {skillsData.map((skill, index) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-slate-300">{skill.name}</span>
                  <span className="text-slate-200 font-medium">{skill.level}%</span>
                </div>
                <div className="w-full bg-slate-800/50 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`bg-gradient-to-r from-cyan-400 to-blue-600 h-full w-[${skill.level}%] transition-all duration-700`}
                    role="progressbar"
                    aria-valuenow={skill.level}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-slate-800/30 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-4">Outils & Technologies</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded text-xs">VS Code</span>
                <span className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded text-xs">Figma</span>
                <span className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded text-xs">Postman</span>
                <span className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded text-xs">Docker</span>
                <span className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded text-xs">AWS</span>
                <span className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded text-xs">MongoDB</span>
              </div>
            </div>
            
            <div className="bg-slate-800/30 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-4">Domaines d'expertise</h3>
              <ul className="space-y-2 text-slate-300">
                <li>Développement web full-stack</li>
                <li>Optimisation des performances</li>
                <li>Architecture logicielle</li>
                <li>Tests et qualité du code</li>
                <li>Intégration continue</li>
                <li>Documentation technique</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}