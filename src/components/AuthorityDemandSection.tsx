import React from 'react';
import { UserCheck, TrendingUp, Cpu, Check, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface AuthorityDemandSectionProps {
  onOpenAudit: () => void;
}

export const AuthorityDemandSection: React.FC<AuthorityDemandSectionProps> = ({ onOpenAudit }) => {
  const cards = [
    {
      title: 'Founder Authority',
      description: 'Build a personal brand that attracts customers, talent, investors and opportunities.',
      icon: UserCheck,
      services: [
        'LinkedIn Personal Branding',
        'Founder Ghostwriting',
        'LinkedIn Profile Optimization',
        'Thought Leadership Strategy',
      ],
    },
    {
      title: 'Demand Generation',
      description: 'Generate qualified leads and pipeline growth through performance marketing.',
      icon: TrendingUp,
      services: [
        'Google Ads',
        'Meta Ads (Facebook & Instagram)',
        'LinkedIn Ads',
      ],
    },
    {
      title: 'AI & Growth Systems',
      description: 'Automate marketing, content and lead nurturing with AI-powered systems.',
      icon: Cpu,
      services: [
        'ChatGPT Ads',
        'AI-Powered Content Systems',
        'Marketing Automation',
        'Lead Nurturing Workflows',
      ],
    },
  ];

  return (
    <section
      id="authority-demand"
      className="py-20 sm:py-28 bg-[#0B0B0F] text-[#FFFFFF] border-b border-[#262626] relative overflow-hidden"
    >
      {/* Subtle ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FF6A00]/[0.02] blur-[150px] pointer-events-none rounded-full" />

      <div className="relative max-w-5xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#14141A] border border-[#262626] text-[#FF6A00] text-xs font-semibold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]" />
              <span>Authority + Demand Generation</span>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="font-display font-extrabold text-2xl sm:text-4xl text-[#FFFFFF] tracking-tight leading-tight"
          >
            Build Authority. Generate Demand.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-4 text-sm sm:text-base text-[#A1A1AA] leading-relaxed space-y-1"
          >
            <p>Most agencies help founders get attention.</p>
            <p className="text-[#FFFFFF]/90 font-medium">
              We help founders turn attention into business growth.
            </p>
          </motion.div>
        </div>

        {/* 3 Premium Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {cards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-[#14141A] rounded-2xl border border-[#262626] p-7 sm:p-8 flex flex-col justify-between hover:border-[#FF6A00]/40 transition-all duration-300 group shadow-sm hover:shadow-lg hover:shadow-[#FF6A00]/5"
              >
                <div>
                  {/* Icon */}
                  <div className="w-11 h-11 rounded-xl bg-[#0B0B0F] border border-[#262626] flex items-center justify-center mb-6 group-hover:border-[#FF6A00]/40 transition-colors">
                    <IconComponent className="w-5 h-5 text-[#FF6A00]" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-extrabold text-lg sm:text-xl text-[#FFFFFF] mb-3 group-hover:text-[#FF8533] transition-colors">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                {/* Services List */}
                <div className="pt-6 border-t border-[#262626]">
                  <span className="text-[11px] uppercase tracking-wider text-[#A1A1AA] font-semibold block mb-3.5">
                    Services
                  </span>
                  <ul className="space-y-3">
                    {card.services.map((service) => (
                      <li
                        key={service}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[#FFFFFF]/90"
                      >
                        <Check className="w-4 h-4 text-[#FF6A00] shrink-0 mt-0.5" />
                        <span className="leading-snug">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Highlighted Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mt-12 sm:mt-16 rounded-2xl sm:rounded-3xl p-7 sm:p-10 bg-gradient-to-br from-[#16161F] via-[#14141A] to-[#0F0F14] border border-[#FF6A00]/30 relative overflow-hidden shadow-xl shadow-[#FF6A00]/5"
        >
          {/* Subtle warm glow inside banner */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF6A00]/[0.06] blur-[90px] pointer-events-none rounded-full" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6A00]/10 border border-[#FF6A00]/20 text-[#FF6A00] text-[11px] font-semibold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Unified Growth Engine</span>
              </div>
              <h3 className="font-display font-extrabold text-xl sm:text-2xl lg:text-3xl text-[#FFFFFF] tracking-tight">
                One Partner For Authority &amp; Growth
              </h3>
              <p className="mt-2 text-xs sm:text-sm md:text-base text-[#A1A1AA] leading-relaxed">
                Build your personal brand, generate demand, and create predictable growth from a single strategic partner.
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenAudit}
              className="inline-flex items-center justify-center gap-2 bg-[#FF6A00] hover:bg-[#FF8533] active:bg-[#E65A00] text-[#0B0B0F] font-semibold text-sm px-6 py-3.5 rounded-xl transition-all shadow-md shadow-[#FF6A00]/15 hover:shadow-[#FF6A00]/30 cursor-pointer shrink-0 w-full sm:w-auto"
            >
              <span>Book Strategy Call</span>
              <ArrowRight className="w-4 h-4 text-[#0B0B0F]" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
