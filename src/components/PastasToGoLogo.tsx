import React from 'react';

interface PastasToGoLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const PastasToGoLogo: React.FC<PastasToGoLogoProps> = ({
  className = '',
  size = 'lg',
}) => {
  // Sizing definitions
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-28 h-28 sm:w-32 sm:h-32',
    xl: 'w-36 h-36 sm:w-40 sm:h-40',
  };

  return (
    <div className={`inline-flex flex-col items-center justify-center select-none ${className}`}>
      <img
        src="/pastas_to_go_logo.png"
        alt="Pastas To Go - Tradición en un Bowl"
        className={`${sizeMap[size]} object-contain drop-shadow-xs transition-transform duration-200 active:scale-95`}
        loading="eager"
      />
    </div>
  );
};
