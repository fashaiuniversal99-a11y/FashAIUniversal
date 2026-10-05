"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface HomepageEvent {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  timing?: string;
  image: string;
  ctaText: string;
  ctaHref: string;
  bookNowHref: string;
  desktopOnly?: boolean;
}

const HOMEPAGE_EVENTS: HomepageEvent[] = [
  {
    id: "lifestyle",
    badge: "FLAGSHIP EXPERIENCE",
    title: "LIFESTYLE",
    subtitle: "FashPrism Lifestyle Week",
    description:
      "Fashion, culture and lifestyle experiences bringing together computational design, haute couture, and spatial atmosphere.",
    timing: "TO BE ANNOUNCED",
    image: "/assets/events/lifestyle_banner.png",
    ctaText: "EXPLORE EVENT",
    ctaHref: "/events",
    bookNowHref: "/plan-your-event",
  },
  {
    id: "runway",
    badge: "PRESENTATION EXPERIENCE",
    title: "RUNWAY",
    subtitle: "Haute Catwalk Showcase",
    description:
      "Fashion presentation and runway experiences within the FashAI Universal ecosystem. Highlighting spatial choreography, lighting art, and designer silhouettes.",
    image: "/assets/events/runway_banner.png",
    ctaText: "EXPLORE EVENT",
    ctaHref: "/events",
    bookNowHref: "/plan-your-event",
  },
  {
    id: "brand-shoots",
    badge: "DIGITAL PR & CAMPAIGNS",
    title: "BRAND SHOOTS",
    subtitle: "Commercial & Lookbook Production",
    description:
      "Bespoke brand campaigns, editorial lookbooks, commercial shoots, and digital PR content creation with full creative direction.",
    image: "/assets/events/designer/Designer.png",
    ctaText: "EXPLORE EVENT",
    ctaHref: "/events",
    bookNowHref: "/contact?type=BrandShoots",
    desktopOnly: true,
  },
];

export default function OurEventsSection() {
  return (
    <section
      id="our-events"
      className="relative pt-4 sm:pt-5 lg:pt-7 pb-8 sm:pb-12 md:pb-14 bg-white dark:bg-[#050505] text-[#111111] dark:text-white border-b border-black/10 dark:border-white/10 overflow-hidden"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="editorial-watermark absolute bottom-0 right-6 text-[14vw] font-serif-display font-light uppercase tracking-tighter leading-none pointer-events-none select-none text-black/[0.03] dark:text-white/[0.02]">
          EVENTS
        </div>
      </div>

      <div className="container-editorial relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-3 text-xs sm:text-sm font-syne tracking-widest text-[#D4AF37] font-bold uppercase mb-2">
            <span className="h-px w-8 bg-[#D4AF37]" />
            <span>EVENT ECOSYSTEM</span>
            <span className="h-px w-8 bg-[#D4AF37]" />
          </div>

          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-light text-[#111111] dark:text-brand-white uppercase leading-tight">
            OUR EVENTS
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#555555] dark:text-brand-platinum/85 font-light mt-2 max-w-xl mx-auto leading-relaxed text-justify sm:text-center">
            FashPrism &amp; premier global event formats produced across haute couture runways and luxury lifestyle showcases.
          </p>

          <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mt-4" />
        </div>

        {/* Homepage Event Grid — 2 Cards on Mobile (LIFESTYLE & RUNWAY), 3 Aligned Cards on Desktop (LIFESTYLE, RUNWAY & BRAND SHOOTS) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-6 items-stretch">
          {HOMEPAGE_EVENTS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={`${
                item.desktopOnly ? "hidden md:flex" : "flex"
              } flex-col justify-between group bg-neutral-50 dark:bg-[#090807] border border-black/10 dark:border-[#D4AF37]/30 rounded-2xl overflow-hidden shadow-lg hover:border-[#D4AF37] transition-all duration-300 h-full`}
            >
              <div className="flex-1 flex flex-col">
                {/* Clean Editorial Event Image Container — NO text overlays */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/10 dark:bg-black shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    priority={idx === 0}
                  />
                </div>

                {/* Event Card Content Below Image */}
                <div className="p-4 sm:p-5 lg:p-6 space-y-2.5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-[10px] sm:text-[11px] font-syne tracking-[0.2em] text-[#D4AF37] uppercase font-extrabold">
                        {item.badge}
                      </span>
                      {item.timing && (
                        <>
                          <span className="text-black/30 dark:text-white/30">•</span>
                          <span className="text-[10px] sm:text-[11px] font-syne text-[#D4AF37] uppercase font-extrabold">
                            {item.timing}
                          </span>
                        </>
                      )}
                    </div>

                    <h3 className="font-serif-display text-2xl sm:text-3xl lg:text-[24px] font-normal text-[#111111] dark:text-white uppercase tracking-tight">
                      {item.title}
                    </h3>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-[#444444] dark:text-brand-platinum/85 font-light leading-relaxed text-justify">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Card Action Area — Aligned across all 3 cards at bottom baseline */}
              <div className="p-4 sm:p-5 lg:p-6 pt-0 flex items-center justify-between gap-3 mt-auto shrink-0 border-t border-black/5 dark:border-white/5 pt-3.5">
                <Link
                  href={item.ctaHref}
                  className="inline-flex items-center gap-1 text-xs font-syne font-bold uppercase text-[#111111] dark:text-[#D4AF37] hover:text-[#D4AF37] dark:hover:text-[#FFEC69] transition-colors whitespace-nowrap"
                >
                  <span>{item.ctaText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href={item.bookNowHref}
                  className="inline-flex items-center gap-1.5 bg-[#D4AF37] hover:bg-[#FFEC69] text-[#111111] px-4 py-2 rounded-full text-xs font-syne tracking-caps font-bold transition-all shadow-md group/btn whitespace-nowrap"
                >
                  <span>PLAN YOUR EVENT</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section Bottom CTA — EXPLORE ALL EVENTS → */}
        <div className="mt-8 sm:mt-10 text-center">
          <Link
            href="/events"
            className="inline-flex items-center gap-2.5 bg-[#D4AF37] hover:bg-[#FFEC69] text-[#111111] px-7 py-3.5 rounded-full font-syne text-xs sm:text-sm font-bold tracking-widest uppercase transition-all shadow-xl group hover:scale-[1.02]"
          >
            <span>EXPLORE ALL EVENTS</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
