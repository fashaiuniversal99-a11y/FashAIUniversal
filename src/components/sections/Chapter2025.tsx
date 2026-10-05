"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";

export default function Chapter2025() {
  const homepageProjects = [
    {
      id: "fashprism-india",
      title: "FASHPRISM INDIA",
      subtitle: "Haute Couture & Runway Archive",
      category: "FASHPRISM",
      timing: "2025 DELIVERED",
      description: "High-couture textile draping, catwalk choreography, and creative talent showcases delivered for the India chapter.",
      image: "/assets/final/project-fashprism-india.jpg",
      instagramUrl: "https://www.instagram.com/fashai_universal",
      projectSocialUrl: "https://www.facebook.com/profile.php?id=61573489951314",
    },
    {
      id: "fashprism-international",
      title: "FASHPRISM INTERNATIONAL",
      subtitle: "Global Catwalk & Stage Presentation",
      category: "INTERNATIONAL",
      timing: "2025 DELIVERED",
      description: "Cinematic catwalk presentations, avant-garde tailoring, and architectural lighting design for global fashion showcases.",
      image: "/assets/final/project-lifestyle-2026-01.jpg",
      instagramUrl: "https://www.instagram.com/fashai_universal",
      projectSocialUrl: "https://www.facebook.com/profile.php?id=61573489951314",
    },
  ];

  return (
    <section id="our-projects-2025" className="relative w-full pt-4 sm:pt-5 lg:pt-7 pb-5 sm:pb-7 lg:pb-8 bg-white dark:bg-[#050505] text-[#111111] dark:text-brand-white border-b border-black/10 dark:border-white/10 overflow-hidden select-none">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="editorial-watermark absolute bottom-2 left-1/2 -translate-x-1/2 text-[14vw] font-serif-display font-light uppercase tracking-tighter leading-none pointer-events-none select-none text-black/[0.04] dark:text-white/[0.03]">
          2025 PROJECTS
        </div>
      </div>

      <div className="container-editorial relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black/10 dark:border-white/10 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-3 text-xs sm:text-sm font-syne tracking-widest text-[#D4AF37] font-bold uppercase mb-2">
              <span className="h-px w-8 bg-[#D4AF37]" />
              <span>DELIVERED WORK &amp; EDITIONS</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-light text-[#111111] dark:text-brand-white uppercase leading-tight">
              OUR <span className="font-serif italic font-normal text-[#D4AF37]">PROJECTS 2025</span>
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            <p className="font-sans text-sm sm:text-base text-gray-700 dark:text-brand-platinum/85 max-w-md font-light leading-relaxed">
              Selected fashion showcases, FashPrism editions, VIP salons, and creative work delivered across our ecosystem.
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#FFEC69] text-[#111111] border border-[#D4AF37] px-6 py-2.5 rounded-full font-syne text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-md group"
            >
              <span>EXPLORE MORE</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Homepage Prioritized Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-6 sm:mb-8">
          {homepageProjects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative bg-[#FAF8F5] dark:bg-[#090807] border border-[#D4AF37]/30 dark:border-[#D4AF37]/40 rounded-2xl overflow-hidden p-6 sm:p-8 flex flex-col justify-between shadow-lg hover:shadow-xl hover:border-[#D4AF37] transition-all duration-300"
            >
              <div>
                {/* Image Frame — Full Uncropped Image Fitting */}
                <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-xl overflow-hidden mb-6 bg-[#080808] border border-black/10 dark:border-white/10 flex items-center justify-center p-2 sm:p-3">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain object-center transition-transform duration-500"
                  />
                  
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-md text-[10px] font-syne font-bold uppercase tracking-wider bg-black/80 text-[#D4AF37] border border-[#D4AF37]/40 backdrop-blur-md">
                      {proj.category}
                    </span>
                    <span className="px-3 py-1 rounded-md text-[10px] font-syne font-bold uppercase tracking-wider bg-[#D4AF37] text-black font-bold shadow-sm">
                      {proj.timing}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-serif-display text-3xl sm:text-4xl font-light text-[#111111] dark:text-white uppercase leading-tight mb-1 group-hover:text-[#D4AF37] transition-colors">
                  {proj.title}
                </h3>
                <p className="font-syne text-xs sm:text-sm font-bold uppercase text-[#D4AF37] mb-3">
                  {proj.subtitle}
                </p>
                <p className="font-sans text-sm sm:text-base text-gray-900 dark:text-neutral-200 font-normal leading-relaxed mb-6">
                  {proj.description}
                </p>
              </div>

              {/* Action Buttons Footer — Premium Gold Treatment */}
              <div className="pt-4 border-t border-black/10 dark:border-white/15 flex flex-wrap items-center justify-between gap-3 relative z-10">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#FFEC69] text-[#111111] border border-[#D4AF37] px-5 py-2.5 text-xs font-syne tracking-wider font-bold transition-all rounded-full shadow-md group/btn"
                >
                  <span>EXPLORE MORE</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>

                <div className="flex items-center gap-2">
                  <a
                    href={proj.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#D4AF37]/10 dark:bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-gray-900 dark:text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all px-3.5 py-2 text-[11px] font-syne font-bold rounded-lg"
                    title="FashPrism Instagram"
                  >
                    <span>INSTAGRAM</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={proj.projectSocialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#D4AF37]/10 dark:bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-gray-900 dark:text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all px-3.5 py-2 text-[11px] font-syne font-bold rounded-lg"
                    title="Project Facebook Social"
                  >
                    <span>FACEBOOK</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="pt-4 text-center border-t border-black/10 dark:border-white/10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 bg-[#D4AF37] hover:bg-[#FFEC69] text-[#111111] border border-[#D4AF37] px-8 py-3.5 text-sm font-syne tracking-wider font-bold transition-all rounded-full shadow-lg group"
          >
            <span>VIEW PROJECTS</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

