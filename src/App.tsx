/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AuthorityAuditSection } from './components/AuthorityAuditSection';
import { WhyFounderAuthoritySection } from './components/WhyFounderAuthoritySection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { AuthorityDemandSection } from './components/AuthorityDemandSection';
import { PricingSection } from './components/PricingSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { AuditBookingModal } from './components/AuditBookingModal';
import { AdminDashboardPage } from './components/AdminDashboardPage';
import { AdminLoginPage } from './components/AdminLoginPage';
import { ThankYouPage } from './components/ThankYouPage';
import { StrategyCallBookingRecord } from './types';
import { auth, checkIsAdminUser, onAuthStateChanged, User } from './lib/firebase';
import { Loader2 } from 'lucide-react';

type AppPage = 'home' | 'thank-you' | 'admin';

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [selectedPlanForAudit, setSelectedPlanForAudit] = useState<string | undefined>();
  const [currentBooking, setCurrentBooking] = useState<StrategyCallBookingRecord | null>(null);

  // Firebase Authentication State for Dedicated /admin Route Protection
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [isAuthAdmin, setIsAuthAdmin] = useState<boolean>(false);
  const [isAuthChecking, setIsAuthChecking] = useState<boolean>(true);

  // Monitor Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setAuthUser(user);
      if (user) {
        const isAdmin = await checkIsAdminUser(user);
        setIsAuthAdmin(isAdmin);
      } else {
        setIsAuthAdmin(false);
      }
      setIsAuthChecking(false);
    });

    return () => unsubscribe();
  }, []);

  // Determine active page from window location pathname, search params, or hash
  const determinePageFromLocation = (): AppPage => {
    if (typeof window === 'undefined') return 'home';

    const pathname = window.location.pathname.toLowerCase();
    const search = window.location.search.toLowerCase();
    const hash = window.location.hash.toLowerCase();

    if (
      pathname.includes('/thank-you') ||
      pathname.includes('/thankyou') ||
      search.includes('page=thank-you') ||
      search.includes('page=thankyou') ||
      hash.includes('#thank-you') ||
      hash.includes('#thankyou')
    ) {
      return 'thank-you';
    }

    if (
      pathname.includes('/admin') ||
      search.includes('page=admin') ||
      hash.includes('#admin')
    ) {
      return 'admin';
    }

    return 'home';
  };

  // Sync state with location on initial mount and browser back/forward
  useEffect(() => {
    setCurrentPage(determinePageFromLocation());

    // Restore last booking from sessionStorage if available
    try {
      const stored = sessionStorage.getItem('last_booking');
      if (stored) {
        setCurrentBooking(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Could not read cached booking from session storage:', e);
    }

    const handlePopState = () => {
      setCurrentPage(determinePageFromLocation());
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigateTo = (path: string, page: AppPage) => {
    try {
      window.history.pushState({}, '', path);
    } catch (e) {
      console.warn('Navigation state update failed:', e);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAudit = (planName?: string) => {
    setSelectedPlanForAudit(planName);
    setIsAuditModalOpen(true);
  };

  const handleBookingSuccess = (booking: StrategyCallBookingRecord) => {
    setCurrentBooking(booking);
    setIsAuditModalOpen(false);
    // Explicit user redirect to Thank You page
    navigateTo('/thank-you', 'thank-you');
  };

  // =========================================================================
  // 1. DEDICATED ADMIN ROUTE (/admin)
  // Public users cannot see any link to this. Accessible only via direct URL.
  // Behavior:
  // IF user navigates to /admin:
  //    Check Firebase Authentication.
  // IF authenticated AND email is in admin whitelist:
  //    Show Admin Dashboard.
  // ELSE:
  //    Show Admin Login Page (dedicated page only existing at /admin).
  // =========================================================================
  if (currentPage === 'admin') {
    if (isAuthChecking) {
      return (
        <div className="min-h-screen bg-[#0B0B0F] flex flex-col items-center justify-center p-6 text-[#FFFFFF]">
          <Loader2 className="w-8 h-8 text-[#FF6A00] animate-spin mb-3" />
          <p className="text-xs sm:text-sm text-[#A1A1AA]">Verifying credentials...</p>
        </div>
      );
    }

    // If authenticated AND verified admin: Show Admin Dashboard
    if (authUser && isAuthAdmin) {
      return (
        <AdminDashboardPage
          onNavigateHome={() => navigateTo('/', 'home')}
          onSignOut={() => {
            // State automatically switches to AdminLoginPage
          }}
        />
      );
    }

    // Otherwise: Show Admin Login Page strictly at /admin
    return (
      <AdminLoginPage
        onAuthSuccess={() => {
          // On successful authentication & admin check, state will re-render to Dashboard
        }}
        onNavigateHome={() => navigateTo('/', 'home')}
      />
    );
  }

  // =========================================================================
  // 2. THANK YOU PAGE ROUTE (/thank-you)
  // Rendered after booking a strategy call
  // =========================================================================
  if (currentPage === 'thank-you') {
    return (
      <ThankYouPage
        bookingData={currentBooking}
        onNavigateHome={() => navigateTo('/', 'home')}
      />
    );
  }

  // =========================================================================
  // 3. PUBLIC WEBSITE (HOME / LANDING)
  // Absolutely zero admin references, no admin modals, no admin banners,
  // no admin buttons. Appears strictly as a high-converting marketing website.
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#0B0B0F] text-[#FFFFFF] font-sans selection:bg-[#FF6A00] selection:text-[#0B0B0F] relative">
      {/* 0. Minimal Sticky Header */}
      <Navbar onOpenAudit={(plan) => handleOpenAudit(plan)} />

      <main id="main-content">
        {/* 1. Hero Section */}
        <HeroSection onOpenAudit={() => handleOpenAudit()} />

        {/* 2. LinkedIn Authority Score Tool */}
        <AuthorityAuditSection onOpenBooking={() => handleOpenAudit()} />

        {/* 3. Why Founder Authority */}
        <WhyFounderAuthoritySection onOpenAudit={() => handleOpenAudit()} />

        {/* 4. How It Works (3 Steps Only) */}
        <HowItWorksSection onOpenAudit={() => handleOpenAudit()} />

        {/* 4.5. Authority + Demand Generation */}
        <AuthorityDemandSection onOpenAudit={() => handleOpenAudit()} />

        {/* 5. Pricing */}
        <PricingSection onOpenAudit={(plan) => handleOpenAudit(plan)} />

        {/* 6. Final CTA */}
        <FinalCtaSection onOpenAudit={() => handleOpenAudit()} />
      </main>

      {/* Minimal Linear / Clay Footer */}
      <Footer onOpenAudit={() => handleOpenAudit()} />

      {/* Interactive Free LinkedIn Audit Booking Modal */}
      <AuditBookingModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        initialPlan={selectedPlanForAudit}
        onBookingSuccess={handleBookingSuccess}
      />
    </div>
  );
}
