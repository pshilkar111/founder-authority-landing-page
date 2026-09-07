import React, { useState } from 'react';
import {
  ArrowRight,
  TrendingUp,
  Eye,
  MessageSquare,
  Share2,
  Users,
  Award,
  CheckCircle2,
  Sparkles,
  Zap,
  BarChart3,
  Calendar,
  ExternalLink,
} from 'lucide-react';

interface HeroSectionProps {
  onOpenAudit: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenAudit }) => {
  const [timeframe, setTimeframe] = useState<'30d' | '90d'>('90d');

  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50"
    >
      {/* Subtle geometric background grid and glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-orange-200/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-blue-100/30 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Text Content */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-orange-800 text-xs sm:text-sm font-semibold mb-6 shadow-2xs">
            <span className="text-base" role="img" aria-label="rocket">
              🚀
            </span>
            <span>Personal Branding for Founders & Leaders</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.12]">
            Build Your Personal Brand on LinkedIn.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500">
              Generate Trust, Visibility & Business Opportunities.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto">
            We help founders, business owners, and industry leaders become
            recognized voices on LinkedIn through strategic content, thought
            leadership, and authority-building systems.
          </p>

          {/* CTA Buttons */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
            <button
              type="button"
              id="hero-primary-cta"
              onClick={onOpenAudit}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white text-base font-bold px-7 py-4 rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all group"
            >
              <span>Book a Free LinkedIn Audit</span>
              <ArrowRight className="w-5 h-5 text-white/90 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#content-examples"
              id="hero-secondary-cta"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base px-6 py-4 rounded-xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-all"
            >
              <span>View Sample Content</span>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </a>
          </div>

          {/* Proof Badges Under CTAs */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Done-For-You</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Under 2 hrs/month required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Actionable 7-point audit report</span>
            </div>
          </div>
        </div>

        {/* Premium Dashboard-Style Illustration */}
        <div className="mt-14 lg:mt-16 max-w-5xl mx-auto">
          <div className="relative rounded-2xl bg-white border border-slate-200/90 shadow-2xl shadow-slate-900/10 overflow-hidden">
            {/* Window Top Controls Header */}
            <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-400/80" />
                <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                <span className="ml-3 text-xs font-semibold text-slate-600 hidden sm:inline-block">
                  Founder Authority Growth Console • Live Client Dashboard
                </span>
              </div>

              {/* Timeframe selector */}
              <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setTimeframe('30d')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    timeframe === '30d'
                      ? 'bg-slate-950 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  Last 30 Days
                </button>
                <button
                  type="button"
                  onClick={() => setTimeframe('90d')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    timeframe === '90d'
                      ? 'bg-slate-950 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  Last 90 Days (Recommended)
                </button>
              </div>
            </div>

            {/* Dashboard Inner Body */}
            <div className="p-5 sm:p-7">
              {/* Founder Header Row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80"
                      alt="Featured Founder Profile"
                      className="w-14 h-14 rounded-full object-cover border-2 border-orange-500 shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold border-2 border-white">
                      in
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-slate-950">
                        Rohan Malhotra
                      </h3>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
                        <Award className="w-3 h-3 text-blue-600" />
                        Top Voice
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Founder & CEO @ Naturale D2C • B2B Distribution & DTC Scale
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="text-left sm:text-right">
                    <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                      Follower Velocity
                    </div>
                    <div className="text-base font-extrabold text-slate-900 flex items-center gap-1.5 sm:justify-end">
                      <span>48,290</span>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                        +{timeframe === '90d' ? '340%' : '112%'}
                      </span>
                    </div>
                  </div>
                  <div className="h-8 w-px bg-slate-200 hidden sm:block" />
                  <button
                    type="button"
                    onClick={onOpenAudit}
                    className="text-xs font-semibold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100/70 px-3 py-2 rounded-lg transition-colors border border-orange-200/60"
                  >
                    Audit My Profile →
                  </button>
                </div>
              </div>

              {/* 4 Core Metrics Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mt-6">
                {/* 1. Profile Views */}
                <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/70 hover:border-slate-300 transition-colors">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-semibold text-slate-600">
                      Profile Views
                    </span>
                    <Eye className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-950">
                    {timeframe === '90d' ? '142,800' : '48,200'}
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+{timeframe === '90d' ? '418%' : '146%'} vs previous</span>
                  </div>
                </div>

                {/* 2. Content Impressions */}
                <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/70 hover:border-slate-300 transition-colors">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-semibold text-slate-600">
                      Impressions
                    </span>
                    <BarChart3 className="w-4 h-4 text-orange-500" />
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-950">
                    {timeframe === '90d' ? '1,842,000' : '620,000'}
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+{timeframe === '90d' ? '520%' : '180%'} organic reach</span>
                  </div>
                </div>

                {/* 3. Founder Authority Metric: SSI */}
                <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/70 hover:border-slate-300 transition-colors">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-semibold text-slate-600">
                      SSI Score
                    </span>
                    <Award className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-950">
                    88<span className="text-sm font-normal text-slate-400">/100</span>
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-blue-600">
                    <span>Top 1% in Category</span>
                  </div>
                </div>

                {/* 4. Inbound Business Opportunities */}
                <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/70 hover:border-slate-300 transition-colors">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-semibold text-slate-600">
                      Qualified Inbound DMs
                    </span>
                    <Zap className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-950">
                    {timeframe === '90d' ? '42 Deals' : '16 Deals'}
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                    <span>₹68L+ pipeline generated</span>
                  </div>
                </div>
              </div>

              {/* Visual Graph & Content Performance Split */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6 pt-5 border-t border-slate-100">
                {/* SVG Visual Graph for LinkedIn Profile Growth */}
                <div className="lg:col-span-2 bg-slate-950 text-white rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-inner">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                        Organic Impression Trajectory
                      </div>
                      <div className="text-sm font-bold text-white flex items-center gap-2 mt-0.5">
                        <span>Compounding Authority Curve</span>
                        <span className="text-[11px] font-medium bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded border border-orange-500/30">
                          Founder Authority System
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-400">Avg. Engagement Rate</div>
                      <div className="text-base font-extrabold text-emerald-400">
                        4.82% <span className="text-[10px] text-slate-400 font-normal">(vs 1.4% avg)</span>
                      </div>
                    </div>
                  </div>

                  {/* SVG Line Graph */}
                  <div className="relative w-full h-36 sm:h-40 my-2">
                    <svg
                      viewBox="0 0 500 160"
                      className="w-full h-full overflow-visible"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient id="heroGrowthGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#f97316" stopOpacity="0.45" />
                          <stop offset="100%" stopColor="#f97316" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Horizontal Grid lines */}
                      <line x1="0" y1="30" x2="500" y2="30" stroke="#334155" strokeDasharray="3 3" opacity="0.5" />
                      <line x1="0" y1="80" x2="500" y2="80" stroke="#334155" strokeDasharray="3 3" opacity="0.5" />
                      <line x1="0" y1="130" x2="500" y2="130" stroke="#334155" strokeDasharray="3 3" opacity="0.5" />

                      {/* Baseline previous curve (stagnant) */}
                      <path
                        d="M 0 145 C 80 140, 140 144, 200 142 C 260 145, 320 140, 500 138"
                        fill="none"
                        stroke="#64748b"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />

                      {/* Area Fill */}
                      <path
                        d="M 0 140 C 60 135, 120 120, 180 95 C 240 75, 300 60, 360 38 C 420 20, 460 14, 500 8 L 500 160 L 0 160 Z"
                        fill="url(#heroGrowthGradient)"
                      />

                      {/* Solid Growth Line */}
                      <path
                        d="M 0 140 C 60 135, 120 120, 180 95 C 240 75, 300 60, 360 38 C 420 20, 460 14, 500 8"
                        fill="none"
                        stroke="#f97316"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />

                      {/* Data Point Pulse */}
                      <circle cx="500" cy="8" r="5" fill="#ea580c" />
                      <circle cx="500" cy="8" r="9" fill="#f97316" opacity="0.4" />
                      <circle cx="360" cy="38" r="4" fill="#fb923c" />
                      <circle cx="180" cy="95" r="4" fill="#fb923c" />
                    </svg>

                    {/* Annotation Pill */}
                    <div className="absolute top-2 right-4 bg-slate-900/90 border border-orange-500/40 text-white px-2.5 py-1 rounded-md text-[11px] shadow-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>+520% Inbound Surge</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                    <span>Month 1: Strategy & Optimization</span>
                    <span>Month 2: High-Velocity Publishing</span>
                    <span className="text-orange-400 font-semibold">Month 3: Omnipresent Authority</span>
                  </div>
                </div>

                {/* Content Performance & Founder Authority Summary */}
                <div className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200/80 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Top Performing Post
                      </span>
                      <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                        Viral Resonance
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2">
                      “We almost went bankrupt at ₹2Cr ARR. Here are the 4 counter-intuitive pivots that scaled us to ₹45Cr ARR...”
                    </h4>

                    <div className="mt-4 space-y-2 text-xs">
                      <div className="flex items-center justify-between py-1 border-b border-slate-200/60 text-slate-600">
                        <span>Total Views</span>
                        <span className="font-bold text-slate-900">142,000+</span>
                      </div>
                      <div className="flex items-center justify-between py-1 border-b border-slate-200/60 text-slate-600">
                        <span>Reactions</span>
                        <span className="font-bold text-slate-900">1,482</span>
                      </div>
                      <div className="flex items-center justify-between py-1 border-b border-slate-200/60 text-slate-600">
                        <span>Comments & Inquiries</span>
                        <span className="font-bold text-slate-900">219</span>
                      </div>
                      <div className="flex items-center justify-between py-1 text-slate-600">
                        <span>Reposts</span>
                        <span className="font-bold text-slate-900">94</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200">
                    <div className="text-[11px] text-slate-500 flex items-center justify-between">
                      <span>Resulting Outcome:</span>
                      <span className="font-bold text-orange-600">42 Retail Chains Inbound</span>
                    </div>
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
