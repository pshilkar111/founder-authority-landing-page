/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AuthorityAuditSection } from './components/AuthorityAuditSection';
import { WhyFounderAuthoritySection } from './components/WhyFounderAuthoritySection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { PricingSection } from './components/PricingSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { AuditBookingModal } from './components/AuditBookingModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';

export default function App() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [selectedPlanForAudit, setSelectedPlanForAudit] = useState<string | undefined>();

  const handleOpenAudit = (planName?: string) => {
    setSelectedPlanForAudit(planName);
    setIsAuditModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-[#FFFFFF] font-sans selection:bg-[#FF6A00] selection:text-[#0B0B0F] relative">
      {/* 0. Minimal Sticky Header */}
      <Navbar
        onOpenAudit={(plan) => handleOpenAudit(plan)}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
      />

      <main id="main-content">
        {/* 1. Hero Section */}
        <HeroSection onOpenAudit={() => handleOpenAudit()} />

        {/* 2. LinkedIn Authority Score Tool */}
        <AuthorityAuditSection onOpenBooking={() => handleOpenAudit()} />

        {/* 3. Why Founder Authority */}
        <WhyFounderAuthoritySection onOpenAudit={() => handleOpenAudit()} />

        {/* 4. How It Works (3 Steps Only) */}
        <HowItWorksSection onOpenAudit={() => handleOpenAudit()} />

        {/* 5. Pricing */}
        <PricingSection onOpenAudit={(plan) => handleOpenAudit(plan)} />

        {/* 6. Final CTA */}
        <FinalCtaSection onOpenAudit={() => handleOpenAudit()} />
      </main>

      {/* Minimal Linear / Clay Footer */}
      <Footer
        onOpenAudit={() => handleOpenAudit()}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
      />

      {/* Interactive Free LinkedIn Audit Booking Modal */}
      <AuditBookingModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        initialPlan={selectedPlanForAudit}
      />

      {/* Admin Dashboard for Viewing Captured Leads & Metrics */}
      <AdminDashboardModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </div>
  );
}
