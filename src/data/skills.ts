export type SkillCategory = {
  title: string;
  description: string;
  caption: string;
  skills: string[];
  accentColor: string;
  iconKey: "code" | "server" | "cloud" | "headset";
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Engineering",
    description: "Interfaces modernes, performantes et animées",
    caption: "Expérience produit, animations et interfaces réactives.",
    accentColor: "#22d3ee",
    iconKey: "code",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend & Systems",
    description: "APIs robustes et architecture scalable",
    caption: "Services maintenables, modélisation de données et flux fiables.",
    accentColor: "#a78bfa",
    iconKey: "server",
    skills: ["Node.js", "PostgreSQL", "Prisma", "REST APIs"],
  },
  {
    title: "Infrastructure & Deployment",
    description: "Déploiement, automatisation et gestion de serveurs",
    caption: "Pipelines, conteneurs et environnements de production maîtrisés.",
    accentColor: "#60a5fa",
    iconKey: "cloud",
    skills: ["Linux", "VPS", "Docker", "Nginx", "CI/CD", "Coolify"],
  },
  {
    title: "Support & IT Operations",
    description: "Résolution de problèmes et support technique terrain",
    caption: "Diagnostic, réseau et accompagnement des utilisateurs au quotidien.",
    accentColor: "#34d399",
    iconKey: "headset",
    skills: [
      "Networking (TCP/IP, DNS)",
      "Troubleshooting",
      "System diagnostics",
      "User support",
    ],
  },
];
