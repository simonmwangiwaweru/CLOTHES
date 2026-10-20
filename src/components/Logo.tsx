import React from 'react';
import logoMark from '../assets/images/logo-mark.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

/** Placeholder mark used where a product has no photo yet. */
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
const MARK_HEIGHT = { sm: 'h-9', md: 'h-11', lg: 'h-14' } as const;

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = true }) => (
  <div className={`flex select-none items-center gap-2.5 ${className}`}>
    <img
      src={logoMark}
      alt={showText ? '' : 'UNDIGNIFIED MERCH'}
      width={360}
      height={208}
      className={`${MARK_HEIGHT[size]} w-auto shrink-0`}
    />
    {showText && (
      <span className={`font-display uppercase leading-none tracking-tight text-ink ${TEXT_SIZE[size]}`}>
        UNDIGNIFIED MERCH
      </span>
    )}
  </div>
);
