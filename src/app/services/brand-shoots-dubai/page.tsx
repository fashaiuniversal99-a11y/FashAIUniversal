import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Camera, Sparkles, UserCheck, Layers, CheckCircle2, HelpCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Brand Shoots & Editorial Production Dubai | FashAI Universal",
  description:
    "Luxury brand shoot production, fashion editorial coordination, talent booking, and creative direction in Dubai, UAE.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/services/brand-shoots-dubai",
  },
  openGraph: {
    title: "Brand Shoots & Editorial Production Dubai | FashAI Universal",
    description:
      "End-to-end brand shoot management, editorial creative direction, location curation, and model/talent coordination in Dubai, UAE.",
    url: "https://www.fashaiuniversal.com/services/brand-shoots-dubai",
    siteName: "FashAI Universal",
    images: [{ url: "/assets/brand/fashai-og-share.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brand Shoots & Editorial Production Dubai | FashAI Universal",
    description:
      "End-to-end brand shoot management, editorial creative direction, location curation, and model/talent coordination in Dubai, UAE.",
    images: ["/assets/brand/fashai-og-share.png"],
  },
};

const DELIVERABLES = [
  {
    title: "Fashion & Commercial Shoot Production",
    description: "Full shoot management including equipment sourcing, call sheet scheduling, on-set logistics, and crew coordination across iconic Dubai locations.",
  },
  {
    title: "Editorial Creative Direction",
    description: "Moodboard creation, styling concepts, lighting design, and narrative theme development tailored to luxury and contemporary brand aesthetics.",
  },
  {
    title: "Talent & Model Coordination",
    description: "Casting, model bookings, hair & makeup artist management, and wardrobe styling management for high-impact visual campaigns.",
  },
  {
    title: "Location Curation & Studio Logistics",
    description: "Location scouting, studio rentals, permit coordination, and equipment setup in prime Dubai and UAE desert or urban settings.",
  },
];

const FAQS = [
  {
    q: "What types of brand shoots do you manage in Dubai?",
    a: "We manage commercial brand campaigns, fashion lookbooks, editorial magazine shoots, luxury product photography, and high-concept video productions.",
  },
  {
    q: "Can FashAI Universal coordinate models and creative talent for our shoot?",
    a: "Yes. We coordinate models, stylists, hair and makeup artists, and creative production crews tailored to your brand's creative brief.",
  },
  {
    q: "Do you handle location permits and studio arrangements in Dubai?",
    a: "We assist with location scouting, studio bookings, and production logistics across Dubai's architectural, desert, and luxury resort environments.",
  },
  {
    q: "How do I request a quote or book a brand shoot in Dubai?",
    a: "You can submit your production brief via Plan Your Event, discover models via our Hire Talent directory, or send an inquiry on Contact Us.",
  },
];

export default function BrandShootsDubaiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://www.fashaiuniversal.com/services/brand-shoots-dubai#service",
        "name": "Brand Shoots & Editorial Production Dubai",
        "provider": {
          "@type": "Organization",
          "name": "FashAI Universal",
          "url": "https://www.fashaiuniversal.com",
        },
        "areaServed": {
          "@type": "City",
          "name": "Dubai",
        },
        "serviceType": "Fashion & Brand Shoot Production",
        "url": "https://www.fashaiuniversal.com/services/brand-shoots-dubai",
        "description": "Luxury brand shoot production, fashion editorial coordination, talent booking, and creative direction in Dubai, UAE.",
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.fashaiuniversal.com/services/brand-shoots-dubai#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.fashaiuniversal.com",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": "https://www.fashaiuniversal.com/services",
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Brand Shoots Dubai",
            "item": "https://www.fashaiuniversal.com/services/brand-shoots-dubai",
          },
        ],
      },
    ],
  };

  return (
    <div className="bg-white dark:bg-[#050505] text-[#111111] dark:text-white pt-16 sm:pt-20 md:pt-24 min-h-screen font-sans select-none">
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
              <Camera className="w-3.5 h-3.5" />
              <span>DUBAI, UAE · BRAND &amp; EDITORIAL PRODUCTION</span>
            </div>

            <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light uppercase tracking-tight leading-[0.95]">
              LUXURY BRAND SHOOTS IN <span className="italic text-[#D4AF37]">DUBAI</span>
            </h1>

            <p className="font-sans text-base sm:text-lg md:text-xl text-[#444444] dark:text-white/85 font-light leading-relaxed max-w-3xl mx-auto">
              FashAI Universal provides creative direction, talent coordination, and end-to-end production for high-end fashion, commercial, and editorial brand shoots across Dubai and the UAE.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/plan-your-event"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#D4AF37] hover:bg-[#FFEC69] text-black font-jost font-bold text-xs sm:text-sm tracking-wider uppercase py-4 px-8 rounded-full shadow-md transition-all duration-300 min-h-[48px]"
              >
                <span>PLAN YOUR EVENT →</span>
              </Link>
              <Link
                href="/hire-talent"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 font-jost font-bold text-xs sm:text-sm tracking-wider uppercase py-4 px-8 rounded-full transition-all duration-300 min-h-[48px]"
              >
                <span>HIRE TALENT</span>
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-transparent border border-black/20 dark:border-white/20 text-[#333333] dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/10 font-jost font-bold text-xs sm:text-sm tracking-wider uppercase py-4 px-8 rounded-full transition-all duration-300 min-h-[48px]"
              >
                <span>CONTACT US</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 02. KEY DELIVERABLES GRID */}
      <section className="py-12 sm:py-16 border-b border-black/10 dark:border-white/10">
        <div className="w-[min(92vw,1400px)] max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="font-jost text-xs font-bold uppercase tracking-wider text-[#D4AF37] block mb-2">
              PRODUCTION CAPABILITIES
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-light uppercase tracking-tight">
              BRAND SHOOT SERVICES WE DELIVER
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {DELIVERABLES.map((item, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl border border-black/10 dark:border-white/10 bg-[#FAF8F5] dark:bg-[#090807] space-y-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center font-serif-display text-sm font-bold">
                    0{idx + 1}
                  </span>
                  <h3 className="font-serif-display text-xl sm:text-2xl font-light uppercase">
                    {item.title}
                  </h3>
                </div>
                <p className="font-sans text-sm sm:text-base text-[#555555] dark:text-white/80 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03. PROCESS / WORKFLOW */}
      <section className="py-12 sm:py-16 bg-[#FAF8F5] dark:bg-[#080706] border-b border-black/10 dark:border-white/10">
        <div className="w-[min(92vw,1400px)] max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <span className="font-jost text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              EDITORIAL WORKFLOW
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-light uppercase tracking-tight">
              HOW WE PRODUCE YOUR BRAND SHOOT
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Concept & Art Direction", desc: "Establishing moodboards, brand visual guidelines, shot list, and wardrobe concepts." },
              { step: "02", title: "Talent & Location Scouting", desc: "Casting models, booking hair/makeup artists, and securing studio or outdoor permits in Dubai." },
              { step: "03", title: "On-Set Production", desc: "Managing call sheets, technical lighting setups, styling direction, and shot execution." },
              { step: "04", title: "Post-Production & Assets", desc: "Organizing RAW selection, color grading supervision, and deliverable hand-off for web and press." },
            ].map((st, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white dark:bg-[#0B0A09] border border-black/10 dark:border-white/10 space-y-3">
                <span className="font-serif-display text-3xl text-[#D4AF37] font-light">{st.step}</span>
                <h3 className="font-serif-display text-lg font-light uppercase">{st.title}</h3>
                <p className="font-sans text-xs sm:text-sm text-[#666666] dark:text-white/70 font-light leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04. LOCATION CONTEXT */}
      <section className="py-12 sm:py-16 border-b border-black/10 dark:border-white/10">
        <div className="w-[min(92vw,1400px)] max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="font-jost text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                DUBAI PRODUCTION ENVIRONMENT
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-light uppercase">
                WORLD-CLASS EDITORIAL &amp; COMMERCIAL VISUALS IN DUBAI
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#444444] dark:text-white/85 font-light leading-relaxed">
                Dubai offers unmatched architecture, desert backdrops, and luxury interior venues for fashion lookbooks and high-converting brand campaigns. FashAI Universal coordinates every moving part—from talent casting to call sheet discipline—to ensure your vision is realized seamlessly.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-jost">
                <Link href="/talent" className="text-[#D4AF37] hover:underline font-bold uppercase">
                  Talent Directory ↗
                </Link>
                <Link href="/hire-talent" className="text-[#D4AF37] hover:underline font-bold uppercase">
                  Hire Talent ↗
                </Link>
                <Link href="/plan-your-event" className="text-[#D4AF37] hover:underline font-bold uppercase">
                  Plan Your Event ↗
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5 relative h-72 sm:h-80 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10">
              <Image
                src="/assets/homepage/Talent.png"
                alt="Brand shoots and editorial model production in Dubai"
                fill
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 05. FAQS */}
      <section className="py-12 sm:py-16 bg-[#FAF8F5] dark:bg-[#080706] border-b border-black/10 dark:border-white/10">
        <div className="w-[min(92vw,1400px)] max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <span className="font-jost text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h2 className="font-serif-display text-2xl sm:text-4xl font-light uppercase">
                DUBAI BRAND SHOOT QUESTIONS
              </h2>
            </div>

            <div className="space-y-4 pt-4">
              {FAQS.map((faq, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-[#0B0A09] border border-black/10 dark:border-white/10 space-y-2">
                  <h3 className="font-serif-display text-lg font-light uppercase flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>{faq.q}</span>
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#555555] dark:text-white/80 font-light leading-relaxed pl-6">
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
            READY TO PRODUCE YOUR <span className="italic text-[#D4AF37]">DUBAI BRAND SHOOT</span>?
          </h2>
          <p className="font-sans text-sm sm:text-base text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
            Connect with FashAI Universal to coordinate creative direction, models, and complete shoot production for your next luxury campaign.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/plan-your-event"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#D4AF37] hover:bg-[#FFEC69] text-black font-jost font-bold text-xs sm:text-sm tracking-wider uppercase py-4 px-8 rounded-full transition-all duration-300 min-h-[48px]"
            >
              <span>PLAN YOUR EVENT →</span>
            </Link>
            <Link
              href="/hire-talent"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 font-jost font-bold text-xs sm:text-sm tracking-wider uppercase py-4 px-8 rounded-full transition-all duration-300 min-h-[48px]"
            >
              <span>DISCOVER &amp; HIRE TALENT</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
