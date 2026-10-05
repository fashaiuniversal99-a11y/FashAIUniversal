import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, UserPlus, Briefcase, HelpCircle, CheckCircle2, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { APPROVED_TALENT_ROSTER } from "@/data/talent";

export const metadata: Metadata = {
  title: "Become a Model in India | FashAI Universal Talent Network",
  description:
    "Apply to become a model in India with FashAI Universal. Submit your portfolio for runway presentations, couture fashion weeks, and brand showcases across Gurgaon and Delhi NCR.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/talent/become-a-model-india",
  },
  openGraph: {
    title: "Become a Model in India | FashAI Universal Talent Network",
    description:
      "Official model application pathway for couture runways, designer showcases, and editorial shoot productions in India.",
    url: "https://www.fashaiuniversal.com/talent/become-a-model-india",
    siteName: "FashAI Universal",
    images: [{ url: "/assets/brand/fashai-og-share.png", width: 1200, height: 630 }],
  },
};

const IND_MODELS = APPROVED_TALENT_ROSTER.filter(
  (t) => t.category === "MODELS"
).slice(2, 6);

const FAQS = [
  {
    q: "How can models in India apply to FashAI Universal?",
    a: "Models across Gurgaon, Delhi NCR, Mumbai, and nationwide submit their digitals and measurements through our online application portal for review by our creative production team.",
  },
  {
    q: "What types of modeling opportunities are available in India?",
    a: "FashAI Universal coordinates models for haute couture catwalk presentations, luxury brand activations, designer lookbooks, and computational fashion showcases.",
  },
  {
    q: "Do I need prior runway experience to apply in India?",
    a: "We evaluate both emerging talent and established runway models. A clear comp card, accurate measurements, and strong presentation discipline are key criteria.",
  },
  {
    q: "How does FashAI Universal match models with events?",
    a: "Once accepted into our Creative Directory, model profiles are matched against upcoming event briefs, designer showcases, and production projects.",
  },
];

export default function BecomeAModelIndiaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Become a Model in India",
    "url": "https://www.fashaiuniversal.com/talent/become-a-model-india",
    "description": "Application guide and entry pathway for models applying to the FashAI Universal talent network in Gurgaon and India.",
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
              <span>INDIA · GURGAON HQ · TALENT NETWORK</span>
            </div>

            <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light uppercase tracking-tight leading-[0.95]">
              BECOME A MODEL IN <span className="italic text-[#D4AF37]">INDIA</span>
            </h1>

            <p className="font-jost text-base sm:text-lg md:text-xl text-[#444444] dark:text-white/85 font-light leading-relaxed max-w-3xl mx-auto">
              FashAI Universal connects models in Gurgaon, Delhi NCR, and across India with couture runway presentations, fashion showcases, and luxury editorial productions.
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

      {/* 02. INDIA FASHION ECOSYSTEM */}
      <section className="py-12 sm:py-16 border-b border-black/10 dark:border-white/10">
        <div className="w-[min(92vw,1400px)] max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="font-jost text-xs font-bold uppercase tracking-wider text-[#D4AF37] block mb-2">
              NATIONAL SCOPE
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-light uppercase tracking-tight">
              COUTURE &amp; RUNWAY CATEGORIES IN INDIA
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Haute Couture & Bridal Catwalk",
                desc: "Models trained for intricate bridal couture showcases, heavy garment walking, and traditional atelier presentations.",
              },
              {
                title: "Contemporary & Western Pret",
                desc: "Runway talent for modern resort wear, ready-to-wear collections, and designer showcase events in Gurgaon & Delhi NCR.",
              },
              {
                title: "Editorial & Campaign Shoot",
                desc: "Commercial and high fashion models for lookbook photography, campaign films, and computational style projects.",
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
              INDIA MODEL EVALUATION PATHWAY
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Online Submission", desc: "Fill out the official application form with clear digitals, height, bust/waist/hip measurements, and city location." },
              { step: "02", title: "Roster Review", desc: "Our team evaluates submitted materials for upcoming Indian fashion week presentations and brand briefs." },
              { step: "03", title: "Creative Directory Indexing", desc: "Approved applicants are placed in our public/client-facing directory for designer consideration." },
              { step: "04", title: "Show Casting & Fitting", desc: "Shortlisted models receive direct call notifications for rehearsals, fittings, and show scheduling." },
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
                ROSTER SELECTION
              </span>
              <h2 className="font-serif-display text-2xl sm:text-4xl font-light uppercase">
                FEATURED MODEL ROSTER IN INDIA &amp; INTERNATIONAL
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
            {IND_MODELS.map((model) => (
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
                INDIA MODELING QUESTIONS
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
            APPLY TO JOIN THE MODEL ROSTER IN <span className="italic text-[#D4AF37]">INDIA</span>
          </h2>
          <p className="font-jost text-sm sm:text-base text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
            Submit your digitals to FashAI Universal for upcoming runway presentations, bridal showcases, and luxury brand campaigns in Gurgaon and nationwide.
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
