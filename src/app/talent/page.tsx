"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles, MapPin, Briefcase, UserPlus } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { APPROVED_TALENT_ROSTER, ApprovedTalentItem } from "@/data/talent";
import { trackEvent } from "@/lib/analytics/tracker";

const CATEGORIES = [
  { id: "ALL", label: "ALL TALENT" },
  { id: "MODELS", label: "MODELS", categoryId: "model" },
  { id: "DESIGNERS", label: "DESIGNERS", categoryId: "fashion_designer" },
  { id: "MAKEUP ARTISTS", label: "MAKEUP ARTISTS", categoryId: "makeup_artist" },
  { id: "STYLISTS", label: "STYLISTS", categoryId: "fashion_stylist" },
  { id: "CHOREOGRAPHERS", label: "CHOREOGRAPHERS", categoryId: "choreographer" },
  { id: "CREATORS", label: "CREATORS", categoryId: "influencer_creator" },
  { id: "PUBLIC FIGURES", label: "PUBLIC FIGURES", categoryId: "celebrity_public_figure" },
];

function TalentDirectoryContent() {
  const searchParams = useSearchParams();
  const initialCategoryParam = searchParams.get("category");

  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  useEffect(() => {
    if (initialCategoryParam) {
      const match = CATEGORIES.find(
        (c) =>
          c.id.toLowerCase() === initialCategoryParam.toLowerCase() ||
          c.categoryId === initialCategoryParam ||
          c.id.replace(/\s+/g, "-").toLowerCase() === initialCategoryParam.toLowerCase()
      );
      if (match) {
        setActiveCategory(match.id);
      }
    }
  }, [initialCategoryParam]);

  const filteredTalent = APPROVED_TALENT_ROSTER.filter((item) => {
    if (activeCategory === "ALL") return true;
    return item.category === activeCategory;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#050505] text-[#111111] dark:text-white flex flex-col font-jost select-none overflow-x-hidden">
      <Header />

      {/* HERO SECTION */}
      <section className="relative pt-28 sm:pt-32 pb-8 sm:pb-12 px-4 bg-gradient-to-b from-[#F5F2EC] via-[#FAF8F5] to-[#FAF8F5] dark:from-black dark:via-[#0A0908] dark:to-[#050505] border-b border-black/10 dark:border-white/10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#D4AF37]/10 blur-[120px] pointer-events-none" />

        <div className="container-editorial relative z-10 text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#D4AF37] font-jost text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FASHAI UNIVERSAL · TALENT NETWORK</span>
          </div>

          <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl font-light text-[#111111] dark:text-white uppercase tracking-tight leading-none">
            CREATIVE <span className="text-[#D4AF37] italic font-serif">DIRECTORY</span>
          </h1>

          <p className="font-jost text-base sm:text-xl md:text-2xl text-[#111111]/90 dark:text-white/95 font-medium max-w-3xl mx-auto leading-relaxed">
            A platform for fashion talent to apply, be discovered, and connect with opportunities across Dubai and India.
          </p>

          <p className="font-jost text-sm sm:text-base text-[#555555] dark:text-white/80 font-normal max-w-2xl mx-auto">
            Browse approved runway models, couture designers, makeup artists, stylists, choreographers, and digital creators.
          </p>

          {/* 4-STEP TALENT JOURNEY STRIP */}
          <div className="pt-2 pb-1 max-w-3xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] sm:text-xs font-jost font-semibold text-[#333333] dark:text-white/90 bg-black/5 dark:bg-white/5 p-3 rounded-2xl border border-black/10 dark:border-white/10">
              <div className="flex items-center gap-1.5 justify-center">
                <span className="w-4 h-4 rounded-full bg-[#D4AF37] text-black font-bold flex items-center justify-center text-[10px]">1</span>
                <span>Apply</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center">
                <span className="w-4 h-4 rounded-full bg-[#D4AF37] text-black font-bold flex items-center justify-center text-[10px]">2</span>
                <span>Selection Review</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center">
                <span className="w-4 h-4 rounded-full bg-[#D4AF37] text-black font-bold flex items-center justify-center text-[10px]">3</span>
                <span>Approved Roster</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center">
                <span className="w-4 h-4 rounded-full bg-[#D4AF37] text-black font-bold flex items-center justify-center text-[10px]">4</span>
                <span>Client Request</span>
              </div>
            </div>
          </div>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/hire-talent"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D4AF37] text-black font-jost font-bold text-xs uppercase tracking-wider hover:bg-[#FFEC69] transition-all shadow-md"
            >
              <Briefcase className="w-4 h-4" />
              <span>HIRE TALENT</span>
            </Link>
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-black/20 dark:border-white/20 text-[#111111] dark:text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all font-jost font-bold text-xs uppercase tracking-wider"
            >
              <UserPlus className="w-4 h-4" />
              <span>APPLY AS TALENT</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORY FILTER NAVIGATION BAR */}
      <section className="sticky top-16 z-30 bg-[#FAF8F5]/90 dark:bg-[#080706]/90 backdrop-blur-md border-b border-black/10 dark:border-white/10 py-3 sm:py-4">
        <div className="container-editorial relative z-10 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 sm:gap-3 min-w-max pb-1">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count =
                cat.id === "ALL"
                  ? APPROVED_TALENT_ROSTER.length
                  : APPROVED_TALENT_ROSTER.filter((t) => t.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 sm:px-5 py-2 rounded-full font-jost text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? "bg-[#D4AF37] text-black shadow-md"
                      : "bg-black/5 dark:bg-white/5 text-[#111111]/80 dark:text-white/80 hover:text-[#D4AF37] border border-black/5 dark:border-white/10"
                  }`}
                >
                  {cat.label} {count > 0 ? `(${count})` : ""}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* MAIN TALENT DIRECTORY GRID */}
      <main className="flex-1 py-8 sm:py-12 md:py-16">
        <div className="container-editorial relative z-10 box-border">
          {filteredTalent.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <AnimatePresence>
                {filteredTalent.map((person: ApprovedTalentItem) => (
                  <motion.div
                    key={person.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                    className="group relative bg-white dark:bg-[#0C0B0A] border border-black/10 dark:border-white/12 rounded-2xl overflow-hidden flex flex-col justify-between p-4 sm:p-5 hover:border-[#D4AF37]/70 transition-all duration-300 shadow-md dark:shadow-xl"
                  >
                    <div>
                      {/* Approved Image Frame */}
                      <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/10 dark:bg-black rounded-xl mb-4 border border-black/5 dark:border-white/10">
                        <Image
                          src={person.image}
                          alt={person.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className={`object-cover ${person.objectPosition || "object-top"} filter contrast-[1.05] group-hover:scale-105 transition-transform duration-500`}
                        />

                        {/* Category Badge */}
                        <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md border border-[#D4AF37]/50 px-2.5 py-1 rounded-full text-[10px] font-jost font-bold uppercase tracking-wider text-[#D4AF37]">
                          {person.category}
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="space-y-1.5 mb-4">
                        <h3 className="font-serif-display text-xl sm:text-2xl font-light text-[#111111] dark:text-white uppercase leading-tight tracking-tight group-hover:text-[#D4AF37] transition-colors">
                          {person.name}
                        </h3>

                        <p className="font-jost text-xs sm:text-sm text-[#555555] dark:text-white/80 font-medium">
                          {person.specialty}
                        </p>

                        {person.location && (
                          <div className="flex items-center gap-1.5 text-xs text-[#777777] dark:text-white/60 font-jost pt-1">
                            <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                            <span>{person.location}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions: REQUEST THIS TALENT & SHARE CARD */}
                    <div className="pt-3 border-t border-black/10 dark:border-white/10 space-y-2">
                      <Link
                        href={`/hire-talent?talent=${person.id}`}
                        onClick={() =>
                          trackEvent("talent_request_click", {
                            talent_id: person.id,
                            talent_category: person.category,
                            location: "talent_section",
                          })
                        }
                        className="w-full bg-[#D4AF37] hover:bg-[#FFEC69] text-black py-2.5 px-3 rounded-xl text-xs font-jost font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-between shadow-sm min-h-[40px]"
                      >
                        <span>REQUEST THIS TALENT</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>

                      <Link
                        href={`/talent/share/${person.id}`}
                        className="w-full bg-transparent border border-black/15 dark:border-white/15 text-[#333333] dark:text-white/80 hover:border-[#D4AF37] hover:text-[#D4AF37] py-1.5 px-3 rounded-xl text-[10px] font-jost font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-1.5"
                      >
                        <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                        <span>TALENT SHARE CARD</span>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* PROFESSIONAL EMPTY STATE */
            <div className="py-16 sm:py-24 text-center max-w-xl mx-auto space-y-6 bg-white dark:bg-[#0B0A09] border border-[#D4AF37]/30 rounded-3xl p-8 sm:p-12 shadow-xl">
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <span className="font-jost text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                  TALENT REQUEST
                </span>
                <h2 className="font-serif-display text-3xl sm:text-4xl font-light text-[#111111] dark:text-white uppercase">
                  LOOKING FOR SPECIFIC TALENT?
                </h2>
                <p className="font-jost text-sm sm:text-base text-[#555555] dark:text-white/80 font-normal leading-relaxed">
                  Our talent management team can source, verify, and coordinate specialized creative talent tailored specifically to your event or brand campaign.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/hire-talent"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#D4AF37] text-black font-jost font-bold text-xs uppercase tracking-wider hover:bg-[#FFEC69] transition-all shadow-md text-center min-h-[48px] flex items-center justify-center"
                >
                  HIRE TALENT ENQUIRY →
                </Link>
                <button
                  onClick={() => setActiveCategory("ALL")}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-black/20 dark:border-white/20 text-[#111111] dark:text-white font-jost font-bold text-xs uppercase tracking-wider hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all text-center min-h-[48px] flex items-center justify-center"
                >
                  VIEW ALL TALENT
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* TARGETED TALENT & CASTING PATHWAYS */}
      <section className="py-12 sm:py-16 bg-[#FAF8F5] dark:bg-[#080706] border-t border-black/10 dark:border-white/10">
        <div className="container-editorial relative z-10 box-border">
          <div className="max-w-3xl mb-8 space-y-2">
            <span className="font-jost text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              SPECIALIZED OPPORTUNITY PATHWAYS
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-light uppercase tracking-tight">
              TALENT &amp; CASTING DESTINATIONS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { title: "Model Casting Dubai", href: "/talent/model-casting-dubai", badge: "DUBAI" },
              { title: "Become a Model in Dubai", href: "/talent/become-a-model-dubai", badge: "DUBAI" },
              { title: "Become a Model in India", href: "/talent/become-a-model-india", badge: "INDIA" },
              { title: "Designer Showcase", href: "/talent/fashion-designer-showcase-opportunities", badge: "GLOBAL" },
              { title: "Makeup Artist Roles", href: "/talent/makeup-artist-opportunities", badge: "BEAUTY" },
              { title: "Stylist Opportunities", href: "/talent/stylist-opportunities", badge: "WARDROBE" },
              { title: "Choreographer Roles", href: "/talent/choreographer-collaborations", badge: "STAGE" },
              { title: "Creator Collaborations", href: "/talent/creator-collaborations", badge: "MEDIA" },
            ].map((pathway, idx) => (
              <Link
                key={idx}
                href={pathway.href}
                className="p-5 rounded-2xl bg-white dark:bg-[#0B0A09] border border-black/10 dark:border-white/10 hover:border-[#D4AF37] transition-all group space-y-2 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-jost font-bold uppercase tracking-wider text-[#D4AF37] px-2 py-0.5 rounded-full bg-[#D4AF37]/10 inline-block mb-1">
                    {pathway.badge}
                  </span>
                  <h3 className="font-serif-display text-lg font-light uppercase group-hover:text-[#D4AF37] transition-colors">
                    {pathway.title}
                  </h3>
                </div>
                <div className="pt-2 flex items-center gap-1 text-xs font-jost font-bold uppercase text-[#D4AF37]">
                  <span>APPLY &amp; LEARN ↗</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function TalentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF8F5] dark:bg-[#050505]" />}>
      <TalentDirectoryContent />
    </Suspense>
  );
}
