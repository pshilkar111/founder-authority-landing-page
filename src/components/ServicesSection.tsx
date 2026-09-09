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
} from 'lucide-react';
import { motion } from 'motion/react';

interface ServicesSectionProps {
  onOpenAudit: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenAudit }) => {
  const renderIcon = (name: string) => {
    const props = { className: 'w-5 h-5 text-red-600' };
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="services" className="py-16 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-[11px] font-bold uppercase tracking-wider mb-3">
            <span>End-to-End Execution</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
            The Complete Executive Authority Engine
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            From strategic category positioning to daily algorithmic publishing and inbound DM conversion,
            we run your executive brand like a high-performance media company.
          </p>
        </motion.div>

        {/* 6 Services Cards - Staggered Animated Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {SERVICES_CARDS.map((service, index) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{ y: -5, borderColor: '#fca5a5' }}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center group-hover:scale-105 group-hover:bg-red-100/80 transition-all">
                    {renderIcon(service.iconName)}
                  </div>
                  <span className="text-xs font-bold text-slate-300 font-mono">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-950 group-hover:text-red-600 transition-colors">
                  {service.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {service.shortBenefit}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                  📦 {service.keyDeliverable}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA line */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <button
            type="button"
            onClick={onOpenAudit}
            className="inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-900 text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-sm hover:shadow transition-all group"
          >
            <span>See How We Apply This To Your Specific Industry</span>
            <ArrowRight className="w-4 h-4 text-red-500 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
