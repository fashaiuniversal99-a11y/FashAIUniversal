"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Play, Pause, ChevronLeft, ChevronRight, Film } from "lucide-react";
import { ProjectShowcaseItem, ProjectShowcaseSettings } from "@/lib/admin/config-schema";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface ProjectImageMarqueeProps {
  settings?: ProjectShowcaseSettings;
}

export default function ProjectImageMarquee({ settings }: ProjectImageMarqueeProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Fallback defaults if settings are not supplied
  const items: ProjectShowcaseItem[] = (settings?.items || []).filter((item) => item.enabled !== false);
  const isEnabled = settings?.enabled ?? true;
  const direction = settings?.direction || "left";
  const speedSeconds = settings?.speedSeconds || 40;
  const pauseOnHover = settings?.pauseOnHover ?? true;
  const heading = settings?.heading || "CINEMATIC RUNWAY RETROSPECTIVE";
  const subheading =
    settings?.subheading ||
    "A continuous visual showcase from delivered FashPrism editions, live catwalk presentations, and VIP dignitary ceremonies.";

  if (!isEnabled || items.length === 0) {
    return null;
  }

  // To achieve a seamless infinite loop, we duplicate the item list twice
  const duplicatedItems = [...items, ...items];

  // Manual scroll buttons for accessibility & tactile navigation
  const handleScrollManual = (offset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section
      aria-label="Cinematic Runway Retrospective Filmstrip"
      className="relative py-12 sm:py-16 bg-[#FAF8F5] dark:bg-[#070707] border-y border-black/10 dark:border-white/10 overflow-hidden select-none transition-colors duration-300"
    >
      {/* Section Header */}
      <div className="container-editorial max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Film className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[10px] sm:text-xs font-syne tracking-[0.2em] text-[#D4AF37] font-bold uppercase">
                LIVE EVENT ARCHIVE · FASHPRISM LIFESTYLE WEEK
              </span>
            </div>
            <h2 className="font-serif-display text-2xl sm:text-4xl lg:text-5xl font-light text-[#111111] dark:text-white uppercase tracking-tight">
              {heading}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-gray-700 dark:text-brand-platinum/80 font-light mt-1.5 max-w-2xl leading-relaxed">
              {subheading}
            </p>
          </div>

          {/* Interactive Accessibility & Motion Controls */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <button
              onClick={() => handleScrollManual(-380)}
              aria-label="Scroll previous showcase photograph"
              className="p-2 sm:p-2.5 rounded-full bg-black/5 dark:bg-white/10 hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] text-gray-800 dark:text-white hover:text-black dark:hover:text-black transition-all border border-black/10 dark:border-white/15"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScrollManual(380)}
              aria-label="Scroll next showcase photograph"
              className="p-2 sm:p-2.5 rounded-full bg-black/5 dark:bg-white/10 hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] text-gray-800 dark:text-white hover:text-black dark:hover:text-black transition-all border border-black/10 dark:border-white/15"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPaused((prev) => !prev)}
              aria-label={isPaused ? "Resume continuous movement" : "Pause continuous movement"}
              className="px-3 py-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] text-gray-800 dark:text-white hover:text-black dark:hover:text-black transition-all border border-black/10 dark:border-white/15 text-[11px] font-syne font-bold uppercase tracking-wider flex items-center gap-1.5"
            >
              {isPaused ? <Play className="w-3 h-3 fill-current" /> : <Pause className="w-3 h-3 fill-current" />}
              <span>{isPaused ? "PLAY" : "PAUSE"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Marquee Track Container with Vignette Fade Masks */}
      <div className="relative w-full overflow-hidden">
        {/* Left Vignette Shadow Fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-20 md:w-32 z-20 bg-gradient-to-r from-[#FAF8F5] dark:from-[#070707] to-transparent" />
        
        {/* Right Vignette Shadow Fade */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-20 md:w-32 z-20 bg-gradient-to-l from-[#FAF8F5] dark:from-[#070707] to-transparent" />

        {/* Scrollable Container on Mobile / Track Wrapper */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto no-scrollbar scroll-smooth"
        >
          <div
            className={`flex items-center gap-4 sm:gap-6 py-2 ${
              prefersReducedMotion ? "" : direction === "right" ? "animate-marquee-reverse" : "animate-marquee"
            } ${!pauseOnHover ? "hover:![animation-play-state:running]" : ""}`}
            style={{
              animationDuration: `${speedSeconds}s`,
              animationPlayState: isPaused ? "paused" : undefined,
              width: "max-content",
            }}
          >
            {duplicatedItems.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="group relative flex-shrink-0 w-[280px] xs:w-[340px] sm:w-[420px] md:w-[480px] lg:w-[540px] aspect-[3/2] rounded-xl overflow-hidden bg-neutral-900 border border-black/10 dark:border-white/15 shadow-md hover:border-[#D4AF37]/70 transition-all duration-500 cursor-pointer"
              >
                <Image
                  src={item.src}
                  alt={item.altText || item.title}
                  fill
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 440px, 540px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle Dark Gradient Overlay at Bottom of Photograph */}
                <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none rounded-b-xl z-[1]" />

                {/* Card Title & Accent Badge with Protected High Contrast */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-10 flex items-end justify-between gap-3">
                  <div className="space-y-1">
                    <span className="showcase-card-label inline-block text-[9px] sm:text-[10px] font-syne font-bold uppercase tracking-widest text-[#D4AF37] !text-[#D4AF37] drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                      FASHPRISM ARCHIVE · #{((idx % items.length) + 1).toString().padStart(2, "0")}
                    </span>
                    <h3 className="showcase-card-title keep-white font-serif-display text-sm sm:text-base md:text-lg font-light text-white !text-white uppercase line-clamp-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                      {item.title}
                    </h3>
                  </div>
                  <div className="hidden sm:flex w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_6px_rgba(212,175,55,0.7)] flex-shrink-0 mb-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
