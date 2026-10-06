"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, Instagram, MapPin } from "lucide-react";
import { OFFICE_LOCATIONS } from "@/data/locations";

export default function Footer() {
  const columnVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <footer className="relative w-full border-t border-black/10 dark:border-white/10 bg-white dark:bg-[#050505] text-[#111111] dark:text-white overflow-hidden select-none">
      {/* Edge-to-Edge Supplied Footer Background Images (Light & Dark Mode) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-full h-full"
        >
          {/* Light Mode Background Image */}
          <Image
            src="/assets/footer/footer_light.png"
            alt="FashAI Universal Footer Light Background"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
            className="block dark:hidden object-cover object-center filter contrast-[1.02] opacity-90"
            priority
          />
          {/* Dark Mode Background Image */}
          <Image
            src="/assets/footer/footer_dark.png"
            alt="FashAI Universal Footer Dark Background"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
            className="hidden dark:block object-cover object-center filter contrast-[1.02] opacity-90"
            priority
          />
        </motion.div>
        {/* Subtle Theme-Aware Readability Overlay */}
        <div className="absolute inset-0 bg-white/75 via-white/60 to-white/80 dark:bg-black/80 dark:via-black/70 dark:to-black/85" />
      </div>

      {/* Main Editorial Content Container */}
      <div className="container-editorial relative z-10 py-10 sm:py-14">
        {/* 3-Column Editorial Grid (Desktop) / Separated Vertical Sections (Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 pb-8 border-b border-black/10 dark:border-white/10 items-start">
          
          {/* COLUMN 1: LEFT — BRAND & CONTACT SUMMARY (md:col-span-5) */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={columnVariants}
            className="md:col-span-5 flex flex-col space-y-3.5 pb-6 md:pb-0 border-b md:border-b-0 border-black/10 dark:border-white/10"
          >
            {/* Logo Lockup */}
            <Link href="/" className="inline-flex items-center gap-2 group w-fit">
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0 overflow-hidden">
                <Image
                  src="/assets/brand/fashai_logo_final.png"
                  alt="FashAI Universal Logo"
                  fill
                  sizes="48px"
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="font-serif-display text-2xl sm:text-3xl font-light text-[#111111] dark:text-white uppercase tracking-tight group-hover:text-[#D4AF37] transition-colors duration-300">
                FashAI Universal
              </span>
            </Link>

            <p className="font-sans text-base sm:text-lg md:text-xl text-[#333333] dark:text-white/90 font-normal leading-relaxed max-w-sm">
              Fashion events and fashion talent, together. Dubai and India. Events and talent, handled by one team.
            </p>

            {/* Social Links Badges */}
            <div className="pt-1 flex flex-wrap items-center gap-2">
              <a
                href="https://www.instagram.com/fashai_universal"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-black/10 dark:border-white/15 bg-white/80 dark:bg-white/10 text-xs font-syne font-semibold text-[#111111] dark:text-white hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300 shadow-sm"
              >
                <Instagram className="w-4 h-4 text-[#D4AF37]" />
                <span>@fashai_universal</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </a>
            </div>
          </motion.div>

          {/* COLUMN 2 & 3 CONTAINER */}
          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-7 gap-6 sm:gap-8 md:gap-10 items-start pb-8 border-b border-black/10 dark:border-white/10 md:border-b-0 md:pb-0">
            {/* COLUMN 2: EXPLORE (md:col-span-3) */}
            <motion.div
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={columnVariants}
              className="md:col-span-3"
            >
              <h4 className="font-syne text-sm sm:text-base md:text-lg tracking-caps text-[#D4AF37] font-bold uppercase mb-3 sm:mb-4 pb-2.5 border-b border-black/10 dark:border-white/10 w-full">
                EXPLORE
              </h4>
              <ul className="space-y-2.5 sm:space-y-3 pt-1.5">
                {[
                  { label: "Home", href: "/" },
                  { label: "Upcoming", href: "/upcoming" },
                  { label: "Services", href: "/services" },
                  { label: "Events", href: "/events" },
                  { label: "Projects", href: "/projects" },
                  { label: "Blog", href: "/fashion-magazine" },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 sm:gap-2 font-sans text-base sm:text-lg md:text-xl text-[#111111] dark:text-white/90 hover:text-[#D4AF37] transition-colors duration-300 leading-snug"
                    >
                      <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                        {link.label}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-[#D4AF37] transition-all duration-300 shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* COLUMN 3: GET INVOLVED / TALENT (md:col-span-4) */}
            <motion.div
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={columnVariants}
              className="md:col-span-4"
            >
              <h4 className="font-syne text-sm sm:text-base md:text-lg tracking-caps text-[#D4AF37] font-bold uppercase mb-3 sm:mb-4 pb-2.5 border-b border-black/10 dark:border-white/10 w-full">
                PRIMARY ACTIONS
              </h4>
              <ul className="space-y-2.5 sm:space-y-3 pt-1.5">
                {[
                  { label: "Plan Your Event", href: "/plan-your-event" },
                  { label: "Hire Talent", href: "/hire-talent" },
                  { label: "Apply as Talent", href: "/apply" },
                  { label: "Contact Us", href: "/contact" },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 sm:gap-2 font-sans text-base sm:text-lg md:text-xl text-[#111111] dark:text-white/90 hover:text-[#D4AF37] transition-colors duration-300 leading-snug"
                    >
                      <span className="transform group-hover:translate-x-1 transition-transform duration-300 whitespace-nowrap min-[380px]:whitespace-normal">
                        {link.label}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-[#D4AF37] transition-all duration-300 shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* OFFICIAL OFFICE LOCATIONS FOOTER BLOCK */}
        <motion.div
          custom={2.2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={columnVariants}
          className="my-8 pt-8 border-t border-black/10 dark:border-white/10"
        >
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-[#D4AF37]" />
            <h4 className="font-syne text-xs sm:text-sm tracking-caps text-[#D4AF37] font-bold uppercase">
              OFFICIAL OFFICE LOCATIONS
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {OFFICE_LOCATIONS.map((office) => (
              <div
                key={office.id}
                className="p-5 sm:p-6 rounded-xl border border-black/10 dark:border-white/15 bg-white/60 dark:bg-white/5 flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl" role="img" aria-label={office.countryCode}>
                      {office.flag}
                    </span>
                    <span className="font-syne text-[10px] tracking-widest text-[#D4AF37] font-bold uppercase">
                      {office.cityRegion}
                    </span>
                  </div>
                  <h5 className="font-serif-display text-lg sm:text-xl font-light text-[#111111] dark:text-white uppercase mb-2">
                    {office.title}
                  </h5>
                  <p className="font-sans text-xs sm:text-sm text-[#333333] dark:text-white/80 font-normal leading-relaxed">
                    {office.fullAddress}
                  </p>
                </div>

                <div>
                  <a
                    href={office.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-syne font-bold text-[#D4AF37] hover:text-[#FFEC69] tracking-wider uppercase transition-colors group"
                  >
                    <span>VIEW LOCATION ON GOOGLE MAPS</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FEATURED VIEW SOCIALS CARD */}
        <motion.div
          custom={2.5}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={columnVariants}
          className="my-6 p-4 sm:p-5 rounded-xl border border-black/15 dark:border-white/15 bg-transparent flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-none"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
              <Instagram className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <h5 className="font-syne text-xs sm:text-sm font-bold text-[#111111] dark:text-white uppercase tracking-wider">
                FashAI Universal Socials
              </h5>
              <p className="font-sans text-xs text-[#555555] dark:text-white/70 leading-relaxed">
                Connect with our official Instagram page (@fashai_universal) for event highlights, runway news &amp; announcements.
              </p>
            </div>
          </div>

          <a
            href="https://www.instagram.com/fashai_universal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] text-[#111111] hover:bg-[#FFEC69] font-syne font-bold text-xs tracking-caps px-5 py-3 rounded-xl transition-all duration-300 shadow-md shrink-0 whitespace-nowrap w-full sm:w-auto"
          >
            <span>VIEW SOCIALS</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* BOTTOM LEGAL BAR */}
        <motion.div
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={columnVariants}
          className="pt-4 pb-2 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-syne tracking-wider text-[#333333] dark:text-white/70 border-t md:border-t-0 border-black/10 dark:border-white/10"
        >
          {/* POWERED BY BRANDING SECTION */}
          <div className="w-full md:w-auto flex flex-col sm:flex-row items-center justify-between md:justify-start gap-3 pb-4 md:pb-0 border-b md:border-b-0 border-black/10 dark:border-white/10">
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold md:hidden">
              POWERED BY
            </span>
            <div className="flex items-center gap-3 sm:gap-4 shrink-0 flex-wrap justify-center sm:justify-end">
              <Image
                src="/assets/brand/arav_green_logo.png"
                alt="Arav Innovations Logo Mark"
                width={120}
                height={120}
                className="h-7 sm:h-9 md:h-11 w-auto object-contain filter contrast-[1.05]"
              />
              <Image
                src="/assets/brand/Final_Powered_by_logo.png"
                alt="Powered by Arav Innovations"
                width={240}
                height={60}
                className="h-7 sm:h-9 md:h-11 w-auto object-contain filter contrast-[1.05]"
              />
            </div>
          </div>

          {/* COPYRIGHT & LEGAL LINKS */}
          <div className="w-full md:w-auto flex flex-col sm:flex-row items-center justify-between md:justify-end gap-3 sm:gap-6 pt-2 md:pt-0">
            <div>
              © 2026 FashAI Universal
            </div>

            <div className="flex items-center gap-4 sm:gap-6 text-xs">
              <Link href="/privacy" className="hover:text-[#D4AF37] transition-colors">
                Privacy Policy
              </Link>
              <span className="text-black/30 dark:text-white/20">•</span>
              <Link href="/terms" className="hover:text-[#D4AF37] transition-colors">
                Terms &amp; Conditions
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
