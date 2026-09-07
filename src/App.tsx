/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustSection } from './components/TrustSection';
import { ProblemSection } from './components/ProblemSection';
import { ServicesSection } from './components/ServicesSection';
import { WhoWeHelpSection } from './components/WhoWeHelpSection';
import { ProcessSection } from './components/ProcessSection';
import { ContentExamplesSection } from './components/ContentExamplesSection';
import { ResultsSection } from './components/ResultsSection';
import { PricingSection } from './components/PricingSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { AuditBookingModal } from './components/AuditBookingModal';

export default function App() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [selectedPlanForAudit, setSelectedPlanForAudit] = useState<string | undefined>();
  const [selectedAudienceForAudit, setSelectedAudienceForAudit] = useState<string | undefined>();
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  const handleOpenAudit = (planName?: string, audience?: string) => {
    setSelectedPlanForAudit(planName);
    setSelectedAudienceForAudit(audience);
    setIsAuditModalOpen(true);
  };

  const handleToggleCurrency = () => {
    setCurrency((prev) => (prev === 'INR' ? 'USD' : 'INR'));
  };

  return (
    <div className="min-h-screen bg-[#FAFBFD] text-slate-900 font-sans selection:bg-orange-500 selection:text-white relative">
      {/* Navigation Bar */}
      <Navbar
        onOpenAudit={(plan) => handleOpenAudit(plan)}
        currency={currency}
        onToggleCurrency={handleToggleCurrency}
      />

      {/* Main Landing Sections */}
      <main id="main-content">
        {/* 1. Hero Section with Interactive Console Preview */}
        <HeroSection onOpenAudit={() => handleOpenAudit()} />

        {/* 2. Trust Section (Metrics & Ecosystem Logos) */}
        <TrustSection onOpenAudit={() => handleOpenAudit()} />

        {/* 3. Problem Section (4 Founder Dilemma Cards) */}
        <ProblemSection onOpenAudit={() => handleOpenAudit()} />

        {/* 4. Services Section (6 Full-Suite Offerings) */}
        <ServicesSection onOpenAudit={() => handleOpenAudit()} />

        {/* 5. Who We Help Section (5 Audience Categories) */}
        <WhoWeHelpSection
          onOpenAudit={(audience) => handleOpenAudit(undefined, audience)}
        />

        {/* 6. Process Section (Proven 5-Step Authority Framework Timeline) */}
        <ProcessSection onOpenAudit={() => handleOpenAudit()} />

        {/* 7. Content Examples Section (3 Hyper-Realistic LinkedIn Post Mockups) */}
        <ContentExamplesSection onOpenAudit={() => handleOpenAudit()} />

        {/* 8. Results Section (6 Concrete Authority Outcomes) */}
        <ResultsSection onOpenAudit={() => handleOpenAudit()} />

        {/* 9. Pricing Section (Starter, Growth [Most Popular], Authority) */}
        <PricingSection
          onOpenAudit={(plan) => handleOpenAudit(plan)}
          currency={currency}
          onToggleCurrency={handleToggleCurrency}
        />

        {/* 10. Testimonials Section (3 Verified Founder Stories) */}
        <TestimonialsSection onOpenAudit={() => handleOpenAudit()} />

        {/* 11. FAQ Section (Key Founder Inquiries Accordion) */}
        <FaqSection onOpenAudit={() => handleOpenAudit()} />

        {/* 12. Final CTA Section */}
        <FinalCtaSection onOpenAudit={() => handleOpenAudit()} />
      </main>

      {/* Footer */}
      <Footer onOpenAudit={() => handleOpenAudit()} />

      {/* Interactive Free LinkedIn Audit Booking Modal */}
      <AuditBookingModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        initialPlan={selectedPlanForAudit}
        initialAudience={selectedAudienceForAudit}
      />
    </div>
  );
}
