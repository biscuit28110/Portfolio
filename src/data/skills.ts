export type SkillItem =
  | { type: 'logo'; name: string; iconSlug: string; color: string }
  | { type: 'mono'; name: string };

export type MarqueeBand = {
  label: string;
  sub: string;
  color: string;
  speed: string;
  direction: 'rtl' | 'ltr';
  skills: SkillItem[];
};

export const marqueeBands: MarqueeBand[] = [
  {
    label: 'Frontend Engineering',
    sub: '01 — UI / UX / Animation',
    color: '#22d3ee',
    speed: '38s',
    direction: 'rtl',
    skills: [
      { type: 'logo', name: 'Next.js',       iconSlug: 'nextdotjs',   color: '#ffffff' },
      { type: 'logo', name: 'React 19',      iconSlug: 'react',       color: '#61DAFB' },
      { type: 'logo', name: 'TypeScript',    iconSlug: 'typescript',  color: '#3178C6' },
      { type: 'logo', name: 'Tailwind v4',   iconSlug: 'tailwindcss', color: '#06B6D4' },
      { type: 'logo', name: 'Framer Motion', iconSlug: 'framer',      color: '#0055FF' },
      { type: 'logo', name: 'JavaScript',    iconSlug: 'javascript',  color: '#F7DF1E' },
      { type: 'logo', name: 'HTML5',         iconSlug: 'html5',       color: '#E34F26' },
      { type: 'logo', name: 'CSS3',          iconSlug: 'css',         color: '#1572B6' },
    ],
  },
  {
    label: 'Backend & Systems',
    sub: '02 — APIs / Data / Logic',
    color: '#a78bfa',
    speed: '46s',
    direction: 'ltr',
    skills: [
      { type: 'logo', name: 'Node.js',    iconSlug: 'nodedotjs',  color: '#339933' },
      { type: 'logo', name: 'PostgreSQL', iconSlug: 'postgresql', color: '#4169E1' },
      { type: 'logo', name: 'Prisma',     iconSlug: 'prisma',     color: '#2D3748' },
      { type: 'logo', name: 'Supabase',   iconSlug: 'supabase',   color: '#3FCF8E' },
      { type: 'logo', name: 'Python',     iconSlug: 'python',     color: '#3776AB' },
      { type: 'logo', name: 'Express',    iconSlug: 'express',    color: '#ffffff' },
      { type: 'logo', name: 'JSON',       iconSlug: 'json',       color: '#ffffff' },
    ],
  },
  {
    label: 'Infrastructure & Deploy',
    sub: '03 — Servers / Containers / CI',
    color: '#60a5fa',
    speed: '42s',
    direction: 'rtl',
    skills: [
      { type: 'logo', name: 'Linux',          iconSlug: 'linux',         color: '#FCC624' },
      { type: 'logo', name: 'Docker',         iconSlug: 'docker',        color: '#2496ED' },
      { type: 'logo', name: 'Nginx',          iconSlug: 'nginx',         color: '#009639' },
      { type: 'logo', name: 'Ubuntu',         iconSlug: 'ubuntu',        color: '#E95420' },
      { type: 'logo', name: 'Debian',         iconSlug: 'debian',        color: '#A81D33' },
      { type: 'logo', name: 'Vercel',         iconSlug: 'vercel',        color: '#ffffff' },
      { type: 'logo', name: 'GitHub Actions', iconSlug: 'githubactions', color: '#2088FF' },
      { type: 'logo', name: 'Hostinger',      iconSlug: 'hostinger',     color: '#673DE6' },
      { type: 'logo', name: 'Coolify',        iconSlug: 'coolify',       color: '#6B16ED' },
    ],
  },
  {
    label: 'Support & IT Operations',
    sub: '04 — Network / Diagnostic / User',
    color: '#34d399',
    speed: '50s',
    direction: 'ltr',
    skills: [
      { type: 'logo', name: 'Citrix',     iconSlug: 'citrix',     color: '#452170' },
      { type: 'logo', name: 'TeamViewer', iconSlug: 'teamviewer', color: '#050A52' },
      { type: 'mono', name: 'Windows' },
      { type: 'mono', name: 'Office 365' },
      { type: 'mono', name: 'Exchange' },
      { type: 'mono', name: 'ServiceNow' },
      { type: 'mono', name: 'Active Directory' },
    ],
  },
];
