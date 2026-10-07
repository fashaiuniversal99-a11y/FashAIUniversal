import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Building, Layers, CheckCircle2, HelpCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Corporate Event Management & Brand Launches Dubai | FashAI Universal",
  description:
    "Corporate event management and brand launch production in Dubai, UAE. Delivering executive summits, tech activations, spatial design, and luxury corporate gatherings.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/services/corporate-events-dubai",
  },
  openGraph: {
    title: "Corporate Event Management & Brand Launches Dubai | FashAI Universal",
    description:
      "Full-service corporate event management, executive summits, product launches, and IT tech activations in Dubai, UAE.",
    url: "https://www.fashaiuniversal.com/services/corporate-events-dubai",
    siteName: "FashAI Universal",
    images: [{ url: "/assets/brand/fashai-og-share.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Corporate Event Management & Brand Launches Dubai | FashAI Universal",
    description:
      "Full-service corporate event management, executive summits, product launches, and IT tech activations in Dubai, UAE.",
    images: ["/assets/brand/fashai-og-share.png"],
  },
};

const DELIVERABLES = [
  {
    title: "Corporate Summits & Executive Galas",
    description: "High-level conference management, keynotes, delegate registration, stage design, and executive hospitality for international brand summits.",
  },
  {
    title: "Product Unveilings & Brand Launches",
    description: "Spatial reveal staging, product choreography, interactive LED walls, media press kits, and launch atmosphere management.",
  },
  {
    title: "Technology & IT Event Production",
    description: "Technical AV production, digital keynote geometry, hybrid event streaming, and spatial tech installations for enterprise IT brands.",
  },
  {
    title: "VIP Hospitality & Networking Salons",
    description: "Executive lounge curation, VIP seating protocols, private dining orchestration, and high-net-worth guest reception.",
  },
];

const FAQS = [
  {
    q: "What types of corporate events does FashAI Universal manage in Dubai?",
    a: "We produce executive corporate summits, luxury product launches, brand galas, technology unveilings, and VIP networking receptions across premiere Dubai venues.",
  },
  {
    q: "Can FashAI Universal handle hybrid or tech-enabled corporate events?",
    a: "Yes. We integrate spatial media, multi-angle 4K streaming, interactive LED displays, and custom digital staging for tech and enterprise corporate clients.",
  },
  {
    q: "What is included in full corporate event management?",
    a: "Our end-to-end management includes venue booking, stage architecture, AV & lighting engineering, speaker management, delegate registration, and on-site event execution.",
  },
  {
    q: "How can we request a proposal for a corporate event in Dubai?",
    a: "Submit your corporate brief via our Plan Your Event or Contact page. Our production team will review your timeline and budget parameters to prepare a detailed proposal.",
  },
];

export default function CorporateEventsDubaiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://www.fashaiuniversal.com/services/corporate-events-dubai#service",
        "name": "Corporate Event Management & Brand Launches Dubai",
        "provider": {
          "@type": "Organization",
          "name": "FashAI Universal",
          "url": "https://www.fashaiuniversal.com",
        },
        "areaServed": {
          "@type": "City",
          "name": "Dubai",
        },
        "serviceType": "Corporate Event Management",
        "url": "https://www.fashaiuniversal.com/services/corporate-events-dubai",
        "description": "Full-service corporate event management, executive summits, and luxury brand launches in Dubai, UAE.",
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.fashaiuniversal.com/services/corporate-events-dubai#breadcrumb",
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
            "name": "Corporate Events Dubai",
            "item": "https://www.fashaiuniversal.com/services/corporate-events-dubai",
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
        <div className="container-editorial relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#D4AF37] font-jost text-xs font-bold uppercase tracking-wider">
              <Building className="w-3.5 h-3.5" />
              <span>DUBAI, UAE · CORPORATE &amp; ENTERPRISE PRODUCTION</span>
            </div>

            <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light uppercase tracking-tight leading-[0.95]">
              CORPORATE EVENT MANAGEMENT IN <span className="italic text-[#D4AF37]">DUBAI</span>
            </h1>

            <p className="font-sans text-base sm:text-lg md:text-xl text-[#444444] dark:text-white/85 font-light leading-relaxed max-w-3xl mx-auto">
              FashAI Universal designs and produces executive corporate summits, luxury brand launches, and technology presentations in Dubai. We combine sophisticated staging with seamless guest hospitality for corporate events.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/plan-your-event"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#D4AF37] hover:bg-[#FFEC69] text-black font-jost font-bold text-xs sm:text-sm tracking-wider uppercase py-4 px-8 rounded-full shadow-md transition-all duration-300 min-h-[48px]"
              >
                <span>PLAN YOUR EVENT →</span>
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 font-jost font-bold text-xs sm:text-sm tracking-wider uppercase py-4 px-8 rounded-full transition-all duration-300 min-h-[48px]"
              >
                <span>CONTACT US</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 02. KEY DELIVERABLES GRID */}
      <section className="py-12 sm:py-16 border-b border-black/10 dark:border-white/10">
        <div className="container-editorial relative z-10">
          <div className="max-w-3xl mb-10">
            <span className="font-jost text-xs font-bold uppercase tracking-wider text-[#D4AF37] block mb-2">
              ENTERPRISE CAPABILITIES
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-light uppercase tracking-tight">
              CORPORATE EVENT SERVICES WE PROVIDE
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
        <div className="container-editorial relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <span className="font-jost text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              EXECUTIVE EXECUTION
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-light uppercase tracking-tight">
              THE CORPORATE EVENT PRODUCTION STAGES
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Strategy & Narrative", desc: "Aligning event design with brand strategy, corporate objectives, and key stakeholder expectations." },
              { step: "02", title: "Spatial & Technical Design", desc: "Developing stage schematics, seating arrangements, keynote AV setups, and digital branding zones." },
              { step: "03", title: "Logistics & Registration", desc: "Managing delegate check-in, speaker rehearsals, VIP transportation, and media accreditation." },
              { step: "04", title: "Show Control & On-Site", desc: "Executing stage calls, live streaming, hospitality control, and post-event media asset delivery." },
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
        <div className="container-editorial relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="font-jost text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                DUBAI BUSINESS LANDSCAPE
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-light uppercase">
                EXECUTIVE BRAND EXPERIENCE ARCHITECTURE IN DUBAI
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#444444] dark:text-white/85 font-light leading-relaxed">
                As a premier hub for corporate enterprise, technology, and international luxury, Dubai demands corporate events that embody excellence. FashAI Universal translates executive messaging into spatial environments that leave a lasting impression on partners, investors, and delegates.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-jost">
                <Link href="/services" className="text-[#D4AF37] hover:underline font-bold uppercase">
                  Service Formats ↗
                </Link>
                <Link href="/projects" className="text-[#D4AF37] hover:underline font-bold uppercase">
                  Delivered Projects ↗
                </Link>
                <Link href="/plan-your-event" className="text-[#D4AF37] hover:underline font-bold uppercase">
                  Plan Your Event ↗
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5 relative h-72 sm:h-80 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10">
              <Image
                src="/assets/homepage/Production.png"
                alt="Corporate event management and summit production in Dubai"
                fill
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 05. FAQS */}
      <section className="py-12 sm:py-16 bg-[#FAF8F5] dark:bg-[#080706] border-b border-black/10 dark:border-white/10">
        <div className="container-editorial relative z-10">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <span className="font-jost text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h2 className="font-serif-display text-2xl sm:text-4xl font-light uppercase">
                DUBAI CORPORATE EVENT QUESTIONS
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

      {/* 06. CONVERSION CTA */}
      <section className="py-14 sm:py-20 border-b border-black/10 dark:border-white/10">
        <div className="container-editorial relative z-10 text-center space-y-6">
          <span className="font-jost text-xs sm:text-sm font-bold uppercase tracking-wider text-[#D4AF37]">
            READY TO PLAN YOUR CORPORATE EVENT?
          </span>
          <h2 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-light uppercase">
            SUBMIT YOUR CORPORATE BRIEF TO FASHAI UNIVERSAL
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#444444] dark:text-white/80 max-w-xl mx-auto font-light leading-relaxed">
            Contact our corporate events team in Dubai to initiate staging plans, delegate hospitality, and production proposals.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/plan-your-event"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#FFEC69] text-black font-jost font-bold text-xs sm:text-sm tracking-wider uppercase py-4 px-8 rounded-full shadow-md transition-all duration-300 min-h-[48px]"
            >
              <span>PLAN YOUR EVENT →</span>
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 font-jost font-bold text-xs sm:text-sm tracking-wider uppercase py-4 px-8 rounded-full transition-all duration-300 min-h-[48px]"
            >
              <span>CONTACT US</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
