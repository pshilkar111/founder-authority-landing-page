import React, { useEffect, useState } from 'react';
import {
  X,
  ExternalLink,
  RefreshCw,
  Search,
  Mail,
  ShieldCheck,
} from 'lucide-react';
import { collection, query, orderBy, getDocs, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { AuditLeadRecord } from '../types';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({ isOpen, onClose }) => {
  const [leads, setLeads] = useState<AuditLeadRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      if (!db) {
        setIsLoading(false);
        return;
      }
      const q = query(collection(db, 'linkedin_audit_leads'), orderBy('timestamp', 'desc'), limit(100));
      const snapshot = await getDocs(q);
      const items: AuditLeadRecord[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data() as any;
        items.push({
          id: doc.id,
          name: data.name || 'Anonymous Founder',
          email: data.email || '—',
          company: data.company || '—',
          linkedin_url: data.linkedin_url || data.profileUrl || '—',
          authority_score: data.authority_score || data.authorityScore || 7.4,
          timestamp: data.timestamp?.toDate ? data.timestamp.toDate().toLocaleString() : new Date().toLocaleString(),
        });
      });
      setLeads(items);
    } catch (err: any) {
      console.error('Error fetching leads:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchLeads();
    }
  }, [isOpen]);

  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.linkedin_url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0B0B0F]/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#14141A] rounded-2xl shadow-2xl border border-[#262626] overflow-hidden my-6 z-10 flex flex-col max-h-[85vh] text-[#FFFFFF]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#262626] flex items-center justify-between bg-[#0B0B0F]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#14141A] text-[#FF6A00] border border-[#262626] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-[#FFFFFF] flex items-center gap-2">
                Captured Founder Leads
                <span className="px-2 py-0.5 rounded-full bg-[#FF6A00]/15 text-[#FF6A00] text-[10px] font-semibold">
                  Live Firestore
                </span>
              </h3>
              <p className="text-xs text-[#A1A1AA]">
                Founders who requested their LinkedIn Authority Score report
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchLeads}
              disabled={isLoading}
              className="p-2 rounded-lg bg-[#14141A] border border-[#262626] text-[#A1A1AA] hover:text-[#FFFFFF] transition-colors cursor-pointer"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-[#FF6A00]' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#14141A] border border-[#262626] text-[#A1A1AA] hover:text-[#FFFFFF] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3 p-4 border-b border-[#262626] bg-[#0B0B0F]">
          <div className="p-3 rounded-xl bg-[#14141A] border border-[#262626]">
            <div className="text-[11px] text-[#A1A1AA]">Total Audits Requested</div>
            <div className="text-xl font-bold text-[#FFFFFF] font-display mt-0.5">{leads.length}</div>
          </div>
          <div className="p-3 rounded-xl bg-[#14141A] border border-[#262626]">
            <div className="text-[11px] text-[#A1A1AA]">Identified Leads</div>
            <div className="text-xl font-bold text-[#FF6A00] font-display mt-0.5">
              {leads.filter((l) => l.email && l.email !== '—').length}
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-[#262626] bg-[#14141A]">
          <div className="relative">
            <Search className="w-4 h-4 text-[#A1A1AA] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search leads by name, email, company, or LinkedIn URL..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#0B0B0F] border border-[#262626] rounded-xl text-xs text-[#FFFFFF] placeholder-[#A1A1AA]/50 focus:outline-none focus:border-[#FF6A00]"
            />
          </div>
        </div>

        {/* List of Leads */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {isLoading ? (
            <div className="py-16 text-center text-xs text-[#A1A1AA] flex flex-col items-center justify-center gap-2">
              <RefreshCw className="w-5 h-5 animate-spin text-[#FF6A00]" />
              <span>Loading records...</span>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="py-16 text-center text-xs text-[#A1A1AA]">
              No audit records found yet.
            </div>
          ) : (
            filteredLeads.map((lead) => (
              <div
                key={lead.id}
                className="p-3.5 rounded-xl bg-[#0B0B0F] border border-[#262626] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#FFFFFF]">{lead.name}</span>
                    <span className="text-[#A1A1AA] text-[11px]">({lead.company || 'Founder'})</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#A1A1AA] text-[11px]">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-[#A1A1AA]" />
                      {lead.email}
                    </span>
                    <a
                      href={lead.linkedin_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#FF6A00] hover:underline flex items-center gap-1 truncate max-w-[200px]"
                    >
                      {lead.linkedin_url}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-semibold text-[#FF6A00]">{lead.authority_score} / 10</span>
                  <span className="text-[11px] text-[#A1A1AA]/70">{lead.timestamp}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
