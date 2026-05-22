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
      {/* Hamburger button */}
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
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
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
          {/* Bouton fermer — même position que le hamburger mais à droite */}
          <button
            onClick={() => setOpen(false)}
            aria-label="Fermer le menu"
            style={{
              position: 'absolute',
              top: 24,
              right: 24,
              width: 44,
              height: 44,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#fff',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

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
