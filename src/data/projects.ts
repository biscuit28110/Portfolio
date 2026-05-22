export type ProjectAccent = {
  primary: string;
  secondary: string;
};

export type ProjectEntry = {
  slug: string;
  title: string;
  badge: string;
  type: string;
  role: string;
  objective: string;
  impact: string;
  summary: string;
  liveUrl: string;
  githubUrl?: string;
  desktopImage?: string;
  mobileImage?: string;
  stack: string[];
  highlights: string[];
  featured?: boolean;
  status?: 'live' | 'wip';
  year: string;
  accent: ProjectAccent;
};

export const projects: ProjectEntry[] = [
  {
    slug: 'maison-minelle',
    title: 'Maison Minelle',
    badge: '★ Projet phare',
    type: 'E-commerce / Shopify sur mesure',
    role: 'Conception complète + développement Shopify + mise en production',
    objective:
      'Créer une boutique e-commerce complète sur Shopify avec une expérience utilisateur premium et une identité de marque forte.',
    impact:
      'Une boutique e-commerce complète construite sur Shopify, prête pour un usage réel avec une vraie identité de marque.',
    summary:
      'Boutique Shopify sur mesure pensée comme un produit premium, avec parcours d\'achat travaillé et présentation de marque soignée.',
    liveUrl: 'https://maisonminelle.com',
    desktopImage: '/assets/maisonminelle/maisonminelle.png',
    mobileImage: '/assets/maisonminelle/maisonminelle-mobile.jpg',
    stack: ['Shopify', 'Liquid', 'JavaScript', 'CSS'],
    highlights: [
      'Mise en place complète de la boutique et de sa structure Shopify',
      'Développement d\'un thème personnalisé et ajout de fonctions front-end sur mesure',
      'Optimisation du parcours d\'achat, des pages produits et de la navigation',
    ],
    featured: true,
    status: 'live',
    year: '2024',
    accent: { primary: '#22d3ee', secondary: '#a78bfa' },
  },
  {
    slug: 'olocalmarket',
    title: 'Olocal Market',
    badge: 'Full-stack',
    type: 'Marketplace locale / Web application',
    role: 'Full-stack development + architecture + base de données + déploiement',
    objective:
      'Créer une plateforme de mise en relation entre commerces locaux et utilisateurs avec une architecture moderne et scalable.',
    impact:
      'Une marketplace fonctionnelle permettant de structurer et exposer des offres locales.',
    summary:
      'Application web orientée data et navigation rapide, avec une base technique moderne pour exposer des offres locales.',
    liveUrl: 'https://olocalmarket.com',
    desktopImage: '/assets/olocal/olocal.png',
    mobileImage: '/assets/olocal/olocal-mobile.jpg',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind', 'API Routes'],
    highlights: [
      'Application web construite avec Next.js, TypeScript et des données dynamiques',
      'Backend via API routes et base de données Supabase',
      'Architecture scalable, UX structurée et déploiement en production',
    ],
    status: 'live',
    year: '2023',
    accent: { primary: '#a78bfa', secondary: '#60a5fa' },
  },
  {
    slug: 'boutique-tta-dev',
    title: 'Boutique TTA-Dev',
    badge: 'Nouveau · En cours',
    type: 'E-commerce personnel · En développement actif',
    role: 'Conception + développement full-stack + déploiement',
    objective:
      'Créer une boutique e-commerce personnelle moderne pour vendre des ressources et templates de développement.',
    impact:
      'Projet en développement actif — une vitrine e-commerce performante avec stack Next.js moderne.',
    summary:
      'Boutique e-commerce personnelle construite avec Next.js, en cours de développement avec une stack moderne.',
    liveUrl: 'https://boutique.tta-dev.fr',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Custom'],
    highlights: [
      'Architecture e-commerce moderne avec Next.js App Router',
      'UI/UX premium avec animations Framer Motion',
      'Déploiement sur infrastructure VPS personnelle',
    ],
    status: 'wip',
    year: '2026',
    accent: { primary: '#60a5fa', secondary: '#34d399' },
  },
  {
    slug: 'gt-cleaning',
    title: 'GT Cleaning',
    badge: 'Site vitrine',
    type: 'Site vitrine / entreprise de nettoyage',
    role: 'Conception complète + développement WordPress + hébergement + déploiement',
    objective:
      'Créer un site vitrine professionnel pour une entreprise de nettoyage afin d\'améliorer sa visibilité et son acquisition client.',
    impact:
      'Un site vitrine en production permettant à une entreprise locale d\'avoir une présence digitale professionnelle.',
    summary:
      'Site vitrine conçu pour la clarté, la conversion et la présence digitale d\'une entreprise locale.',
    liveUrl: 'https://gt-cleaning.fr',
    desktopImage: '/assets/gtcleaning/gtcleaning.png',
    mobileImage: '/assets/gtcleaning/gtcleaning-mobile.jpg',
    stack: ['WordPress', 'HTML/CSS', 'Hostinger'],
    highlights: [
      'Création complète du site, structuration des pages et intégration des contenus',
      'Design orienté conversion autour des services et de la prise de contact',
      'Déploiement complet avec hébergement sur Hostinger',
    ],
    status: 'live',
    year: '2023',
    accent: { primary: '#34d399', secondary: '#22d3ee' },
  },
];
