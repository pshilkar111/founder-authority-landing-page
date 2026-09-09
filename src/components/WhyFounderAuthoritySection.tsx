import React from 'react';
import { Clock, HelpCircle, Repeat } from 'lucide-react';
import { motion } from 'motion/react';

interface WhyFounderAuthoritySectionProps {
  onOpenAudit: () => void;
}

export const WhyFounderAuthoritySection: React.FC<WhyFounderAuthoritySectionProps> = ({ onOpenAudit }) => {
  const cards = [
    {
      icon: <Clock className="w-5 h-5 text-[#FF6A00]" />,
      title: 'No Time',
      line1: "You're busy running a company.",
      line2: 'Creating content keeps falling to the bottom of the list.',
    },
    {
      icon: <HelpCircle className="w-5 h-5 text-[#FF6A00]" />,
      title: 'No Idea What To Post',
      line1: 'You know your industry.',
      line2: 'Turning that expertise into engaging content is the hard part.',
    },
    {
      icon: <Repeat className="w-5 h-5 text-[#FF6A00]" />,
      title: 'No Consistency',
      line1: "Posting for 3 days and disappearing for 3 weeks doesn't work.",
      line2: 'The algorithm rewards consistency.',
    },
  ];

  return (
    <section
      id="why-us"
      className="py-20 sm:py-28 bg-[#0B0B0F] text-[#FFFFFF] border-b border-[#262626]"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* Section Headline */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-[#FFFFFF] tracking-tight">
            Why Most Founders Struggle With LinkedIn
          </h2>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-[#14141A] rounded-2xl border border-[#262626] p-7 flex flex-col justify-between hover:border-[#383838] transition-colors"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#0B0B0F] border border-[#262626] flex items-center justify-center mb-6">
                  {card.icon}
                </div>

                <h3 className="font-display font-extrabold text-lg sm:text-xl text-[#FFFFFF] mb-3">
                  {card.title}
                </h3>

                <div className="text-sm text-[#A1A1AA] leading-relaxed space-y-2">
                  <p>{card.line1}</p>
                  <p>{card.line2}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
