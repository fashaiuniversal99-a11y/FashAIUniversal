"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  FileText,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Archive,
  User,
  ExternalLink,
  X,
  Mail,
  Phone,
  Briefcase,
  Globe,
  Layers,
  UserCheck,
  Tag,
  ChevronRight,
  Download,
} from "lucide-react";
import { SubmissionRecord } from "@/lib/admin/config-schema";

interface CategoryMeta {
  slug: string;
  label: string;
}

export const ESTABLISHED_CATEGORIES: CategoryMeta[] = [
  { slug: "models", label: "Models" },
  { slug: "makeup-artists", label: "Makeup Artists" },
  { slug: "fashion-designers", label: "Fashion Designers" },
  { slug: "fashion-stylists", label: "Fashion Stylists" },
  { slug: "choreographers", label: "Choreographers" },
  { slug: "creators", label: "Influencers / Creators" },
  { slug: "public-figures", label: "Celebrity / Public Figures" },
  { slug: "cstp", label: "CSTP Application" },
  { slug: "fashion-commentary", label: "Fashion Commentary" },
  { slug: "nomination", label: "Creative Nomination" },
];

export function getAppCategory(app: SubmissionRecord): CategoryMeta {
  if (app.categorySlug) {
    const match = ESTABLISHED_CATEGORIES.find((c) => c.slug === app.categorySlug);
    if (match) return match;
  }
  if (app.category) {
    const match = ESTABLISHED_CATEGORIES.find((c) => c.label.toLowerCase() === app.category!.toLowerCase());
    if (match) return match;
  }

  const raw = `${app.categorySlug || ""} ${app.category || ""} ${app.domain || ""} ${app.applicationType || ""}`.toLowerCase();

  if (raw.includes("makeup") || raw.includes("mua")) {
    return { slug: "makeup-artists", label: "Makeup Artists" };
  }
  if (raw.includes("model")) {
    return { slug: "models", label: "Models" };
  }
  if (raw.includes("designer")) {
    return { slug: "fashion-designers", label: "Fashion Designers" };
  }
  if (raw.includes("stylist")) {
    return { slug: "fashion-stylists", label: "Fashion Stylists" };
  }
  if (raw.includes("choreographer")) {
    return { slug: "choreographers", label: "Choreographers" };
  }
  if (raw.includes("creator") || raw.includes("influencer")) {
    return { slug: "creators", label: "Influencers / Creators" };
  }
  if (raw.includes("celebrity") || raw.includes("public")) {
    return { slug: "public-figures", label: "Celebrity / Public Figures" };
  }
  if (raw.includes("cstp") || raw.includes("technical")) {
    return { slug: "cstp", label: "CSTP Application" };
  }
  if (raw.includes("commentary") || raw.includes("media")) {
    return { slug: "fashion-commentary", label: "Fashion Commentary" };
  }
  if (raw.includes("nomination")) {
    return { slug: "nomination", label: "Creative Nomination" };
  }

  return { slug: "other", label: app.domain || app.applicationType || "Other Application" };
}

