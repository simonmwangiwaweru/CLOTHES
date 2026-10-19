import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const EclipseIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block shrink-0 ${className}`}
    aria-hidden="true"
  >
    <circle cx="16" cy="16" r="14" fill="var(--color-ink)" />
    {/* Overlapping bone circle carves the eclipse. */}
    <circle cx="21" cy="16" r="11" fill="var(--color-bg)" />
  </svg>
);

const TEXT_SIZE = { sm: 'text-xl', md: 'text-2xl', lg: 'text-3xl' } as const;
const ICON_SIZE = { sm: 18, md: 22, lg: 28 } as const;

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = true }) => (
  <div className={`flex select-none items-center gap-2 ${className}`}>
    <EclipseIcon size={ICON_SIZE[size]} />
    {showText && (
      <span className={`font-display uppercase leading-none tracking-tight text-ink ${TEXT_SIZE[size]}`}>
        UNDIGNIFIED
      </span>
    )}
  </div>
);
