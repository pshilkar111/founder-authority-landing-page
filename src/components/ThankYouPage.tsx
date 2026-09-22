import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Calendar,
  Clock,
  Building,
  User,
  Mail,
  Linkedin,
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Database,
} from 'lucide-react';
import { motion } from 'motion/react';
import { StrategyCallBookingRecord } from '../types';

interface ThankYouPageProps {
  bookingData?: StrategyCallBookingRecord | null;
  onNavigateHome: () => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({
  bookingData: initialBooking,
  onNavigateHome,
}) => {
  const [booking, setBooking] = useState<StrategyCallBookingRecord | null>(initialBooking || null);

  useEffect(() => {
    // If no props passed, try reading from sessionStorage
    if (!booking && typeof window !== 'undefined') {
      try {
        const stored = sessionStorage.getItem('last_booking');
        if (stored) {
          setBooking(JSON.parse(stored));
        }
      } catch (err) {
        console.warn('Could not read session booking info:', err);
      }
    }
  }, [booking]);

  const founderName = booking?.name || booking?.fullName || 'Founder';
  const founderEmail = booking?.email || 'your email';
  const companyName = booking?.company || booking?.companyName || 'Your Venture';
  const linkedinUrl = booking?.linkedinUrl || '';
  const dateSelected = booking?.dateSelected || 'Tomorrow, Sep 22, 2026';
  const timeSelected = booking?.timeSelected || '3:00 PM IST (20 mins)';

  // Build a 1-click Google Calendar add link
  const createGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`Founder Authority Strategy Call: ${founderName}`);
    const details = encodeURIComponent(
      `20-Minute Executive Strategy Call with Founder Authority.\n\nFounder: ${founderName}\nCompany: ${companyName}\nLinkedIn: ${linkedinUrl}\n\nJoin via Google Meet at your scheduled slot.`
    );
    const location = encodeURIComponent('Founder Authority Video Conference');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-[#FFFFFF] font-sans selection:bg-[#FF6A00] selection:text-[#0B0B0F] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Navigation back */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={onNavigateHome}
            id="thank-you-back-home-btn"
            className="inline-flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-[#FFFFFF] transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Return to Homepage
          </button>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#14141A] border border-[#262626] text-xs text-[#A1A1AA]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Booking Confirmed</span>
          </div>
        </div>

        {/* Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#14141A] rounded-2xl border border-[#262626] p-6 sm:p-10 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle accent glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6A00]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FF6A00]/10 border border-[#FF6A00]/30 text-[#FF6A00] mb-5">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="inline-block px-3 py-1 rounded-full bg-[#FF6A00]/15 text-[#FF6A00] font-semibold text-xs tracking-wider uppercase mb-3">
              Booking Confirmed
            </span>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#FFFFFF] tracking-tight mb-3">
              Thank You, {founderName}!
            </h1>
            <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
              Your 20-minute Strategy Call request has been securely recorded in our database. We are preparing our executive breakdown of your LinkedIn presence.
            </p>
          </div>

          {/* Booking Details Grid */}
          <div className="bg-[#0B0B0F] rounded-xl border border-[#262626] p-5 sm:p-7 mb-8">
            <h2 className="text-xs uppercase tracking-wider font-bold text-[#A1A1AA] mb-5 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#FF6A00]" />
              Confirmed Booking Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-sm">
              {/* Name */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#14141A] border border-[#262626] text-[#FF6A00] shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-[#71717A]">Name</div>
                  <div className="font-semibold text-[#FFFFFF]">{founderName}</div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#14141A] border border-[#262626] text-[#FF6A00] shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-[#71717A]">Email</div>
                  <div className="font-semibold text-[#FFFFFF] truncate">{founderEmail}</div>
                </div>
              </div>

              {/* Company */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#14141A] border border-[#262626] text-[#FF6A00] shrink-0 mt-0.5">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-[#71717A]">Company</div>
                  <div className="font-semibold text-[#FFFFFF]">{companyName}</div>
                </div>
              </div>

              {/* LinkedIn URL */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#14141A] border border-[#262626] text-[#0A66C2] shrink-0 mt-0.5">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-[#71717A]">LinkedIn Profile</div>
                  {linkedinUrl ? (
                    <a
                      href={linkedinUrl.startsWith('http') ? linkedinUrl : `https://${linkedinUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#FF6A00] hover:underline flex items-center gap-1 truncate"
                    >
                      <span className="truncate">{linkedinUrl.replace(/^https?:\/\/(www\.)?linkedin\.com\//, '')}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  ) : (
                    <div className="text-[#A1A1AA] italic">Provided in submission</div>
                  )}
                </div>
              </div>

              {/* Date Selected */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#14141A] border border-[#262626] text-[#FF6A00] shrink-0 mt-0.5">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-[#71717A]">Date Selected</div>
                  <div className="font-semibold text-[#FFFFFF]">{dateSelected}</div>
                </div>
              </div>

              {/* Time Selected */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#14141A] border border-[#262626] text-[#FF6A00] shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-[#71717A]">Time Selected</div>
                  <div className="font-semibold text-[#FFFFFF]">{timeSelected}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Notice about Scheduled Strategy Call */}
          <div className="bg-[#1F1F27]/60 border border-[#262626] rounded-xl p-4 mb-8 text-xs text-[#A1A1AA] flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-[#FF6A00] shrink-0" />
            <p className="leading-relaxed">
              <strong className="text-[#FFFFFF]">Strategy Session Locked:</strong> Your executive call is confirmed. Add the event to your Google or Outlook calendar below, and join via the Google Meet link at your scheduled time.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center mb-10">
            <a
              href={createGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              id="thank-you-add-calendar-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#FF6A00] text-[#0B0B0F] font-bold text-sm hover:bg-[#FF8533] transition-colors cursor-pointer shadow-lg shadow-[#FF6A00]/20"
            >
              <Calendar className="w-4 h-4" />
              Add to Google Calendar
            </a>

            <button
              onClick={onNavigateHome}
              id="thank-you-return-home-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1F1F27] hover:bg-[#262633] text-[#FFFFFF] font-semibold text-sm border border-[#383838] transition-colors cursor-pointer"
            >
              Return to Homepage
            </button>
          </div>

          {/* Next Steps Process */}
          <div className="border-t border-[#262626] pt-8">
            <h3 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-4">
              What Happens Next:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#0B0B0F] border border-[#262626]">
                <div className="text-xs font-mono text-[#FF6A00] font-bold mb-1">01 / AUDIT</div>
                <h4 className="text-sm font-semibold text-[#FFFFFF] mb-1">Profile Analysis</h4>
                <p className="text-xs text-[#71717A] leading-relaxed">
                  We analyze your headline, banner, featured work, and recent post engagement before our call.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0B0B0F] border border-[#262626]">
                <div className="text-xs font-mono text-[#FF6A00] font-bold mb-1">02 / POSITIONING</div>
                <h4 className="text-sm font-semibold text-[#FFFFFF] mb-1">Core Pillars</h4>
                <p className="text-xs text-[#71717A] leading-relaxed">
                  We outline the 3 key content themes that position you as the definitive leader in your industry.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0B0B0F] border border-[#262626]">
                <div className="text-xs font-mono text-[#FF6A00] font-bold mb-1">03 / 20-MIN CALL</div>
                <h4 className="text-sm font-semibold text-[#FFFFFF] mb-1">Strategy Review</h4>
                <p className="text-xs text-[#71717A] leading-relaxed">
                  We meet on your selected date and time to deliver your tailored LinkedIn inbound blueprint.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
