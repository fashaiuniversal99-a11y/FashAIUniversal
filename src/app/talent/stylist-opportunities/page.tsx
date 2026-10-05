import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, UserPlus, Briefcase, HelpCircle, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { APPROVED_TALENT_ROSTER } from "@/data/talent";

export const metadata: Metadata = {
  title: "Stylist Opportunities | FashAI Universal Talent Network",
  description:
    "Apply as a fashion or editorial stylist with FashAI Universal. Collaborate on haute couture runway presentations, brand shoot lookbooks, and spatial media productions.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/talent/stylist-opportunities",
  },
  openGraph: {
    title: "Stylist Opportunities | FashAI Universal Talent Network",
    description:
      "Fashion styling and editorial wardrobe coordination opportunities for runway shows, luxury brand shoots, and event productions.",
    url: "https://www.fashaiuniversal.com/talent/stylist-opportunities",
    siteName: "FashAI Universal",
    images: [{ url: "/assets/brand/fashai-og-share.png", width: 1200, height: 630 }],
  },
};

const STYLISTS = APPROVED_TALENT_ROSTER.filter(
  (t) => t.category === "STYLISTS"
);

const FAQS = [
  {
    q: "How can fashion stylists apply to join FashAI Universal?",
    a: "Stylists submit their editorial tear sheets, campaign portfolio, and professional background via our official application page under the Fashion Stylist category.",
  },
  {
    q: "What types of styling projects does FashAI Universal coordinate?",
    a: "Our network connects stylists with runway show wardrobe management, brand campaign lookbooks, VIP client styling, and commercial video shoots.",
  },
  {
    q: "Can international stylists apply for Dubai and India projects?",
    a: "Yes. FashAI Universal works with both resident and international stylists across UAE and India production schedules.",
  },
  {
    q: "How do brands hire stylists through FashAI Universal?",
    a: "Brands can request curated stylists directly through our Hire Talent portal or submit a brief to our production team.",
  },
];

export default function StylistOpportunitiesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Stylist Opportunities",
    "url": "https://www.fashaiuniversal.com/talent/stylist-opportunities",
    "description": "Application pathway for fashion and editorial stylists joining the FashAI Universal production network.",
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
              <span>EDITORIAL WARDROBE &amp; FASHION STYLING NETWORK</span>
            </div>

            <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light uppercase tracking-tight leading-[0.95]">
              FASHION STYLIST <span className="italic text-[#D4AF37]">OPPORTUNITIES</span>
            </h1>

            <p className="font-jost text-base sm:text-lg md:text-xl text-[#444444] dark:text-white/85 font-light leading-relaxed max-w-3xl mx-auto">
              FashAI Universal reviews and indexes creative wardrobe directors and fashion stylists for haute couture catwalk presentations, commercial brand shoots, and editorial visual campaigns.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/apply?role=fashion-stylist"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#D4AF37] hover:bg-[#FFEC69] text-black font-jost font-bold text-xs sm:text-sm tracking-wider uppercase py-4 px-8 rounded-full shadow-md transition-all duration-300 min-h-[48px]"
              >
                <UserPlus className="w-4 h-4" />
                <span>APPLY AS STYLIST →</span>
              </Link>
              <Link
                href="/talent?category=STYLISTS"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 font-jost font-bold text-xs sm:text-sm tracking-wider uppercase py-4 px-8 rounded-full transition-all duration-300 min-h-[48px]"
              >
                <span>BROWSE TALENT DIRECTORY</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 02. STYLING ROLES */}
      <section className="py-12 sm:py-16 border-b border-black/10 dark:border-white/10">
        <div className="w-[min(92vw,1400px)] max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="font-jost text-xs font-bold uppercase tracking-wider text-[#D4AF37] block mb-2">
              STYLING DOMAINS
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-light uppercase tracking-tight">
              WARDROBE &amp; STYLING ROLES WE COORDINATE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Runway Wardrobe Choreography",
                desc: "Managing designer line-ups, backstage garment changes, fitting protocols, and silhouette cohesion for live catwalk presentations.",
              },
              {
                title: "Editorial & Commercial Lookbooks",
                desc: "Curating high-impact outfits, accessory pairings, and prop styling for brand campaign photography and lookbooks.",
              },
              {
                title: "VIP & Celebrity Red Carpet",
                desc: "Personalized luxury wardrobe consultation, haute couture loan coordination, and red carpet styling for high-net-worth delegates.",
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
              APPLICATION STEPS
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-light uppercase tracking-tight">
              STYLIST ONBOARDING PATHWAY
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Submit Application", desc: "Fill out the online form with your tear sheets, portfolio URL, and location parameters." },
              { step: "02", title: "Editorial Review", desc: "Our creative direction team evaluates styling aesthetic, brand alignment, and technical experience." },
              { step: "03", title: "Roster Indexing", desc: "Accepted stylists are listed in the FashAI Creative Directory for client and event assignments." },
              { step: "04", title: "Project Assignment", desc: "Stylists receive project briefs, garment manifests, and call sheets for scheduled productions." },
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

      {/* 04. FEATURED STYLISTS */}
      {STYLISTS.length > 0 && (
        <section className="py-12 sm:py-16 border-b border-black/10 dark:border-white/10">
          <div className="w-[min(92vw,1400px)] max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="font-jost text-xs font-bold uppercase tracking-wider text-[#D4AF37] block mb-1">
                  ROSTER HIGHLIGHTS
                </span>
                <h2 className="font-serif-display text-2xl sm:text-4xl font-light uppercase">
                  FEATURED FASHION STYLISTS
                </h2>
              </div>
              <Link
                href="/talent?category=STYLISTS"
                className="font-jost text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:underline flex items-center gap-1"
              >
                <span>VIEW ALL STYLISTS ↗</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {STYLISTS.map((sty) => (
                <div key={sty.id} className="rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden bg-[#FAF8F5] dark:bg-[#090807] group">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={sty.image}
                      alt={`${sty.name} - ${sty.specialty}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 space-y-1">
                    <h3 className="font-serif-display text-xl font-light uppercase text-[#111111] dark:text-white">{sty.name}</h3>
                    <p className="font-jost text-xs text-[#666666] dark:text-white/70">{sty.specialty}</p>
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
                STYLIST NETWORK QUESTIONS
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
            JOIN OUR FASHION <span className="italic text-[#D4AF37]">STYLING NETWORK</span>
          </h2>
          <p className="font-jost text-sm sm:text-base text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
            Submit your tear sheets to be indexed in FashAI Universal&apos;s approved directory for upcoming runway shows and brand shoot productions.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/apply?role=fashion-stylist"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#D4AF37] hover:bg-[#FFEC69] text-black font-jost font-bold text-xs sm:text-sm tracking-wider uppercase py-4 px-8 rounded-full transition-all duration-300 min-h-[48px]"
            >
              <span>APPLY AS STYLIST →</span>
            </Link>
            <Link
              href="/hire-talent"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 font-jost font-bold text-xs sm:text-sm tracking-wider uppercase py-4 px-8 rounded-full transition-all duration-300 min-h-[48px]"
            >
              <span>HIRE STYLISTS</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
