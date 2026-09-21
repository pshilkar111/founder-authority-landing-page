/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
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

// Scroll to top upon route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

// 1. Public Home View Component
interface HomePageProps {
  onOpenAudit: (planName?: string) => void;
}

function HomePage({ onOpenAudit }: HomePageProps) {
  return (
    <div className="min-h-screen bg-[#0B0B0F] text-[#FFFFFF] font-sans selection:bg-[#FF6A00] selection:text-[#0B0B0F] relative">
      {/* 0. Minimal Sticky Header */}
      <Navbar onOpenAudit={(plan) => onOpenAudit(plan)} />

      <main id="main-content">
        {/* 1. Hero Section */}
        <HeroSection onOpenAudit={() => onOpenAudit()} />

        {/* 2. LinkedIn Authority Score Tool */}
        <AuthorityAuditSection onOpenBooking={() => onOpenAudit()} />

        {/* 3. Why Founder Authority */}
        <WhyFounderAuthoritySection onOpenAudit={() => onOpenAudit()} />

        {/* 4. How It Works (3 Steps Only) */}
        <HowItWorksSection onOpenAudit={() => onOpenAudit()} />

        {/* 4.5. Authority + Demand Generation */}
        <AuthorityDemandSection onOpenAudit={() => onOpenAudit()} />

        {/* 5. Pricing */}
        <PricingSection onOpenAudit={(plan) => onOpenAudit(plan)} />

        {/* 6. Final CTA */}
        <FinalCtaSection onOpenAudit={() => onOpenAudit()} />
      </main>

      {/* Minimal Linear / Clay Footer */}
      <Footer onOpenAudit={() => onOpenAudit()} />
    </div>
  );
}

// 2. Dedicated Admin Route Component
interface AdminRouteProps {
  authUser: User | null;
  isAuthAdmin: boolean;
  isAuthChecking: boolean;
}

function AdminRoute({ authUser, isAuthAdmin, isAuthChecking }: AdminRouteProps) {
  const navigate = useNavigate();

  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-[#0B0B0F] flex flex-col items-center justify-center p-6 text-[#FFFFFF]">
        <Loader2 className="w-8 h-8 text-[#FF6A00] animate-spin mb-3" />
        <p className="text-xs sm:text-sm text-[#A1A1AA]">Verifying credentials...</p>
      </div>
    );
  }

  // IF authenticated AND email is in admin whitelist: Show Admin Dashboard
  if (authUser && isAuthAdmin) {
    return (
      <AdminDashboardPage
        onNavigateHome={() => navigate('/')}
        onSignOut={() => {
          // Firebase sign-out triggers auth state change; AdminLoginPage will display
        }}
      />
    );
  }

  // ELSE: Show dedicated Admin Login Page (only at /admin)
  return (
    <AdminLoginPage
      onAuthSuccess={() => {
        // Handled automatically via auth state listener
      }}
      onNavigateHome={() => navigate('/')}
    />
  );
}

// 3. Thank You Route Component
interface ThankYouRouteProps {
  currentBooking: StrategyCallBookingRecord | null;
}

function ThankYouRoute({ currentBooking }: ThankYouRouteProps) {
  const navigate = useNavigate();

  return (
    <ThankYouPage
      bookingData={currentBooking}
      onNavigateHome={() => navigate('/')}
    />
  );
}

// 4. Main App Component with React Router
export default function App() {
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

  // Restore last booking from sessionStorage if available
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('last_booking');
      if (stored) {
        setCurrentBooking(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Could not read cached booking from session storage:', e);
    }
  }, []);

  const handleOpenAudit = (planName?: string) => {
    setSelectedPlanForAudit(planName);
    setIsAuditModalOpen(true);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes
        authUser={authUser}
        isAuthAdmin={isAuthAdmin}
        isAuthChecking={isAuthChecking}
        currentBooking={currentBooking}
        setCurrentBooking={setCurrentBooking}
        isAuditModalOpen={isAuditModalOpen}
        setIsAuditModalOpen={setIsAuditModalOpen}
        selectedPlanForAudit={selectedPlanForAudit}
        handleOpenAudit={handleOpenAudit}
      />
    </BrowserRouter>
  );
}

interface AppRoutesProps {
  authUser: User | null;
  isAuthAdmin: boolean;
  isAuthChecking: boolean;
  currentBooking: StrategyCallBookingRecord | null;
  setCurrentBooking: (booking: StrategyCallBookingRecord | null) => void;
  isAuditModalOpen: boolean;
  setIsAuditModalOpen: (open: boolean) => void;
  selectedPlanForAudit: string | undefined;
  handleOpenAudit: (planName?: string) => void;
}

function AppRoutes({
  authUser,
  isAuthAdmin,
  isAuthChecking,
  currentBooking,
  setCurrentBooking,
  isAuditModalOpen,
  setIsAuditModalOpen,
  selectedPlanForAudit,
  handleOpenAudit,
}: AppRoutesProps) {
  const navigate = useNavigate();

  const handleBookingSuccess = (booking: StrategyCallBookingRecord) => {
    setCurrentBooking(booking);
    setIsAuditModalOpen(false);
    navigate('/thank-you');
  };

  return (
    <>
      <Routes>
        {/* 1. Public Marketing Homepage */}
        <Route path="/" element={<HomePage onOpenAudit={handleOpenAudit} />} />

        {/* 2. Dedicated /admin Route */}
        <Route
          path="/admin"
          element={
            <AdminRoute
              authUser={authUser}
              isAuthAdmin={isAuthAdmin}
              isAuthChecking={isAuthChecking}
            />
          }
        />

        {/* 3. Dedicated /thank-you Route */}
        <Route
          path="/thank-you"
          element={<ThankYouRoute currentBooking={currentBooking} />}
        />

        {/* Alias routes */}
        <Route path="/thankyou" element={<Navigate to="/thank-you" replace />} />

        {/* Fallback to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global Interactive Free LinkedIn Audit Booking Modal */}
      <AuditBookingModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        initialPlan={selectedPlanForAudit}
        onBookingSuccess={handleBookingSuccess}
      />
    </>
  );
}
