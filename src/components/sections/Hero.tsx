"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import DistortionCTAButton from "@/components/ui/DistortionCTAButton";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics/tracker";

export default function Hero() {
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Enforce smooth looping boundary at 7.9s
  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.currentTime >= 7.9) {
      videoRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;

    const startVideo = async () => {
      try {
        await video.play();
      } catch {
        const handleUserInteraction = () => {
          video.play().catch(() => {});
          window.removeEventListener("touchstart", handleUserInteraction);
          window.removeEventListener("click", handleUserInteraction);
        };
        window.addEventListener("touchstart", handleUserInteraction, { once: true });
        window.addEventListener("click", handleUserInteraction, { once: true });
      }
    };

    startVideo();
  }, []);

  return (
    <section id="hero" className="relative min-h-[100vh] min-h-[100svh] w-full flex flex-col justify-between pt-24 sm:pt-28 pb-8 sm:pb-12 px-4 sm:px-8 lg:px-12 overflow-hidden bg-black text-brand-white select-none">
      
      {/* LAYER 1: Primary Runway Video & Backup Media Container */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none overflow-hidden bg-black">
        {videoError && (
          <Image
            src="/assets/hero/fallback.png"
            alt=""
            role="presentation"
            aria-hidden="true"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-[1.05]"
          />
        )}

        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onError={() => setVideoError(true)}
          className="absolute inset-0 w-full h-full object-cover object-center scale-[1.05] origin-center opacity-90 filter brightness-[0.85] contrast-[1.08]"
        >
          <source src="/videos/homepage-main.mp4" type="video/mp4" />
        </video>
      </div>

      {/* LAYER 2: Cinematic Lighting, Subtle Gold Bokeh & Readability Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/40 to-black/90 pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black/75 via-transparent to-transparent pointer-events-none z-[1]" />
      
      {/* Warm Golden Runway Bokeh Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D4AF37]/10 blur-[130px] rounded-full pointer-events-none z-[1]" />

      {/* LAYER 3: Main Centered Editorial Composition */}
      <div
        className="relative z-10 my-auto py-6 sm:py-8 flex flex-col items-center justify-center text-center w-full"
        style={{
          width: "min(92vw, 1200px)",
          marginInline: "auto",
        }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12, delayChildren: 0.1 }
            }
          }}
          className="flex flex-col items-center justify-center text-center w-full space-y-4 sm:space-y-6"
        >
          {/* 1. MAIN HEADLINE TYPOGRAPHY */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } }
            }}
            style={{
              willChange: "transform, opacity",
              fontSize: "clamp(34px, 5.5vw, 88px)",
              lineHeight: 1.08,
            }}
            className="font-serif-display text-center font-normal tracking-tight max-w-[1080px] mx-auto my-1 select-none"
          >
            <span className="block text-brand-white keep-white drop-shadow-[0_12px_36px_rgba(0,0,0,0.95)]">
              Fashion events and fashion talent, together.
            </span>
            <span
              style={{
                background: "linear-gradient(135deg, #FFF5A5 0%, #E6C260 35%, #D4AF37 65%, #AA7C11 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              className="block italic font-serif-display drop-shadow-[0_0_35px_rgba(212,175,55,0.6)] pt-1"
            >
              Dubai and India.
            </span>
          </motion.h1>

          {/* 2. MERGED EVENT MANAGEMENT INTRO COPY */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }
            }}
            style={{
              fontSize: "clamp(15px, 1.3vw, 20px)",
              lineHeight: 1.55,
            }}
            className="font-jost text-brand-white/90 keep-white text-center font-light tracking-wide max-w-[360px] sm:max-w-xl md:max-w-3xl mx-auto pt-1 sm:pt-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
          >
            End-to-end event planning, fashion runway production, corporate summits, and brand launch management — connecting premier events with exceptional creative talent across Dubai, UAE, and India.
          </motion.p>

          {/* 3. ELEGANT GOLD DIVIDER ACCENT */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
            }}
            className="flex items-center justify-center gap-3 w-full max-w-xs pt-1 pb-1"
          >
            <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs drop-shadow-[0_0_10px_rgba(212,175,55,0.7)]">✦</span>
            <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#D4AF37]/60 to-[#D4AF37]" />
          </motion.div>

          {/* 4. TWO EQUAL PRIMARY DOORS & SUPPORTING HIRE TALENT ACTION */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }
            }}
            style={{ willChange: "transform, opacity" }}
            className="flex flex-col items-center justify-center gap-4 w-full pt-2 sm:pt-3"
          >
            {/* The 2 Primary Equal Doors */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto">
              <DistortionCTAButton
                href="/plan-your-event"
                label="PLAN YOUR EVENT →"
                variant="primary"
                className="w-full sm:w-[250px] min-h-[54px]"
                dataCursor="plan"
                onClick={() => trackEvent("plan_event_click", { location: "hero" })}
              />
              <DistortionCTAButton
                href="/apply"
                label="APPLY AS TALENT ↗"
                variant="primary"
                className="w-full sm:w-[250px] min-h-[54px]"
                dataCursor="apply"
                onClick={() => trackEvent("apply_talent_click", { location: "hero" })}
              />
            </div>

            {/* Clearly Visible Supporting Action for Hire Talent */}
            <div className="pt-2">
              <Link
                href="/hire-talent"
                onClick={() => trackEvent("hire_talent_click", { location: "hero" })}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-syne font-semibold tracking-wider text-brand-white/85 hover:text-[#D4AF37] transition-colors group"
              >
                <span>Looking to book creative talent?</span>
                <span className="text-[#D4AF37] font-bold underline underline-offset-4 group-hover:text-white transition-colors inline-flex items-center gap-1">
                  HIRE TALENT <ArrowRight className="w-3.5 h-3.5 inline transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          </motion.div>

          {/* 5. BRANDING LOGO */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }
            }}
            className="flex flex-col items-center justify-center pt-3 sm:pt-4 opacity-90 hover:opacity-100 transition-opacity"
          >
            <Image
              src="/assets/brand/Final_Powered_by_logo.png"
              alt="Arav Innovation Logo"
              width={520}
              height={140}
              priority
              className="h-9 xs:h-11 sm:h-14 md:h-18 lg:h-20 w-auto max-w-[85vw] sm:max-w-[420px] md:max-w-[480px] object-contain brightness-110 drop-shadow-[0_0_24px_rgba(212,175,55,0.45)]"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* LAYER 4: LEFT EDITORIAL RAIL */}
      <div className="hidden lg:flex absolute left-8 xl:left-12 top-1/2 -translate-y-1/2 flex-col items-start space-y-4 text-left z-10 pointer-events-none select-none">
        <div className="flex flex-col items-center gap-1.5 ml-1">
          <span className="w-[1px] h-10 bg-gradient-to-b from-transparent to-brand-yellow-golden" />
          <span className="w-2.5 h-2.5 rounded-full border border-brand-yellow-golden bg-black/80 shadow-[0_0_8px_rgba(250,182,10,0.6)]" />
          <span className="w-[1px] h-6 bg-brand-yellow-golden/60" />
        </div>
        <div className="flex flex-col items-start space-y-3.5 text-xs sm:text-xs font-syne tracking-[0.2em] text-brand-white/80 keep-white uppercase font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
          <span className="hover:text-brand-yellow-golden transition-colors">EVENTS</span>
          <span className="hover:text-brand-yellow-golden transition-colors">IDEAS</span>
          <span className="hover:text-brand-yellow-golden transition-colors">CULTURE</span>
          <span className="hover:text-brand-yellow-golden transition-colors">EXCEPTIONAL</span>
          <span className="hover:text-brand-yellow-golden transition-colors">EXPERIENCES</span>
          <span className="w-8 h-[1px] bg-brand-white/40 mt-1.5" />
        </div>
      </div>

    </section>
  );
}


