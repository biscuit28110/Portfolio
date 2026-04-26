export type ProjectEntry = {
  slug: string;
  title: string;
  type: string;
  role: string;
  objective: string;
  impact: string;
  summary: string;
  liveUrl: string;
  githubUrl?: string;
  desktopImage: string;
  mobileImage: string;
  stack: string[];
  highlights: string[];
  featured?: boolean;
};

export const projects: ProjectEntry[] = [
  {
    slug: "maison-minelle",
    title: "Maison Minelle",
    type: "E-commerce / Shopify sur mesure",
    role: "Conception complete + developpement Shopify + mise en production",
    objective:
      "Creer une boutique e-commerce complete sur Shopify avec une experience utilisateur premium et une identite de marque forte.",
    impact:
      "Une boutique e-commerce complete construite sur Shopify, prete pour un usage reel avec une vraie identite de marque.",
    summary:
      "Boutique Shopify sur mesure pensee comme un produit premium, avec parcours d'achat travaille et presentation de marque soignee.",
    liveUrl: "https://maisonminelle.com",
    desktopImage: "/assets/maisonminelle/maisonminelle.png",
    mobileImage: "/assets/maisonminelle/maisonminelle-mobile.jpg",
    stack: ["Shopify", "Liquid", "JavaScript", "CSS"],
    highlights: [
      "Mise en place complete de la boutique et de sa structure Shopify",
      "Developpement d'un theme personnalise et ajout de fonctions front-end sur mesure",
      "Optimisation du parcours d'achat, des pages produits et de la navigation",
    ],
    featured: true,
  },
  {
    slug: "olocalmarket",
    title: "Olocalmarket",
    type: "Marketplace locale / Web application",
    role: "Full-stack development + architecture + base de donnees + deploiement",
    objective:
      "Creer une plateforme de mise en relation entre commerces locaux et utilisateurs avec une architecture moderne et scalable.",
    impact:
      "Une marketplace fonctionnelle permettant de structurer et exposer des offres locales.",
    summary:
      "Application web orientee data et navigation rapide, avec une base technique moderne pour exposer des offres locales.",
    liveUrl: "https://olocalmarket.com",
    desktopImage: "/assets/olocal/olocal.png",
    mobileImage: "/assets/olocal/olocal-mobile.jpg",
    stack: ["Next.js", "TypeScript", "Supabase", "TailwindCSS", "API Routes"],
    highlights: [
      "Application web construite avec Next.js, TypeScript et des donnees dynamiques",
      "Backend via API routes et base de donnees Supabase",
      "Architecture scalable, UX structuree et deploiement en production",
    ],
  },
  {
    slug: "gt-cleaning",
    title: "GT Cleaning",
    type: "Site vitrine / entreprise de nettoyage",
    role: "Conception complete + developpement WordPress + hebergement + deploiement",
    objective:
      "Creer un site vitrine professionnel pour une entreprise de nettoyage afin d'ameliorer sa visibilite et son acquisition client.",
    impact:
      "Un site vitrine en production permettant a une entreprise locale d'avoir une presence digitale professionnelle.",
    summary:
      "Site vitrine concu pour la clarte, la conversion et la presence digitale d'une entreprise locale.",
    liveUrl: "https://gt-cleaning.fr",
    desktopImage: "/assets/gtcleaning/gtcleaning.png",
    mobileImage: "/assets/gtcleaning/gtcleaning-mobile.jpg",
    stack: ["WordPress", "HTML/CSS", "Hostinger"],
    highlights: [
      "Creation complete du site, structuration des pages et integration des contenus",
      "Design oriente conversion autour des services et de la prise de contact",
      "Deploiement complet avec hebergement sur Hostinger",
    ],
  },
];
