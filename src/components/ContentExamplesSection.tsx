import React, { useState } from 'react';
import { LINKEDIN_POST_MOCKUPS } from '../data/landingData';
import {
  ThumbsUp,
  MessageSquare,
  Repeat2,
  Send,
  MoreHorizontal,
  Globe,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

interface ContentExamplesSectionProps {
  onOpenAudit: () => void;
}

export const ContentExamplesSection: React.FC<ContentExamplesSectionProps> = ({
  onOpenAudit,
}) => {
  const [selectedPostIndex, setSelectedPostIndex] = useState(0);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const toggleLike = (postId: string) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const activePost = LINKEDIN_POST_MOCKUPS[selectedPostIndex];

  return (
    <section
      id="content-examples"
      className="py-24 bg-[#FAFBFD] border-t border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/80 text-slate-800 text-xs font-bold uppercase tracking-wider mb-4">
            <span>Authentic High-Velocity Ghostwriting</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Sample LinkedIn Content We Create
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Every piece is tailored to your authentic founder voice. We blend
            vulnerable real-world stories with tactical frameworks that get bookmarked and shared.
          </p>
        </div>

        {/* 3-Tab Selector for the 3 Required Post Topics */}
        <div className="mt-10 max-w-2xl mx-auto flex flex-col sm:flex-row p-1.5 bg-white border border-slate-200 rounded-xl shadow-xs gap-1">
          {LINKEDIN_POST_MOCKUPS.map((post, idx) => (
            <button
              key={post.id}
              type="button"
              onClick={() => setSelectedPostIndex(idx)}
              className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all text-center ${
                selectedPostIndex === idx
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
              }`}
            >
              Post {idx + 1}: {idx === 0 ? 'D2C Scaling' : idx === 1 ? 'Startup Growth' : 'Marketing Leadership'}
            </button>
          ))}
        </div>

        {/* LinkedIn Post Mockup Container */}
        <div className="mt-10 max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden">
            {/* Top Post Category Pill */}
            <div className="bg-slate-100/90 px-5 py-2.5 border-b border-slate-200/70 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700">
                {activePost.badgeText}
              </span>
              <span className="font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200/50">
                {activePost.stats.impressions} Views
              </span>
            </div>

            {/* LinkedIn Header */}
            <div className="p-5 sm:p-6 pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={activePost.author.avatarUrl}
                    alt={activePost.author.name}
                    className="w-12 h-12 rounded-full object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm sm:text-base font-bold text-slate-950">
                        {activePost.author.name}
                      </span>
                      {activePost.author.verified && (
                        <span className="text-blue-600 text-xs font-bold" title="Verified Creator">
                          ✓
                        </span>
                      )}
                      <span className="text-xs text-slate-400 font-normal">• 1st</span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1 max-w-md">
                      {activePost.author.headline}
                    </p>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                      <span>{activePost.timeAgo}</span>
                      <Globe className="w-3 h-3 text-slate-400" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-800 text-xs font-bold px-2.5 py-1 rounded-md hover:bg-blue-50 transition-colors"
                  >
                    + Follow
                  </button>
                  <button
                    type="button"
                    className="text-slate-400 hover:text-slate-600 p-1"
                    aria-label="Post options"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Post Content Body */}
              <div className="mt-4 text-sm text-slate-800 space-y-2.5 leading-relaxed">
                {activePost.contentLines.map((line, lIdx) =>
                  line === '' ? (
                    <div key={lIdx} className="h-2" />
                  ) : (
                    <p key={lIdx} className={line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.') || line.startsWith('→') ? 'font-medium pl-1 text-slate-900' : ''}>
                      {line}
                    </p>
                  )
                )}
              </div>

              {/* Hashtags */}
              <div className="mt-3 flex flex-wrap gap-1.5 text-xs text-blue-700 font-semibold">
                {activePost.hashtags.map((tag) => (
                  <span key={tag} className="hover:underline cursor-pointer">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Embedded Visual Asset / Carousel Mockup */}
            {activePost.hasMedia && (
              <div className="mx-5 sm:mx-6 mb-4 rounded-xl border border-slate-200 bg-slate-950 text-white p-5 shadow-sm">
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-3 border-b border-slate-800 pb-2">
                  <span className="font-semibold text-orange-400 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Custom Visual Asset
                  </span>
                  <span className="bg-slate-800 px-2 py-0.5 rounded text-white font-mono">
                    Slide 1 of 7
                  </span>
                </div>
                <div className="py-4 text-center">
                  <div className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                    {activePost.mediaTitle}
                  </div>
                  <div className="text-xs text-slate-300 mt-1 max-w-md mx-auto">
                    {activePost.mediaSubtitle}
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                    <div className="w-2 h-2 rounded-full bg-slate-700" />
                    <div className="w-2 h-2 rounded-full bg-slate-700" />
                    <div className="w-2 h-2 rounded-full bg-slate-700" />
                    <div className="w-2 h-2 rounded-full bg-slate-700" />
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Swipe for Full Framework ➔</span>
                  <span className="text-slate-500 font-medium">Founder Authority Design Suite</span>
                </div>
              </div>
            )}

            {/* Social Proof Counter Bar */}
            <div className="px-5 sm:px-6 py-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <div className="flex -space-x-1">
                  <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px]">
                    👍
                  </span>
                  <span className="w-4 h-4 rounded-full bg-orange-500 text-white flex items-center justify-center text-[9px]">
                    💡
                  </span>
                  <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px]">
                    👏
                  </span>
                </div>
                <span className="font-medium text-slate-700">
                  {activePost.stats.reactions + (likedPosts[activePost.id] ? 1 : 0)}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span>{activePost.stats.comments} comments</span>
                <span>•</span>
                <span>{activePost.stats.reposts} reposts</span>
              </div>
            </div>

            {/* Interaction Buttons Bar */}
            <div className="px-3 sm:px-4 py-1.5 border-t border-slate-200/80 grid grid-cols-4 gap-1 text-xs font-semibold text-slate-600">
              <button
                type="button"
                onClick={() => toggleLike(activePost.id)}
                className={`py-2 px-1 rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
                  likedPosts[activePost.id]
                    ? 'text-blue-600 bg-blue-50'
                    : 'hover:bg-slate-100 text-slate-600'
                }`}
              >
                <ThumbsUp className={`w-4 h-4 ${likedPosts[activePost.id] ? 'fill-blue-600' : ''}`} />
                <span>Like</span>
              </button>

              <button
                type="button"
                className="py-2 px-1 rounded-lg flex items-center justify-center gap-1.5 hover:bg-slate-100 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-slate-500" />
                <span>Comment</span>
              </button>

              <button
                type="button"
                className="py-2 px-1 rounded-lg flex items-center justify-center gap-1.5 hover:bg-slate-100 transition-colors"
              >
                <Repeat2 className="w-4 h-4 text-slate-500" />
                <span>Repost</span>
              </button>

              <button
                type="button"
                className="py-2 px-1 rounded-lg flex items-center justify-center gap-1.5 hover:bg-slate-100 transition-colors"
              >
                <Send className="w-4 h-4 text-slate-500" />
                <span>Send</span>
              </button>
            </div>
          </div>

          {/* Quick pagination arrows */}
          <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
            <button
              type="button"
              onClick={() =>
                setSelectedPostIndex((prev) =>
                  prev === 0 ? LINKEDIN_POST_MOCKUPS.length - 1 : prev - 1
                )
              }
              className="flex items-center gap-1 font-semibold hover:text-slate-900 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Sample</span>
            </button>

            <span className="text-slate-400 font-mono">
              Sample {selectedPostIndex + 1} of 3
            </span>

            <button
              type="button"
              onClick={() =>
                setSelectedPostIndex((prev) =>
                  prev === LINKEDIN_POST_MOCKUPS.length - 1 ? 0 : prev + 1
                )
              }
              className="flex items-center gap-1 font-semibold hover:text-slate-900 transition-colors"
            >
              <span>Next Sample</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-14 max-w-3xl mx-auto text-center">
          <p className="text-sm text-slate-600 mb-4">
            Want to see how your specific domain knowledge would look transformed into high-performing LinkedIn posts?
          </p>
          <button
            type="button"
            onClick={onOpenAudit}
            className="inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-900 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-sm transition-all"
          >
            <span>Request a Custom Sample Post for Your Profile</span>
          </button>
        </div>
      </div>
    </section>
  );
};
