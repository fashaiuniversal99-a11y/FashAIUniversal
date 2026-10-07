"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle, AlertCircle, FileText, Send } from "lucide-react";
import { LIFESTYLE_2026 } from "@/data/lifestyle-event";
import { trackEvent } from "@/lib/analytics/tracker";

interface SponsorshipModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "DECK" | "ENQUIRY";
}

export default function SponsorshipModal({
  isOpen,
  onClose,
  initialMode = "DECK",
}: SponsorshipModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    sponsorshipInterest: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Reset form status when modal opens & emit form_start
  useEffect(() => {
    if (isOpen) {
      setStatus("idle");
      setErrorMessage("");
      trackEvent("sponsorship_form_start", { mode: initialMode, location: "lifestyle_2026" });
    }
  }, [isOpen, initialMode]);

  // Handle ESC key to close modal
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    // Validate required fields
    if (!formData.fullName.trim() || !formData.company.trim() || !formData.email.trim()) {
      setStatus("error");
      setErrorMessage("Please complete all required fields (Full Name, Company/Brand, Email).");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("/api/event-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          company: formData.company.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || undefined,
          additionalRequirements: formData.sponsorshipInterest.trim() || undefined,
          source: "LIFESTYLE_2026_SPONSORSHIP",
          eventName: "Lifestyle 2026 Sponsorship",
          eventTypes: ["SPONSORSHIP"],
          consent: true,
        }),
      });

      const data = await response.json();

      if (response.ok && (data.success || data.id || data.referenceNumber)) {
        setStatus("success");
        trackEvent("sponsorship_form_submit", { mode: initialMode, ref_num: data.referenceNumber });
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Failed to submit sponsorship enquiry. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 dark:bg-black/90 backdrop-blur-md"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl bg-white dark:bg-[#0F0E0D] border border-black/10 dark:border-[#D4AF37]/30 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl text-[#111111] dark:text-white my-auto z-10 select-none overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sponsor-modal-title"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-[#111111] dark:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="mb-6 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="font-jost text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                SPONSORSHIP ENQUIRY
              </span>
            </div>
            <h2
              id="sponsor-modal-title"
              className="font-serif-display text-2xl sm:text-3xl md:text-4xl font-light uppercase tracking-tight"
            >
              SPONSOR LIFESTYLE <span className="italic text-[#D4AF37] font-normal">2026</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#555555] dark:text-white/70 font-light leading-relaxed">
              Submit a sponsorship enquiry for LifeStyle 2026 (Dubai · Date: TO BE ANNOUNCED). Sponsorship materials can be shared following enquiry evaluation.
            </p>
          </div>

          {/* Form / Success State */}
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 text-center py-4"
            >
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center mx-auto text-[#D4AF37]">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif-display text-2xl sm:text-3xl uppercase font-light">
                  THANK YOU
                </h3>
                <p className="font-sans text-sm sm:text-base text-[#333333] dark:text-white/90 font-normal">
                  We&apos;ve received your sponsorship enquiry.
                </p>
                <p className="font-sans text-xs sm:text-sm text-[#666666] dark:text-white/70 font-light">
                  Our team will evaluate your request and contact you with sponsorship details.
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-[#D4AF37] hover:bg-[#FFEC69] text-[#111111] font-bold border border-[#D4AF37] py-3.5 rounded-full font-jost text-xs tracking-wider uppercase transition-all duration-300 shadow-md"
              >
                CLOSE
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {status === "error" && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-sans flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Required: Full Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="sponsor-fullName"
                  className="block text-[11px] font-jost font-bold uppercase tracking-wider text-[#444444] dark:text-white/80"
                >
                  FULL NAME <span className="text-[#D4AF37]">*</span>
                </label>
                <input
                  type="text"
                  id="sponsor-fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your Full Name"
                  className="w-full bg-[#FAF8F5] dark:bg-[#181715] border border-black/15 dark:border-white/15 px-4 py-3 text-xs sm:text-sm text-[#111111] dark:text-white placeholder-[#888888] dark:placeholder-white/40 rounded-xl focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-colors"
                />
              </div>

              {/* Required: Company / Brand */}
              <div className="space-y-1.5">
                <label
                  htmlFor="sponsor-company"
                  className="block text-[11px] font-jost font-bold uppercase tracking-wider text-[#444444] dark:text-white/80"
                >
                  COMPANY / BRAND <span className="text-[#D4AF37]">*</span>
                </label>
                <input
                  type="text"
                  id="sponsor-company"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Brand or Organization Name"
                  className="w-full bg-[#FAF8F5] dark:bg-[#181715] border border-black/15 dark:border-white/15 px-4 py-3 text-xs sm:text-sm text-[#111111] dark:text-white placeholder-[#888888] dark:placeholder-white/40 rounded-xl focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-colors"
                />
              </div>

              {/* Required: Email */}
              <div className="space-y-1.5">
                <label
                  htmlFor="sponsor-email"
                  className="block text-[11px] font-jost font-bold uppercase tracking-wider text-[#444444] dark:text-white/80"
                >
                  EMAIL ADDRESS <span className="text-[#D4AF37]">*</span>
                </label>
                <input
                  type="email"
                  id="sponsor-email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="w-full bg-[#FAF8F5] dark:bg-[#181715] border border-black/15 dark:border-white/15 px-4 py-3 text-xs sm:text-sm text-[#111111] dark:text-white placeholder-[#888888] dark:placeholder-white/40 rounded-xl focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-colors"
                />
              </div>

              {/* Optional: Phone / WhatsApp */}
              <div className="space-y-1.5">
                <label
                  htmlFor="sponsor-phone"
                  className="block text-[11px] font-jost font-bold uppercase tracking-wider text-[#666666] dark:text-white/60"
                >
                  PHONE / WHATSAPP <span className="text-xs font-normal text-[#888888] dark:text-white/40">(OPTIONAL)</span>
                </label>
                <input
                  type="tel"
                  id="sponsor-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+971 00 000 0000"
                  className="w-full bg-[#FAF8F5] dark:bg-[#181715] border border-black/15 dark:border-white/15 px-4 py-3 text-xs sm:text-sm text-[#111111] dark:text-white placeholder-[#888888] dark:placeholder-white/40 rounded-xl focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-colors"
                />
              </div>

              {/* Optional: Sponsorship Interest / Requirements */}
              <div className="space-y-1.5">
                <label
                  htmlFor="sponsor-interest"
                  className="block text-[11px] font-jost font-bold uppercase tracking-wider text-[#666666] dark:text-white/60"
                >
                  SPONSORSHIP INTEREST / REQUIREMENTS <span className="text-xs font-normal text-[#888888] dark:text-white/40">(OPTIONAL)</span>
                </label>
                <textarea
                  id="sponsor-interest"
                  name="sponsorshipInterest"
                  rows={3}
                  value={formData.sponsorshipInterest}
                  onChange={handleChange}
                  placeholder="Title sponsorship, runway presenting partner, VIP lounge, digital branding..."
                  className="w-full bg-[#FAF8F5] dark:bg-[#181715] border border-black/15 dark:border-white/15 px-4 py-3 text-xs sm:text-sm text-[#111111] dark:text-white placeholder-[#888888] dark:placeholder-white/40 rounded-xl focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full min-h-[48px] bg-[#D4AF37] hover:bg-[#FFEC69] text-[#111111] font-bold border border-[#D4AF37] py-3.5 rounded-full font-jost text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>SUBMITTING REQUEST...</span>
                    </>
                  ) : (
                    <>
                      <span>SUBMIT SPONSORSHIP ENQUIRY</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
