'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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
        maxWidth: 'calc(100vw - 32px)',
        overflow: 'visible', /* le pill doit être visible, mais limité par max-width */
      }}
      className="hidden min-[861px]:flex"
    >
      {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
        const isActive = active === href;
        const isHovered = hovered === href;
        return (
          <motion.a
            key={href}
            href={href}
            aria-label={label}
            aria-current={isActive ? 'page' : undefined}
            onMouseEnter={() => setHovered(href)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(href)}
            onBlur={() => setHovered(null)}
            animate={{
              width: isHovered ? 148 : 48,
              background: isActive
                ? 'rgba(34,211,238,0.15)'
                : isHovered
                ? 'rgba(2,6,23,0.82)'
                : 'rgba(15,23,42,0.55)',
              borderColor: isActive
                ? 'rgba(34,211,238,0.35)'
                : isHovered
                ? 'rgba(255,255,255,0.18)'
                : 'rgba(255,255,255,0.10)',
              color: isActive ? '#22d3ee' : isHovered ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.55)',
              boxShadow: isActive
                ? '0 0 20px rgba(34,211,238,0.25)'
                : isHovered
                ? '0 4px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)'
                : 'none',
            }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'flex',
              alignItems: 'center',
              height: 48,
              borderRadius: 24,
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              border: '1px solid',
              overflow: 'hidden',
              textDecoration: 'none',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            {/* Icône — toujours centrée dans les 48px du cercle */}
            <span
              style={{
                width: 48,
                minWidth: 48,
                height: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Icon />
            </span>

            {/* Label — slide + fade depuis la droite */}
            <motion.span
              animate={{
                opacity: isHovered ? 1 : 0,
                x: isHovered ? 0 : -8,
              }}
              transition={{
                duration: 0.22,
                ease: [0.22, 1, 0.36, 1],
                delay: isHovered ? 0.06 : 0,
              }}
              style={{
                fontFamily: 'var(--font-geist-mono, ui-monospace)',
                fontSize: 11,
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                paddingRight: 18,
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              {label}
            </motion.span>
          </motion.a>
        );
      })}
    </nav>
  );
}
