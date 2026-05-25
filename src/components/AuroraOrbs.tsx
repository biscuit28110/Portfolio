export function AuroraOrbs() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        overflowX: 'clip',
        overflowY: 'clip',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* Orbe cyan — dérive depuis le coin supérieur gauche */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.18) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'aurora-drift-1 32s ease-in-out infinite',
          willChange: 'transform',
        }}
      />

      {/* Orbe violet — dérive depuis le coin inférieur droit */}
      <div
        style={{
          position: 'absolute',
          bottom: '-15%',
          right: '-5%',
          width: 720,
          height: 720,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(167,139,250,0.14) 0%, transparent 70%)',
          filter: 'blur(90px)',
          animation: 'aurora-drift-2 40s ease-in-out infinite',
          willChange: 'transform',
        }}
      />

      {/* Orbe blue — dérive depuis le centre-droit */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: 560,
          height: 560,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(96,165,250,0.10) 0%, transparent 70%)',
          filter: 'blur(70px)',
          animation: 'aurora-drift-3 26s ease-in-out infinite',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
