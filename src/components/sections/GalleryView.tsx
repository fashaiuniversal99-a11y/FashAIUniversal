"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import GradientFlowText from "../ui/GradientFlowText";
import ViewportRevealCard from "../ui/ViewportRevealCard";
import {
  GALLERY_DATA,
  GALLERY_CATEGORIES,
  GalleryCategory,
  GalleryItem,
} from "@/data/gallery";
import Lightbox from "../ui/Lightbox";

export default function GalleryView() {
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>("ALL");
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Pure memoized client-side filtering
  const filteredImages = useMemo(() => {
    if (activeFilter === "ALL") return GALLERY_DATA;
    return GALLERY_DATA.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  const openLightbox = useCallback((item: GalleryItem) => {
    const idx = filteredImages.findIndex((img) => img.id === item.id);
    setCurrentIndex(idx >= 0 ? idx : 0);
    setLightboxOpen(true);
  }, [filteredImages]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
  }, [filteredImages.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  }, [filteredImages.length]);

  const handleFilterChange = useCallback((category: GalleryCategory) => {
    setActiveFilter(category);
    setCurrentIndex(0);
  }, []);

  return (
    <section className="px-4 sm:px-6 lg:px-10 py-4 sm:py-8 md:py-12 w-[92vw] max-w-[1600px] mx-auto relative bg-brand-void text-brand-white select-none">
      {/* 1. EDITORIAL HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 border-b border-white/10 pb-8">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orange animate-pulse" />
            <span className="text-[10px] sm:text-xs font-syne tracking-micro text-brand-orange font-bold uppercase">
              VISUAL ARCHIVE & EXHIBITION
            </span>
          </div>

          <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-brand-white uppercase tracking-tight">
            THE <span className="font-serif font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-[#ff8833] to-brand-yellow-golden">GALLERY</span>
          </h1>

          <p className="font-sans text-sm sm:text-base text-brand-platinum/90 font-light leading-relaxed max-w-xl">
            High-definition visual retrospective of LifeStyle, Runway and the FashAI Universal experience.
          </p>
        </div>

        {/* Right Side Editorial Keyword Stack */}
        <div className="hidden lg:flex flex-col items-end text-right space-y-3 font-syne text-[10px] tracking-micro text-brand-platinum/60 uppercase">
          <span className="text-brand-orange font-bold">FASHION · TALENT · PRODUCTION</span>
          <div className="space-y-1 text-right">
            <div>COUTURE RUNWAY</div>
            <div>SILHOUETTE ART</div>
            <div>SPATIAL LIGHT</div>
            <div>DUBAI 2026</div>
          </div>
        </div>
      </div>

      {/* 2. CATEGORY FILTERS (Horizontally scrollable on mobile) */}
      <div className="mb-10 overflow-x-auto no-scrollbar pb-2">
        <div className="flex items-center gap-3 min-w-max">
          {GALLERY_CATEGORIES.map((cat) => {
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleFilterChange(cat.id)}
                className={`px-5 py-2.5 transition-all duration-300 font-syne text-[11px] tracking-micro font-bold uppercase border min-h-[42px] flex items-center ${
                  isActive
                    ? "border-brand-orange bg-brand-orange/15 text-brand-orange shadow-[0_0_20px_rgba(241,94,28,0.25)]"
                    : "border-white/15 bg-brand-void text-brand-platinum/80 hover:text-brand-white hover:border-white/40"
                }`}
              >
                <GradientFlowText variant="gold">{cat.label}</GradientFlowText>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. STABLE RESPONSIVE MASONRY GRID */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-3 xl:columns-4 gap-5 sm:gap-6 lg:gap-8 space-y-5 sm:space-y-6 lg:space-y-8">
        <AnimatePresence mode="popLayout">
          {filteredImages.map((item, index) => {
            // Stable aspect ratio mapping from dataset
            const aspectClass =
              item.aspectRatio === "16/10"
                ? "aspect-[16/10]"
                : item.aspectRatio === "1/1"
                ? "aspect-square"
                : item.aspectRatio === "3/4"
                ? "aspect-[3/4]"
                : "aspect-[4/5]";

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: (index % 4) * 0.04 }}
                className="break-inside-avoid group cursor-pointer"
                onClick={() => openLightbox(item)}
              >
                <ViewportRevealCard className={`relative ${aspectClass} w-full overflow-hidden border border-white/10 bg-brand-charcoal transition-all duration-500 hover:border-brand-orange hover:shadow-[0_0_35px_rgba(241,94,28,0.35)]`}>
                  {(isRevealed) => (
                    <>
                      <Image
                        src={item.thumb}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className={`object-cover ${item.objectPosition || "object-top"} filter contrast-105 transition-all duration-700 ease-out group-hover:scale-[1.03] ${
                          item.category.toUpperCase().includes("LIFESTYLE") || item.category.toUpperCase().includes("RUNWAY")
                            ? isRevealed ? "blur-none" : "blur-[2.5px] group-hover:blur-none"
                            : ""
                        }`}
                        priority={index < 4}
                        loading={index < 4 ? "eager" : "lazy"}
                      />

                      {/* Dark Vignette Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-void/90 via-transparent to-transparent opacity-75 group-hover:opacity-40 transition-opacity duration-300" />

                      {/* Category Tag Overlay (Bottom-Left Corner) */}
                      <div className="absolute bottom-4 left-4 right-12 z-10">
                        <span className="font-syne text-[9px] sm:text-[10px] tracking-micro text-brand-white font-bold uppercase px-2.5 py-1 bg-black/80 backdrop-blur-md border border-white/15 drop-shadow-md block truncate w-max max-w-full">
                          {item.category}
                        </span>
                        <h3 className="font-serif-display text-base sm:text-lg font-light text-brand-white mt-1.5 drop-shadow truncate opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {item.title}
                        </h3>
                      </div>

                      {/* Hover Accent Line */}
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                      {/* Hover Arrow Indicator */}
                      <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-8 w-8 flex items-center justify-center bg-brand-orange text-white text-xs font-syne font-bold">
                        ↗
                      </div>
                    </>
                  )}
                </ViewportRevealCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* 4. EDITORIAL QUOTE FOOTER BANNER */}
      <div className="mt-16 sm:mt-24 pt-10 border-t border-white/10 text-center space-y-2">
        <p className="font-serif italic text-xl sm:text-3xl text-brand-white/90 font-light">
          “More than events, a movement in fashion.”
        </p>
        <div className="font-syne text-[10px] tracking-widest text-brand-orange uppercase font-bold pt-1">
          — FASHAI UNIVERSAL —
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={lightboxOpen}
        currentIndex={currentIndex}
        items={filteredImages.map((img) => ({
          id: img.id,
          title: img.title,
          subtitle: `${img.subtitle} — ${img.category} (${img.year})`,
          src: img.src,
          category: img.category,
          tag: img.tag,
        }))}
        onClose={() => setLightboxOpen(false)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
}
