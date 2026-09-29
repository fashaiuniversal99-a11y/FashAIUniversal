"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

interface ConversationalEnquiryProps {
  initialType: string;
  onComplete: (summaryMessage: string) => void;
  onCancel: () => void;
}

export default function ConversationalEnquiry({
  initialType,
  onComplete,
  onCancel,
}: ConversationalEnquiryProps) {
  const [step, setStep] = useState<"name" | "email" | "org" | "message" | "confirm" | "submitting" | "done">("name");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleNextStep = () => {
    setError(null);
    if (step === "name") {
      if (!name.trim()) {
        setError("Please provide your name.");
        return;
      }
      setStep("email");
    } else if (step === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.trim() || !emailRegex.test(email)) {
        setError("Please enter a valid email address.");
        return;
      }
      setStep("org");
    } else if (step === "org") {
      setStep("message");
    } else if (step === "message") {
      if (!message.trim() || message.length < 10) {
        setError("Please provide a message with at least 10 characters.");
        return;
      }
      setStep("confirm");
    }
  };

  const handleSubmitEnquiry = async () => {
    setStep("submitting");
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          organization: organization.trim(),
          role: role.trim(),
          enquiryType: initialType,
          eventInterest: "LifeStyle 2026",
          message: message.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStep("done");
        onComplete(
          `Thank you ${name}. Your ${initialType} enquiry has been submitted successfully to FashAI Universal. Our team will contact you at ${email}.`
        );
      } else {
        setError(data.error || "Failed to submit enquiry. Please try again.");
        setStep("confirm");
      }
    } catch {
      setError("Network connection issue. Please try submitting again.");
      setStep("confirm");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-5 bg-brand-charcoal/95 border border-[#D4AF37]/50 text-brand-white space-y-4 my-2.5 shadow-2xl rounded-3xl backdrop-blur-xl"
    >
      <div className="flex justify-between items-center border-b border-white/10 pb-2.5">
        <span className="text-[10px] font-jost font-bold text-[#D4AF37] uppercase tracking-wider">
          EVENT CONCIERGE · {initialType.toUpperCase()}
        </span>
        <button
          onClick={onCancel}
          className="text-[10px] font-jost text-brand-platinum hover:text-white uppercase px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-all"
        >
          Cancel
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-2.5 bg-red-950/40 border border-red-500/40 text-red-200 text-xs font-jost rounded-2xl">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      {step === "name" && (
        <div className="space-y-2.5">
          <label className="block text-xs font-jost text-brand-platinum font-semibold">What is your full name? *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className="w-full bg-brand-void border border-white/20 px-4 py-2.5 rounded-2xl text-xs text-brand-white focus:border-[#D4AF37] focus:outline-none"
            autoFocus
            onKeyDown={(e) => e.key === "Enter" && handleNextStep()}
          />
          <button
            onClick={handleNextStep}
            className="w-full bg-[#D4AF37] hover:bg-[#FFEC69] py-2.5 rounded-full text-xs font-jost font-bold text-black uppercase tracking-wider transition-all shadow-md"
          >
            Next →
          </button>
        </div>
      )}

      {step === "email" && (
        <div className="space-y-2.5">
          <label className="block text-xs font-jost text-brand-platinum font-semibold">Best email for response? *</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="w-full bg-brand-void border border-white/20 px-4 py-2.5 rounded-2xl text-xs text-brand-white focus:border-[#D4AF37] focus:outline-none"
            autoFocus
            onKeyDown={(e) => e.key === "Enter" && handleNextStep()}
          />
          <button
            onClick={handleNextStep}
            className="w-full bg-[#D4AF37] hover:bg-[#FFEC69] py-2.5 rounded-full text-xs font-jost font-bold text-black uppercase tracking-wider transition-all shadow-md"
          >
            Next →
          </button>
        </div>
      )}

      {step === "org" && (
        <div className="space-y-2.5">
          <label className="block text-xs font-jost text-brand-platinum font-semibold">Organization / Role (Optional)</label>
          <input
            type="text"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            placeholder="Company or Brand Name"
            className="w-full bg-brand-void border border-white/20 px-4 py-2.5 rounded-2xl text-xs text-brand-white focus:border-[#D4AF37] focus:outline-none mb-1"
          />
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Your Position / Role"
            className="w-full bg-brand-void border border-white/20 px-4 py-2.5 rounded-2xl text-xs text-brand-white focus:border-[#D4AF37] focus:outline-none"
            onKeyDown={(e) => e.key === "Enter" && handleNextStep()}
          />
          <button
            onClick={handleNextStep}
            className="w-full bg-[#D4AF37] hover:bg-[#FFEC69] py-2.5 rounded-full text-xs font-jost font-bold text-black uppercase tracking-wider transition-all shadow-md"
          >
            Next →
          </button>
        </div>
      )}

      {step === "message" && (
        <div className="space-y-2.5">
          <label className="block text-xs font-jost text-brand-platinum font-semibold">Briefly describe your enquiry *</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Details about your event brief, participation, sponsorship, or media enquiry..."
            rows={3}
            className="w-full bg-brand-void border border-white/20 p-3 rounded-2xl text-xs text-brand-white focus:border-[#D4AF37] focus:outline-none"
            autoFocus
          />
          <button
            onClick={handleNextStep}
            className="w-full bg-[#D4AF37] hover:bg-[#FFEC69] py-2.5 rounded-full text-xs font-jost font-bold text-black uppercase tracking-wider transition-all shadow-md"
          >
            Review Submission →
          </button>
        </div>
      )}

      {step === "confirm" && (
        <div className="space-y-3">
          <p className="font-serif italic text-xs text-[#D4AF37]">
            “I will use these details only to process your enquiry with our Event Concierge team. Would you like me to submit them?”
          </p>

          <div className="bg-brand-void p-3 rounded-2xl border border-white/10 text-[11px] font-jost space-y-1.5 text-brand-platinum">
            <div><strong className="text-white">Name:</strong> {name}</div>
            <div><strong className="text-white">Email:</strong> {email}</div>
            {organization && <div><strong className="text-white">Organization:</strong> {organization}</div>}
            <div><strong className="text-white">Type:</strong> {initialType}</div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSubmitEnquiry}
              className="flex-1 bg-[#D4AF37] hover:bg-[#FFEC69] py-2.5 rounded-full text-xs font-jost font-bold text-black uppercase tracking-wider transition-all shadow-md"
            >
              Submit Enquiry
            </button>
            <button
              onClick={onCancel}
              className="px-4 py-2.5 rounded-full text-xs font-jost text-brand-platinum border border-white/20 hover:text-white transition-colors"
            >
              Not Now
            </button>
          </div>
        </div>
      )}

      {step === "submitting" && (
        <div className="text-center py-4 space-y-2">
          <div className="w-5 h-5 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-jost tracking-wider text-brand-platinum">Submitting enquiry to FashAI Event Concierge...</p>
        </div>
      )}

      {step === "done" && (
        <div className="text-center py-3 space-y-2 text-[#2E936F]">
          <CheckCircle2 className="w-6 h-6 mx-auto text-[#2E936F]" />
          <p className="text-xs font-jost font-bold uppercase">Submission Complete</p>
        </div>
      )}
    </motion.div>
  );
}
