'use client';

import { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { label: 'Accueil',  href: '#top' },
  { label: 'Profil',   href: '#about' },
  { label: 'Parcours', href: '#experience' },
  { label: 'Projets',  href: '#projects' },
  { label: 'Contact',  href: '#contact' },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* Bouton hamburger / fermer — morphing animé */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        className="min-[861px]:hidden"
        style={{
          position: 'fixed',
          top: 24,
          left: 24,
          zIndex: 70,
          width: 44,
          height: 44,
          display: 'flex',
          background: 'none',
          border: 'none',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#fff',
          padding: 0,
        }}
      >
        <div style={{ width: 22, height: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <span style={{
            display: 'block',
            height: 2,
            borderRadius: 2,
            background: 'currentColor',
            transition: 'transform 350ms cubic-bezier(0.22, 1, 0.36, 1)',
            transformOrigin: 'center',
            transform: open ? 'translateY(7px) rotate(45deg)' : 'none',
          }} />
          <span style={{
            display: 'block',
            height: 2,
            borderRadius: 2,
            background: 'currentColor',
            transition: 'opacity 200ms ease, transform 300ms cubic-bezier(0.22, 1, 0.36, 1)',
            opacity: open ? 0 : 1,
            transform: open ? 'scaleX(0)' : 'scaleX(1)',
          }} />
          <span style={{
            display: 'block',
            height: 2,
            borderRadius: 2,
            background: 'currentColor',
            transition: 'transform 350ms cubic-bezier(0.22, 1, 0.36, 1)',
            transformOrigin: 'center',
            transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none',
          }} />
        </div>
      </button>

      {/* Overlay menu */}
      {open && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 65,
            background: 'rgba(2,6,23,0.97)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        >
          {/* Nav items */}
          <nav
            style={{
              display: 'flex',
              flexDirection: 'column',
              paddingTop: 'clamp(100px, 20vh, 140px)',
              paddingLeft: 'clamp(32px, 8vw, 56px)',
              paddingRight: 'clamp(32px, 8vw, 56px)',
            }}
          >
            {NAV_ITEMS.map(({ label, href }, i) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 18,
                  fontSize: 'clamp(36px, 10vw, 56px)',
                  fontWeight: 600,
                  letterSpacing: '-0.035em',
                  color: '#fff',
                  textDecoration: 'none',
                  padding: '14px 0',
                  borderBottom: i < NAV_ITEMS.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                  transition: 'color 200ms ease',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#22d3ee')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#fff')}
              >
                <span style={{
                  fontFamily: 'var(--font-geist-mono, ui-monospace)',
                  fontSize: 12,
                  color: '#475569',
                  letterSpacing: '0.04em',
                  flexShrink: 0,
                  marginBottom: 2,
                }}>
                  0{i + 1}
                </span>
                {label}
              </a>
            ))}
          </nav>

          {/* Liens sociaux */}
          <div style={{
            position: 'absolute',
            bottom: 'max(40px, env(safe-area-inset-bottom, 40px))',
            left: 'clamp(32px, 8vw, 56px)',
            right: 'clamp(32px, 8vw, 56px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <a
              href="https://www.linkedin.com/in/traviss-talamaku-ba6405168"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                color: '#94a3b8',
                textDecoration: 'none',
                fontFamily: 'var(--font-geist-mono, ui-monospace)',
                fontSize: 11,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                transition: 'color 200ms ease',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#22d3ee')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#94a3b8')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
              </svg>
              LinkedIn
            </a>
            <span style={{ color: 'rgba(255,255,255,0.08)', fontSize: 12 }}>—</span>
            <a
              href="https://www.youtube.com/@TravissTalamaku"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                color: '#94a3b8',
                textDecoration: 'none',
                fontFamily: 'var(--font-geist-mono, ui-monospace)',
                fontSize: 11,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                transition: 'color 200ms ease',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#22d3ee')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#94a3b8')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#020617"/>
              </svg>
              YouTube
            </a>
          </div>
        </div>
      )}
    </>
  );
}
