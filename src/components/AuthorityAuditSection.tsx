import React, { useState } from 'react';
import {
  Check,
  AlertTriangle,
  ArrowRight,
  Shield,
  Linkedin,
  Sparkles,
  Lock,
  RefreshCw,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface AuthorityAuditSectionProps {
  onOpenBooking: () => void;
}

export const AuthorityAuditSection: React.FC<AuthorityAuditSectionProps> = ({ onOpenBooking }) => {
  const [profileUrl, setProfileUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisDone, setAnalysisDone] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Lead capture fields
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadCompany, setLeadCompany] = useState('');
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const clean = profileUrl.trim();
    if (!clean) {
      setErrorMessage('Please enter your LinkedIn profile URL');
      return;
    }

    if (!clean.toLowerCase().includes('linkedin.com/in/')) {
      setErrorMessage('Please enter a valid LinkedIn URL (e.g. linkedin.com/in/your-name)');
      return;
    }

    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisDone(true);
    }, 1200);
  };

  const handleUnlockReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadEmail) return;

    setIsSubmittingLead(true);
    try {
      if (db) {
        await addDoc(collection(db, 'linkedin_audit_leads'), {
          name: leadName,
          email: leadEmail,
          company: leadCompany || 'Founder',
          linkedin_url: profileUrl,
          authority_score: 7.4,
          strengths: [
            'Strong industry credibility',
            'Relevant experience',
            'Clear expertise',
          ],
          areas_to_improve: [
            'Headline',
            'Positioning',
            'Content consistency',
          ],
          recommendations: [
            'Rewrite headline',
            'Improve About section',
            'Create content pillars',
            'Build founder narrative',
          ],
          timestamp: serverTimestamp(),
        });
      }
    } catch (err) {
      console.warn('Notice saving lead:', err);
    } finally {
      setIsSubmittingLead(false);
      setIsUnlocked(true);
    }
  };

  const handleReset = () => {
    setProfileUrl('');
    setAnalysisDone(false);
    setIsUnlocked(false);
    setLeadName('');
    setLeadEmail('');
    setLeadCompany('');
  };

  return (
    <section
      id="linkedin-score"
      className="py-20 sm:py-28 bg-[#0B0B0F] text-[#FFFFFF] border-b border-[#262626] relative"
    >
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#14141A] border border-[#262626] text-[#FF6A00] text-xs font-medium tracking-wide mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Free LinkedIn Audit</span>
          </div>

          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-[#FFFFFF] tracking-tight">
            Is Your LinkedIn Helping Your Business?
          </h2>

          <div className="mt-4 text-sm sm:text-base text-[#A1A1AA] leading-relaxed space-y-1">
            <p>
              Most founders have no idea how their profile looks to potential customers, investors or future hires.
            </p>
            <p className="text-[#FFFFFF]/90">
              Paste your profile and get a free LinkedIn Authority Score.
            </p>
          </div>
        </div>

        {/* Audit Container Card */}
        <div className="bg-[#14141A] rounded-2xl border border-[#262626] p-6 sm:p-8 shadow-xl">
          {/* STEP 1: Paste LinkedIn URL */}
          {!analysisDone && (
            <form onSubmit={handleAnalyze} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#A1A1AA] mb-2 uppercase tracking-wider">
                  LinkedIn URL
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A1A1AA]">
                    <Linkedin className="w-4 h-4 text-[#FF6A00]" />
                  </div>
                  <input
                    type="text"
                    value={profileUrl}
                    onChange={(e) => setProfileUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/your-profile"
                    disabled={isAnalyzing}
                    className="w-full pl-10 pr-4 py-3.5 bg-[#0B0B0F] border border-[#262626] rounded-xl text-sm text-[#FFFFFF] placeholder-[#A1A1AA]/50 focus:outline-none focus:border-[#FF6A00] transition-colors"
                  />
                </div>
                {errorMessage && (
                  <p className="mt-2 text-xs text-red-400">{errorMessage}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isAnalyzing}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#FF6A00] hover:bg-[#FF8533] active:bg-[#E65A00] text-[#0B0B0F] font-semibold text-sm py-3.5 px-6 rounded-xl transition-colors cursor-pointer disabled:opacity-60 shadow-sm"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#0B0B0F]" />
                    <span>Analyzing Your Profile...</span>
                  </>
                ) : (
                  <>
                    <span>Analyze My Profile</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-center text-xs text-[#A1A1AA]/70 pt-1">
                Takes 10 seconds. We review headline, positioning, credibility, and content structure.
              </p>
            </form>
          )}

          {/* STEP 2: Lead Capture Before Showing Full Report */}
          {analysisDone && !isUnlocked && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <div className="text-center pb-2 border-b border-[#262626]">
                <div className="w-10 h-10 rounded-full bg-[#0B0B0F] border border-[#262626] flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-4 h-4 text-[#FF6A00]" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#FFFFFF]">
                  Unlock Your Full LinkedIn Audit
                </h3>
                <p className="text-xs text-[#A1A1AA] mt-1 max-w-sm mx-auto">
                  Your profile has been analyzed. Enter your details to view your LinkedIn Authority Score and report.
                </p>
              </div>

              <form onSubmit={handleUnlockReport} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Sharma"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0B0B0F] border border-[#262626] rounded-xl text-xs text-[#FFFFFF] placeholder-[#A1A1AA]/50 focus:outline-none focus:border-[#FF6A00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="vikram@company.com"
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0B0B0F] border border-[#262626] rounded-xl text-xs text-[#FFFFFF] placeholder-[#A1A1AA]/50 focus:outline-none focus:border-[#FF6A00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Apex Software"
                    value={leadCompany}
                    onChange={(e) => setLeadCompany(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0B0B0F] border border-[#262626] rounded-xl text-xs text-[#FFFFFF] placeholder-[#A1A1AA]/50 focus:outline-none focus:border-[#FF6A00]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmittingLead}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#FF6A00] hover:bg-[#FF8533] active:bg-[#E65A00] text-[#0B0B0F] font-semibold text-xs sm:text-sm py-3 px-6 rounded-xl transition-colors cursor-pointer disabled:opacity-60 shadow-sm"
                  >
                    {isSubmittingLead ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#0B0B0F]" />
                        <span>Unlocking Report...</span>
                      </>
                    ) : (
                      <>
                        <span>Get My Full Report</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>

                <p className="text-center text-[11px] text-[#A1A1AA]/70">
                  Private & confidential. We never spam.
                </p>
              </form>
            </motion.div>
          )}

          {/* STEP 3: Full Audit Report Display */}
          {analysisDone && isUnlocked && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Score Header */}
              <div className="bg-[#0B0B0F] rounded-xl p-5 border border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#A1A1AA] font-medium block">
                    LinkedIn Authority Score
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-display font-extrabold text-4xl text-[#FF6A00]">
                      7.4
                    </span>
                    <span className="text-lg text-[#A1A1AA] font-medium">/ 10</span>
                  </div>
                  <p className="text-xs text-[#A1A1AA] mt-1">
                    Solid foundation with strong expertise. Key positioning gaps are capping inbound opportunities.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-[#A1A1AA] hover:text-[#FFFFFF] underline transition-colors"
                >
                  Analyze another profile
                </button>
              </div>

              {/* 3 Pillars: Strengths, Areas To Improve, Recommendations */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Strengths */}
                <div className="bg-[#0B0B0F] rounded-xl p-4 border border-[#262626] space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-[#14141A] border border-[#262626] flex items-center justify-center text-[#FF6A00]">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[#FFFFFF]">
                      Strengths
                    </h4>
                  </div>
                  <ul className="space-y-2 text-xs text-[#A1A1AA]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF6A00] font-bold">✓</span>
                      <span>Strong industry credibility</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF6A00] font-bold">✓</span>
                      <span>Relevant experience</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF6A00] font-bold">✓</span>
                      <span>Clear expertise</span>
                    </li>
                  </ul>
                </div>

                {/* Areas To Improve */}
                <div className="bg-[#0B0B0F] rounded-xl p-4 border border-[#262626] space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-[#14141A] border border-[#262626] flex items-center justify-center text-amber-400">
                      <AlertTriangle className="w-3.5 h-3.5" />
                    </div>
                    <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[#FFFFFF]">
                      Areas To Improve
                    </h4>
                  </div>
                  <ul className="space-y-2 text-xs text-[#A1A1AA]">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">⚠</span>
                      <span>Headline</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">⚠</span>
                      <span>Positioning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">⚠</span>
                      <span>Content consistency</span>
                    </li>
                  </ul>
                </div>

                {/* Recommendations */}
                <div className="bg-[#0B0B0F] rounded-xl p-4 border border-[#262626] space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-[#14141A] border border-[#262626] flex items-center justify-center text-[#FF6A00]">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[#FFFFFF]">
                      Recommendations
                    </h4>
                  </div>
                  <ul className="space-y-2 text-xs text-[#A1A1AA]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF6A00] font-bold">✓</span>
                      <span>Rewrite headline</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF6A00] font-bold">✓</span>
                      <span>Improve About section</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF6A00] font-bold">✓</span>
                      <span>Create content pillars</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF6A00] font-bold">✓</span>
                      <span>Build founder narrative</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action Banner */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0B0B0F] p-4 rounded-xl border border-[#262626]">
                <div className="text-xs text-[#A1A1AA] text-center sm:text-left">
                  Want our team to fix these gaps and turn your profile into an inbound engine?
                </div>
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FF6A00] hover:bg-[#FF8533] active:bg-[#E65A00] text-[#0B0B0F] font-semibold text-xs py-2.5 px-5 rounded-lg transition-colors cursor-pointer whitespace-nowrap shadow-sm"
                >
                  <span>Book Strategy Call</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
