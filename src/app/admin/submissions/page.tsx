"use client";

import { useState, useEffect } from "react";
import {
  Inbox,
  Trash2,
  Download,
  Search,
  CheckCircle2,
  Clock,
  Filter,
  Eye,
  X,
  MessageSquare,
  FileText,
  HelpCircle,
  Building,
  Mail,
  Phone,
  Globe,
  Tag,
} from "lucide-react";
import { SubmissionRecord } from "@/lib/admin/config-schema";

export default function FormSubmissionsPage() {
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sourceFilter, setSourceFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState<SubmissionRecord | null>(null);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/submissions", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data.submissions || []);
      }
    } catch (e) {
      console.warn("Could not fetch submissions:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleStatusChange = async (id: string, status: SubmissionRecord["status"]) => {
    try {
      const res = await fetch("/api/admin/submissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        await fetchSubmissions();
        if (selectedSubmission?.id === id) {
          setSelectedSubmission((prev) => (prev ? { ...prev, status } : null));
        }
      }
    } catch (e) {
      console.warn("Status update error:", e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this submission record?")) return;

    try {
      const res = await fetch(`/api/admin/submissions?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        if (selectedSubmission?.id === id) setSelectedSubmission(null);
        await fetchSubmissions();
      }
    } catch (e) {
      console.warn("Delete error:", e);
    }
  };

  const handleExportCSV = () => {
    if (submissions.length === 0) return;
    const headers = ["ID", "Source", "Type", "Domain", "Full Name", "Email", "Phone", "Status", "Submitted At"];
    const rows = submissions.map((s) => [
      s.id,
      s.source || "WEBSITE",
      s.type,
      `"${(s.domain || s.applicationType || s.enquiryType || "").replace(/"/g, '""')}"`,
      `"${s.fullName.replace(/"/g, '""')}"`,
      s.email,
      s.phone || "",
      s.status,
      s.submittedAt,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `fashai_submissions_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [newNoteInput, setNewNoteInput] = useState("");
  const [addingNote, setAddingNote] = useState(false);

  const handleAddNote = async (id: string) => {
    if (!newNoteInput.trim()) return;
    try {
      setAddingNote(true);
      const res = await fetch("/api/admin/submissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, note: newNoteInput.trim(), author: "Admin" }),
      });
      if (res.ok) {
        setNewNoteInput("");
        await fetchSubmissions();
        const updatedRes = await fetch("/api/admin/submissions", { cache: "no-store" });
        if (updatedRes.ok) {
          const data = await updatedRes.json();
          const fresh = (data.submissions || []).find((s: SubmissionRecord) => s.id === id);
          if (fresh) setSelectedSubmission(fresh);
        }
      }
    } catch (e) {
      console.warn("Error adding internal note:", e);
    } finally {
      setAddingNote(false);
    }
  };

  const filtered = submissions.filter((s) => {
    const matchesStatus = statusFilter === "ALL" || s.status === statusFilter;
    const matchesSource =
      sourceFilter === "ALL"
        ? true
        : sourceFilter === "EVENT_MANAGEMENT_FORM"
        ? s.source === "EVENT_MANAGEMENT_FORM" || s.type === "EVENT_INQUIRY"
        : s.source === sourceFilter;
    const matchesSearch =
      s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.referenceNumber && s.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.company && s.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.domain && s.domain.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.enquiryType && s.enquiryType.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.eventName && s.eventName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSource && matchesSearch;
  });

  const eventInquiriesCount = submissions.filter(
    (s) => s.source === "EVENT_MANAGEMENT_FORM" || s.type === "EVENT_INQUIRY"
  ).length;

  return (
    <div className="space-y-6 select-none font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="font-syne text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            AGGREGATED SUBMISSIONS REPOSITORY
          </span>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-light uppercase tracking-tight text-white">
            SUBMITTED FORMS &amp; <span className="text-[#D4AF37]">INQUIRIES</span>
          </h1>
          <p className="font-sans text-xs sm:text-sm text-white/70">
            Intake repository aggregating event briefs, contact inquiries, applications, and chatbot leads.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          disabled={submissions.length === 0}
          className="bg-[#2E936F] hover:bg-[#257759] text-white px-5 py-2.5 rounded-2xl font-syne text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-md shrink-0 disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          <span>EXPORT CSV</span>
        </button>
      </div>

      {/* QUICK SOURCE FILTER TABS */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3">
        <button
          onClick={() => setSourceFilter("ALL")}
          className={`px-4 py-2 rounded-xl text-xs font-syne uppercase font-bold tracking-wider transition-all ${
            sourceFilter === "ALL"
              ? "bg-[#D4AF37] text-black shadow-md"
              : "bg-[#141312] text-white/70 hover:text-white border border-white/10"
          }`}
        >
          ALL ({submissions.length})
        </button>

        <button
          onClick={() => setSourceFilter("EVENT_MANAGEMENT_FORM")}
          className={`px-4 py-2 rounded-xl text-xs font-syne uppercase font-bold tracking-wider transition-all flex items-center gap-1.5 ${
            sourceFilter === "EVENT_MANAGEMENT_FORM"
              ? "bg-[#D4AF37] text-black shadow-md"
              : "bg-[#141312] text-[#D4AF37] hover:bg-[#D4AF37]/15 border border-[#D4AF37]/40"
          }`}
        >
          <Building className="w-3.5 h-3.5" />
          <span>EVENT INQUIRIES ({eventInquiriesCount})</span>
        </button>

        <button
          onClick={() => setSourceFilter("CONTACT_FORM")}
          className={`px-4 py-2 rounded-xl text-xs font-syne uppercase font-bold tracking-wider transition-all ${
            sourceFilter === "CONTACT_FORM"
              ? "bg-[#D4AF37] text-black shadow-md"
              : "bg-[#141312] text-white/70 hover:text-white border border-white/10"
          }`}
        >
          CONTACT FORMS ({submissions.filter((s) => s.source === "CONTACT_FORM" || s.type === "CONTACT").length})
        </button>

        <button
          onClick={() => setSourceFilter("APPLICATION_FORM")}
          className={`px-4 py-2 rounded-xl text-xs font-syne uppercase font-bold tracking-wider transition-all ${
            sourceFilter === "APPLICATION_FORM"
              ? "bg-[#D4AF37] text-black shadow-md"
              : "bg-[#141312] text-white/70 hover:text-white border border-white/10"
          }`}
        >
          TALENT APPLICATIONS ({submissions.filter((s) => s.source === "APPLICATION_FORM" || s.type === "APPLICATION").length})
        </button>

        <button
          onClick={() => setSourceFilter("CHATBOT")}
          className={`px-4 py-2 rounded-xl text-xs font-syne uppercase font-bold tracking-wider transition-all ${
            sourceFilter === "CHATBOT"
              ? "bg-[#D4AF37] text-black shadow-md"
              : "bg-[#141312] text-white/70 hover:text-white border border-white/10"
          }`}
        >
          CHATBOT ({submissions.filter((s) => s.source === "CHATBOT" || s.type.startsWith("CHATBOT")).length})
        </button>
      </div>

      {/* FILTER SEARCH BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#0F0E0D] border border-white/10">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="Search ref #, name, company, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#181715] border border-white/15 text-white text-xs rounded-xl pl-9 pr-4 py-2 outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#D4AF37]" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#181715] border border-white/15 text-white text-xs rounded-xl px-3 py-2 outline-none font-syne uppercase"
            >
              <option value="ALL">ALL STATUSES</option>
              <option value="NEW">NEW</option>
              <option value="REVIEWING">REVIEWING</option>
              <option value="CONTACTED">CONTACTED</option>
              <option value="PROPOSAL_REQUESTED">PROPOSAL REQUESTED</option>
              <option value="PROPOSAL_SENT">PROPOSAL SENT</option>
              <option value="IN_DISCUSSION">IN DISCUSSION</option>
              <option value="CONFIRMED">CONFIRMED</option>
              <option value="CLOSED">CLOSED</option>
              <option value="NOT_PROCEEDING">NOT PROCEEDING</option>
              <option value="RESOLVED">RESOLVED</option>
              <option value="ARCHIVED">ARCHIVED</option>
            </select>
          </div>
        </div>
      </div>

      {/* SUBMISSIONS TABLE */}
      {loading ? (
        <div className="py-16 text-center text-xs font-syne text-white/50">
          Loading submission records...
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center text-xs font-syne text-white/50 bg-[#0F0E0D] rounded-2xl border border-white/10">
          No submission records found matching your filters.
        </div>
      ) : (
        <div className="bg-[#0F0E0D] border border-white/10 rounded-2xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#151413] border-b border-white/10 font-syne text-white/70 uppercase">
                <tr>
                  <th className="p-4">REF / SUBMITTER</th>
                  <th className="p-4">EVENT / TYPE</th>
                  <th className="p-4">LOCATION &amp; GUESTS</th>
                  <th className="p-4">BUDGET</th>
                  <th className="p-4">STATUS</th>
                  <th className="p-4">SUBMITTED</th>
                  <th className="p-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {filtered.map((sub) => {
                  const isEventInquiry = sub.source === "EVENT_MANAGEMENT_FORM" || sub.type === "EVENT_INQUIRY";
                  return (
                    <tr key={sub.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        {sub.referenceNumber && (
                          <div className="font-mono text-[10px] text-[#D4AF37] font-bold">
                            {sub.referenceNumber}
                          </div>
                        )}
                        <div className="font-syne font-bold text-white text-sm">{sub.fullName}</div>
                        {sub.company && <div className="text-white/70 text-[11px]">{sub.company}</div>}
                        <div className="text-white/50 text-[10px] font-mono">{sub.email}</div>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-md bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 font-syne text-[10px] font-bold uppercase block w-max">
                          {sub.eventName || sub.domain || sub.applicationType || sub.type}
                        </span>
                        {sub.eventTypes && sub.eventTypes.length > 0 && (
                          <div className="text-[10px] text-white/60 mt-1 font-syne uppercase">
                            {sub.eventTypes.slice(0, 2).join(", ")}
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="text-white font-medium">{sub.location || sub.city || "N/A"}</div>
                        <div className="text-white/50 text-[10px]">
                          {sub.preferredDate ? `Date: ${sub.preferredDate}` : ""}
                          {sub.guestCountRange ? ` · Guests: ${sub.guestCountRange}` : ""}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-[#D4AF37] font-bold font-mono text-[11px]">
                          {sub.budgetRange || sub.budget || "N/A"}
                        </div>
                      </td>
                      <td className="p-4">
                        <select
                          value={sub.status}
                          onChange={(e) => handleStatusChange(sub.id, e.target.value as any)}
                          className={`text-[10px] font-syne font-bold uppercase px-2.5 py-1 rounded-lg border outline-none bg-transparent ${
                            sub.status === "NEW"
                              ? "border-[#F15E1C] text-[#F15E1C]"
                              : sub.status === "REVIEWING" || sub.status === "UNDER REVIEW"
                              ? "border-[#D4AF37] text-[#D4AF37]"
                              : sub.status === "CONFIRMED"
                              ? "border-[#2E936F] text-[#2E936F]"
                              : sub.status === "CONTACTED" || sub.status === "PROPOSAL_SENT"
                              ? "border-blue-400 text-blue-400"
                              : "border-white/20 text-white/40"
                          }`}
                        >
                          <option value="NEW" className="bg-[#0F0E0D] text-white">NEW</option>
                          <option value="REVIEWING" className="bg-[#0F0E0D] text-white">REVIEWING</option>
                          <option value="CONTACTED" className="bg-[#0F0E0D] text-white">CONTACTED</option>
                          <option value="PROPOSAL_REQUESTED" className="bg-[#0F0E0D] text-white">PROPOSAL REQUESTED</option>
                          <option value="PROPOSAL_SENT" className="bg-[#0F0E0D] text-white">PROPOSAL SENT</option>
                          <option value="IN_DISCUSSION" className="bg-[#0F0E0D] text-white">IN DISCUSSION</option>
                          <option value="CONFIRMED" className="bg-[#0F0E0D] text-white">CONFIRMED</option>
                          <option value="CLOSED" className="bg-[#0F0E0D] text-white">CLOSED</option>
                          <option value="NOT_PROCEEDING" className="bg-[#0F0E0D] text-white">NOT PROCEEDING</option>
                          <option value="RESOLVED" className="bg-[#0F0E0D] text-white">RESOLVED</option>
                          <option value="ARCHIVED" className="bg-[#0F0E0D] text-white">ARCHIVED</option>
                        </select>
                      </td>
                      <td className="p-4 text-white/60 text-[11px]">
                        {new Date(sub.submittedAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => setSelectedSubmission(sub)}
                          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                          title="View Full Inquiry Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(sub.id)}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                          title="Delete Record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* FULL DYNAMIC EVENT INQUIRY / FORM VIEWER MODAL */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-[#0F0E0D] border border-white/20 rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="font-syne text-[10px] text-[#D4AF37] uppercase tracking-widest font-bold block">
                  {selectedSubmission.referenceNumber
                    ? `EVENT INQUIRY RECORD (${selectedSubmission.referenceNumber})`
                    : `SUBMISSION RECORD (${selectedSubmission.id})`}
                </span>
                <h3 className="font-serif-display text-2xl uppercase text-white">
                  {selectedSubmission.fullName} {selectedSubmission.company ? `· ${selectedSubmission.company}` : ""}
                </h3>
              </div>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 01. CLIENT & CONTACT INFO */}
            <div className="p-4 rounded-2xl bg-[#161514] border border-white/10 space-y-3">
              <span className="font-syne text-[10px] text-[#D4AF37] uppercase font-bold tracking-wider block">
                01 — CLIENT &amp; CONTACT INFORMATION
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-sans">
                <div>
                  <span className="text-white/50 block font-syne text-[10px]">FULL NAME:</span>
                  <span className="text-white font-bold">{selectedSubmission.fullName}</span>
                </div>
                <div>
                  <span className="text-white/50 block font-syne text-[10px]">COMPANY / BRAND:</span>
                  <span className="text-white">{selectedSubmission.company || selectedSubmission.organization || "N/A"}</span>
                </div>
                <div>
                  <span className="text-white/50 block font-syne text-[10px]">ROLE:</span>
                  <span className="text-white">{selectedSubmission.role || "N/A"}</span>
                </div>
                <div>
                  <span className="text-white/50 block font-syne text-[10px]">WORK EMAIL:</span>
                  <span className="font-mono text-white">{selectedSubmission.email}</span>
                </div>
                <div>
                  <span className="text-white/50 block font-syne text-[10px]">PHONE / WHATSAPP:</span>
                  <span className="font-mono text-white">{selectedSubmission.phone || "N/A"}</span>
                </div>
                <div>
                  <span className="text-white/50 block font-syne text-[10px]">PREFERRED CONTACT:</span>
                  <span className="text-[#D4AF37] font-syne font-bold uppercase">{selectedSubmission.preferredContactMethod || "Email"}</span>
                </div>
              </div>
            </div>

            {/* 02. EVENT BRIEF & LOGISTICS */}
            <div className="p-4 rounded-2xl bg-[#161514] border border-white/10 space-y-3">
              <span className="font-syne text-[10px] text-[#D4AF37] uppercase font-bold tracking-wider block">
                02 — EVENT BRIEF &amp; LOGISTICS
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-sans">
                <div>
                  <span className="text-white/50 block font-syne text-[10px]">EVENT NAME:</span>
                  <span className="text-white font-bold">{selectedSubmission.eventName || "N/A"}</span>
                </div>
                <div>
                  <span className="text-white/50 block font-syne text-[10px]">EVENT TYPES:</span>
                  <span className="text-[#D4AF37] font-syne font-bold uppercase">{selectedSubmission.eventTypes?.join(", ") || selectedSubmission.domain || "N/A"}</span>
                </div>
                <div>
                  <span className="text-white/50 block font-syne text-[10px]">PREFERRED DATE:</span>
                  <span className="text-white">{selectedSubmission.preferredDate || "N/A"} ({selectedSubmission.dateFlexible ? `Flexible: ${selectedSubmission.dateFlexible}` : "Fixed"})</span>
                </div>
                <div>
                  <span className="text-white/50 block font-syne text-[10px]">GUEST COUNT RANGE:</span>
                  <span className="text-white">{selectedSubmission.guestCountRange || selectedSubmission.guestCount || "N/A"}</span>
                </div>
                <div>
                  <span className="text-white/50 block font-syne text-[10px]">LOCATION / CITY:</span>
                  <span className="text-white">{selectedSubmission.location || selectedSubmission.city || "N/A"}</span>
                </div>
                <div>
                  <span className="text-white/50 block font-syne text-[10px]">VENUE STATUS:</span>
                  <span className="text-white">{selectedSubmission.venueStatus || "N/A"}</span>
                </div>
              </div>

              {selectedSubmission.eventDescription && (
                <div className="pt-2 border-t border-white/10">
                  <span className="text-white/50 block font-syne text-[10px] mb-1">EVENT DESCRIPTION:</span>
                  <p className="text-white/90 text-xs leading-relaxed bg-black/40 p-3 rounded-xl border border-white/5">
                    {selectedSubmission.eventDescription}
                  </p>
                </div>
              )}
            </div>

            {/* 03. SERVICES REQUESTED */}
            {selectedSubmission.servicesRequested && selectedSubmission.servicesRequested.length > 0 && (
              <div className="p-4 rounded-2xl bg-[#161514] border border-white/10 space-y-3">
                <span className="font-syne text-[10px] text-[#D4AF37] uppercase font-bold tracking-wider block">
                  03 — SERVICES REQUESTED FROM FASHAI ({selectedSubmission.servicesRequested.length})
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedSubmission.servicesRequested.map((srv) => (
                    <span key={srv} className="px-3 py-1 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 font-syne text-[11px] font-bold uppercase">
                      {srv}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 04. VISION & BUDGET */}
            <div className="p-4 rounded-2xl bg-[#161514] border border-white/10 space-y-3">
              <span className="font-syne text-[10px] text-[#D4AF37] uppercase font-bold tracking-wider block">
                04 — VISION &amp; BUDGET
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-sans">
                <div>
                  <span className="text-white/50 block font-syne text-[10px]">ESTIMATED BUDGET:</span>
                  <span className="text-[#D4AF37] font-bold font-mono text-sm">{selectedSubmission.budgetRange || selectedSubmission.budget || "N/A"} ({selectedSubmission.budgetCurrency || "AED"})</span>
                </div>
                <div>
                  <span className="text-white/50 block font-syne text-[10px]">START PLANNING TIMELINE:</span>
                  <span className="text-white">{selectedSubmission.planningTimeline || "N/A"}</span>
                </div>
                <div>
                  <span className="text-white/50 block font-syne text-[10px]">PROPOSAL DEADLINE:</span>
                  <span className="text-white">{selectedSubmission.proposalDeadline || "None specified"}</span>
                </div>
              </div>

              {selectedSubmission.eventVision && (
                <div className="pt-2 border-t border-white/10">
                  <span className="text-white/50 block font-syne text-[10px] mb-1">ATMOSPHERE &amp; CREATIVE VISION:</span>
                  <p className="text-white/90 text-xs leading-relaxed bg-black/40 p-3 rounded-xl border border-white/5">
                    {selectedSubmission.eventVision}
                  </p>
                </div>
              )}
            </div>

            {/* 05. ATTACHMENTS */}
            {selectedSubmission.attachments && selectedSubmission.attachments.length > 0 && (
              <div className="p-4 rounded-2xl bg-[#161514] border border-white/10 space-y-3">
                <span className="font-syne text-[10px] text-[#D4AF37] uppercase font-bold tracking-wider block">
                  05 — ATTACHED BRIEF &amp; REFERENCE FILES
                </span>
                <div className="space-y-2">
                  {selectedSubmission.attachments.map((att, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/10 text-xs">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#D4AF37]" />
                        <span className="font-syne font-bold text-white">{att.originalName}</span>
                        <span className="text-white/50 text-[10px]">({Math.round(att.size / 1024)} KB)</span>
                      </div>
                      <a
                        href={att.url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1 rounded-lg bg-[#D4AF37]/20 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-syne font-bold text-[10px] uppercase transition-all"
                      >
                        VIEW / DOWNLOAD FILE ↗
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 06. INTERNAL NOTES & STATUS WORKFLOW */}
            <div className="p-4 rounded-2xl bg-[#161514] border border-white/10 space-y-4">
              <span className="font-syne text-[10px] text-[#D4AF37] uppercase font-bold tracking-wider block">
                06 — INTERNAL NOTES &amp; WORKFLOW STATUS
              </span>

              <div className="flex items-center gap-4">
                <span className="text-xs font-syne font-bold text-white uppercase">UPDATE STATUS:</span>
                <select
                  value={selectedSubmission.status}
                  onChange={(e) => handleStatusChange(selectedSubmission.id, e.target.value as any)}
                  className="bg-[#0F0E0D] border border-[#D4AF37]/50 text-[#D4AF37] text-xs font-syne font-bold uppercase rounded-xl px-4 py-2 outline-none"
                >
                  <option value="NEW">NEW</option>
                  <option value="REVIEWING">REVIEWING</option>
                  <option value="CONTACTED">CONTACTED</option>
                  <option value="PROPOSAL_REQUESTED">PROPOSAL REQUESTED</option>
                  <option value="PROPOSAL_SENT">PROPOSAL SENT</option>
                  <option value="IN_DISCUSSION">IN DISCUSSION</option>
                  <option value="CONFIRMED">CONFIRMED</option>
                  <option value="CLOSED">CLOSED</option>
                  <option value="NOT_PROCEEDING">NOT PROCEEDING</option>
                  <option value="RESOLVED">RESOLVED</option>
                  <option value="ARCHIVED">ARCHIVED</option>
                </select>
              </div>

              {/* Internal Notes History */}
              <div className="space-y-2 border-t border-white/10 pt-3">
                <span className="text-white/60 font-syne text-[10px] uppercase font-bold">
                  INTERNAL NOTES ({selectedSubmission.internalNotes?.length || 0}):
                </span>
                
                {selectedSubmission.internalNotes && selectedSubmission.internalNotes.length > 0 ? (
                  <div className="space-y-2 max-h-40 overflow-y-auto no-scrollbar">
                    {selectedSubmission.internalNotes.map((note) => (
                      <div key={note.id} className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs font-sans space-y-1">
                        <div className="flex items-center justify-between text-[10px] text-white/50 font-mono">
                          <span>{note.author}</span>
                          <span>{new Date(note.timestamp).toLocaleString()}</span>
                        </div>
                        <p className="text-white/90 leading-snug">{note.note}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-white/40 italic font-sans">No internal notes added yet.</div>
                )}

                {/* Add Internal Note Input */}
                <div className="flex gap-2 pt-2">
                  <input
                    type="text"
                    placeholder="Type internal note (visible only to admin)..."
                    value={newNoteInput}
                    onChange={(e) => setNewNoteInput(e.target.value)}
                    className="flex-1 bg-[#0F0E0D] border border-white/15 text-white text-xs rounded-xl px-4 py-2 outline-none focus:border-[#D4AF37]"
                  />
                  <button
                    onClick={() => handleAddNote(selectedSubmission.id)}
                    disabled={addingNote || !newNoteInput.trim()}
                    className="px-4 py-2 rounded-xl bg-[#D4AF37] text-black font-syne font-bold text-xs uppercase hover:bg-[#FFEC69] disabled:opacity-50 shrink-0"
                  >
                    {addingNote ? "SAVING..." : "ADD NOTE"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
