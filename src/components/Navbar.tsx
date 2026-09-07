import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ShieldCheck, Linkedin, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenAudit: (planName?: string) => void;
  currency: 'INR' | 'USD';
  onToggleCurrency: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAudit,
  currency,
  onToggleCurrency,
}) => {
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
    { label: 'Services', href: '#services' },
    { label: 'Who We Help', href: '#who-we-help' },
    { label: 'Framework', href: '#process' },
    { label: 'Sample Posts', href: '#content-examples' },
    { label: 'Results', href: '#results' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            id="brand-logo"
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-950 text-white flex items-center justify-center font-bold text-lg tracking-wider border border-slate-800 shadow-sm group-hover:border-orange-500 transition-colors">
              <span className="text-white">F</span>
              <span className="text-orange-500">A</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-tight text-slate-950 flex items-center gap-1">
                Founder Authority
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block"></span>
              </span>
              <span className="text-[11px] font-medium text-slate-500 tracking-wide uppercase">
                LinkedIn Branding Agency
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-slate-950 transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions: Currency Toggle + Primary CTA */}
          <div className="hidden sm:flex items-center gap-3.5">
            <button
              type="button"
              id="currency-toggle-btn"
              onClick={onToggleCurrency}
              className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors flex items-center gap-1 shadow-2xs"
              title="Toggle Currency"
            >
              <span className="text-slate-400">Currency:</span>
              <span className={currency === 'INR' ? 'text-orange-600 font-bold' : 'text-slate-600'}>₹ INR</span>
              <span className="text-slate-300">/</span>
              <span className={currency === 'USD' ? 'text-orange-600 font-bold' : 'text-slate-600'}>$ USD</span>
            </button>

            <a
              href="#content-examples"
              className="text-sm font-semibold text-slate-700 hover:text-slate-950 transition-colors px-3 py-2"
            >
              View Samples
            </a>

            <button
              type="button"
              id="nav-book-audit-btn"
              onClick={() => onOpenAudit()}
              className="inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-900 text-white font-semibold text-sm px-4.5 py-2.5 rounded-xl shadow-sm hover:shadow transition-all group border border-slate-800"
            >
              <span>Book Free Audit</span>
              <ArrowRight className="w-4 h-4 text-orange-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => onOpenAudit()}
              className="sm:hidden text-xs font-semibold bg-slate-950 text-white px-3 py-2 rounded-lg"
            >
              Free Audit
            </button>
            <button
              type="button"
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-panel"
            className="lg:hidden mt-3 pt-3 pb-5 border-t border-slate-200 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border"
          >
            <div className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-slate-700 hover:text-orange-600 py-1.5 px-2 rounded-md hover:bg-slate-50 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onToggleCurrency}
                  className="text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700"
                >
                  Currency: {currency === 'INR' ? '₹ INR (Indian Rupees)' : '$ USD (US Dollars)'}
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAudit();
                }}
                className="w-full mt-3 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm shadow-md"
              >
                <span>Book Free LinkedIn Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
