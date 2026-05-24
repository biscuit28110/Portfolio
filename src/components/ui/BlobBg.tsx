type BlobBgProps = {
  blobs: Array<{
    color: 'cyan' | 'violet' | 'blue' | 'emerald';
    size: number;
    top?: string | number;
    bottom?: string | number;
    left?: string | number;
    right?: string | number;
    opacity?: number;
  }>;
};

const colorMap = {
  cyan:    '#22d3ee',
  violet:  '#a78bfa',
  blue:    '#60a5fa',
  emerald: '#34d399',
};

export function BlobBg({ blobs }: BlobBgProps) {
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
      {blobs.map((b, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: b.size,
            height: b.size,
            borderRadius: '999px',
            filter: 'blur(140px)',
            pointerEvents: 'none',
            opacity: b.opacity ?? 0.07,
            mixBlendMode: 'screen',
            background: `radial-gradient(circle, ${colorMap[b.color]} 0%, transparent 70%)`,
            top: b.top,
            bottom: b.bottom,
            left: b.left,
            right: b.right,
          }}
        />
      ))}
    </div>
  );
}
