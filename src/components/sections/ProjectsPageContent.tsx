"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, Instagram, Facebook, Sparkles, Film, Compass, Users } from "lucide-react";
import { FASHPRISM_INDIA_DATA, FASHPRISM_INTERNATIONAL_DATA, FASHPRISM_VIP_DATA, FashPrismItem } from "@/data/fashprism";

export default function ProjectsPageContent() {
  const [activeTab, setActiveTab] = useState<"ALL" | "FASHPRISM_INDIA" | "FASHPRISM_INTERNATIONAL" | "VIP_GUESTS" | "CHOREOGRAPHY" | "VIDEO_EDITING">("ALL");

  const FACEBOOK_PROJECT_URL = "https://www.facebook.com/profile.php?id=61573489951314";
  const INSTAGRAM_FASHPRISM_URL = "https://www.instagram.com/fashai_universal";

  return (
    <section className="relative py-12 sm:py-16 md:py-20 bg-white dark:bg-[#050505] text-[#111111] dark:text-white min-h-screen select-none">
      <div className="container-editorial max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <span className="text-xs sm:text-sm font-syne tracking-[0.25em] text-[#D4AF37] font-bold uppercase">
              FASHAI DELIVERED PORTFOLIO
            </span>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>

          <h1 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-light text-[#111111] dark:text-white uppercase leading-tight">
            OUR <span className="font-serif italic text-[#D4AF37]">PROJECTS</span>
          </h1>

          <p className="font-sans text-base sm:text-lg md:text-xl text-gray-700 dark:text-brand-platinum/85 font-light mt-4 leading-relaxed">
            Delivered fashion showcases, FashPrism editions, VIP guest salons, choreography direction, and video editing production.
          </p>

          {/* Social Destinations Strip */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <a
              href={FACEBOOK_PROJECT_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="FashPrism Facebook"
              className="inline-flex items-center justify-center bg-[#D4AF37] hover:bg-[#b89528] text-black p-3 rounded-full transition-all shadow-md"
            >
              <Facebook className="w-4 h-4 text-black" />
            </a>
            <a
              href={INSTAGRAM_FASHPRISM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="FashPrism Instagram"
              className="inline-flex items-center justify-center bg-[#D4AF37] hover:bg-[#b89528] text-black p-3 rounded-full transition-all shadow-md"
            >
              <Instagram className="w-4 h-4 text-black" />
            </a>
          </div>

          <div className="w-20 h-[2px] bg-[#D4AF37] mx-auto mt-6" />
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2.5 sm:gap-3 mb-10 sm:mb-14">
          {[
            { id: "ALL", label: "ALL PROJECTS" },
            { id: "FASHPRISM_INDIA", label: "FASHPRISM INDIA" },
            { id: "FASHPRISM_INTERNATIONAL", label: "FASHPRISM INTERNATIONAL" },
            { id: "VIP_GUESTS", label: "VIP GUESTS" },
            { id: "CHOREOGRAPHY", label: "CHOREOGRAPHER" },
            { id: "VIDEO_EDITING", label: "VIDEO EDITOR" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-syne font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-[#D4AF37] text-black shadow-md scale-[1.02]"
                  : "bg-black/5 dark:bg-white/5 text-[#333333] dark:text-white/80 border border-black/10 dark:border-white/10 hover:border-[#D4AF37]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* SECTION 1: FASHPRISM INDIA & MISS INDIA SHOWCASE */}
        {(activeTab === "ALL" || activeTab === "FASHPRISM_INDIA") && (
          <div className="mb-14 sm:mb-20 space-y-8 border-b border-black/10 dark:border-white/10 pb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/10 dark:border-white/10 pb-4">
              <div>
                <span className="text-xs font-syne font-bold tracking-widest text-[#D4AF37] uppercase block mb-1">
                  PROJECT EDITION 01
                </span>
                <h2 className="font-serif-display text-3xl sm:text-5xl font-light uppercase">
                  FASHPRISM INDIA &amp; MISS INDIA SHOWCASE
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={INSTAGRAM_FASHPRISM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="FashPrism Instagram"
                  className="inline-flex items-center justify-center bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 p-2.5 rounded-full hover:border-[#D4AF37] transition-colors text-gray-900 dark:text-white"
                >
                  <Instagram className="w-4 h-4 text-[#D4AF37]" />
                </a>
                <a
                  href={FACEBOOK_PROJECT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="FashPrism Facebook"
                  className="inline-flex items-center justify-center bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 p-2.5 rounded-full hover:border-[#D4AF37] transition-colors text-gray-900 dark:text-white"
                >
                  <Facebook className="w-4 h-4 text-[#D4AF37]" />
                </a>
              </div>
            </div>

            {/* FashPrism India Delivery Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF8F5] dark:bg-[#080706] p-6 sm:p-8 rounded-2xl border border-black/10 dark:border-white/10">
              <div className="lg:col-span-7 space-y-4">
                <h3 className="font-serif-display text-2xl sm:text-3xl font-light uppercase text-[#D4AF37]">
                  WHAT FASHAI CREATED &amp; DELIVERED
                </h3>
                <p className="font-sans text-base sm:text-lg text-gray-900 dark:text-brand-platinum/90 leading-relaxed font-normal">
                  For FashPrism India and the Miss India presentation chapter, FashAI Universal designed and executed full-scale runway catwalk choreography, haute couture textile draping, backstage artistry, and photographic visual archive production.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    "Couture Silhouette & Drapery Study",
                    "Catwalk Movement & Pace Direction",
                    "FashPrism Miss India Pageant Presentation",
                    "Backstage Styling & High-Definition Media Archive",
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs sm:text-sm font-syne font-bold uppercase text-[#333333] dark:text-white/90">
                      <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 relative aspect-[4/3] rounded-xl overflow-hidden border border-black/10 dark:border-white/15 bg-black p-2 flex items-center justify-center">
                <Image
                  src="/assets/final/photo-2026-09-18-15.03.32.jpeg"
                  alt="FashPrism India Feature"
                  fill
                  className="object-contain object-center"
                />
              </div>
            </div>

            {/* FashPrism India Gallery */}
            <div>
              <h4 className="font-syne text-xs font-bold uppercase tracking-wider text-[#888888] mb-4">
                FASHPRISM INDIA CREATED GALLERY &amp; DELIVERABLES
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {FASHPRISM_INDIA_DATA.slice(0, 4).map((item) => (
                  <div key={item.id} className="group bg-[#FAF8F5] dark:bg-[#0A0908] border border-black/10 dark:border-white/10 rounded-xl overflow-hidden p-4 space-y-3">
                    <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-black p-1 flex items-center justify-center">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-contain object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-syne font-bold uppercase text-[#D4AF37] block">
                        {item.tag}
                      </span>
                      <h5 className="font-serif-display text-lg font-light uppercase text-[#111111] dark:text-white">
                        {item.title}
                      </h5>
                      <p className="font-sans text-xs text-gray-800 dark:text-brand-platinum/80 line-clamp-2">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: FASHPRISM INTERNATIONAL & MISS INTERNATIONAL */}
        {(activeTab === "ALL" || activeTab === "FASHPRISM_INTERNATIONAL") && (
          <div className="mb-14 sm:mb-20 space-y-8 border-b border-black/10 dark:border-white/10 pb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/10 dark:border-white/10 pb-4">
              <div>
                <span className="text-xs font-syne font-bold tracking-widest text-[#D4AF37] uppercase block mb-1">
                  PROJECT EDITION 02
                </span>
                <h2 className="font-serif-display text-3xl sm:text-5xl font-light uppercase">
                  FASHPRISM INTERNATIONAL &amp; MISS INTERNATIONAL SHOWCASE
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={INSTAGRAM_FASHPRISM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="FashPrism Instagram"
                  className="inline-flex items-center justify-center bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 p-2.5 rounded-full hover:border-[#D4AF37] transition-colors text-gray-900 dark:text-white"
                >
                  <Instagram className="w-4 h-4 text-[#D4AF37]" />
                </a>
                <a
                  href={FACEBOOK_PROJECT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="FashPrism Facebook"
                  className="inline-flex items-center justify-center bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 p-2.5 rounded-full hover:border-[#D4AF37] transition-colors text-gray-900 dark:text-white"
                >
                  <Facebook className="w-4 h-4 text-[#D4AF37]" />
                </a>
              </div>
            </div>

            {/* Delivery Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF8F5] dark:bg-[#080706] p-6 sm:p-8 rounded-2xl border border-black/10 dark:border-white/10">
              <div className="lg:col-span-7 space-y-4">
                <h3 className="font-serif-display text-2xl sm:text-3xl font-light uppercase text-[#D4AF37]">
                  WHAT FASHAI CREATED &amp; DELIVERED
                </h3>
                <p className="font-sans text-base sm:text-lg text-gray-900 dark:text-brand-platinum/90 leading-relaxed font-normal">
                  For FashPrism International and the Miss International showcase series, FashAI Universal delivered architectural lighting design, global catwalk staging, multi-angle broadcast video, and international delegate hospitality.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    "Global Catwalk Presentation Formats",
                    "Architectural Monolith Stage Illumination",
                    "Miss International Pageant Spotlight",
                    "Cross-Border Delegate Networking Salons",
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs sm:text-sm font-syne font-bold uppercase text-[#333333] dark:text-white/90">
                      <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 relative aspect-[4/3] rounded-xl overflow-hidden border border-black/10 dark:border-white/15 bg-black p-2 flex items-center justify-center">
                <Image
                  src="/assets/final/photo-2026-09-18-15.02.37.jpeg"
                  alt="FashPrism International Feature"
                  fill
                  className="object-contain object-center"
                />
              </div>
            </div>

            {/* International Gallery */}
            <div>
              <h4 className="font-syne text-xs font-bold uppercase tracking-wider text-[#888888] mb-4">
                FASHPRISM INTERNATIONAL GALLERY &amp; DELIVERABLES
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {FASHPRISM_INTERNATIONAL_DATA.map((item) => (
                  <div key={item.id} className="group bg-[#FAF8F5] dark:bg-[#0A0908] border border-black/10 dark:border-white/10 rounded-xl overflow-hidden p-4 space-y-3">
                    <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-black p-1 flex items-center justify-center">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-contain object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-syne font-bold uppercase text-[#D4AF37] block">
                        {item.tag}
                      </span>
                      <h5 className="font-serif-display text-lg font-light uppercase text-[#111111] dark:text-white">
                        {item.title}
                      </h5>
                      <p className="font-sans text-xs text-gray-800 dark:text-brand-platinum/80 line-clamp-2">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: VIP GUESTS */}
        {(activeTab === "ALL" || activeTab === "VIP_GUESTS") && (
          <div className="mb-14 sm:mb-20 space-y-8 border-b border-black/10 dark:border-white/10 pb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/10 dark:border-white/10 pb-4">
              <div>
                <span className="text-xs font-syne font-bold tracking-widest text-[#D4AF37] uppercase block mb-1">
                  PROJECT EDITION 03
                </span>
                <h2 className="font-serif-display text-3xl sm:text-5xl font-light uppercase">
                  VIP GUESTS &amp; DIGNITARIES
                </h2>
              </div>
              <a
                href={FACEBOOK_PROJECT_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="FashPrism Facebook"
                className="inline-flex items-center justify-center bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 p-2.5 rounded-full hover:border-[#D4AF37] transition-colors text-gray-900 dark:text-white"
              >
                <Facebook className="w-4 h-4 text-[#D4AF37]" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {FASHPRISM_VIP_DATA.map((item) => (
                <div key={item.id} className="group bg-[#FAF8F5] dark:bg-[#0A0908] border border-black/10 dark:border-white/10 rounded-xl overflow-hidden p-4 space-y-3">
                  <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-black p-1 flex items-center justify-center">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-contain object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-syne font-bold uppercase text-[#D4AF37] block">
                      {item.tag}
                    </span>
                    <h5 className="font-serif-display text-lg font-light uppercase text-[#111111] dark:text-white">
                      {item.title}
                    </h5>
                    <p className="font-sans text-xs text-gray-800 dark:text-brand-platinum/80 line-clamp-2">
                      {item.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: CHOREOGRAPHER */}
        {(activeTab === "ALL" || activeTab === "CHOREOGRAPHY") && (
          <div className="mb-14 sm:mb-20 space-y-8 border-b border-black/10 dark:border-white/10 pb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/10 dark:border-white/10 pb-4">
              <div>
                <span className="text-xs font-syne font-bold tracking-widest text-[#D4AF37] uppercase block mb-1">
                  PROJECT SPECIALIZATION 04
                </span>
                <h2 className="font-serif-display text-3xl sm:text-5xl font-light uppercase">
                  CHOREOGRAPHER &amp; MOVEMENT DIRECTION
                </h2>
              </div>
              <Link
                href="/contact?type=Choreography"
                className="inline-flex items-center gap-1.5 bg-[#D4AF37] hover:bg-[#b89528] text-black px-5 py-2 text-xs font-syne font-bold uppercase rounded-full transition-all shadow-md"
              >
                <span>ENQUIRE CHOREOGRAPHY</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF8F5] dark:bg-[#080706] p-6 sm:p-8 rounded-2xl border border-black/10 dark:border-white/10">
              <div className="lg:col-span-7 space-y-4">
                <p className="font-sans text-base sm:text-lg text-gray-900 dark:text-brand-platinum/90 leading-relaxed font-normal">
                  Choreography transforms a runway into a live performance art piece. FashAI Universal provides runway movement direction, model cadence synchronization, stage entry choreography, and catwalk pace optimization for couture shows.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    "Runway Catwalk Cadence & Pace Direction",
                    "Synchronized Ensemble Formations",
                    "Backstage Cueing & Music Integration",
                    "High-Fashion Performance Movement",
                  ].map((c, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs sm:text-sm font-syne font-bold uppercase text-[#333333] dark:text-white/90">
                      <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 relative aspect-[16/10] rounded-xl overflow-hidden border border-black/10 dark:border-white/15 bg-black p-2 flex items-center justify-center">
                <Image
                  src="/assets/homepage/Moments.png"
                  alt="Catwalk Choreography Direction"
                  fill
                  className="object-contain object-center"
                />
              </div>
            </div>
          </div>
        )}

        {/* SECTION 5: VIDEO EDITOR */}
        {(activeTab === "ALL" || activeTab === "VIDEO_EDITING") && (
          <div className="mb-14 sm:mb-20 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/10 dark:border-white/10 pb-4">
              <div>
                <span className="text-xs font-syne font-bold tracking-widest text-[#D4AF37] uppercase block mb-1">
                  PROJECT SPECIALIZATION 05
                </span>
                <h2 className="font-serif-display text-3xl sm:text-5xl font-light uppercase">
                  VIDEO EDITOR &amp; DIGITAL PR PRODUCTION
                </h2>
              </div>
              <Link
                href="/contact?type=VideoProduction"
                className="inline-flex items-center gap-1.5 bg-[#D4AF37] hover:bg-[#b89528] text-black px-5 py-2 text-xs font-syne font-bold uppercase rounded-full transition-all shadow-md"
              >
                <span>ENQUIRE VIDEO PRODUCTION</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF8F5] dark:bg-[#080706] p-6 sm:p-8 rounded-2xl border border-black/10 dark:border-white/10">
              <div className="lg:col-span-7 space-y-4">
                <p className="font-sans text-base sm:text-lg text-gray-900 dark:text-brand-platinum/90 leading-relaxed font-normal">
                  High-definition video editing, highlight showreels, digital campaign clips, and broadcast media production. We edit multi-camera runway video, brand campaign reels, and social media shorts.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    "Multi-Camera Runway Edit & Color Grading",
                    "Cinematic Showreels & Highlight Films",
                    "Digital PR & Social Media Reel Cuts",
                    "Broadcast-Ready 4K Post-Production",
                  ].map((v, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs sm:text-sm font-syne font-bold uppercase text-[#333333] dark:text-white/90">
                      <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                      <span>{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 relative aspect-[16/10] rounded-xl overflow-hidden border border-black/10 dark:border-white/15 bg-black p-2 flex items-center justify-center">
                <Image
                  src="/assets/events/lifestyle_banner.png"
                  alt="Video Editing Showreel Frame"
                  fill
                  className="object-contain object-center"
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

