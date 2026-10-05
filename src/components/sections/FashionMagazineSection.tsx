"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import MagazineArticleModal from "@/components/magazine/MagazineArticleModal";
import { MAGAZINE_ARTICLES, MagazineArticle } from "@/data/magazine";

const FILTER_CATEGORIES = [
  { id: "ALL", label: "ALL STORIES" },
  { id: "EVENT MANAGEMENT", label: "EVENT MANAGEMENT" },
  { id: "PRODUCTION", label: "PRODUCTION" },
  { id: "SPONSORSHIP", label: "SPONSORSHIP" },
  { id: "CORPORATE EVENTS", label: "CORPORATE EVENTS" },
  { id: "BEAUTY & BACKSTAGE", label: "BEAUTY" },
  { id: "EVENTS", label: "EVENTS" },
];

interface FashionMagazineSectionProps {
  isFullPage?: boolean;
}

function EditorialHeading({
  title,
  level = "h3",
  className = "",
}: {
  title: string;
  level?: "h3" | "h4";
  className?: string;
}) {
  const Component = level;
  return (
    <Component
      style={{
        fontSize: "clamp(22px, 2.2vw, 34px)",
        lineHeight: 1.15,
      }}
      className={`font-serif-display font-light text-[#111111] dark:text-[#D4AF37] uppercase tracking-tight group-hover:text-[#FFEC69] transition-colors ${className}`}
    >
      {title}
    </Component>
  );
}

function EditorialDescription({
  text,
  className = "",
  lineClamp,
}: {
  text: string;
  className?: string;
  lineClamp?: string;
}) {
  return (
    <p
      style={{
        fontSize: "clamp(15px, 1.1vw, 17px)",
        lineHeight: 1.6,
      }}
      className={`font-jost font-normal text-[#444444] dark:text-white/85 ${lineClamp ? lineClamp : ""} ${className}`}
    >
      {text}
    </p>
  );
}

export default function FashionMagazineSection({ isFullPage = false }: FashionMagazineSectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [selectedArticle, setSelectedArticle] = useState<MagazineArticle | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const filteredArticles = activeFilter === "ALL"
    ? MAGAZINE_ARTICLES
    : MAGAZINE_ARTICLES.filter((art) => art.category === activeFilter);

  return (
    <section id="magazine" className="relative py-8 sm:py-12 md:py-14 bg-white dark:bg-[#050505] text-[#111111] dark:text-white border-b border-black/10 dark:border-white/10 overflow-hidden select-none">
      {/* Background Ambience & Editorial Watermark */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="editorial-watermark absolute top-6 right-4 text-[16vw] font-serif-display font-light uppercase text-black/[0.03] dark:text-white/[0.02] leading-none pointer-events-none">
          EDITORIAL
        </div>
      </div>

      <div className="container-editorial relative z-10">
        {/* Magazine Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6 sm:mb-8 border-b border-black/10 dark:border-white/10 pb-6 sm:pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-jost tracking-wider text-[#D4AF37] font-bold uppercase mb-3">
              <span>FASHAI UNIVERSAL EDITORIAL</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-light text-[#111111] dark:text-white uppercase leading-none">
              FASHION <span className="font-serif italic font-normal text-[#D4AF37]">MAGAZINE</span>
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3">
            <p className="font-jost text-sm sm:text-base md:text-lg text-[#333333] dark:text-white/85 max-w-md font-light leading-relaxed text-left md:text-right">
              Buyer guides, event planning checklists, backstage beauty direction, and editorial insights from FashAI Universal.
            </p>
            {!isFullPage && (
              <Link
                href="/fashion-magazine"
                className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#FFEC69] text-black border border-[#D4AF37] px-6 py-2.5 rounded-full font-jost text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-md group"
              >
                <span>VIEW ALL STORIES</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </div>

        {/* HOMEPAGE VIEW: 3 FEATURED STORIES */}
        {!isFullPage ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              {MAGAZINE_ARTICLES.slice(0, 3).map((story, idx) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="group relative bg-[#FAF8F5] dark:bg-[#090807] border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden p-6 hover:border-[#D4AF37]/60 transition-all duration-300 flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl mb-4 bg-black border border-black/10 dark:border-white/10">
                      <Image
                        src={story.primaryImage}
                        alt={story.primaryImageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-3 py-1 rounded-full text-[10px] font-jost font-bold uppercase tracking-wider bg-black/80 text-[#D4AF37] border border-[#D4AF37]/40 backdrop-blur-md">
                          {story.category}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <span className="text-xs font-jost text-[#D4AF37] font-bold uppercase tracking-wider block">
                        {story.readTime}
                      </span>
                      <EditorialHeading title={story.title} level="h3" className="line-clamp-2" />
                      <EditorialDescription text={story.subtitle} lineClamp="line-clamp-3" />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                    <Link
                      href={`/fashion-magazine/${story.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-jost font-bold uppercase text-[#D4AF37] hover:underline"
                    >
                      <span>READ ARTICLE</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 text-center pt-4 border-t border-black/10 dark:border-white/10">
              <Link
                href="/fashion-magazine"
                className="inline-flex items-center justify-center gap-2.5 bg-[#D4AF37] hover:bg-[#FFEC69] text-black border border-[#D4AF37] px-8 py-3.5 rounded-full font-jost text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 shadow-lg group"
              >
                <span>VIEW ALL MAGAZINE STORIES →</span>
              </Link>
            </div>
          </div>
        ) : (
          /* DEDICATED MAGAZINE ARCHIVE PAGE VIEW */
          <div className="space-y-8">
            {/* Filter Navigation */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-8">
              {FILTER_CATEGORIES.map((cat) => {
                const isActive = activeFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveFilter(cat.id)}
                    className={`px-4 py-2 rounded-full text-xs font-jost font-bold uppercase tracking-wider transition-all border ${
                      isActive
                        ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-sm"
                        : "bg-transparent text-[#555555] dark:text-white/80 border-black/10 dark:border-white/15 hover:border-[#D4AF37]"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredArticles.map((story) => (
                <div
                  key={story.id}
                  className="group bg-[#FAF8F5] dark:bg-[#090807] border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden p-6 flex flex-col justify-between hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm"
                >
                  <div>
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl mb-4 bg-black border border-black/10 dark:border-white/10">
                      <Image
                        src={story.primaryImage}
                        alt={story.primaryImageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-3 py-1 rounded-full text-[10px] font-jost font-bold uppercase tracking-wider bg-black/80 text-[#D4AF37] border border-[#D4AF37]/40 backdrop-blur-md">
                          {story.category}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <span className="text-xs font-jost text-[#D4AF37] font-bold uppercase tracking-wider block">
                        {story.readTime} · {story.publishedDate}
                      </span>
                      <EditorialHeading title={story.title} level="h3" className="line-clamp-2" />
                      <EditorialDescription text={story.subtitle} lineClamp="line-clamp-3" />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                    <Link
                      href={`/fashion-magazine/${story.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-jost font-bold uppercase text-[#D4AF37] hover:underline"
                    >
                      <span>READ ARTICLE ↗</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedArticle && (
        <MagazineArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </section>
  );
}
