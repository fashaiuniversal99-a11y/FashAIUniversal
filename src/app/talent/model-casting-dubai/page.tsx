import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, UserPlus, Briefcase, HelpCircle, CheckCircle2, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { APPROVED_TALENT_ROSTER } from "@/data/talent";

export const metadata: Metadata = {
  title: "Model Casting Dubai | FashAI Universal Talent Network",
  description:
    "Explore model casting opportunities in Dubai & UAE. Submit your portfolio for runway presentations, editorial shoots, and luxury brand events with FashAI Universal.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/talent/model-casting-dubai",
  },
  openGraph: {
    title: "Model Casting Dubai | FashAI Universal Talent Network",
    description:
      "Model casting opportunities for fashion shows, brand shoots, and catwalk presentations in Dubai, UAE.",
    url: "https://www.fashaiuniversal.com/talent/model-casting-dubai",
    siteName: "FashAI Universal",
    images: [{ url: "/assets/brand/fashai-og-share.png", width: 1200, height: 630 }],
  },
};

const DUB_MODELS = APPROVED_TALENT_ROSTER.filter(
  (t) => t.category === "MODELS" && (t.location?.includes("Dubai") || t.isFeatured)
).slice(0, 4);

const FAQS = [
  {
    q: "How does model casting work with FashAI Universal in Dubai?",
    a: "Models submit an official application with their portfolio, digitals, and measurements. Approved profiles are reviewed by our production team for upcoming fashion shows, brand shoots, and event presentations in Dubai.",
  },
  {
    q: "Are there specific height or measurement requirements?",
    a: "We review models across high fashion catwalk, editorial, commercial, and computational showcase categories. Specific client and production briefs dictate model selections for individual events.",
  },
  {
    q: "Is casting guaranteed upon application?",
    a: "No. Application places your profile into the FashAI Universal Talent Roster for casting consideration. Selection depends on specific show requirements, client briefs, and production concepts.",
  },
  {
    q: "How do brands or event producers hire talent from FashAI Universal?",
    a: "Clients can browse our approved Creative Directory or submit a brief via Hire Talent to request specific roster models for upcoming Dubai productions.",
  },
];

export default function ModelCastingDubaiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Model Casting Dubai",
    "url": "https://www.fashaiuniversal.com/talent/model-casting-dubai",
    "description": "Model casting consideration and application pathway for runway shows, editorial shoots, and brand events in Dubai, UAE.",
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
              <span>DUBAI, UAE · TALENT &amp; CASTING ECOSYSTEM</span>
            </div>

            <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light uppercase tracking-tight leading-[0.95]">
              MODEL CASTING IN <span className="italic text-[#D4AF37]">DUBAI</span>
            </h1>

            <p className="font-jost text-base sm:text-lg md:text-xl text-[#444444] dark:text-white/85 font-light leading-relaxed max-w-3xl mx-auto">
              FashAI Universal reviews and coordinates runway, editorial, and commercial models for fashion shows, luxury brand activations, and shoot productions across Dubai and the UAE.
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

      {/* 02. WHO THIS IS FOR */}
      <section className="py-12 sm:py-16 border-b border-black/10 dark:border-white/10">
        <div className="w-[min(92vw,1400px)] max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="font-jost text-xs font-bold uppercase tracking-wider text-[#D4AF37] block mb-2">
              CASTING SCOPE
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-light uppercase tracking-tight">
              WHO WE CONSIDER FOR DUBAI PRODUCTIONS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Runway & Catwalk Models",
                desc: "Experienced catwalk models for haute couture showcases, designer presentations, and high-energy runway events in Dubai.",
              },
              {
                title: "Editorial & Lookbook Models",
                desc: "Models for luxury brand shoots, visual lookbooks, spatial media campaigns, and digital fashion storytelling.",
              },
              {
                title: "Commercial & Brand Ambassadors",
                desc: "Versatile talent for VIP guest receptions, brand launches, tech activations, and international corporate summits.",
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
              APPLICATION PROCESS
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-light uppercase tracking-tight">
              HOW TO SUBMIT FOR CASTING
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Submit Application", desc: "Complete the official talent application form with basic measurements and location details." },
              { step: "02", title: "Portfolio Review", desc: "Our creative direction team evaluates your comp card, digitals, and runway video materials." },
              { step: "03", title: "Roster Inclusion", desc: "Approved models are indexed in the FashAI Universal Roster for upcoming client and show briefs." },
              { step: "04", title: "Show & Shoot Casting", desc: "When a matching brief opens in Dubai, shortlisted candidates are contacted for fitting and rehearsal calls." },
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
                APPROVED TALENT
              </span>
              <h2 className="font-serif-display text-2xl sm:text-4xl font-light uppercase">
                FEATURED DUBAI &amp; INTERNATIONAL MODELS
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
                MODEL CASTING QUESTIONS
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
            SUBMIT YOUR APPLICATION FOR <span className="italic text-[#D4AF37]">DUBAI CASTINGS</span>
          </h2>
          <p className="font-jost text-sm sm:text-base text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
            Join the FashAI Universal Talent Network for consideration in upcoming runway presentations, editorial shoots, and brand activations across Dubai and the region.
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
