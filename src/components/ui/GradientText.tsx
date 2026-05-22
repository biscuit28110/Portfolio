import { ReactNode } from 'react';

type GradientTextProps = {
  children: ReactNode;
  from?: string;
  to?: string;
  className?: string;
};

export function GradientText({
  children,
  from = '#22d3ee',
  to = '#a78bfa',
  className = '',
}: GradientTextProps) {
  return (
    <span
      className={className}
      style={{
        background: `linear-gradient(135deg, ${from}, ${to})`,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
      }}
    >
      {children}
    </span>
  );
}
