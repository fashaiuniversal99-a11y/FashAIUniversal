"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowUpRight, Building2 } from "lucide-react";
import { OFFICE_LOCATIONS } from "@/data/locations";

interface OfficeLocationsProps {
  className?: string;
  showHeading?: boolean;
  compact?: boolean;
}

export default function OfficeLocations({
  className = "",
  showHeading = true,
  compact = false,
}: OfficeLocationsProps) {
  return (
    <div className={`w-full ${className}`}>
      {showHeading && (
        <div className="mb-8 sm:mb-12 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 text-xs sm:text-sm font-syne tracking-micro text-[#D4AF37] font-bold uppercase mb-3">
            <span className="h-px w-8 bg-[#D4AF37]" />
            <span>GLOBAL PRESENCE</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-light text-[#111111] dark:text-white uppercase leading-none tracking-tight">
            OUR <span className="italic font-normal text-[#D4AF37]">OFFICE LOCATIONS</span>
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#444444] dark:text-brand-platinum/90 font-light mt-3 max-w-2xl leading-relaxed">
            FashAI Universal operates from key global headquarters and regional offices connecting strategic fashion, lifestyle, and corporate markets.
          </p>
        </div>
      )}

      {/* Balanced 2-Column Location Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-stretch">
        {OFFICE_LOCATIONS.map((loc, idx) => (
          <motion.div
            key={loc.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0A0908] border border-black/10 dark:border-white/10 hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm dark:shadow-2xl overflow-hidden"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] via-[#FFEC69] to-[#D4AF37] opacity-80" />

            <div>
              {/* Country Badge & Flag Header */}
              <div className="flex items-center justify-between gap-3 mb-4 pb-4 border-b border-black/10 dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl sm:text-3xl leading-none" role="img" aria-label={loc.countryCode}>
                    {loc.flag}
                  </span>
                  <span className="font-syne text-[11px] sm:text-xs tracking-caps font-bold text-[#D4AF37] uppercase">
                    {loc.cityRegion}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                  <Building2 className="w-4 h-4 text-[#D4AF37]" />
                </div>
              </div>

              {/* Major Location Heading */}
              <h3 className="font-serif-display text-2xl sm:text-3xl font-light text-[#111111] dark:text-white uppercase leading-tight mb-4 tracking-tight group-hover:text-[#D4AF37] transition-colors duration-300">
                {loc.title}
              </h3>

              {/* Address Details */}
              <div className="space-y-1 sm:space-y-1.5 font-sans text-sm sm:text-base text-[#333333] dark:text-brand-platinum/90 font-normal leading-relaxed mb-6">
                {loc.addressLines.map((line, lIdx) => (
                  <p key={lIdx} className={lIdx === 0 ? "font-semibold text-[#111111] dark:text-white" : ""}>
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {/* Google Maps Location Button */}
            <div className="pt-4 border-t border-black/10 dark:border-white/10 mt-auto">
              <a
                href={loc.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#FFEC69] text-[#111111] font-syne font-bold text-xs tracking-caps uppercase transition-all duration-300 shadow-md group/btn"
              >
                <MapPin className="w-4 h-4 shrink-0 text-[#111111]" />
                <span>VIEW LOCATION ON GOOGLE MAPS</span>
                <ArrowUpRight className="w-4 h-4 shrink-0 text-[#111111] transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
