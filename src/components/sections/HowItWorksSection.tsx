"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, UserCheck, ArrowRight, FileText, Sparkles, CheckCircle2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics/tracker";

interface HowItWorksSectionProps {
  className?: string;
  showHeading?: boolean;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  className = "",
  showHeading = true,
}) => {
  const clientSteps = [
    {
      num: "01",
      title: "Brief",
      description: "Tell us what you are planning, your vision, scale, and requirements.",
    },
    {
      num: "02",
      title: "Proposal",
      description: "We shape the event, talent, staging, and production specifications.",
    },
    {
      num: "03",
      title: "Production",
      description: "End-to-end planning, coordination, logistics, and creative execution.",
    },
    {
      num: "04",
      title: "Event Day",
      description: "The complete production comes together seamlessly on the day.",
    },
  ];

  const talentSteps = [
    {
      num: "01",
      title: "Apply",
      description: "Submit your creative profile, category details, and portfolio.",
    },
    {
      num: "02",
      title: "Review",
      description: "Your application is reviewed by our editorial and curation team.",
    },
    {
      num: "03",
      title: "Shortlist",
      description: "Approved talent profiles become discoverable in our network.",
    },
    {
      num: "04",
      title: "Booking",
      description: "Connect with relevant event opportunities, showcases, and client enquiries.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className={`py-12 sm:py-16 bg-[#050505] text-white border-b border-white/10 select-none overflow-hidden ${className}`}
    >
      <div className="container-editorial max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {showHeading && (
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-jost font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE PROCESS</span>
            </div>

            <h2 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight">
              How It <span className="italic text-[#D4AF37]">Works</span>
            </h2>

            <p className="font-jost text-sm sm:text-base text-brand-platinum/85 font-light max-w-xl mx-auto leading-relaxed">
              Events and talent, handled by one team. Clear pathways for event clients and creative talent across Dubai and India.
            </p>
          </div>
        )}

        {/* TWO EQUAL TRACKS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* CLIENT TRACK */}
          <div className="bg-[#090807] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl relative group hover:border-[#D4AF37]/50 transition-all">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-jost font-bold uppercase tracking-wider text-[#D4AF37]">
                      FOR EVENT CLIENTS & BRANDS
                    </span>
                    <h3 className="font-serif-display text-xl sm:text-2xl font-light text-white tracking-tight">
                      Event Planning &amp; Production Track
                    </h3>
                  </div>
                </div>
              </div>

              {/* 4 Steps List */}
              <div className="space-y-4">
                {clientSteps.map((step) => (
                  <div
                    key={step.num}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-4"
                  >
                    <span className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] font-jost font-bold text-xs flex items-center justify-center shrink-0">
                      {step.num}
                    </span>
                    <div>
                      <h4 className="font-jost text-base font-bold text-white tracking-wide">
                        {step.title}
                      </h4>
                      <p className="font-jost text-xs sm:text-sm text-brand-platinum/80 font-light leading-relaxed mt-0.5">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <Link
                href="/plan-your-event"
                onClick={() => trackEvent("plan_event_click", { location: "how_it_works" })}
                className="w-full inline-flex items-center justify-between bg-[#D4AF37] hover:bg-[#FFEC69] text-black py-3.5 px-6 rounded-full font-jost text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-md group/btn"
              >
                <span>PLAN YOUR EVENT →</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* TALENT TRACK */}
          <div className="bg-[#090807] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl relative group hover:border-[#D4AF37]/50 transition-all">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-jost font-bold uppercase tracking-wider text-[#D4AF37]">
                      FOR CREATIVE TALENT
                    </span>
                    <h3 className="font-serif-display text-xl sm:text-2xl font-light text-white tracking-tight">
                      Talent Application &amp; Roster Track
                    </h3>
                  </div>
                </div>
              </div>

              {/* 4 Steps List */}
              <div className="space-y-4">
                {talentSteps.map((step) => (
                  <div
                    key={step.num}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-4"
                  >
                    <span className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] font-jost font-bold text-xs flex items-center justify-center shrink-0">
                      {step.num}
                    </span>
                    <div>
                      <h4 className="font-jost text-base font-bold text-white tracking-wide">
                        {step.title}
                      </h4>
                      <p className="font-jost text-xs sm:text-sm text-brand-platinum/80 font-light leading-relaxed mt-0.5">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <Link
                href="/apply"
                onClick={() => trackEvent("apply_talent_click", { location: "how_it_works" })}
                className="w-full inline-flex items-center justify-between bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/15 py-3.5 px-6 rounded-full font-jost text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-md group/btn"
              >
                <span>APPLY AS TALENT ↗</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
