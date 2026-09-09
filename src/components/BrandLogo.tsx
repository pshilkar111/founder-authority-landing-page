import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md', showTagline = false }) => {
  const iconBoxSizes = {
    sm: 'w-7 h-7 rounded-[8px] text-[13px]',
    md: 'w-8 h-8 rounded-[10px] text-[15px]',
    lg: 'w-10 h-10 rounded-[12px] text-[19px]',
  };

  const textSizes = {
    sm: 'text-sm sm:text-base',
    md: 'text-base sm:text-lg',
    lg: 'text-xl sm:text-2xl',
  };

  return (
    <div className="flex items-center gap-2.5 group select-none">
      {/* Visual Logo Emblem Mark: [F (White) A (Vibrant Orange)] matching uploaded reference */}
      <div
        className={`relative flex items-center justify-center font-display font-black tracking-tighter ${iconBoxSizes[size]} bg-[#080A12] border border-[#262626] shadow-sm group-hover:border-[#FF6A00]/70 group-hover:shadow-[0_0_14px_rgba(255,106,0,0.25)] transition-all shrink-0`}
      >
        <div className="flex items-center justify-center leading-none tracking-tight -translate-y-[0.5px]">
          <span className="text-[#FFFFFF] font-extrabold">F</span>
          <span className="text-[#FF6A00] font-extrabold -ml-[0.5px]">A</span>
        </div>
      </div>

      {/* Brand Name Typography: Manrope ExtraBold with matching accent dot */}
      <div className="flex flex-col leading-none">
        <span className={`font-display font-extrabold ${textSizes[size]} tracking-tight text-[#FFFFFF] flex items-center gap-1.5`}>
          Founder Authority
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] inline-block shadow-[0_0_8px_rgba(255,106,0,0.5)]" />
        </span>
        {showTagline && (
          <span className="text-[10px] uppercase tracking-widest text-[#A1A1AA] font-medium mt-1">
            Executive Personal Branding
          </span>
        )}
      </div>
    </div>
  );
};
