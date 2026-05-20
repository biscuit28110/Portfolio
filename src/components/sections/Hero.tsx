'use client';

import { SideNav } from '@/components/SideNav';
import { AvatarTopRight } from '@/components/AvatarTopRight';
import { AnimatedGridBg } from '@/components/AnimatedGridBg';
import { MobileNav } from '@/components/MobileNav';
import { Typewriter } from '@/components/Typewriter';

const ROLES = ['Technicien Informatique', 'Développeur Web', 'Passionné de Tech'];

const LINKEDIN = 'https://www.linkedin.com/in/traviss-talamaku-ba6405168';
const GITHUB   = 'https://github.com/biscuit28110';
const EMAIL    = 'mailto:contact@traviss.dev';

export default function Hero() {
  return (
    <>
      <SideNav />
      <AvatarTopRight />
      <MobileNav />

      <section
        id="hero"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          background: '#020617',
        }}
      >
        <AnimatedGridBg />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: 1100,
            margin: '0 auto',
            padding: '140px clamp(20px, 4vw, 56px) 120px',
            paddingLeft: 'max(clamp(20px, 4vw, 56px), 120px)',
          }}
          className="hero-content"
        >
          {/* Name */}
          <h1
            style={{
              fontFamily: 'var(--font-geist-mono, ui-monospace)',
              fontWeight: 700,
              fontSize: 'clamp(36px, 6.5vw, 92px)',
              lineHeight: 1.02,
              letterSpacing: '-0.04em',
              color: '#fff',
              margin: '0 0 24px',
            }}
          >
            Traviss&nbsp;TALAMAKU
          </h1>

          {/* Typewriter role */}
          <div
            style={{
              fontSize: 'clamp(18px, 1.8vw, 24px)',
              fontWeight: 600,
              color: '#fff',
              marginBottom: 40,
              letterSpacing: '-0.015em',
              minHeight: '1.5em',
            }}
          >
            <Typewriter roles={ROLES} />
          </div>

          {/* Social links */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {/* LinkedIn */}
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 48,
                height: 48,
                borderRadius: 12,
                background: '#fff',
                color: '#0f172a',
                transition: 'background 250ms ease, color 250ms ease',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#7dd3fc';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#fff';
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>

            {/* GitHub */}
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 48,
                height: 48,
                borderRadius: 12,
                background: '#fff',
                color: '#0f172a',
                transition: 'background 250ms ease, color 250ms ease',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = '#1f2937';
                el.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = '#fff';
                el.style.color = '#0f172a';
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </a>

            {/* Email */}
            <a
              href={EMAIL}
              aria-label="Envoyer un email"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 48,
                height: 48,
                borderRadius: 12,
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.75)',
                transition: 'border-color 250ms ease, color 250ms ease, background 250ms ease',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(34,211,238,0.5)';
                el.style.color = '#22d3ee';
                el.style.background = 'rgba(34,211,238,0.06)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(255,255,255,0.12)';
                el.style.color = 'rgba(255,255,255,0.75)';
                el.style.background = 'transparent';
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          aria-label="Défiler vers le bas"
          style={{
            position: 'absolute',
            bottom: 36,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            zIndex: 2,
            animation: 'bounce-mouse 2.2s ease-in-out infinite',
          }}
        >
          <svg
            width="28"
            height="44"
            viewBox="0 0 28 44"
            fill="none"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            <rect x="1" y="1" width="26" height="42" rx="13" stroke="currentColor" strokeWidth="1.5"/>
            <line x1="14" y1="8" x2="14" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </section>
    </>
  );
}
