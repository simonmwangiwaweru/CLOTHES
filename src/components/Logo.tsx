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
    {/* Base dark solid circle */}
    <circle cx="16" cy="16" r="14" fill="#0A0A0A" />
    {/* Overlapping cream crescent / moon circle creating eclipse */}
    <circle cx="21" cy="16" r="11" fill="#F2EEE9" />
  </svg>
);

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = true }) => {
  const textSize = {
    sm: 'text-xl tracking-tight',
    md: 'text-2xl tracking-tighter',
    lg: 'text-3xl tracking-tighter',
  }[size];

  const iconDimension = {
    sm: 18,
    md: 22,
    lg: 28,
  }[size];

  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      <EclipseIcon size={iconDimension} />
      {showText && (
        <span
          className={`font-['Bebas_Neue',Anton,sans-serif] font-normal leading-none text-[#0A0A0A] uppercase ${textSize}`}
        >
          UNDIGNIFIED
        </span>
      )}
    </div>
  );
};
