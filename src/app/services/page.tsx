import type { Metadata } from "next";
import WhatWeDoSection from "@/components/sections/WhatWeDoSection";
import WhoWeServeSection from "@/components/sections/WhoWeServeSection";
import CreateEventSection from "@/components/sections/CreateEventSection";
import Link from "next/link";
import { ArrowRight, Sparkles, Layers, ShieldCheck, Cpu, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Services & Event Architecture — FashAI Universal",
  description:
    "Events and talent, handled by one team. Discover FashAI Universal's core services: Haute Couture Catwalk Presentations, Luxury Brand Activations, International Talent Curation, and Event Architecture across Dubai and India.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/services",
  },
};

const SERVICES_DETAILED = [
  {
    id: "catwalk-presentation",
    number: "01",
    title: "Haute Runway & Catwalk Presentations",
    category: "RUNWAY & SHOWCASE",
    description:
      "End-to-end luxury fashion show production combining physical garment choreography, spatial lighting installations, runway staging, and international buyer viewings.",
    features: [
      "Bespoke Runway Staging & Lighting Design",
      "Haute Couture Choreography & Music Curation",
      "Global Buyer & Press Guest Management",
      "4K Ultra-HD Media Distribution",
    ],
    icon: Sparkles,
  },
  {
    id: "computational-design",
    number: "02",
    title: "Spatial & Digital Experience Design",
    category: "INNOVATION & DIGITAL",
    description:
      "Combining 3D garment visualization, spatial stage atmosphere design, and digital experience integration to complement physical fashion craftsmanship and runway production.",
    features: [
      "Spatial Catwalk & Stage Atmosphere Design",
      "3D Silhouette & Fabric Visualization",
      "Interactive Event Concierge Pathways",
      "Digital Campaign & Experience Storytelling",
    ],
    icon: Cpu,
  },
  {
    id: "brand-activations",
    number: "03",
    title: "Luxury Brand Activations & Summits",
    category: "BRAND EXPERIENCES",
    description:
      "Curating ultra-exclusive brand experiences, private delegate summits, luxury product viewings, and VIP networking galas across Dubai, UAE, and India.",
    features: [
      "High-Net-Worth Delegate & VIP Hosting",
      "Bespoke Brand Curation & Installation",
      "Private Salon Viewings & Trunk Shows",
      "International Sponsor Integration",
    ],
    icon: Globe,
  },
  {
    id: "talent-network",
    number: "04",
    title: "International Talent Curation & Direction",
    category: "TALENT & CREATIVE",
    description:
      "Managing and styling international runway models, couture makeup artists, fashion stylists, and creative directors for world-class fashion productions.",
    features: [
      "Global Model Scouting & Booking",
      "Haute Couture Styling & Art Direction",
      "Editorial Makeup & Hair Styling Teams",
      "Backstage Operations & Choreography",
    ],
    icon: ShieldCheck,
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-white dark:bg-[#050505] text-[#111111] dark:text-white pt-16 sm:pt-20 md:pt-24 min-h-screen">
      {/* 01. SERVICES HERO BANNER */}
      <section className="relative pt-8 sm:pt-14 pb-10 sm:pb-16 border-b border-black/10 dark:border-white/10 bg-[#FAF8F5] dark:bg-[#080706]">
        <div className="w-[min(92vw,1400px)] max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-[950px] mx-auto space-y-4 sm:space-y-6 text-center">
            {/* 1. SYMMETRIC CENTERED SECTION LABEL */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 mx-auto">
              <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-[#F15E1C] dark:to-[#D4AF37]" />
              <span className="font-syne text-xs sm:text-sm md:text-base tracking-[0.25em] text-[#F15E1C] dark:text-[#D4AF37] font-bold uppercase shrink-0">
                03 / SERVICES &amp; EVENT ARCHITECTURE
              </span>
              <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-l from-transparent to-[#F15E1C] dark:to-[#D4AF37]" />
            </div>

            {/* 2. CENTERED MAIN HEADING */}
            <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-[#111111] dark:text-white uppercase leading-[0.95] tracking-tight text-center mx-auto">
              OUR <span className="font-serif italic text-[#F15E1C] dark:text-[#D4AF37]">SERVICES</span> &amp; FORMATS
            </h1>

            {/* 3. CENTERED INTRO PARAGRAPH */}
            <p className="font-sans text-base sm:text-lg md:text-xl lg:text-2xl text-[#444444] dark:text-white/90 font-light leading-relaxed max-w-[900px] mx-auto text-center">
              Events and talent, handled by one team. FashAI Universal delivers specialized fashion show production, digital experience design, luxury brand activations, and global talent orchestration across Dubai and India.
            </p>
          </div>
        </div>
      </section>

      {/* 02. CORE SERVICES ARCHITECTURE GRID */}
      <section className="pt-8 pb-14 sm:pt-12 sm:pb-20 border-b border-black/10 dark:border-white/10">
        <div className="container-editorial max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12 border-b border-black/10 dark:border-white/10 pb-5">
            <h2 className="font-syne text-xs sm:text-sm md:text-base tracking-[0.25em] text-[#F15E1C] dark:text-[#D4AF37] font-bold uppercase mb-1.5">
              CORE CAPABILITIES
            </h2>
            <h3 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-light text-[#111111] dark:text-white uppercase tracking-tight">
              WHAT WE DELIVER
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
            {SERVICES_DETAILED.map((service) => {
              const IconComp = service.icon;
              return (
                <div
                  key={service.id}
                  className="p-6 sm:p-8 md:p-10 rounded-2xl border border-black/10 dark:border-white/15 bg-[#FAF8F5] dark:bg-[#090807] hover:border-[#F15E1C] dark:hover:border-[#D4AF37] transition-all duration-300 shadow-sm flex flex-col justify-between group"
                >
                  <div className="space-y-4 sm:space-y-5">
                    <div className="flex items-center justify-between">
                      <span className="font-serif-display text-4xl sm:text-6xl font-light text-[#F15E1C] dark:text-[#D4AF37]">
                        {service.number}
                      </span>
                      <span className="text-xs sm:text-sm font-syne tracking-wider text-[#F15E1C] dark:text-[#D4AF37] bg-[#F15E1C]/10 dark:bg-[#D4AF37]/10 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full font-bold uppercase">
                        {service.category}
                      </span>
                    </div>

                    <h4 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-light text-[#111111] dark:text-white group-hover:text-[#F15E1C] dark:group-hover:text-[#D4AF37] transition-colors leading-snug">
                      {service.title}
                    </h4>

                    <p className="font-sans text-base sm:text-lg text-[#444444] dark:text-white/85 leading-relaxed font-light text-justify">
                      {service.description}
                    </p>

                    <div className="pt-4 border-t border-black/10 dark:border-white/10 space-y-2.5 sm:space-y-3">
                      {service.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 sm:gap-3 text-sm sm:text-base font-syne text-[#333333] dark:text-white/90 font-medium">
                          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#F15E1C] dark:bg-[#D4AF37] flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-black/10 dark:border-white/10 flex justify-end">
                    <Link
                      href="/contact?type=Services"
                      className="inline-flex items-center gap-2 sm:gap-2.5 text-sm sm:text-base font-jost font-bold uppercase tracking-wider text-[#D4AF37] hover:underline"
                    >
                      <span>ENQUIRE FOR THIS SERVICE</span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SPECIALIZED REGIONAL LANDING HUBS */}
      <section className="py-12 sm:py-16 bg-[#FAF8F5] dark:bg-[#080706] border-b border-black/10 dark:border-white/10">
        <div className="w-[min(92vw,1400px)] max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8 space-y-2">
            <span className="font-jost text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              REGIONAL &amp; SPECIALIZED SERVICES
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-light uppercase tracking-tight">
              TARGETED SERVICE DESTINATIONS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Fashion Show Management Dubai",
                location: "Dubai, UAE",
                href: "/services/fashion-show-management-dubai",
                desc: "Runway production, catwalk staging, and luxury show management.",
              },
              {
                title: "Event Management Company Gurgaon",
                location: "Gurgaon, India",
                href: "/services/event-management-gurgaon",
                desc: "End-to-end corporate, lifestyle, and fashion event planning.",
              },
              {
                title: "Corporate Events Dubai",
                location: "Dubai, UAE",
                href: "/services/corporate-events-dubai",
                desc: "Executive summits, tech activations, and luxury brand launches.",
              },
              {
                title: "Brand Shoots Dubai",
                location: "Dubai, UAE",
                href: "/services/brand-shoots-dubai",
                desc: "Editorial shoot production, creative direction, and talent booking.",
              },
            ].map((hub, i) => (
              <Link
                key={i}
                href={hub.href}
                className="p-6 rounded-2xl bg-white dark:bg-[#0B0A09] border border-black/10 dark:border-white/10 hover:border-[#D4AF37] transition-all group space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-jost font-bold uppercase tracking-wider text-[#D4AF37] px-2.5 py-1 rounded-full bg-[#D4AF37]/10 inline-block">
                    {hub.location}
                  </span>
                  <h3 className="font-serif-display text-xl font-light uppercase group-hover:text-[#D4AF37] transition-colors">
                    {hub.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#555555] dark:text-white/75 font-light leading-relaxed">
                    {hub.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-black/10 dark:border-white/10 flex items-center gap-1.5 text-xs font-jost font-bold uppercase text-[#D4AF37]">
                  <span>EXPLORE SERVICE</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 03. WHAT WE DO SECTION */}
      <WhatWeDoSection />

      {/* 04. WHO WE SERVE SECTION */}
      <WhoWeServeSection />

      {/* 05. CREATE YOUR OWN EVENT INQUIRY SECTION */}
      <CreateEventSection />

      {/* 06. SERVICE INQUIRY CTA */}
      <section className="py-14 sm:py-24 bg-[#FAF8F5] dark:bg-[#080706] border-t border-black/10 dark:border-white/10">
        <div className="container-editorial max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8">
          <span className="text-xs sm:text-sm md:text-base font-syne tracking-[0.25em] text-[#F15E1C] dark:text-[#D4AF37] font-bold uppercase">
            COMMISSION A SHOW OR BRAND EXPERIENCE
          </span>
          <h2 className="font-serif-display text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#111111] dark:text-white uppercase leading-tight tracking-tight">
            READY TO ELEVATE YOUR <br className="hidden sm:inline" />
            <span className="font-serif italic font-normal text-[#F15E1C] dark:text-[#D4AF37]">FASHION EXPERIENCE?</span>
          </h2>
          <p className="font-sans text-base sm:text-lg md:text-xl text-[#444444] dark:text-white/85 max-w-2xl mx-auto leading-relaxed font-light">
            Contact our editorial team to discuss runway presentations, computational design collaborations, or sponsorship partnerships in Dubai, UAE &amp; India.
          </p>
          <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
            <Link
              href="/contact"
              className="bg-[#D4AF37] text-[#111111] hover:bg-[#FFEC69] font-syne font-bold text-sm sm:text-base md:text-lg tracking-caps px-8 sm:px-9 py-4 sm:py-4.5 rounded-full shadow-lg transition-all duration-300 w-full sm:w-auto"
            >
              INITIATE SERVICE ENQUIRY →
            </Link>
            <Link
              href="/apply"
              className="border border-[#F15E1C] dark:border-white/30 text-[#111111] dark:text-white hover:bg-[#F15E1C]/10 dark:hover:bg-white/10 font-syne font-bold text-sm sm:text-base md:text-lg tracking-caps px-8 sm:px-9 py-4 sm:py-4.5 rounded-full transition-all duration-300 w-full sm:w-auto"
            >
              APPLY FOR NOMINATION →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
