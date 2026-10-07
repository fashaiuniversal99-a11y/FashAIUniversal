import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, UserPlus, Briefcase, HelpCircle, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { APPROVED_TALENT_ROSTER } from "@/data/talent";

export const metadata: Metadata = {
  title: "Makeup Artist Opportunities | FashAI Universal Talent Network",
  description:
    "Apply as a beauty director or backstage makeup artist with FashAI Universal. Join our creative network for fashion shows, brand shoots, and editorial productions.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/talent/makeup-artist-opportunities",
  },
  openGraph: {
    title: "Makeup Artist Opportunities | FashAI Universal Talent Network",
    description:
      "Backstage beauty direction and makeup artist opportunities for fashion shows and editorial shoot productions.",
    url: "https://www.fashaiuniversal.com/talent/makeup-artist-opportunities",
    siteName: "FashAI Universal",
    images: [{ url: "/assets/brand/fashai-og-share.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Makeup Artist Opportunities | FashAI Universal Talent Network",
    description:
      "Backstage beauty direction and makeup artist opportunities for fashion shows and editorial shoot productions.",
    images: ["/assets/brand/fashai-og-share.png"],
  },
};

const MAKEUP_ARTISTS = APPROVED_TALENT_ROSTER.filter(
  (t) => t.category === "MAKEUP ARTISTS"
);

const FAQS = [
  {
    q: "How can makeup artists join the FashAI Universal network?",
    a: "Submit your portfolio, editorial credits, and beauty lookbook through our official application page under the Makeup Artist category.",
  },
  {
    q: "What types of productions involve makeup artists?",
    a: "Our roster makeup artists provide backstage beauty direction, haute couture runway looks, editorial brand shoots, and campaign video styling.",
  },
  {
    q: "Do you accept emerging beauty artists?",
    a: "Yes. We evaluate portfolios based on technical skin work, editorial precision, and backstage speed discipline regardless of career stage.",
  },
  {
    q: "How are makeup artists selected for events?",
    a: "When an event or brand shoot requires beauty teams, shortlisted artists from our roster are contacted with show parameters and call schedules.",
  },
];

export default function MakeupArtistOpportunitiesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.fashaiuniversal.com/talent/makeup-artist-opportunities#webpage",
        "name": "Makeup Artist Opportunities",
        "url": "https://www.fashaiuniversal.com/talent/makeup-artist-opportunities",
        "description": "Application pathway for beauty directors and makeup artists joining the FashAI Universal production network.",
        "publisher": {
          "@type": "Organization",
          "name": "FashAI Universal",
          "url": "https://www.fashaiuniversal.com",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.fashaiuniversal.com/talent/makeup-artist-opportunities#breadcrumb",
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
            "name": "Talent Network",
            "item": "https://www.fashaiuniversal.com/talent",
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Makeup Artist Opportunities",
            "item": "https://www.fashaiuniversal.com/talent/makeup-artist-opportunities",
          },
        ],
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
              <Sparkles className="w-3.5 h-3.5" />
              <span>BEAUTY &amp; BACKSTAGE CREATIVE NETWORK</span>
            </div>

            <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light uppercase tracking-tight leading-[0.95]">
              MAKEUP ARTIST <span className="italic text-[#D4AF37]">OPPORTUNITIES</span>
            </h1>

            <p className="font-jost text-base sm:text-lg md:text-xl text-[#444444] dark:text-white/85 font-light leading-relaxed max-w-3xl mx-auto">
              FashAI Universal reviews and coordinates beauty directors and makeup artists for haute couture runway shows, editorial campaigns, and luxury event productions in Dubai and India.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/apply?role=makeup-artist"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#D4AF37] hover:bg-[#FFEC69] text-black font-jost font-bold text-xs sm:text-sm tracking-wider uppercase py-4 px-8 rounded-full shadow-md transition-all duration-300 min-h-[48px]"
              >
                <UserPlus className="w-4 h-4" />
                <span>APPLY AS MAKEUP ARTIST →</span>
              </Link>
              <Link
                href="/talent?category=MAKEUP+ARTISTS"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 font-jost font-bold text-xs sm:text-sm tracking-wider uppercase py-4 px-8 rounded-full transition-all duration-300 min-h-[48px]"
              >
                <span>BROWSE TALENT DIRECTORY</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 02. SCOPE OF WORK */}
      <section className="py-12 sm:py-16 border-b border-black/10 dark:border-white/10">
        <div className="w-[min(92vw,1400px)] max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="font-jost text-xs font-bold uppercase tracking-wider text-[#D4AF37] block mb-2">
              CREATIVE CAPABILITIES
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-light uppercase tracking-tight">
              BEAUTY ROLES WITHIN OUR PRODUCTIONS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Runway Beauty Direction",
                desc: "Designing cohesive face charts and managing backstage beauty teams for multi-model catwalk presentations.",
              },
              {
                title: "Editorial Lookbook Styling",
                desc: "High-definition beauty work, skin prep, and creative makeup for brand campaign photography and visual media.",
              },
              {
                title: "Avant-Garde & Special Concepts",
                desc: "Conceptual beauty styling incorporating metallic accents, editorial prosthetics, and computational fashion aesthetics.",
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
              BEAUTY ARTIST ONBOARDING PATHWAY
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Submit Application", desc: "Share your professional background, editorial portfolio link, and location preference." },
              { step: "02", title: "Portfolio Curation", desc: "Our team reviews skin technique, lighting compatibility, and backstage team experience." },
              { step: "03", title: "Roster Placement", desc: "Accepted artists are indexed in the FashAI Creative Directory for client and show bookings." },
              { step: "04", title: "Production Booking", desc: "Shortlisted beauty teams are assigned to scheduled show call-times and shoot productions." },
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

      {/* 04. FEATURED MAKEUP ARTISTS */}
      {MAKEUP_ARTISTS.length > 0 && (
        <section className="py-12 sm:py-16 border-b border-black/10 dark:border-white/10">
          <div className="w-[min(92vw,1400px)] max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="font-jost text-xs font-bold uppercase tracking-wider text-[#D4AF37] block mb-1">
                  ROSTER HIGHLIGHTS
                </span>
                <h2 className="font-serif-display text-2xl sm:text-4xl font-light uppercase">
                  FEATURED BEAUTY ARTISTS &amp; DIRECTORS
                </h2>
              </div>
              <Link
                href="/talent?category=MAKEUP+ARTISTS"
                className="font-jost text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:underline flex items-center gap-1"
              >
                <span>VIEW ALL BEAUTY ARTISTS ↗</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {MAKEUP_ARTISTS.map((mua) => (
                <div key={mua.id} className="rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden bg-[#FAF8F5] dark:bg-[#090807] group">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={mua.image}
                      alt={`${mua.name} - ${mua.specialty}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 space-y-1">
                    <h3 className="font-serif-display text-xl font-light uppercase text-[#111111] dark:text-white">{mua.name}</h3>
                    <p className="font-jost text-xs text-[#666666] dark:text-white/70">{mua.specialty}</p>
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
                BEAUTY NETWORK QUESTIONS
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
            JOIN OUR BACKSTAGE <span className="italic text-[#D4AF37]">BEAUTY NETWORK</span>
          </h2>
          <p className="font-jost text-sm sm:text-base text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
            Apply now to be indexed in the FashAI Universal Creative Directory for upcoming runway shows and editorial brand shoots.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/apply?role=makeup-artist"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#D4AF37] hover:bg-[#FFEC69] text-black font-jost font-bold text-xs sm:text-sm tracking-wider uppercase py-4 px-8 rounded-full transition-all duration-300 min-h-[48px]"
            >
              <span>APPLY AS MAKEUP ARTIST →</span>
            </Link>
            <Link
              href="/hire-talent"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 font-jost font-bold text-xs sm:text-sm tracking-wider uppercase py-4 px-8 rounded-full transition-all duration-300 min-h-[48px]"
            >
              <span>HIRE BEAUTY TALENT</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
