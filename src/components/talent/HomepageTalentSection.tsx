"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, UserPlus, Briefcase } from "lucide-react";
import { PEOPLE_MASTER_DATA, PeopleCategory } from "@/data/people";
import ShortTalentApplyModal from "./ShortTalentApplyModal";

export default function HomepageTalentSection() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("model");

  const handleApplyClick = (catId: string) => {
    setSelectedCategory(catId);
    setIsApplyModalOpen(true);
  };

  return (
    <section
      id="talent-network"
      className="relative py-12 sm:py-16 md:py-20 bg-white dark:bg-[#080706] text-[#111111] dark:text-white border-b border-black/10 dark:border-white/10 select-none overflow-hidden"
    >
      {/* Editorial Watermark */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="editorial-watermark absolute -bottom-10 right-0 text-[14vw] font-serif-display font-light uppercase tracking-tighter leading-none pointer-events-none select-none opacity-30 text-black/[0.03] dark:text-white/[0.03]">
          TALENT
        </div>
      </div>

      <div className="container-editorial relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-8 border-b border-black/10 dark:border-white/10">
          <div>
            <div className="flex items-center gap-3 text-xs sm:text-sm font-syne tracking-micro text-[#D4AF37] font-bold uppercase mb-2">
              <span className="h-px w-8 bg-[#D4AF37]" />
              <span>TALENT &amp; CREATIVE NETWORK</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-light text-[#111111] dark:text-white uppercase leading-tight tracking-tight">
              TALENT FOR <span className="font-serif italic font-normal text-[#D4AF37]">EXCEPTIONAL EVENTS.</span>
            </h2>
            <p className="font-sans text-base sm:text-lg md:text-xl text-[#555555] dark:text-brand-platinum/90 font-light mt-3 max-w-2xl leading-relaxed">
              Connect with, apply to, or hire verified international creative talent across runway shows, brand campaigns, and luxury events.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => handleApplyClick("model")}
              className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#FFEC69] text-[#111111] border border-[#D4AF37] px-6 py-3 rounded-full font-syne text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 shadow-md"
            >
              <UserPlus className="w-4 h-4" />
              <span>APPLY TO JOIN</span>
            </button>
            <Link
              href="/hire-talent"
              className="inline-flex items-center gap-2 bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 px-6 py-3 rounded-full font-syne text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300"
            >
              <Briefcase className="w-4 h-4" />
              <span>HIRE TALENT</span>
            </Link>
          </div>
        </div>

        {/* Talent Category Cards Grid — Balanced Multi-Column Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 items-stretch">
          {PEOPLE_MASTER_DATA.map((cat: PeopleCategory, idx: number) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group relative bg-[#FAF8F5] dark:bg-[#0E0D0C] border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between p-5 hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm dark:shadow-xl"
            >
              {/* Category Image Frame */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/10 dark:bg-black rounded-xl mb-4 border border-black/5 dark:border-white/10">
                <Image
                  src={cat.primaryImage}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className={`object-cover ${cat.objectPosition} filter contrast-105 group-hover:scale-105 transition-transform duration-500`}
                />
              </div>

              {/* Card Content */}
              <div className="space-y-2 mb-4 flex-1">
                <span className="text-[10px] font-syne tracking-widest font-bold text-[#D4AF37] uppercase block">
                  {cat.tagline}
                </span>

                <h3 className="font-serif-display text-xl sm:text-2xl font-light text-[#111111] dark:text-white uppercase leading-tight tracking-tight group-hover:text-[#D4AF37] transition-colors">
                  {cat.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[#555555] dark:text-brand-platinum/80 font-light leading-relaxed line-clamp-3">
                  {cat.subtitle}
                </p>
              </div>

              {/* Action Buttons: APPLY TO JOIN & HIRE TALENT */}
              <div className="pt-3 border-t border-black/10 dark:border-white/10 flex flex-col gap-2">
                <button
                  onClick={() => handleApplyClick(cat.categoryId)}
                  className="w-full bg-[#D4AF37] hover:bg-[#FFEC69] text-[#111111] py-2.5 px-4 rounded-xl text-xs font-syne font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-between shadow-sm"
                >
                  <span>APPLY TO JOIN</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <Link
                  href="/hire-talent"
                  className="w-full border border-black/15 dark:border-white/15 bg-transparent hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 text-[#333333] dark:text-white/80 hover:text-[#111111] dark:hover:text-white py-2 px-4 rounded-xl text-xs font-syne font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-between"
                >
                  <span>HIRE TALENT</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Short Talent Apply Form Modal */}
      <ShortTalentApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        initialCategory={selectedCategory}
      />
    </section>
  );
}
