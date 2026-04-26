export type ExperienceEntry = {
  slug: string;
  title: string;
  company: string;
  location: string;
  contract: string;
  period: string;
  current?: boolean;
  summary: string;
  impact: string;
  environment?: string[];
  highlights: string[];
};

export type EducationEntry = {
  slug: string;
  title: string;
  school: string;
  period: string;
  result: string;
};

export const experiences: ExperienceEntry[] = [
  {
    slug: "turboself",
    title: "Formateur logiciel et hotliner",
    company: "Turboself",
    location: "Ingre (45)",
    contract: "CDD",
    period: "Avril 2026 - Aujourd'hui",
    current: true,
    summary:
      "Poste hybride entre deploiement terrain, support logiciel, administration systeme et accompagnement utilisateur autour de solutions informatiques metier.",
    impact:
      "J'interviens de la mise en service chez le client jusqu'au support et a la transmission de bonnes pratiques, avec un lien direct entre terrain, support et produit.",
    highlights: [
      "Deploiement et mise en service d'infrastructures, serveurs, tablettes et terminaux chez les clients",
      "Configuration reseau, verification de conformite et tests d'integration avant exploitation",
      "Diagnostic a distance, troubleshooting logiciel et analyse de problemes pour escalade vers le developpement",
      "Animation de formations, audit des besoins clients et redaction de procedures pour la base de connaissance",
    ],
  },
  {
    slug: "clog",
    title: "Technicien informatique",
    company: "C-LOG",
    location: "Ascoux (45), Poupry (28), Reau (77)",
    contract: "CDD",
    period: "Nov. 2024 - Maintenant",
    current: true,
    summary:
      "Support informatique oriente exploitation, supervision et diagnostic niveau 2 dans un environnement logistique multi-sites.",
    impact:
      "Je contribue a la stabilite des services, au suivi des incidents et a la continuite operationnelle pour les utilisateurs de l'entreprise.",
    highlights: [
      "Exploitation, supervision et contribution a l'administration des services reseaux et telecommunications",
      "Diagnostic de niveau 2, suivi des incidents via l'outil de ticketing et escalade vers les niveaux superieurs",
      "Support aux utilisateurs et controle des traitements automatises selon les procedures internes",
    ],
  },
  {
    slug: "domino-care-adsea",
    title: "Educateur specialise - veilleur",
    company: "Domino Care & ADSEA 28",
    location: "Chartres (28)",
    contract: "Mission",
    period: "Mars 2024 - Nov. 2024",
    summary:
      "Mission d'accompagnement humain, de veille nocturne et de gestion des situations sensibles en hebergements collectifs et individuels.",
    impact:
      "Cette experience a renforce mon sens de l'ecoute, de la gestion de situation et de la responsabilite dans des contextes exigeants.",
    highlights: [
      "Accompagnement et securisation de jeunes en hebergements collectifs et individuels",
      "Accueil, ecoute active et gestion des situations nocturnes",
      "Veille au respect du cadre educatif et des regles de vie",
    ],
  },
  {
    slug: "econocom",
    title: "Technicien helpdesk",
    company: "Econocom",
    location: "Chartres (28)",
    contract: "Mission",
    period: "Sept. 2023 - Nov. 2023",
    summary:
      "Support utilisateurs centre sur la prise d'appels, la resolution d'incidents de niveau 1 et le suivi rigoureux des tickets.",
    impact:
      "J'ai consolide une approche orientee service, documentation et satisfaction utilisateur dans un environnement structure.",
    environment: [
      "Windows",
      "Office 365",
      "Exchange",
      "Wifi",
      "Citrix",
      "Active Directory",
      "ServiceNow",
    ],
    highlights: [
      "Reception et enregistrement des sollicitations via ServiceNow",
      "Analyse des besoins et resolution des incidents de niveau 1 sur poste, messagerie et reseau",
      "Escalade des incidents complexes, relances et alertes sur les dossiers critiques",
      "Contribution a la documentation technique et aux procedures internes",
    ],
  },
  {
    slug: "tes-amm",
    title: "Technicien informatique",
    company: "Tes-amm",
    location: "Senonches (28)",
    contract: "Mission",
    period: "Juin 2023 - Juillet 2023",
    summary:
      "Interventions techniques de proximite autour de la maintenance, du montage et de la configuration d'equipements informatiques.",
    impact:
      "Experience terrain axee sur la fiabilite des postes et le traitement concret des incidents materiels et reseau.",
    highlights: [
      "Maintenance et depannage de PC et serveurs",
      "Montage, configuration et preparation de postes informatiques",
      "Application de configuration de switch et gestion des incidents techniques",
    ],
  },
  {
    slug: "klocel",
    title: "Analyste developpeur",
    company: "KLOCEL",
    location: "Ver-les-Chartres (28)",
    contract: "Alternance / stage",
    period: "Sept. 2022 - Fev. 2023",
    summary:
      "Experience de developpement orientee application web, CRUD metier et integration avec des APIs pour des usages operationnels.",
    impact:
      "Ce poste a renforce mon socle full-stack et ma capacite a relier interface, logique metier et flux techniques.",
    environment: ["Next.js", "Python", "APIs", "CRUD"],
    highlights: [
      "Realisation d'une application web front en Next.js et back-end en Python",
      "Creation de CRUD et mise en place de logiques metier",
      "Implementation des impressions via des APIs cote front",
    ],
  },
];

export const education: EducationEntry[] = [
  {
    slug: "ipssi",
    title: "Bachelor Developpement Fullstack & Devops - Niveau 6",
    school: "Ecole IPSSI - St Quentin en Yvelines (78)",
    period: "2022 - 2023",
    result: "Parcours en developpement full-stack et devops",
  },
  {
    slug: "jean-vilar",
    title: "BTS Services Informatiques aux Organisations option SLAM",
    school: "Lycee Jean Vilar - Plaisir (78)",
    period: "2019 - 2021",
    result: "Admis",
  },
  {
    slug: "fulbert",
    title: "Baccalaureat STMG",
    school: "Lycee Fulbert - Chartres (28)",
    period: "2017 - 2018",
    result: "Admis",
  },
];
