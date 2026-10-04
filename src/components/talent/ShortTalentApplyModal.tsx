"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Loader2, Send } from "lucide-react";
import { trackEngagementEvent } from "@/lib/concierge/preferences";

export interface ShortTalentApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
}

const TALENT_CATEGORIES = [
  { id: "fashion_designer", label: "Fashion Designer" },
  { id: "model", label: "Model" },
  { id: "choreographer", label: "Choreographer" },
  { id: "makeup_artist", label: "Makeup Artist" },
  { id: "fashion_stylist", label: "Fashion Stylist" },
  { id: "influencer_creator", label: "Influencer / Creator" },
  { id: "celebrity_public_figure", label: "Celebrity / Public Figure" },
];

export default function ShortTalentApplyModal({
  isOpen,
  onClose,
  initialCategory = "model",
}: ShortTalentApplyModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    category: initialCategory,
    location: "",
    portfolioUrl: "",
    notes: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        category: initialCategory || "model",
      }));
      setStatus("idle");
      setErrorMessage("");
      setHasStarted(false);

      // Requirement 9: Analytics Tracking - form_opened
      trackEngagementEvent("form_opened", { formId: "short_talent_application" });
    }
  }, [isOpen, initialCategory]);

  if (!isOpen) return null;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (!hasStarted) {
      setHasStarted(true);
      // Requirement 9: Analytics Tracking - form_started
      trackEngagementEvent("form_started", { formId: "short_talent_application" });
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    // Requirement 9: Analytics Tracking - form_submitted
    trackEngagementEvent("form_submitted", { formId: "short_talent_application" });

    // Client-side validation
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setStatus("error");
      setErrorMessage("Please complete all required fields (*).");
      trackEngagementEvent("form_submission_error", {
        formId: "short_talent_application",
        reason: "validation_failed",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      trackEngagementEvent("form_submission_error", {
        formId: "short_talent_application",
        reason: "invalid_email",
      });
      return;
    }

    try {
      const payload = {
        applicationType: formData.category,
        fullName: formData.fullName,
        email: formData.email,
        whatsapp: formData.phone,
        phone: formData.phone,
        cityCountry: formData.location,
        location: formData.location,
        portfolioUrl: formData.portfolioUrl,
        instagramUrl: formData.portfolioUrl,
        notes: formData.notes,
        additionalInfo: formData.notes,
      };

      const response = await fetch("/api/talent-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        // Requirement 9: Analytics Tracking - form_submission_success
        trackEngagementEvent("form_submission_success", {
          formId: "short_talent_application",
          category: formData.category,
        });
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Failed to submit application. Please try again.");
        trackEngagementEvent("form_submission_error", {
          formId: "short_talent_application",
          status: response.status,
        });
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error occurred. Please check your connection and try again.");
      trackEngagementEvent("form_submission_error", {
        formId: "short_talent_application",
        reason: "network_error",
      });
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[500] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.3 }}
          className="relative z-[510] w-full max-w-xl bg-white dark:bg-[#0C0B0A] border border-black/10 dark:border-[#D4AF37]/40 rounded-2xl shadow-2xl p-6 sm:p-8 text-[#111111] dark:text-white space-y-6 my-auto overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
            <div>
              <span className="font-syne text-[11px] sm:text-xs tracking-caps font-bold text-[#D4AF37] uppercase block mb-1">
                FASHAI TALENT NETWORK
              </span>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-light text-[#111111] dark:text-white uppercase tracking-tight">
                APPLY TO JOIN
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/5 hover:bg-[#D4AF37] hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Success State */}
          {status === "success" ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 bg-[#D4AF37]/15 border border-[#D4AF37] rounded-full flex items-center justify-center mx-auto text-[#D4AF37]">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-light uppercase text-[#111111] dark:text-white">
                THANK YOU
              </h3>
              <p className="font-sans text-base text-[#444444] dark:text-brand-platinum/90 font-light leading-relaxed max-w-md mx-auto">
                We&apos;ve received your request. Our team will contact you soon.
              </p>
              <p className="font-sans text-xs text-[#666666] dark:text-white/60">
                We&apos;ll review your request and get back to you shortly.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-8 py-3 bg-[#D4AF37] hover:bg-[#FFEC69] text-[#111111] font-syne font-bold text-xs tracking-caps uppercase rounded-full transition-colors shadow-md"
              >
                DONE
              </button>
            </div>
          ) : (
            /* Short Apply Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {status === "error" && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs font-sans text-red-600 dark:text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Full Name * */}
              <div>
                <label htmlFor="fullName" className="block text-xs font-syne tracking-caps font-bold text-[#333333] dark:text-brand-platinum uppercase mb-1">
                  FULL NAME *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your Full Name"
                  className="w-full bg-black/5 dark:bg-[#151311] border border-black/10 dark:border-white/15 px-4 py-2.5 text-sm text-[#111111] dark:text-white rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                />
              </div>

              {/* Email & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-xs font-syne tracking-caps font-bold text-[#333333] dark:text-brand-platinum uppercase mb-1">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@domain.com"
                    className="w-full bg-black/5 dark:bg-[#151311] border border-black/10 dark:border-white/15 px-4 py-2.5 text-sm text-[#111111] dark:text-white rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-syne tracking-caps font-bold text-[#333333] dark:text-brand-platinum uppercase mb-1">
                    PHONE / WHATSAPP *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+971 50 000 0000"
                    className="w-full bg-black/5 dark:bg-[#151311] border border-black/10 dark:border-white/15 px-4 py-2.5 text-sm text-[#111111] dark:text-white rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Talent Category & City/Location Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-xs font-syne tracking-caps font-bold text-[#333333] dark:text-brand-platinum uppercase mb-1">
                    TALENT CATEGORY *
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-black/5 dark:bg-[#151311] border border-black/10 dark:border-white/15 px-4 py-2.5 text-sm text-[#111111] dark:text-white rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                  >
                    {TALENT_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="location" className="block text-xs font-syne tracking-caps font-bold text-[#333333] dark:text-brand-platinum uppercase mb-1">
                    CITY / LOCATION
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Dubai, UAE / Mumbai, India"
                    className="w-full bg-black/5 dark:bg-[#151311] border border-black/10 dark:border-white/15 px-4 py-2.5 text-sm text-[#111111] dark:text-white rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Portfolio / Instagram / Website */}
              <div>
                <label htmlFor="portfolioUrl" className="block text-xs font-syne tracking-caps font-bold text-[#333333] dark:text-brand-platinum uppercase mb-1">
                  PORTFOLIO / INSTAGRAM / WEBSITE
                </label>
                <input
                  type="url"
                  id="portfolioUrl"
                  name="portfolioUrl"
                  value={formData.portfolioUrl}
                  onChange={handleChange}
                  placeholder="https://instagram.com/yourhandle or portfolio link"
                  className="w-full bg-black/5 dark:bg-[#151311] border border-black/10 dark:border-white/15 px-4 py-2.5 text-sm text-[#111111] dark:text-white rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                />
              </div>

              {/* Short Introduction */}
              <div>
                <label htmlFor="notes" className="block text-xs font-syne tracking-caps font-bold text-[#333333] dark:text-brand-platinum uppercase mb-1">
                  SHORT INTRODUCTION
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Briefly introduce yourself and your creative experience..."
                  className="w-full bg-black/5 dark:bg-[#151311] border border-black/10 dark:border-white/15 px-4 py-2.5 text-sm text-[#111111] dark:text-white rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-[#D4AF37] hover:bg-[#FFEC69] text-[#111111] font-syne font-bold text-xs tracking-caps py-3.5 rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 mt-2"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>SUBMITTING...</span>
                  </>
                ) : (
                  <>
                    <span>APPLY TO JOIN</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
