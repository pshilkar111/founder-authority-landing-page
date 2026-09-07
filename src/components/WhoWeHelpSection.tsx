import React from 'react';
import { WHO_WE_HELP_CARDS } from '../data/landingData';
import {
  ShoppingBag,
  Rocket,
  TrendingUp,
  Briefcase,
  Building2,
  ArrowRight,
  Target,
} from 'lucide-react';

interface WhoWeHelpSectionProps {
  onOpenAudit: (audience?: string) => void;
}

export const WhoWeHelpSection: React.FC<WhoWeHelpSectionProps> = ({ onOpenAudit }) => {
  const renderIcon = (name: string) => {
    const props = { className: 'w-6 h-6 text-slate-900' };
    switch (name) {
      case 'ShoppingBag':
        return <ShoppingBag {...props} />;
      case 'Rocket':
        return <Rocket {...props} />;
      case 'TrendingUp':
        return <TrendingUp {...props} />;
      case 'Briefcase':
        return <Briefcase {...props} />;
      case 'Building2':
        return <Building2 {...props} />;
      default:
        return <Target {...props} />;
    }
  };

  return (
    <section id="who-we-help" className="py-24 bg-[#FAFBFD] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/70 text-slate-800 text-xs font-bold uppercase tracking-wider mb-4">
            <span>Specialized Authority Positioning</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Who We Help Dominate LinkedIn
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            We don’t work with everyone. We focus strictly on ambitious operators
            where personal credibility translates directly into high-ticket enterprise value.
          </p>
        </div>

        {/* 5 Audience Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHO_WE_HELP_CARDS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-2xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
                    {renderIcon(item.iconName)}
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                    {item.statBadge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-950 tracking-tight">
                  {item.title}
                </h3>

                <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100">
                <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-1.5 flex items-center gap-1">
                  <Target className="w-3.5 h-3.5 text-orange-500" />
                  <span>Desired Outcome</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
                  {item.desiredOutcome}
                </p>

                <button
                  type="button"
                  onClick={() => onOpenAudit(item.title)}
                  className="mt-4 w-full text-xs font-bold text-slate-700 hover:text-orange-600 py-2 rounded-lg bg-slate-50 hover:bg-orange-50/60 border border-slate-200/60 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Build Strategy for {item.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {/* Quick Qualification Card to complete the 6th slot cleanly */}
          <div className="rounded-2xl p-7 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex flex-col justify-between shadow-md">
            <div>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-orange-400 mb-3">
                <span>Not Sure Where You Fit?</span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Are You a Founder or Executive?
              </h3>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                If your target customers, investors, or senior hires perform a
                search for your name before signing an agreement, building
                Founder Authority will yield immediate asymmetric returns.
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-800">
              <button
                type="button"
                onClick={() => onOpenAudit()}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <span>Request Custom Positioning Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
