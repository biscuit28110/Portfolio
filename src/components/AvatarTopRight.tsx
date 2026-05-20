'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export function AvatarTopRight() {
  const [visible, setVisible] = useState(true);
  const heroRef = useRef<Element | null>(null);

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;
    heroRef.current = hero;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href="https://www.linkedin.com/in/traviss-talamaku-ba6405168"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Voir le profil LinkedIn"
      className="avatar-link"
      style={{
        position: 'fixed',
        top: 24,
        right: 24,
        zIndex: 50,
        display: 'block',
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.9)',
        transition: 'opacity 350ms cubic-bezier(.22,1,.36,1), transform 350ms cubic-bezier(.22,1,.36,1)',
        pointerEvents: visible ? 'auto' : 'none',
        borderRadius: '50%',
      }}
    >
      <div
        className="avatar-ring"
        style={{
          borderRadius: '50%',
          overflow: 'hidden',
          border: '2px solid rgba(255,255,255,0.25)',
          boxShadow: '0 0 28px rgba(99,179,237,0.3)',
          position: 'relative',
        }}
      >
        <Image
          src="/assets/images/cv.png"
          alt="Traviss Talamaku"
          fill
          sizes="(max-width: 860px) 48px, 88px"
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
    </a>
  );
}
