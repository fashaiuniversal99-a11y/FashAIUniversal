"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";

import { LIFESTYLE_2026 } from "@/data/lifestyle-event";
import SponsorshipModal from "@/components/ui/SponsorshipModal";

export default function HomeUpcomingFeature() {
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);
  const [sponsorModalMode, setSponsorModalMode] = useState<"DECK" | "ENQUIRY">("DECK");

  return (
    <section className="relative w-full flex flex-col justify-center py-10 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#080706] border-b border-black/10 dark:border-white/10 text-[#111111] dark:text-white overflow-hidden select-none">
      {/* Background Watermark */}
      <div className="editorial-watermark absolute top-6 right-0 text-[15vw] font-serif-display font-light uppercase tracking-tighter leading-none pointer-events-none select-none text-black/[0.03] dark:text-white/[0.03]">
        DUBAI 2026
      </div>

      <div className="relative z-10 w-full max-w-[1500px] w-[92vw] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center space-y-7 sm:space-y-9"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="font-syne text-xs sm:text-sm md:text-base tracking-[0.25em] text-[#D4AF37] font-bold uppercase">
              UPCOMING EVENT · DUBAI 2026
            </span>
          </div>

          {/* Main Title Block */}
          <div className="space-y-3 text-center w-full max-w-5xl mx-auto">
            <h2 className="font-serif-display text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[0.95] uppercase">
              LifeStyle <span className="text-[#D4AF37] italic font-normal">2026</span>
            </h2>

            <p className="font-syne text-xs sm:text-sm md:text-base tracking-[0.25em] text-[#2E936F] font-bold uppercase pt-1">
              DUBAI &nbsp;·&nbsp; 2026
            </p>

            <p className="font-sans text-base sm:text-lg md:text-xl lg:text-2xl text-[#333333] dark:text-white/90 font-light max-w-4xl lg:max-w-[950px] mx-auto pt-2 leading-relaxed">
              {LIFESTYLE_2026.description}
            </p>
          </div>

          {/* Minimal Position Statement */}
          <div className="flex items-center justify-center gap-3 w-full max-w-3xl lg:max-w-[900px] py-1 mx-auto">
            <span className="hidden sm:block flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-[#D4AF37]" />
            <span className="font-syne text-xs sm:text-sm md:text-base tracking-wider text-[#111111] dark:text-white/95 font-bold uppercase px-2 text-center leading-normal">
              “INTERNATIONAL FASHION &amp; LIFESTYLE EXPERIENCE, DUBAI | 2026”
            </span>
            <span className="hidden sm:block flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#D4AF37]/60 to-[#D4AF37]" />
          </div>

          {/* Open Registrations & Sponsorships Announcement Banner */}
          <div className="w-full max-w-4xl lg:max-w-[1050px] bg-[#FAF8F5] dark:bg-white/5 border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-8 text-center shadow-md space-y-3 mx-auto">
            <h3 className="font-syne text-sm sm:text-base md:text-lg tracking-[0.2em] font-bold text-[#D4AF37] uppercase block">
              REGISTRATIONS &amp; SPONSORSHIPS ARE OPEN
            </h3>
            <p className="font-sans text-sm sm:text-base md:text-lg lg:text-xl text-[#444444] dark:text-white/90 font-light max-w-3xl mx-auto leading-relaxed">
              Enquire now for delegate registration, international designer participation, and brand sponsorship opportunities for LifeStyle 2026.
            </p>
          </div>

          {/* 3 Editorial Specification Columns Grid */}
          <div className="w-full max-w-5xl lg:max-w-[1250px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-black/10 dark:divide-white/15 border-y border-black/10 dark:border-white/15 py-6 sm:py-8 items-stretch">
              {/* Col 1: Event Date */}
              <div className="flex flex-col items-center justify-between p-4 text-center space-y-2 min-h-[130px]">
                <span className="text-xs sm:text-sm font-syne tracking-widest font-bold text-[#666666] dark:text-white/70 uppercase">
                  EVENT DATE
                </span>
                <span className="font-serif-display text-lg sm:text-xl md:text-2xl font-light text-[#D4AF37] uppercase tracking-wide">
                  {LIFESTYLE_2026.dateDisplay}
                </span>
                <span className="font-sans text-xs sm:text-sm md:text-base text-[#555555] dark:text-white/60 uppercase whitespace-nowrap">
                  Dubai · 2026
                </span>
              </div>

              {/* Col 2: Event Venue */}
              <div className="flex flex-col items-center justify-between p-4 text-center space-y-2 min-h-[130px]">
                <span className="text-xs sm:text-sm font-syne tracking-widest font-bold text-[#666666] dark:text-white/70 uppercase">
                  EVENT VENUE
                </span>
                <span className="font-serif-display text-lg sm:text-xl md:text-2xl font-light text-[#D4AF37] uppercase tracking-wide">
                  {LIFESTYLE_2026.venueDisplay}
                </span>
                <span className="font-sans text-xs sm:text-sm md:text-base text-[#555555] dark:text-white/60 uppercase whitespace-nowrap">
                  Dubai, UAE
                </span>
              </div>

              {/* Col 3: Dress Code */}
              <div className="flex flex-col items-center justify-between p-4 text-center space-y-2 min-h-[130px]">
                <span className="text-xs sm:text-sm font-syne tracking-widest font-bold text-[#666666] dark:text-white/70 uppercase">
                  DRESS CODE
                </span>
                <span className="font-serif-display text-xl sm:text-2xl md:text-3xl font-light text-[#111111] dark:text-white uppercase tracking-wide">
                  {LIFESTYLE_2026.dressCode}
                </span>
                <span className="font-sans text-xs sm:text-sm md:text-base text-[#555555] dark:text-white/60 uppercase whitespace-nowrap">
                  Fashionable &amp; Luxury
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
            <Link
              href={LIFESTYLE_2026.waitingListCtaUrl}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#FFEC69] text-[#111111] border border-[#D4AF37] px-6 py-3.5 rounded-full font-syne text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 shadow-md group"
            >
              <span>JOIN THE WAITING LIST</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>

            <button
              type="button"
              onClick={() => {
                setSponsorModalMode("DECK");
                setIsSponsorModalOpen(true);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 px-6 py-3.5 rounded-full font-syne text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 group"
            >
              <FileText className="w-4 h-4 text-[#D4AF37]" />
              <span>GET SPONSORSHIP DECK</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSponsorModalMode("ENQUIRY");
                setIsSponsorModalOpen(true);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-[#666666] dark:text-white/70 hover:text-[#D4AF37] dark:hover:text-[#D4AF37] font-syne text-xs font-bold tracking-wider uppercase transition-colors py-2 px-3"
            >
              <span>SPONSORSHIP ENQUIRY</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Sponsorship Modal */}
      <SponsorshipModal
        isOpen={isSponsorModalOpen}
        onClose={() => setIsSponsorModalOpen(false)}
        initialMode={sponsorModalMode}
      />
    </section>
  );
}

