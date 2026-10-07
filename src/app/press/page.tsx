import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, MapPin, Mail, Globe, Download, Newspaper, CheckCircle2, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { OFFICIAL_SUPPLIER_CONFIG } from "@/data/supplier-directory";

export const metadata: Metadata = {
  title: "Press & Media Kit | FashAI Universal",
  description:
    "Official press releases, media positioning, company background, approved locations in Dubai & Gurgaon, and media inquiries for FashAI Universal.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/press",
  },
  openGraph: {
    title: "Press & Media Kit | FashAI Universal",
    description:
      "Official media kit, press statements, business overview, and verified office details for FashAI Universal.",
    url: "https://www.fashaiuniversal.com/press",
    siteName: "FashAI Universal",
    images: [{ url: "/assets/brand/fashai-og-share.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Press & Media Kit | FashAI Universal",
    description:
      "Official media kit, press statements, business overview, and verified office details for FashAI Universal.",
    images: ["/assets/brand/fashai-og-share.png"],
  },
};

export default function PressPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.fashaiuniversal.com/press",
        "url": "https://www.fashaiuniversal.com/press",
        "name": "Press & Media Kit",
        "description": "Official media backgrounder, press release, and corporate directory for FashAI Universal.",
        "publisher": {
          "@type": "Organization",
          "name": "FashAI Universal",
          "url": "https://www.fashaiuniversal.com",
        },
      },
      {
        "@type": "NewsArticle",
        "headline": "FashAI Universal Prepares for LifeStyle 2026 Production & International Talent Expansion",
        "description": "FashAI Universal announces initial preparations for LifeStyle 2026 and expansion of its event management and talent casting architecture across Dubai and India.",
        "url": "https://www.fashaiuniversal.com/press",
        "datePublished": "2026-10-05",
        "author": {
          "@type": "Organization",
          "name": "FashAI Universal",
          "url": "https://www.fashaiuniversal.com",
        },
        "publisher": {
          "@type": "Organization",
          "name": "FashAI Universal",
          "url": "https://www.fashaiuniversal.com",
        },
      },
    ],
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
              <Newspaper className="w-3.5 h-3.5" />
              <span>OFFICIAL MEDIA &amp; PRESS CENTER</span>
            </div>

            <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light uppercase tracking-tight leading-[0.95]">
              PRESS &amp; <span className="italic text-[#D4AF37]">MEDIA KIT</span>
            </h1>

            <p className="font-jost text-base sm:text-lg md:text-xl text-[#444444] dark:text-white/85 font-light leading-relaxed max-w-3xl mx-auto">
              Official press statements, corporate backgrounders, verified location details, and media resources for FashAI Universal productions across Dubai and India.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#D4AF37] hover:bg-[#FFEC69] text-black font-jost font-bold text-xs sm:text-sm tracking-wider uppercase py-4 px-8 rounded-full shadow-md transition-all duration-300 min-h-[48px]"
              >
                <span>MEDIA INQUIRIES →</span>
              </Link>
              <Link
                href="/fashion-magazine"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 font-jost font-bold text-xs sm:text-sm tracking-wider uppercase py-4 px-8 rounded-full transition-all duration-300 min-h-[48px]"
              >
                <span>READ FASHION MAGAZINE</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 02. COMPANY OVERVIEW */}
      <section className="py-12 sm:py-16 border-b border-black/10 dark:border-white/10">
        <div className="w-[min(92vw,1400px)] max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="font-jost text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                COMPANY BACKGROUNDER
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-light uppercase">
                INTERNATIONAL FASHION &amp; EVENT MANAGEMENT PLATFORM
              </h2>
              <p className="font-jost text-sm sm:text-base text-[#444444] dark:text-white/85 font-light leading-relaxed">
                FashAI Universal provides end-to-end event management, planning, and production for luxury fashion shows, corporate summits, brand activations, and shoot productions. Operating across primary hubs in Dubai, UAE, and Gurgaon, India, the company bridges physical runway craftsmanship with advanced event architecture.
              </p>
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-jost">
                {OFFICIAL_SUPPLIER_CONFIG.coreServices.map((srv, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[#333333] dark:text-white/80">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span>{srv}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 relative h-72 sm:h-80 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10">
              <Image
                src="/assets/homepage/Production.png"
                alt="FashAI Universal event management production setup"
                fill
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 03. OFFICIAL PRESS RELEASE */}
      <section className="py-12 sm:py-16 bg-[#FAF8F5] dark:bg-[#080706] border-b border-black/10 dark:border-white/10">
        <div className="w-[min(92vw,1000px)] max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
              <span className="font-jost text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                OFFICIAL PRESS RELEASE
              </span>
              <span className="font-jost text-xs text-[#666666] dark:text-white/60">
                OCTOBER 2026 · FOR IMMEDIATE RELEASE
              </span>
            </div>

            <h2 className="font-serif-display text-2xl sm:text-4xl font-light uppercase tracking-tight leading-tight">
              FASHAI UNIVERSAL ANNOUNCES PRODUCTION &amp; TALENT ARCHITECTURE FOR LIFESTYLE 2026
            </h2>

            <div className="space-y-4 font-jost text-sm sm:text-base text-[#444444] dark:text-white/85 font-light leading-relaxed text-justify">
              <p>
                <strong>DUBAI, UAE &amp; GURGAON, INDIA</strong> — FashAI Universal has officially detailed its event management and talent casting architecture in preparation for the upcoming edition of <strong>LifeStyle 2026</strong>.
              </p>
              <p>
                As an international luxury fashion and event platform, FashAI Universal connects haute couture designers, runway models, makeup directors, stylists, choreographers, and brand partners across the UAE, Middle East, and India. The upcoming LifeStyle 2026 presentation will incorporate bespoke catwalk staging, spatial digital media, VIP networking salons, and corporate sponsor integration.
              </p>
              <p>
                <em>Event Status:</em> LifeStyle 2026 dates and premier venue selections in Dubai remain subject to official announcement. Interested brand sponsors, designers, and creative talent can submit inquiries through the official portal.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#0B0A09] border border-black/10 dark:border-white/10 space-y-2">
              <h3 className="font-serif-display text-lg font-light uppercase">PRESS CONTACT INFORMATION</h3>
              <p className="font-jost text-xs sm:text-sm text-[#555555] dark:text-white/80 font-light">
                For official media accreditation, interview requests, and press kit access, contact:
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-jost font-bold uppercase text-[#D4AF37]">
                <a href={`mailto:${OFFICIAL_SUPPLIER_CONFIG.contactEmail}`} className="hover:underline flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{OFFICIAL_SUPPLIER_CONFIG.contactEmail}</span>
                </a>
                <Link href="/contact" className="hover:underline flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Media Inquiry Form ↗</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04. VERIFIED OFFICE LOCATIONS */}
      <section className="py-12 sm:py-16 border-b border-black/10 dark:border-white/10">
        <div className="w-[min(92vw,1400px)] max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8 space-y-2">
            <span className="font-jost text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              VERIFIED OFFICES
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-light uppercase tracking-tight">
              APPROVED CORPORATE LOCATIONS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OFFICIAL_SUPPLIER_CONFIG.locations.map((loc, idx) => (
              <div key={idx} className="p-6 sm:p-8 rounded-2xl bg-[#FAF8F5] dark:bg-[#090807] border border-black/10 dark:border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-xs font-jost font-bold uppercase text-[#D4AF37]">
                  <MapPin className="w-4 h-4" />
                  <span>{loc.name}</span>
                </div>
                <h3 className="font-serif-display text-xl font-light uppercase">{loc.city}, {loc.country}</h3>
                <div className="font-jost text-xs sm:text-sm text-[#555555] dark:text-white/80 font-light space-y-1">
                  {loc.addressLines.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
                {loc.mapsUrl && (
                  <div className="pt-2">
                    <a
                      href={loc.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-jost font-bold uppercase text-[#D4AF37] hover:underline"
                    >
                      <span>VIEW ON GOOGLE MAPS ↗</span>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05. FINAL MEDIA CTA */}
      <section className="py-16 sm:py-24 relative overflow-hidden bg-black text-white text-center">
        <div className="w-[min(92vw,1400px)] max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <h2 className="font-serif-display text-3xl sm:text-5xl md:text-6xl font-light uppercase tracking-tight">
            CONNECT WITH <span className="italic text-[#D4AF37]">FASHAI UNIVERSAL PRESS</span>
          </h2>
          <p className="font-jost text-sm sm:text-base text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
            Submit media inquiries, press accreditation requests, or commercial sponsorship inquiries to our team.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#D4AF37] hover:bg-[#FFEC69] text-black font-jost font-bold text-xs sm:text-sm tracking-wider uppercase py-4 px-8 rounded-full transition-all duration-300 min-h-[48px]"
            >
              <span>SUBMIT MEDIA INQUIRY →</span>
            </Link>
            <Link
              href="/plan-your-event"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 font-jost font-bold text-xs sm:text-sm tracking-wider uppercase py-4 px-8 rounded-full transition-all duration-300 min-h-[48px]"
            >
              <span>PLAN YOUR EVENT</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
