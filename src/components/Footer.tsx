import React from 'react';
import { Mail, Linkedin, ArrowUpRight, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenAudit: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAudit }) => {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-base border border-slate-800">
                <span>F</span>
                <span className="text-orange-500">A</span>
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight flex items-center gap-1">
                Founder Authority
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block"></span>
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              The premier LinkedIn personal branding and thought leadership agency
              for venture-backed founders, D2C CEOs, and high-ticket advisors.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                aria-label="Founder Authority on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:hello@founderauthority.com"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                aria-label="Email Founder Authority"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <a href="#services" className="hover:text-orange-400 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-orange-400 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#who-we-help" className="hover:text-orange-400 transition-colors">
                  Who We Help
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-orange-400 transition-colors">
                  Our Process
                </a>
              </li>
              <li>
                <a href="#content-examples" className="hover:text-orange-400 transition-colors">
                  Sample Content
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-orange-400 transition-colors">
                  About & FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Agency Info */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-4">
              Direct Contact
            </h4>
            <div className="space-y-3 text-sm text-slate-300">
              <div>
                <span className="text-xs text-slate-500 block">Email:</span>
                <a
                  href="mailto:hello@founderauthority.com"
                  className="font-medium text-white hover:text-orange-400 transition-colors"
                >
                  hello@founderauthority.com
                </a>
              </div>

              <div>
                <span className="text-xs text-slate-500 block">LinkedIn:</span>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-white hover:text-orange-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>Founder Authority</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOpenAudit}
                  className="text-xs font-bold text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1"
                >
                  <span>Request Profile Audit →</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Founder Authority. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Client Confidentiality Agreement</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
