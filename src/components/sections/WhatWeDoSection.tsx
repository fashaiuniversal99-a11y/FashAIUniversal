"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Layers, Sparkles } from "lucide-react";

import { useSiteConfig } from "@/context/SiteConfigContext";
import { AlertCircle } from "lucide-react";

export default function WhatWeDoSection() {
  const { config } = useSiteConfig();
  const services = config?.servicesSettings || [];

  const getServiceStatus = (id: string) => {
    const found = services.find((s) => s.id === id);
    return {
      isAvailable: found ? found.status === "ACTIVE" : true,
      message: found?.disabledMessage || "Currently unavailable",
    };
  };

  return (
    <section id="what-we-do" className="relative py-8 sm:py-12 md:py-14 bg-white dark:bg-[#050505] border-b border-black/10 dark:border-white/10 text-[#111111] dark:text-brand-white overflow-hidden">
      <div className="container-editorial relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6 sm:mb-8 border-b border-black/10 dark:border-white/10 pb-5 sm:pb-6">
          <div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-syne tracking-widest text-[#D4AF37] font-bold uppercase mb-2">
              <Layers className="w-4 h-4 text-[#D4AF37]" />
              <span>EVENT FORMATS &amp; SERVICES</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-light text-[#111111] dark:text-brand-white uppercase leading-none tracking-tight">
              WHAT WE <span className="font-serif italic font-normal text-[#D4AF37]">DO</span>
            </h2>
          </div>
          <p className="font-sans text-base sm:text-lg md:text-xl text-[#555555] dark:text-brand-platinum/85 max-w-lg font-light leading-relaxed text-justify">
            FashAI Universal conceives, designs, and executes specialized event formats across fashion, lifestyle, corporate, product, and technology sectors.
          </p>
        </div>

        {/* Compact Editorial Event Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          {/* EVENT BLOCK 1: FLAGSHIP FASHION EVENTS (Span 7) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 group relative bg-[#FAF8F5] dark:bg-[#080706] border border-black/10 dark:border-white/10 rounded-2xl p-5 sm:p-7 flex flex-col justify-between overflow-hidden shadow-sm hover:border-[#D4AF37]/60 transition-all duration-300"
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-syne tracking-widest text-[#D4AF37] uppercase font-bold">
                  FLAGSHIP FORMAT
                </span>
                {!getServiceStatus("fashion_events").isAvailable && (
                  <span className="px-3 py-1 rounded-full text-xs font-syne font-bold uppercase tracking-wider bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37]">
                    ● {getServiceStatus("fashion_events").message}
                  </span>
                )}
              </div>

              {/* Clean Controlled Image Frame */}
              <div className="relative aspect-[16/8.5] w-full overflow-hidden rounded-xl bg-black/5 dark:bg-[#030303] border border-black/10 dark:border-white/10">
                <Image
                  src="/assets/events/fashion_events.png"
                  alt="Fashion event and runway experience"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                  priority
                />
              </div>

              <div>
                <h3 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-light uppercase text-[#111111] dark:text-brand-white group-hover:text-[#D4AF37] transition-colors mb-1.5">
                  FASHION EVENTS
                </h3>

                <p className="font-sans text-sm sm:text-base text-[#555555] dark:text-brand-platinum/90 font-light leading-relaxed text-justify">
                  High-impact runway productions, designer showcases, and high-fashion presentations.
                </p>

                {/* Category Feature Badges */}
                <div className="flex flex-wrap gap-2 pt-3">
                  <span className="px-3 py-1 rounded-full text-xs font-syne uppercase tracking-wider bg-black/5 dark:bg-white/5 text-[#333333] dark:text-brand-platinum border border-black/10 dark:border-white/10 font-semibold">
                    RUNWAY PRODUCTIONS
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-syne uppercase tracking-wider bg-black/5 dark:bg-white/5 text-[#333333] dark:text-brand-platinum border border-black/10 dark:border-white/10 font-semibold">
                    DESIGNER SHOWCASES
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-syne uppercase tracking-wider bg-black/5 dark:bg-white/5 text-[#333333] dark:text-brand-platinum border border-black/10 dark:border-white/10 font-semibold">
                    COUTURE SALONS
                  </span>
                </div>
              </div>
            </div>

            {/* Editorial Information Strip & CTA */}
            <div className="mt-5 pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-4">
              <Link
                href="/services/fashion_events"
                className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#FFEC69] text-[#111111] px-5 py-2.5 rounded-full font-syne text-xs font-bold tracking-wider uppercase transition-all shadow-md group/btn"
              >
                <span>EXPLORE FORMAT</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
              </Link>

              <Link
                href="/plan-your-event"
                className="inline-flex items-center gap-1 text-xs font-syne font-bold uppercase text-[#111111] dark:text-[#D4AF37] hover:text-[#D4AF37] transition-colors"
              >
                <span>BOOK EVENT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* EVENT BLOCK 2: LIFESTYLE & ENTERTAINMENT EVENTS (Span 5) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 group relative bg-[#FAF8F5] dark:bg-[#080706] border border-black/10 dark:border-white/10 rounded-2xl p-5 sm:p-7 flex flex-col justify-between overflow-hidden shadow-sm hover:border-[#D4AF37]/60 transition-all duration-300"
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-syne tracking-widest text-[#D4AF37] uppercase font-bold">
                  EXPERIENTIAL FORMAT
                </span>
                {!getServiceStatus("lifestyle_events").isAvailable && (
                  <span className="px-3 py-1 rounded-full text-xs font-syne font-bold uppercase tracking-wider bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37]">
                    ● {getServiceStatus("lifestyle_events").message}
                  </span>
                )}
              </div>

              {/* Clean Controlled Image Frame */}
              <div className="relative aspect-[16/8.5] w-full overflow-hidden rounded-xl bg-black/5 dark:bg-[#030303] border border-black/10 dark:border-white/10">
                <Image
                  src="/assets/events/lifestyle_events.png"
                  alt="Lifestyle and luxury entertainment event experience"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>

              <div>
                <h3 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-light uppercase text-[#111111] dark:text-brand-white group-hover:text-[#D4AF37] transition-colors mb-1.5">
                  LIFESTYLE EVENTS
                </h3>

                <p className="font-sans text-sm sm:text-base text-[#555555] dark:text-brand-platinum/90 font-light leading-relaxed">
                  Curated VIP galas, red carpet receptions, luxury salons, and lifestyle activations.
                </p>

                {/* Category Feature Badges */}
                <div className="flex flex-wrap gap-2 pt-3">
                  <span className="px-3 py-1 rounded-full text-xs font-syne uppercase tracking-wider bg-black/5 dark:bg-white/5 text-[#333333] dark:text-brand-platinum border border-black/10 dark:border-white/10 font-semibold">
                    VIP GALAS
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-syne uppercase tracking-wider bg-black/5 dark:bg-white/5 text-[#333333] dark:text-brand-platinum border border-black/10 dark:border-white/10 font-semibold">
                    RED CARPET
                  </span>
                </div>
              </div>
            </div>

            {/* Editorial Information Strip & CTA */}
            <div className="mt-5 pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-4">
              <Link
                href="/services/lifestyle_events"
                className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#FFEC69] text-[#111111] px-5 py-2.5 rounded-full font-syne text-xs font-bold tracking-wider uppercase transition-all shadow-md group/btn"
              >
                <span>EXPLORE FORMAT</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
              </Link>

              <Link
                href="/plan-your-event"
                className="inline-flex items-center gap-1 text-xs font-syne font-bold uppercase text-[#111111] dark:text-[#D4AF37] hover:text-[#D4AF37] transition-colors"
              >
                <span>BOOK EVENT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
