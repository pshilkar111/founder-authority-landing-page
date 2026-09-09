import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface FinalCtaSectionProps {
  onOpenAudit: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onOpenAudit }) => {
  const scrollToAudit = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('linkedin-score');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 sm:py-32 bg-[#0B0B0F] text-[#FFFFFF] border-b border-[#262626] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="bg-[#14141A] rounded-3xl p-8 sm:p-14 border border-[#262626]"
        >
          {/* Headline */}
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-[#FFFFFF] tracking-tight leading-tight max-w-2xl mx-auto">
            Stop Being The Best-Kept Secret In Your Industry.
          </h2>

          {/* Subheadline */}
          <div className="mt-5 text-base sm:text-lg text-[#A1A1AA] max-w-md mx-auto space-y-1">
            <p>Your competitors aren't smarter.</p>
            <p className="text-[#FFFFFF]/90 font-medium">They're just more visible.</p>
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href="#linkedin-score"
              onClick={scrollToAudit}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FF6A00] hover:bg-[#FF8533] active:bg-[#E65A00] text-[#0B0B0F] font-semibold text-sm px-7 py-3.5 rounded-xl transition-colors cursor-pointer shadow-sm"
            >
              <span>Get My LinkedIn Score</span>
              <ArrowRight className="w-4 h-4 text-[#0B0B0F]" />
            </a>

            <button
              type="button"
              onClick={onOpenAudit}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0B0B0F] hover:bg-[#1C1C24] text-[#FFFFFF] font-medium text-sm px-6 py-3.5 rounded-xl border border-[#262626] hover:border-[#383838] transition-colors cursor-pointer"
            >
              <span>Book Strategy Call</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
