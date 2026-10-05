"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import GradientFlowText from "../ui/GradientFlowText";
import SubmitSuccessExpand from "../ui/SubmitSuccessExpand";
import OfficeLocations from "./OfficeLocations";
import { trackEngagementEvent } from "@/lib/concierge/preferences";

interface ContactSectionProps {
  showOfficeLocations?: boolean;
}

function ContactContent({ showOfficeLocations = false }: ContactSectionProps) {
  const searchParams = useSearchParams();
  const initialType = searchParams?.get("type") || "Registration";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    organization: "",
    role: "",
    enquiryType: initialType,
    eventInterest: "LifeStyle 2026",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Requirement 9: Track form_opened
    trackEngagementEvent("form_opened", { formId: "contact_enquiry" });

    if (searchParams?.get("type")) {
      const typeParam = searchParams.get("type")!;
      setFormData((prev) => ({ ...prev, enquiryType: typeParam }));
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (!hasStarted) {
      setHasStarted(true);
      // Requirement 9: Track form_started
      trackEngagementEvent("form_started", { formId: "contact_enquiry" });
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    // Requirement 9: Track form_submitted
    trackEngagementEvent("form_submitted", { formId: "contact_enquiry" });

    // Client side email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      trackEngagementEvent("form_submission_error", {
        formId: "contact_enquiry",
        reason: "invalid_email",
      });
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        // Requirement 9: Track form_submission_success
        trackEngagementEvent("form_submission_success", {
          formId: "contact_enquiry",
          enquiryType: formData.enquiryType,
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          country: "",
          city: "",
          organization: "",
          role: "",
          enquiryType: "Registration",
          eventInterest: "LifeStyle 2026",
          message: "",
        });
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Failed to submit enquiry. Please try again.");
        trackEngagementEvent("form_submission_error", {
          formId: "contact_enquiry",
          status: response.status,
        });
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
      trackEngagementEvent("form_submission_error", {
        formId: "contact_enquiry",
        reason: "network_error",
      });
    }
  };

  return (
    <section id="contact" className="relative py-8 sm:py-12 md:py-14 bg-brand-void border-b border-hairline-orange overflow-hidden">
      <div className="container-editorial relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-6 sm:mb-8">
          <div className="flex items-center gap-3 text-xs sm:text-sm font-syne tracking-micro text-[#D4AF37] font-bold uppercase mb-3">
            <span className="h-px w-8 bg-[#D4AF37]" />
            <span>CONTACT &amp; ENQUIRIES</span>
          </div>
          <h2 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-light text-brand-white uppercase mb-4">
            LET&apos;S CREATE THE <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FFEC69] font-normal">NEXT CHAPTER.</span>
          </h2>
          <p className="font-sans text-lg sm:text-xl text-brand-platinum/90 font-light leading-relaxed">
            For registrations, sponsorships, talent, press, brand partnerships and event participation across the FashAI Universal platform, submit an enquiry to the FashAI Universal team.
          </p>
        </div>

        {/* Office Locations Section */}
        {showOfficeLocations && (
          <div className="mb-8 sm:mb-10">
            <OfficeLocations showHeading={true} />
          </div>
        )}

        {/* Single Centered Professional Enquiry Form Container */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#0B0908]/90 border border-[#D4AF37]/30 p-8 sm:p-12 shadow-2xl rounded-3xl"
          >
            <h3 className="font-serif-display text-2xl sm:text-4xl text-brand-white uppercase font-light mb-8 border-b border-white/10 pb-4">
              SUBMIT AN ENQUIRY
            </h3>

            {/* Requirement 8: Thank-You State */}
            <SubmitSuccessExpand show={status === "success"}>
              <div className="bg-brand-green/10 border border-brand-green/40 p-8 text-center space-y-4 rounded-2xl">
                <CheckCircle className="w-12 h-12 text-brand-green mx-auto" />
                <h4 className="font-serif-display text-3xl sm:text-4xl text-brand-white font-light uppercase">
                  THANK YOU
                </h4>
                <p className="font-sans text-base text-brand-platinum font-normal leading-relaxed max-w-md mx-auto">
                  We&apos;ve received your request.
                </p>
                <p className="font-sans text-sm text-brand-platinum/80 font-light leading-relaxed max-w-md mx-auto">
                  Our team will contact you soon. We&apos;ll review your request and get back to you shortly.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="bg-[#D4AF37] hover:bg-[#FFEC69] text-[#111111] font-bold border border-[#D4AF37] px-8 py-3 rounded-full text-xs font-syne tracking-wider uppercase transition-colors shadow-md mt-2"
                >
                  <span>SEND ANOTHER ENQUIRY</span>
                </button>
              </div>
            </SubmitSuccessExpand>

            {status !== "success" && (
              <form onSubmit={handleSubmit} className="space-y-6">
                {status === "error" && (
                  <div className="bg-red-500/10 border border-red-500/40 p-4 text-xs font-sans text-red-200 flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* 2-Column Form Grid on Desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* FULL NAME * */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-[11px] font-syne tracking-caps text-brand-platinum uppercase font-bold">
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Full Name"
                      className="w-full bg-brand-void border border-white/20 px-4 py-3 text-sm text-brand-white placeholder-brand-platinum/40 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* EMAIL * */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-[11px] font-syne tracking-caps text-brand-platinum uppercase font-bold">
                      EMAIL *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      className="w-full bg-brand-void border border-white/20 px-4 py-3 text-sm text-brand-white placeholder-brand-platinum/40 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* PHONE / WHATSAPP */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-[11px] font-syne tracking-caps text-brand-platinum uppercase font-bold">
                      PHONE / WHATSAPP
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 00000 00000"
                      className="w-full bg-brand-void border border-white/20 px-4 py-3 text-sm text-brand-white placeholder-brand-platinum/40 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* COUNTRY */}
                  <div className="space-y-2">
                    <label htmlFor="country" className="block text-[11px] font-syne tracking-caps text-brand-platinum uppercase font-bold">
                      COUNTRY
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="e.g. United Arab Emirates, India"
                      className="w-full bg-brand-void border border-white/20 px-4 py-3 text-sm text-brand-white placeholder-brand-platinum/40 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* CITY */}
                  <div className="space-y-2">
                    <label htmlFor="city" className="block text-[11px] font-syne tracking-caps text-brand-platinum uppercase font-bold">
                      CITY
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g. Dubai, Mumbai, London"
                      className="w-full bg-brand-void border border-white/20 px-4 py-3 text-sm text-brand-white placeholder-brand-platinum/40 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* ORGANIZATION / BRAND */}
                  <div className="space-y-2">
                    <label htmlFor="organization" className="block text-[11px] font-syne tracking-caps text-brand-platinum uppercase font-bold">
                      ORGANIZATION / BRAND
                    </label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="Company or Brand Name"
                      className="w-full bg-brand-void border border-white/20 px-4 py-3 text-sm text-brand-white placeholder-brand-platinum/40 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* YOUR ROLE */}
                  <div className="space-y-2">
                    <label htmlFor="role" className="block text-[11px] font-syne tracking-caps text-brand-platinum uppercase font-bold">
                      YOUR ROLE
                    </label>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      placeholder="e.g. Designer, Founder, Delegate"
                      className="w-full bg-brand-void border border-white/20 px-4 py-3 text-sm text-brand-white placeholder-brand-platinum/40 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* ENQUIRY TYPE * */}
                  <div className="space-y-2">
                    <label htmlFor="enquiryType" className="block text-[11px] font-syne tracking-caps text-brand-platinum uppercase font-bold">
                      ENQUIRY TYPE *
                    </label>
                    <select
                      id="enquiryType"
                      name="enquiryType"
                      required
                      value={formData.enquiryType}
                      onChange={handleChange}
                      className="w-full bg-brand-void border border-white/20 px-4 py-3 text-sm text-brand-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-colors"
                    >
                      <option value="Registration">Registration</option>
                      <option value="Sponsorship">Sponsorship</option>
                      <option value="Designer Participation">Designer Participation</option>
                      <option value="Model / Talent">Model / Talent</option>
                      <option value="Media / Press">Media / Press</option>
                      <option value="Partnership">Partnership</option>
                      <option value="General Enquiry">General Enquiry</option>
                    </select>
                  </div>

                  {/* EVENT INTEREST * */}
                  <div className="space-y-2 sm:col-span-2">
                    <label htmlFor="eventInterest" className="block text-[11px] font-syne tracking-caps text-brand-platinum uppercase font-bold">
                      EVENT INTEREST *
                    </label>
                    <select
                      id="eventInterest"
                      name="eventInterest"
                      required
                      value={formData.eventInterest}
                      onChange={handleChange}
                      className="w-full bg-brand-void border border-white/20 px-4 py-3 text-sm text-brand-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-colors"
                    >
                      <option value="LifeStyle 2026">LifeStyle 2026 (Dubai · Date To Be Announced)</option>
                      <option value="Runway">Runway Presentation</option>
                      <option value="LifeStyle 2025">LifeStyle 2025 Archive</option>
                      <option value="General / Other">General / Other Platform Initiatives</option>
                    </select>
                  </div>
                </div>

                {/* MESSAGE * */}
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-[11px] font-syne tracking-caps text-brand-platinum uppercase font-bold">
                    MESSAGE *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your interest or enquiry..."
                    className="w-full bg-brand-void border border-white/20 px-4 py-3 text-sm text-brand-white placeholder-brand-platinum/40 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-[#D4AF37] hover:bg-[#FFEC69] text-[#111111] font-bold border border-[#D4AF37] py-4 rounded-full font-syne text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>SENDING ENQUIRY...</span>
                    </>
                  ) : (
                    <span>SEND ENQUIRY →</span>
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default function ContactSection({ showOfficeLocations = false }: ContactSectionProps) {
  return (
    <Suspense fallback={<div className="py-24 bg-brand-void text-center text-brand-platinum">Loading Contact Form...</div>}>
      <ContactContent showOfficeLocations={showOfficeLocations} />
    </Suspense>
  );
}
