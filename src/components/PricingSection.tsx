import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface PricingSectionProps {
  onOpenAudit: (planName?: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenAudit }) => {
  const plans = [
    {
      name: 'For Founders Getting Started',
      price: '₹25,000',
      period: '/month',
      description:
        "Perfect if you're posting inconsistently and want a professional LinkedIn presence.",
      isPopular: false,
      includes: [
        '12 Posts Monthly',
        'Profile Optimization',
        'Monthly Strategy Call',
        'Analytics Report',
      ],
    },
    {
      name: 'For Founders Ready To Grow',
      price: '₹40,000',
      period: '/month',
      description:
        'For founders who want consistent visibility, engagement and inbound opportunities.',
      isPopular: true,
      includes: [
        '20 Posts Monthly',
        '4 Carousels',
        'Advanced Profile Optimization',
        'Content Strategy',
        'Monthly Reviews',
      ],
    },
  ];

  return (
    <section
      id="pricing"
      className="py-20 sm:py-28 bg-[#0B0B0F] text-[#FFFFFF] border-b border-[#262626]"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-[#FFFFFF] tracking-tight">
            Simple Pricing. No Long Contracts.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#A1A1AA]">
            Pay month-to-month. Cancel anytime.
          </p>
        </div>

        {/* 2 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="rounded-2xl p-7 sm:p-8 flex flex-col justify-between bg-[#14141A] transition-colors relative border-2 border-[#FF6A00]"
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-7 bg-[#FF6A00] text-[#0B0B0F] text-[11px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm">
                  Recommended
                </div>
              )}

              <div>
                <h3 className="font-display font-bold text-lg text-[#FFFFFF] mb-2">
                  {plan.name}
                </h3>

                <div className="flex items-baseline gap-1 mt-4 mb-4">
                  <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#FFFFFF]">
                    {plan.price}
                  </span>
                  <span className="text-sm text-[#A1A1AA] font-normal">{plan.period}</span>
                </div>

                <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed mb-6">
                  {plan.description}
                </p>

                <div className="pt-6 border-t border-[#262626] mb-8">
                  <span className="text-xs uppercase tracking-wider text-[#A1A1AA] font-semibold block mb-3">
                    Includes:
                  </span>
                  <ul className="space-y-3">
                    {plan.includes.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#FFFFFF]/90">
                        <Check className="w-4 h-4 text-[#FF6A00] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenAudit(plan.name)}
                className="w-full inline-flex items-center justify-center gap-2 font-semibold text-xs sm:text-sm py-3.5 px-6 rounded-xl transition-colors cursor-pointer bg-[#FF6A00] hover:bg-[#FF8533] active:bg-[#E65A00] text-[#0B0B0F] shadow-sm"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
