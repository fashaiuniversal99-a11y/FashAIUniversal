"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    // 0. Reduced Motion Check for Accessibility: Bypass preloader for users preferring reduced motion
    try {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setIsLoading(false);
        setShouldRender(false);
        return;
      }
    } catch {
      // Safe fallback
    }

    // 1. Session Persistence Check: Only run full cinematic preloader once per browsing session
    try {
      const alreadyShown = sessionStorage.getItem("fashai_preloader_shown");
      if (alreadyShown === "true") {
        setIsLoading(false);
        setShouldRender(false);
        return;
      }
    } catch {
      // Safe fallback if sessionStorage is disabled
    }

    // 2. Lock body scroll during preloader transition
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // 3. Fast non-blocking progress transition (~0.3s - ~0.45s max)
    const startTime = Date.now();
    let isLoaded = document.readyState === "complete";

    const handleLoad = () => {
      isLoaded = true;
    };

    if (!isLoaded) {
      window.addEventListener("load", handleLoad);
    }

    const targetDuration = isLoaded ? 300 : 450;

    const finishLoading = () => {
      if (hasCompletedRef.current) return;
      hasCompletedRef.current = true;
      setProgress(100);

      // Restore normal page scrolling immediately
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";

      // Brief 50ms hold at 100% completed state before smooth reveal
      setTimeout(() => {
        setIsLoading(false);

        // Record in sessionStorage
        try {
          sessionStorage.setItem("fashai_preloader_shown", "true");
        } catch {
          // ignore
        }

        // Unmount after reveal animation ends
        setTimeout(() => {
          setShouldRender(false);
        }, 300);
      }, 50);
    };

    const updateProgress = () => {
      if (hasCompletedRef.current) return;

      const elapsed = Date.now() - startTime;
      const effectiveDuration = isLoaded ? Math.min(targetDuration, 300) : targetDuration;
      const rawRatio = Math.min(elapsed / effectiveDuration, 1);

      const easedProgress = Math.min(Math.round(rawRatio * 100), 100);
      setProgress(easedProgress);

      if (rawRatio < 1 && easedProgress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        finishLoading();
      }
    };

    const animFrame = requestAnimationFrame(updateProgress);

    // 4. Hard Safety Timeout Maximum (800ms limit guarantees non-blocking experience)
    const hardTimeout = setTimeout(() => {
      finishLoading();
    }, 800);

    return () => {
      cancelAnimationFrame(animFrame);
      clearTimeout(hardTimeout);
      window.removeEventListener("load", handleLoad);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -16,
            transition: { duration: 0.25, ease: [0.76, 0, 0.24, 1] },
          }}
          style={{ willChange: "transform, opacity" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-[#050505] px-6 py-12 text-brand-off-white overflow-hidden select-none pointer-events-none"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="FashAI Universal Loading Experience"
        >
          {/* Top Tag Bar */}
          <div className="relative z-10 flex w-full justify-between items-center text-[10px] sm:text-xs font-syne tracking-micro text-brand-platinum/70 border-b border-white/10 pb-4 max-w-7xl">
            <span className="text-brand-yellow-golden font-bold uppercase tracking-widest">
              FASHAI UNIVERSAL
            </span>
            <span>DUBAI · 2026</span>
          </div>

          {/* Central Logo Lockup & Progress Bar */}
          <div className="relative z-10 flex flex-col items-center text-center my-auto w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center mb-8"
            >
              {/* Official FashAI Logo Mark Container */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-5 overflow-hidden rounded-none border border-brand-yellow-golden/50 bg-black shadow-[0_0_35px_rgba(250,182,10,0.3)] p-2">
                <Image
                  src="/assets/brand/fashai_logo_final.png"
                  alt="FashAI Universal Official Logo"
                  fill
                  priority
                  sizes="112px"
                  className="object-contain"
                />
              </div>

              {/* Main Brand Title */}
              <h1 className="font-serif-display text-3xl sm:text-4xl font-light text-brand-white tracking-widest uppercase mb-2">
                FASHAI UNIVERSAL
              </h1>

              {/* Supporting Entity Lockup */}
              <div className="flex items-center justify-center gap-2 pt-1">
                <span className="font-syne text-[10px] sm:text-xs tracking-widest text-brand-platinum/70 uppercase">
                  POWERED BY
                </span>
                <Image
                  src="/assets/brand/Final_Powered_by_logo.png"
                  alt="Powered by Arav Innovation"
                  width={220}
                  height={58}
                  priority
                  className="h-6 sm:h-7 w-auto object-contain"
                />
              </div>
            </motion.div>

            {/* Smooth Progress Track & Counter */}
            <div className="w-full max-w-xs sm:max-w-sm px-2">
              <div className="relative h-[2px] w-full bg-white/10 rounded-none overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full w-full bg-brand-yellow-golden shadow-[0_0_15px_#D4AF37] origin-left transition-transform duration-75 ease-out"
                  style={{ transform: `scaleX(${progress / 100})`, willChange: "transform" }}
                />
              </div>

              <div className="flex justify-between items-center mt-3 text-[10px] sm:text-xs font-syne tracking-micro text-brand-platinum">
                <span className="text-brand-platinum/80 uppercase">
                  ENTERING FASHAI UNIVERSAL
                </span>
                <span className="text-brand-yellow-golden font-bold text-xs sm:text-sm">
                  {progress}%
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="relative z-10 flex w-full justify-between items-center text-[10px] font-syne tracking-micro text-brand-platinum/60 pt-4 border-t border-white/10 max-w-7xl">
            <span>FASHION × AI × EXPERIENCE</span>
            <span>POWERED BY ARAV INNOVATION</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
