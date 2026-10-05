"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle, AlertCircle, Sparkles, Calendar, Building, Mail, User, Phone, Send } from "lucide-react";
import GradientFlowText from "../ui/GradientFlowText";
import SubmitSuccessExpand from "../ui/SubmitSuccessExpand";

export default function CreateEventSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    enquiryType: "Event / Event Management",
    eventInterest: "Q4 2026 / Flexible",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    // Client-side quick check
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please fill in all required fields (*).");
      return;
    }

    if (formData.message.trim().length < 10) {
      setStatus("error");
      setErrorMessage("Please provide a brief requirement (minimum 10 characters).");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          organization: formData.organization,
          enquiryType: formData.enquiryType,
          eventInterest: formData.eventInterest || "Custom Event Requirement",
          message: formData.message,
          source: "CREATE_EVENT_SECTION",
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          organization: "",
          enquiryType: "Event / Event Management",
          eventInterest: "Q4 2026 / Flexible",
          message: "",
        });
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Failed to submit enquiry. Please check your information.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  return (
    <section
      id="create-event"
      className="relative pt-5 sm:pt-7 lg:pt-8 pb-10 sm:pb-14 bg-black text-brand-white border-b border-white/10 select-none overflow-hidden"
    >
      {/* Background Subtle Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[350px] bg-brand-yellow-golden/5 rounded-full blur-[120px]" />
      </div>

      <div className="container-editorial relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-yellow-golden/10 border border-brand-yellow-golden/30 text-xs sm:text-sm font-syne font-bold tracking-wider text-brand-yellow-golden uppercase">
            <Sparkles className="w-3.5 h-3.5 text-brand-yellow-golden" />
            <span>BESPOKE EVENT INQUIRY</span>
          </div>

          <h2 className="font-serif-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-brand-white uppercase leading-tight tracking-tight">
            CREATE YOUR <span className="font-serif italic font-normal text-brand-yellow-golden">OWN EVENT</span>
          </h2>

          <p className="font-sans text-base sm:text-lg md:text-xl text-brand-platinum/85 font-light leading-relaxed max-w-2xl mx-auto pt-1">
            Events and talent, handled by one team. Tell us about your event requirement across Dubai and India — our production team will design a customized proposal for your runway show, brand activation, gala, or talent staffing.
          </p>
        </div>

        {/* Short Inquiry Form Container */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#080706] border border-brand-yellow-golden/30 p-5 sm:p-8 md:p-10 rounded-3xl shadow-2xl backdrop-blur-md relative overflow-hidden"
          >
            {/* Top Subtle Border Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-yellow-golden to-transparent" />

            {/* Success State */}
            <SubmitSuccessExpand show={status === "success"}>
              <div className="bg-brand-yellow-golden/10 border border-brand-yellow-golden/40 rounded-2xl p-6 sm:p-8 text-center space-y-4 my-2">
                <CheckCircle className="w-12 h-12 text-brand-yellow-golden mx-auto" />
                <h3 className="font-serif-display text-2xl sm:text-3xl text-brand-white uppercase font-light">
                  INQUIRY RECEIVED
                </h3>
                <p className="font-sans text-sm sm:text-base text-brand-platinum/90 font-light leading-relaxed max-w-md mx-auto">
                  Thank you for creating your event requirement with FashAI Universal. Our event production team will review your details and contact you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="bg-brand-yellow-golden text-black px-7 py-3 text-xs sm:text-sm font-syne tracking-wider font-bold uppercase rounded-full hover:bg-[#FFEC69] transition-all shadow-md mt-2"
                >
                  SEND ANOTHER INQUIRY
                </button>
              </div>
            </SubmitSuccessExpand>

            {/* Inquiry Form */}
            {status !== "success" && (
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                {status === "error" && (
                  <div className="bg-red-500/10 border border-red-500/40 p-4 rounded-xl text-xs sm:text-sm font-sans text-red-200 flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* FULL NAME * */}
                  <div className="space-y-2">
                    <label htmlFor="create-event-name" className="block text-xs font-syne tracking-wider text-brand-platinum uppercase font-bold flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-brand-yellow-golden" />
                      <span>FULL NAME *</span>
                    </label>
                    <input
                      type="text"
                      id="create-event-name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Full Name"
                      className="w-full bg-[#050505] border border-white/15 rounded-xl px-4 py-3 text-sm text-brand-white placeholder-brand-platinum/40 focus:border-brand-yellow-golden focus:ring-1 focus:ring-brand-yellow-golden focus:outline-none transition-colors"
                    />
                  </div>

                  {/* EMAIL * */}
                  <div className="space-y-2">
                    <label htmlFor="create-event-email" className="block text-xs font-syne tracking-wider text-brand-platinum uppercase font-bold flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-brand-yellow-golden" />
                      <span>EMAIL *</span>
                    </label>
                    <input
                      type="email"
                      id="create-event-email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      className="w-full bg-[#050505] border border-white/15 rounded-xl px-4 py-3 text-sm text-brand-white placeholder-brand-platinum/40 focus:border-brand-yellow-golden focus:ring-1 focus:ring-brand-yellow-golden focus:outline-none transition-colors"
                    />
                  </div>

                  {/* CONTACT / PHONE */}
                  <div className="space-y-2">
                    <label htmlFor="create-event-phone" className="block text-xs font-syne tracking-wider text-brand-platinum uppercase font-bold flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-brand-yellow-golden" />
                      <span>CONTACT / PHONE</span>
                    </label>
                    <input
                      type="tel"
                      id="create-event-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 00000 00000 / +971 000000"
                      className="w-full bg-[#050505] border border-white/15 rounded-xl px-4 py-3 text-sm text-brand-white placeholder-brand-platinum/40 focus:border-brand-yellow-golden focus:ring-1 focus:ring-brand-yellow-golden focus:outline-none transition-colors"
                    />
                  </div>

                  {/* INQUIRY TYPE * (DROPDOWN) */}
                  <div className="space-y-2">
                    <label htmlFor="create-event-enquiryType" className="block text-xs font-syne tracking-wider text-brand-platinum uppercase font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-brand-yellow-golden" />
                      <span>INQUIRY TYPE *</span>
                    </label>
                    <select
                      id="create-event-enquiryType"
                      name="enquiryType"
                      required
                      value={formData.enquiryType}
                      onChange={handleChange}
                      className="w-full bg-[#050505] border border-white/15 rounded-xl px-4 py-3 text-sm text-brand-white focus:border-brand-yellow-golden focus:ring-1 focus:ring-brand-yellow-golden focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="Event / Event Management">Event / Event Management</option>
                      <option value="Brand Partnership">Brand Partnership</option>
                      <option value="Sponsor">Sponsor</option>
                      <option value="Talent">Talent</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* COMPANY / BRAND */}
                  <div className="space-y-2">
                    <label htmlFor="create-event-organization" className="block text-xs font-syne tracking-wider text-brand-platinum uppercase font-bold flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-brand-yellow-golden" />
                      <span>COMPANY / BRAND</span>
                    </label>
                    <input
                      type="text"
                      id="create-event-organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="Organization or Brand Name"
                      className="w-full bg-[#050505] border border-white/15 rounded-xl px-4 py-3 text-sm text-brand-white placeholder-brand-platinum/40 focus:border-brand-yellow-golden focus:ring-1 focus:ring-brand-yellow-golden focus:outline-none transition-colors"
                    />
                  </div>

                  {/* PREFERRED DATE / TIMELINE * */}
                  <div className="space-y-2">
                    <label htmlFor="create-event-eventInterest" className="block text-xs font-syne tracking-wider text-brand-platinum uppercase font-bold flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-brand-yellow-golden" />
                      <span>PREFERRED TIMELINE *</span>
                    </label>
                    <input
                      type="text"
                      id="create-event-eventInterest"
                      name="eventInterest"
                      required
                      value={formData.eventInterest}
                      onChange={handleChange}
                      placeholder="e.g. November 2026, Q4 2026, Flexible"
                      className="w-full bg-[#050505] border border-white/15 rounded-xl px-4 py-3 text-sm text-brand-white placeholder-brand-platinum/40 focus:border-brand-yellow-golden focus:ring-1 focus:ring-brand-yellow-golden focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* BRIEF REQUIREMENT * */}
                <div className="space-y-2">
                  <label htmlFor="create-event-message" className="block text-xs font-syne tracking-wider text-brand-platinum uppercase font-bold">
                    BRIEF REQUIREMENT *
                  </label>
                  <textarea
                    id="create-event-message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your event vision, format expectations, scale, location preference, or specific requirements..."
                    className="w-full bg-[#050505] border border-white/15 rounded-xl px-4 py-3 text-sm text-brand-white placeholder-brand-platinum/40 focus:border-brand-yellow-golden focus:ring-1 focus:ring-brand-yellow-golden focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-brand-yellow-golden hover:bg-[#FFEC69] text-black py-4 px-6 rounded-full font-syne text-sm sm:text-base font-bold tracking-wider uppercase transition-all duration-300 shadow-lg flex items-center justify-center gap-2.5 disabled:opacity-50 group cursor-pointer"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      <span>SENDING INQUIRY...</span>
                    </>
                  ) : (
                    <>
                      <GradientFlowText variant="primary" className="text-black font-extrabold tracking-wider">
                        SEND INQUIRY
                      </GradientFlowText>
                      <Send className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform duration-300" />
                    </>
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
