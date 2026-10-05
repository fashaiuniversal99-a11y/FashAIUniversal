import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, MapPin, Building, CheckCircle2, HelpCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Event Management Company in Gurgaon & Delhi NCR | FashAI Universal",
  description:
    "End-to-end event management, planning, and execution in Gurgaon, Haryana. Specialized in luxury lifestyle galas, corporate events, fashion presentations, and brand activations.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/services/event-management-gurgaon",
  },
  openGraph: {
    title: "Event Management Company in Gurgaon & Delhi NCR | FashAI Universal",
    description:
      "Full-service event management, planning, and production based at our Gurgaon India HQ. Corporate events, fashion galas, and luxury brand experiences.",
    url: "https://www.fashaiuniversal.com/services/event-management-gurgaon",
    siteName: "FashAI Universal",
    images: [{ url: "/assets/brand/fashai-og-share.png", width: 1200, height: 630 }],
  },
};

const DELIVERABLES = [
  {
    title: "End-to-End Event Planning & Execution",
    description: "Complete event orchestration: venue acquisition, spatial floorplanning, vendor management, schedule coordination, and on-site event execution.",
  },
  {
    title: "Corporate Events & Executive Galas",
    description: "Production of corporate summits, product unveilings, award galas, and brand milestone celebrations for enterprise clients.",
  },
  {
    title: "Fashion Shows & Lifestyle Presentations",
    description: "Curating high-fashion catwalk shows, designer lookbook launches, and luxury lifestyle showcases across premiere venues in Gurgaon and NCR.",
  },
  {
    title: "Creative Stage & Technical Direction",
    description: "Architectural stage design, LED screen geometry, professional audio-visual engineering, and spatial lighting coordination.",
  },
];

const FAQS = [
  {
    q: "Where is FashAI Universal's India headquarters located?",
    a: "Our India HQ is located at Platinum Floor, 14/23, Ardee City, Sector 52, Gurgaon, Haryana 122002, India.",
  },
  {
    q: "What event management services do you provide in Gurgaon and Delhi NCR?",
    a: "We manage corporate galas, fashion presentations, brand activations, summits, and luxury event experiences with end-to-end production.",
  },
  {
    q: "Can FashAI Universal manage large corporate galas and multi-day summits?",
    a: "Yes. Our team manages full production logistics, stage design, VIP guest hospitality, audio-visual engineering, and event coordination.",
  },
  {
    q: "How do I request an event management proposal in Gurgaon?",
    a: "Submit your event requirements via our Plan Your Event or Contact form. Our production team will review your brief and coordinate tailored recommendations.",
  },
];

export default function EventManagementGurgaonPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "FashAI Universal — Event Management Gurgaon",
    "url": "https://www.fashaiuniversal.com/services/event-management-gurgaon",
    "email": "contact@fashaiuniversal.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Platinum Floor, 14/23, Ardee City, Sector 52",
      "addressLocality": "Gurgaon",
      "addressRegion": "Haryana",
      "postalCode": "122002",
      "addressCountry": "IN",
    },
    "description": "Full-service event management, corporate event planning, and luxury fashion production in Gurgaon and Delhi NCR.",
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
              <MapPin className="w-3.5 h-3.5" />
              <span>GURGAON, INDIA · EVENT PRODUCTION HQ</span>
            </div>

            <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light uppercase tracking-tight leading-[0.95]">
              EVENT MANAGEMENT COMPANY IN <span className="italic text-[#D4AF37]">GURGAON</span>
            </h1>

            <p className="font-sans text-base sm:text-lg md:text-xl text-[#444444] dark:text-white/85 font-light leading-relaxed max-w-3xl mx-auto">
              Headquartered in Gurgaon, FashAI Universal provides end-to-end event management, corporate gala production, luxury fashion showcases, and brand experience execution across Gurgaon and the Delhi NCR region.
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
        <div className="w-[min(92vw,1400px)] max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="font-jost text-xs font-bold uppercase tracking-wider text-[#D4AF37] block mb-2">
              EXECUTIVE EVENT SERVICES
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-light uppercase tracking-tight">
              FULL-SERVICE EVENT MANAGEMENT IN GURGAON
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
              STRUCTURED MANAGEMENT
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-light uppercase tracking-tight">
              HOW WE PLAN &amp; EXECUTE YOUR EVENT
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Intake & Objectives", desc: "Understanding corporate goals, guest profiles, budget parameters, and venue options in Gurgaon." },
              { step: "02", title: "Production Design", desc: "3D stage rendering, lighting schemes, audio architecture, and vendor contract management." },
              { step: "03", title: "Coordination & Talent", desc: "Managing event timelines, host talent, technical technicians, and hospitality teams." },
              { step: "04", title: "On-Site Execution", desc: "Directing live show flow, stage control, VIP reception, and post-event reporting." },
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

      {/* 04. INDIA HQ & REGIONAL RELEVANCE */}
      <section className="py-12 sm:py-16 border-b border-black/10 dark:border-white/10">
        <div className="w-[min(92vw,1400px)] max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="font-jost text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                HEADQUARTERS LOCATION · GURGAON, HARYANA
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-light uppercase">
                STRATEGIC EVENT CAPABILITIES IN GURGAON &amp; NCR
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#444444] dark:text-white/85 font-light leading-relaxed">
                Operating from Sector 52, Gurgaon, FashAI Universal connects corporate enterprise hubs with high-end creative event design. Whether hosting a multi-day corporate summit or an exclusive luxury fashion presentation, our local team brings international execution standards to Gurgaon and Delhi NCR.
              </p>
              <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#090807] border border-black/10 dark:border-white/10 text-xs font-jost space-y-1">
                <span className="font-bold text-[#D4AF37] uppercase block">INDIA HQ ADDRESS</span>
                <span className="text-[#333333] dark:text-white/80 block">Platinum Floor, 14/23, Ardee City, Sector 52, Gurgaon, Haryana 122002, India</span>
              </div>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-jost">
                <Link href="/projects" className="text-[#D4AF37] hover:underline font-bold uppercase">
                  View Projects ↗
                </Link>
                <Link href="/services" className="text-[#D4AF37] hover:underline font-bold uppercase">
                  Service Formats ↗
                </Link>
                <Link href="/contact" className="text-[#D4AF37] hover:underline font-bold uppercase">
                  Contact Gurgaon Office ↗
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5 relative h-72 sm:h-80 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10">
              <Image
                src="/assets/homepage/Production.png"
                alt="Event management and corporate gala production in Gurgaon"
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
                GURGAON EVENT MANAGEMENT QUESTIONS
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
        <div className="w-[min(92vw,1400px)] max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="font-jost text-xs sm:text-sm font-bold uppercase tracking-wider text-[#D4AF37]">
            READY TO PLAN YOUR EVENT IN GURGAON?
          </span>
          <h2 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-light uppercase">
            SUBMIT YOUR EVENT BRIEF TO OUR GURGAON TEAM
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#444444] dark:text-white/80 max-w-xl mx-auto font-light leading-relaxed">
            Contact our Gurgaon production management office to initiate proposals, venue planning, and stage execution.
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
