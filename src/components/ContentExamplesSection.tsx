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
} from 'lucide-react';

interface ContentExamplesSectionProps {
  onOpenAudit: () => void;
}

export const ContentExamplesSection: React.FC<ContentExamplesSectionProps> = () => {
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

  return (
    <section
      id="content-examples"
      className="py-14 sm:py-16 bg-slate-50/50 border-b border-slate-100"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-200/80 text-slate-800 text-[11px] font-bold uppercase tracking-wider mb-3">
            <span>Authentic Executive Writing</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Sample LinkedIn Content We Create
          </h2>

          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Tailored to your genuine voice. Real-world vulnerability combined with
            strategic frameworks that drive deals.
          </p>
        </div>

        {/* 3-Tab Selector */}
        <div className="mt-7 max-w-xl mx-auto flex p-1 bg-white border border-slate-200 rounded-xl shadow-2xs gap-1">
          {LINKEDIN_POST_MOCKUPS.map((post, idx) => (
            <button
              key={post.id}
              type="button"
              onClick={() => setSelectedPostIndex(idx)}
              className={`flex-1 py-2 px-2 rounded-lg text-xs font-bold transition-all text-center ${
                selectedPostIndex === idx
                  ? 'bg-slate-950 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              {idx === 0 ? 'D2C Scaling' : idx === 1 ? 'Startup Growth' : 'Marketing POV'}
            </button>
          ))}
        </div>

        {/* LinkedIn Post Mockup */}
        <div className="mt-6 max-w-xl mx-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
            {/* Post Category Pill */}
            <div className="bg-slate-100 px-4 py-2 border-b border-slate-200/70 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 text-[11px]">
                {activePost.badgeText}
              </span>
              <span className="font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded text-[11px] border border-orange-200/50">
                {activePost.stats.impressions} Views
              </span>
            </div>

            {/* LinkedIn Header */}
            <div className="p-4 sm:p-5 pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={activePost.author.avatarUrl}
                    alt={activePost.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-1">
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
              <div className="mt-3 text-xs sm:text-sm text-slate-800 space-y-2 leading-relaxed">
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
              <div className="mt-2.5 flex flex-wrap gap-1 text-xs text-blue-700 font-semibold">
                {activePost.hashtags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>

            {/* Embedded Asset if present */}
            {activePost.hasMedia && (
              <div className="mx-4 sm:mx-5 mb-3 rounded-xl bg-slate-950 text-white p-4 border border-slate-800 text-center">
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-2 border-b border-slate-800 pb-1.5">
                  <span className="font-semibold text-orange-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Custom Branded Asset
                  </span>
                  <span className="bg-slate-800 px-1.5 py-0.5 rounded text-white font-mono">
                    Slide 1 of 7
                  </span>
                </div>
                <div className="text-sm sm:text-base font-extrabold text-white">
                  {activePost.mediaTitle}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {activePost.mediaSubtitle}
                </div>
              </div>
            )}

            {/* Social Count Bar */}
            <div className="px-4 sm:px-5 py-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <div className="flex items-center gap-1">
                <span className="w-3.5 h-3.5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[8px]">
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

            {/* Interactive Action Bar */}
            <div className="px-4 sm:px-5 py-2 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <button
                type="button"
                onClick={() => toggleLike(activePost.id)}
                className={`flex items-center gap-1.5 text-xs font-semibold py-1 px-2 rounded transition-colors ${
                  isLiked ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-blue-600 text-blue-600' : ''}`} />
                <span>Like</span>
              </button>

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
          </div>
        </div>
      </div>
    </section>
  );
};
