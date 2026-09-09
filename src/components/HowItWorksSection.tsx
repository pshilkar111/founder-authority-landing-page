import React from 'react';
import { motion } from 'motion/react';
import { PhoneCall, PenLine, CheckCheck } from 'lucide-react';

interface HowItWorksSectionProps {
  onOpenAudit: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onOpenAudit }) => {
  const steps = [
    {
      step: 'Step 1',
      icon: <PhoneCall className="w-5 h-5 text-[#FF6A00]" />,
      title: 'We Talk',
      line1: 'One monthly strategy call.',
      line2: "Tell us what's happening in your business.",
    },
    {
      step: 'Step 2',
      icon: <PenLine className="w-5 h-5 text-[#FF6A00]" />,
      title: 'We Write',
      line1: 'We turn your stories, lessons and expertise into content.',
      line2: '',
    },
    {
      step: 'Step 3',
      icon: <CheckCheck className="w-5 h-5 text-[#FF6A00]" />,
      title: 'You Approve',
      line1: 'Review in minutes.',
      line2: 'We handle the rest.',
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-20 sm:py-28 bg-[#0B0B0F] text-[#FFFFFF] border-b border-[#262626]"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* Headline */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-[#FFFFFF] tracking-tight">
            Simple. Practical. Done For You.
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-[#14141A] rounded-2xl border border-[#262626] p-7 flex flex-col justify-between hover:border-[#383838] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#0B0B0F] border border-[#262626] flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-xs uppercase tracking-widest text-[#FF6A00] font-semibold">
                    {item.step}
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-xl text-[#FFFFFF] mb-3">
                  {item.title}
                </h3>

                <div className="text-sm text-[#A1A1AA] leading-relaxed space-y-2">
                  <p>{item.line1}</p>
                  {item.line2 && <p>{item.line2}</p>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
