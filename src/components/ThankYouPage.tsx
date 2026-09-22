import React, { useEffect, useState, useMemo } from 'react';
import {
  CheckCircle2,
  Calendar,
  Clock,
  ArrowLeft,
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

  const eventTitle = `Founder Authority Strategy Call: ${founderName}`;
  const eventDetails = `20-Minute Executive Strategy Call with Founder Authority.\n\nFounder: ${founderName}\nCompany: ${companyName}\nLinkedIn: ${linkedinUrl}\n\nStrategy session scheduled for ${dateSelected} at ${timeSelected}.`;

  // Build a 1-click Google Calendar add link matching the exact booked time (e.g. 3:30 PM)
  const calendarUrl = useMemo(() => {
    return buildGoogleCalendarUrl({
      title: eventTitle,
      dateStr: dateSelected,
      timeStr: timeSelected,
      details: eventDetails,
      location: 'Google Meet',
      attendeeEmail: founderEmail,
    });
  }, [eventTitle, dateSelected, timeSelected, eventDetails, founderEmail]);

  const handleDownloadIcs = () => {
    const icsContent = buildIcsData({
      bookingId: booking?.id || `bk_${Date.now()}`,
      title: eventTitle,
      dateStr: dateSelected,
      timeStr: timeSelected,
      details: eventDetails,
      location: 'Google Meet',
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
    <div className="min-h-screen bg-[#0B0B0F] text-[#FFFFFF] font-sans selection:bg-[#FF6A00] selection:text-[#0B0B0F] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto">
        {/* Navigation back */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onNavigateHome}
            id="thank-you-back-home-btn"
            className="inline-flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-[#FFFFFF] transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Homepage
          </button>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Confirmed
          </span>
        </div>

        {/* Main Confirmation Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="bg-[#14141A] rounded-2xl border border-[#262626] p-6 sm:p-8 shadow-xl"
        >
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-4">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-[#FFFFFF] tracking-tight mb-2">
              Thank You, {founderName}!
            </h1>
            <p className="text-sm text-[#A1A1AA] max-w-md mx-auto">
              Your 20-minute Strategy Call has been booked. We look forward to reviewing your LinkedIn presence.
            </p>
          </div>

          {/* Unified Booking Summary Card */}
          <div className="bg-[#0B0B0F] rounded-xl border border-[#262626] p-5 mb-6 space-y-4">
            {/* Slot Highlight */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#262626] gap-2">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#71717A] font-bold">Scheduled Time</span>
                <div className="text-base font-semibold text-[#FFFFFF] flex items-center gap-2 mt-0.5">
                  <Clock className="w-4 h-4 text-[#FF6A00]" />
                  <span>{dateSelected} at {timeSelected}</span>
                </div>
              </div>
              <span className="text-xs text-[#A1A1AA] self-start sm:self-auto bg-[#1A1A24] px-2.5 py-1 rounded-md border border-[#262626]">
                20-Min Video Call
              </span>
            </div>

            {/* Founder details in compact 2-column grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
              <div>
                <span className="text-[#71717A]">Attendee:</span>{' '}
                <span className="text-[#FFFFFF] font-medium">{founderName}</span>
                <span className="text-[#71717A] block truncate">{founderEmail}</span>
              </div>
              <div>
                <span className="text-[#71717A]">Company:</span>{' '}
                <span className="text-[#FFFFFF] font-medium">{companyName}</span>
                {linkedinUrl && (
                  <a
                    href={linkedinUrl.startsWith('http') ? linkedinUrl : `https://${linkedinUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF6A00] hover:underline block truncate"
                  >
                    LinkedIn Profile →
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center mb-6">
            <a
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="thank-you-add-calendar-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#FF6A00] hover:bg-[#FF8533] text-[#0B0B0F] font-bold text-sm transition-colors cursor-pointer shadow-md"
            >
              <Calendar className="w-4 h-4" />
              Add to Google Calendar
            </a>

            <button
              onClick={onNavigateHome}
              id="thank-you-return-home-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1A1A24] hover:bg-[#222230] text-[#FFFFFF] font-medium text-sm border border-[#2B2B38] transition-colors cursor-pointer"
            >
              Return to Homepage
            </button>
          </div>

          {/* Subtle .ics link */}
          <div className="text-center mb-6">
            <button
              onClick={handleDownloadIcs}
              type="button"
              id="thank-you-download-ics-btn"
              className="inline-flex items-center gap-1.5 text-xs text-[#71717A] hover:text-[#A1A1AA] transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .ics file (for Outlook / Apple Calendar)</span>
            </button>
          </div>

          {/* Clean 3-Step Next Steps */}
          <div className="border-t border-[#262626] pt-5">
            <span className="text-[11px] font-bold text-[#71717A] uppercase tracking-wider block mb-3">
              What Happens Next
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-[#0B0B0F] border border-[#22222A]">
                <div className="text-[#FF6A00] font-bold font-mono text-[10px] mb-0.5">01. AUDIT</div>
                <div className="font-semibold text-[#FFFFFF] mb-0.5">Profile Review</div>
                <div className="text-[#71717A] text-[11px] leading-relaxed">We evaluate your current LinkedIn positioning before the call.</div>
              </div>
              <div className="p-3 rounded-lg bg-[#0B0B0F] border border-[#22222A]">
                <div className="text-[#FF6A00] font-bold font-mono text-[10px] mb-0.5">02. PILLARS</div>
                <div className="font-semibold text-[#FFFFFF] mb-0.5">Content Strategy</div>
                <div className="text-[#71717A] text-[11px] leading-relaxed">We outline 3 authority themes tailored to your niche.</div>
              </div>
              <div className="p-3 rounded-lg bg-[#0B0B0F] border border-[#22222A]">
                <div className="text-[#FF6A00] font-bold font-mono text-[10px] mb-0.5">03. CALL</div>
                <div className="font-semibold text-[#FFFFFF] mb-0.5">20-Min Session</div>
                <div className="text-[#71717A] text-[11px] leading-relaxed">We meet at your selected time to walk through the roadmap.</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
