'use client';

import { useState } from 'react';

const EMAIL = 'contact@traviss.dev';

export function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      try {
        const ta = document.createElement('textarea');
        ta.value = EMAIL;
        ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      } catch {
        // les deux méthodes ont échoué
      }
    }
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '18px 24px',
        fontSize: 14,
        fontWeight: 500,
        border: `1px solid ${copied ? 'rgba(52,211,153,0.35)' : 'rgba(255,255,255,0.12)'}`,
        background: copied ? 'rgba(52,211,153,0.08)' : 'rgba(255,255,255,0.04)',
        borderRadius: 999,
        color: copied ? '#34d399' : '#fff',
        cursor: 'pointer',
        transition: 'all 250ms ease',
        fontFamily: 'inherit',
      }}
      aria-label="Copier l'adresse email"
    >
      {copied ? (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Email copié !
        </>
      ) : (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
          Copier l&apos;email
        </>
      )}
    </button>
  );
}
