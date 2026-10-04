"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import GradientFlowText from "../ui/GradientFlowText";
import { LIFESTYLE_2026 } from "@/data/lifestyle-event";

export default function UpcomingLifestyleBanner() {
  return (
    <section className="relative py-10 sm:py-14 bg-brand-void border-b border-white/10 overflow-hidden">
      <div className="container-editorial relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-[#0B0908] border border-brand-orange/30 p-5 sm:p-8 lg:p-10 overflow-hidden shadow-[0_0_50px_rgba(241,94,28,0.12)]"
        >
          {/* Editorial Clean Minimal Content Layout */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Column: Event Title & Announcement */}
            <div className="lg:col-span-8 space-y-3 sm:space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-[10px] sm:text-[11px] font-syne tracking-micro text-brand-orange font-bold uppercase bg-brand-orange/10 border border-brand-orange/30 px-3 py-0.5">
                  UPCOMING FLAGSHIP EVENT
                </span>
                <span className="text-[10px] sm:text-[11px] font-syne tracking-micro text-brand-yellow-golden font-bold uppercase flex items-center gap-1.5">
                  DUBAI · TO BE ANNOUNCED
                </span>
              </div>

              <h2 className="font-serif-display text-3xl sm:text-5xl lg:text-5xl font-light text-brand-white uppercase tracking-tight leading-[0.95]">
                LIFESTYLE <span className="font-serif font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-[#ff8833] to-brand-yellow-golden">2026</span>
              </h2>

              <p className="font-sans text-sm sm:text-base text-brand-platinum/90 font-light max-w-2xl leading-relaxed">
                An international fashion and lifestyle experience bringing together computational design, haute couture, spatial atmosphere, and global delegate salons.
              </p>

              {/* Status Callout Box */}
              <div className="border-l-2 border-brand-orange pl-4 py-2 bg-brand-orange/10 border border-brand-orange/20 max-w-xl">
                <span className="font-syne text-xs tracking-caps text-brand-orange font-bold uppercase block mb-0.5">
                  REGISTRATIONS &amp; SPONSORSHIPS ARE OPEN
                </span>
                <span className="font-sans text-xs text-brand-white/90 font-light">
                  Open for international designers, delegate registrations, brand sponsors, and media partners.
                </span>
              </div>
            </div>

            {/* Right Column: Event Quick Facts & CTAs */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-6 lg:border-l lg:border-white/10 lg:pl-8">
              <div className="space-y-3 font-syne text-xs">
                <div>
                  <span className="text-brand-platinum/70 uppercase tracking-micro text-[10px] block font-bold">
                    EVENT DATE
                  </span>
                  <span className="text-brand-white font-bold text-sm uppercase">
                    {LIFESTYLE_2026.isConfirmed ? LIFESTYLE_2026.dateDisplay : "DATE: TO BE ANNOUNCED"}
                  </span>
                </div>
                <div>
                  <span className="text-brand-platinum/70 uppercase tracking-micro text-[10px] block font-bold">
                    LOCATION / VENUE
                  </span>
                  <span className="text-brand-yellow-golden font-bold text-sm uppercase">
                    {LIFESTYLE_2026.isConfirmed ? LIFESTYLE_2026.venueDisplay : "DUBAI · VENUE: TO BE ANNOUNCED"}
                  </span>
                </div>
                <div>
                  <span className="text-brand-platinum/70 uppercase tracking-micro text-[10px] block font-bold">
                    DRESS CODE
                  </span>
                  <span className="text-brand-green font-bold text-xs uppercase">
                    FASHIONABLE &amp; HAUTE COUTURE
                  </span>
                </div>
              </div>

              {/* Action CTA Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 pt-2">
                <Link
                  href={LIFESTYLE_2026.waitingListCtaUrl}
                  className="bg-[#D4AF37] hover:bg-[#FFEC69] px-6 py-3.5 text-xs font-syne tracking-caps font-bold text-black transition-all duration-300 text-center flex items-center justify-center gap-2 group"
                  data-cursor="explore"
                >
                  <span>JOIN THE WAITING LIST</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
                <Link
                  href="/contact?type=Sponsorship"
                  className="border border-brand-yellow-golden/50 bg-brand-void/80 px-6 py-3.5 text-xs font-syne tracking-caps font-bold text-brand-white hover:bg-brand-yellow-golden/10 hover:border-brand-yellow-golden transition-all duration-300 text-center flex items-center justify-center gap-2"
                >
                  <GradientFlowText variant="gold">SPONSORSHIP ↗</GradientFlowText>
                </Link>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
