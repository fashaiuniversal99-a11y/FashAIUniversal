"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Globe, Sparkles, Award, Users, Quote } from "lucide-react";

export default function HomepageProofSection() {
  const proofPillars = [
    {
      id: "proof-01",
      icon: Globe,
      badge: "PRESENCE",
      title: "UAE · INDIA · GLOBAL",
      description:
        "International footprint connecting couture destinations across Dubai, Mumbai, New Delhi, and global fashion capitals.",
    },
    {
      id: "proof-02",
      icon: Sparkles,
      badge: "CAPABILITY",
      title: "EVENT PRODUCTION",
      description:
        "End-to-end runway production, spatial light geometry, architectural stage craft, and luxury guest experiences.",
    },
    {
      id: "proof-03",
      icon: Award,
      badge: "EXCELLENCE",
      title: "LUXURY EXPERIENCES",
      description:
        "Curated high-fashion showcases, delegate summits, press lounges, and brand activations.",
    },
    {
      id: "proof-04",
      icon: Users,
      badge: "NETWORK",
      title: "GLOBAL TALENT NETWORK",
      description:
        "Verified roster of international models, couture designers, choreographers, beauty artists, and creative directors.",
    },
  ];

  const brandLogos = [
    {
      id: "logo-fashai",
      name: "FashAI Universal",
      role: "Official Brand Platform",
      src: "/assets/brand/fashai_logo_final.png",
      width: 140,
      height: 48,
    },
    {
      id: "logo-arav-powered",
      name: "Powered by Arav Innovation",
      role: "Technology Partner",
      src: "/assets/brand/Final_Powered_by_logo.png",
      width: 180,
      height: 48,
    },
    {
      id: "logo-arav-mark",
      name: "Arav Innovation Mark",
      role: "Production & Innovation",
      src: "/assets/brand/arav_green_logo.png",
      width: 120,
      height: 44,
    },
  ];

  const testimonials = [
    {
      id: "testimonial-01",
      quote: "More than events, a movement in fashion.",
      author: "FashAI Universal",
      role: "International Luxury Fashion Platform",
    },
    {
      id: "testimonial-02",
      quote: "Where fashion, technology and imagination converge.",
      author: "Arav Innovation",
      role: "Official Technology & Production Partner",
    },
  ];

  return (
    <section
      id="trusted-experience"
      className="relative py-12 sm:py-16 md:py-20 bg-[#FAF8F5] dark:bg-[#080706] text-[#111111] dark:text-white border-b border-black/10 dark:border-white/10 select-none overflow-hidden"
    >
      {/* Editorial Watermark */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="editorial-watermark absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-serif-display font-light uppercase tracking-tighter leading-none pointer-events-none select-none opacity-20 text-black/[0.02] dark:text-white/[0.02]">
          PROOF
        </div>
      </div>

      <div className="container-editorial relative z-10 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-syne font-bold tracking-micro uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
            <span>TRUSTED EXPERIENCE</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-light text-[#111111] dark:text-white uppercase leading-tight tracking-tight">
            CREDIBILITY &amp; <span className="font-serif italic text-[#D4AF37]">EXCELLENCE</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#555555] dark:text-brand-platinum/80 font-light leading-relaxed">
            Delivering high-couture fashion infrastructure, global delegate summits, and immersive creative technology.
          </p>
        </div>

        {/* 1. QUALITATIVE PROOF PILLARS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {proofPillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-white dark:bg-[#0E0D0C] border border-black/10 dark:border-white/10 rounded-2xl p-6 hover:border-[#D4AF37]/60 transition-all duration-300 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-syne tracking-widest font-bold text-[#D4AF37] uppercase">
                      {pillar.badge}
                    </span>
                  </div>
                  <h3 className="font-serif-display text-lg sm:text-xl font-light text-[#111111] dark:text-white uppercase tracking-tight mb-2">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#555555] dark:text-brand-platinum/75 font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 2. RESTRAINED APPROVED BRAND LOGO STRIP */}
        <div className="pt-6 border-t border-black/10 dark:border-white/10 text-center space-y-6">
          <span className="text-xs font-syne tracking-micro text-[#D4AF37] font-bold uppercase block">
            APPROVED BRAND &amp; PARTNER ECOSYSTEM
          </span>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-14 bg-white/50 dark:bg-[#0C0B0A]/80 border border-black/10 dark:border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xs">
            {brandLogos.map((logo) => (
              <div
                key={logo.id}
                className="flex flex-col items-center gap-2 group transition-opacity duration-300"
              >
                <div className="relative h-10 sm:h-12 w-auto max-w-[180px] flex items-center justify-center opacity-85 group-hover:opacity-100 transition-opacity">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={logo.width}
                    height={logo.height}
                    className="h-full w-auto object-contain filter drop-shadow-xs"
                  />
                </div>
                <span className="text-[10px] font-sans text-[#777777] dark:text-white/60 font-light">
                  {logo.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. PLATFORM & PARTNER POSITIONING (NON-TESTIMONIAL PLATFORM STATEMENTS) */}
        <div className="space-y-6 pt-6 border-t border-black/10 dark:border-white/10">
          <div className="text-center">
            <span className="text-xs font-syne tracking-micro text-[#D4AF37] font-bold uppercase">
              EDITORIAL &amp; PLATFORM POSITIONING
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative bg-white dark:bg-[#0E0D0C] border border-black/10 dark:border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#D4AF37]/50 transition-all duration-300 shadow-sm"
              >
                <Quote className="w-8 h-8 text-[#D4AF37]/30 mb-4" />
                <blockquote className="font-serif-display text-xl sm:text-2xl font-light text-[#111111] dark:text-white italic leading-snug mb-6">
                  “{t.quote}”
                </blockquote>
                <div className="pt-4 border-t border-black/10 dark:border-white/10">
                  <div className="font-sans text-sm font-semibold text-[#111111] dark:text-white">
                    — {t.author}
                  </div>
                  <div className="font-sans text-xs text-[#666666] dark:text-brand-platinum/70 font-light mt-0.5">
                    {t.role}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
