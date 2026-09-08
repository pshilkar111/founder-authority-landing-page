import React from 'react';
import { Linkedin, Mail } from 'lucide-react';

interface FooterProps {
  onOpenAudit: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-8 border-t border-slate-900 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand & Copyright */}
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-slate-900 text-white flex items-center justify-center font-bold text-xs border border-slate-800">
            <span className="text-white">F</span>
            <span className="text-orange-500">A</span>
          </div>
          <span className="text-white font-bold text-sm">Founder Authority</span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="text-slate-500">© 2026 Founder Authority</span>
        </div>

        {/* Minimal Navigation */}
        <div className="flex items-center gap-4 text-slate-400">
          <a href="#problem" className="hover:text-white transition-colors">
            Problem
          </a>
          <a href="#services" className="hover:text-white transition-colors">
            Services
          </a>
          <a href="#content-examples" className="hover:text-white transition-colors">
            Samples
          </a>
          <a href="#pricing" className="hover:text-white transition-colors">
            Pricing
          </a>
        </div>

        {/* Contact Links */}
        <div className="flex items-center gap-3 text-slate-400">
          <a
            href="mailto:hello@founderauthority.com"
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-slate-400" />
            <span>hello@founderauthority.com</span>
          </a>
          <span className="text-slate-700">•</span>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-3.5 h-3.5 text-blue-400" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
