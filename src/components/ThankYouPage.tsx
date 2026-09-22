import React, { useEffect, useState, useMemo } from 'react';
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
  Video,
  Copy,
  Check,
  Download,
} from 'lucide-react';
import { motion } from 'motion/react';
import { StrategyCallBookingRecord } from '../types';
import { buildGoogleCalendarUrl, buildIcsData } from '../utils/calendar';

interface ThankYouPageProps {
  bookingData?: StrategyCallBookingRecord | null;
  onNavigateHome: () => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({
  bookingData: initialBooking,
  onNavigateHome,
}) => {
  const [booking, setBooking] = useState<StrategyCallBookingRecord | null>(initialBooking || null);
  const [copiedMeetLink, setCopiedMeetLink] = useState(false);

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
  const dateSelected = booking?.dateSelected || 'Today, Sep 22, 2026';
  const timeSelected = booking?.timeSelected || '5:00 PM IST (20 mins)';
  const meetLink = booking?.googleMeetLink || 'https://meet.google.com/fnd-xuvs-xuq';

  // Build a 1-click Google Calendar add link with exact UTC dates and India Standard Time timezone
  const calendarUrl = useMemo(() => {
    if (booking?.googleCalendarUrl && booking.googleCalendarUrl.includes('dates=')) {
      return booking.googleCalendarUrl;
    }
    return buildGoogleCalendarUrl({
      title: `Founder Authority Strategy Call: ${founderName} x Founder Authority`,
      dateStr: dateSelected,
      timeStr: timeSelected,
      details: `20-Minute Executive Strategy Call with Founder Authority.\n\nFounder: ${founderName}\nCompany: ${companyName}\nLinkedIn: ${linkedinUrl}\n\nGoogle Meet Link: ${meetLink}\n\nPlease join the meeting at your scheduled slot.`,
      location: meetLink,
      attendeeEmail: founderEmail,
    });
  }, [booking, founderName, companyName, linkedinUrl, dateSelected, timeSelected, meetLink, founderEmail]);

  const handleCopyMeetLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(meetLink);
      setCopiedMeetLink(true);
      setTimeout(() => setCopiedMeetLink(false), 2000);
    }
  };

  const handleDownloadIcs = () => {
    const icsContent = booking?.icsData || buildIcsData({
      bookingId: booking?.id || `bk_${Date.now()}`,
      title: `Founder Authority Strategy Call: ${founderName}`,
      dateStr: dateSelected,
      timeStr: timeSelected,
      details: `20-Minute Executive Strategy Call with Founder Authority. Join via Google Meet: ${meetLink}`,
      location: meetLink,
      attendeeName: founderName,
      attendeeEmail: founderEmail,
    });

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `founder-authority-call-${founderName.toLowerCase().replace(/\s+/g, '-')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
              Your 20-minute Strategy Call request has been securely recorded. We are preparing our executive breakdown of your LinkedIn presence.
            </p>
          </div>

          {/* Google Meet Direct Room Box */}
          <div className="bg-[#1A1A24] border border-[#FF6A00]/30 rounded-xl p-5 sm:p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    Google Meet Room Generated
                  </span>
                </div>
                <div className="text-sm font-semibold text-[#FFFFFF] break-all">
                  {meetLink}
                </div>
                <div className="text-xs text-[#A1A1AA]">
                  Scheduled for <span className="text-[#FFFFFF] font-medium">{dateSelected}</span> at <span className="text-[#FF6A00] font-semibold">{timeSelected}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleCopyMeetLink}
                  id="copy-meet-link-btn"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#262633] hover:bg-[#323242] text-xs font-semibold text-[#FFFFFF] border border-[#383848] transition-colors cursor-pointer"
                >
                  {copiedMeetLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#A1A1AA]" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>

                <a
                  href={meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="open-meet-link-btn"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#FF6A00] hover:bg-[#FF8533] text-xs font-bold text-[#0B0B0F] transition-colors cursor-pointer shadow-md"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Join Call</span>
                </a>
              </div>
            </div>
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
              <strong className="text-[#FFFFFF]">Strategy Session Locked:</strong> Your executive call is confirmed for <strong className="text-[#FF6A00]">{dateSelected} at {timeSelected}</strong>. Click below to add the event directly to your Google Calendar or download the calendar invite.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center mb-10">
            <a
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="thank-you-add-calendar-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#FF6A00] text-[#0B0B0F] font-bold text-sm hover:bg-[#FF8533] transition-colors cursor-pointer shadow-lg shadow-[#FF6A00]/20"
            >
              <Calendar className="w-4 h-4" />
              Add to Google Calendar
            </a>

            <button
              onClick={handleDownloadIcs}
              type="button"
              id="thank-you-download-ics-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#14141A] hover:bg-[#1F1F27] text-[#FFFFFF] font-semibold text-sm border border-[#383838] transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#A1A1AA]" />
              Download .ics (Outlook / Apple)
            </button>

            <button
              onClick={onNavigateHome}
              id="thank-you-return-home-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1F1F27] hover:bg-[#262633] text-[#A1A1AA] hover:text-[#FFFFFF] font-semibold text-sm border border-[#262626] transition-colors cursor-pointer"
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
