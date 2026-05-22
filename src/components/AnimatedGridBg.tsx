'use client';

export function AnimatedGridBg() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        perspective: '900px',
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      {/* Plane bas — défile vers le bas */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: 'rotateX(62deg)',
          transformOrigin: 'center bottom',
          backgroundImage: `
            linear-gradient(rgba(56,189,248,0.30) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56,189,248,0.30) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          animation: 'grid-scroll-down 16s linear infinite',
          WebkitMaskImage:
            'radial-gradient(ellipse 100% 70% at 50% 100%, black 30%, transparent 80%)',
          maskImage:
            'radial-gradient(ellipse 100% 70% at 50% 100%, black 30%, transparent 80%)',
        }}
      />

      {/* Plane haut — direction inverse */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: 'rotateX(-62deg)',
          transformOrigin: 'center top',
          backgroundImage: `
            linear-gradient(rgba(56,189,248,0.18) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56,189,248,0.18) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          animation: 'grid-scroll-up 22s linear infinite',
          WebkitMaskImage:
            'radial-gradient(ellipse 100% 70% at 50% 0%, black 30%, transparent 80%)',
          maskImage:
            'radial-gradient(ellipse 100% 70% at 50% 0%, black 30%, transparent 80%)',
        }}
      />

      {/* Glow central */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 900,
          height: 900,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(34,211,238,0.08) 0%, rgba(59,130,246,0.05) 40%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
