import React from 'react';
import { PROBLEM_CARDS } from '../data/landingData';
import { AlertCircle, ArrowRight, CheckCircle, Clock, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface ProblemSectionProps {
  onOpenAudit: () => void;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ onOpenAudit }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="problem" className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100/70 text-red-800 text-[11px] font-bold uppercase tracking-wider mb-3.5 border border-red-200/60">
            <AlertCircle className="w-3.5 h-3.5 text-red-600" />
            <span>The Founder Paradox</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Every Month You Remain Silent on LinkedIn,{' '}
            <span className="text-red-600">Competitors Win Deals That Should Be Yours.</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            You hold decade-long battle-tested domain insights. Yet competitors with 10% of
            your experience are signing high-ticket clients, recruiting top talent, and raising
            capital simply because they show up on LinkedIn consistently.
          </p>
        </motion.div>

        {/* 4 Problem Cards - Staggered Animated Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-4xl mx-auto"
        >
          {PROBLEM_CARDS.map((card) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              whileHover={{ y: -4, borderColor: '#fca5a5' }}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl select-none group-hover:scale-110 transition-transform" role="img" aria-label={card.title}>
                    {card.emoji}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded-md">
                    High Friction
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-950">
                  {card.title}
                </h3>

                <p className="mt-2 text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {card.explanation}
                </p>
              </div>

              <div className="mt-4 pt-3.5 border-t border-slate-100">
                <span className="text-xs font-semibold text-rose-800 bg-rose-50/90 border border-rose-100 px-2.5 py-1.5 rounded-lg inline-block w-full">
                  ⚠️ {card.consequence}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* High-Impact Contrast Box: The Old Way vs. The Founder Authority Way */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 max-w-4xl mx-auto rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                The Old Broken Reality:
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-500">
                <li className="flex items-center gap-2">
                  <span className="text-rose-500 font-bold">✕</span> Staring at a blank screen at 11 PM on Sunday
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-rose-500 font-bold">✕</span> Hiring expensive internal PR agencies ($8,000/mo) that produce generic PR fluff
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-rose-500 font-bold">✕</span> Zero inbound pipeline from your profile
                </li>
              </ul>
            </div>

            <div className="rounded-xl bg-red-50/60 border border-red-200/80 p-5 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-red-700 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                The Founder Authority Solution:
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-800 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>1 voice note fortnightly = 12–20 elite posts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% authentic to your voice, zero robotic AI cliches</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Turn impressions into qualified investor & buyer DMs</span>
                </li>
              </ul>

              <button
                type="button"
                onClick={onOpenAudit}
                className="w-full mt-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-all"
              >
                <span>Diagnose Your LinkedIn Gaps For Free</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
