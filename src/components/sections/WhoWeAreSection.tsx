"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Globe, Users, Eye, Award, Compass, ArrowRight } from "lucide-react";

export default function WhoWeAreSection() {
  return (
    <section id="who-we-are" className="relative pt-8 sm:pt-12 md:pt-14 pb-5 sm:pb-7 lg:pb-8 bg-white dark:bg-[#050505] border-b border-black/10 dark:border-white/10 overflow-hidden text-[#111111] dark:text-brand-white">
      <div className="container-editorial relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6 sm:space-y-8"
        >
          {/* Main Title Block */}
          <div className="text-center max-w-5xl mx-auto">
            {/* Top Location Eyebrow */}
            <div className="flex items-center justify-center gap-3 w-full max-w-xs sm:max-w-sm mx-auto mb-2">
              <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-[#D4AF37]" />
              <span className="text-xs sm:text-sm font-syne tracking-[0.25em] text-[#D4AF37] font-bold uppercase whitespace-nowrap">
                DUBAI &amp; INDIA · GLOBAL ECOSYSTEM
              </span>
              <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#D4AF37]/70 to-[#D4AF37]" />
            </div>

            {/* Main Editorial Heading */}
            <h2 className="font-serif-display text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-light text-[#111111] dark:text-brand-white uppercase leading-[0.95] tracking-tight">
              FASHION EVENTS &amp; FASHION TALENT, <br />
              <span className="font-serif italic font-normal text-[#D4AF37]">TOGETHER.</span>
            </h2>

            {/* Concise Subheading */}
            <p className="font-syne text-xs sm:text-sm md:text-base tracking-[0.15em] sm:tracking-[0.18em] uppercase text-[#333333] dark:text-brand-platinum/90 font-bold mt-2.5 max-w-4xl lg:max-w-5xl mx-auto leading-relaxed text-justify sm:text-center">
              EVENTS AND TALENT, HANDLED BY ONE TEAM — DUBAI AND INDIA
            </p>

            <p className="font-sans text-sm sm:text-base md:text-lg text-[#444444] dark:text-brand-platinum/85 font-light mt-3 max-w-3xl lg:max-w-4xl mx-auto leading-relaxed text-justify sm:text-center">
              FashAI Universal helps clients plan, produce, manage, and execute high-impact fashion events, runway presentations, product launches, corporate galas, and luxury brand experiences.
            </p>

            {/* Primary Event Management CTA */}
            <div className="mt-5 sm:mt-6 flex items-center justify-center">
              <Link
                href="/plan-your-event"
                className="inline-flex items-center justify-center gap-2 sm:gap-2.5 bg-[#D4AF37] hover:bg-[#FFEC69] text-[#111111] px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-syne text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 shadow-md group border border-[#D4AF37]"
              >
                <span>PLAN YOUR EVENT →</span>
                <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Divider Line */}
            <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mt-5 sm:mt-6" />
          </div>

          {/* Editorial Responsive Layout */}
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-5 mt-6 items-stretch">
            {/* Left Vision Card with Image */}
            <div className="order-1 lg:order-none lg:col-span-6 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 relative w-full aspect-[16/9] sm:aspect-[16/9] lg:aspect-auto lg:h-full min-h-[200px] xs:min-h-[240px] sm:min-h-[280px] lg:min-h-[320px] bg-[#FAF8F5] dark:bg-[#0A0908] group shadow-sm flex items-center justify-center p-1 sm:p-0">
              <Image
                src="/assets/home/where_fashion_creates_possibilities.png"
                alt="OUR VISION — Where Fashion Creates Possibilities. UAE · INDIA · GLOBAL"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 50vw"
                priority
                className="object-contain sm:object-cover object-center opacity-100 dark:opacity-90 dark:brightness-[0.95] transition-all duration-500 group-hover:scale-[1.02]"
              />
              <span className="sr-only">
                OUR VISION: Where Fashion Creates Possibilities. UAE · INDIA · GLOBAL
              </span>
            </div>

            {/* Right Column Container on Laptop/Desktop */}
            <div className="contents lg:flex lg:flex-col lg:justify-between lg:gap-4 lg:col-span-6">
              {/* 2 Top Info Cards */}
              <div className="order-2 lg:order-none grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 sm:p-5 rounded-xl bg-[#FAF8F5] dark:bg-[#0A0908] border border-black/10 dark:border-white/10 flex flex-col justify-between space-y-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37]">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-syne text-xs sm:text-sm font-bold uppercase tracking-wider text-[#111111] dark:text-brand-white">
                      INTERNATIONAL PLATFORM
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-[#444444] dark:text-brand-platinum/90 font-normal leading-relaxed mt-0.5">
                      Runway, talent and creative opportunities across the UAE, India and global destinations.
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-5 rounded-xl bg-[#FAF8F5] dark:bg-[#0A0908] border border-black/10 dark:border-white/10 flex flex-col justify-between space-y-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37]">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-syne text-xs sm:text-sm font-bold uppercase tracking-wider text-[#111111] dark:text-brand-white">
                      GLOBAL COMMUNITY
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-[#444444] dark:text-brand-platinum/90 font-normal leading-relaxed mt-0.5">
                      Connecting designers, talent, brands and audiences.
                    </p>
                  </div>
                </div>
              </div>

              {/* EXPLORE FASHAI ECOSYSTEM Card */}
              <div className="order-4 lg:order-none relative p-5 sm:p-6 rounded-xl bg-gradient-to-r from-[#D4AF37]/15 via-[#D4AF37]/10 to-[#FAF8F5] dark:from-[#D4AF37]/20 dark:via-[#D4AF37]/10 dark:to-[#0A0908] border border-[#D4AF37]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md backdrop-blur-sm overflow-hidden group transition-all duration-300 hover:border-[#D4AF37]/60 lg:flex-1">
                <div className="relative z-10 space-y-1.5 text-left max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
                    </span>
                    <span className="font-syne text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                      EXPLORE FASHAI ECOSYSTEM
                    </span>
                  </div>

                  <h3 className="font-serif-display text-xl sm:text-2xl font-light text-[#111111] dark:text-brand-white uppercase leading-tight tracking-tight">
                    UPCOMING SHOWS &amp; CHAPTERS
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-[#333333] dark:text-brand-platinum/90 font-normal leading-relaxed">
                    Upcoming shows, chapters and opportunities across international fashion hubs.
                  </p>
                </div>

                <Link
                  href="/upcoming"
                  className="relative z-10 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#FFEC69] text-[#111111] px-5 py-2.5 rounded-lg font-syne text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-md group/btn whitespace-nowrap shrink-0 border border-[#D4AF37]"
                >
                  <span>SEE UPCOMING</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Bottom 3 Features Grid */}
            <div className="order-3 lg:order-none lg:col-span-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href="/upcoming"
                className="group p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#0A0908] border border-black/10 dark:border-white/10 flex items-center justify-between hover:border-[#D4AF37]/50 transition-all shadow-sm"
              >
                <div className="space-y-1.5">
                  <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37]">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-syne text-xs sm:text-sm font-bold uppercase tracking-wider text-[#111111] dark:text-brand-white">
                      INTERNATIONAL REACH
                    </h4>
                    <p className="font-sans text-xs text-[#444444] dark:text-brand-platinum/90 font-normal mt-0.5">
                      Expanding fashion beyond borders.
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#D4AF37] transition-transform group-hover:translate-x-1 flex-shrink-0 ml-2" />
              </Link>

              <Link
                href="/apply"
                className="group p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#0A0908] border border-black/10 dark:border-white/10 flex items-center justify-between hover:border-[#D4AF37]/50 transition-all shadow-sm"
              >
                <div className="space-y-1.5">
                  <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37]">
                    <Eye className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-syne text-xs sm:text-sm font-bold uppercase tracking-wider text-[#111111] dark:text-brand-white">
                      CREATIVE FOCUS
                    </h4>
                    <p className="font-sans text-xs text-[#444444] dark:text-brand-platinum/90 font-normal mt-0.5">
                      Designer, model and artistic showcases.
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#D4AF37] transition-transform group-hover:translate-x-1 flex-shrink-0 ml-2" />
              </Link>

              <Link
                href="/gallery"
                className="group p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#0A0908] border border-black/10 dark:border-white/10 flex items-center justify-between hover:border-[#D4AF37]/50 transition-all shadow-sm"
              >
                <div className="space-y-1.5">
                  <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37]">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-syne text-xs sm:text-sm font-bold uppercase tracking-wider text-[#111111] dark:text-brand-white">
                      CURATED EXPERIENCES
                    </h4>
                    <p className="font-sans text-xs text-[#444444] dark:text-brand-platinum/90 font-normal mt-0.5">
                      Runways, salons and global trade formats.
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#D4AF37] transition-transform group-hover:translate-x-1 flex-shrink-0 ml-2" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
