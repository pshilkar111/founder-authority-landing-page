import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onOpenAudit: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenAudit }) => {
  const scrollToAudit = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('linkedin-score');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 bg-[#0B0B0F] text-[#FFFFFF] border-b border-[#262626] overflow-hidden"
    >
      {/* Subtle warm ambient glow behind hero */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[280px] bg-[#FF6A00]/[0.04] blur-[140px] pointer-events-none rounded-full" />

      <div className="relative max-w-4xl mx-auto px-6 sm:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#14141A] border border-[#262626] text-[#FF6A00] text-xs font-medium tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]" />
            <span>Trusted by Ambitious Founders</span>
          </div>
        </motion.div>

        {/* Headline: Manrope ExtraBold with Brand Accent */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#FFFFFF] tracking-tight leading-[1.15]"
        >
          Great Founders Build Great Companies.
          <br className="hidden sm:inline" />
          <span className="block mt-2 text-[#FF6A00]">
            Smart Founders Build Their Personal Brand Too.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.16 }}
          className="mt-8 text-base sm:text-lg text-[#A1A1AA] leading-relaxed max-w-2xl mx-auto space-y-2 font-normal"
        >
          <p>Most founders know they should post on LinkedIn.</p>
          <p>Very few do it consistently.</p>
          <p className="pt-1 text-[#FFFFFF]/90">
            We turn your ideas, experiences and industry insights into content that builds trust and attracts opportunities.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.24 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5"
        >
          <a
            href="#linkedin-score"
            onClick={scrollToAudit}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FF6A00] hover:bg-[#FF8533] active:bg-[#E65A00] text-[#0B0B0F] font-semibold text-sm px-7 py-3.5 rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            <span>Get My LinkedIn Score</span>
            <ArrowRight className="w-4 h-4 text-[#0B0B0F]" />
          </a>

          <button
            type="button"
            onClick={onOpenAudit}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#14141A] hover:bg-[#1C1C24] active:bg-[#14141A] text-[#FFFFFF] font-medium text-sm px-6 py-3.5 rounded-lg border border-[#262626] hover:border-[#383838] transition-colors cursor-pointer"
          >
            <span>Book Strategy Call</span>
          </button>
        </motion.div>

        {/* Below CTA: 3 Trust Proofs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.32 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[#A1A1AA]"
        >
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#FF6A00]" />
            <span>Done-for-you</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#FF6A00]" />
            <span>Founder-first</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#FF6A00]" />
            <span>No long contracts</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
