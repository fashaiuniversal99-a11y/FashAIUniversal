"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, X, Filter } from "lucide-react";

export interface EventDetail {
  id: string;
  category: "FASHION & RUNWAY" | "LIFESTYLE" | "BRAND SHOOTS" | "PRODUCT & LAUNCHES" | "CORPORATE & IT";
  badge: string;
  title: string;
  subtitle: string;
  timing: string;
  location: string;
  image: string;
  summary: string;
  fullDescription: string;
  highlights: string[];
  participationTypes: string[];
  ctaText: string;
  ctaType: string;
  dressCode?: string;
  authoritativeDate?: string;
}

const ALL_EVENTS_DATA: EventDetail[] = [
  {
    id: "lifestyle-2026",
    category: "LIFESTYLE",
    badge: "JOIN THE WAITING LIST",
    title: "LIFESTYLE 2026 DUBAI",
    subtitle: "An International Fashion & Lifestyle Experience",
    timing: "TO BE ANNOUNCED",
    authoritativeDate: "Dubai · 2026 (Date & Venue To Be Announced)",
    location: "Dubai, UAE",
    image: "/assets/events/lifestyle_banner.png",
    summary: "Bringing together haute couture design, runway talent, luxury brands, and international delegates in Dubai.",
    fullDescription: "FashPrism LifeStyle 2026 is FashAI Universal's premier international event experience. Held in Dubai, it connects global fashion houses, emerging couture designers, runway models, digital creators, and luxury sponsors across three days of runway shows, VIP galas, and digital fashion exhibitions.",
    highlights: [
      "Haute Couture & Ready-to-Wear Catwalk Shows",
      "International Designer & Talent Showcase",
      "Spatial & Digital Fashion Atmosphere",
      "VIP Delegate Networking & Brand Activations",
    ],
    participationTypes: ["Designers & Ateliers", "Runway Models", "Luxury Brands & Sponsors", "Press & Media Delegates"],
    ctaText: "JOIN THE WAITING LIST",
    ctaType: "WaitingList",
    dressCode: "Haute Couture / Black Tie",
  },
  {
    id: "runway-showcase",
    category: "FASHION & RUNWAY",
    badge: "HAUTE CATWALK PRESENTATION",
    title: "FASHION RUNWAY SHOWCASE",
    subtitle: "High-Fashion Presentation & Spatial Choreography",
    timing: "",
    location: "UAE · India · International",
    image: "/assets/events/runway_banner.png",
    summary: "High-impact runway productions featuring spatial choreography, lighting art, and designer silhouette showcases.",
    fullDescription: "FashAI Universal's Runway presentations set the benchmark for catwalk choreography, lighting direction, and spatial visual design. Our team handles complete end-to-end production from model curation and wardrobe styling to stage design and broadcast coverage.",
    highlights: [
      "Custom Catwalk Staging & Lighting Art",
      "Backstage Artistry & Professional Styling",
      "Runway Model Choreography & Pace Direction",
      "High-Definition Broadcast & Media Coverage",
    ],
    participationTypes: ["Fashion Designers", "Runway Models", "Choreographers & Stylists", "Sponsors"],
    ctaText: "BOOK NOW",
    ctaType: "RunwayEvent",
    dressCode: "Fashionable & Editorial",
  },
  {
    id: "brand-shoots",
    category: "BRAND SHOOTS",
    badge: "DIGITAL PR & CAMPAIGNS",
    title: "BRAND SHOOTS & CAMPAIGNS",
    subtitle: "Commercial & Lookbook Production",
    timing: "",
    location: "UAE · India · Studio & On-Location",
    image: "/assets/events/designer/Designer.png",
    summary: "Bespoke brand campaigns, editorial lookbooks, commercial shoots, and digital PR content creation.",
    fullDescription: "FashAI Universal conceives and executes high-end brand shoots for apparel, jewellery, luxury accessories, and cosmetics brands. We provide creative direction, professional model casting, makeup artistry, location sourcing, and post-production editing.",
    highlights: [
      "Campaign Concept & Moodboard Direction",
      "Professional Model & Talent Casting",
      "Haute Makeup & Wardrobe Styling",
      "Commercial Photo & Video Production",
    ],
    participationTypes: ["Fashion & Accessory Brands", "Models & Talent", "Photographers & Directors"],
    ctaText: "BOOK YOUR BRAND SHOOTS",
    ctaType: "BrandShoots",
  },
  {
    id: "product-launches",
    category: "PRODUCT & LAUNCHES",
    badge: "EXPERIENTIAL SHOWCASE",
    title: "PRODUCT EVENTS & LAUNCHES",
    subtitle: "Experiential Brand Activations",
    timing: "",
    location: "UAE · India · Global Venues",
    image: "/assets/events/product_events.png",
    summary: "Immersive product launches, spatial installations, and experiential brand showcases for luxury & consumer tech.",
    fullDescription: "Turn product reveals into unforgettable media experiences. FashAI Universal designs product launches for electronics, perfumes, apparel lines, and luxury goods using interactive visual displays and high-impact atmosphere.",
    highlights: [
      "Interactive Product Displays & Staging",
      "Keynote & Media Presentation Direction",
      "VIP & Influencer Invitation Management",
      "Digital PR & Social Media Amplification",
    ],
    participationTypes: ["Consumer Brands", "Tech Companies", "Luxury Houses", "Media Outlets"],
    ctaText: "BOOK NOW",
    ctaType: "ProductEvent",
  },
  {
    id: "corporate-galas",
    category: "CORPORATE & IT",
    badge: "GALAS & SUMMITS",
    title: "CORPORATE EVENTS & GALAS",
    subtitle: "Executive Galas & Industry Conferences",
    timing: "",
    location: "UAE · India · International Venues",
    image: "/assets/events/corporate_events.png",
    summary: "Sophisticated corporate experiences, gala dinners, award ceremonies, and high-level industry conferences.",
    fullDescription: "Delivering world-class corporate gatherings and black-tie galas. We provide full event management, stage production, entertainment programming, and delegate registration services for corporate leaders and luxury institutions.",
    highlights: [
      "Executive Gala Dinners & Award Ceremonies",
      "High-Tech Stage Production & AV Direction",
      "VIP Hospitality & Protocol Management",
      "Keynote Speaker & Performance Booking",
    ],
    participationTypes: ["Corporate Clients", "Enterprise Partners", "Sponsors & Institutions"],
    ctaText: "BOOK NOW",
    ctaType: "CorporateEvent",
    dressCode: "Black Tie / Formal",
  },
  {
    id: "it-events",
    category: "CORPORATE & IT",
    badge: "TECH & INNOVATION",
    title: "IT EVENTS & TECH SUMMITS",
    subtitle: "Digital Fashion & Computational Summits",
    timing: "",
    location: "UAE · India · Virtual & Hybrid",
    image: "/assets/events/it_events.png",
    summary: "Curated technology showcases, AI forums, digital summits, and computational style conferences.",
    fullDescription: "At the intersection of artificial intelligence and creative industries, FashAI Universal produces tech forums, AI fashion hackathons, and digital innovation summits for technology providers and forward-thinking enterprises.",
    highlights: [
      "AI & Computational Fashion Forums",
      "Digital Runway & 3D Garment Showcases",
      "Tech Brand Product Launches",
      "Interactive Workshop & Demo Zones",
    ],
    participationTypes: ["Tech Firms & Startups", "AI Researchers", "Digital Creators", "Delegates"],
    ctaText: "BOOK NOW",
    ctaType: "ITEvent",
  },
];

