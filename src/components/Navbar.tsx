import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  onOpenAudit: (planName?: string) => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAudit, onOpenAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'LinkedIn Score', href: '#linkedin-score' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B0B0F]/90 backdrop-blur-md border-b border-[#262626] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            id="brand-logo"
            className="flex items-center group focus:outline-none"
          >
            <BrandLogo size="md" />
          </a>

          {/* Desktop Navigation Links */}
          <nav
            id="desktop-nav"
            className="hidden md:flex items-center gap-1 bg-[#14141A]/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#262626]"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-medium text-[#A1A1AA] hover:text-[#FFFFFF] transition-colors px-3 py-1 rounded-full"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#A1A1AA] hover:text-[#FFFFFF] hover:bg-[#14141A] border border-[#262626] transition-colors cursor-pointer"
                title="View captured leads"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#FF6A00]" />
                <span>Admin</span>
              </button>
            )}

            <button
              type="button"
              id="nav-book-audit-btn"
              onClick={() => onOpenAudit()}
              className="inline-flex items-center gap-1.5 bg-[#FF6A00] hover:bg-[#FF8533] active:bg-[#E65A00] text-[#0B0B0F] font-semibold text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer shadow-sm"
            >
              <span>Book Strategy Call</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => onOpenAudit()}
              className="text-xs font-semibold bg-[#FF6A00] hover:bg-[#FF8533] text-[#0B0B0F] px-3 py-1.5 rounded-lg"
            >
              Book Call
            </button>

            <button
              type="button"
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-[#A1A1AA] hover:text-[#FFFFFF] rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-panel"
            className="md:hidden mt-3 p-4 border border-[#262626] bg-[#14141A] rounded-2xl shadow-xl space-y-2"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs font-medium text-[#A1A1AA] hover:text-[#FFFFFF] py-2 px-2 rounded-lg"
              >
                {link.label}
              </a>
            ))}

            {onOpenAdmin && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full text-left text-xs font-medium text-[#A1A1AA] hover:text-[#FFFFFF] py-2 px-2 rounded-lg flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#FF6A00]" />
                <span>Admin Leads</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAudit();
              }}
              className="w-full mt-2 bg-[#FF6A00] hover:bg-[#FF8533] text-[#0B0B0F] font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 text-xs"
            >
              <span>Book Strategy Call</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
