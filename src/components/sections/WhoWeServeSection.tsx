"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";

interface DisciplineItem {
  id: string;
  label: string;
  category: string;
  tagline: string;
  image: string;
  objectPosition?: string;
  tags: string[];
}

const DISCIPLINES: DisciplineItem[] = [
  {
    id: "design",
    label: "DESIGN",
    category: "COUTURE & ATELIER",
    tagline: "Couture houses, emerging designers, and luxury apparel creators shaping the future of fashion.",
    image: "/assets/homepage/Design.png",
    objectPosition: "center top",
    tags: ["COUTURE", "ATELIER", "RUNWAY", "CREATION"],
  },
  {
    id: "styling",
    label: "STYLING",
    category: "WARDROBE & DIRECTION",
    tagline: "Wardrobe curators shaping campaign lookbooks, visual aesthetics, and editorial identity.",
    image: "/assets/homepage/Fashion.png",
    objectPosition: "center top",
    tags: ["WARDROBE", "LOOKBOOKS", "EDITORIAL", "DIRECTION"],
  },
  {
    id: "beauty",
    label: "BEAUTY",
    category: "BACKSTAGE ARTISTRY",
    tagline: "Beauty directors, makeup artists, and hair stylists crafting runway-ready looks.",
    image: "/assets/homepage/Beauty.png",
    objectPosition: "center top",
    tags: ["BACKSTAGE", "ARTISTRY", "MAKEUP", "EDITORIAL"],
  },
  {
    id: "movement",
    label: "MOVEMENT",
    category: "MOVEMENT DIRECTION",
    tagline: "Choreography transforms a runway into a performance, shaping pace, movement, formations, and audience engagement.",
    image: "/assets/homepage/Moments.png",
    objectPosition: "center top",
    tags: ["RUNWAY", "CHOREOGRAPHY", "STAGE", "PERFORMANCE"],
  },
  {
    id: "talent",
    label: "TALENT",
    category: "MODELS & CATWALK",
    tagline: "High-fashion catwalk models, editorial talent, and international brand ambassadors.",
    image: "/assets/homepage/Talent.png",
    objectPosition: "center top",
    tags: ["CATWALK", "MODELS", "SHOWCASE", "TALENT"],
  },
  {
    id: "production",
    label: "PRODUCTION",
    category: "STAGING & EXPERIENCES",
    tagline: "High-impact runway productions, lighting design, audio-visual direction, and galas.",
    image: "/assets/homepage/Production.png",
    objectPosition: "center top",
    tags: ["STAGING", "GALAS", "LIGHTING", "PRODUCTIONS"],
  },
  {
    id: "media",
    label: "MEDIA",
    category: "DIGITAL & PRESS",
    tagline: "Digital storytellers, fashion journalists, content creators, and global broadcast voices.",
    image: "/assets/homepage/Media.png",
    objectPosition: "center top",
    tags: ["PRESS", "CONTENT", "CAMPAIGNS", "MEDIA"],
  },
  {
    id: "technology",
    label: "TECHNOLOGY",
    category: "INNOVATION & LUXURY",
    tagline: "Global sponsors, interactive digital installations, digital trade formats, and luxury platforms.",
    image: "/assets/homepage/Technology.png",
    objectPosition: "center top",
    tags: ["DIGITAL INNOVATION", "INTERACTIVE", "SPONSORS", "LUXURY"],
  },
];

