import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Layers, ShieldCheck, CheckCircle2, HelpCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { trackEvent } from "@/lib/analytics/tracker";

export const metadata: Metadata = {
  title: "Fashion Show Management & Runway Production Dubai | FashAI Universal",
  description:
    "Premier fashion show management and runway production in Dubai, UAE. End-to-end catwalk planning, staging, creative direction, and talent coordination for luxury fashion events.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/services/fashion-show-management-dubai",
  },
  openGraph: {
    title: "Fashion Show Management & Runway Production Dubai | FashAI Universal",
    description:
      "End-to-end catwalk presentation, runway staging, backstage coordination, and talent management for fashion shows in Dubai, UAE.",
    url: "https://www.fashaiuniversal.com/services/fashion-show-management-dubai",
    siteName: "FashAI Universal",
    images: [{ url: "/assets/brand/fashai-og-share.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fashion Show Management & Runway Production Dubai | FashAI Universal",
    description:
      "End-to-end catwalk presentation, runway staging, backstage coordination, and talent management for fashion shows in Dubai, UAE.",
    images: ["/assets/brand/fashai-og-share.png"],
  },
};

const DELIVERABLES = [
  {
    title: "Runway Staging & Spatial Geometry",
    description: "Custom stage architecture, elevated catwalk layouts, LED spatial lighting, and acoustic sound engineering tailored for luxury runway venues.",
  },
  {
    title: "Backstage Operations & Choreography",
    description: "Line-up management, rapid garment change stations, model choreography, call sheet scheduling, and backstage security control.",
  },
  {
    title: "Talent & Creative Team Direction",
    description: "Seamless coordination across international runway models, couture stylists, lead makeup artists, hair sculptors, and show directors.",
  },
  {
    title: "Press, Buyer & VIP Guest Hospitality",
    description: "Front-of-house seating management, VIP lounge reception, media press credentials, and 4K live runway broadcasting distribution.",
  },
];

const FAQS = [
  {
    q: "What fashion show management services does FashAI Universal handle in Dubai?",
    a: "We provide end-to-end runway production: from venue selection and stage architecture to backstage choreography, lighting design, model coordination, and press hospitality.",
  },
  {
    q: "Can FashAI Universal manage international designer shows in Dubai?",
    a: "Yes. We specialize in producing international fashion showcases, designer trunk presentations, and multi-label catwalk events across luxury venues in Dubai.",
  },
  {
    q: "How early should we book a fashion show production team?",
    a: "We recommend initiating production discussions 2 to 4 months prior to your target show date to allow for venue reservation, staging design, and talent scheduling.",
  },
  {
    q: "How are fashion show management costs determined?",
    a: "Pricing depends on show scale, venue requirements, staging complexity, talent headcount, and production scope. Submit an enquiry to receive a customized brief.",
  },
];

export default function FashionShowManagementDubaiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://www.fashaiuniversal.com/services/fashion-show-management-dubai#service",
        "name": "Fashion Show Management & Runway Production Dubai",
        "provider": {
          "@type": "Organization",
          "name": "FashAI Universal",
          "url": "https://www.fashaiuniversal.com",
        },
        "areaServed": {
          "@type": "City",
          "name": "Dubai",
        },
        "serviceType": "Fashion Show Production & Management",
        "url": "https://www.fashaiuniversal.com/services/fashion-show-management-dubai",
        "description": "End-to-end runway production, catwalk staging, and talent management for fashion shows in Dubai, UAE.",
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.fashaiuniversal.com/services/fashion-show-management-dubai#breadcrumb",
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
            "name": "Fashion Show Management Dubai",
            "item": "https://www.fashaiuniversal.com/services/fashion-show-management-dubai",
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
              <Sparkles className="w-3.5 h-3.5" />
              <span>DUBAI, UAE · RUNWAY &amp; SHOWCASE PRODUCTION</span>
            </div>

            <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light uppercase tracking-tight leading-[0.95]">
              FASHION SHOW MANAGEMENT IN <span className="italic text-[#D4AF37]">DUBAI</span>
            </h1>

            <p className="font-sans text-base sm:text-lg md:text-xl text-[#444444] dark:text-white/85 font-light leading-relaxed max-w-3xl mx-auto">
              FashAI Universal designs and produces high-impact runway presentations, catwalk showcases, and designer galas in Dubai. From spatial stage design to backstage choreography, we deliver flawless fashion show executions.
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
              EXECUTIVE SERVICES
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-light uppercase tracking-tight">
              WHAT WE DELIVER FOR FASHION SHOWS
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

      {/* 03. PROCESS / HOW IT WORKS */}
      <section className="py-12 sm:py-16 bg-[#FAF8F5] dark:bg-[#080706] border-b border-black/10 dark:border-white/10">
        <div className="container-editorial relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <span className="font-jost text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              PRODUCTION WORKFLOW
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-light uppercase tracking-tight">
              THE RUNWAY MANAGEMENT PROCESS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Creative Concept & Brief", desc: "Defining runway theme, collection direction, lighting atmosphere, and spatial floorplan." },
              { step: "02", title: "Venue & Technical Setup", desc: "Constructing stage architecture, sound arrays, backstage stations, and VIP seating." },
              { step: "03", title: "Talent & Rehearsal", desc: "Model fittings, walk choreography, makeup direction, and full technical dress rehearsal." },
              { step: "04", title: "Live Show Execution", desc: "Seamless show call, backstage speed changes, live press broadcast, and post-show guest management." },
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
                LOCATION EXPERTISE · DUBAI &amp; UAE
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-light uppercase">
                WORLD-CLASS FASHION INFRASTRUCTURE IN DUBAI
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#444444] dark:text-white/85 font-light leading-relaxed">
                Dubai is a global fashion destination uniting luxury couture houses, international press, and fashion-conscious audiences. FashAI Universal brings technical precision and spatial atmosphere to iconic Dubai venues, ensuring every garment presentation reflects haute couture standards.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-jost">
                <Link href="/services" className="text-[#D4AF37] hover:underline font-bold uppercase">
                  All Services ↗
                </Link>
                <Link href="/projects" className="text-[#D4AF37] hover:underline font-bold uppercase">
                  View Projects ↗
                </Link>
                <Link href="/talent" className="text-[#D4AF37] hover:underline font-bold uppercase">
                  Talent Roster ↗
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5 relative h-72 sm:h-80 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10">
              <Image
                src="/assets/homepage/Fashion.png"
                alt="Fashion show management and catwalk production in Dubai"
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
                FASHION SHOW MANAGEMENT QUESTIONS
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
            READY TO PRODUCE YOUR RUNWAY SHOW?
          </span>
          <h2 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-light uppercase">
            COMMISSION YOUR DUBAI FASHION PRESENTATION
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#444444] dark:text-white/80 max-w-xl mx-auto font-light leading-relaxed">
            Submit your event brief to FashAI Universal to initiate production planning, staging proposals, and talent direction.
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
