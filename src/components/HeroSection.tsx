import React, { useState } from 'react';
import {
  ArrowRight,
  TrendingUp,
  Eye,
  Award,
  BarChart3,
  ExternalLink,
  Zap,
} from 'lucide-react';

interface HeroSectionProps {
  onOpenAudit: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenAudit }) => {
  const [timeframe, setTimeframe] = useState<'30d' | '90d'>('90d');

  return (
    <section
      id="hero"
      className="relative pt-28 pb-14 sm:pt-32 sm:pb-16 overflow-hidden bg-white border-b border-slate-100"
    >
      {/* Linear-style minimal grid texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[500px] h-[220px] bg-orange-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Text Content */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-slate-800 text-xs font-semibold mb-5">
            <span role="img" aria-label="rocket">🚀</span>
            <span>Personal Branding for Founders & Leaders</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 leading-[1.15]">
            Build Your Personal Brand on LinkedIn.{' '}
            <span className="text-orange-600">
              Generate Trust, Visibility & Business Opportunities.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            We help founders, business owners, and industry leaders become
            recognized voices on LinkedIn through strategic content, thought
            leadership, and authority-building systems.
          </p>

          {/* CTAs */}
          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              id="hero-primary-cta"
              onClick={onOpenAudit}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-900 active:bg-black text-white text-sm font-bold px-6 py-3.5 rounded-xl shadow-sm hover:shadow transition-all group"
            >
              <span>Book a Free LinkedIn Audit</span>
              <ArrowRight className="w-4 h-4 text-orange-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <a
              href="#content-examples"
              id="hero-secondary-cta"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm px-5 py-3.5 rounded-xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-all"
            >
              <span>View Sample Content</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>

          {/* Concise Proof Micro-line */}
          <div className="mt-4 text-xs text-slate-500 font-medium">
            100% Done-For-You • Under 2 hrs/month • No long-term lock-in
          </div>
        </div>

        {/* Compact Linear/Clay Style Console Card */}
        <div className="mt-10 max-w-4xl mx-auto">
          <div className="rounded-2xl bg-white border border-slate-200 shadow-lg shadow-slate-950/5 overflow-hidden">
            {/* Top Minimal Bar */}
            <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <span className="font-semibold text-slate-600 text-[11px]">
                  Executive Authority Dashboard
                </span>
              </div>
              <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-md p-0.5 text-[11px] font-medium">
                <button
                  type="button"
                  onClick={() => setTimeframe('30d')}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    timeframe === '30d' ? 'bg-slate-950 text-white font-bold' : 'text-slate-600'
                  }`}
                >
                  30D
                </button>
                <button
                  type="button"
                  onClick={() => setTimeframe('90d')}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    timeframe === '90d' ? 'bg-slate-950 text-white font-bold' : 'text-slate-600'
                  }`}
                >
                  90D
                </button>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-4 sm:p-6">
              {/* Founder Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                    alt="Featured Founder Profile"
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-slate-950">Rohan Malhotra</span>
                      <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-1.5 py-0.2 rounded border border-blue-200 flex items-center gap-0.5">
                        <Award className="w-2.5 h-2.5" /> Top Voice
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">Founder & CEO @ Naturale D2C</p>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Followers</div>
                  <div className="text-sm font-extrabold text-slate-900 flex items-center gap-1">
                    <span>48,290</span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded">
                      +{timeframe === '90d' ? '340%' : '112%'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 3 Metric Pillars */}
              <div className="grid grid-cols-3 gap-3 pt-4">
                <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100">
                  <div className="text-[11px] font-medium text-slate-500 flex items-center justify-between">
                    <span>Views</span>
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <div className="text-base sm:text-lg font-black text-slate-950 mt-0.5">
                    {timeframe === '90d' ? '142.8K' : '48.2K'}
                  </div>
                  <div className="text-[10px] font-bold text-emerald-600 mt-0.5">
                    +{timeframe === '90d' ? '418%' : '146%'}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100">
                  <div className="text-[11px] font-medium text-slate-500 flex items-center justify-between">
                    <span>Impressions</span>
                    <BarChart3 className="w-3.5 h-3.5 text-orange-500" />
                  </div>
                  <div className="text-base sm:text-lg font-black text-slate-950 mt-0.5">
                    {timeframe === '90d' ? '1.84M' : '620K'}
                  </div>
                  <div className="text-[10px] font-bold text-emerald-600 mt-0.5">
                    +{timeframe === '90d' ? '520%' : '180%'}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100">
                  <div className="text-[11px] font-medium text-slate-500 flex items-center justify-between">
                    <span>Inbound DMs</span>
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                  <div className="text-base sm:text-lg font-black text-slate-950 mt-0.5">
                    {timeframe === '90d' ? '42 Deals' : '16 Deals'}
                  </div>
                  <div className="text-[10px] font-bold text-emerald-600 mt-0.5">
                    Qualified pipeline
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
