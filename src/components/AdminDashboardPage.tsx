import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  RefreshCw,
  Search,
  ExternalLink,
  Mail,
  Building,
  User as UserIcon,
  Calendar,
  Clock,
  Linkedin,
  ShieldCheck,
  Database,
  Trash2,
  CheckCircle,
  Copy,
  Check,
  Layers,
  Sparkles,
  LogOut,
  Lock,
  Loader2,
} from 'lucide-react';
import { collection, query, orderBy, getDocs, limit, deleteDoc, doc } from 'firebase/firestore';
import {
  db,
  auth,
  checkIsAdminUser,
  signOut,
  onAuthStateChanged,
  User,
} from '../lib/firebase';
import { StrategyCallBookingRecord, AuditLeadRecord } from '../types';

interface AdminDashboardPageProps {
  onNavigateHome: () => void;
  onSignOut?: () => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  onNavigateHome,
  onSignOut,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [isSignOutLoading, setIsSignOutLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'bookings' | 'audits'>('bookings');
  const [bookings, setBookings] = useState<StrategyCallBookingRecord[]>([]);
  const [leads, setLeads] = useState<AuditLeadRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<StrategyCallBookingRecord | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // 1. Firebase Authentication Guard: Ensure only authenticated admin users can view the dashboard
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setIsAuthChecking(false);
        return;
      }

      // Check admin privileges
      const isAdmin = await checkIsAdminUser(user);
      if (!isAdmin) {
        setIsAuthChecking(false);
        return;
      }

