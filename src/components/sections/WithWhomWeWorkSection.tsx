"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ChevronDown, ChevronUp } from "lucide-react";

export interface DisciplineItem {
  number: string;
  id: string;
  label: string;
  badge: string;
  description: string;
  tags: string[];
  image: string;
  alt: string;
}

export const DISCIPLINES: DisciplineItem[] = [
  {
    number: "01",
    id: "design",
    label: "DESIGN",
    badge: "COUTURE & ATELIER",
    description:
      "Creative direction begins with an idea — from emerging designers and couture houses to the visual language of a complete fashion experience.",
    tags: ["COUTURE", "DESIGN DIRECTION", "SHOWCASE", "COLLABORATION"],
    image: "/assets/final/photo-2026-09-18-15.02.32.jpeg",
    alt: "FashAI Universal Design Direction Showcase",
  },
  {
    number: "02",
    id: "styling",
    label: "STYLING",
    badge: "WARDROBE DIRECTION",
    description:
      "Styling shapes the visual identity of a production — from wardrobe direction and editorial lookbooks to the final runway presentation.",
    tags: ["WARDROBE", "EDITORIAL", "RUNWAY", "CAMPAIGNS"],
    image: "/assets/final/photo-2026-09-18-15.02.35.jpeg",
    alt: "FashAI Universal Styling Direction Showcase",
  },
  {
    number: "03",
    id: "beauty",
    label: "BEAUTY",
    badge: "BACKSTAGE ARTISTRY",
    description:
      "Makeup, hair, and beauty direction complete the visual narrative of a fashion experience, elevating garment art on stage.",
    tags: ["BEAUTY", "EDITORIAL", "BACKSTAGE", "CAMPAIGNS"],
    image: "/assets/final/photo-2026-09-18-15.02.40.jpeg",
    alt: "FashAI Universal Beauty Artistry Showcase",
  },
  {
    number: "04",
    id: "movement",
    label: "MOVEMENT",
    badge: "STAGE CHOREOGRAPHY",
    description:
      "Choreography transforms a runway into a performance, shaping pace, catwalk movement, formations, and audience engagement.",
    tags: ["RUNWAY", "CHOREOGRAPHY", "STAGE", "PERFORMANCE"],
    image: "/assets/final/photo-2026-09-18-15.02.34.jpeg",
    alt: "FashAI Universal Movement & Stage Showcase",
  },
  {
    number: "05",
    id: "talent",
    label: "TALENT",
    badge: "RUNWAY & EDITORIAL",
    description:
      "Runway models, international talent, and creative personalities form the core of productions designed around presence and movement.",
    tags: ["RUNWAY", "EDITORIAL", "CAMPAIGNS", "CASTING"],
    image: "/assets/final/photo-2026-09-18-15.02.33.jpeg",
    alt: "FashAI Universal Talent Network Showcase",
  },
  {
    number: "06",
    id: "production",
    label: "PRODUCTION",
    badge: "EVENT SHOWCASE",
    description:
      "From architectural staging and lighting design to live execution, production brings the entire creative vision together as one experience.",
    tags: ["RUNWAY", "STAGE", "PRODUCTION", "EVENTS"],
    image: "/assets/final/photo-2026-09-18-15.02.36.jpeg",
    alt: "FashAI Universal Stage Production Showcase",
  },
  {
    number: "07",
    id: "media",
    label: "MEDIA",
    badge: "EDITORIAL & STORYTELLING",
    description:
      "Editorial commentary, digital storytelling, press coverage, and content amplification extend the experience beyond the room.",
    tags: ["EDITORIAL", "CONTENT", "COVERAGE", "DIGITAL"],
    image: "/assets/final/photo-2026-09-18-15.02.45.jpeg",
    alt: "FashAI Universal Media & Storytelling Showcase",
  },
  {
    number: "08",
    id: "technology",
    label: "TECHNOLOGY",
    badge: "DIGITAL INNOVATION",
    description:
      "Technology adds new dimensions to fashion and event experiences through spatial stage design, interactive concierge flows, and digital innovation.",
    tags: ["DIGITAL", "INTERACTIVE", "SPATIAL", "EXPERIENCE"],
    image: "/assets/final/photo-2026-09-18-15.02.48.jpeg",
    alt: "FashAI Universal Digital Innovation Showcase",
  },
];

