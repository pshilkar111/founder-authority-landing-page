import React from 'react';
import { PROBLEM_CARDS } from '../data/landingData';
import { AlertCircle } from 'lucide-react';

interface ProblemSectionProps {
  onOpenAudit: () => void;
}

export const ProblemSection: React.FC<ProblemSectionProps> = () => {
  return (
    <section id="problem" className="py-14 sm:py-16 bg-slate-50/50 border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-200/80 text-slate-800 text-[11px] font-bold uppercase tracking-wider mb-3">
            <AlertCircle className="w-3 h-3 text-orange-600" />
            <span>The Founder Dilemma</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Most Founders Know They Should Be Posting.{' '}
            <span className="text-orange-600">Few Do It Consistently.</span>
          </h2>

          <p className="mt-2.5 text-sm sm:text-base text-slate-600">
            You hold decades of hard-won insight. Yet an aggressive competitor with an
            inferior product is dominating your market's attention.
          </p>
        </div>

        {/* 4 Problem Cards - Compact 2x2 Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {PROBLEM_CARDS.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-2xl select-none" role="img" aria-label={card.title}>
                    {card.emoji}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Friction Point
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-950">
                  {card.title}
                </h3>

                <p className="mt-1.5 text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {card.explanation}
                </p>
              </div>

              <div className="mt-3.5 pt-3 border-t border-slate-100">
                <span className="text-[11px] font-medium text-rose-700 bg-rose-50 px-2 py-1 rounded inline-block">
                  {card.consequence}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
