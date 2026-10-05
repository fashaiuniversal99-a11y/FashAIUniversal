"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, UserPlus, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics/tracker";

export default function TwoPrimaryDoorsSection() {
  return (
    <section
      id="primary-doors"
      className="relative py-12 sm:py-16 lg:py-20 bg-[#FAF8F5] dark:bg-[#070605] text-[#111111] dark:text-white border-b border-black/10 dark:border-white/10 select-none overflow-hidden"
    >
      {/* Background Watermark Accent */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="editorial-watermark absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-serif-display font-light uppercase tracking-tighter leading-none opacity-20 text-black/[0.02] dark:text-white/[0.02]">
          ECOSYSTEM
        </div>
      </div>

      <div className="container-editorial relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-syne font-bold tracking-wider uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
            <span>CHOICE OF GATEWAY</span>
          </div>

          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-light text-[#111111] dark:text-white uppercase leading-tight tracking-tight">
            TWO DOORS. ONE <span className="font-serif italic text-[#D4AF37]">ECOSYSTEM.</span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#555555] dark:text-brand-platinum/85 font-light leading-relaxed">
            Whether you are a client looking to produce an event or creative talent seeking global opportunities, select your pathway below.
          </p>
        </div>

        {/* TWO EQUAL PRIMARY DOORS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* DOOR 1: PLAN YOUR EVENT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative bg-white dark:bg-[#0E0D0C] border-2 border-[#D4AF37]/40 hover:border-[#D4AF37] rounded-3xl p-7 sm:p-10 flex flex-col justify-between transition-all duration-300 shadow-lg dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                  <Calendar className="w-6 h-6" />
                </div>
                <span className="text-xs font-syne tracking-widest font-bold text-[#D4AF37] uppercase bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/30">
                  FOR EVENT CLIENTS &amp; BRANDS
                </span>
              </div>

              <div>
                <h3 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-light text-[#111111] dark:text-white uppercase leading-tight tracking-tight group-hover:text-[#D4AF37] transition-colors">
                  PLAN YOUR <span className="font-serif italic text-[#D4AF37]">EVENT</span>
                </h3>

                <p className="font-sans text-sm sm:text-base text-[#555555] dark:text-brand-platinum/85 font-light leading-relaxed mt-3">
                  For brands, companies, and organizations looking for end-to-end event planning, runway presentation, spatial production, and luxury event management across the UAE, India, and global destinations.
                </p>
              </div>

              <div className="pt-2 space-y-2">
                <div className="flex items-center gap-2 text-xs font-syne font-semibold text-[#333333] dark:text-brand-platinum/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span>Full Event Production &amp; Execution</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-syne font-semibold text-[#333333] dark:text-brand-platinum/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span>Fashion Shows, Summits &amp; Tech Launches</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-syne font-semibold text-[#333333] dark:text-brand-platinum/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span>End-to-End Creative &amp; Technical Direction</span>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-black/10 dark:border-white/10">
              <Link
                href="/plan-your-event"
                onClick={() => trackEvent("plan_event_click", { location: "hero" })}
                className="w-full inline-flex items-center justify-center gap-3 bg-[#D4AF37] hover:bg-[#FFEC69] text-[#111111] py-4 px-6 rounded-2xl font-syne text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-md group/btn"
              >
                <span>PLAN YOUR EVENT</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* DOOR 2: APPLY AS TALENT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative bg-white dark:bg-[#0E0D0C] border-2 border-[#D4AF37]/40 hover:border-[#D4AF37] rounded-3xl p-7 sm:p-10 flex flex-col justify-between transition-all duration-300 shadow-lg dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                  <UserPlus className="w-6 h-6" />
                </div>
                <span className="text-xs font-syne tracking-widest font-bold text-[#D4AF37] uppercase bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/30">
                  FOR CREATIVE PROFESSIONALS
                </span>
              </div>

              <div>
                <h3 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-light text-[#111111] dark:text-white uppercase leading-tight tracking-tight group-hover:text-[#D4AF37] transition-colors">
                  APPLY AS <span className="font-serif italic text-[#D4AF37]">TALENT</span>
                </h3>

                <p className="font-sans text-sm sm:text-base text-[#555555] dark:text-brand-platinum/85 font-light leading-relaxed mt-3">
                  For designers, models, makeup artists, fashion stylists, choreographers, creators, public figures, and other creative professionals looking to apply and join our international ecosystem.
                </p>
              </div>

              <div className="pt-2 space-y-2">
                <div className="flex items-center gap-2 text-xs font-syne font-semibold text-[#333333] dark:text-brand-platinum/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span>Runway, Editorial &amp; Showcase Opportunities</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-syne font-semibold text-[#333333] dark:text-brand-platinum/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span>Verified Roster &amp; Client Representation</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-syne font-semibold text-[#333333] dark:text-brand-platinum/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span>International Exposure in UAE &amp; Global Capitals</span>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-black/10 dark:border-white/10">
              <Link
                href="/apply"
                onClick={() => trackEvent("apply_talent_click", { location: "hero" })}
                className="w-full inline-flex items-center justify-center gap-3 bg-[#D4AF37] hover:bg-[#FFEC69] text-[#111111] py-4 px-6 rounded-2xl font-syne text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-md group/btn"
              >
                <span>APPLY AS TALENT</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Supporting Hire Talent Pathway */}
        <div className="text-center pt-4">
          <Link
            href="/hire-talent"
            onClick={() => trackEvent("hire_talent_click", { location: "hero" })}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-syne font-semibold tracking-wider text-[#111111]/80 dark:text-white/85 hover:text-[#D4AF37] transition-colors group"
          >
            <span>Looking to book creative talent for your project?</span>
            <span className="text-[#D4AF37] font-bold underline underline-offset-4 group-hover:text-white transition-colors inline-flex items-center gap-1">
              HIRE TALENT <ArrowRight className="w-3.5 h-3.5 inline transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
