import React from 'react';
import { PRICING_PLANS } from '../data/landingData';
import { Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface PricingSectionProps {
  onOpenAudit: (planName?: string) => void;
  currency: 'INR' | 'USD';
  onToggleCurrency: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onOpenAudit,
  currency,
  onToggleCurrency,
}) => {
  return (
    <section id="pricing" className="py-24 bg-[#FAFBFD] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/70 text-slate-800 text-xs font-bold uppercase tracking-wider mb-4">
            <span>Simple, High-ROI Partnerships</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Choose Your Growth Plan
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            No long-term contracts. No junior fluff. Transparent monthly retainer
            pricing designed to generate multiple times its value in pipeline.
          </p>

          {/* Currency Toggle */}
          <div className="mt-8 inline-flex items-center p-1 bg-white border border-slate-200 rounded-xl shadow-2xs">
            <button
              type="button"
              onClick={() => currency !== 'INR' && onToggleCurrency()}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                currency === 'INR'
                  ? 'bg-slate-950 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ₹ INR (India)
            </button>
            <button
              type="button"
              onClick={() => currency !== 'USD' && onToggleCurrency()}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                currency === 'USD'
                  ? 'bg-slate-950 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              $ USD (Global)
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const priceDisplay =
              currency === 'INR' ? plan.priceInr : plan.priceUsd;

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl transition-all flex flex-col justify-between ${
                  plan.isPopular
                    ? 'bg-white border-2 border-orange-500 shadow-xl shadow-orange-500/10 -translate-y-2 p-8 lg:p-9'
                    : 'bg-white border border-slate-200/90 shadow-2xs hover:shadow-md p-7 sm:p-8'
                }`}
              >
                {/* Most Popular Badge */}
                {plan.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-orange-600 text-white font-extrabold text-xs tracking-wider uppercase px-4 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Most Popular</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-extrabold text-slate-950 tracking-tight">
                      {plan.name}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 min-h-[32px] leading-relaxed">
                    {plan.tagline}
                  </p>

                  {/* Price Tag */}
                  <div className="mt-6 pb-6 border-b border-slate-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight">
                        {priceDisplay}
                      </span>
                      {plan.priceInr !== 'Custom Pricing' && (
                        <span className="text-sm font-semibold text-slate-400">
                          {plan.period}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 text-[11px] font-semibold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md inline-block border border-orange-200/50">
                      {plan.idealFor}
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="mt-6 space-y-3.5">
                    <div className="text-xs uppercase tracking-wider font-bold text-slate-400">
                      What's Included:
                    </div>
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                        <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className={plan.isPopular && fIdx < 4 ? 'font-semibold text-slate-900' : ''}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA Button */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onOpenAudit(plan.name)}
                    className={`w-full py-3.5 px-5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-xs ${
                      plan.isPopular
                        ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-md shadow-orange-600/20'
                        : 'bg-slate-950 hover:bg-slate-900 text-white'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="mt-3 text-center text-[11px] text-slate-400">
                    Includes 7-day initial audit & strategy sprint
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing Guarantee */}
        <div className="mt-14 max-w-2xl mx-auto text-center bg-white rounded-xl p-5 border border-slate-200 text-xs text-slate-600 flex items-center justify-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>
            <strong>Month-to-month flexibility.</strong> Cancel anytime with 14 days' notice. No long-term lock-in or punitive clauses.
          </span>
        </div>
      </div>
    </section>
  );
};
