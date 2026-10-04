"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin, Sparkles, ArrowRight, ExternalLink } from "lucide-react";
import GradientFlowText from "./GradientFlowText";
import { LIFESTYLE_2026 } from "@/data/lifestyle-event";

export default function EventInfoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Handle CTA Navigation: Register / Enquire
  const handleRegisterClick = () => {
    handleClose();
    if (pathname === "/") {
      const contactElem = document.getElementById("contact");
      if (contactElem) {
        contactElem.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    router.push("/contact?type=Registration");
  };

  // Handle CTA Navigation: Sponsorship Enquiry
  const handleSponsorshipClick = () => {
    handleClose();
    if (pathname === "/") {
      const contactElem = document.getElementById("contact");
      if (contactElem) {
        contactElem.scrollIntoView({ behavior: "smooth" });
        const enquirySelect = document.getElementById("enquiryType") as HTMLSelectElement;
        if (enquirySelect) {
          enquirySelect.value = "Sponsorship";
          enquirySelect.dispatchEvent(new Event("change", { bubbles: true }));
        }
        return;
      }
    }
    router.push("/contact?type=Sponsorship");
  };

  // Scroll threshold trigger (15% - 25% scroll on homepage) + session persistence
  useEffect(() => {
    // Only trigger on homepage
    if (pathname !== "/") return;

    try {
      const alreadyShown = sessionStorage.getItem("fashai_event_announcement_shown");
      if (alreadyShown === "true") return;
    } catch {
      // ignore
    }

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const scrollPercent = (window.scrollY / scrollHeight) * 100;

      if (scrollPercent >= 15) {
        setIsOpen(true);
        try {
          sessionStorage.setItem("fashai_event_announcement_shown", "true");
        } catch {
          // ignore
        }
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Manage body scroll locking when open & handle Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          handleClose();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
  }, [isOpen, handleClose]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      }}
    >
      {isOpen && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center p-3 sm:p-5 md:p-6 lg:p-8 select-none"
          role="dialog"
          aria-modal="true"
          aria-label="Upcoming Event Announcement: LifeStyle 2026 Dubai"
        >
          {/* 1. Backdrop Overlay (Dark Translucent with Blur) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-xl z-[300]"
          />

          {/* 2. Atmospheric Heavy Blurred Background Image Layer behind main modal card */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-[305] flex items-center justify-center opacity-35">
            <div className="relative w-full h-full max-w-[1300px] max-h-[850px] filter blur-3xl scale-125">
              <Image
                src="/assets/hero/fallback.png"
                alt="Atmospheric Background Blur"
                fill
                priority
                sizes="(max-width: 1300px) 100vw, 1300px"
                className="object-cover object-center"
              />
            </div>
            <div className="absolute inset-0 bg-black/75" />
          </div>

          {/* 3. Main Centered Compact Premium Event Panel Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, y: 15, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-[310] w-[92vw] sm:w-[88vw] md:w-[86vw] max-w-[1040px] xl:max-w-[1140px] max-h-[88vh] overflow-y-auto no-scrollbar border border-[#F15E1C]/40 dark:border-[#D4AF37]/50 bg-[#0A0908]/95 dark:bg-[#070605]/95 text-white rounded-2xl md:rounded-3xl shadow-[0_16px_70px_rgba(0,0,0,0.6)] dark:shadow-[0_0_60px_rgba(212,175,55,0.18)] my-auto flex flex-col"
          >
            {/* Close Button — Accessible Position */}
            <button
              onClick={handleClose}
              aria-label="Close event announcement"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-[330] p-2 min-w-[38px] min-h-[38px] flex items-center justify-center bg-black/80 border border-[#F15E1C]/50 dark:border-[#D4AF37]/70 rounded-full sm:rounded-xl text-white hover:text-[#D4AF37] hover:border-[#D4AF37] hover:bg-black transition-all shadow-xl group"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
            </button>

            {/* Mobile Stacked Top Image Header (< md) */}
            <div className="block md:hidden relative w-full h-36 sm:h-44 shrink-0 overflow-hidden border-b border-white/10">
              <Image
                src="/assets/hero/fallback.png"
                alt="LifeStyle 2026 Dubai Visual"
                fill
                priority
                sizes="(max-width: 768px) 92vw, 500px"
                className="object-cover object-[center_18%] filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0908] via-[#0A0908]/30 to-transparent" />
              <div className="absolute bottom-2 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_6px_rgba(212,175,55,0.8)]" />
                  <span className="font-syne text-[10px] tracking-widest text-[#D4AF37] font-bold uppercase">
                    HAUTE COUTURE RUNWAY
                  </span>
                </div>
                <span className="font-syne text-[9px] tracking-wider text-white/80 font-bold uppercase bg-black/50 px-2 py-0.5 rounded border border-white/10">
                  DUBAI · 2026
                </span>
              </div>
            </div>

            {/* Content Body Grid: 2 Columns on Desktop (md:), Stacked on Mobile */}
            <div className="p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col md:flex-row gap-6 lg:gap-8 items-stretch">
              
              {/* Left Column (Desktop) / Main Stack (Mobile) — Information & Actions */}
              <div className="flex-1 flex flex-col justify-between space-y-3.5 sm:space-y-4">
                
                {/* Header & Titles */}
                <div className="space-y-2">
                  {/* Eyebrow */}
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-[#F15E1C] dark:bg-[#D4AF37] shadow-[0_0_8px_rgba(241,94,28,0.6)] dark:shadow-[0_0_8px_rgba(212,175,55,0.8)] shrink-0" />
                    <span className="font-syne text-[10px] sm:text-xs tracking-[0.22em] text-[#F15E1C] dark:text-[#D4AF37] font-bold uppercase">
                      LIFESTYLE 2026 · DUBAI · 2026
                    </span>
                  </div>

                  {/* Subtitle */}
                  <p className="font-serif italic text-xs sm:text-sm text-white/80 font-light">
                    An international fashion and lifestyle experience.
                  </p>

                  {/* Main Headline */}
                  <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light uppercase tracking-tight leading-none text-white">
                    LIFESTYLE <span className="font-serif italic text-[#F15E1C] dark:text-[#D4AF37] font-normal">2026</span>
                  </h2>

                  {/* Location Tag */}
                  <div className="inline-block border-b border-[#F15E1C]/40 dark:border-[#D4AF37]/50 pb-1">
                    <span className="font-syne text-[10px] sm:text-xs tracking-[0.25em] font-bold text-[#F15E1C] dark:text-[#D4AF37] uppercase">
                      DUBAI · 2026
                    </span>
                  </div>
                </div>

                {/* Announcement Notice Box */}
                <div className="bg-white/5 backdrop-blur-md border border-[#F15E1C]/30 dark:border-[#D4AF37]/40 p-3 sm:p-4 rounded-xl shadow-md">
                  <h3 className="font-syne text-[11px] sm:text-xs tracking-wider font-bold text-[#F15E1C] dark:text-[#D4AF37] uppercase mb-0.5">
                    REGISTRATIONS &amp; SPONSORSHIPS ARE OPEN
                  </h3>
                  <p className="font-sans text-xs text-white/80 font-light leading-relaxed">
                    Open for delegates, international designers, press, and brand partners.
                  </p>
                </div>

                {/* 3 Event Details Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 pt-1">
                  {/* Event Date */}
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-2.5 sm:p-3 rounded-xl flex flex-col justify-between shadow-sm">
                    <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-syne tracking-micro text-[#F15E1C] dark:text-[#D4AF37] font-bold uppercase mb-0.5">
                      <Calendar className="w-3 h-3" />
                      <span>EVENT DATE</span>
                    </div>
                    <span className="font-syne text-[10px] sm:text-xs font-bold text-white uppercase tracking-wide">
                      {LIFESTYLE_2026.isConfirmed ? LIFESTYLE_2026.dateDisplay : "JOIN THE WAITING LIST"}
                    </span>
                  </div>

                  {/* Event Venue */}
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-2.5 sm:p-3 rounded-xl flex flex-col justify-between shadow-sm">
                    <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-syne tracking-micro text-[#F15E1C] dark:text-[#D4AF37] font-bold uppercase mb-0.5">
                      <MapPin className="w-3 h-3" />
                      <span>EVENT VENUE</span>
                    </div>
                    <span className="font-syne text-[10px] sm:text-xs font-bold text-white uppercase tracking-wide">
                      {LIFESTYLE_2026.isConfirmed ? LIFESTYLE_2026.venueDisplay : "DUBAI · WAITING LIST"}
                    </span>
                  </div>

                  {/* Dress Code */}
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-2.5 sm:p-3 rounded-xl flex flex-col justify-between shadow-sm">
                    <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-syne tracking-micro text-[#F15E1C] dark:text-[#D4AF37] font-bold uppercase mb-0.5">
                      <Sparkles className="w-3 h-3" />
                      <span>DRESS CODE</span>
                    </div>
                    <span className="font-syne text-[10px] sm:text-[11px] font-bold text-white uppercase tracking-wide leading-tight">
                      FASHIONABLE &amp; HAUTE COUTURE
                    </span>
                  </div>
                </div>

                {/* 2 Functional Action CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <button
                    onClick={handleRegisterClick}
                    className="flex-1 bg-[#D4AF37] text-[#111111] hover:bg-[#FFEC69] transition-all duration-300 min-h-[42px] sm:min-h-[46px] flex items-center justify-center gap-2 rounded-xl font-syne text-xs tracking-caps font-bold shadow-lg"
                  >
                    <GradientFlowText variant="primary">REGISTER / ENQUIRE</GradientFlowText>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleSponsorshipClick}
                    className="flex-1 border border-[#F15E1C]/60 dark:border-[#D4AF37]/70 bg-white/5 backdrop-blur-sm px-4 py-2.5 sm:py-3 text-xs font-syne tracking-caps font-bold text-white hover:bg-[#D4AF37]/15 hover:border-[#D4AF37] transition-all duration-300 min-h-[42px] sm:min-h-[46px] flex items-center justify-center gap-2 rounded-xl shadow-sm"
                  >
                    <GradientFlowText variant="gold">SPONSORSHIP ENQUIRY</GradientFlowText>
                    <ExternalLink className="w-4 h-4 text-[#F15E1C] dark:text-[#D4AF37]" />
                  </button>
                </div>

                {/* Footer Branding Bar */}
                <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/assets/brand/Final_Powered_by_logo.png"
                      alt="Arav Innovation Logo"
                      width={180}
                      height={46}
                      priority
                      className="h-5 sm:h-6 w-auto object-contain"
                    />
                  </div>
                  <div className="font-syne text-[9px] sm:text-[10px] tracking-[0.18em] font-bold text-white/60 uppercase">
                    FASHAI UNIVERSAL · DUBAI 2026
                  </div>
                </div>

              </div>

              {/* Right Column (Desktop Only md:) — Model Visual Card */}
              <div className="hidden md:flex md:w-2/5 lg:w-5/12 flex-col justify-center">
                <div className="relative w-full h-full min-h-[340px] lg:min-h-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                  <Image
                    src="/assets/hero/fallback.png"
                    alt="LifeStyle 2026 Dubai Model Showcase"
                    fill
                    priority
                    sizes="(max-width: 1024px) 40vw, 450px"
                    className="object-cover object-[center_18%] filter contrast-105 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90" />
                  
                  {/* Subtle Badge Card Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-black/70 backdrop-blur-md rounded-xl border border-white/15">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_6px_rgba(212,175,55,0.8)]" />
                      <span className="font-syne text-[10px] tracking-widest text-[#D4AF37] font-bold uppercase">
                        HAUTE COUTURE RUNWAY
                      </span>
                    </div>
                    <p className="font-sans text-xs text-white/90 font-light leading-snug">
                      International Designers &amp; Delegate Showcase in Dubai
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
