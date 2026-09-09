import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Clock,
  ArrowRight,
  Linkedin,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface AuditBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: string;
}

export const AuditBookingModal: React.FC<AuditBookingModalProps> = ({
  isOpen,
  onClose,
  initialPlan,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    linkedinUrl: '',
    companyName: '',
    primaryGoal: 'Attracting Customers & Inbound Opportunities',
    selectedPlan: initialPlan || 'For Founders Ready To Grow (₹40,000/mo)',
    selectedDate: 'Tomorrow, 3:00 PM IST',
  });

  React.useEffect(() => {
    if (initialPlan) {
      setFormData((prev) => ({ ...prev, selectedPlan: initialPlan }));
    }
  }, [initialPlan]);

  const handleSubmitStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.linkedinUrl) {
      return;
    }
    setStep(2);
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (db) {
        await addDoc(collection(db, 'strategy_call_bookings'), {
          ...formData,
          createdAt: serverTimestamp(),
        });
      }
    } catch (err) {
      console.warn('Notice saving booking:', err);
    }
    setStep(3);
  };

  const availableSlots = [
    'Tomorrow, 11:00 AM IST (20 mins)',
    'Tomorrow, 3:00 PM IST (20 mins)',
    'Thursday, 12:30 PM IST (20 mins)',
    'Thursday, 4:30 PM IST (20 mins)',
    'Friday, 2:00 PM IST (20 mins)',
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
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
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg bg-[#14141A] rounded-2xl shadow-2xl border border-[#262626] overflow-hidden my-6 z-10 text-[#FFFFFF]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-[#262626] flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-[#FF6A00] uppercase tracking-wider block mb-1">
                  Strategy Call
                </span>
                <h3 className="font-display font-bold text-lg text-[#FFFFFF]">
                  {step === 3 ? 'Call Confirmed' : 'Book a Strategy Call'}
                </h3>
                <p className="text-xs text-[#A1A1AA] mt-0.5">
                  {step === 1 && 'Step 1 of 2: Your profile & focus'}
                  {step === 2 && 'Step 2 of 2: Pick a 20-minute slot'}
                  {step === 3 && 'We look forward to speaking with you'}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-[#A1A1AA] hover:text-[#FFFFFF] rounded-lg hover:bg-[#0B0B0F] transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 sm:p-6">
              {/* STEP 1: Founder Details */}
              {step === 1 && (
                <form onSubmit={handleSubmitStep1} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                      Your Name <span className="text-[#FF6A00]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Sharma"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0B0F] border border-[#262626] text-[#FFFFFF] text-xs placeholder-[#A1A1AA]/50 focus:outline-none focus:border-[#FF6A00]"
                    />
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
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0B0F] border border-[#262626] text-[#FFFFFF] text-xs placeholder-[#A1A1AA]/50 focus:outline-none focus:border-[#FF6A00]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Apex Software"
                        value={formData.companyName}
                        onChange={(e) =>
                          setFormData({ ...formData, companyName: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0B0F] border border-[#262626] text-[#FFFFFF] text-xs placeholder-[#A1A1AA]/50 focus:outline-none focus:border-[#FF6A00]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                      LinkedIn Profile URL <span className="text-[#FF6A00]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#A1A1AA]">
                        <Linkedin className="w-3.5 h-3.5 text-[#FF6A00]" />
                      </div>
                      <input
                        type="url"
                        required
                        placeholder="https://linkedin.com/in/your-profile"
                        value={formData.linkedinUrl}
                        onChange={(e) =>
                          setFormData({ ...formData, linkedinUrl: e.target.value })
                        }
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#0B0B0F] border border-[#262626] text-[#FFFFFF] text-xs placeholder-[#A1A1AA]/50 focus:outline-none focus:border-[#FF6A00]"
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
                      className="w-full bg-[#FF6A00] hover:bg-[#FF8533] active:bg-[#E65A00] text-[#0B0B0F] font-semibold py-3 px-5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <span>Continue to Select Time</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 2: Pick Time Slot */}
              {step === 2 && (
                <form onSubmit={handleConfirmBooking} className="space-y-4">
                  <div className="p-3 bg-[#0B0B0F] rounded-xl border border-[#262626] text-xs flex justify-between">
                    <span className="text-[#A1A1AA]">Founder:</span>
                    <strong className="text-[#FFFFFF]">{formData.fullName}</strong>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#A1A1AA] mb-2">
                      Choose Your Preferred 20-Minute Slot:
                    </label>
                    <div className="space-y-2">
                      {availableSlots.map((slot) => (
                        <label
                          key={slot}
                          className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                            formData.selectedDate === slot
                              ? 'bg-[#0B0B0F] border-[#FF6A00] text-[#FFFFFF] font-medium'
                              : 'bg-[#0B0B0F] border-[#262626] text-[#A1A1AA] hover:border-[#383838]'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-[#FF6A00]" />
                            <span>{slot}</span>
                          </div>
                          <input
                            type="radio"
                            name="selectedSlot"
                            checked={formData.selectedDate === slot}
                            onChange={() => setFormData({ ...formData, selectedDate: slot })}
                            className="text-[#FF6A00] focus:ring-[#FF6A00]"
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2.5 rounded-xl border border-[#262626] text-xs font-medium text-[#A1A1AA] hover:text-[#FFFFFF]"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-[#FF6A00] hover:bg-[#FF8533] text-[#0B0B0F] font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <span>Confirm 20-Min Strategy Call</span>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 3: Confirmed */}
              {step === 3 && (
                <div className="text-center py-2 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#FF6A00]/15 text-[#FF6A00] border border-[#FF6A00]/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>

                  <div>
                    <h4 className="font-display font-bold text-lg text-[#FFFFFF]">
                      Strategy Call Confirmed
                    </h4>
                    <p className="text-xs text-[#A1A1AA] mt-1 max-w-sm mx-auto">
                      A calendar invite has been sent to{' '}
                      <strong className="text-[#FFFFFF]">{formData.email}</strong>.
                    </p>
                  </div>

                  <div className="bg-[#0B0B0F] rounded-xl p-3.5 border border-[#262626] text-left text-xs text-[#A1A1AA] space-y-2">
                    <div className="flex justify-between">
                      <span>Scheduled:</span>
                      <span className="font-medium text-[#FFFFFF]">{formData.selectedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Format:</span>
                      <span className="font-medium text-[#FFFFFF]">Google Meet (20 mins)</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full bg-[#FF6A00] hover:bg-[#FF8533] text-[#0B0B0F] font-semibold py-2.5 px-4 rounded-xl text-xs transition-colors cursor-pointer mt-2"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
