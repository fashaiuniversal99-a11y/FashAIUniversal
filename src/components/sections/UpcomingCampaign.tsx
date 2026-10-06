"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Countdown from "./Countdown";

export default function UpcomingCampaign() {
  return (
    <section
      id="lifestyle-2026"
      className="relative py-32 px-6 sm:px-12 bg-brand-void border-b border-hairline overflow-hidden"
    >
      {/* Minimal Void Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none bg-vignette" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="flex flex-col items-center text-center"
        >
          {/* Eyebrow Label */}
          <div className="flex items-center gap-2 mb-6">
            <span className="h-1.5 w-1.5 bg-brand-orange animate-pulse" />
            <span className="font-syne text-xs tracking-micro text-brand-orange font-bold uppercase">
              THE NEXT CHAPTER / DUBAI 2026
            </span>
          </div>

          {/* Monolithic 2026 Typography */}
          <h2 className="font-serif-display text-6xl sm:text-8xl md:text-9xl font-light text-brand-off-white tracking-tighter leading-none mb-4">
            FashAI
            <span className="block text-brand-orange font-normal italic">
              LifeStyle 2026
            </span>
          </h2>

          <p className="font-syne text-sm sm:text-base tracking-caps text-brand-gold max-w-2xl mt-4 mb-8">
            Dubai, United Arab Emirates — Date &amp; Venue TBA
          </p>

          <p className="font-sans text-base sm:text-lg text-brand-platinum max-w-xl font-light leading-relaxed mb-12">
            An extraordinary fusion of international haute couture, luxury installations, and private delegate salons set against Dubai's iconic skyline.
          </p>

          {/* Real Configurable Countdown or Status Banner */}
          <div className="mb-12">
            <Countdown />
          </div>

          {/* CTA Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#accreditation"
              className="bg-brand-orange px-10 py-5 text-xs font-syne tracking-caps font-bold text-brand-void hover:bg-brand-gold transition-colors text-center"
              data-cursor="explore"
            >
              REQUEST 2026 DELEGATE ACCREDITATION ↗
            </a>
            <a
              href="#faces"
              className="border border-brand-gold/40 px-10 py-5 text-xs font-syne tracking-caps text-brand-off-white hover:bg-brand-gold/10 transition-colors text-center"
              data-cursor="view"
            >
              VIEW PARTICIPATING FACES ↘
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
