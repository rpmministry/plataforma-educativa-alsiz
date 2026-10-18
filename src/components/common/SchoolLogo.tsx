import React from 'react';

export interface SchoolLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'monogram' | 'icon' | 'full' | 'horizontal';
  tone?: 'on-dark' | 'color' | 'auto';
  withContainer?: boolean;
}

const sizeClasses: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', string> = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24',
};

const fullSizeClasses: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', string> = {
  xs: 'h-6 w-auto',
  sm: 'h-8 w-auto',
  md: 'h-10 w-auto',
  lg: 'h-14 w-auto',
  xl: 'h-20 w-auto',
};

/**
 * Logotipo oficial de Wisdom Academy.
 * - Símbolo: "W" de trazo continuo con terminaciones redondeadas coronada por un punto de luz (#E0A82E).
 * - Horizontal: Logotipo completo Wisdom Academy tipografiado en Poppins.
 */
export const SchoolLogo: React.FC<SchoolLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'monogram',
  tone = 'on-dark',
  withContainer = false,
}) => {
  const isIcon = variant === 'monogram' || variant === 'icon';

  const strokeColor = tone === 'color' ? '#0A0A0A' : '#FFFFFF';
  const dotColor = tone === 'color' ? '#B77D06' : '#E0A82E';

  if (isIcon) {
    const iconSvg = (
      <svg
        viewBox="0 0 96 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${sizeClasses[size]} ${className} shrink-0 transition-transform duration-300`}
        aria-label="Wisdom Academy"
        role="img"
      >
        <title>Wisdom Academy</title>
        <path
          d="M14 36L31 80L48 48L65 80L82 36"
          fill="none"
          stroke={strokeColor}
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="48" cy="20" r="6" fill={dotColor} />
      </svg>
    );

    if (withContainer) {
      return (
        <div className="relative p-2 rounded-2xl bg-[#18181B] border border-[#27272A] shadow-lg shadow-black/40 flex items-center justify-center backdrop-blur-sm">
          {iconSvg}
        </div>
      );
    }

    return iconSvg;
  }

  // Logotipo completo horizontal oficial
  const logoSrc =
    tone === 'color'
      ? '/brand/wisdom-logo-horizontal-color.svg'
      : '/brand/wisdom-logo-horizontal-on-dark.svg';

  const fullLogo = (
    <img
      src={logoSrc}
      alt="Wisdom Academy"
      className={`${fullSizeClasses[size]} ${className} shrink-0 object-contain transition-transform duration-300`}
    />
  );

  if (withContainer) {
    return (
      <div className="relative px-3 py-2 rounded-2xl bg-[#18181B] border border-[#27272A] shadow-lg shadow-black/40 flex items-center justify-center backdrop-blur-sm">
        {fullLogo}
      </div>
    );
  }

  return fullLogo;
};

export default SchoolLogo;
