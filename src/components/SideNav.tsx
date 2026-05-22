'use client';

import { useEffect, useState } from 'react';

const NAV_ITEMS = [
  { label: 'Accueil',   href: '#top',        icon: HomeIcon },
  { label: 'Profil',    href: '#about',       icon: UserIcon },
  { label: 'Parcours',  href: '#experience',  icon: BriefcaseIcon },
  { label: 'Projets',   href: '#projects',    icon: GridIcon },
  { label: 'Contact',   href: '#contact',     icon: MailIcon },
];

function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}

export function SideNav() {
  const [active, setActive] = useState('#top');
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => {
      const id = item.href.replace('#', '');
      return id === 'top' ? document.getElementById('hero') : document.getElementById(id);
    }).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const navItem = NAV_ITEMS.find((n) =>
              n.href === `#${id}` || (id === 'hero' && n.href === '#top')
            );
            if (navItem) setActive(navItem.href);
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Navigation principale"
      style={{
        position: 'fixed',
        left: 24,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 60,
        flexDirection: 'column',
        gap: 10,
      }}
      className="hidden min-[861px]:flex"
    >
      {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
        const isActive = active === href;
        return (
          <div key={href} style={{ position: 'relative' }}>
            <a
              href={href}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
              onMouseEnter={() => setHovered(href)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(href)}
              onBlur={() => setHovered(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: isActive
                  ? 'rgba(34,211,238,0.15)'
                  : 'rgba(15,23,42,0.55)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: isActive ? '1px solid rgba(34,211,238,0.35)' : '1px solid rgba(255,255,255,0.10)',
                color: isActive ? '#22d3ee' : 'rgba(255,255,255,0.55)',
                boxShadow: isActive ? '0 0 20px rgba(34,211,238,0.25)' : 'none',
                transition: 'all 250ms cubic-bezier(.22,1,.36,1)',
                textDecoration: 'none',
              }}
            >
              <Icon />
            </a>

            {/* Tooltip */}
            {hovered === href && (
              <div
                style={{
                  position: 'absolute',
                  left: 58,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  padding: '6px 11px',
                  background: 'rgba(2,6,23,0.95)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderRadius: 8,
                  fontFamily: 'var(--font-geist-mono, ui-monospace)',
                  fontSize: 11,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#cbd5e1',
                  whiteSpace: 'nowrap',
                  maxWidth: 'calc(100vw - 100px)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  pointerEvents: 'none',
                  zIndex: 70,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                }}
              >
                {label}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
