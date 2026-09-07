import React from 'react';
import { PROBLEM_CARDS } from '../data/landingData';
import { AlertCircle, ArrowRight } from 'lucide-react';

interface ProblemSectionProps {
  onOpenAudit: () => void;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ onOpenAudit }) => {
  return (
    <section id="problem" className="py-24 bg-[#FAFBFD] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-4">
            <AlertCircle className="w-3.5 h-3.5 text-orange-600" />
            <span>The Founder LinkedIn Dilemma</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Most Founders Know They Should Be Posting.{' '}
            <span className="text-orange-600">Few Do It Consistently.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            You built a valuable company, solved hard technical problems, and
            hold decades of combined insight. Yet on LinkedIn, an aggressive
            competitor with an inferior product is capturing the market's attention.
          </p>
        </div>

        {/* 4 Problem Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PROBLEM_CARDS.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-2xl p-7 sm:p-8 border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl sm:text-4xl select-none" role="img" aria-label={card.title}>
                    {card.emoji}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider group-hover:text-orange-600 transition-colors">
                    Friction Point
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight">
                  {card.title}
                </h3>

                <p className="mt-3.5 text-slate-600 text-sm sm:text-base leading-relaxed">
                  {card.explanation}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <div className="text-xs font-semibold text-rose-700 bg-rose-50/80 px-3 py-2 rounded-lg border border-rose-100/70">
                  {card.consequence}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Transition Callout */}
        <div className="mt-12 bg-slate-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="max-w-2xl text-center md:text-left">
            <div className="text-xs font-bold text-orange-400 uppercase tracking-wider">
              The Reality
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white mt-1">
              Building a brand doesn’t require more of your time. It requires a dedicated executive media machine.
            </h4>
          </div>

          <button
            type="button"
            onClick={onOpenAudit}
            className="shrink-0 inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all shadow-md hover:shadow-orange-600/20"
          >
            <span>Fix Your Consistency Today</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
