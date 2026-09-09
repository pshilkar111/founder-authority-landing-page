import React from 'react';
import { Linkedin, Mail, ShieldCheck } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onOpenAudit: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
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

        {/* Minimal Navigation & Admin */}
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

          {onOpenAdmin && (
            <button
              type="button"
              onClick={onOpenAdmin}
              className="hover:text-[#FFFFFF] transition-colors cursor-pointer text-[#A1A1AA]/60 hover:text-[#FF6A00] flex items-center gap-1"
            >
              <ShieldCheck className="w-3 h-3 text-[#FF6A00]" />
              <span>Admin</span>
            </button>
          )}

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