export default function WithWhomWeWorkSection() {
  const [activeDiscipline, setActiveDiscipline] = useState<DisciplineItem>(DISCIPLINES[0]);
  const [expandedMobileId, setExpandedMobileId] = useState<string | null>("design");

  const toggleMobileDiscipline = (id: string) => {
    if (expandedMobileId === id) {
      setExpandedMobileId(null);
    } else {
      setExpandedMobileId(id);
      const disc = DISCIPLINES.find((d) => d.id === id);
      if (disc) setActiveDiscipline(disc);
    }
  };

  return (
    <section
      id="constellation"
      className="relative py-10 sm:py-14 bg-[#050505] border-b border-white/10 text-brand-white overflow-hidden selection:bg-brand-yellow-golden selection:text-black"
    >
      <div className="container-editorial relative z-10">
        {/* 1. NEW EDITORIAL SECTION HEADER */}
        <div className="max-w-4xl mb-10 sm:mb-14">
          {/* Refined Eyebrow */}
          <div className="flex items-center gap-2 text-xs font-syne tracking-micro text-brand-yellow-golden font-bold uppercase mb-3">
            <span>EXPLORE THE CONNECTIONS</span>
          </div>

          {/* Large Editorial Headline */}
          <h2 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-light text-brand-white leading-[0.92] tracking-tight mb-4">
            Global <span className="font-serif italic text-brand-yellow-golden font-normal">Connections</span>
          </h2>

          {/* Thin Gold Accent Line */}
          <div className="flex items-center gap-3 w-full max-w-xs mb-5">
            <span className="h-[2px] w-12 bg-brand-yellow-golden shadow-[0_0_10px_rgba(250,182,10,0.6)]" />
            <span className="h-[1px] flex-1 bg-gradient-to-r from-brand-yellow-golden/60 via-brand-yellow-golden/20 to-transparent" />
          </div>

          {/* Concise Paragraph */}
          <p className="font-sans text-sm sm:text-base text-brand-platinum/90 font-light leading-relaxed max-w-xl">
            From creative direction and couture to movement, beauty, talent, production, and digital experiences, FashAI Universal brings the disciplines behind modern fashion experiences together.
          </p>
        </div>

        {/* 2. ASYMMETRIC EDITORIAL LAYOUT (DESKTOP) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* LEFT SIDE (58%–62% width): Large Dominating Fashion Image & Dynamic Details */}
          <div className="lg:col-span-7 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDiscipline.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6"
              >
                {/* Large Campaign Editorial Image Container */}
                <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:h-[620px] w-full rounded-2xl overflow-hidden border border-brand-yellow-golden/30 bg-[#0A0908] shadow-2xl group">
                  <Image
                    src={activeDiscipline.image}
                    alt={activeDiscipline.alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-center filter contrast-105 transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                  {/* Subtle Dark Vignette & Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-transparent" />

                  {/* Magazine Caption Overlay */}
                  <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between font-syne text-[11px] sm:text-xs tracking-wider text-brand-yellow-golden uppercase font-bold drop-shadow">
                    <span>{activeDiscipline.label} DIRECTION</span>
                    <span className="text-white/80">FASHAI UNIVERSAL</span>
                  </div>
                </div>

                {/* Content Details Below Image */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-syne tracking-micro text-brand-yellow-golden font-bold uppercase">
                      {activeDiscipline.badge}
                    </span>
                    <span className="text-xs font-syne tracking-wider text-white/50 uppercase font-bold">
                      DISCIPLINE
                    </span>
                  </div>

                  <h3 className="font-serif-display text-3xl sm:text-4xl font-light text-brand-white uppercase tracking-tight">
                    {activeDiscipline.label}
                  </h3>

                  <p className="font-sans text-sm sm:text-base text-brand-platinum/90 font-light leading-relaxed max-w-xl">
                    {activeDiscipline.description}
                  </p>

                  {/* Metadata Tags */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {activeDiscipline.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-syne tracking-wider text-white/80 bg-white/5 border border-white/15 px-3 py-1.5 rounded-full uppercase font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT SIDE (38%–42% width): Sophisticated Vertical Discipline Selector */}
          <div className="lg:col-span-5 space-y-4">
            <div className="hidden lg:flex items-center justify-between text-xs font-syne tracking-wider text-brand-yellow-golden font-bold uppercase mb-2">
              <span>DISCIPLINES</span>
              <span>DISCIPLINES</span>
            </div>

            {/* DESKTOP VERTICAL DISCIPLINE SELECTOR */}
            <div className="hidden lg:flex flex-col divide-y divide-white/10 border-t border-b border-white/10">
              {DISCIPLINES.map((item) => {
                const isActive = activeDiscipline.id === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveDiscipline(item)}
                    onMouseEnter={() => setActiveDiscipline(item)}
                    className={`group flex items-center justify-between py-4 px-3 text-left transition-all duration-300 ${
                      isActive
                        ? "text-brand-yellow-golden font-bold bg-brand-yellow-golden/5"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-syne text-lg sm:text-xl font-bold tracking-wider uppercase group-hover:translate-x-1.5 transition-transform duration-300">
                        {item.label}
                      </span>
                    </div>

                    <span
                      className={`text-xs font-syne text-brand-yellow-golden transition-all duration-300 ${
                        isActive
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                      }`}
                    >
                      →
                    </span>
                  </button>
                );
              })}
            </div>

            {/* MOBILE ACCORDION / DISCIPLINE SELECTOR (< lg screens) */}
            <div className="lg:hidden space-y-3 pt-4 border-t border-white/10">
              <div className="text-xs font-syne tracking-wider text-brand-yellow-golden font-bold uppercase mb-2">
                DISCIPLINES ACCORDION
              </div>

              {DISCIPLINES.map((item) => {
                const isExpanded = expandedMobileId === item.id;
                return (
                  <div
                    key={item.id}
                    className="border border-white/10 rounded-xl bg-[#090807] overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => toggleMobileDiscipline(item.id)}
                      className={`w-full flex items-center justify-between px-5 py-4 text-left font-syne text-sm font-bold uppercase tracking-wider transition-colors ${
                        isExpanded ? "text-brand-yellow-golden bg-brand-yellow-golden/10" : "text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-brand-yellow-golden">{item.number}</span>
                        <span>{item.label}</span>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-brand-yellow-golden shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-white/50 shrink-0" />
                      )}
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-5 pb-5 pt-2 space-y-3 border-t border-white/10"
                        >
                          <span className="text-[10px] font-syne tracking-micro text-brand-yellow-golden font-bold uppercase px-2.5 py-0.5 bg-brand-yellow-golden/15 border border-brand-yellow-golden/30 rounded">
                            {item.badge}
                          </span>
                          <p className="font-sans text-xs text-brand-platinum/90 font-light leading-relaxed">
                            {item.description}
                          </p>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[9px] font-syne tracking-wider text-white/80 bg-white/5 border border-white/15 px-2.5 py-1 rounded-full uppercase"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. REFINED EDITORIAL SECTION FOOTER CTA */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-white/10 flex items-center justify-between">
          <Link
            href="#what-we-do"
            className="group inline-flex items-center gap-4 text-xs sm:text-sm font-syne tracking-caps font-bold text-brand-white hover:text-brand-yellow-golden transition-colors"
          >
            <span>EXPLORE WHAT WE CREATE</span>
            <span className="h-[1px] w-12 sm:w-16 bg-brand-yellow-golden/60 group-hover:w-24 transition-all duration-300" />
            <span className="group-hover:translate-x-2 transition-transform duration-300 text-brand-yellow-golden">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
