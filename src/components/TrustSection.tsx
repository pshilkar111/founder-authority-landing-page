import React from 'react';
import { TRUST_STATS, TRUST_LOGOS } from '../data/landingData';
import { Sparkles, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface TrustSectionProps {
  onOpenAudit: () => void;
}

export const TrustSection: React.FC<TrustSectionProps> = ({ onOpenAudit }) => {
  return (
    <section id="trust" className="py-16 border-y border-slate-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Core Metric Counters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {TRUST_STATS.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center ${
                index !== 0 ? 'pt-6 md:pt-0 md:pl-8' : ''
              }`}
            >
              <div className="text-4xl sm:text-5xl font-black tracking-tight text-slate-950 flex items-center gap-1">
                <span>{stat.number}</span>
                <span className="text-orange-500 font-bold text-3xl sm:text-4xl">
                  *
                </span>
              </div>
              <div className="mt-2 text-base font-bold text-slate-900">
                {stat.label}
              </div>
              <div className="text-xs text-slate-500 mt-1 max-w-xs">
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>

        {/* Logos & Ecosystem Social Proof */}
        <div className="mt-14 pt-10 border-t border-slate-100">
          <p className="text-center text-xs uppercase tracking-widest font-bold text-slate-500 mb-7">
            Trusted by founders backed by leading venture & business networks
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {TRUST_LOGOS.map((logo) => (
              <div
                key={logo.name}
                className="py-3 px-3.5 rounded-xl border border-slate-200/70 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all flex flex-col items-center justify-center text-center shadow-2xs group"
              >
                <span className="text-xs font-extrabold text-slate-800 tracking-tight group-hover:text-orange-600 transition-colors">
                  {logo.name}
                </span>
                <span className="text-[10px] text-slate-500 font-medium mt-0.5">
                  {logo.badge}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={onOpenAudit}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-orange-600 transition-colors"
            >
              <span>See how your current profile measures up against category leaders</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-orange-500" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
