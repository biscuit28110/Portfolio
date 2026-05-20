export type SkillItem =
  | { type: 'logo'; name: string; iconUrl: string }
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
      { type: 'logo', name: 'Next.js',       iconUrl: 'https://cdn.simpleicons.org/nextdotjs/ffffff' },
      { type: 'logo', name: 'React 19',      iconUrl: 'https://cdn.simpleicons.org/react/61DAFB' },
      { type: 'logo', name: 'TypeScript',    iconUrl: 'https://cdn.simpleicons.org/typescript/3178C6' },
      { type: 'logo', name: 'Tailwind v4',   iconUrl: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
      { type: 'logo', name: 'Framer Motion', iconUrl: 'https://cdn.simpleicons.org/framer/0055FF' },
      { type: 'logo', name: 'JavaScript',    iconUrl: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
      { type: 'logo', name: 'HTML5',         iconUrl: 'https://cdn.simpleicons.org/html5/E34F26' },
      { type: 'logo', name: 'CSS3',          iconUrl: 'https://cdn.simpleicons.org/css3/1572B6' },
      { type: 'mono', name: 'App Router' },
      { type: 'mono', name: 'Server Components' },
    ],
  },
  {
    label: 'Backend & Systems',
    sub: '02 — APIs / Data / Logic',
    color: '#a78bfa',
    speed: '46s',
    direction: 'ltr',
    skills: [
      { type: 'logo', name: 'Node.js',    iconUrl: 'https://cdn.simpleicons.org/nodedotjs/339933' },
      { type: 'logo', name: 'PostgreSQL', iconUrl: 'https://cdn.simpleicons.org/postgresql/4169E1' },
      { type: 'logo', name: 'Prisma',     iconUrl: 'https://cdn.simpleicons.org/prisma/2D3748' },
      { type: 'logo', name: 'Supabase',   iconUrl: 'https://cdn.simpleicons.org/supabase/3FCF8E' },
      { type: 'logo', name: 'Python',     iconUrl: 'https://cdn.simpleicons.org/python/3776AB' },
      { type: 'logo', name: 'Express',    iconUrl: 'https://cdn.simpleicons.org/express/ffffff' },
      { type: 'mono', name: 'REST' },
      { type: 'mono', name: 'CRUD' },
      { type: 'mono', name: 'JSON' },
    ],
  },
  {
    label: 'Infrastructure & Deploy',
    sub: '03 — Servers / Containers / CI',
    color: '#60a5fa',
    speed: '42s',
    direction: 'rtl',
    skills: [
      { type: 'logo', name: 'Linux',          iconUrl: 'https://cdn.simpleicons.org/linux/FCC624' },
      { type: 'logo', name: 'Docker',         iconUrl: 'https://cdn.simpleicons.org/docker/2496ED' },
      { type: 'logo', name: 'Nginx',          iconUrl: 'https://cdn.simpleicons.org/nginx/009639' },
      { type: 'logo', name: 'Ubuntu',         iconUrl: 'https://cdn.simpleicons.org/ubuntu/E95420' },
      { type: 'logo', name: 'Debian',         iconUrl: 'https://cdn.simpleicons.org/debian/A81D33' },
      { type: 'logo', name: 'Vercel',         iconUrl: 'https://cdn.simpleicons.org/vercel/ffffff' },
      { type: 'logo', name: 'GitHub Actions', iconUrl: 'https://cdn.simpleicons.org/githubactions/2088FF' },
      { type: 'mono', name: 'Hostinger' },
      { type: 'mono', name: 'VPS' },
      { type: 'mono', name: 'Coolify' },
      { type: 'mono', name: 'CI / CD' },
    ],
  },
  {
    label: 'Support & IT Operations',
    sub: '04 — Network / Diagnostic / User',
    color: '#34d399',
    speed: '50s',
    direction: 'ltr',
    skills: [
      { type: 'logo', name: 'Citrix',           iconUrl: 'https://cdn.simpleicons.org/citrix/452170' },
      { type: 'mono', name: 'Windows' },
      { type: 'mono', name: 'Office 365' },
      { type: 'mono', name: 'Exchange' },
      { type: 'mono', name: 'ServiceNow' },
      { type: 'mono', name: 'TCP / IP' },
      { type: 'mono', name: 'DNS' },
      { type: 'mono', name: 'Active Directory' },
      { type: 'mono', name: 'Troubleshooting' },
      { type: 'mono', name: 'User Support' },
    ],
  },
];
