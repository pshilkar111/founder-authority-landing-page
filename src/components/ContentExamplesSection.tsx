import React, { useState } from 'react';
import { LINKEDIN_POST_MOCKUPS } from '../data/landingData';
import {
  ThumbsUp,
  MessageSquare,
  Repeat2,
  Send,
  MoreHorizontal,
  Globe,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContentExamplesSectionProps {
  onOpenAudit: () => void;
}

export const ContentExamplesSection: React.FC<ContentExamplesSectionProps> = ({ onOpenAudit }) => {
  const [selectedPostIndex, setSelectedPostIndex] = useState(0);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const toggleLike = (postId: string) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const activePost = LINKEDIN_POST_MOCKUPS[selectedPostIndex];
  const isLiked = !!likedPosts[activePost.id];

  const categoryOutcomes = [
    'Direct Outcome: 42 B2B Wholesale Distribution Deals Signed',
    'Direct Outcome: 18 Fortune 500 Enterprise POCs & 4 Senior Hires',
    'Direct Outcome: 80+ Inbound Discovery Calls & 20x Retainer ROI',
  ];

  return (
    <section
      id="content-examples"
      className="py-16 sm:py-20 bg-slate-50/60 border-b border-slate-100 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/80 text-slate-800 text-[11px] font-bold uppercase tracking-wider mb-3">
            <span>Real World Execution</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Look Inside The High-Converting Content We Ghostwrite
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Zero generic AI jargon or hollow motivation. We extract your authentic founder voice
            and combine it with proven storytelling frameworks designed to trigger inbound commercial deals.
          </p>
        </motion.div>

        {/* 3-Tab Animated Selector */}
        <div className="mt-8 max-w-lg mx-auto flex p-1.5 bg-white border border-slate-200 rounded-2xl shadow-2xs gap-1.5">
          {LINKEDIN_POST_MOCKUPS.map((post, idx) => (
            <button
              key={post.id}
              type="button"
              onClick={() => setSelectedPostIndex(idx)}
              className={`relative flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center ${
                selectedPostIndex === idx
                  ? 'text-white'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
              }`}
            >
              {selectedPostIndex === idx && (
                <motion.div
                  layoutId="activeTabBadge"
                  className="absolute inset-0 bg-red-600 rounded-xl shadow-xs"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <span className="relative z-10">
                {idx === 0 ? 'D2C Scaling' : idx === 1 ? 'Startup Growth' : 'Marketing POV'}
              </span>
            </button>
          ))}
        </div>

        {/* Commercial Outcome Banner */}
        <motion.div
          key={`outcome-${selectedPostIndex}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 max-w-xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>{categoryOutcomes[selectedPostIndex]}</span>
          </div>
        </motion.div>

        {/* LinkedIn Post Mockup with AnimatePresence */}
        <div className="mt-6 max-w-xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePost.id}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden"
            >
              {/* Post Category Pill */}
              <div className="bg-slate-100/90 px-4 py-2.5 border-b border-slate-200/80 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 text-[11px]">
                  {activePost.badgeText}
                </span>
                <span className="font-bold text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full text-[11px] border border-red-200/60">
                  {activePost.stats.impressions} Views
                </span>
              </div>

              {/* LinkedIn Header */}
              <div className="p-5 pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={activePost.author.avatarUrl}
                      alt={activePost.author.name}
                      className="w-11 h-11 rounded-full object-cover border border-slate-200"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-slate-950">
                          {activePost.author.name}
                        </span>
                        {activePost.author.verified && (
                          <span className="text-blue-600 text-xs font-bold">✓</span>
                        )}
                        <span className="text-xs text-slate-400">• 1st</span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1 max-w-xs sm:max-w-sm">
                        {activePost.author.headline}
                      </p>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400">
                        <span>{activePost.timeAgo}</span>
                        <Globe className="w-2.5 h-2.5" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      className="text-blue-600 hover:text-blue-800 text-xs font-bold px-2 py-0.5 rounded hover:bg-blue-50"
                    >
                      + Follow
                    </button>
                    <MoreHorizontal className="w-4 h-4 text-slate-400" />
                  </div>
                </div>

                {/* Post Content */}
                <div className="mt-3.5 text-xs sm:text-sm text-slate-800 space-y-2 leading-relaxed">
                  {activePost.contentLines.map((line, lIdx) =>
                    line === '' ? (
                      <div key={lIdx} className="h-1.5" />
                    ) : (
                      <p key={lIdx} className={line.startsWith('1.') || line.startsWith('2.') || line.startsWith('•') || line.startsWith('→') ? 'font-medium pl-1 text-slate-900' : ''}>
                        {line}
                      </p>
                    )
                  )}
                </div>

                {/* Hashtags */}
                <div className="mt-3 flex flex-wrap gap-1.5 text-xs text-blue-700 font-semibold">
                  {activePost.hashtags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* Embedded Asset if present */}
              {activePost.hasMedia && (
                <div className="mx-5 mb-3.5 rounded-xl bg-slate-950 text-white p-4 border border-slate-800 text-center">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-2 border-b border-slate-800 pb-1.5">
                    <span className="font-semibold text-red-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Custom Branded Carousel Framework
                    </span>
                    <span className="bg-slate-800 px-2 py-0.5 rounded text-white font-mono text-[10px]">
                      Slide 1 of 7
                    </span>
                  </div>
                  <div className="text-sm sm:text-base font-extrabold text-white">
                    {activePost.mediaTitle}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {activePost.mediaSubtitle}
                  </div>
                </div>
              )}

              {/* Social Count Bar */}
              <div className="px-5 py-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px]">
                    👍
                  </span>
                  <span>{activePost.stats.reactions + (isLiked ? 1 : 0)} reactions</span>
                </div>
                <div className="flex gap-2">
                  <span>{activePost.stats.comments} comments</span>
                  <span>•</span>
                  <span>{activePost.stats.reposts} reposts</span>
                </div>
              </div>

              {/* Interactive Action Bar with Spring Tap */}
              <div className="px-4 sm:px-5 py-2.5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <motion.button
                  type="button"
                  whileTap={{ scale: 1.25 }}
                  onClick={() => toggleLike(activePost.id)}
                  className={`flex items-center gap-1.5 text-xs font-semibold py-1 px-2.5 rounded transition-colors ${
                    isLiked ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-blue-600 text-blue-600' : ''}`} />
                  <span>{isLiked ? 'Liked' : 'Like'}</span>
                </motion.button>

                <button
                  type="button"
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 py-1 px-2"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                  <span>Comment</span>
                </button>

                <button
                  type="button"
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 py-1 px-2"
                >
                  <Repeat2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Repost</span>
                </button>

                <button
                  type="button"
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 py-1 px-2"
                >
                  <Send className="w-3.5 h-3.5 text-slate-400" />
                  <span>Send</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Micro-CTA below sample */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={onOpenAudit}
              className="text-xs font-bold text-slate-700 hover:text-red-600 underline underline-offset-4 transition-colors"
            >
              Want to see 3 personalized content angles for your profile? Book a Free Audit →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
