import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, UserPlus, Briefcase, HelpCircle, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { APPROVED_TALENT_ROSTER } from "@/data/talent";

export const metadata: Metadata = {
  title: "Fashion Designer Showcase Opportunities | FashAI Universal",
  description:
    "Apply for fashion designer showcase consideration with FashAI Universal. Present your haute couture, luxury pret, or computational fashion collections in Dubai and India.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/talent/fashion-designer-showcase-opportunities",
  },
  openGraph: {
    title: "Fashion Designer Showcase Opportunities | FashAI Universal",
    description:
      "Showcase opportunities for independent fashion designers, ateliers, and couture labels across FashAI Universal runway platforms.",
    url: "https://www.fashaiuniversal.com/talent/fashion-designer-showcase-opportunities",
    siteName: "FashAI Universal",
    images: [{ url: "/assets/brand/fashai-og-share.png", width: 1200, height: 630 }],
  },
};

const DESIGNERS = APPROVED_TALENT_ROSTER.filter(
  (t) => t.category === "DESIGNERS"
);

const FAQS = [
  {
    q: "How can fashion designers apply to showcase with FashAI Universal?",
    a: "Designers submit their brand portfolio, collection moodboards, lookbooks, and atelier details through our official application page under the Designer category.",
  },
  {
    q: "What collection categories does FashAI Universal accept?",
    a: "We review haute couture, luxury ready-to-wear, resort wear, bridal atelier collections, and computational fashion designs.",
  },
  {
    q: "What showcase formats are supported?",
    a: "Depending on show curation and production parameters, formats include full runway catwalk presentations, curated static installations, digital twin showcases, and VIP salon viewings.",
  },
  {
    q: "Is runway presentation guaranteed upon application?",
    a: "Applications are evaluated by our editorial and production committee based on collection alignment, quality of craftsmanship, and event theme requirements.",
  },
];

