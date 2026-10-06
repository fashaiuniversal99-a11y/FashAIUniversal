"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Calendar, Users, UserPlus, Mail, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics/tracker";

export default function FinalConversionSection() {
  const primaryPaths = [
    {
      id: "plan-event",
      title: "Plan Your Event",
      subtitle: "For brands and organizations looking for event planning & production management.",
      icon: Calendar,
      href: "/plan-your-event",
      badge: "EVENT CLIENTS",
      ctaLabel: "PLAN YOUR EVENT →",
      eventKey: "plan_event_click" as const,
    },
    {
      id: "hire-talent",
      title: "Hire Talent",
      subtitle: "For clients looking to book verified runway models, designers, stylists & artists.",
      icon: Users,
      href: "/hire-talent",
      badge: "TALENT BOOKING",
      ctaLabel: "HIRE TALENT ↗",
      eventKey: "hire_talent_click" as const,
    },
    {
      id: "apply-talent",
      title: "Apply as Talent",
      subtitle: "For designers, models, stylists & creators seeking participation in shows & campaigns.",
      icon: UserPlus,
      href: "/apply",
      badge: "CREATIVE NETWORK",
      ctaLabel: "APPLY AS TALENT ↗",
      eventKey: "apply_talent_click" as const,
    },
  ];

  return (
    <section
      id="final-conversion"
      className="relative py-12 sm:py-16 lg:py-20 bg-black text-white border-b border-white/10 select-none overflow-hidden"
    >
      {/* Background Watermark Accent */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="editorial-watermark absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[16vw] font-serif-display font-light uppercase tracking-tighter leading-none opacity-20 text-white/[0.02]">
          FASHAI
        </div>
      </div>

      <div className="container-editorial relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-jost font-bold tracking-wider uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
            <span>TAKE THE NEXT STEP</span>
          </div>

          <h2 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight">
            Start Your Journey with <span className="italic text-[#D4AF37]">FashAI</span>
          </h2>

          <p className="font-jost text-sm sm:text-base text-brand-platinum/85 font-light max-w-xl mx-auto leading-relaxed">
            Select your destination to connect with our team across Dubai, UAE, and Gurgaon, India.
          </p>
        </div>

        {/* 3 EQUAL PRIMARY CONVERSION PATHS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {primaryPaths.map((path, idx) => {
            const IconComponent = path.icon;
            return (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group relative bg-[#0C0B0A] border border-white/10 hover:border-[#D4AF37] rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-jost tracking-widest font-bold text-[#D4AF37] uppercase">
                      {path.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif-display text-2xl sm:text-3xl font-light text-white tracking-tight group-hover:text-[#D4AF37] transition-colors">
                      {path.title}
                    </h3>
                    <p className="font-jost text-xs sm:text-sm text-brand-platinum/75 font-light leading-relaxed mt-2">
                      {path.subtitle}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10">
                  <Link
                    href={path.href}
                    onClick={() => trackEvent(path.eventKey, { location: "final_cta" })}
                    className="w-full inline-flex items-center justify-between bg-[#D4AF37] hover:bg-[#FFEC69] text-black py-3.5 px-5 rounded-full font-jost text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-md group/btn"
                  >
                    <span>{path.ctaLabel}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* SUPPORTING CONTACT OPTION BAR */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-[#080706] border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#D4AF37] shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-jost text-sm font-bold text-white tracking-wide">
                Looking for General Enquiries or Press Relations?
              </h4>
              <p className="font-jost text-xs text-brand-platinum/70 font-light">
                Reach out directly for media accreditation, partnerships, or corporate questions.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            onClick={() => trackEvent("contact_click", { location: "final_cta" })}
            className="inline-flex items-center gap-2 text-xs font-jost font-bold text-[#D4AF37] hover:text-white transition-colors shrink-0 uppercase tracking-wider"
          >
            <span>CONTACT US</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
