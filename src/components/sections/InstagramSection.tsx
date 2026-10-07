"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Instagram, Facebook } from "lucide-react";

export default function InstagramSection() {
  const FACEBOOK_URL = "https://www.facebook.com/61594069457693";
  const INSTAGRAM_URL = "https://www.instagram.com/fashai_universal";

  return (
    <section id="socials" className="relative min-h-[80vh] sm:min-h-screen flex items-center justify-center bg-white dark:bg-[#050505] text-[#111111] dark:text-white overflow-hidden select-none">
      {/* Edge-to-Edge Full Bleed Background Image (Light & Dark Mode Images) */}
      <div className="absolute inset-0 z-0">
        {/* Light Mode Background Image */}
        <Image
          src="/assets/events/instagram_background_light.png"
          alt="FashAI Universal Social Campaign Light"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
          className="block dark:hidden object-cover object-center filter contrast-[1.03] brightness-[1.02]"
          priority
        />
        {/* Dark Mode Background Image */}
        <Image
          src="/assets/events/instagram_background_dark.png"
          alt="FashAI Universal Social Campaign Dark"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
          className="hidden dark:block object-cover object-center filter contrast-[1.04] brightness-90"
          priority
        />
        {/* Soft Ambient Overlay for Maximum Image Visibility & Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/40 to-white/20 dark:from-black/90 dark:via-black/75 dark:to-black/50" />
      </div>

      {/* Content Container (Center Aligned) */}
      <div className="container-editorial relative z-10 py-16 sm:py-24 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8"
        >
          {/* Eyebrow with Thin Editorial Rules */}
          <div className="flex items-center justify-center gap-3">
            <span className="w-12 h-[1px] bg-[#F15E1C] dark:bg-[#D4AF37]" />
            <span className="text-sm sm:text-base md:text-lg font-syne tracking-[0.28em] text-[#F15E1C] dark:text-[#D4AF37] font-bold uppercase">
              OFFICIAL SOCIAL CHANNELS
            </span>
            <span className="w-12 h-[1px] bg-[#F15E1C] dark:bg-[#D4AF37]" />
          </div>

          {/* Main Heading */}
          <h2 className="font-serif-display text-5xl xs:text-6xl sm:text-8xl md:text-9xl lg:text-[100px] xl:text-[115px] font-light text-[#111111] dark:text-white uppercase leading-[0.88] tracking-tight drop-shadow-sm">
            FOLLOW OUR <br />
            <span className="font-serif italic font-normal text-[#F15E1C] dark:text-[#D4AF37]">
              JOURNEY
            </span>
          </h2>

          {/* Social Handles */}
          <div className="font-serif italic text-3xl sm:text-5xl md:text-6xl text-[#111111] dark:text-white tracking-tight">
            @fashai_universal
          </div>

          {/* Short Description */}
          <p className="font-sans text-base sm:text-lg md:text-xl lg:text-2xl text-[#222222] dark:text-white/85 font-normal max-w-2xl mx-auto leading-relaxed">
            Connect with our official channels for runway highlights, backstage captures, event updates, and announcements.
          </p>

          {/* CTAs (Instagram & Facebook Social Icon Destinations) */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 pt-4">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="FashAI Universal Instagram"
              className="w-14 h-14 sm:w-16 sm:h-16 inline-flex items-center justify-center bg-[#E4405F] hover:bg-[#d63350] text-white rounded-full transition-all duration-300 shadow-lg hover:scale-105 active:scale-95"
            >
              <Instagram className="w-7 h-7 text-white" />
            </a>

            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="FashAI Universal Facebook"
              className="w-14 h-14 sm:w-16 sm:h-16 inline-flex items-center justify-center bg-[#1877F2] hover:bg-[#1565d8] text-white rounded-full transition-all duration-300 shadow-lg hover:scale-105 active:scale-95"
            >
              <Facebook className="w-7 h-7 text-white" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
