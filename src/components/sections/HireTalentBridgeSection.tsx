"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Users, ArrowRight } from "lucide-react";

export default function HireTalentBridgeSection() {
  return (
    <section
      id="hire-talent-bridge"
      className="relative py-10 sm:py-14 bg-white dark:bg-[#0A0908] text-[#111111] dark:text-white border-b border-black/10 dark:border-white/10 select-none overflow-hidden"
    >
      <div className="container-editorial relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-[#FAF8F5] via-white to-[#FAF8F5] dark:from-[#11100E] dark:via-[#161412] dark:to-[#11100E] border border-[#D4AF37]/35 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10"
        >
          <div className="space-y-3 text-center lg:text-left max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] font-syne text-xs font-bold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              <span>CLIENT TALENT BOOKING</span>
            </div>

            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-light text-[#111111] dark:text-white uppercase leading-tight tracking-tight">
              LOOKING TO <span className="font-serif italic text-[#D4AF37]">HIRE TALENT?</span>
            </h2>

            <p className="font-sans text-sm sm:text-base lg:text-lg text-[#444444] dark:text-brand-platinum/90 font-light leading-relaxed">
              Looking for models, designers, makeup artists, stylists, choreographers, creators or public figures for your event or campaign? Access our verified talent network.
            </p>
          </div>

          <div className="shrink-0 w-full sm:w-auto text-center">
            <Link
              href="/hire-talent"
              className="inline-flex items-center justify-center gap-3 bg-[#D4AF37] hover:bg-[#FFEC69] text-[#111111] py-4 px-8 rounded-2xl font-syne text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-lg group shrink-0 w-full sm:w-auto"
            >
              <span>HIRE TALENT</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
