export type SkillCategory = {
  title: string;
  description: string;
  caption: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Engineering",
    description: "Interfaces modernes, performantes et animées",
    caption: "Expérience produit, animations et interfaces réactives.",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
  {
    title: "Backend & Systems",
    description: "APIs robustes et architecture scalable",
    caption: "Services maintenables, modélisation de données et flux fiables.",
    skills: ["Node.js", "PostgreSQL", "Prisma", "REST APIs"],
  },
  {
    title: "Infrastructure & Deployment",
    description: "Déploiement, automatisation et gestion de serveurs",
    caption: "Pipelines, conteneurs et environnements de production maîtrisés.",
    skills: ["Linux", "VPS", "Docker", "Nginx", "CI/CD", "Coolify"],
  },
  {
    title: "Support & IT Operations",
    description: "Résolution de problèmes et support technique terrain",
    caption: "Diagnostic, réseau et accompagnement des utilisateurs au quotidien.",
    skills: [
      "Networking (TCP/IP, DNS)",
      "Troubleshooting",
      "System diagnostics",
      "User support",
    ],
  },
];
