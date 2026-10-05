"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, AlertCircle, Users, UserCheck } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getTalentById, ApprovedTalentItem } from "@/data/talent";
import { trackEvent } from "@/lib/analytics/tracker";

const TALENT_TYPES = [
  "Models (Runway & Editorial)",
  "Fashion Designers & Ateliers",
  "Choreographers & Movement Directors",
  "Makeup & Hair Stylists",
  "Fashion Stylists & Art Directors",
  "Photographers & Videographers",
  "Content Creators & Influencers",
  "Celebrities & Public Figures",
  "Other Creative Professionals",
];

const EVENT_CAMPAIGN_TYPES = [
  "Fashion Show / Runway Showcase",
  "Brand Campaign / Commercial Shoot",
  "Editorial Lookbook",
  "Product Launch / Activation",
  "Luxury Event / Summit",
  "Private Showcase",
  "Other Project",
];

const TALENT_COUNT_OPTIONS = [
  "1 Talent",
  "2–5 Talent",
  "5–10 Talent",
  "10+ Talent",
  "Custom / Full Team",
];

function HireTalentFormContent() {
  const searchParams = useSearchParams();
  const talentParam = searchParams.get("talent");
  const categoryParam = searchParams.get("category");

  const [requestedTalent, setRequestedTalent] = useState<ApprovedTalentItem | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    talentType: "",
    eventType: "",
    preferredDate: "",
    location: "",
    talentCount: "",
    brief: "",
    consent: true,
  });

  useEffect(() => {
    if (talentParam) {
      const talent = getTalentById(talentParam);
      if (talent) {
        setRequestedTalent(talent);
        setFormData((prev) => ({
          ...prev,
          talentType:
            talent.category === "MODELS"
              ? "Models (Runway & Editorial)"
              : talent.category === "DESIGNERS"
              ? "Fashion Designers & Ateliers"
              : talent.category === "MAKEUP ARTISTS"
              ? "Makeup & Hair Stylists"
              : talent.category === "STYLISTS"
              ? "Fashion Stylists & Art Directors"
              : talent.category === "CHOREOGRAPHERS"
              ? "Choreographers & Movement Directors"
              : talent.category === "CREATORS"
              ? "Content Creators & Influencers"
              : talent.category === "PUBLIC FIGURES"
              ? "Celebrities & Public Figures"
              : prev.talentType,
        }));
      }
    } else if (categoryParam) {
      const catLower = categoryParam.toLowerCase();
      if (catLower.includes("model")) setFormData((prev) => ({ ...prev, talentType: "Models (Runway & Editorial)" }));
      else if (catLower.includes("design")) setFormData((prev) => ({ ...prev, talentType: "Fashion Designers & Ateliers" }));
      else if (catLower.includes("makeup")) setFormData((prev) => ({ ...prev, talentType: "Makeup & Hair Stylists" }));
      else if (catLower.includes("styl")) setFormData((prev) => ({ ...prev, talentType: "Fashion Stylists & Art Directors" }));
      else if (catLower.includes("choreo")) setFormData((prev) => ({ ...prev, talentType: "Choreographers & Movement Directors" }));
      else if (catLower.includes("creator") || catLower.includes("influenc")) setFormData((prev) => ({ ...prev, talentType: "Content Creators & Influencers" }));
      else if (catLower.includes("celebrity") || catLower.includes("public")) setFormData((prev) => ({ ...prev, talentType: "Celebrities & Public Figures" }));
    }
  }, [talentParam, categoryParam]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Mandatory Validations
    if (!formData.fullName.trim()) {
      setErrorMessage("Please enter your Full Name.");
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage("Please enter a valid Email Address.");
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage("Please enter your Phone / WhatsApp number.");
      return;
    }
    if (!formData.talentType) {
      setErrorMessage("Please select the Type of Talent required.");
      return;
    }
    if (!formData.brief.trim() || formData.brief.trim().length < 10) {
      setErrorMessage("Please provide a brief description of your talent requirement (minimum 10 characters).");
      return;
    }

    setStatus("submitting");

    try {
      const payload = {
        fullName: formData.fullName,
        company: formData.company || undefined,
        email: formData.email,
        phone: formData.phone,
        eventTypes: [`Hire Talent - ${formData.talentType}`],
        preferredDate: formData.preferredDate || "To be discussed",
        location: formData.location || "To be discussed",
        talentRequested: requestedTalent ? `${requestedTalent.name} (${requestedTalent.id})` : undefined,
        servicesRequested: [
          `Talent Category: ${formData.talentType}`,
          requestedTalent ? `Requested Talent: ${requestedTalent.name}` : "Talent Selection: General Category",
          formData.talentCount ? `Talent Count: ${formData.talentCount}` : "Talent Count: Flexible",
          formData.eventType ? `Project Type: ${formData.eventType}` : "Project Type: General",
        ],
        eventDescription: `CLIENT TALENT HIRING BRIEF\n\n${
          requestedTalent ? `REQUESTED SPECIFIC TALENT: ${requestedTalent.name} (${requestedTalent.specialty})\n` : ""
        }Talent Category Required: ${formData.talentType}\nTalent Count: ${formData.talentCount || "Not specified"}\nProject/Campaign Type: ${formData.eventType || "Not specified"}\nLocation: ${formData.location || "Not specified"}\nTarget Date: ${formData.preferredDate || "To be discussed"}\n\nClient Brief & Requirements:\n${formData.brief}`,
        budgetCurrency: "AED",
        budgetRange: "To be discussed",
        consent: true,
        enquiryType: "Hire Talent",
        source: requestedTalent ? "TALENT_CARD_DIRECT_REQUEST" : "CLIENT_HIRE_TALENT_FORM",
      };

      const res = await fetch("/api/event-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const generatedRef = data.referenceNumber || `FI-2026-${Math.floor(10000 + Math.random() * 90000)}`;
        setReferenceNumber(generatedRef);
        setStatus("success");
        trackEvent("talent_form_submit", {
          talent_category: formData.talentType,
          talent_id: requestedTalent?.id,
          ref_num: generatedRef,
        });
        window.scrollTo({ top: 120, behavior: "smooth" });
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Failed to submit enquiry. Please check your details and try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error occurred while submitting. Please check your connection.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#050505] text-[#111111] dark:text-white flex flex-col font-sans select-none overflow-x-hidden">
      <Header />

      {/* HERO SECTION */}
      <section className="relative pt-28 sm:pt-32 pb-8 sm:pb-12 px-4 bg-gradient-to-b from-[#F5F2EC] via-[#FAF8F5] to-[#FAF8F5] dark:from-black dark:via-[#0A0908] dark:to-[#050505] border-b border-black/10 dark:border-white/10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[#D4AF37]/10 blur-[100px] pointer-events-none" />

        <div className="w-[calc(100%-32px)] lg:w-[min(92vw,1100px)] max-w-[1100px] mx-auto text-center relative z-10 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#D4AF37] font-syne text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>FASHAI UNIVERSAL · CLIENT TALENT BOOKING</span>
          </div>

          <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl font-light text-[#111111] dark:text-white uppercase tracking-tight leading-none">
            HIRE <span className="text-[#D4AF37] italic font-serif">TALENT</span>
          </h1>

          <p className="font-sans text-base sm:text-xl md:text-2xl text-[#333333] dark:text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
            Events and talent, handled by one team. Connect with approved runway models, designers, choreographers, stylists, photographers, and creative directors for your event, campaign, or brand requirement across Dubai and India.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/talent"
              className="inline-flex items-center gap-1.5 text-xs font-syne tracking-wider text-[#D4AF37] hover:underline uppercase font-bold"
            >
              <span>BROWSE TALENT DIRECTORY →</span>
            </Link>
            <span className="text-black/30 dark:text-white/30">•</span>
            <Link
              href="/apply"
              className="inline-flex items-center gap-1.5 text-xs font-syne tracking-wider text-[#111111]/70 dark:text-white/70 hover:text-[#D4AF37] uppercase font-semibold"
            >
              <span>APPLY AS TALENT ↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 py-8 sm:py-12 md:py-16">
        <div className="w-[calc(100%-32px)] lg:w-[min(92vw,1100px)] max-w-[1100px] mx-auto box-border">
          {status === "success" ? (
            /* REAL CONFIRMED SUCCESS STATE */
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 sm:p-14 bg-white dark:bg-[#0B0A09] border border-[#D4AF37]/40 rounded-2xl sm:rounded-3xl text-center space-y-6 shadow-xl dark:shadow-[0_0_60px_rgba(212,175,55,0.12)] max-w-xl mx-auto box-border"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>

              <div className="space-y-2">
                <h2 className="font-serif-display text-3xl sm:text-5xl font-light uppercase text-[#111111] dark:text-white">
                  THANK YOU
                </h2>
                <p className="font-sans text-base sm:text-lg text-[#333333] dark:text-white/90 font-light">
                  We've received your request.
                </p>
                <p className="font-sans text-sm sm:text-base text-[#666666] dark:text-brand-platinum/80 font-light">
                  Our team will contact you soon.
                </p>
              </div>

              <div className="inline-block px-5 py-2.5 rounded-xl bg-[#FAF8F5] dark:bg-[#151412] border border-black/10 dark:border-white/15 text-[#D4AF37] font-mono text-xs sm:text-sm font-bold tracking-wider">
                Enquiry Reference: {referenceNumber}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#D4AF37] text-black font-syne font-bold text-xs uppercase tracking-wider hover:bg-[#FFEC69] transition-all shadow-md text-center flex items-center justify-center"
                >
                  RETURN TO HOMEPAGE →
                </Link>
                <button
                  onClick={() => setStatus("idle")}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-black/20 dark:border-white/20 text-[#111111] dark:text-white font-syne font-bold text-xs uppercase tracking-wider hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all text-center flex items-center justify-center"
                >
                  SUBMIT ANOTHER REQUEST
                </button>
              </div>
            </motion.div>
          ) : (
            /* SHORT CLIENT HIRE TALENT FORM */
            <div className="space-y-6 box-border max-w-3xl mx-auto">
              {/* SELECTED TALENT CONFIRMATION BANNER */}
              {requestedTalent && (
                <div className="p-4 sm:p-5 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#111111] dark:text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-black flex items-center justify-center shrink-0">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-syne font-bold tracking-wider text-[#D4AF37] uppercase block">
                        REQUESTING SPECIFIC TALENT
                      </span>
                      <h3 className="font-serif-display text-lg sm:text-xl font-light uppercase text-[#111111] dark:text-white">
                        {requestedTalent.name}
                      </h3>
                      <p className="text-xs text-[#555555] dark:text-white/70 font-sans">
                        {requestedTalent.specialty} · {requestedTalent.location || requestedTalent.category}
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/talent"
                    className="text-xs font-syne font-bold text-[#D4AF37] hover:underline uppercase shrink-0"
                  >
                    CHANGE TALENT
                  </Link>
                </div>
              )}

              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-300 text-xs sm:text-sm font-sans flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-500 dark:text-red-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-[#0B0A09] border border-black/10 dark:border-white/12 rounded-2xl sm:rounded-3xl p-6 sm:p-10 space-y-6 shadow-xl dark:shadow-[0_20px_80px_rgba(0,0,0,0.6)] box-border w-full"
              >
                <div className="border-b border-black/10 dark:border-white/10 pb-4">
                  <span className="font-syne text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                    CLIENT ENQUIRY FORM
                  </span>
                  <h2 className="font-serif-display text-2xl sm:text-3xl text-[#111111] dark:text-white uppercase font-light mt-1">
                    BOOK CREATIVE <span className="text-[#D4AF37]">TALENT</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-sans text-sm box-border w-full">
                  {/* 1. FULL NAME * */}
                  <div className="space-y-1.5 w-full box-border">
                    <label className="block text-[#111111]/80 dark:text-white/90 font-syne font-semibold uppercase text-xs tracking-wider">
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="e.g. David Miller"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full h-[48px] bg-[#FAF8F5] dark:bg-[#141312] border border-black/15 dark:border-white/15 rounded-xl px-4 py-3 text-[#111111] dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 text-sm transition-all box-border"
                    />
                  </div>

                  {/* 2. COMPANY / BRAND */}
                  <div className="space-y-1.5 w-full box-border">
                    <label className="block text-[#111111]/80 dark:text-white/90 font-syne font-semibold uppercase text-xs tracking-wider">
                      COMPANY / BRAND / AGENCY
                    </label>
                    <input
                      type="text"
                      name="company"
                      placeholder="e.g. Vogue Middle East / Global Ventures"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full h-[48px] bg-[#FAF8F5] dark:bg-[#141312] border border-black/15 dark:border-white/15 rounded-xl px-4 py-3 text-[#111111] dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 text-sm transition-all box-border"
                    />
                  </div>

                  {/* 3. EMAIL ADDRESS * */}
                  <div className="space-y-1.5 w-full box-border">
                    <label className="block text-[#111111]/80 dark:text-white/90 font-syne font-semibold uppercase text-xs tracking-wider">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="david@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full h-[48px] bg-[#FAF8F5] dark:bg-[#141312] border border-black/15 dark:border-white/15 rounded-xl px-4 py-3 text-[#111111] dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 text-sm transition-all box-border"
                    />
                  </div>

                  {/* 4. PHONE / WHATSAPP * */}
                  <div className="space-y-1.5 w-full box-border">
                    <label className="block text-[#111111]/80 dark:text-white/90 font-syne font-semibold uppercase text-xs tracking-wider">
                      PHONE / WHATSAPP *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+971 50 123 4567"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full h-[48px] bg-[#FAF8F5] dark:bg-[#141312] border border-black/15 dark:border-white/15 rounded-xl px-4 py-3 text-[#111111] dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 text-sm transition-all box-border"
                    />
                  </div>

                  {/* 5. TALENT TYPE REQUIRED * */}
                  <div className="space-y-1.5 w-full box-border">
                    <label className="block text-[#111111]/80 dark:text-white/90 font-syne font-semibold uppercase text-xs tracking-wider">
                      TALENT CATEGORY REQUIRED *
                    </label>
                    <select
                      name="talentType"
                      value={formData.talentType}
                      onChange={handleChange}
                      required
                      className="w-full h-[48px] bg-[#FAF8F5] dark:bg-[#141312] border border-black/15 dark:border-white/15 rounded-xl px-4 py-3 text-[#111111] dark:text-white outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 text-sm transition-all box-border cursor-pointer"
                    >
                      <option value="">Select Talent Category *</option>
                      {TALENT_TYPES.map((t) => (
                        <option key={t} value={t} className="bg-white dark:bg-[#0F0E0D] text-[#111111] dark:text-white">
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 6. NUMBER OF TALENT REQUIRED */}
                  <div className="space-y-1.5 w-full box-border">
                    <label className="block text-[#111111]/80 dark:text-white/90 font-syne font-semibold uppercase text-xs tracking-wider">
                      NUMBER OF TALENT REQUIRED
                    </label>
                    <select
                      name="talentCount"
                      value={formData.talentCount}
                      onChange={handleChange}
                      className="w-full h-[48px] bg-[#FAF8F5] dark:bg-[#141312] border border-black/15 dark:border-white/15 rounded-xl px-4 py-3 text-[#111111] dark:text-white outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 text-sm transition-all box-border cursor-pointer"
                    >
                      <option value="">Select quantity (optional)</option>
                      {TALENT_COUNT_OPTIONS.map((tc) => (
                        <option key={tc} value={tc} className="bg-white dark:bg-[#0F0E0D] text-[#111111] dark:text-white">
                          {tc}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 7. EVENT / CAMPAIGN TYPE */}
                  <div className="space-y-1.5 w-full box-border">
                    <label className="block text-[#111111]/80 dark:text-white/90 font-syne font-semibold uppercase text-xs tracking-wider">
                      EVENT / CAMPAIGN TYPE
                    </label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      className="w-full h-[48px] bg-[#FAF8F5] dark:bg-[#141312] border border-black/15 dark:border-white/15 rounded-xl px-4 py-3 text-[#111111] dark:text-white outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 text-sm transition-all box-border cursor-pointer"
                    >
                      <option value="">Select project type (optional)</option>
                      {EVENT_CAMPAIGN_TYPES.map((ect) => (
                        <option key={ect} value={ect} className="bg-white dark:bg-[#0F0E0D] text-[#111111] dark:text-white">
                          {ect}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 8. LOCATION */}
                  <div className="space-y-1.5 w-full box-border">
                    <label className="block text-[#111111]/80 dark:text-white/90 font-syne font-semibold uppercase text-xs tracking-wider">
                      LOCATION / CITY
                    </label>
                    <input
                      type="text"
                      name="location"
                      placeholder="e.g. Dubai, Mumbai, London"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full h-[48px] bg-[#FAF8F5] dark:bg-[#141312] border border-black/15 dark:border-white/15 rounded-xl px-4 py-3 text-[#111111] dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 text-sm transition-all box-border"
                    />
                  </div>

                  {/* 9. BRIEF & REQUIREMENTS * (FULL WIDTH) */}
                  <div className="sm:col-span-2 space-y-1.5 w-full box-border pt-1">
                    <label className="block text-[#111111]/80 dark:text-white/90 font-syne font-semibold uppercase text-xs tracking-wider">
                      BRIEF &amp; REQUIREMENTS *
                    </label>
                    <textarea
                      name="brief"
                      rows={4}
                      placeholder="Tell us about your campaign or event requirements, preferred talent profile, dates, and scope..."
                      value={formData.brief}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#FAF8F5] dark:bg-[#141312] border border-black/15 dark:border-white/15 rounded-xl p-4 text-[#111111] dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 text-sm leading-relaxed box-border resize-y min-h-[110px]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-[#666666] dark:text-brand-platinum/70 font-light">
                    By submitting this request, you agree to allow FashAI Universal to review your talent brief and contact you.
                  </p>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full sm:w-auto bg-[#D4AF37] hover:bg-[#FFEC69] text-black px-8 py-3.5 rounded-xl font-syne text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md flex items-center justify-center gap-2 shrink-0 disabled:opacity-50 cursor-pointer min-h-[48px]"
                  >
                    <span>{status === "submitting" ? "SUBMITTING BRIEF..." : "BOOK TALENT →"}</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function HireTalentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF8F5] dark:bg-[#050505]" />}>
      <HireTalentFormContent />
    </Suspense>
  );
}
