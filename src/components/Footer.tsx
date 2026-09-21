import React from 'react';
import { Mail } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onOpenAudit: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-[#0B0B0F] text-[#A1A1AA] py-10 border-t border-[#262626] text-xs">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand & Tagline */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <a href="#" className="inline-flex items-center">
            <BrandLogo size="sm" />
          </a>
          <span className="text-[#A1A1AA]/40 hidden sm:inline">•</span>
          <span className="text-[#A1A1AA]/80 text-xs">
            Founders Build Companies. We Build Founder Brands.
          </span>
        </div>

        {/* Minimal Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-[#A1A1AA]">
          <a href="#linkedin-score" className="hover:text-[#FFFFFF] transition-colors">
            LinkedIn Score
          </a>
          <a href="#why-us" className="hover:text-[#FFFFFF] transition-colors">
            Why Us
          </a>
          <a href="#how-it-works" className="hover:text-[#FFFFFF] transition-colors">
            How It Works
          </a>
          <a href="#pricing" className="hover:text-[#FFFFFF] transition-colors">
            Pricing
          </a>

          <a
            href="mailto:hello@founderauthority.com"
            className="flex items-center gap-1 hover:text-[#FFFFFF] transition-colors"
          >
            <Mail className="w-3 h-3 text-[#A1A1AA]" />
            <span>hello@founderauthority.com</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
