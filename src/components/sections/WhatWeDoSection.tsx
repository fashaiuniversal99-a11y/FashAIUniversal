"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Layers, Cpu } from "lucide-react";

export default function WhatWeDoSection() {
  const serviceCategories = [
    {
      id: "fashion_events",
      title: "FASHION SHOWS",
      subtitle: "FLAGSHIP RUNWAY",
      description: "High-impact runway productions, haute couture presentations, and designer showcases planned and executed end to end.",
      image: "/assets/events/fashion_events.png",
      badges: ["RUNWAY PRODUCTIONS", "COUTURE SALONS"],
      link: "/services/fashion_events",
    },
    {
      id: "lifestyle_events",
      title: "LIFESTYLE & VIP EVENTS",
      subtitle: "EXPERIENTIAL GALAS",
      description: "Curated VIP galas, red carpet receptions, luxury salons, and high-profile lifestyle activations across key destinations.",
      image: "/assets/events/lifestyle_events.png",
      badges: ["VIP GALAS", "RED CARPET"],
      link: "/services/lifestyle_events",
    },
    {
      id: "corporate_launches",
      title: "CORPORATE & BRAND LAUNCHES",
      subtitle: "BRAND EXPERIENCES",
      description: "Strategic event management for tech summits, global brand unveilings, corporate conferences, and flagship product launches.",
      image: "/assets/final/project-fashprism-india.jpg",
      badges: ["BRAND LAUNCHES", "TECH SUMMITS"],
      link: "/services",
    },
    {
      id: "brand_shoots",
      title: "BRAND SHOOTS",
      subtitle: "CAMPAIGNS & LOOKBOOKS",
      description: "Full-service creative direction, commercial lookbooks, editorial campaigns, and high-fashion photo & video productions.",
      image: "/assets/final/talent-model-01.jpg",
      badges: ["CAMPAIGNS", "LOOKBOOKS"],
      link: "/services",
    },
  ];

  return (
    <section id="what-we-do" className="relative py-8 sm:py-12 md:py-14 bg-white dark:bg-[#050505] border-b border-black/10 dark:border-white/10 text-[#111111] dark:text-brand-white overflow-hidden select-none">
      <div className="container-editorial relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6 sm:mb-8 border-b border-black/10 dark:border-white/10 pb-5 sm:pb-6">
          <div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-syne tracking-widest text-[#D4AF37] font-bold uppercase mb-2">
              <Layers className="w-4 h-4 text-[#D4AF37]" />
              <span>EVENT FORMATS &amp; SERVICES</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-light text-[#111111] dark:text-brand-white uppercase leading-none tracking-tight">
              OUR <span className="font-serif italic font-normal text-[#D4AF37]">SERVICES</span>
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
            <p className="font-sans text-sm sm:text-base text-[#555555] dark:text-brand-platinum/85 max-w-md font-light leading-relaxed">
              Events and talent, handled by one team. FashAI Universal conceives, designs, produces, and executes specialized event formats across fashion, lifestyle, corporate, product, and technology sectors.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#FFEC69] text-[#111111] px-6 py-3 rounded-full font-syne text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-md group"
            >
              <span>EXPLORE ALL SERVICES</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* 4-CARD CONCISE SERVICE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {serviceCategories.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative bg-[#FAF8F5] dark:bg-[#080706] border border-black/10 dark:border-white/10 rounded-2xl p-5 flex flex-col justify-between overflow-hidden shadow-sm hover:border-[#D4AF37]/60 transition-all duration-300"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-syne tracking-widest text-[#D4AF37] uppercase font-bold">
                    {item.subtitle}
                  </span>
                  <span className="text-[10px] font-syne font-bold uppercase tracking-wider text-[#666666] dark:text-brand-platinum/60">
                    0{idx + 1}
                  </span>
                </div>

                {/* Controlled Image Frame */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-black/5 dark:bg-[#030303] border border-black/10 dark:border-white/10">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover object-top group-hover:scale-[1.04] transition-transform duration-500"
                  />
                </div>

                <div>
                  <h3 className="font-serif-display text-xl sm:text-2xl font-light uppercase text-[#111111] dark:text-brand-white group-hover:text-[#D4AF37] transition-colors mb-1.5 leading-tight">
                    {item.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-[#555555] dark:text-brand-platinum/90 font-light leading-relaxed">
                    {item.description}
                  </p>

                  {/* Feature Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-3">
                    {item.badges.map((badge) => (
                      <span
                        key={badge}
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-syne uppercase tracking-wider bg-black/5 dark:bg-white/5 text-[#333333] dark:text-brand-platinum border border-black/10 dark:border-white/10 font-semibold"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-5 pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-2">
                <Link
                  href={item.link}
                  className="inline-flex items-center gap-1.5 bg-[#D4AF37] hover:bg-[#FFEC69] text-[#111111] px-4 py-2 rounded-full font-syne text-[11px] font-bold tracking-wider uppercase transition-all shadow-sm group/btn"
                >
                  <span>EXPLORE</span>
                  <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
                </Link>

                <Link
                  href="/plan-your-event"
                  className="inline-flex items-center gap-1 text-[11px] font-syne font-bold uppercase text-[#111111] dark:text-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                >
                  <span>BOOK</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI POSITIONING SUBSECTION */}
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
