"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Globe,
  ImageIcon,
  Calendar,
  FileText,
  Clock,
  Palette,
  LayoutTemplate,
  Plus,
  Eye,
  Wrench,
  Sparkles,
  ArrowRight,
  Inbox,
  Power,
  AlertTriangle,
  Layers,
  Grid,
  ShieldAlert,
  CheckCircle2,
  Users,
  MessageSquare,
  Search,
  Filter,
  UserCheck,
  HelpCircle,
  Download,
} from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { ActivityLogEntry, SubmissionRecord } from "@/lib/admin/config-schema";

export default function AdminDashboardPage() {
  const { config, updateLocalDraftConfig, saveDraft, publish, refreshConfig, setIsPreviewOpen, showToast } =
    useSiteConfig();
  const [logs, setLogs] = useState<ActivityLogEntry[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(true);

  // Submissions Data & Analytics State
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState<"ALL" | "TODAY" | "7DAYS" | "30DAYS">("ALL");
  const [sourceFilter, setSourceFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [domainFilter, setDomainFilter] = useState("ALL");

  const [showStopModal, setShowStopModal] = useState(false);
  const [isProcessingStop, setIsProcessingStop] = useState(false);

  useEffect(() => {
    fetchLogs();
    fetchSubmissions();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoadingLogs(true);
      const res = await fetch("/api/admin/activity", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs || []);
      }
    } catch (e) {
      console.warn("Could not fetch activity logs:", e);
    } finally {
      setLoadingLogs(false);
    }
  };

  const fetchSubmissions = async () => {
    try {
      setLoadingSubmissions(true);
      const res = await fetch("/api/admin/submissions", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data.submissions || []);
      }
    } catch (e) {
      console.warn("Could not fetch submissions:", e);
    } finally {
      setLoadingSubmissions(false);
    }
  };

  const isMaintenanceOn = config?.maintenanceSettings?.enabled;

  const handleConfirmToggleMaintenance = async () => {
    try {
      setIsProcessingStop(true);
      const newState = !isMaintenanceOn;
      updateLocalDraftConfig((prev) => ({
        ...prev,
        maintenanceSettings: {
          ...prev.maintenanceSettings,
          enabled: newState,
        },
      }));

      const saved = await saveDraft();
      if (!saved) {
        showToast("Unable to change website status. Please try again.", "error");
        return;
      }

      const published = await publish(`Global Maintenance mode set to ${newState ? "ACTIVE" : "OFF"}`);
      if (!published) {
        showToast("Unable to change website status. Please try again.", "error");
        return;
      }

      await refreshConfig();
      await fetchLogs();
      setShowStopModal(false);
      showToast(
        newState ? "Website is now in GLOBAL MAINTENANCE mode." : "Website restored ONLINE successfully.",
        newState ? "warning" : "success"
      );
    } catch (e) {
      showToast("Unable to change website status. Please try again.", "error");
    } finally {
      setIsProcessingStop(false);
    }
  };

  // Filter Submissions by Date, Source, Status, Domain & Search
  const filteredSubmissions = submissions.filter((sub) => {
    // 1. Date Filter
    if (dateFilter !== "ALL") {
      const subTime = new Date(sub.submittedAt).getTime();
      const now = Date.now();
      if (dateFilter === "TODAY") {
        const startOfDay = new Date().setHours(0, 0, 0, 0);
        if (subTime < startOfDay) return false;
      } else if (dateFilter === "7DAYS") {
        if (now - subTime > 7 * 86400 * 1000) return false;
      } else if (dateFilter === "30DAYS") {
        if (now - subTime > 30 * 86400 * 1000) return false;
      }
    }

    // 2. Source Filter
    if (sourceFilter !== "ALL" && sub.source !== sourceFilter) {
      return false;
    }

    // 3. Status Filter
    if (statusFilter !== "ALL" && sub.status !== statusFilter) {
      return false;
    }

    // 4. Domain Filter
    if (domainFilter !== "ALL" && sub.domain !== domainFilter && sub.applicationType !== domainFilter) {
      return false;
    }

    // 5. Search Query (Name, Email, Phone, Application ID, Domain, Inquiry Subject, Conversation ID)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const nameMatch = sub.fullName?.toLowerCase().includes(q);
      const emailMatch = sub.email?.toLowerCase().includes(q);
      const phoneMatch = sub.phone?.toLowerCase().includes(q);
      const idMatch = sub.id?.toLowerCase().includes(q);
      const domainMatch = sub.domain?.toLowerCase().includes(q) || sub.applicationType?.toLowerCase().includes(q);
      const subjectMatch = sub.enquiryType?.toLowerCase().includes(q) || sub.message?.toLowerCase().includes(q);
      const cidMatch = sub.conversationId?.toLowerCase().includes(q);

      if (!nameMatch && !emailMatch && !phoneMatch && !idMatch && !domainMatch && !subjectMatch && !cidMatch) {
        return false;
      }
    }

    return true;
  });

  // Calculate Metrics from Persisted Data
  const totalApplications = submissions.filter((s) => s.type === "APPLICATION").length;
  const eventInquiriesCount = submissions.filter(
    (s) => s.source === "EVENT_MANAGEMENT_FORM" || s.type === "EVENT_INQUIRY"
  ).length;
  const totalInquiries = submissions.filter((s) => s.type === "CONTACT" || s.type === "CHATBOT_INQUIRY").length;
  const chatbotLeads = submissions.filter(
    (s) => s.source === "CHATBOT" || s.type.startsWith("CHATBOT_")
  ).length;
  const totalForms = submissions.length;
  const newSubmissionsCount = submissions.filter((s) => s.status === "NEW").length;
  const pendingReviewCount = submissions.filter((s) => s.status === "UNDER REVIEW" || s.status === "REVIEWING").length;

  // Application Domains List & Counts
  const domainCounts: Record<string, number> = {};
  submissions.forEach((s) => {
    const domainKey = s.domain || s.applicationType || s.enquiryType || "General Intake";
    domainCounts[domainKey] = (domainCounts[domainKey] || 0) + 1;
  });

  const allSupportedDomains = [
    "Fashion Designer",
    "Model",
    "Makeup Artist",
    "Fashion Stylist",
    "Influencer / Creator",
    "Celebrity / Public Figure",
    "Choreographer",
    "Creative & Technical Professional",
    "Fashion Commentary / Media",
    "Industry Nomination",
    "Sponsorship",
    "Event Registration",
  ];

  const formatTimeAgo = (dateStr: string) => {
    const diff = Math.max(0, Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000));
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
    if (diff < 172800) return "Yesterday";
    return `${Math.floor(diff / 86400)} days ago`;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 select-none font-sans">
      {/* 1. MASTER CONTROL HEADER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0F0E0D] border border-white/10 shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-syne text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              FASHAI UNIVERSAL MASTER ADMIN
            </span>
          </div>
          <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-tight text-white">
            SUBMISSIONS &amp; <span className="text-[#D4AF37] font-semibold">APPLICATIONS</span>
          </h1>
          <p className="font-sans text-xs sm:text-sm text-white/60 max-w-2xl leading-relaxed">
            Centralized data view over public chatbot interactions, contact inquiries, talent applications, and website forms.
          </p>
        </div>

        {/* WEBSITE STATUS & MASTER STOP CONTROL */}
        <div className="flex items-center gap-4 bg-[#141312] border border-white/12 p-4 rounded-2xl shrink-0 shadow-inner relative z-10">
          <div
            className={`w-3.5 h-3.5 rounded-full ${
              isMaintenanceOn ? "bg-[#F15E1C] animate-ping" : "bg-[#2E936F] shadow-[0_0_10px_#2E936F]"
            }`}
          />
          <div className="text-left space-y-0.5">
            <div className="text-[10px] font-syne uppercase tracking-wider text-white/50">
              Website Status
            </div>
            <div
              className={`text-xs font-syne font-bold uppercase tracking-wider ${
                isMaintenanceOn ? "text-[#F15E1C]" : "text-[#2E936F]"
              }`}
            >
              {isMaintenanceOn ? "● MAINTENANCE MODE" : "● WEBSITE ONLINE"}
            </div>
          </div>

          <button
            onClick={() => setShowStopModal(true)}
            className={`ml-3 px-4 py-2 rounded-xl text-[10px] font-syne font-bold uppercase transition-all border shadow-md flex items-center gap-1.5 ${
              isMaintenanceOn
                ? "bg-[#2E936F]/15 text-[#2E936F] border-[#2E936F]/30 hover:bg-[#2E936F]/30"
                : "bg-[#F15E1C]/15 text-[#F15E1C] border-[#F15E1C]/40 hover:bg-[#F15E1C]/30"
            }`}
          >
            <Power className="w-3.5 h-3.5" />
            <span>{isMaintenanceOn ? "RESTORE WEBSITE" : "STOP WEBSITE"}</span>
          </button>
        </div>
      </div>

      {/* 2. REAL-TIME SUBMISSIONS & APPLICATIONS MASTER OVERVIEW (Requirement #9) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="font-syne text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
            PERSISTED DATA COUNTS
          </h2>
          <span className="text-[10px] font-mono text-white/40 uppercase">Authoritative Source</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* EVENT INQUIRIES COUNT */}
          <Link
            href="/admin/submissions"
            className="p-6 rounded-3xl bg-[#0F0E0D] border border-[#D4AF37]/35 hover:border-[#D4AF37] transition-all shadow-xl group block relative overflow-hidden"
          >
            <div className="flex items-center justify-between text-[11px] font-syne font-bold uppercase text-[#D4AF37]">
              <span className="tracking-wider">EVENT INQUIRIES</span>
              <div className="w-8 h-8 rounded-full bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <div className="font-serif-display text-3xl sm:text-4xl text-white font-light mt-1">
              {eventInquiriesCount}
            </div>
            <p className="text-[11px] text-white/60 font-sans mt-2">
              Persisted Plan Your Event briefs
            </p>
          </Link>

          {/* APPLICATIONS COUNT */}
          <Link
            href="/admin/applications"
            className="p-6 rounded-3xl bg-[#0F0E0D] border border-white/10 hover:border-[#D4AF37]/50 transition-all shadow-xl group block relative overflow-hidden"
          >
            <div className="flex items-center justify-between text-[11px] font-syne font-bold uppercase text-white/50">
              <span className="tracking-wider">APPLICATIONS</span>
              <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
                <UserCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="font-serif-display text-3xl sm:text-4xl text-white font-light mt-1">
              {totalApplications}
            </div>
            <p className="text-[11px] text-white/50 font-sans mt-2">
              Successfully submitted candidate applications
            </p>
          </Link>

          {/* INQUIRIES COUNT */}
          <Link
            href="/admin/submissions"
            className="p-6 rounded-3xl bg-[#0F0E0D] border border-white/10 hover:border-blue-500/50 transition-all shadow-xl group block relative overflow-hidden"
          >
            <div className="flex items-center justify-between text-[11px] font-syne font-bold uppercase text-white/50">
              <span className="tracking-wider">INQUIRIES</span>
              <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <HelpCircle className="w-4 h-4" />
              </div>
            </div>
            <div className="font-serif-display text-3xl sm:text-4xl text-white font-light mt-1">
              {totalInquiries}
            </div>
            <p className="text-[11px] text-white/50 font-sans mt-2">
              General &amp; Event partnership inquiries
            </p>
          </Link>

          {/* CHATBOT LEADS COUNT */}
          <Link
            href="/admin/chatbot"
            className="p-6 rounded-3xl bg-[#0F0E0D] border border-white/10 hover:border-[#2E936F]/50 transition-all shadow-xl group block relative overflow-hidden"
          >
            <div className="flex items-center justify-between text-[11px] font-syne font-bold uppercase text-white/50">
              <span className="tracking-wider">CHATBOT LEADS</span>
              <div className="w-8 h-8 rounded-full bg-[#2E936F]/10 flex items-center justify-center text-[#2E936F] group-hover:scale-110 transition-transform">
                <MessageSquare className="w-4 h-4" />
              </div>
            </div>
            <div className="font-serif-display text-3xl sm:text-4xl text-white font-light mt-1">
              {chatbotLeads}
            </div>
            <p className="text-[11px] text-white/50 font-sans mt-2">
              Leads captured via FashAI Concierge
            </p>
          </Link>

          {/* TOTAL SUBMITTED FORMS */}
          <Link
            href="/admin/submissions"
            className="p-6 rounded-3xl bg-[#0F0E0D] border border-white/10 hover:border-[#F15E1C]/50 transition-all shadow-xl group block relative overflow-hidden"
          >
            <div className="flex items-center justify-between text-[11px] font-syne font-bold uppercase text-white/50">
              <span className="tracking-wider">SUBMITTED FORMS</span>
              <div className="w-8 h-8 rounded-full bg-[#F15E1C]/10 flex items-center justify-center text-[#F15E1C] group-hover:scale-110 transition-transform">
                <Inbox className="w-4 h-4" />
              </div>
            </div>
            <div className="font-serif-display text-3xl sm:text-4xl text-white font-light mt-1">
              {totalForms}
            </div>
            <div className="text-[11px] text-white/50 font-sans mt-2 flex items-center gap-2">
              <span className="text-[#F15E1C] font-syne font-bold">{newSubmissionsCount} NEW</span>
              <span>•</span>
              <span className="text-[#D4AF37] font-syne font-bold">{pendingReviewCount} IN REVIEW</span>
            </div>
          </Link>
        </div>
      </div>

      {/* 3. APPLICATIONS BY DOMAIN BREAKDOWN (Requirement #9) */}
      <div className="p-6 rounded-3xl bg-[#0F0E0D] border border-white/10 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <h3 className="font-serif-display text-lg uppercase text-white tracking-wider">
              APPLICATIONS BY DOMAIN
            </h3>
            <p className="text-xs text-white/50 font-sans">
              Actual count for every supported talent domain in the project
            </p>
          </div>
          <Link
            href="/admin/applications"
            className="text-xs font-syne text-[#D4AF37] hover:underline"
          >
            View All Applications →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {allSupportedDomains.map((domainName) => {
            const count = domainCounts[domainName] || 0;
            return (
              <div
                key={domainName}
                className="p-3.5 rounded-2xl bg-[#161514] border border-white/10 flex items-center justify-between hover:border-[#D4AF37]/40 transition-all"
              >
                <span className="text-xs font-syne font-bold text-white/90 truncate mr-2">
                  {domainName}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 font-serif-display text-sm font-bold shrink-0">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. DASHBOARD FILTERING & SEARCH BAR (Requirements 10 & 11) */}
      <div className="p-5 rounded-3xl bg-[#0F0E0D] border border-white/10 space-y-4 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Name, Email, Phone, App ID, Domain, Inquiry or CID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#181715] border border-white/15 text-white text-xs rounded-2xl pl-10 pr-4 py-2.5 outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* DATE RANGE FILTER */}
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value as any)}
              className="bg-[#181715] border border-white/15 text-white text-xs rounded-xl px-3 py-2 outline-none font-syne uppercase"
            >
              <option value="ALL">ALL DATES</option>
              <option value="TODAY">TODAY</option>
              <option value="7DAYS">LAST 7 DAYS</option>
              <option value="30DAYS">LAST 30 DAYS</option>
            </select>

            {/* SOURCE FILTER */}
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="bg-[#181715] border border-white/15 text-white text-xs rounded-xl px-3 py-2 outline-none font-syne uppercase"
            >
              <option value="ALL">ALL SOURCES</option>
              <option value="CHATBOT">CHATBOT</option>
              <option value="CONTACT_FORM">CONTACT FORM</option>
              <option value="APPLICATION_FORM">APPLICATION FORM</option>
            </select>

            {/* STATUS FILTER */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#181715] border border-white/15 text-white text-xs rounded-xl px-3 py-2 outline-none font-syne uppercase"
            >
              <option value="ALL">ALL STATUSES</option>
              <option value="NEW">NEW</option>
              <option value="UNDER REVIEW">UNDER REVIEW</option>
              <option value="CONTACTED">CONTACTED</option>
              <option value="RESOLVED">RESOLVED</option>
              <option value="ARCHIVED">ARCHIVED</option>
            </select>
          </div>
        </div>

        {/* RECENTLY FILTERED SUBMISSIONS LIST */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-white/50 px-1 font-syne">
            <span>SHOWING {filteredSubmissions.length} OF {submissions.length} RECORDS</span>
            {(searchQuery || dateFilter !== "ALL" || sourceFilter !== "ALL" || statusFilter !== "ALL") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setDateFilter("ALL");
                  setSourceFilter("ALL");
                  setStatusFilter("ALL");
                }}
                className="text-[#D4AF37] hover:underline"
              >
                Reset Filters
              </button>
            )}
          </div>

          {loadingSubmissions ? (
            <div className="py-10 text-center text-xs font-syne text-white/40">
              Loading persisted records...
            </div>
          ) : filteredSubmissions.length === 0 ? (
            <div className="py-10 text-center text-xs font-syne text-white/40 bg-[#161514] rounded-2xl border border-white/5">
              No matching submission records found.
            </div>
          ) : (
            <div className="divide-y divide-white/5 bg-[#161514] border border-white/10 rounded-2xl overflow-hidden">
              {filteredSubmissions.slice(0, 8).map((sub) => (
                <div key={sub.id} className="p-3.5 flex items-center justify-between gap-4 hover:bg-white/5 transition-all">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-white/10 text-[#D4AF37] font-bold font-syne text-xs flex items-center justify-center shrink-0">
                      {sub.fullName ? sub.fullName.charAt(0) : "S"}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-syne font-bold text-white truncate">
                          {sub.fullName}
                        </span>
                        <span className="text-[10px] font-mono text-white/40">({sub.domain || sub.type})</span>
                      </div>
                      <div className="text-[11px] text-white/50 font-mono truncate">
                        {sub.email} • {sub.phone || "No Phone"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/80 font-mono text-[9px] uppercase">
                      {sub.source || "WEBSITE"}
                    </span>
                    <span
                      className={`text-[9px] font-syne font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                        sub.status === "NEW"
                          ? "bg-[#F15E1C]/20 border-[#F15E1C] text-[#F15E1C]"
                          : "bg-[#2E936F]/20 border-[#2E936F] text-[#2E936F]"
                      }`}
                    >
                      {sub.status}
                    </span>
                    <span className="text-[10px] font-mono text-white/40 hidden sm:inline">
                      {formatTimeAgo(sub.submittedAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 5. QUICK ACTIONS MATRIX */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="font-syne text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
            QUICK MODULES MATRIX
          </h2>
          <span className="text-[10px] font-mono text-white/40 uppercase">Direct Access</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <Link
            href="/admin/chatbot"
            className="p-5 rounded-3xl bg-[#11100F] border border-white/10 hover:border-[#D4AF37]/60 transition-all flex flex-col items-center justify-center gap-3 text-center group shadow-md hover:-translate-y-1"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="font-syne text-[11px] font-bold text-white uppercase tracking-wider">
              CHATBOT INTEL
            </span>
          </Link>

          <Link
            href="/admin/applications"
            className="p-5 rounded-3xl bg-[#11100F] border border-white/10 hover:border-[#2E936F]/60 transition-all flex flex-col items-center justify-center gap-3 text-center group shadow-md hover:-translate-y-1"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#2E936F]/10 text-[#2E936F] border border-[#2E936F]/20 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
              <UserCheck className="w-5 h-5" />
            </div>
            <span className="font-syne text-[11px] font-bold text-white uppercase tracking-wider">
              APPLICATIONS
            </span>
          </Link>

          <Link
            href="/admin/submissions"
            className="p-5 rounded-3xl bg-[#11100F] border border-white/10 hover:border-[#F15E1C]/60 transition-all flex flex-col items-center justify-center gap-3 text-center group shadow-md hover:-translate-y-1"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#F15E1C]/10 text-[#F15E1C] border border-[#F15E1C]/20 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
              <Inbox className="w-5 h-5" />
            </div>
            <span className="font-syne text-[11px] font-bold text-white uppercase tracking-wider">
              SUBMISSIONS
            </span>
          </Link>

          <Link
            href="/admin/homepage"
            className="p-5 rounded-3xl bg-[#11100F] border border-white/10 hover:border-white/40 transition-all flex flex-col items-center justify-center gap-3 text-center group shadow-md hover:-translate-y-1"
          >
            <div className="w-10 h-10 rounded-2xl bg-white/10 text-white border border-white/15 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
              <LayoutTemplate className="w-5 h-5" />
            </div>
            <span className="font-syne text-[11px] font-bold text-white uppercase tracking-wider">
              HOMEPAGE
            </span>
          </Link>

          <Link
            href="/admin/pages"
            className="p-5 rounded-3xl bg-[#11100F] border border-white/10 hover:border-white/40 transition-all flex flex-col items-center justify-center gap-3 text-center group shadow-md hover:-translate-y-1"
          >
            <div className="w-10 h-10 rounded-2xl bg-white/10 text-white border border-white/15 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
              <Globe className="w-5 h-5" />
            </div>
            <span className="font-syne text-[11px] font-bold text-white uppercase tracking-wider">
              PAGES
            </span>
          </Link>

          <button
            onClick={() => setIsPreviewOpen(true)}
            className="p-5 rounded-3xl bg-[#11100F] border border-white/10 hover:border-white/40 transition-all flex flex-col items-center justify-center gap-3 text-center group shadow-md hover:-translate-y-1"
          >
            <div className="w-10 h-10 rounded-2xl bg-white/10 text-white border border-white/15 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
              <Eye className="w-5 h-5" />
            </div>
            <span className="font-syne text-[11px] font-bold text-white uppercase tracking-wider">
              PREVIEW SITE
            </span>
          </button>
        </div>
      </div>

      {/* 6. MASTER STOP WEBSITE CONFIRMATION MODAL */}
      {showStopModal && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-3xl bg-[#0F0E0D] border border-white/20 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="space-y-3 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#F15E1C]/15 border border-[#F15E1C]/30 text-[#F15E1C] flex items-center justify-center mx-auto">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <h3 className="font-serif-display text-2xl font-light uppercase text-white">
                {isMaintenanceOn ? "RESTORE PUBLIC WEBSITE?" : "STOP ENTIRE WEBSITE?"}
              </h3>
              <p className="font-sans text-xs text-white/70 leading-relaxed">
                {isMaintenanceOn
                  ? "This will restore public visitor access across all routes immediately."
                  : "This will make the entire public website unavailable to visitors. Public visitors will be redirected to the Maintenance page. Admin access remains active."}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowStopModal(false)}
                disabled={isProcessingStop}
                className="flex-1 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-syne text-xs font-bold uppercase transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmToggleMaintenance}
                disabled={isProcessingStop}
                className={`flex-1 py-3 rounded-2xl font-syne text-xs font-bold uppercase transition-all shadow-lg ${
                  isMaintenanceOn
                    ? "bg-[#2E936F] hover:bg-[#3AA881] text-black"
                    : "bg-[#F15E1C] hover:bg-[#FF7334] text-white"
                }`}
              >
                {isProcessingStop
                  ? "Processing..."
                  : isMaintenanceOn
                  ? "Restore Website"
                  : "Enter Maintenance"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