export default function ApplicationManagerPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "ALL";

  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApp, setSelectedApp] = useState<SubmissionRecord | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/submissions", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data.submissions || []);
      }
    } catch (e) {
      console.warn("Could not fetch applications:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: SubmissionRecord["status"]) => {
    try {
      const res = await fetch("/api/admin/submissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        await fetchApplications();
        if (selectedApp?.id === id) {
          setSelectedApp((prev) => (prev ? { ...prev, status } : null));
        }
      }
    } catch (e) {
      console.warn("Status update error:", e);
    }
  };

  // Filter only Applications
  const applications = submissions.filter((s) => s.type === "APPLICATION");

  // Counts by Established Category
  const categoryCounts: Record<string, number> = {};
  applications.forEach((app) => {
    const cat = getAppCategory(app);
    categoryCounts[cat.slug] = (categoryCounts[cat.slug] || 0) + 1;
  });

  // Status counts
  const counts = {
    TOTAL: applications.length,
    NEW: applications.filter((a) => a.status === "NEW").length,
    UNDER_REVIEW: applications.filter((a) => a.status === "UNDER REVIEW").length,
    CONTACTED: applications.filter((a) => a.status === "CONTACTED").length,
    IN_PROGRESS: applications.filter((a) => a.status === "IN_PROGRESS").length,
    ARCHIVED: applications.filter((a) => a.status === "ARCHIVED").length,
  };

  const filteredApps = applications.filter((app) => {
    const appCat = getAppCategory(app);
    const matchesStatus = statusFilter === "ALL" || app.status === statusFilter;
    const matchesCategory =
      categoryFilter === "ALL" ||
      appCat.slug === categoryFilter ||
      appCat.label.toLowerCase() === categoryFilter.toLowerCase();

    const matchesSearch =
      app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appCat.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.domain && app.domain.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (app.city && app.city.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesStatus && matchesCategory && matchesSearch;
  });

  const handleExportCSV = () => {
    const headers = [
      "ID",
      "Full Name",
      "Email",
      "Phone",
      "Category",
      "Category Slug",
      "Domain",
      "City",
      "Country",
      "Valid Passport",
      "Travel to Dubai",
      "Investment Readiness",
      "Status",
      "Source URL",
      "Submitted At",
    ];
    const rows = filteredApps.map((app) => {
      const cat = getAppCategory(app);
      const passport = app.hasValidPassport || (app.categoryDetails?.hasValidPassport as string) || "N/A";
      const travelDubai = app.willingToTravelToDubai || (app.categoryDetails?.willingToTravelToDubai as string) || "N/A";
      const invest = app.investmentReadiness || (app.categoryDetails?.investmentReadiness as string) || "N/A";

      return [
        `"${app.id}"`,
        `"${app.fullName.replace(/"/g, '""')}"`,
        `"${app.email}"`,
        `"${app.phone || ""}"`,
        `"${cat.label}"`,
        `"${cat.slug}"`,
        `"${app.domain || ""}"`,
        `"${app.city || ""}"`,
        `"${app.country || ""}"`,
        `"${passport.replace(/"/g, '""')}"`,
        `"${travelDubai.replace(/"/g, '""')}"`,
        `"${invest.replace(/"/g, '""')}"`,
        `"${app.status}"`,
        `"${app.sourceUrl || `/apply/${cat.slug}`}"`,
        `"${new Date(app.submittedAt).toISOString()}"`,
      ].join(",");
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `fashprism-applications-${categoryFilter.toLowerCase()}-${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 select-none font-sans">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="font-syne text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            TALENT INTAKE DASHBOARD
          </span>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-light uppercase tracking-tight text-white">
            TALENT <span className="text-[#D4AF37]">APPLICATIONS</span>
          </h1>
          <p className="font-sans text-xs text-white/60">
            Intake management across models, makeup artists, designers, stylists, choreographers, creators, and nominees.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          disabled={filteredApps.length === 0}
          className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/25 text-xs font-syne font-bold uppercase tracking-wider transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          title="Export currently filtered applications to CSV"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export CSV ({filteredApps.length})</span>
        </button>
      </div>

      {/* APPLICATION DASHBOARD STATUS METRICS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setStatusFilter("ALL")}
          className={`p-4 rounded-2xl border transition-all text-left flex items-center justify-between ${
            statusFilter === "ALL"
              ? "bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]"
              : "bg-[#0F0E0D] border-white/10 text-white/70 hover:text-white"
          }`}
        >
          <div>
            <div className="text-[10px] font-syne font-bold uppercase tracking-wider">TOTAL APPS</div>
            <div className="font-serif-display text-2xl text-white">{counts.TOTAL}</div>
          </div>
          <UserCheck className="w-5 h-5 text-[#D4AF37]" />
        </button>

        <button
          onClick={() => setStatusFilter("NEW")}
          className={`p-4 rounded-2xl border transition-all text-left flex items-center justify-between ${
            statusFilter === "NEW"
              ? "bg-[#F15E1C]/20 border-[#F15E1C] text-[#F15E1C]"
              : "bg-[#0F0E0D] border-white/10 text-white/70 hover:text-white"
          }`}
        >
          <div>
            <div className="text-[10px] font-syne font-bold uppercase tracking-wider">NEW</div>
            <div className="font-serif-display text-2xl text-white">{counts.NEW}</div>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-[#F15E1C]" />
        </button>

        <button
          onClick={() => setStatusFilter("UNDER REVIEW")}
          className={`p-4 rounded-2xl border transition-all text-left flex items-center justify-between ${
            statusFilter === "UNDER REVIEW"
              ? "bg-blue-500/20 border-blue-500 text-blue-400"
              : "bg-[#0F0E0D] border-white/10 text-white/70 hover:text-white"
          }`}
        >
          <div>
            <div className="text-[10px] font-syne font-bold uppercase tracking-wider">UNDER REVIEW</div>
            <div className="font-serif-display text-2xl text-white">{counts.UNDER_REVIEW}</div>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
        </button>

        <button
          onClick={() => setStatusFilter("CONTACTED")}
          className={`p-4 rounded-2xl border transition-all text-left flex items-center justify-between ${
            statusFilter === "CONTACTED"
              ? "bg-[#2E936F]/20 border-[#2E936F] text-[#2E936F]"
              : "bg-[#0F0E0D] border-white/10 text-white/70 hover:text-white"
          }`}
        >
          <div>
            <div className="text-[10px] font-syne font-bold uppercase tracking-wider">CONTACTED</div>
            <div className="font-serif-display text-2xl text-white">{counts.CONTACTED}</div>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-[#2E936F]" />
        </button>
      </div>

      {/* APPLICATIONS BY CATEGORY GRID */}
      <div className="p-5 rounded-3xl bg-[#0F0E0D] border border-white/10 space-y-3 shadow-lg">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <span className="font-syne text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            APPLICATIONS BY CATEGORY
          </span>
          {categoryFilter !== "ALL" && (
            <button
              onClick={() => setCategoryFilter("ALL")}
              className="text-[11px] font-syne text-[#D4AF37] hover:underline"
            >
              Reset Category Filter
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {ESTABLISHED_CATEGORIES.map((cat) => {
            const count = categoryCounts[cat.slug] || 0;
            const isSelected = categoryFilter === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => setCategoryFilter(isSelected ? "ALL" : cat.slug)}
                className={`p-3 rounded-2xl border transition-all text-left flex items-center justify-between ${
                  isSelected
                    ? "bg-[#D4AF37]/20 border-[#D4AF37] text-white ring-1 ring-[#D4AF37]"
                    : "bg-[#161514] border-white/10 text-white/80 hover:border-white/30"
                }`}
              >
                <span className="text-xs font-syne font-bold truncate mr-2">{cat.label}</span>
                <span className="px-2 py-0.5 rounded-md bg-[#D4AF37]/15 text-[#D4AF37] font-serif-display text-xs font-bold shrink-0">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SEARCH AND FILTER BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#0F0E0D] border border-white/10">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search applicant name, category, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#181715] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-[#181715] border border-white/15 text-white text-xs rounded-xl px-3 py-2 outline-none font-syne uppercase"
          >
            <option value="ALL">ALL CATEGORIES</option>
            {ESTABLISHED_CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.label} ({categoryCounts[c.slug] || 0})
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#181715] border border-white/15 text-white text-xs rounded-xl px-3 py-2 outline-none font-syne uppercase"
          >
            <option value="ALL">ALL STATUSES</option>
            <option value="NEW">NEW</option>
            <option value="UNDER REVIEW">UNDER REVIEW</option>
            <option value="CONTACTED">CONTACTED</option>
            <option value="ARCHIVED">ARCHIVED</option>
          </select>
        </div>
      </div>

      {/* APPLICATIONS LIST */}
      {loading ? (
        <div className="py-16 text-center text-xs font-syne text-white/50">
          Loading applicant records...
        </div>
      ) : filteredApps.length === 0 ? (
        <div className="py-16 text-center bg-[#0F0E0D] border border-white/10 rounded-2xl space-y-3 p-6">
          <FileText className="w-8 h-8 text-white/20 mx-auto" />
          <div className="font-syne text-xs font-bold text-white uppercase tracking-wider">
            NO APPLICATIONS FOUND
          </div>
          <p className="text-xs text-white/50 font-sans max-w-sm mx-auto">
            No talent applications match your selected filters.
          </p>
        </div>
      ) : (
        <div className="bg-[#0F0E0D] border border-white/10 rounded-2xl overflow-hidden shadow-md">
          <div className="divide-y divide-white/5">
            {filteredApps.map((app) => {
              const cat = getAppCategory(app);
              return (
                <div
                  key={app.id}
                  onClick={() => setSelectedApp(app)}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] font-bold font-syne flex items-center justify-center shrink-0 border border-[#D4AF37]/30">
                      {app.fullName.charAt(0)}
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-syne font-bold text-white text-xs sm:text-sm truncate">
                          {app.fullName}
                        </span>
                        <span className="text-[10px] font-syne font-bold uppercase text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded-md border border-[#D4AF37]/30">
                          {cat.label}
                        </span>
                      </div>
                      <div className="text-[11px] text-white/50 truncate font-sans">
                        {app.email} • {app.phone || app.city || "Direct Submitter"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                    <span className="text-[10px] font-mono text-white/40">
                      {new Date(app.submittedAt).toLocaleDateString()}
                    </span>
                    <span
                      className={`text-[9px] font-syne font-bold uppercase px-3 py-1 rounded-full border ${
                        app.status === "NEW"
                          ? "bg-[#F15E1C]/20 border-[#F15E1C] text-[#F15E1C]"
                          : app.status === "UNDER REVIEW"
                          ? "bg-blue-500/20 border-blue-500 text-blue-400"
                          : app.status === "CONTACTED"
                          ? "bg-[#2E936F]/20 border-[#2E936F] text-[#2E936F]"
                          : "bg-white/10 border-white/20 text-white/50"
                      }`}
                    >
                      {app.status}
                    </span>
                    <ChevronRight className="w-4 h-4 text-white/40" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* FULL APPLICANT DETAIL VIEW MODAL */}
      {selectedApp && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#0F0E0D] border border-white/20 rounded-3xl p-6 space-y-5 max-h-[85vh] overflow-y-auto text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="font-syne text-[10px] text-[#D4AF37] uppercase tracking-widest font-bold">
                  FULL APPLICANT PROFILE ({selectedApp.id})
                </span>
                <h3 className="font-serif-display text-xl uppercase text-white">
                  {selectedApp.fullName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* APPLICANT METADATA */}
            {(() => {
              const cat = getAppCategory(selectedApp);
              const canonicalUrl = selectedApp.sourceUrl || `/apply/${cat.slug}`;
              return (
                <div className="p-4 rounded-2xl bg-[#161514] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-syne font-bold text-[#D4AF37] uppercase tracking-wider">
                      CATEGORY: {cat.label}
                    </span>
                    <span className="text-[10px] font-mono text-white/60">
                      Slug: /{cat.slug}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs font-sans">
                    <div>
                      <span className="text-white/50 block font-syne text-[10px]">EMAIL ADDRESS:</span>
                      <a href={`mailto:${selectedApp.email}`} className="font-mono text-white hover:underline">
                        {selectedApp.email}
                      </a>
                    </div>
                    <div>
                      <span className="text-white/50 block font-syne text-[10px]">PHONE / WHATSAPP:</span>
                      <span className="font-mono text-white">{selectedApp.phone || "N/A"}</span>
                    </div>
                    <div>
                      <span className="text-white/50 block font-syne text-[10px]">LOCATION:</span>
                      <span className="text-white">{selectedApp.city || selectedApp.country || "N/A"}</span>
                    </div>
                    <div>
                      <span className="text-white/50 block font-syne text-[10px]">CANONICAL ROUTE / SOURCE:</span>
                      <a
                        href={canonicalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#D4AF37] hover:underline flex items-center gap-1 font-mono text-[11px]"
                      >
                        <span>{canonicalUrl}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* TRAVEL & READINESS DETAILS */}
            {(() => {
              const passport = selectedApp.hasValidPassport || (selectedApp.categoryDetails?.hasValidPassport as string);
              const travelDubai = selectedApp.willingToTravelToDubai || (selectedApp.categoryDetails?.willingToTravelToDubai as string);
              const invest = selectedApp.investmentReadiness || (selectedApp.categoryDetails?.investmentReadiness as string);

              if (!passport && !travelDubai && !invest) return null;

              return (
                <div className="p-4 rounded-2xl bg-[#161514] border border-[#D4AF37]/30 space-y-3">
                  <span className="font-syne text-[10px] text-[#D4AF37] uppercase font-bold tracking-wider block">
                    EVENT TRAVEL &amp; READINESS
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-sans">
                    <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                      <span className="text-white/50 block font-syne text-[9px] uppercase tracking-wider mb-1">
                        VALID PASSPORT
                      </span>
                      <span className="font-medium text-white">
                        {passport || "N/A"}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                      <span className="text-white/50 block font-syne text-[9px] uppercase tracking-wider mb-1">
                        WILLING TO TRAVEL TO DUBAI
                      </span>
                      <span className="font-medium text-white">
                        {travelDubai || "N/A"}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                      <span className="text-white/50 block font-syne text-[9px] uppercase tracking-wider mb-1">
                        INVESTMENT READINESS
                      </span>
                      <span className="font-medium text-white">
                        {invest || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* DYNAMIC CATEGORY DETAILS (All submitted fields rendered) */}
            {selectedApp.categoryDetails && Object.keys(selectedApp.categoryDetails).length > 0 && (
              <div className="p-4 rounded-2xl bg-[#161514] border border-white/10 space-y-3">
                <span className="font-syne text-[10px] text-[#D4AF37] uppercase font-bold tracking-wider block">
                  CATEGORY &amp; PORTFOLIO DETAILS
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                  {Object.entries(selectedApp.categoryDetails).map(([key, val]) => {
                    if (val === undefined || val === null || val === "") return null;
                    if (["hasValidPassport", "willingToTravelToDubai", "investmentReadiness"].includes(key)) return null;
                    const readableKey = key.replace(/([A-Z])/g, " $1").toUpperCase();
                    const formattedVal = Array.isArray(val)
                      ? val.join(", ")
                      : typeof val === "boolean"
                      ? val ? "Yes" : "No"
                      : String(val);

                    const isLink = String(val).startsWith("http://") || String(val).startsWith("https://");

                    return (
                      <div key={key} className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                        <span className="text-white/50 block font-syne text-[9px] uppercase tracking-wider">
                          {readableKey}
                        </span>
                        {isLink ? (
                          <a
                            href={String(val)}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#D4AF37] hover:underline flex items-center gap-1 font-mono"
                          >
                            <span>Open Link</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-white font-medium whitespace-pre-line leading-snug">
                            {formattedVal}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STATUS PIPELINE ACTIONS */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <span className="text-[10px] font-syne font-bold uppercase tracking-wider text-white/50">
                UPDATE APPLICANT STATUS
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleStatusChange(selectedApp.id, "UNDER REVIEW")}
                  className="py-2.5 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-300 font-syne text-xs font-bold hover:bg-blue-500/30"
                >
                  REVIEWING
                </button>
                <button
                  onClick={() => handleStatusChange(selectedApp.id, "CONTACTED")}
                  className="py-2.5 rounded-xl bg-[#2E936F]/20 border border-[#2E936F]/40 text-[#2E936F] font-syne text-xs font-bold hover:bg-[#2E936F]/30"
                >
                  CONTACTED
                </button>
                <button
                  onClick={() => handleStatusChange(selectedApp.id, "ARCHIVED")}
                  className="py-2.5 rounded-xl bg-white/10 border border-white/20 text-white/70 font-syne text-xs font-bold hover:bg-white/20"
                >
                  ARCHIVED
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