      setCurrentUser(user);
      setIsAuthChecking(false);
      // Fetch Firestore data now that auth is confirmed
      fetchData();
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    setIsSignOutLoading(true);
    try {
      await signOut(auth);
      if (onSignOut) {
        onSignOut();
      }
    } catch (err) {
      console.error('Failed to sign out:', err);
    } finally {
      setIsSignOutLoading(false);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (!db) {
        setIsLoading(false);
        return;
      }

      // 1. Fetch Strategy Call Bookings
      try {
        let bookingDocs: any[] = [];
        try {
          const bookingsQuery = query(
            collection(db, 'strategy_call_bookings'),
            orderBy('createdAt', 'desc'),
            limit(100)
          );
          const bookingSnap = await getDocs(bookingsQuery);
          bookingDocs = bookingSnap.docs;
        } catch (orderErr) {
          console.warn('Fallback: Querying bookings without orderBy:', orderErr);
          const fallbackSnap = await getDocs(collection(db, 'strategy_call_bookings'));
          bookingDocs = fallbackSnap.docs;
        }

        const bookingItems: StrategyCallBookingRecord[] = bookingDocs.map((docSnap) => {
          const data = docSnap.data();

          // Robust extraction of Date selected & Time selected
          let dateSelected = data.dateSelected;
          let timeSelected = data.timeSelected;

          if (!dateSelected && data.selectedDate) {
            // Parse legacy selectedDate e.g. "Tomorrow, 3:00 PM IST (20 mins)"
            const parts = data.selectedDate.split(',');
            if (parts.length > 1) {
              dateSelected = parts[0].trim();
              timeSelected = parts.slice(1).join(',').trim();
            } else {
              dateSelected = data.selectedDate;
              timeSelected = 'Standard Slot (20 mins)';
            }
          }

          return {
            id: docSnap.id,
            name: data.name || data.fullName || 'Anonymous Founder',
            fullName: data.fullName || data.name || 'Anonymous Founder',
            email: data.email || '—',
            company: data.company || data.companyName || '—',
            companyName: data.companyName || data.company || '—',
            linkedinUrl: data.linkedinUrl || data.linkedin_url || '',
            dateSelected: dateSelected || 'Upcoming Slot',
            timeSelected: timeSelected || '20 min call',
            selectedDate: data.selectedDate || `${dateSelected || 'Slot'} at ${timeSelected || ''}`,
            primaryGoal: data.primaryGoal || 'Pipeline Growth',
            selectedPlan: data.selectedPlan || 'Growth Plan',
            status: data.status || 'confirmed',
            emailSent: !!data.emailSent,
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt || data.timestamp || new Date().toISOString(),
          };
        });

        // Sort descending by date if not already sorted
        bookingItems.sort((a, b) => {
          const timeA = new Date(a.createdAt || 0).getTime();
          const timeB = new Date(b.createdAt || 0).getTime();
          return timeB - timeA;
        });

        setBookings(bookingItems);
      } catch (bErr) {
        console.error('Failed to load bookings from Firestore:', bErr);
      }

      // 2. Fetch LinkedIn Audit Leads
      try {
        const leadsSnap = await getDocs(
          query(collection(db, 'linkedin_audit_leads'), limit(100))
        );
        const leadItems: AuditLeadRecord[] = leadsSnap.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            name: data.name || 'Founder',
            email: data.email || '—',
            company: data.company || '—',
            linkedin_url: data.linkedin_url || data.profileUrl || '',
            authority_score: data.authority_score || 7.5,
            timestamp: data.timestamp?.toDate ? data.timestamp.toDate().toLocaleString() : data.timestamp || new Date().toLocaleString(),
          };
        });
        setLeads(leadItems);
      } catch (lErr) {
        console.error('Failed to load audit leads from Firestore:', lErr);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteBooking = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to remove this booking request from Firestore?')) {
      return;
    }
    setIsDeleting(id);
    try {
      if (db) {
        await deleteDoc(doc(db, 'strategy_call_bookings', id));
        setBookings((prev) => prev.filter((b) => b.id !== id));
        if (selectedBooking?.id === id) {
          setSelectedBooking(null);
        }
      }
    } catch (err) {
      console.error('Error deleting booking:', err);
      alert('Could not delete document. Please verify Firestore permissions.');
    } finally {
      setIsDeleting(null);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter bookings based on user search query across all 6 core fields
  const filteredBookings = bookings.filter((b) => {
    const term = searchTerm.toLowerCase();
    return (
      (b.name || '').toLowerCase().includes(term) ||
      (b.email || '').toLowerCase().includes(term) ||
      (b.company || '').toLowerCase().includes(term) ||
      (b.linkedinUrl || '').toLowerCase().includes(term) ||
      (b.dateSelected || '').toLowerCase().includes(term) ||
      (b.timeSelected || '').toLowerCase().includes(term)
    );
  });

  const filteredLeads = leads.filter((l) => {
    const term = searchTerm.toLowerCase();
    return (
      (l.name || '').toLowerCase().includes(term) ||
      (l.email || '').toLowerCase().includes(term) ||
      (l.company || '').toLowerCase().includes(term) ||
      (l.linkedin_url || '').toLowerCase().includes(term)
    );
  });

  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-[#0B0B0F] flex flex-col items-center justify-center p-6 text-[#FFFFFF]">
        <div className="w-14 h-14 rounded-2xl bg-[#FF6A00]/15 text-[#FF6A00] border border-[#FF6A00]/30 flex items-center justify-center mb-4 animate-pulse">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <h2 className="text-lg font-extrabold text-[#FFFFFF]">Verifying Administrator Authentication</h2>
        <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1 text-center max-w-sm">
          Checking Firebase Authentication privileges and zero-trust security rules...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-[#FFFFFF] font-sans selection:bg-[#FF6A00] selection:text-[#0B0B0F] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-[#262626] mb-8">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <button
                onClick={() => onNavigateHome()}
                id="admin-back-btn"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#A1A1AA] hover:text-[#FFFFFF] transition-colors py-1 px-2.5 rounded-lg bg-[#14141A] border border-[#262626] cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Website
              </button>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FF6A00]/10 border border-[#FF6A00]/30 text-[#FF6A00] text-xs font-semibold">
                <Database className="w-3 h-3" />
                <span>Firestore Live</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Firebase Auth Verified</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#FFFFFF]">
              Admin Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1">
              Live strategy call bookings and audit leads saved exclusively to Firebase Firestore.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Authenticated Admin Badge */}
            {currentUser && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#14141A] border border-[#262626] text-xs text-[#A1A1AA]">
                <div className="w-6 h-6 rounded-full bg-[#FF6A00]/20 text-[#FF6A00] flex items-center justify-center font-bold text-xs">
                  {currentUser.email?.charAt(0).toUpperCase() || 'A'}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="font-semibold text-[#FFFFFF] leading-tight truncate max-w-[160px]">
                    {currentUser.email}
                  </div>
                  <div className="text-[10px] text-[#FF6A00]">Authorized Admin</div>
                </div>
              </div>
            )}

            <button
              onClick={fetchData}
              disabled={isLoading}
              id="admin-refresh-btn"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#14141A] hover:bg-[#1F1F27] text-xs sm:text-sm font-semibold text-[#FFFFFF] border border-[#262626] transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#FF6A00]' : ''}`} />
              <span>{isLoading ? 'Syncing...' : 'Refresh'}</span>
            </button>

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              disabled={isSignOutLoading}
              id="admin-signout-btn"
              title="Sign out of Admin Dashboard"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-950/30 hover:bg-red-900/40 text-xs sm:text-sm font-semibold text-red-300 border border-red-800/40 hover:border-red-700/60 transition-colors cursor-pointer disabled:opacity-50"
            >
              {isSignOutLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-red-400" />
              ) : (
                <LogOut className="w-3.5 h-3.5 text-red-400" />
              )}
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Controls & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center bg-[#14141A] p-1 rounded-xl border border-[#262626] self-start">
            <button
              onClick={() => setActiveTab('bookings')}
              id="admin-tab-bookings"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === 'bookings'
                  ? 'bg-[#FF6A00] text-[#0B0B0F]'
                  : 'text-[#A1A1AA] hover:text-[#FFFFFF]'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Strategy Call Bookings ({bookings.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('audits')}
              id="admin-tab-audits"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === 'audits'
                  ? 'bg-[#FF6A00] text-[#0B0B0F]'
                  : 'text-[#A1A1AA] hover:text-[#FFFFFF]'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Audit Leads ({leads.length})</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#71717A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name, email, company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#14141A] border border-[#262626] text-xs sm:text-sm text-[#FFFFFF] placeholder-[#71717A] focus:outline-none focus:border-[#FF6A00] transition-colors"
            />
          </div>
        </div>

        {/* Content Area */}
        {activeTab === 'bookings' ? (
          <div>
            {/* Table Header Summary */}
            <div className="bg-[#14141A] border border-[#262626] rounded-2xl overflow-hidden shadow-xl">
              <div className="p-4 sm:p-5 border-b border-[#262626] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-sm font-bold text-[#FFFFFF] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#FF6A00]" />
                    Strategy Call Booking Requests
                  </h2>
                  <p className="text-xs text-[#71717A] mt-0.5">
                    Showing all founder booking submissions stored in Firestore.
                  </p>
                </div>
                <div className="text-xs text-[#A1A1AA] font-mono">
                  {filteredBookings.length} {filteredBookings.length === 1 ? 'entry' : 'entries'} found
                </div>
              </div>

              {isLoading ? (
                <div className="py-20 text-center">
                  <RefreshCw className="w-8 h-8 text-[#FF6A00] animate-spin mx-auto mb-3" />
                  <p className="text-sm text-[#A1A1AA]">Querying Firestore records...</p>
                </div>
              ) : filteredBookings.length === 0 ? (
                <div className="py-20 text-center px-4">
                  <Calendar className="w-10 h-10 text-[#71717A] mx-auto mb-3 opacity-60" />
                  <h3 className="text-base font-bold text-[#FFFFFF] mb-1">No Bookings Found</h3>
                  <p className="text-xs text-[#A1A1AA] max-w-sm mx-auto">
                    {searchTerm
                      ? `No booking records match "${searchTerm}". Try a different search term.`
                      : 'No strategy call bookings have been submitted yet. Bookings will appear here immediately once scheduled on the website.'}
                  </p>
                </div>
              ) : (
                <>
                  {/* Desktop Responsive Table */}
                  <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="bg-[#0B0B0F]/80 text-[#A1A1AA] text-xs uppercase tracking-wider border-b border-[#262626]">
                          <th className="py-3.5 px-4 font-bold">Name</th>
                          <th className="py-3.5 px-4 font-bold">Email</th>
                          <th className="py-3.5 px-4 font-bold">Company</th>
                          <th className="py-3.5 px-4 font-bold">LinkedIn URL</th>
                          <th className="py-3.5 px-4 font-bold">Date Selected</th>
                          <th className="py-3.5 px-4 font-bold">Time Selected</th>
                          <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#262626]">
                        {filteredBookings.map((b) => {
                          const name = b.name || b.fullName || '—';
                          const email = b.email || '—';
                          const company = b.company || b.companyName || '—';
                          const linkedin = b.linkedinUrl || '';
                          const date = b.dateSelected || '—';
                          const time = b.timeSelected || '—';

                          return (
                            <tr
                              key={b.id}
                              onClick={() => setSelectedBooking(b)}
                              className="hover:bg-[#1F1F27]/60 transition-colors cursor-pointer group"
                            >
                              {/* 1. Name */}
                              <td className="py-4 px-4 font-semibold text-[#FFFFFF] whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                  <div className="w-7 h-7 rounded-full bg-[#FF6A00]/15 text-[#FF6A00] flex items-center justify-center font-bold text-xs shrink-0">
                                    {name.charAt(0).toUpperCase()}
                                  </div>
                                  <span>{name}</span>
                                </div>
                              </td>

                              {/* 2. Email */}
                              <td className="py-4 px-4 text-[#A1A1AA] whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                  <span>{email}</span>
                                  {email !== '—' && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleCopy(email, `email-${b.id}`);
                                      }}
                                      title="Copy email"
                                      className="text-[#71717A] hover:text-[#FFFFFF] transition-colors p-1"
                                    >
                                      {copiedId === `email-${b.id}` ? (
                                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                                      ) : (
                                        <Copy className="w-3.5 h-3.5" />
                                      )}
                                    </button>
                                  )}
                                </div>
                              </td>

                              {/* 3. Company */}
                              <td className="py-4 px-4 font-medium text-[#FFFFFF] whitespace-nowrap">
                                <div className="flex items-center gap-1.5">
                                  <Building className="w-3.5 h-3.5 text-[#71717A]" />
                                  <span>{company}</span>
                                </div>
                              </td>

                              {/* 4. LinkedIn URL */}
                              <td className="py-4 px-4 whitespace-nowrap">
                                {linkedin ? (
                                  <a
                                    href={linkedin.startsWith('http') ? linkedin : `https://${linkedin}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#FF6A00] hover:underline"
                                  >
                                    <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                                    <span>Profile Link</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                ) : (
                                  <span className="text-[#71717A] italic text-xs">Not provided</span>
                                )}
                              </td>

                              {/* 5. Date Selected */}
                              <td className="py-4 px-4 whitespace-nowrap">
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0B0B0F] border border-[#262626] text-xs font-semibold text-[#FFFFFF]">
                                  <Calendar className="w-3.5 h-3.5 text-[#FF6A00]" />
                                  <span>{date}</span>
                                </div>
                              </td>

                              {/* 6. Time Selected */}
                              <td className="py-4 px-4 whitespace-nowrap">
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0B0B0F] border border-[#262626] text-xs font-semibold text-[#FFFFFF]">
                                  <Clock className="w-3.5 h-3.5 text-[#FF6A00]" />
                                  <span>{time}</span>
                                </div>
                              </td>

                              {/* Actions */}
                              <td className="py-4 px-4 text-right whitespace-nowrap">
                                <button
                                  onClick={(e) => handleDeleteBooking(b.id!, e)}
                                  disabled={isDeleting === b.id}
                                  title="Delete record from Firestore"
                                  className="text-[#71717A] hover:text-red-400 p-1.5 rounded-lg hover:bg-[#0B0B0F] transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile & Tablet Card Layout */}
                  <div className="lg:hidden divide-y divide-[#262626]">
                    {filteredBookings.map((b) => {
                      const name = b.name || b.fullName || '—';
                      const email = b.email || '—';
                      const company = b.company || b.companyName || '—';
                      const linkedin = b.linkedinUrl || '';
                      const date = b.dateSelected || '—';
                      const time = b.timeSelected || '—';

                      return (
                        <div
                          key={b.id}
                          onClick={() => setSelectedBooking(b)}
                          className="p-5 hover:bg-[#1F1F27]/50 transition-colors cursor-pointer space-y-3"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-9 h-9 rounded-full bg-[#FF6A00]/15 text-[#FF6A00] flex items-center justify-center font-bold text-sm">
                                {name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <h3 className="font-bold text-sm text-[#FFFFFF]">{name}</h3>
                                <p className="text-xs text-[#A1A1AA] flex items-center gap-1">
                                  <Building className="w-3 h-3 text-[#71717A]" />
                                  {company}
                                </p>
                              </div>
                            </div>

                            <button
                              onClick={(e) => handleDeleteBooking(b.id!, e)}
                              disabled={isDeleting === b.id}
                              className="text-[#71717A] hover:text-red-400 p-1 rounded-md"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* 6 Key Fields on Mobile */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-[#0B0B0F] p-3 rounded-xl border border-[#262626]">
                            <div>
                              <span className="text-[#71717A]">Email:</span>{' '}
                              <span className="font-medium text-[#FFFFFF]">{email}</span>
                            </div>

                            <div>
                              <span className="text-[#71717A]">LinkedIn:</span>{' '}
                              {linkedin ? (
                                <a
                                  href={linkedin.startsWith('http') ? linkedin : `https://${linkedin}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="text-[#FF6A00] hover:underline inline-flex items-center gap-1"
                                >
                                  <span>View Profile</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              ) : (
                                <span className="text-[#71717A] italic">—</span>
                              )}
                            </div>

                            <div className="flex items-center gap-1.5 pt-1 text-[#FFFFFF]">
                              <Calendar className="w-3.5 h-3.5 text-[#FF6A00]" />
                              <span className="font-semibold">{date}</span>
                            </div>

                            <div className="flex items-center gap-1.5 pt-1 text-[#FFFFFF]">
                              <Clock className="w-3.5 h-3.5 text-[#FF6A00]" />
                              <span className="font-semibold">{time}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          /* Audit Leads Tab */
          <div className="bg-[#14141A] border border-[#262626] rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 sm:p-5 border-b border-[#262626] flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-[#FFFFFF] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FF6A00]" />
                  LinkedIn Authority Score Leads
                </h2>
                <p className="text-xs text-[#71717A] mt-0.5">
                  Prospective founders who ran the free authority scoring tool.
                </p>
              </div>
              <div className="text-xs text-[#A1A1AA] font-mono">
                {filteredLeads.length} leads
              </div>
            </div>

            {isLoading ? (
              <div className="py-20 text-center">
                <RefreshCw className="w-8 h-8 text-[#FF6A00] animate-spin mx-auto mb-3" />
                <p className="text-sm text-[#A1A1AA]">Loading audit leads...</p>
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="py-20 text-center px-4">
                <p className="text-sm text-[#A1A1AA]">No audit leads found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#0B0B0F]/80 text-[#A1A1AA] text-xs uppercase tracking-wider border-b border-[#262626]">
                      <th className="py-3 px-4 font-bold">Founder</th>
                      <th className="py-3 px-4 font-bold">Email</th>
                      <th className="py-3 px-4 font-bold">Company</th>
                      <th className="py-3 px-4 font-bold">LinkedIn URL</th>
                      <th className="py-3 px-4 font-bold">Score</th>
                      <th className="py-3 px-4 font-bold">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#262626]">
                    {filteredLeads.map((l) => (
                      <tr key={l.id} className="hover:bg-[#1F1F27]/60 transition-colors">
                        <td className="py-3.5 px-4 font-semibold text-[#FFFFFF]">{l.name}</td>
                        <td className="py-3.5 px-4 text-[#A1A1AA]">{l.email}</td>
                        <td className="py-3.5 px-4 text-[#FFFFFF]">{l.company}</td>
                        <td className="py-3.5 px-4">
                          {l.linkedin_url ? (
                            <a
                              href={l.linkedin_url.startsWith('http') ? l.linkedin_url : `https://${l.linkedin_url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-[#FF6A00] hover:underline inline-flex items-center gap-1"
                            >
                              <span>Profile</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="text-[#71717A]">—</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#FF6A00]/15 text-[#FF6A00] font-bold text-xs">
                            {l.authority_score} / 10
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-xs text-[#71717A]">{l.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Modal / Side Detail View for Selected Booking */}
        {selectedBooking && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0B0F]/80 backdrop-blur-sm"
            onClick={() => setSelectedBooking(null)}
          >
            <div
              className="bg-[#14141A] border border-[#262626] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-5">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF6A00] px-2.5 py-0.5 rounded-full bg-[#FF6A00]/15">
                    Booking Detail
                  </span>
                  <h3 className="text-xl font-bold text-[#FFFFFF] mt-2">
                    {selectedBooking.name || selectedBooking.fullName}
                  </h3>
                  <p className="text-xs text-[#A1A1AA]">
                    {selectedBooking.company || selectedBooking.companyName}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="text-[#71717A] hover:text-[#FFFFFF] p-1.5 rounded-lg bg-[#0B0B0F] border border-[#262626]"
                >
                  ✕
                </button>
              </div>

              {/* 6 Required Fields summary in modal */}
              <div className="space-y-3 bg-[#0B0B0F] p-4 rounded-xl border border-[#262626] text-sm mb-5">
                <div className="flex justify-between items-center py-1 border-b border-[#1F1F27]">
                  <span className="text-[#71717A] text-xs">Name:</span>
                  <span className="font-semibold text-[#FFFFFF]">{selectedBooking.name || selectedBooking.fullName}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#1F1F27]">
                  <span className="text-[#71717A] text-xs">Email:</span>
                  <span className="font-semibold text-[#FFFFFF] select-all">{selectedBooking.email}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#1F1F27]">
                  <span className="text-[#71717A] text-xs">Company:</span>
                  <span className="font-semibold text-[#FFFFFF]">{selectedBooking.company || selectedBooking.companyName}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#1F1F27]">
                  <span className="text-[#71717A] text-xs">LinkedIn URL:</span>
                  {selectedBooking.linkedinUrl ? (
                    <a
                      href={selectedBooking.linkedinUrl.startsWith('http') ? selectedBooking.linkedinUrl : `https://${selectedBooking.linkedinUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#FF6A00] hover:underline flex items-center gap-1 font-medium truncate max-w-[200px]"
                    >
                      <span className="truncate">{selectedBooking.linkedinUrl}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  ) : (
                    <span className="text-[#71717A] text-xs">—</span>
                  )}
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#1F1F27]">
                  <span className="text-[#71717A] text-xs">Date Selected:</span>
                  <span className="font-bold text-[#FFFFFF] flex items-center gap-1 text-xs">
                    <Calendar className="w-3.5 h-3.5 text-[#FF6A00]" />
                    {selectedBooking.dateSelected}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#71717A] text-xs">Time Selected:</span>
                  <span className="font-bold text-[#FFFFFF] flex items-center gap-1 text-xs">
                    <Clock className="w-3.5 h-3.5 text-[#FF6A00]" />
                    {selectedBooking.timeSelected}
                  </span>
                </div>
              </div>

              {selectedBooking.primaryGoal && (
                <div className="mb-5 text-xs text-[#A1A1AA] bg-[#14141A] p-3 rounded-lg border border-[#262626]">
                  <span className="font-bold text-[#FFFFFF] block mb-1">Founder's Primary Goal:</span>
                  {selectedBooking.primaryGoal}
                </div>
              )}

              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="px-4 py-2 rounded-xl bg-[#1F1F27] hover:bg-[#262633] text-xs font-semibold text-[#FFFFFF] border border-[#383838] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
