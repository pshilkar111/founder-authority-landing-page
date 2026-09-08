import React from 'react';
import { SERVICES_CARDS } from '../data/landingData';
import {
  UserCheck,
  Compass,
  PenTool,
  Sparkles,
  Target,
  Award,
} from 'lucide-react';

interface ServicesSectionProps {
  onOpenAudit: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = () => {
  const renderIcon = (name: string) => {
    const props = { className: 'w-5 h-5 text-orange-600' };
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
    <section id="services" className="py-14 sm:py-16 bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[11px] font-bold uppercase tracking-wider mb-3">
            <span>Our Core Capabilities</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Everything You Need To Build Authority On LinkedIn
          </h2>

          <p className="mt-2 text-sm sm:text-base text-slate-600">
            From strategic positioning to daily publishing and inbound lead capture,
            we run your executive brand end-to-end.
          </p>
        </div>

        {/* 6 Services Cards - Compact 3x2 Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES_CARDS.map((service, index) => (
            <div
              key={service.id}
              className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-200/60 flex items-center justify-center">
                    {renderIcon(service.iconName)}
                  </div>
                  <span className="text-[11px] font-bold text-slate-400">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-950">
                  {service.title}
                </h3>

                <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {service.shortBenefit}
                </p>
              </div>

              <div className="mt-3.5 pt-3 border-t border-slate-100">
                <span className="text-[10px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                  {service.keyDeliverable}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
