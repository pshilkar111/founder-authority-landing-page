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
    <section id="pricing" className="py-14 sm:py-16 bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[11px] font-bold uppercase tracking-wider mb-3">
            <span>Transparent Pricing</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Choose Your Growth Plan
          </h2>

          <p className="mt-2 text-sm sm:text-base text-slate-600">
            No long-term contracts. Monthly retainer pricing designed to generate
            multiples in qualified pipeline.
          </p>

          {/* Currency Toggle */}
          <div className="mt-5 inline-flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200 text-xs">
            <button
              type="button"
              onClick={() => currency !== 'INR' && onToggleCurrency()}
              className={`px-3 py-1 rounded-md font-bold transition-all ${
                currency === 'INR'
                  ? 'bg-slate-950 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ₹ INR
            </button>
            <button
              type="button"
              onClick={() => currency !== 'USD' && onToggleCurrency()}
              className={`px-3 py-1 rounded-md font-bold transition-all ${
                currency === 'USD'
                  ? 'bg-slate-950 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              $ USD
            </button>
          </div>
        </div>

        {/* 2 Pricing Cards Grid */}
        <div className="mt-10 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const priceDisplay =
              currency === 'INR' ? plan.priceInr : plan.priceUsd;

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl transition-all flex flex-col justify-between ${
                  plan.isPopular
                    ? 'bg-white border-2 border-orange-500 shadow-lg shadow-orange-500/10 p-6 sm:p-7'
                    : 'bg-white border border-slate-200 shadow-2xs p-6 sm:p-7'
                }`}
              >
                {/* Most Popular Badge */}
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-600 text-white font-extrabold text-[10px] tracking-wider uppercase px-3 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Most Popular</span>
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-extrabold text-slate-950">
                    {plan.name}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1">
                    {plan.tagline}
                  </p>

                  {/* Price Tag */}
                  <div className="mt-4 pb-4 border-b border-slate-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                        {priceDisplay}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">
                        {plan.period}
                      </span>
                    </div>
                    <div className="mt-1.5 text-[10px] font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded inline-block border border-orange-200/50">
                      {plan.idealFor}
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="mt-4 space-y-2.5">
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <div className="w-3.5 h-3.5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span className={plan.isPopular && fIdx < 3 ? 'font-semibold text-slate-900' : ''}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA Button */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onOpenAudit(plan.name)}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                      plan.isPopular
                        ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-xs'
                        : 'bg-slate-950 hover:bg-slate-900 text-white'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="mt-2 text-center text-[10px] text-slate-400">
                    Includes 7-day initial audit & sprint
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing Guarantee */}
        <div className="mt-8 max-w-lg mx-auto text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Month-to-month flexibility. Cancel anytime with 14 days notice.</span>
        </div>
      </div>
    </section>
  );
};
