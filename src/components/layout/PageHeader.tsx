import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import { ArrowLeft } from 'lucide-react';

interface PageHeaderProps {
  title?: string;
  showBackButton?: boolean;
  backLabel?: string;
  rightContent?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  showBackButton = true,
  backLabel = 'Retroceder',
  rightContent,
  className = '',
}) => {
  const { navigateBack, navigationHistory } = useSchool();
  const canGoBack = navigationHistory.length > 0;

  return (
    <div className={`sticky top-0 z-20 backdrop-blur-md bg-[#0A0A0A]/90 border-b border-[#27272A] ${className}`}>
      <div className="flex items-center justify-between gap-2 px-3 py-2.5 sm:px-4 sm:py-3">
        <div className="flex items-center gap-2 min-w-0">
          {showBackButton && canGoBack && (
            <button
              onClick={navigateBack}
              className="flex items-center justify-center gap-1.5 min-h-[38px] min-w-[38px] px-2.5 rounded-xl text-[#A1A1AA] hover:text-white bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] transition-colors shrink-0"
              title={backLabel}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-xs font-semibold hidden sm:inline">{backLabel}</span>
            </button>
          )}

          {title && (
            <h1 className="text-base sm:text-lg font-bold text-white tracking-tight truncate">
              {title}
            </h1>
          )}
        </div>

        <div className="flex items-center gap-2">
          {rightContent}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
