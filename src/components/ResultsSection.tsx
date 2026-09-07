import React from 'react';
import { RESULTS_CARDS } from '../data/landingData';
import {
  Eye,
  Users,
  Inbox,
  UserPlus,
  Crown,
  Mic,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';

interface ResultsSectionProps {
  onOpenAudit: () => void;
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({ onOpenAudit }) => {
  const renderIcon = (name: string) => {
    const props = { className: 'w-5 h-5 text-orange-600' };
    switch (name) {
      case 'Eye':
        return <Eye {...props} />;
      case 'Users':
        return <Users {...props} />;
      case 'Inbox':
        return <Inbox {...props} />;
      case 'UserPlus':
        return <UserPlus {...props} />;
      case 'Crown':
        return <Crown {...props} />;
      case 'Mic':
        return <Mic {...props} />;
      default:
        return <TrendingUp {...props} />;
    }
  };

  return (
    <section id="results" className="py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-200/60">
            <span>Commercial Asymmetry</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            What Strong Personal Branding Creates
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Followers are a vanity metric. Real authority creates tangible
            commercial leverage that compounds across every facet of your business.
          </p>
        </div>

        {/* 6 Results Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESULTS_CARDS.map((card) => (
            <div
              key={card.id}
              className="bg-[#FAFBFD] rounded-2xl p-7 border border-slate-200/80 hover:border-slate-300 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center">
                    {renderIcon(card.iconName)}
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    {card.tagline}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-orange-500 font-bold">✓</span>
                  <h3 className="text-xl font-bold text-slate-950 tracking-tight">
                    {card.title}
                  </h3>
                </div>

                <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50/90 px-2.5 py-1 rounded-md border border-emerald-200/60">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{card.metric}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Executive summary block */}
        <div className="mt-14 rounded-2xl bg-slate-50 border border-slate-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <div className="text-base sm:text-lg font-bold text-slate-950">
              Ready to turn these 6 authority outcomes into your default advantage?
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Our free LinkedIn audit benchmarks your profile across these exact six dimensions.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenAudit}
            className="shrink-0 bg-slate-950 hover:bg-slate-900 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-xs transition-colors"
          >
            Get Your 6-Point Audit Report
          </button>
        </div>
      </div>
    </section>
  );
};
