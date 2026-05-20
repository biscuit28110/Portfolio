'use client';

import { useEffect, useRef, useState } from 'react';

type TypewriterProps = {
  roles: string[];
  writeSpeed?: number;
  deleteSpeed?: number;
  pauseAfterWrite?: number;
  pauseAfterDelete?: number;
};

export function Typewriter({
  roles,
  writeSpeed = 75,
  deleteSpeed = 32,
  pauseAfterWrite = 1800,
  pauseAfterDelete = 400,
}: TypewriterProps) {
  const [displayed, setDisplayed] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [phase, setPhase] = useState<'writing' | 'pausing' | 'deleting'>('writing');
  const prefersReducedRef = useRef(false);

  // Détection côté client uniquement — setState via setTimeout pour respecter react-hooks/set-state-in-effect
  useEffect(() => {
    prefersReducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedRef.current) return;
    const t = setTimeout(() => setDisplayed(roles[0]), 0);
    return () => clearTimeout(t);
  }, [roles]);

  useEffect(() => {
    if (prefersReducedRef.current) return;

    const current = roles[roleIndex];

    if (phase === 'writing') {
      if (displayed.length < current.length) {
        const t = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length + 1)),
          writeSpeed
        );
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase('deleting'), pauseAfterWrite);
        return () => clearTimeout(t);
      }
    }

    if (phase === 'deleting') {
      if (displayed.length > 0) {
        const t = setTimeout(
          () => setDisplayed(displayed.slice(0, -1)),
          deleteSpeed
        );
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => {
          setRoleIndex((i) => (i + 1) % roles.length);
          setPhase('writing');
        }, pauseAfterDelete);
        return () => clearTimeout(t);
      }
    }
  }, [displayed, phase, roleIndex, roles, writeSpeed, deleteSpeed, pauseAfterWrite, pauseAfterDelete]);

  return (
    <span>
      {displayed}
      <span
        aria-hidden="true"
        style={{
          display: 'inline-block',
          width: 3,
          height: '1em',
          background: '#22d3ee',
          marginLeft: 4,
          verticalAlign: '-2px',
          animation: 'blink 1s steps(2) infinite',
        }}
      />
    </span>
  );
}
