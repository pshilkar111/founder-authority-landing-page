/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { ServicesSection } from './components/ServicesSection';
import { ContentExamplesSection } from './components/ContentExamplesSection';
import { PricingSection } from './components/PricingSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { AuditBookingModal } from './components/AuditBookingModal';

export default function App() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [selectedPlanForAudit, setSelectedPlanForAudit] = useState<string | undefined>();
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  const handleOpenAudit = (planName?: string) => {
    setSelectedPlanForAudit(planName);
    setIsAuditModalOpen(true);
  };

  const handleToggleCurrency = () => {
    setCurrency((prev) => (prev === 'INR' ? 'USD' : 'INR'));
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-orange-500 selection:text-white relative">
      {/* 0. Minimal Sticky Header */}
      <Navbar
        onOpenAudit={(plan) => handleOpenAudit(plan)}
        currency={currency}
        onToggleCurrency={handleToggleCurrency}
      />

      <main id="main-content">
        {/* 1. Hero Section */}
        <HeroSection onOpenAudit={() => handleOpenAudit()} />

        {/* 2. Problem Section */}
        <ProblemSection onOpenAudit={() => handleOpenAudit()} />

        {/* 3. Services Section */}
        <ServicesSection onOpenAudit={() => handleOpenAudit()} />

        {/* 4. Sample Content Section */}
        <ContentExamplesSection onOpenAudit={() => handleOpenAudit()} />

        {/* 5. Pricing Section */}
        <PricingSection
          onOpenAudit={(plan) => handleOpenAudit(plan)}
          currency={currency}
          onToggleCurrency={handleToggleCurrency}
        />

        {/* 6. Final CTA */}
        <FinalCtaSection onOpenAudit={() => handleOpenAudit()} />
      </main>

      {/* Minimal Footer */}
      <Footer onOpenAudit={() => handleOpenAudit()} />

      {/* Interactive Free LinkedIn Audit Booking Modal */}
      <AuditBookingModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        initialPlan={selectedPlanForAudit}
      />
    </div>
  );
}
