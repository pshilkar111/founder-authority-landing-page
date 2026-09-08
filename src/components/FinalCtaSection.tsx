import React from 'react';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

interface FinalCtaSectionProps {
  onOpenAudit: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onOpenAudit }) => {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-slate-950 text-white p-7 sm:p-10 overflow-hidden shadow-xl border border-slate-800 text-center">
          {/* Subtle Orange Glow */}
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-orange-500/10 blur-[90px] pointer-events-none rounded-full" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-orange-400 border border-slate-800 text-[11px] font-semibold mb-4">
              <Sparkles className="w-3 h-3" />
              <span>Limited to 8 New Founders Monthly</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Stop Being The Best Kept Secret In Your Industry.
            </h2>

            <p className="mt-3 text-sm sm:text-base text-slate-300">
              Let's turn your expertise into influence and opportunities.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                id="final-cta-btn"
                onClick={onOpenAudit}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold px-6 py-3.5 rounded-xl shadow-md transition-all group"
              >
                <span>Book Your Free LinkedIn Audit</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs text-slate-400 font-medium">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Zero sales pressure</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Custom 7-point audit breakdown</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Delivered within 48 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
