"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Sparkles,
  AlertCircle,
  Loader2,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { trackEvent } from "@/lib/analytics/tracker";

const EVENT_TYPES = [
  "Fashion Show",
  "Runway Presentation",
  "Lifestyle Event",
  "Brand Activation",
  "Product Launch",
  "Corporate Event",
  "Conference / Summit",
  "IT Event",
  "Brand Shoot",
  "Other",
];

const GUEST_RANGES = [
  "Under 50",
  "50–100",
  "100–250",
  "250–500",
  "500–1,000",
  "1,000+",
];

const SERVICE_OPTIONS = [
  "Event Planning & Management",
  "Event Production",
  "Creative Direction",
  "Fashion Show / Runway",
  "Brand Activation",
  "Talent / Model Coordination",
  "Photography & Videography",
  "Brand Shoot",
  "Sponsorship / Partnerships",
  "Other",
];

const CURRENCIES = [
  { code: "AED", symbol: "د.إ", label: "AED — د.إ UAE Dirham" },
  { code: "INR", symbol: "₹", label: "INR — ₹ Indian Rupee" },
  { code: "USD", symbol: "$", label: "USD — $ US Dollar" },
  { code: "EUR", symbol: "€", label: "EUR — € Euro" },
  { code: "GBP", symbol: "£", label: "GBP — £ British Pound" },
  { code: "SAR", symbol: "﷼", label: "SAR — ﷼ Saudi Riyal" },
  { code: "QAR", symbol: "ر.ق", label: "QAR — ر.ق Qatari Riyal" },
  { code: "SGD", symbol: "$", label: "SGD — $ Singapore Dollar" },
];

const BUDGET_RANGES_BY_CURRENCY: Record<string, string[]> = {
  AED: [
    "Under AED 25,000",
    "AED 25,000–50,000",
    "AED 50,000–100,000",
    "AED 100,000–250,000",
    "AED 250,000+",
    "To be discussed",
  ],
  INR: [
    "Under ₹5L",
    "₹5L–₹10L",
    "₹10L–₹25L",
    "₹25L–₹50L",
    "₹50L+",
    "To be discussed",
  ],
  USD: [
    "Under $10,000",
    "$10,000–$25,000",
    "$25,000–$50,000",
    "$50,000–$100,000",
    "$100,000+",
    "To be discussed",
  ],
  EUR: [
    "Under €10,000",
    "€10,000–€25,000",
    "€25,000–€50,000",
    "€50,000–€100,000",
    "€100,000+",
    "To be discussed",
  ],
  GBP: [
    "Under £10,000",
    "£10,000–£25,000",
    "£25,000–£50,000",
    "£50,000–£100,000",
    "£100,000+",
    "To be discussed",
  ],
  SAR: [
    "Under SAR 25,000",
    "SAR 25,000–50,000",
    "SAR 50,000–100,000",
    "SAR 100,000–250,000",
    "SAR 250,000+",
    "To be discussed",
  ],
  QAR: [
    "Under QAR 25,000",
    "QAR 25,000–50,000",
    "QAR 50,000–100,000",
    "QAR 100,000–250,000",
    "QAR 250,000+",
    "To be discussed",
  ],
  SGD: [
    "Under SGD 15,000",
    "SGD 15,000–35,000",
    "SGD 35,000–70,000",
    "SGD 70,000–150,000",
    "SGD 150,000+",
    "To be discussed",
  ],
};

