import React, { useState } from 'react';
import { PROCESS_STEPS } from '../data/landingData';
import { CheckCircle2, ArrowRight, Clock, ShieldAlert, Sparkles } from 'lucide-react';

interface ProcessSectionProps {
  onOpenAudit: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenAudit }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  return (
    <section id="process" className="py-24 bg-white border-t border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-800 text-xs font-bold uppercase tracking-wider mb-4 border border-orange-200/60">
            <span>The Execution Engine</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Our Proven 5-Step Authority Framework
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Zero fluff. Zero guesswork. A battle-tested blueprint that turns your
            raw thoughts into high-engagement assets while requiring under 2 hours
            of your time per month.
          </p>
        </div>

        {/* Horizontal Timeline (Desktop & Tablet) */}
        <div className="mt-16 relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-7 left-[8%] right-[8%] h-0.5 bg-slate-200 -z-0" />

          {/* 5-Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 relative z-10">
            {PROCESS_STEPS.map((step) => {
              const isSelected = activeStep === step.stepNumber;
              return (
                <div
                  key={step.stepNumber}
                  onClick={() => setActiveStep(step.stepNumber)}
                  className={`rounded-2xl p-5 sm:p-6 transition-all cursor-pointer flex flex-col justify-between border ${
                    isSelected
                      ? 'bg-white border-orange-500 ring-2 ring-orange-500/20 shadow-lg -translate-y-1'
                      : 'bg-slate-50/70 border-slate-200/80 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div>
                    {/* Step Node Indicator */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-sm border-2 transition-all ${
                          isSelected
                            ? 'bg-orange-600 border-orange-600 text-white shadow-sm'
                            : 'bg-white border-slate-300 text-slate-700'
                        }`}
                      >
                        {step.stepNumber}
                      </div>

                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {step.duration}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-950 tracking-tight">
                      {step.title}
                    </h3>

                    <p className="text-xs font-semibold text-orange-600 mt-0.5">
                      {step.subtitle}
                    </p>

                    <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-200/60">
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Key Deliverable
                    </div>
                    <div className="text-xs font-semibold text-slate-900 mt-0.5">
                      {step.deliverable}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Deep Dive Detail for Selected Step */}
        <div className="mt-10 rounded-2xl bg-slate-950 text-white p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-xs font-bold uppercase tracking-wider text-orange-400">
              Active Milestone • Step {activeStep} of 5
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white">
              {PROCESS_STEPS[activeStep - 1].title}: {PROCESS_STEPS[activeStep - 1].subtitle}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              {PROCESS_STEPS[activeStep - 1].description}
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenAudit}
            className="shrink-0 bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl flex items-center gap-2 transition-all shadow-md"
          >
            <span>Start with Step 1: Discovery</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
