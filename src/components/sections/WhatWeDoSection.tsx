"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Layers, Sparkles, Cpu } from "lucide-react";

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
          <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
            <p className="font-sans text-sm sm:text-base text-[#555555] dark:text-brand-platinum/85 max-w-md font-light leading-relaxed">
              FashAI Universal conceives, designs, and executes specialized event formats across fashion, lifestyle, corporate, product, and technology sectors.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#FFEC69] text-[#111111] px-6 py-3 rounded-full font-syne text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-md group"
            >
              <span>EXPLORE SERVICES</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
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

        {/* AI POSITIONING SUBSECTION: FASHION × AI × EXPERIENCE */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 sm:mt-8 p-6 sm:p-8 rounded-2xl border border-black/10 dark:border-white/10 bg-[#FAF8F5] dark:bg-[#080706] relative overflow-hidden shadow-sm"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2.5 max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-syne tracking-widest text-[#D4AF37] font-bold uppercase">
                <Cpu className="w-4 h-4 text-[#D4AF37]" />
                <span>FASHION × AI × EXPERIENCE</span>
              </div>
              <h3 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-light uppercase text-[#111111] dark:text-brand-white">
                TECHNOLOGY THAT EXPANDS <span className="font-serif italic text-[#D4AF37]">CREATIVE POSSIBILITIES</span>
              </h3>
              <p className="font-sans text-sm sm:text-base text-[#555555] dark:text-brand-platinum/90 font-light leading-relaxed text-justify">
                At FashAI Universal, computational tools and AI-led ideation complement human fashion production and event orchestration. From generative silhouette exploration and visual concept development to 3D garment simulation and stage atmosphere design, computational workflows empower designers and brand partners to push creative boundaries while keeping physical craftsmanship and expert event execution at the core.
              </p>
            </div>

            <div className="flex flex-wrap md:flex-col gap-2 shrink-0 border-t md:border-t-0 md:border-l border-black/10 dark:border-white/10 pt-4 md:pt-0 md:pl-6 w-full md:w-auto">
              <div className="flex items-center gap-2 text-xs font-syne font-semibold text-[#333333] dark:text-brand-platinum">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span>Computational Ideation</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-syne font-semibold text-[#333333] dark:text-brand-platinum">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span>3D Silhouette Exploration</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-syne font-semibold text-[#333333] dark:text-brand-platinum">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span>Stage &amp; Spatial Media</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
