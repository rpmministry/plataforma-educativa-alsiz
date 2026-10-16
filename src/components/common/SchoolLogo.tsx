import React from 'react';

interface SchoolLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'monogram' | 'full';
  withContainer?: boolean;
}

const sizeClasses = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24',
};

const fullSizeClasses = {
  xs: 'h-6 w-auto',
  sm: 'h-8 w-auto',
  md: 'h-10 w-auto',
  lg: 'h-14 w-auto',
  xl: 'h-20 w-auto',
};

export const SchoolLogo: React.FC<SchoolLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'monogram',
  withContainer = false,
}) => {
  // Monograma "E" de Ekballo Church optimizado para avatares e iconos compactos
  if (variant === 'monogram') {
    const monogramSvg = (
      <svg
        viewBox="28 22 64 88"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${sizeClasses[size]} ${className} shrink-0 transition-transform duration-300`}
        aria-label="Logo Ekballo Church - ALSIZ"
        role="img"
      >
        <defs>
          <linearGradient id="ekballoGoldGrad" x1="32" y1="27" x2="88" y2="105" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F59E0B" />
            <stop offset="0.5" stopColor="#E59000" />
            <stop offset="1" stopColor="#D97706" />
          </linearGradient>
        </defs>
        <path
          d="M32.95 104.83L32.95 27.46L86.57 27.46L86.57 38.01L43.67 38.01L43.67 60.89L83.22 60.89L83.22 71.37L43.67 71.37L43.67 94.19L87.13 94.19L87.13 104.83L32.95 104.83Z"
          fill="url(#ekballoGoldGrad)"
        />
      </svg>
    );

    if (withContainer) {
      return (
        <div className="relative p-2 rounded-2xl bg-[#121820] border border-[#283545] shadow-lg shadow-black/40 flex items-center justify-center backdrop-blur-sm">
          {monogramSvg}
        </div>
      );
    }
    return monogramSvg;
  }

  // Logotipo completo de Ekballo Church (Vector Oficial)
  const fullSvg = (
    <svg
      viewBox="0 0 444 102"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${fullSizeClasses[size]} ${className} shrink-0 transition-transform duration-300`}
      aria-label="Ekballo Church Logo Completo"
      role="img"
    >
      <defs>
        <linearGradient id="ekballoWordmarkGrad" x1="0" y1="25" x2="440" y2="105" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="0.6" stopColor="#ECEFF1" />
          <stop offset="1" stopColor="#BCBEBE" />
        </linearGradient>
      </defs>
      <g transform="translate(222 51) scale(1) translate(-254.13 -76.92)" fill="url(#ekballoWordmarkGrad)">
        {/* EKBALLO */}
        <path
          fillRule="evenodd"
          d="M32.95 104.83L32.95 27.46L86.57 27.46L86.57 38.01L43.67 38.01L43.67 60.89L83.22 60.89L83.22 71.37L43.67 71.37L43.67 94.19L87.13 94.19L87.13 104.83L32.95 104.83ZM96.8 104.83L96.8 27.46L107.42 27.46L107.42 65.49L142.82 27.46L157.27 27.46L126.78 60.34L159.18 104.83L146.03 104.83L119.43 68.24L107.42 81.25L107.42 104.83ZM161.01 104.83L161.01 27.46L193.28 27.46C194.73 27.46 197.2 28.33 198.73 28.84C213.45 33.83 217.77 51.73 206.66 62.77C210.73 65.79 214.2 69.34 215.75 74.29C219.53 86.33 213.85 99 201.89 103.17C200.13 103.78 198.3 104.83 196.09 104.83L161.01 104.83Z M171.8 37.95L171.8 58.88L192.71 58.88C193.11 58.88 194.29 58.27 194.84 58.13C205.49 55.53 203.25 38.01 193.81 38.01L171.8 38.01Z M171.8 69.21L171.8 94.19L196.01 94.19C197.06 94.19 199.43 92.77 200.42 92.19C209.85 86.65 206.53 69.21 194.86 69.21L171.8 69.21ZM276.2 104.83L267.64 82.87L238.93 82.87L230.38 104.83L218.97 104.83L249.18 27.46L257.4 27.46L287.61 104.83L276.2 104.83Z M263.48 72.15L253.24 46.06L243.08 72.15L263.48 72.15ZM291.88 104.83L291.88 27.46L302.39 27.46L302.39 94.19L341.28 94.19L341.28 104.83L291.88 104.83ZM347.88 104.83L347.88 27.46L358.4 27.46L358.4 94.19L397.29 94.19L397.29 104.83L347.88 104.83ZM475.31 66.15C475.29 71.18 474.47 76.18 472.7 80.89C468.72 91.46 460.29 99.78 449.57 103.4C445.5 104.77 441.24 105.4 436.95 105.42C432.66 105.4 428.4 104.77 424.33 103.4C413.61 99.78 405.17 91.46 401.2 80.89C399.42 76.18 398.61 71.18 398.59 66.15C398.61 61.11 399.42 56.12 401.2 51.4C405.17 40.83 413.61 32.51 424.33 28.89C428.4 27.52 432.66 26.89 436.95 26.87C441.24 26.89 445.5 27.52 449.57 28.89C460.29 32.51 468.72 40.83 472.7 51.4C474.47 56.12 475.29 61.11 475.31 66.15ZM464.02 66.12C464.01 62.2 463.33 58.3 461.87 54.65C458.89 47.19 452.75 41.22 445.05 38.8C442.42 37.98 439.68 37.6 436.93 37.59C434.17 37.6 431.44 37.98 428.8 38.8C421.1 41.22 414.96 47.19 411.98 54.65C410.52 58.3 409.85 62.2 409.83 66.12C409.85 70.04 410.52 73.94 411.98 77.59C414.96 85.05 421.1 91.02 428.8 93.44C431.44 94.26 434.17 94.64 436.93 94.66C439.68 94.64 442.42 94.26 445.05 93.44C452.75 91.02 458.89 85.05 461.87 77.59C463.33 73.94 464.01 70.04 464.02 66.12Z"
        />
        {/* CHURCH */}
        <path
          fillRule="nonzero"
          fill="#BCBEBE"
          d="M45.8 116.18A6.36 6.42 0 1 0 45.71 123.4L43.67 121.94A3.86 3.91 0 1 1 43.59 117.39ZM77.24 113.39L79.78 113.39L79.78 118.52L84.89 118.52L84.89 113.39L87.44 113.39L87.44 125.94L84.89 125.94L84.89 120.9L79.78 120.9L79.78 125.94L77.24 125.94ZM119.18 113.39L119.18 121.2A4.99 4.99 0 0 0 129.15 121.2L129.15 113.39L126.61 113.39L126.61 121.2A2.44 2.44 0 0 1 121.72 121.2L121.72 113.39ZM160.88 113.37L163.43 113.37L163.43 125.96L160.88 125.96ZM160.88 113.37L166.01 113.37A4.21 4.21 0 0 1 166.01 121.79L160.88 121.79ZM163.43 115.92L163.43 119.25L166.01 119.25A1.66 1.66 0 0 0 166.01 115.92ZM163.82 119.5L166.69 119.5L170.58 125.96L167.7 125.96ZM212.8 116.18A6.36 6.42 0 1 0 212.71 123.4L210.67 121.94A3.86 3.91 0 1 1 210.59 117.39ZM243.91 113.39L246.46 113.39L246.46 118.52L251.56 118.52L251.56 113.39L254.11 113.39L254.11 125.94L251.56 125.94L251.56 120.9L246.46 120.9L246.46 125.94L243.91 125.94Z"
        />
        {/* Barras de acento */}
        <path
          fillRule="evenodd"
          fill="#E59000"
          d="M291.02 126.98L291.02 116.02L342.98 116.02L342.98 126.98L291.02 126.98ZM347.02 126.98L347.02 116.02L399.01 116.02L399.01 126.98L347.02 126.98Z"
        />
      </g>
    </svg>
  );

  if (withContainer) {
    return (
      <div className="relative px-3 py-2 rounded-2xl bg-[#121820] border border-[#283545] shadow-lg shadow-black/40 flex items-center justify-center backdrop-blur-sm">
        {fullSvg}
      </div>
    );
  }

  return fullSvg;
};
