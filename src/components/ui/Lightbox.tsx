"use client";

import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { ModelImageItem } from "@/data/models";

export interface UnifiedLightboxItem {
  id: string;
  title: string;
  subtitle?: string;
  src: string;
  category?: string;
  tag?: string;
  modelName?: string;
}

interface LightboxProps {
  isOpen: boolean;
  currentIndex: number;
  items: (UnifiedLightboxItem | ModelImageItem)[];
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Lightbox({
  isOpen,
  currentIndex,
  items,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const rawItem = items[currentIndex];

  const currentItem: UnifiedLightboxItem | null = rawItem
    ? {
        id: rawItem.id,
        title:
          "tag" in rawItem
            ? `FashAI Universal Capture — ${rawItem.tag}`
            : rawItem.title,
        subtitle:
          "orientation" in rawItem
            ? `${rawItem.orientation.toUpperCase()} • HIGH-DEFINITION ARCHIVE CAPTURE`
            : rawItem.subtitle,
        src: "src" in rawItem ? rawItem.src : (rawItem as any).image,
        category: "category" in rawItem ? rawItem.category : undefined,
        tag: "tag" in rawItem ? rawItem.tag : undefined,
      }
    : null;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    },
    [isOpen, onClose, onNext, onPrev]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        onNext();
      } else {
        onPrev();
      }
    }
    setTouchStartX(null);
  };

  if (!isOpen || !currentItem) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex flex-col justify-between bg-brand-void/98 p-4 sm:p-8 pt-safe pb-safe backdrop-blur-2xl min-h-[100dvh]"
        role="dialog"
        aria-modal="true"
        aria-label="Digital Exhibition Fullscreen Lightbox"
        onClick={onClose}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top Control Bar */}
        <div
          className="flex justify-between items-center z-10 border-b border-hairline-gold pb-3 pt-1"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3">
            <span className="font-serif-display text-base sm:text-xl text-brand-white tracking-wide uppercase">
              FASHAI UNIVERSAL VISUAL ARCHIVE
            </span>
            <span className="font-jost text-[10px] sm:text-xs tracking-micro text-brand-gold border border-hairline-gold px-2.5 py-0.5 font-semibold">
              {String(currentIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-brand-off-white hover:text-brand-gold transition-colors border border-hairline hover:border-hairline-gold"
            aria-label="Close Lightbox"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Central Display Image & Navigation Arrows */}
        <div
          className="relative flex-1 flex items-center justify-center my-2 sm:my-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Previous Arrow Button */}
          <button
            onClick={onPrev}
            className="absolute left-1 sm:left-6 z-20 p-3.5 min-w-[44px] min-h-[44px] flex items-center justify-center bg-brand-charcoal/90 border border-hairline-gold text-brand-off-white hover:text-brand-gold hover:border-brand-gold transition-all shadow-xl"
            aria-label="Previous Image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Main Image Frame */}
          <motion.div
            key={currentItem.id}
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative h-[65vh] sm:h-[72vh] w-[90vw] max-w-5xl border border-hairline-gold bg-black/90 overflow-hidden shadow-2xl"
          >
            <Image
              src={currentItem.src}
              alt={currentItem.title}
              fill
              priority
              sizes="90vw"
              className="object-contain"
            />
          </motion.div>

          {/* Next Arrow Button */}
          <button
            onClick={onNext}
            className="absolute right-1 sm:right-6 z-20 p-3.5 min-w-[44px] min-h-[44px] flex items-center justify-center bg-brand-charcoal/90 border border-hairline-gold text-brand-off-white hover:text-brand-gold hover:border-brand-gold transition-all shadow-xl"
            aria-label="Next Image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Bottom Captions & Details Bar */}
        <div
          className="z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center border-t border-hairline-gold pt-3 gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <h3 className="font-serif-display text-lg sm:text-2xl font-light text-brand-off-white tracking-wide">
              {currentItem.title}
            </h3>
            {currentItem.subtitle && (
              <p className="font-jost text-[10px] sm:text-xs tracking-micro text-brand-platinum mt-0.5">
                {currentItem.subtitle} {currentItem.category ? `• ${currentItem.category}` : ""}
              </p>
            )}
          </div>

          <div className="text-[9px] sm:text-[10px] font-jost tracking-micro text-brand-gold uppercase">
            KEYBOARD ← / → • SWIPE MOBILE • ESC CLOSE
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