export default function PlanYourEventPage() {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");

  const [formData, setFormData] = useState({
    // Step 1: Essential (Required)
    fullName: "",
    phone: "",
    eventType: "",
    location: "",
    preferredDate: "",

    // Step 2: Details (Optional)
    email: "",
    company: "",
    guestCountRange: "",
    budgetCurrency: "AED",
    budgetRange: "",
    servicesRequested: [] as string[],
    additionalRequirements: "",
    consent: true,
  });

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleService = (srv: string) => {
    setFormData((prev) => {
      const exists = prev.servicesRequested.includes(srv);
      return {
        ...prev,
        servicesRequested: exists
          ? prev.servicesRequested.filter((s) => s !== srv)
          : [...prev.servicesRequested, srv],
      };
    });
  };

  const validateStep1 = () => {
    if (!formData.fullName.trim()) {
      setErrorMessage("Please enter your Full Name.");
      return false;
    }
    if (!formData.phone.trim()) {
      setErrorMessage("Please enter your Phone / WhatsApp number.");
      return false;
    }
    if (!formData.eventType) {
      setErrorMessage("Please select an Event Type.");
      return false;
    }
    if (!formData.location.trim()) {
      setErrorMessage("Please specify your Event Location / City.");
      return false;
    }
    if (!formData.preferredDate) {
      setErrorMessage("Please select your Preferred Event Date.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const goToStep2 = () => {
    if (validateStep1()) {
      setCurrentStep(2);
      trackEvent("event_form_start", { source: "plan_your_event_page", page: "plan-your-event" });
      window.scrollTo({ top: 220, behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateStep1()) {
      setCurrentStep(1);
      return;
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setErrorMessage("Please enter a valid email address.");
        return;
      }
    }

    setStatus("submitting");

    try {
      const payload = {
        fullName: formData.fullName,
        company: formData.company || undefined,
        email: formData.email || undefined,
        phone: formData.phone,
        eventTypes: [formData.eventType],
        preferredDate: formData.preferredDate || "To be confirmed",
        guestCountRange: formData.guestCountRange || undefined,
        location: formData.location || "To be discussed",
        servicesRequested: formData.servicesRequested,
        eventDescription: formData.additionalRequirements.trim() || `Event Request for ${formData.eventType} in ${formData.location}.`,
        budgetCurrency: formData.budgetCurrency,
        budgetRange: formData.budgetRange || undefined,
        additionalRequirements: formData.additionalRequirements || undefined,
        consent: true,
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
        trackEvent("event_form_submit", { source: "plan_your_event_page", ref_num: generatedRef });
        window.scrollTo({ top: 140, behavior: "smooth" });
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Failed to submit event request. Please check details and try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error occurred while submitting. Please check your connection.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#050505] text-[#111111] dark:text-white flex flex-col font-jost select-none overflow-x-hidden">
      <Header />

      {/* HERO SECTION */}
      <section className="relative pt-28 sm:pt-32 pb-8 sm:pb-12 px-4 bg-gradient-to-b from-[#F5F2EC] via-[#FAF8F5] to-[#FAF8F5] dark:from-black dark:via-[#0A0908] dark:to-[#050505] border-b border-black/10 dark:border-white/10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#D4AF37]/10 blur-[120px] pointer-events-none" />
        
        <div className="w-[calc(100%-32px)] lg:w-[min(92vw,1200px)] max-w-[1200px] mx-auto text-center relative z-10 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#D4AF37] font-jost text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FASHAI UNIVERSAL · EVENT PRODUCTION</span>
          </div>

          <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl font-light text-[#111111] dark:text-white uppercase tracking-tight leading-none">
            PLAN YOUR <span className="text-[#D4AF37] italic font-serif">EVENT</span>
          </h1>

          <p className="font-jost text-base sm:text-xl md:text-2xl text-[#111111]/80 dark:text-white/90 font-normal max-w-3xl mx-auto leading-relaxed">
            Tell us about your event. Our team will get back to you to discuss planning, production and execution.
          </p>
        </div>
      </section>

      {/* MAIN ENQUIRY FORM CONTAINER */}
      <main className="flex-1 py-8 sm:py-12 md:py-16">
        <div className="w-[calc(100%-32px)] lg:w-[min(92vw,1000px)] max-w-[1000px] mx-auto box-border">
          {status === "success" ? (
            /* EXACT REQUIRED CONFIRMATION STATE */
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 sm:p-14 bg-white dark:bg-[#0B0A09] border border-[#D4AF37]/40 rounded-2xl sm:rounded-3xl text-center space-y-6 shadow-xl dark:shadow-[0_0_60px_rgba(212,175,55,0.12)] max-w-xl mx-auto box-border"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>

              <div className="space-y-2">
                <h2 className="font-serif-display text-4xl sm:text-6xl font-light uppercase text-[#111111] dark:text-white tracking-tight">
                  THANK YOU
                </h2>
                <p className="font-jost text-lg sm:text-xl text-[#111111]/90 dark:text-white/90 font-medium">
                  We've received your request.
                </p>
                <p className="font-jost text-base sm:text-lg text-[#555555] dark:text-white/70 font-normal">
                  Our team will contact you soon.
                </p>
              </div>

              <div className="inline-block px-5 py-2.5 rounded-xl bg-[#F5F2EC] dark:bg-[#151412] border border-black/10 dark:border-white/15 text-[#D4AF37] font-mono text-sm sm:text-base font-bold tracking-wider">
                Enquiry Reference: {referenceNumber}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#D4AF37] text-black font-jost font-bold text-xs uppercase tracking-wider hover:bg-[#FFEC69] transition-all shadow-md text-center min-h-[48px] flex items-center justify-center"
                >
                  RETURN TO HOMEPAGE →
                </Link>
                <button
                  onClick={() => {
                    setStatus("idle");
                    setCurrentStep(1);
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-black/20 dark:border-white/20 text-[#111111] dark:text-white font-jost font-bold text-xs uppercase tracking-wider hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all text-center min-h-[48px] flex items-center justify-center"
                >
                  SUBMIT ANOTHER ENQUIRY
                </button>
              </div>
            </motion.div>
          ) : (
            /* SHORT TWO-STEP ENQUIRY FORM */
            <div className="space-y-6 box-border">
              {/* STEP PROGRESS HEADER */}
              <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all ${
                      currentStep === 1
                        ? "bg-[#D4AF37] text-black shadow-md"
                        : "bg-black/5 dark:bg-white/5 text-[#111111]/70 dark:text-white/70 hover:text-[#D4AF37]"
                    }`}
                  >
                    <span>1. ESSENTIAL DETAILS *</span>
                  </button>
                  <button
                    type="button"
                    onClick={goToStep2}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all ${
                      currentStep === 2
                        ? "bg-[#D4AF37] text-black shadow-md"
                        : "bg-black/5 dark:bg-white/5 text-[#111111]/70 dark:text-white/70 hover:text-[#D4AF37]"
                    }`}
                  >
                    <span>2. SCOPE &amp; BUDGET (OPTIONAL)</span>
                  </button>
                </div>
                <span className="text-xs font-mono font-semibold text-[#D4AF37] hidden sm:inline-block">
                  STEP {currentStep} OF 2
                </span>
              </div>

              {/* ERROR ALERT */}
              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-300 text-xs sm:text-sm font-jost flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-500 dark:text-red-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-[#0B0A09] border border-black/10 dark:border-white/12 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 space-y-6 sm:space-y-8 shadow-xl dark:shadow-[0_20px_80px_rgba(0,0,0,0.6)] box-border w-full"
              >
                {/* STEP 1: ESSENTIAL REQUIRED FIELDS */}
                {currentStep === 1 && (
                  <div className="space-y-6 box-border">
                    <div className="border-b border-black/10 dark:border-white/10 pb-3">
                      <span className="font-jost text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                        STEP 1 OF 2 · ESSENTIAL ENQUIRY DETAILS
                      </span>
                      <h2 className="font-serif-display text-2xl sm:text-3xl text-[#111111] dark:text-white uppercase font-light mt-1">
                        EVENT <span className="text-[#D4AF37]">CORE INFO</span>
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-jost text-sm box-border w-full">
                      {/* 1. FULL NAME * */}
                      <div className="space-y-1.5 w-full box-border">
                        <label className="block text-[#111111]/80 dark:text-white/90 font-jost font-semibold uppercase text-xs tracking-wider">
                          FULL NAME *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          placeholder="e.g. Sarah Al-Maktoum"
                          value={formData.fullName}
                          onChange={handleTextChange}
                          required
                          className="w-full h-[48px] bg-[#FAF8F5] dark:bg-[#141312] border border-black/15 dark:border-white/15 rounded-xl px-4 py-3 text-[#111111] dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 text-sm sm:text-base transition-all box-border"
                        />
                      </div>

                      {/* 2. PHONE / WHATSAPP * */}
                      <div className="space-y-1.5 w-full box-border">
                        <label className="block text-[#111111]/80 dark:text-white/90 font-jost font-semibold uppercase text-xs tracking-wider">
                          PHONE / WHATSAPP *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="+971 50 123 4567"
                          value={formData.phone}
                          onChange={handleTextChange}
                          required
                          className="w-full h-[48px] bg-[#FAF8F5] dark:bg-[#141312] border border-black/15 dark:border-white/15 rounded-xl px-4 py-3 text-[#111111] dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 text-sm sm:text-base transition-all box-border"
                        />
                      </div>

                      {/* 3. EVENT TYPE * */}
                      <div className="space-y-1.5 w-full box-border">
                        <label className="block text-[#111111]/80 dark:text-white/90 font-jost font-semibold uppercase text-xs tracking-wider">
                          EVENT TYPE *
                        </label>
                        <select
                          name="eventType"
                          value={formData.eventType}
                          onChange={handleTextChange}
                          required
                          className="w-full h-[48px] bg-[#FAF8F5] dark:bg-[#141312] border border-black/15 dark:border-white/15 rounded-xl px-4 py-3 text-[#111111] dark:text-white outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 text-sm sm:text-base transition-all box-border cursor-pointer"
                        >
                          <option value="" disabled className="bg-white dark:bg-[#0F0E0D] text-black/50 dark:text-white/50">
                            Select event type *
                          </option>
                          {EVENT_TYPES.map((t) => (
                            <option key={t} value={t} className="bg-white dark:bg-[#0F0E0D] text-[#111111] dark:text-white">
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* 4. CITY / EVENT LOCATION * */}
                      <div className="space-y-1.5 w-full box-border">
                        <label className="block text-[#111111]/80 dark:text-white/90 font-jost font-semibold uppercase text-xs tracking-wider">
                          CITY / EVENT LOCATION *
                        </label>
                        <input
                          type="text"
                          name="location"
                          placeholder="e.g. Dubai, Gurgaon, Mumbai, London"
                          value={formData.location}
                          onChange={handleTextChange}
                          required
                          className="w-full h-[48px] bg-[#FAF8F5] dark:bg-[#141312] border border-black/15 dark:border-white/15 rounded-xl px-4 py-3 text-[#111111] dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 text-sm sm:text-base transition-all box-border"
                        />
                      </div>

                      {/* 5. EVENT DATE * */}
                      <div className="md:col-span-2 space-y-1.5 w-full box-border">
                        <label className="block text-[#111111]/80 dark:text-white/90 font-jost font-semibold uppercase text-xs tracking-wider">
                          EVENT DATE *
                        </label>
                        <input
                          type="date"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleTextChange}
                          required
                          className="w-full h-[48px] bg-[#FAF8F5] dark:bg-[#141312] border border-black/15 dark:border-white/15 rounded-xl px-4 py-3 text-[#111111] dark:text-white outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 text-sm sm:text-base transition-all box-border cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* STEP 1 NAVIGATION CTAS */}
                    <div className="pt-4 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={goToStep2}
                        className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-black/20 dark:border-white/20 text-[#111111] dark:text-white font-jost font-bold text-xs uppercase tracking-wider hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all text-center min-h-[48px] flex items-center justify-center gap-2"
                      >
                        <span>ADD SCOPE &amp; BUDGET (OPTIONAL STEP 2) →</span>
                      </button>

                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#D4AF37] text-black font-jost font-bold text-xs uppercase tracking-wider hover:bg-[#FFEC69] transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 min-h-[48px]"
                      >
                        {status === "submitting" ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-black" />
                            <span>SUBMITTING...</span>
                          </>
                        ) : (
                          <span>SUBMIT EVENT REQUEST NOW →</span>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: OPTIONAL DETAILS */}
                {currentStep === 2 && (
                  <div className="space-y-6 box-border">
                    <div className="border-b border-black/10 dark:border-white/10 pb-3 flex items-center justify-between">
                      <div>
                        <span className="font-jost text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                          STEP 2 OF 2 · OPTIONAL SCOPE &amp; BUDGET
                        </span>
                        <h2 className="font-serif-display text-2xl sm:text-3xl text-[#111111] dark:text-white uppercase font-light mt-1">
                          EVENT <span className="text-[#D4AF37]">SCOPE &amp; BUDGET</span>
                        </h2>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="text-xs font-jost font-bold text-[#D4AF37] hover:underline uppercase"
                      >
                        ← EDIT STEP 1
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-jost text-sm box-border w-full">
                      {/* EXPECTED GUESTS (OPTIONAL - BLANK DEFAULT) */}
                      <div className="space-y-1.5 w-full box-border">
                        <label className="block text-[#111111]/80 dark:text-white/90 font-jost font-semibold uppercase text-xs tracking-wider">
                          EXPECTED GUESTS (OPTIONAL)
                        </label>
                        <select
                          name="guestCountRange"
                          value={formData.guestCountRange}
                          onChange={handleTextChange}
                          className="w-full h-[48px] bg-[#FAF8F5] dark:bg-[#141312] border border-black/15 dark:border-white/15 rounded-xl px-4 py-3 text-[#111111] dark:text-white outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 text-sm sm:text-base transition-all box-border cursor-pointer"
                        >
                          <option value="" className="bg-white dark:bg-[#0F0E0D] text-black/50 dark:text-white/50">
                            Select expected guests (optional)
                          </option>
                          {GUEST_RANGES.map((g) => (
                            <option key={g} value={g} className="bg-white dark:bg-[#0F0E0D] text-[#111111] dark:text-white">
                              {g}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* EMAIL ADDRESS (OPTIONAL) */}
                      <div className="space-y-1.5 w-full box-border">
                        <label className="block text-[#111111]/80 dark:text-white/90 font-jost font-semibold uppercase text-xs tracking-wider">
                          WORK EMAIL ADDRESS (OPTIONAL)
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="sarah@brand.com"
                          value={formData.email}
                          onChange={handleTextChange}
                          className="w-full h-[48px] bg-[#FAF8F5] dark:bg-[#141312] border border-black/15 dark:border-white/15 rounded-xl px-4 py-3 text-[#111111] dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 text-sm sm:text-base transition-all box-border"
                        />
                      </div>

                      {/* COMPANY / BRAND (OPTIONAL) */}
                      <div className="md:col-span-2 space-y-1.5 w-full box-border">
                        <label className="block text-[#111111]/80 dark:text-white/90 font-jost font-semibold uppercase text-xs tracking-wider">
                          COMPANY / BRAND / ORGANIZATION (OPTIONAL)
                        </label>
                        <input
                          type="text"
                          name="company"
                          placeholder="e.g. Luxury Couture Ltd"
                          value={formData.company}
                          onChange={handleTextChange}
                          className="w-full h-[48px] bg-[#FAF8F5] dark:bg-[#141312] border border-black/15 dark:border-white/15 rounded-xl px-4 py-3 text-[#111111] dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 text-sm sm:text-base transition-all box-border"
                        />
                      </div>

                      {/* BUDGET CURRENCY & BUDGET RANGE (INDEPENDENT) */}
                      <div className="md:col-span-2 space-y-1.5 box-border w-full">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 box-border w-full">
                          <div className="space-y-1.5 sm:col-span-1 box-border">
                            <label className="block text-[#111111]/80 dark:text-white/90 font-jost font-semibold uppercase text-xs tracking-wider">
                              CURRENCY
                            </label>
                            <select
                              name="budgetCurrency"
                              value={formData.budgetCurrency}
                              onChange={(e) => setFormData((prev) => ({ ...prev, budgetCurrency: e.target.value }))}
                              className="w-full h-[48px] bg-[#FAF8F5] dark:bg-[#141312] border border-black/15 dark:border-white/15 rounded-xl px-4 py-3 text-[#111111] dark:text-white outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 text-sm sm:text-base transition-all box-border cursor-pointer"
                            >
                              {CURRENCIES.map((c) => (
                                <option key={c.code} value={c.code} className="bg-white dark:bg-[#0F0E0D] text-[#111111] dark:text-white">
                                  {c.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="space-y-1.5 sm:col-span-2 box-border">
                            <label className="block text-[#111111]/80 dark:text-white/90 font-jost font-semibold uppercase text-xs tracking-wider">
                              BUDGET RANGE ({formData.budgetCurrency}) (OPTIONAL)
                            </label>
                            <select
                              name="budgetRange"
                              value={formData.budgetRange}
                              onChange={handleTextChange}
                              className="w-full h-[48px] bg-[#FAF8F5] dark:bg-[#141312] border border-black/15 dark:border-white/15 rounded-xl px-4 py-3 text-[#111111] dark:text-white outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 text-sm sm:text-base transition-all box-border cursor-pointer"
                            >
                              <option value="" className="bg-white dark:bg-[#0F0E0D] text-black/50 dark:text-white/50">
                                Select budget range (optional)
                              </option>
                              <option value="TO BE DISCUSSED" className="bg-white dark:bg-[#0F0E0D] text-[#D4AF37] font-bold">
                                TO BE DISCUSSED
                              </option>
                              {(BUDGET_RANGES_BY_CURRENCY[formData.budgetCurrency] || BUDGET_RANGES_BY_CURRENCY["AED"]).map((b) => (
                                <option key={b} value={b} className="bg-white dark:bg-[#0F0E0D] text-[#111111] dark:text-white">
                                  {b}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* SERVICES YOU NEED (MULTI-SELECT OPTIONAL) */}
                      <div className="md:col-span-2 space-y-2 pt-1 box-border w-full">
                        <label className="block text-[#111111]/80 dark:text-white/90 font-jost font-semibold uppercase text-xs tracking-wider">
                          SERVICES YOU NEED (MULTI-SELECT OPTIONAL)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 box-border w-full">
                          {SERVICE_OPTIONS.map((srv) => {
                            const selected = formData.servicesRequested.includes(srv);
                            return (
                              <button
                                type="button"
                                key={srv}
                                onClick={() => toggleService(srv)}
                                className={`min-h-[44px] px-3 py-2 rounded-xl border text-left font-jost text-xs font-medium transition-all flex items-center justify-between box-border w-full ${
                                  selected
                                    ? "bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37] font-semibold"
                                    : "bg-white dark:bg-[#141312] border-black/10 dark:border-white/15 text-[#111111] dark:text-white/80 hover:border-black dark:hover:border-white/30"
                                }`}
                              >
                                <span className="truncate pr-1">{srv}</span>
                                {selected && <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* ADDITIONAL REQUIREMENTS / BRIEF */}
                      <div className="md:col-span-2 space-y-1.5 pt-1 box-border w-full">
                        <label className="block text-[#111111]/80 dark:text-white/90 font-jost font-semibold uppercase text-xs tracking-wider">
                          EVENT BRIEF &amp; ADDITIONAL REQUIREMENTS (OPTIONAL)
                        </label>
                        <textarea
                          name="additionalRequirements"
                          rows={3}
                          placeholder="What is your vision for the event, key deliverables, special constraints or preferences..."
                          value={formData.additionalRequirements}
                          onChange={handleTextChange}
                          className="w-full bg-[#FAF8F5] dark:bg-[#141312] border border-black/15 dark:border-white/15 rounded-xl p-4 text-[#111111] dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 text-sm sm:text-base leading-relaxed box-border resize-y min-h-[90px]"
                        />
                      </div>
                    </div>

                    {/* CONSENT & SUBMIT STEP 2 FOOTER */}
                    <div className="border-t border-black/10 dark:border-white/10 pt-6 space-y-6 box-border w-full">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="consent"
                          checked={formData.consent}
                          onChange={(e) => setFormData((prev) => ({ ...prev, consent: e.target.checked }))}
                          className="mt-1 w-4 h-4 accent-[#D4AF37] rounded cursor-pointer shrink-0"
                        />
                        <label htmlFor="consent" className="text-xs text-[#111111]/80 dark:text-white/80 font-jost cursor-pointer leading-relaxed">
                          I agree that FashAI Universal may contact me regarding this event enquiry. Refer to our{" "}
                          <Link href="/privacy" className="text-[#D4AF37] underline">
                            Privacy Policy
                          </Link>{" "}
                          and{" "}
                          <Link href="/terms" className="text-[#D4AF37] underline">
                            Terms of Service
                          </Link>
                          .
                        </label>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(1)}
                          className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-black/20 dark:border-white/20 text-[#111111] dark:text-white font-jost font-bold text-xs uppercase tracking-wider hover:border-[#D4AF37] transition-all text-center min-h-[48px] flex items-center justify-center"
                        >
                          ← BACK TO STEP 1
                        </button>

                        <button
                          type="submit"
                          disabled={status === "submitting"}
                          className="w-full sm:w-auto px-8 sm:px-10 py-3.5 rounded-xl bg-[#D4AF37] text-black font-jost font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#FFEC69] transition-all shadow-xl flex items-center justify-center gap-2.5 disabled:opacity-50 min-h-[48px] box-border"
                        >
                          {status === "submitting" ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-black" />
                              <span>SUBMITTING ENQUIRY...</span>
                            </>
                          ) : (
                            <span>SUBMIT EVENT REQUEST →</span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
