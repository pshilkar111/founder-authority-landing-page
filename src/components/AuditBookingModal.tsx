import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Clock,
  ArrowRight,
  Linkedin,
  Calendar,
  AlertCircle,
  Loader2,
  Building,
  User,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { StrategyCallBookingRecord } from '../types';
import { buildGoogleCalendarUrl, buildIcsData } from '../utils/calendar';

interface AuditBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: string;
  onBookingSuccess?: (booking: StrategyCallBookingRecord) => void;
}

export const AuditBookingModal: React.FC<AuditBookingModalProps> = ({
  isOpen,
  onClose,
  initialPlan,
  onBookingSuccess,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const dateOptions = useMemo(() => {
    const options: string[] = [];
    const now = new Date();
    let added = 0;
    for (let i = 0; added < 5 && i < 14; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      if (d.getDay() === 0) continue; // Skip Sunday
      const month = d.toLocaleDateString('en-US', { month: 'short' });
      const day = d.getDate();
      const year = d.getFullYear();
      const weekday = d.toLocaleDateString('en-US', { weekday: 'long' });
      if (i === 0) {
        options.push(`Today, ${month} ${day}, ${year}`);
      } else if (i === 1) {
        options.push(`Tomorrow, ${month} ${day}, ${year}`);
      } else {
        options.push(`${weekday}, ${month} ${day}, ${year}`);
      }
      added++;
    }
    return options;
  }, []);

  const allTimeOptions = [
    '10:00 AM IST',
    '11:30 AM IST',
    '1:00 PM IST',
    '2:00 PM IST',
    '3:30 PM IST',
    '5:00 PM IST',
    '6:30 PM IST',
    '8:00 PM IST',
  ];

  // Helper to parse time slot to minutes from midnight
  const parseSlotToMinutes = (slot: string): number => {
    const match = slot.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (!match) return 0;
    let h = parseInt(match[1], 10);
    const m = parseInt(match[2], 10);
    const mer = match[3].toUpperCase();
    if (mer === 'PM' && h < 12) h += 12;
    if (mer === 'AM' && h === 12) h = 0;
    return h * 60 + m;
  };

  // Helper to get current IST minutes from midnight
  const getCurrentIstMinutes = (): number => {
    try {
      const now = new Date();
      const istTimeStr = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
      }).format(now);
      const [curH, curM] = istTimeStr.split(':').map(Number);
      return curH * 60 + (curM || 0);
    } catch {
      const now = new Date();
      const utcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
      return (utcMinutes + 330) % 1440; // UTC+5:30
    }
  };

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    linkedinUrl: '',
    companyName: '',
    primaryGoal: 'Attracting Customers & Inbound Opportunities',
    selectedPlan: initialPlan || 'For Founders Ready To Grow (₹40,000/mo)',
    dateSelected: 'Today, Sep 22, 2026',
    timeSelected: '5:00 PM IST',
  });

  const isTodaySelected = formData.dateSelected.toLowerCase().startsWith('today');

  // If today's slot is selected, only show time slots that are at least 2 hours after the current time
  const availableTimeSlots = useMemo(() => {
    if (!isTodaySelected) {
      return allTimeOptions;
    }
    const curIstMinutes = getCurrentIstMinutes();
    const minAllowedMinutes = curIstMinutes + 120; // 2 hours after current time
    return allTimeOptions.filter((slot) => parseSlotToMinutes(slot) >= minAllowedMinutes);
  }, [isTodaySelected, formData.dateSelected]);

  // Keep timeSelected valid whenever availableTimeSlots changes
  useEffect(() => {
    if (availableTimeSlots.length > 0) {
      if (!availableTimeSlots.includes(formData.timeSelected)) {
        setFormData((prev) => ({ ...prev, timeSelected: availableTimeSlots[0] }));
      }
    }
  }, [availableTimeSlots, formData.timeSelected]);

  // Reset modal state whenever it is opened
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setIsSubmitting(false);
      setErrorMessage(null);
      if (dateOptions.length > 0) {
        // If today has available slots >= 2 hours away, default to today; otherwise default to tomorrow
        const curMinutes = getCurrentIstMinutes();
        const hasTodaySlots = allTimeOptions.some(
          (slot) => parseSlotToMinutes(slot) >= curMinutes + 120
        );
        const initialDate = hasTodaySlots ? dateOptions[0] : dateOptions[1] || dateOptions[0];
        setFormData((prev) => ({ ...prev, dateSelected: initialDate }));
      }
    }
  }, [isOpen, dateOptions]);

  useEffect(() => {
    if (initialPlan) {
      setFormData((prev) => ({ ...prev, selectedPlan: initialPlan }));
    }
  }, [initialPlan]);

  const handleSubmitStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid work email address.');
      return;
    }
    if (!formData.linkedinUrl.trim()) {
      setErrorMessage('Please enter your LinkedIn profile URL.');
      return;
    }
    setStep(2);
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const fullSlotString = `${formData.dateSelected} at ${formData.timeSelected} (20 mins)`;

    const bookingId = `bk_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const eventTitle = `Founder Authority Strategy Call: ${formData.fullName.trim()}`;
    const eventDetails = `20-Minute Executive Strategy Call with Founder Authority.\n\nFounder: ${formData.fullName.trim()}\nCompany: ${formData.companyName.trim() || 'Venture'}\nLinkedIn: ${formData.linkedinUrl.trim()}\n\nStrategy session scheduled for ${fullSlotString}. Video call link will be provided prior to the session.`;

    const gCalUrl = buildGoogleCalendarUrl({
      title: eventTitle,
      dateStr: formData.dateSelected.trim(),
      timeStr: formData.timeSelected.trim(),
      details: eventDetails,
      location: 'Google Meet',
      attendeeEmail: formData.email.trim(),
    });
    const icsContent = buildIcsData({
      bookingId,
      title: eventTitle,
      dateStr: formData.dateSelected.trim(),
      timeStr: formData.timeSelected.trim(),
      details: eventDetails,
      location: 'Google Meet',
      attendeeName: formData.fullName.trim(),
      attendeeEmail: formData.email.trim(),
    });

    let bookingRecord: StrategyCallBookingRecord = {
      id: bookingId,
      name: formData.fullName.trim(),
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      company: formData.companyName.trim() || 'Not specified',
      companyName: formData.companyName.trim() || 'Not specified',
      linkedinUrl: formData.linkedinUrl.trim(),
      dateSelected: formData.dateSelected.trim(),
      timeSelected: formData.timeSelected.trim(),
      selectedDate: fullSlotString,
      primaryGoal: formData.primaryGoal,
      selectedPlan: formData.selectedPlan,
      googleCalendarUrl: gCalUrl,
      icsData: icsContent,
      status: 'confirmed',
      emailSent: false,
      timestamp: new Date().toISOString(),
    };

    try {
      // 1. Concurrently call the backend API to generate meeting link & calendar assets
      try {
        const apiRes = await fetch('/api/book-strategy-call', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: bookingRecord.fullName,
            fullName: bookingRecord.fullName,
            email: bookingRecord.email,
            company: bookingRecord.companyName,
            companyName: bookingRecord.companyName,
            linkedinUrl: bookingRecord.linkedinUrl,
            dateSelected: bookingRecord.dateSelected,
            timeSelected: bookingRecord.timeSelected,
            selectedDate: fullSlotString,
            primaryGoal: bookingRecord.primaryGoal,
            selectedPlan: bookingRecord.selectedPlan,
          }),
        });

        if (apiRes.ok) {
          const apiData = await apiRes.json();
          if (apiData.success && apiData.booking) {
            bookingRecord = { ...bookingRecord, ...apiData.booking };
          }
        }
      } catch (apiErr) {
        console.warn('[Booking] Server API notice:', apiErr);
      }

      // 2. Persist to Firestore with a 2-second timeout race (prevents hanging if offline or uncreated)
      if (db) {
        try {
          const firestoreWritePromise = addDoc(collection(db, 'strategy_call_bookings'), {
            ...bookingRecord,
            createdAt: serverTimestamp(),
          });

          const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve(null), 2000));
          const docRef = (await Promise.race([firestoreWritePromise, timeoutPromise])) as any;

          if (docRef && docRef.id) {
            bookingRecord.id = docRef.id;
            console.log('[Booking] Saved directly to Firestore with ID:', docRef.id);
          } else {
            console.log('[Booking] Firestore write queued/timed out; proceeding with local backup');
          }
        } catch (dbErr) {
          console.warn('[Booking] Notice saving to Firestore:', dbErr);
        }
      }

      // 3. Store in sessionStorage for instant retrieval on Thank You page
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('last_booking', JSON.stringify(bookingRecord));
      }

      // 4. Safely close modal and redirect to Thank You page
      setIsSubmitting(false);
      onClose();
      if (onBookingSuccess) {
        onBookingSuccess(bookingRecord);
      }
    } catch (err: any) {
      console.error('[Booking Error]', err);
      // Fallback: Always ensure user transitions to Thank You page
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('last_booking', JSON.stringify(bookingRecord));
      }
      setIsSubmitting(false);
      onClose();
      if (onBookingSuccess) {
        onBookingSuccess(bookingRecord);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="booking-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0B0B0F]/80 backdrop-blur-sm"
          />

          {/* Modal Box */}
          <motion.div
            id="booking-modal-container"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg bg-[#14141A] rounded-2xl shadow-2xl border border-[#262626] overflow-hidden my-6 z-10 text-[#FFFFFF]"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#262626] bg-[#14141A]">
              <div>
                <span className="text-[11px] font-semibold text-[#FF6A00] tracking-wider uppercase">
                  Executive Session
                </span>
                <h3 className="font-extrabold text-base sm:text-lg text-[#FFFFFF]">
                  Book 20-Min Strategy Call
                </h3>
              </div>
              <button
                onClick={onClose}
                id="booking-modal-close-btn"
                className="text-[#A1A1AA] hover:text-[#FFFFFF] p-1.5 rounded-lg hover:bg-[#0B0B0F] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 space-y-4">
              {errorMessage && (
                <div className="p-3 bg-red-950/40 border border-red-800/60 rounded-xl text-xs text-red-200 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* STEP 1: Founder Details */}
              {step === 1 && (
                <form onSubmit={handleSubmitStep1} className="space-y-3.5">
                  <p className="text-xs text-[#A1A1AA] leading-relaxed">
                    Tell us about your company and LinkedIn profile. We will review your current presence and prepare your audit before the call.
                  </p>

                  <div>
                    <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                      Full Name <span className="text-[#FF6A00]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#A1A1AA]">
                        <User className="w-3.5 h-3.5 text-[#71717A]" />
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vikram Sharma"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#0B0B0F] border border-[#262626] text-[#FFFFFF] text-xs placeholder-[#71717A] focus:outline-none focus:border-[#FF6A00]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                        Work Email <span className="text-[#FF6A00]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="vikram@company.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0B0F] border border-[#262626] text-[#FFFFFF] text-xs placeholder-[#71717A] focus:outline-none focus:border-[#FF6A00]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                        Company Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#A1A1AA]">
                          <Building className="w-3.5 h-3.5 text-[#71717A]" />
                        </div>
                        <input
                          type="text"
                          placeholder="e.g. Apex Software"
                          value={formData.companyName}
                          onChange={(e) =>
                            setFormData({ ...formData, companyName: e.target.value })
                          }
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#0B0B0F] border border-[#262626] text-[#FFFFFF] text-xs placeholder-[#71717A] focus:outline-none focus:border-[#FF6A00]"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                      LinkedIn Profile URL <span className="text-[#FF6A00]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#A1A1AA]">
                        <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                      </div>
                      <input
                        type="url"
                        required
                        placeholder="https://linkedin.com/in/your-profile"
                        value={formData.linkedinUrl}
                        onChange={(e) =>
                          setFormData({ ...formData, linkedinUrl: e.target.value })
                        }
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#0B0B0F] border border-[#262626] text-[#FFFFFF] text-xs placeholder-[#71717A] focus:outline-none focus:border-[#FF6A00]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                      Primary Goal
                    </label>
                    <select
                      value={formData.primaryGoal}
                      onChange={(e) =>
                        setFormData({ ...formData, primaryGoal: e.target.value })
                      }
                      className="w-full px-3 py-2.5 rounded-xl bg-[#0B0B0F] border border-[#262626] text-[#FFFFFF] text-xs focus:outline-none focus:border-[#FF6A00]"
                    >
                      <option value="Attracting Customers & Inbound Opportunities">Attracting Customers & Inbound Deals</option>
                      <option value="Venture Capital & Investor Trust">Investor Trust & Fundraising</option>
                      <option value="Hiring Elite Talent">Hiring Key Team Members</option>
                      <option value="Industry Visibility & Reputation">Industry Visibility & Reputation</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      id="continue-to-select-time-btn"
                      className="w-full bg-[#FF6A00] hover:bg-[#FF8533] active:bg-[#E65A00] text-[#0B0B0F] font-bold py-3 px-5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-[#FF6A00]/20"
                    >
                      <span>Continue to Select Date & Time</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 2: Pick Date & Time */}
              {step === 2 && (
                <form onSubmit={handleConfirmBooking} className="space-y-4">
                  <div className="p-3 bg-[#0B0B0F] rounded-xl border border-[#262626] text-xs flex justify-between items-center">
                    <span className="text-[#A1A1AA]">Founder:</span>
                    <strong className="text-[#FFFFFF]">{formData.fullName} ({formData.email})</strong>
                  </div>

                  {/* 1. Date Selection */}
                  <div>
                    <label className="block text-xs font-bold text-[#FFFFFF] mb-2 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#FF6A00]" />
                      <span>Select Date:</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {dateOptions.map((date) => (
                        <button
                          type="button"
                          key={date}
                          onClick={() => setFormData({ ...formData, dateSelected: date })}
                          className={`text-left p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                            formData.dateSelected === date
                              ? 'bg-[#FF6A00]/10 border-[#FF6A00] text-[#FFFFFF] font-semibold ring-1 ring-[#FF6A00]/40'
                              : 'bg-[#0B0B0F] border-[#262626] text-[#A1A1AA] hover:border-[#383838]'
                          }`}
                        >
                          {date}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2. Time Selection */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-[#FFFFFF] flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#FF6A00]" />
                        <span>Select Time (20 Mins):</span>
                      </label>
                      {isTodaySelected && (
                        <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Slots 2+ hrs from now</span>
                        </span>
                      )}
                    </div>

                    {availableTimeSlots.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {availableTimeSlots.map((time) => (
                          <button
                            type="button"
                            key={time}
                            onClick={() => setFormData({ ...formData, timeSelected: time })}
                            className={`text-center py-2 px-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                              formData.timeSelected === time
                                ? 'bg-[#FF6A00] border-[#FF6A00] text-[#0B0B0F] font-bold'
                                : 'bg-[#0B0B0F] border-[#262626] text-[#A1A1AA] hover:border-[#383838]'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-3.5 rounded-xl bg-[#1A1A24] border border-[#383848] text-center space-y-2">
                        <p className="text-xs text-[#FFFFFF] font-medium">
                          All same-day slots for today have passed or require at least 2 hours advance notice.
                        </p>
                        <p className="text-[11px] text-[#A1A1AA]">
                          Please select tomorrow or an upcoming date for complete morning and afternoon availability.
                        </p>
                        {dateOptions[1] && (
                          <button
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, dateSelected: dateOptions[1] }))}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF6A00] text-[#0B0B0F] text-xs font-bold hover:bg-[#FF8533] transition-colors cursor-pointer"
                          >
                            <Calendar className="w-3 h-3" />
                            <span>Switch to Tomorrow ({dateOptions[1].replace('Tomorrow, ', '')})</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => setStep(1)}
                      className="px-4 py-2.5 rounded-xl border border-[#262626] text-xs font-medium text-[#A1A1AA] hover:text-[#FFFFFF] transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      id="confirm-strategy-call-btn"
                      disabled={isSubmitting || availableTimeSlots.length === 0}
                      className="flex-1 bg-[#FF6A00] hover:bg-[#FF8533] disabled:opacity-50 disabled:cursor-not-allowed text-[#0B0B0F] font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-[#FF6A00]/20"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Confirming your booking...</span>
                        </>
                      ) : availableTimeSlots.length === 0 ? (
                        <span>Please Select Another Date Above</span>
                      ) : (
                        <>
                          <span>Confirm & Book Strategy Call</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