export default function WhoWeServeSection() {
  const [activeDiscipline, setActiveDiscipline] = useState<DisciplineItem>(DISCIPLINES[0]); // Default to Design
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeIndex = DISCIPLINES.findIndex((d) => d.id === activeDiscipline.id);

  return (
    <section id="people-creativity" className="relative pt-8 sm:pt-12 md:pt-14 pb-5 sm:pb-7 lg:pb-8 bg-white dark:bg-[#050505] border-b border-black/10 dark:border-white/10 text-[#111111] dark:text-brand-white overflow-hidden">
      <div className="container-editorial relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black/10 dark:border-white/10 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm md:text-base font-syne tracking-widest text-[#D4AF37] font-bold uppercase mb-2.5">
              <span>WHO WE WORK WITH</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-light text-[#111111] dark:text-brand-white leading-tight tracking-tight">
              Industries We <span className="font-serif italic font-normal text-[#D4AF37]">Support</span>
            </h2>
          </div>
          <p
            style={{ fontSize: "clamp(17px, 1.2vw, 19px)", lineHeight: 1.6 }}
            className="font-sans text-[#222222] dark:text-brand-off-white max-w-lg font-normal tracking-wide"
          >
            Working with brands and businesses across fashion, lifestyle, technology and consumer categories.
          </p>
        </div>

        {/* 5-Category Industry Visual Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-10">
          {[
            {
              title: "JEWELLERY",
              desc: "Haute joaillerie, fine craftsmanship, and luxury adornments.",
              image: "/assets/industries/Jewellary.png",
              objectPosition: "center center",
            },
            {
              title: "CLOTHING",
              desc: "Couture houses, ready-to-wear lines, and designer apparel.",
              image: "/assets/industries/clothings.png",
              objectPosition: "center top",
            },
            {
              title: "ACCESSORIES",
              desc: "Leather goods, footwear, luxury accents, and timepieces.",
              image: "/assets/industries/accesorries.png",
              objectPosition: "center center",
            },
            {
              title: "ELECTRONICS",
              desc: "Premium consumer tech, AI hardware, and digital devices.",
              image: "/assets/industries/electronics.png",
              objectPosition: "center center",
            },
            {
              title: "PERFUMES",
              desc: "Niche fragrances, luxury cosmetics, and haute perfumery.",
              image: "/assets/industries/perfumes.png",
              objectPosition: "center center",
            },
          ].map((ind, idx) => (
            <motion.div
              key={ind.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="group relative bg-[#FAF8F5] dark:bg-[#080706] border border-black/10 dark:border-white/10 rounded-2xl p-5 flex flex-col justify-between overflow-hidden hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl mb-4 bg-black/5 dark:bg-[#030303] border border-black/10 dark:border-white/10">
                <Image
                  src={ind.image}
                  alt={ind.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  style={{ objectPosition: ind.objectPosition }}
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
              <div>
                <h3 className="font-syne text-base sm:text-lg md:text-xl font-bold uppercase tracking-wider text-[#111111] dark:text-brand-white group-hover:text-[#D4AF37] transition-colors mb-1.5">
                  {ind.title}
                </h3>
                <p className="font-sans text-base sm:text-lg text-[#333333] dark:text-brand-off-white font-normal leading-relaxed">
                  {ind.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile / Tablet Compact Expandable Selector */}
        <div className="lg:hidden mb-8 relative">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-full px-5 py-4 bg-[#FAF8F5] dark:bg-[#0A0908] border border-black/10 dark:border-white/10 rounded-xl flex items-center justify-between text-left shadow-sm"
          >
            <div>
              <span className="text-xs sm:text-sm font-syne uppercase text-[#D4AF37] tracking-wider block font-bold mb-0.5">
                DISCIPLINES
              </span>
              <span className="font-serif-display text-2xl font-normal text-black dark:text-white uppercase">
                {activeDiscipline.label}
              </span>
            </div>
            <ChevronDown
              className={`w-6 h-6 text-black/60 dark:text-white/60 transition-transform duration-200 ${
                isMobileMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#0C0B0A] border border-black/10 dark:border-white/10 rounded-xl shadow-2xl z-30 overflow-hidden py-2">
              {DISCIPLINES.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveDiscipline(item);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full px-5 py-3 text-left flex items-center justify-between text-base font-syne uppercase tracking-wider transition-colors ${
                    activeDiscipline.id === item.id
                      ? "bg-[#D4AF37]/10 text-[#D4AF37] font-bold"
                      : "text-black dark:text-white/80 hover:text-[#D4AF37] hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-xs sm:text-sm opacity-60 font-normal">{item.category}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Editorial Layout: Left (Image + Content Underneath) | Right (Discipline Rail) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT / MAIN: Featured Image + Content Underneath */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Featured Image Container */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9.5] w-full rounded-2xl overflow-hidden border border-black/15 dark:border-white/15 bg-[#FAF8F5] dark:bg-[#090807] shadow-md group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDiscipline.id}
                  initial={{ opacity: 0, x: 10, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -10, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeDiscipline.image}
                    alt={activeDiscipline.label}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    style={{ objectPosition: activeDiscipline.objectPosition || "center 12%" }}
                    className="object-cover filter contrast-[1.04]"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Content Directly Underneath Featured Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDiscipline.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-4 pt-2"
              >
                <div>
                  <span className="text-xs sm:text-sm md:text-base font-syne tracking-widest text-[#D4AF37] font-bold uppercase block mb-1.5">
                    {activeDiscipline.category}
                  </span>
                  <h3 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-light text-black dark:text-white uppercase leading-tight">
                    {activeDiscipline.label}
                  </h3>
                </div>

                <p className="font-sans text-lg sm:text-xl md:text-2xl text-[#222222] dark:text-brand-off-white font-normal leading-relaxed max-w-2xl">
                  {activeDiscipline.tagline}
                </p>

                {/* Tags / Badges */}
                <div className="flex flex-wrap gap-2.5 pt-2">
                  {activeDiscipline.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 text-xs sm:text-sm font-syne tracking-wider uppercase font-semibold text-[#333333] dark:text-brand-off-white bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT: Editorial Discipline Rail */}
          <div className="hidden lg:flex lg:col-span-5 flex-col pl-4 self-stretch">
            <span className="text-xs sm:text-sm md:text-base font-syne tracking-widest text-[#D4AF37] font-bold uppercase mb-4">
              DISCIPLINES
            </span>

            <div className="relative flex-1 flex gap-5 items-stretch">
              {/* Editorial Vertical Guide Line */}
              <div className="relative w-[3px] bg-black/10 dark:bg-white/10 rounded-full my-1 self-stretch">
                <motion.div
                  className="absolute left-0 w-full bg-[#D4AF37] rounded-full shadow-sm"
                  animate={{
                    height: `${100 / DISCIPLINES.length}%`,
                    top: `${(activeIndex * 100) / DISCIPLINES.length}%`,
                  }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>

              {/* Discipline Rows */}
              <div className="flex-1 flex flex-col justify-between">
                {DISCIPLINES.map((item) => {
                  const isActive = activeDiscipline.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onMouseEnter={() => setActiveDiscipline(item)}
                      onClick={() => setActiveDiscipline(item)}
                      className="group cursor-pointer py-3 px-2 border-b border-black/10 dark:border-white/10 transition-colors duration-200 flex items-center justify-between"
                    >
                      <span
                        className={`font-serif-display text-2xl lg:text-3xl xl:text-4xl font-light tracking-wide uppercase transition-colors duration-200 ${
                          isActive
                            ? "text-[#D4AF37] font-normal"
                            : "text-black dark:text-white/80 group-hover:text-[#D4AF37]"
                        }`}
                      >
                        {item.label}
                      </span>

                      <ArrowUpRight
                        className={`w-6 h-6 transition-all duration-300 ${
                          isActive
                            ? "text-[#D4AF37] translate-x-0.5 -translate-y-0.5 opacity-100"
                            : "text-black/30 dark:text-white/30 opacity-0 group-hover:opacity-100 group-hover:text-[#D4AF37]"
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Below Industries Section */}
        <div className="mt-8 sm:mt-10 pt-6 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-serif-display text-2xl sm:text-3xl font-light uppercase text-[#111111] dark:text-white">
              NEED BESPOKE EVENT PRODUCTION FOR YOUR BRAND?
            </h4>
            <p className="font-sans text-base sm:text-lg text-[#333333] dark:text-brand-off-white font-normal">
              Enquire now for custom event management, runway direction, and brand launches.
            </p>
          </div>
          <Link
            href="/contact?type=IndustryInquiry"
            className="inline-flex items-center justify-center gap-2.5 bg-[#D4AF37] hover:bg-[#FFEC69] text-[#111111] border border-[#D4AF37] px-7 py-3.5 rounded-full font-syne text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 shadow-lg group shrink-0 whitespace-nowrap"
          >
            <span>BOOK YOUR EVENT EXPERIENCE</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
