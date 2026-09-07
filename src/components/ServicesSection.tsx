import React from 'react';
import { SERVICES_CARDS } from '../data/landingData';
import {
  UserCheck,
  Compass,
  PenTool,
  Sparkles,
  Target,
  Award,
  ArrowRight,
  Check,
} from 'lucide-react';

interface ServicesSectionProps {
  onOpenAudit: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenAudit }) => {
  const renderIcon = (name: string) => {
    const props = { className: 'w-6 h-6 text-orange-600' };
    switch (name) {
      case 'UserCheck':
        return <UserCheck {...props} />;
      case 'Compass':
        return <Compass {...props} />;
      case 'PenTool':
        return <PenTool {...props} />;
      case 'Sparkles':
        return <Sparkles {...props} />;
      case 'Target':
        return <Target {...props} />;
      case 'Award':
        return <Award {...props} />;
      default:
        return <Sparkles {...props} />;
    }
  };

  return (
    <section id="services" className="py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-800 text-xs font-bold uppercase tracking-wider mb-4 border border-orange-200/60">
            <span>Full-Suite Founder Ecosystem</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Everything You Need To Build Authority On LinkedIn
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            From strategic narrative positioning to daily algorithmic publishing
            and inbound lead capture, we run your executive personal brand end-to-end.
          </p>
        </div>

        {/* 6 Services Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {SERVICES_CARDS.map((service, index) => (
            <div
              key={service.id}
              className="rounded-2xl p-7 bg-[#FAFBFD] border border-slate-200/80 hover:border-orange-500/40 hover:bg-white hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-orange-100/70 border border-orange-200 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {renderIcon(service.iconName)}
                  </div>
                  <span className="text-xs font-bold text-slate-400 group-hover:text-slate-900 transition-colors">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-950 tracking-tight group-hover:text-orange-600 transition-colors">
                  {service.title}
                </h3>

                <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                  {service.shortBenefit}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/70">
                <div className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{service.keyDeliverable}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom audit prompt */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={onOpenAudit}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-orange-600 transition-colors group"
          >
            <span>Interested in full-stack authority management? Get a personalized proposal</span>
            <ArrowRight className="w-4 h-4 text-orange-500 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
