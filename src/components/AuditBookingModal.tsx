import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Linkedin,
} from 'lucide-react';

interface AuditBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: string;
  initialAudience?: string;
}

export const AuditBookingModal: React.FC<AuditBookingModalProps> = ({
  isOpen,
  onClose,
  initialPlan,
  initialAudience,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    linkedinUrl: '',
    founderRole: 'Founder / CEO',
    companyName: '',
    audienceType: initialAudience || 'Startup Founders',
    primaryGoal: 'Inbound Business Deals & Leads',
    selectedPlan: initialPlan || 'Growth Plan (₹40,000/mo)',
    selectedDate: 'Tomorrow, 3:00 PM IST',
  });

  React.useEffect(() => {
    if (initialPlan) {
      setFormData((prev) => ({ ...prev, selectedPlan: initialPlan }));
    }
  }, [initialPlan]);

  if (!isOpen) return null;

  const handleSubmitStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.linkedinUrl) {
      return;
    }
    setStep(2);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const availableSlots = [
    'Tomorrow, 11:00 AM IST (15 mins)',
    'Tomorrow, 3:00 PM IST (15 mins)',
    'Thursday, 12:30 PM IST (15 mins)',
    'Thursday, 4:30 PM IST (15 mins)',
    'Friday, 2:00 PM IST (15 mins)',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-xs">
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header Bar */}
        <div className="bg-slate-950 text-white p-6 sm:p-7 flex items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-orange-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Executive Profile Audit</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {step === 3 ? 'Audit Scheduled!' : 'Book Your Free LinkedIn Audit'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {step === 1 && 'Step 1 of 2: Tell us about your profile and company'}
              {step === 2 && 'Step 2 of 2: Pick your preferred 15-minute discovery slot'}
              {step === 3 && 'Your confidential 7-point audit is being prepared'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {/* STEP 1: Founder Information */}
          {step === 1 && (
            <form onSubmit={handleSubmitStep1} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikramaditya Singhania"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Work Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="vikram@yourcompany.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Role / Title
                  </label>
                  <select
                    value={formData.founderRole}
                    onChange={(e) =>
                      setFormData({ ...formData, founderRole: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all bg-white"
                  >
                    <option value="Founder / CEO">Founder / CEO</option>
                    <option value="Co-founder & CTO">Co-founder & CTO / CPO</option>
                    <option value="D2C Brand Owner">D2C Brand Owner</option>
                    <option value="Marketing Leader (CMO / VP)">Marketing Leader (CMO / VP)</option>
                    <option value="Consultant / Advisor">Consultant / Advisor</option>
                    <option value="Real Estate Executive">Real Estate Executive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  LinkedIn Profile URL <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Linkedin className="w-4 h-4 text-blue-600" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="https://linkedin.com/in/yourname"
                    value={formData.linkedinUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, linkedinUrl: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
                  />
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Our strategists manually review this profile before your discovery call.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Company / Brand Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Apex Health D2C"
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Primary Goal
                  </label>
                  <select
                    value={formData.primaryGoal}
                    onChange={(e) =>
                      setFormData({ ...formData, primaryGoal: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all bg-white"
                  >
                    <option value="Inbound Business Deals & Leads">Inbound Business Deals & Leads</option>
                    <option value="Fundraising & Investor Credibility">Fundraising & Investor Credibility</option>
                    <option value="Recruiting Top Talent & Engineers">Recruiting Top Talent & Engineers</option>
                    <option value="Speaking & Category Authority">Speaking & Category Authority</option>
                  </select>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 text-sm shadow-md shadow-orange-600/20 transition-all"
                >
                  <span>Continue to Slot Selection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Confidential. We never disclose client inquiries.</span>
              </div>
            </form>
          )}

          {/* STEP 2: Slot Selection */}
          {step === 2 && (
            <form onSubmit={handleConfirmBooking} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select a 15-Minute Audit Discovery Slot:
                </label>
                <div className="space-y-2">
                  {availableSlots.map((slot) => (
                    <label
                      key={slot}
                      className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                        formData.selectedDate === slot
                          ? 'border-orange-500 bg-orange-50/50 ring-1 ring-orange-500'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-slate-500" />
                        <span className="text-xs sm:text-sm font-semibold text-slate-900">
                          {slot}
                        </span>
                      </div>
                      <input
                        type="radio"
                        name="auditSlot"
                        checked={formData.selectedDate === slot}
                        onChange={() =>
                          setFormData({ ...formData, selectedDate: slot })
                        }
                        className="text-orange-600 focus:ring-orange-500"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Plan of Interest (Optional):
                </label>
                <select
                  value={formData.selectedPlan}
                  onChange={(e) =>
                    setFormData({ ...formData, selectedPlan: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm bg-white"
                >
                  <option value="Starter Plan (₹25,000/mo)">Starter Plan (₹25,000/mo)</option>
                  <option value="Growth Plan (₹40,000/mo) - Most Popular">
                    Growth Plan (₹40,000/mo) - Most Popular
                  </option>
                  <option value="Just exploring free profile audit">
                    Just exploring free profile audit
                  </option>
                </select>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3 px-4 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-2/3 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 text-sm shadow-md transition-all"
                >
                  <span>Confirm Free Audit</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Success Confirmation */}
          {step === 3 && (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-xl font-black text-slate-950">
                  Audit Call Confirmed!
                </h4>
                <p className="text-sm text-slate-600 mt-1 max-w-sm mx-auto">
                  A calendar invitation and prep email have been dispatched to{' '}
                  <strong className="text-slate-900">{formData.email}</strong>.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left text-xs text-slate-700 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Scheduled Time:</span>
                  <span className="font-bold text-slate-900">{formData.selectedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Profile Analyzed:</span>
                  <span className="font-bold text-slate-900 line-clamp-1 max-w-[240px]">
                    {formData.linkedinUrl}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Lead Strategist:</span>
                  <span className="font-bold text-orange-600">Senior Executive Ghostwriter</span>
                </div>
              </div>

              <div className="p-3.5 bg-orange-50 rounded-xl border border-orange-200/60 text-xs text-orange-950 text-left">
                <strong>Next Step:</strong> Our team is performing your 7-point audit
                right now. You will receive an initial positioning summary prior to the
                discovery call.
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full bg-slate-950 hover:bg-slate-900 text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors"
              >
                Return to Site
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
