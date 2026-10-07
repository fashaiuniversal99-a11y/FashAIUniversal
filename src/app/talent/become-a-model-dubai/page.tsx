import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, UserPlus, Briefcase, HelpCircle, CheckCircle2, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { APPROVED_TALENT_ROSTER } from "@/data/talent";

export const metadata: Metadata = {
  title: "Become a Model in Dubai | FashAI Universal Talent Network",
  description:
    "Learn how to apply and become a model in Dubai with FashAI Universal. Submit your digitals, comp card, and profile for runway and brand shoot consideration in the UAE.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/talent/become-a-model-dubai",
  },
  openGraph: {
    title: "Become a Model in Dubai | FashAI Universal Talent Network",
    description:
      "Official application pathway and guidance for models seeking presentation and casting opportunities in Dubai, UAE.",
    url: "https://www.fashaiuniversal.com/talent/become-a-model-dubai",
    siteName: "FashAI Universal",
    images: [{ url: "/assets/brand/fashai-og-share.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Become a Model in Dubai | FashAI Universal Talent Network",
    description:
      "Official application pathway and guidance for models seeking presentation and casting opportunities in Dubai, UAE.",
    images: ["/assets/brand/fashai-og-share.png"],
  },
};

const DUB_MODELS = APPROVED_TALENT_ROSTER.filter(
  (t) => t.category === "MODELS" && (t.location?.includes("Dubai") || t.isFeatured)
).slice(0, 4);

const FAQS = [
  {
    q: "Who can apply to become a model with FashAI Universal in Dubai?",
    a: "We welcome applications from emerging and established models across runway, commercial, editorial, and computational showcase categories currently based in or willing to travel to Dubai.",
  },
  {
    q: "What materials should I submit with my application?",
    a: "A clean set of natural digitals (front, profile, full-length), updated height and measurement details, contact information, and links to your current portfolio or social handle.",
  },
  {
    q: "What happens after I submit my application?",
    a: "Our creative direction team reviews submitted profiles against upcoming client requirements and show schedules. Qualified applicants are indexed in our active talent directory.",
  },
  {
    q: "Is there any cost to apply?",
    a: "No. Submitting an application to join the FashAI Universal Talent Roster is completely free.",
  },
];

export default function BecomeAModelDubaiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.fashaiuniversal.com/talent/become-a-model-dubai#webpage",
        "name": "Become a Model in Dubai",
        "url": "https://www.fashaiuniversal.com/talent/become-a-model-dubai",
        "description": "Application guide and entry pathway for models applying to the FashAI Universal talent network in Dubai, UAE.",
        "publisher": {
          "@type": "Organization",
          "name": "FashAI Universal",
          "url": "https://www.fashaiuniversal.com",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.fashaiuniversal.com/talent/become-a-model-dubai#breadcrumb",
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
            "name": "Become a Model Dubai",
            "item": "https://www.fashaiuniversal.com/talent/become-a-model-dubai",
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
              <span>DUBAI, UAE · TALENT DEVELOPMENT &amp; ONBOARDING</span>
            </div>

            <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light uppercase tracking-tight leading-[0.95]">
              BECOME A MODEL IN <span className="italic text-[#D4AF37]">DUBAI</span>
            </h1>

            <p className="font-jost text-base sm:text-lg md:text-xl text-[#444444] dark:text-white/85 font-light leading-relaxed max-w-3xl mx-auto">
              FashAI Universal provides an official application pathway for models seeking visibility across high fashion catwalks, brand shoot productions, and luxury activations in Dubai.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/apply?role=model"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#D4AF37] hover:bg-[#FFEC69] text-black font-jost font-bold text-xs sm:text-sm tracking-wider uppercase py-4 px-8 rounded-full shadow-md transition-all duration-300 min-h-[48px]"
              >
                <UserPlus className="w-4 h-4" />
                <span>APPLY AS TALENT →</span>
              </Link>
              <Link
                href="/talent?category=MODELS"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 font-jost font-bold text-xs sm:text-sm tracking-wider uppercase py-4 px-8 rounded-full transition-all duration-300 min-h-[48px]"
              >
                <span>BROWSE TALENT DIRECTORY</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 02. WHAT IS EXPECTED */}
      <section className="py-12 sm:py-16 border-b border-black/10 dark:border-white/10">
        <div className="w-[min(92vw,1400px)] max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="font-jost text-xs font-bold uppercase tracking-wider text-[#D4AF37] block mb-2">
              APPLICATION CRITERIA
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-light uppercase tracking-tight">
              WHAT WE LOOK FOR IN MODEL APPLICANTS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Professional Digitals",
                desc: "Natural, un-retouched headshots and full-length photos with simple attire and neutral studio lighting.",
              },
              {
                title: "Catwalk Confidence",
                desc: "Strong poise, rhythmic walking discipline, and adaptability for runway presentations in front of international press.",
              },
              {
                title: "Professional Conduct",
                desc: "Punctuality, clear communication, and commitment during fitting calls, rehearsals, and on-set productions.",
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
              ONBOARDING PATHWAY
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-light uppercase tracking-tight">
              4-STEP MODEL ONBOARDING PROCESS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Fill Application", desc: "Provide contact details, measurements, current location, and portfolio link via our secure application form." },
              { step: "02", title: "Internal Evaluation", desc: "Creative directors assess profile suitability for upcoming fashion show categories and shoot campaigns." },
              { step: "03", title: "Roster Indexing", desc: "Accepted models are featured on the FashAI Universal directory and matched against incoming client briefs." },
              { step: "04", title: "Project Casting", desc: "Selected models receive official notification and schedule details for fittings and rehearsals." },
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

      {/* 04. FEATURED APPROVED ROSTER EXAMPLES */}
      <section className="py-12 sm:py-16 border-b border-black/10 dark:border-white/10">
        <div className="w-[min(92vw,1400px)] max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="font-jost text-xs font-bold uppercase tracking-wider text-[#D4AF37] block mb-1">
                TALENT NETWORK EXAMPLES
              </span>
              <h2 className="font-serif-display text-2xl sm:text-4xl font-light uppercase">
                APPROVED DUBAI RUNWAY &amp; EDITORIAL MODELS
              </h2>
            </div>
            <Link
              href="/talent?category=MODELS"
              className="font-jost text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:underline flex items-center gap-1"
            >
              <span>VIEW ALL MODELS ↗</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {DUB_MODELS.map((model) => (
              <div key={model.id} className="rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden bg-[#FAF8F5] dark:bg-[#090807] group">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={model.image}
                    alt={`${model.name} - ${model.specialty}`}
                    fill
                    className={`object-cover ${model.objectPosition || "object-top"} group-hover:scale-105 transition-transform duration-500`}
                  />
                </div>
                <div className="p-3 sm:p-4 space-y-1">
                  <h3 className="font-serif-display text-base sm:text-lg font-light uppercase text-[#111111] dark:text-white">{model.name}</h3>
                  <p className="font-jost text-xs text-[#666666] dark:text-white/70">{model.specialty}</p>
                </div>
              </div>
            ))}
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
                MODEL APPLICATION QUESTIONS
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
            START YOUR MODEL APPLICATION FOR <span className="italic text-[#D4AF37]">DUBAI</span>
          </h2>
          <p className="font-jost text-sm sm:text-base text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
            Submit your profile to join FashAI Universal&apos;s approved model directory for runway and brand shoot consideration in the UAE.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/apply?role=model"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#D4AF37] hover:bg-[#FFEC69] text-black font-jost font-bold text-xs sm:text-sm tracking-wider uppercase py-4 px-8 rounded-full transition-all duration-300 min-h-[48px]"
            >
              <span>APPLY AS TALENT →</span>
            </Link>
            <Link
              href="/hire-talent"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 font-jost font-bold text-xs sm:text-sm tracking-wider uppercase py-4 px-8 rounded-full transition-all duration-300 min-h-[48px]"
            >
              <span>HIRE TALENT</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