export default function DesignerOpportunitiesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Fashion Designer Showcase Opportunities",
    "url": "https://www.fashaiuniversal.com/talent/fashion-designer-showcase-opportunities",
    "description": "Application pathway for haute couture and independent fashion designers seeking runway showcase consideration with FashAI Universal.",
    "publisher": {
      "@type": "Organization",
      "name": "FashAI Universal",
      "url": "https://www.fashaiuniversal.com",
    },
  };

  return (
    <div className="bg-white dark:bg-[#050505] text-[#111111] dark:text-white pt-16 sm:pt-20 md:pt-24 min-h-screen font-jost select-none">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      {/* 01. HERO SECTION */}
      <section className="relative pt-10 sm:pt-16 pb-12 sm:pb-20 border-b border-black/10 dark:border-white/10 bg-[#FAF8F5] dark:bg-[#080706]">
        <div className="w-[min(92vw,1400px)] max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#D4AF37] font-jost text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COUTURE &amp; ATELIER SHOWCASE OPPORTUNITIES</span>
            </div>

            <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light uppercase tracking-tight leading-[0.95]">
              FASHION DESIGNER <span className="italic text-[#D4AF37]">SHOWCASES</span>
            </h1>

            <p className="font-jost text-base sm:text-lg md:text-xl text-[#444444] dark:text-white/85 font-light leading-relaxed max-w-3xl mx-auto">
              FashAI Universal offers haute couture, luxury pret, and computational fashion designers an official application channel for runway showcases, salon viewings, and international brand exposure.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/apply?role=designer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#D4AF37] hover:bg-[#FFEC69] text-black font-jost font-bold text-xs sm:text-sm tracking-wider uppercase py-4 px-8 rounded-full shadow-md transition-all duration-300 min-h-[48px]"
              >
                <UserPlus className="w-4 h-4" />
                <span>APPLY AS DESIGNER →</span>
              </Link>
              <Link
                href="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 font-jost font-bold text-xs sm:text-sm tracking-wider uppercase py-4 px-8 rounded-full transition-all duration-300 min-h-[48px]"
              >
                <span>EXPLORE SERVICES</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 02. DESIGNER OPPORTUNITY SCOPE */}
      <section className="py-12 sm:py-16 border-b border-black/10 dark:border-white/10">
        <div className="w-[min(92vw,1400px)] max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="font-jost text-xs font-bold uppercase tracking-wider text-[#D4AF37] block mb-2">
              SHOWCASE CATEGORIES
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-light uppercase tracking-tight">
              DESIGNER COLLABORATION FORMATS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Catwalk Runway Presentations",
                desc: "Full runway choreography, lighting architecture, model casting, and high-resolution press coverage in Dubai and India.",
              },
              {
                title: "Static Spatial Installations",
                desc: "Sculptural silhouette displays and spatial media showcases for gallery style brand unveilings and VIP buyer salons.",
              },
              {
                title: "3D & Digital Twin Integration",
                desc: "Computational fashion styling, virtual garment simulation, and 3D silhouette exploration for digital-forward labels.",
              },
            ].map((item, idx) => (
              <div key={idx} className="p-6 sm:p-8 rounded-2xl border border-black/10 dark:border-white/10 bg-[#FAF8F5] dark:bg-[#090807] space-y-3">
                <span className="font-serif-display text-2xl text-[#D4AF37] font-light">0{idx + 1}</span>
                <h3 className="font-serif-display text-xl font-light uppercase">{item.title}</h3>
                <p className="font-jost text-xs sm:text-sm text-[#555555] dark:text-white/80 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03. HOW APPLICATION WORKS */}
      <section className="py-12 sm:py-16 bg-[#FAF8F5] dark:bg-[#080706] border-b border-black/10 dark:border-white/10">
        <div className="w-[min(92vw,1400px)] max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <span className="font-jost text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              APPLICATION PATHWAY
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-light uppercase tracking-tight">
              HOW DESIGNERS APPLY FOR SHOWCASES
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Submit Portfolio", desc: "Share collection lookbooks, atelier background, garment technical specs, and digital links." },
              { step: "02", title: "Editorial Curation", desc: "Our creative direction panel evaluates collection themes, craftsmanship, and show compatibility." },
              { step: "03", title: "Production Alignment", desc: "Selected designers discuss runway staging, model counts, music direction, and schedule parameters." },
              { step: "04", title: "Runway Execution", desc: "Integration into scheduled FashAI Universal events with full backstage operations and press delivery." },
            ].map((st, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white dark:bg-[#0B0A09] border border-black/10 dark:border-white/10 space-y-3">
                <span className="font-serif-display text-3xl text-[#D4AF37] font-light">{st.step}</span>
                <h3 className="font-serif-display text-lg font-light uppercase">{st.title}</h3>
                <p className="font-jost text-xs sm:text-sm text-[#666666] dark:text-white/70 font-light leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04. FEATURED DESIGNERS */}
      {DESIGNERS.length > 0 && (
        <section className="py-12 sm:py-16 border-b border-black/10 dark:border-white/10">
          <div className="w-[min(92vw,1400px)] max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="font-jost text-xs font-bold uppercase tracking-wider text-[#D4AF37] block mb-1">
                  ROSTER HIGHLIGHTS
                </span>
                <h2 className="font-serif-display text-2xl sm:text-4xl font-light uppercase">
                  FEATURED COUTURE &amp; ATELIER DESIGNERS
                </h2>
              </div>
              <Link
                href="/talent?category=DESIGNERS"
                className="font-jost text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:underline flex items-center gap-1"
              >
                <span>VIEW DESIGNERS DIRECTORY ↗</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {DESIGNERS.map((des) => (
                <div key={des.id} className="rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden bg-[#FAF8F5] dark:bg-[#090807] group">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={des.image}
                      alt={`${des.name} - ${des.specialty}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 space-y-1">
                    <h3 className="font-serif-display text-xl font-light uppercase text-[#111111] dark:text-white">{des.name}</h3>
                    <p className="font-jost text-xs text-[#666666] dark:text-white/70">{des.specialty}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 05. FAQS */}
      <section className="py-12 sm:py-16 bg-[#FAF8F5] dark:bg-[#080706] border-b border-black/10 dark:border-white/10">
        <div className="w-[min(92vw,1400px)] max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <span className="font-jost text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h2 className="font-serif-display text-2xl sm:text-4xl font-light uppercase">
                DESIGNER SHOWCASE QUESTIONS
              </h2>
            </div>

            <div className="space-y-4 pt-4">
              {FAQS.map((faq, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-[#0B0A09] border border-black/10 dark:border-white/10 space-y-2">
                  <h3 className="font-serif-display text-lg font-light uppercase flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>{faq.q}</span>
                  </h3>
                  <p className="font-jost text-xs sm:text-sm text-[#555555] dark:text-white/80 font-light leading-relaxed pl-6">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 06. FINAL CTA BANNER */}
      <section className="py-16 sm:py-24 relative overflow-hidden bg-black text-white text-center">
        <div className="w-[min(92vw,1400px)] max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <h2 className="font-serif-display text-3xl sm:text-5xl md:text-6xl font-light uppercase tracking-tight">
            SUBMIT YOUR COLLECTION FOR <span className="italic text-[#D4AF37]">SHOWCASE CONSIDERATION</span>
          </h2>
          <p className="font-jost text-sm sm:text-base text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
            Connect with FashAI Universal to discuss runway presentations, buyer viewings, and editorial placement for your fashion label.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/apply?role=designer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#D4AF37] hover:bg-[#FFEC69] text-black font-jost font-bold text-xs sm:text-sm tracking-wider uppercase py-4 px-8 rounded-full transition-all duration-300 min-h-[48px]"
            >
              <span>APPLY AS DESIGNER →</span>
            </Link>
            <Link
              href="/projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 font-jost font-bold text-xs sm:text-sm tracking-wider uppercase py-4 px-8 rounded-full transition-all duration-300 min-h-[48px]"
            >
              <span>VIEW PAST PROJECTS</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