export default function AllEventsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeModalEvent, setActiveModalEvent] = useState<EventDetail | null>(null);

  const categories = ["ALL", "FASHION & RUNWAY", "LIFESTYLE", "BRAND SHOOTS", "PRODUCT & LAUNCHES", "CORPORATE & IT"];

  const filteredEvents = selectedCategory === "ALL"
    ? ALL_EVENTS_DATA
    : ALL_EVENTS_DATA.filter(e => e.category === selectedCategory);

  return (
    <section className="relative py-6 sm:py-8 md:py-10 bg-white dark:bg-[#050505] text-[#111111] dark:text-white min-h-screen">
      <div className="container-editorial max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#F15E1C] dark:to-[#D4AF37]" />
            <span className="text-xs sm:text-sm font-syne tracking-[0.25em] text-[#F15E1C] dark:text-[#D4AF37] font-bold uppercase">
              FASHAI EVENT CATALOGUE
            </span>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#F15E1C] dark:to-[#D4AF37]" />
          </div>

          <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-light text-[#111111] dark:text-white uppercase leading-tight">
            ALL EVENTS
          </h1>

          <p className="font-sans text-base sm:text-lg text-[#555555] dark:text-brand-platinum/85 font-light mt-3 leading-relaxed">
            Explore the event formats and experiences delivered by FashAI Universal.
          </p>

          <div className="w-20 h-[2px] bg-[#F15E1C] dark:bg-[#D4AF37] mx-auto mt-4" />
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-2.5 mb-6 sm:mb-8">
          <div className="flex items-center gap-2 text-xs font-syne font-bold text-[#F15E1C] dark:text-[#D4AF37] uppercase mr-2 hidden sm:flex">
            <Filter className="w-4 h-4" />
            <span>FILTER:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 sm:px-4.5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-syne font-bold uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-[#F15E1C] dark:bg-[#D4AF37] text-white dark:text-black shadow-md scale-[1.02]"
                  : "bg-black/5 dark:bg-white/5 text-[#333333] dark:text-white/80 border border-black/10 dark:border-white/10 hover:border-[#F15E1C] dark:hover:border-[#D4AF37]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Events Grid — Clean image frames with content below */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredEvents.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group bg-[#FAF8F5] dark:bg-[#080706] border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#F15E1C]/60 dark:hover:border-[#D4AF37]/60 transition-all duration-300 shadow-md"
            >
              <div>
                {/* Clean Event Image Frame — NO text overlaying the image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/10 dark:bg-black">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Event Details Below Image */}
                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-syne font-bold uppercase tracking-wider bg-[#F15E1C]/15 dark:bg-[#D4AF37]/15 border border-[#F15E1C]/30 dark:border-[#D4AF37]/30 text-[#F15E1C] dark:text-[#D4AF37]">
                      {event.badge}
                    </span>
                    {event.timing && (
                      <span className="text-[10px] font-syne font-bold uppercase text-[#555555] dark:text-neutral-400">
                        {event.timing}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif-display text-2xl sm:text-[22px] lg:text-[24px] font-light uppercase text-[#111111] dark:text-white group-hover:text-[#F15E1C] dark:group-hover:text-[#D4AF37] transition-colors leading-tight">
                    {event.title}
                  </h3>

                  <p className="font-syne text-xs sm:text-sm font-bold uppercase text-[#F15E1C] dark:text-[#D4AF37]">
                    {event.subtitle}
                  </p>

                  {event.location && (
                    <div className="flex items-center gap-1.5 text-xs font-sans text-[#666666] dark:text-neutral-400">
                      <MapPin className="w-3.5 h-3.5 text-[#F15E1C] dark:text-[#D4AF37] shrink-0" />
                      <span>{event.location}</span>
                    </div>
                  )}

                  <p className="font-sans text-sm sm:text-[15px] lg:text-[15px] text-[#555555] dark:text-brand-platinum/85 font-light leading-relaxed">
                    {event.summary}
                  </p>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="p-5 sm:p-6 pt-0 border-t border-black/5 dark:border-white/5 mt-4 flex flex-wrap items-center justify-between gap-3">
                <Link
                  href={`/contact?type=${event.ctaType}`}
                  className="inline-flex items-center gap-2 bg-[#F15E1C] dark:bg-[#D4AF37] text-white dark:text-black px-5 py-2.5 text-xs font-syne tracking-caps font-bold hover:bg-[#e04f10] dark:hover:bg-[#FFEC69] transition-all rounded-full shadow-md group/btn"
                >
                  <span>{event.ctaText}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </Link>

                <button
                  onClick={() => setActiveModalEvent(event)}
                  className="inline-flex items-center gap-1.5 text-xs font-syne font-bold uppercase text-[#111111] dark:text-white/80 hover:text-[#F15E1C] dark:hover:text-[#D4AF37] transition-colors py-1"
                >
                  <span>EVENT DETAILS</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Event Modal Presentation */}
        <AnimatePresence>
          {activeModalEvent && (
            <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveModalEvent(null)}
                className="fixed inset-0 bg-black/85 backdrop-blur-md z-[300]"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3 }}
                className="relative z-[310] w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-white dark:bg-[#0C0B0A] border border-[#F15E1C]/40 dark:border-[#D4AF37]/50 rounded-2xl shadow-2xl p-6 sm:p-8 text-[#111111] dark:text-white space-y-6 my-auto"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveModalEvent(null)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-black/10 dark:bg-white/10 hover:bg-[#F15E1C] hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Modal Header */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-md text-xs font-syne font-bold uppercase tracking-wider bg-[#F15E1C]/15 text-[#F15E1C] dark:text-[#D4AF37] border border-[#F15E1C]/30">
                      {activeModalEvent.badge}
                    </span>
                    <span className="text-xs font-syne font-bold text-[#2E936F] uppercase">
                      ● {activeModalEvent.timing}
                    </span>
                  </div>

                  <h2 className="font-serif-display text-3xl sm:text-5xl font-light uppercase">
                    {activeModalEvent.title}
                  </h2>
                  <p className="font-syne text-sm font-bold uppercase text-[#F15E1C] dark:text-[#D4AF37] mt-1">
                    {activeModalEvent.subtitle}
                  </p>
                </div>

                {/* Clean Image Banner */}
                <div className="relative aspect-[16/8] w-full rounded-xl overflow-hidden border border-black/10 dark:border-white/10">
                  <Image
                    src={activeModalEvent.image}
                    alt={activeModalEvent.title}
                    fill
                    className="object-cover object-top"
                  />
                </div>

                {/* Authoritative Date Notice */}
                {activeModalEvent.authoritativeDate && (
                  <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/40 rounded-lg p-3 text-xs font-syne font-bold text-[#D4AF37]">
                    AUTHORITATIVE SCHEDULE: {activeModalEvent.authoritativeDate}
                  </div>
                )}

                {/* Full Description */}
                <div className="space-y-3">
                  <h3 className="font-syne text-xs font-bold uppercase tracking-wider text-[#F15E1C] dark:text-[#D4AF37]">
                    EVENT OVERVIEW &amp; PRODUCTION SCOPE
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-[#444444] dark:text-neutral-300 font-light leading-relaxed">
                    {activeModalEvent.fullDescription}
                  </p>
                </div>

                {/* Highlights */}
                {activeModalEvent.highlights.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-syne text-xs font-bold uppercase tracking-wider text-[#F15E1C] dark:text-[#D4AF37]">
                      KEY PRODUCTION HIGHLIGHTS
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeModalEvent.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs font-sans text-[#333333] dark:text-neutral-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F15E1C] dark:bg-[#D4AF37] mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Participation Types */}
                {activeModalEvent.participationTypes.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-syne text-xs font-bold uppercase tracking-wider text-[#F15E1C] dark:text-[#D4AF37]">
                      PARTICIPATION &amp; DELEGATE CATEGORIES
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {activeModalEvent.participationTypes.map((type, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-full text-xs font-syne bg-black/5 dark:bg-white/10 text-[#333333] dark:text-white border border-black/10 dark:border-white/10">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Modal Footer CTA */}
                <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-4">
                  <Link
                    href={`/contact?type=${activeModalEvent.ctaType}`}
                    className="inline-flex items-center gap-2 bg-[#F15E1C] dark:bg-[#D4AF37] text-white dark:text-black px-6 py-3 rounded-full text-xs font-syne font-bold uppercase tracking-wider hover:bg-[#e04f10] dark:hover:bg-[#FFEC69] transition-all shadow-lg"
                  >
                    <span>{activeModalEvent.ctaText}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => setActiveModalEvent(null)}
                    className="text-xs font-syne font-bold uppercase text-[#777777] dark:text-neutral-400 hover:text-[#111111] dark:hover:text-white transition-colors"
                  >
                    CLOSE WINDOW
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
