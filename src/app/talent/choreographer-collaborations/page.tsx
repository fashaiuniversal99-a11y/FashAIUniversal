import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, UserPlus, Briefcase, HelpCircle, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { APPROVED_TALENT_ROSTER } from "@/data/talent";

export const metadata: Metadata = {
  title: "Choreographer Collaborations | FashAI Universal Talent Network",
  description:
    "Apply as a runway choreographer or movement director with FashAI Universal. Collaborate on catwalk choreography, stage direction, and show movement in Dubai and India.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/talent/choreographer-collaborations",
  },
  openGraph: {
    title: "Choreographer Collaborations | FashAI Universal Talent Network",
    description:
      "Stage direction, runway choreography, and catwalk movement collaboration opportunities for fashion shows and live event productions.",
    url: "https://www.fashaiuniversal.com/talent/choreographer-collaborations",
    siteName: "FashAI Universal",
    images: [{ url: "/assets/brand/fashai-og-share.png", width: 1200, height: 630 }],
  },
};

const CHOREOGRAPHERS = APPROVED_TALENT_ROSTER.filter(
  (t) => t.category === "CHOREOGRAPHERS"
);

const FAQS = [
  {
    q: "How can runway choreographers apply to collaborate with FashAI Universal?",
    a: "Choreographers and stage directors submit their video reel, show choreography history, and professional bio via our official application page under the Choreographer category.",
  },
  {
    q: "What types of fashion events require choreography?",
    a: "Our productions involve catwalk choreography for haute couture fashion shows, brand reveal staging, model walking direction, and synchronized performance sequences.",
  },
  {
    q: "What is expected of runway choreographers?",
    a: "Choreographers direct model walking rhythms, stage entrances/exits, garment presentation timing, and music cue synchronization during show rehearsals and live presentations.",
  },
  {
    q: "Where do FashAI Universal show productions take place?",
    a: "We produce and coordinate runway showcases across premiere venues in Dubai, UAE, and Gurgaon, India.",
  },
];

export default function ChoreographerCollaborationsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Choreographer Collaborations",
    "url": "https://www.fashaiuniversal.com/talent/choreographer-collaborations",
    "description": "Application pathway for runway choreographers and movement directors joining the FashAI Universal production network.",
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
              <span>STAGE DIRECTION &amp; CATWALK MOVEMENT NETWORK</span>
            </div>

            <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light uppercase tracking-tight leading-[0.95]">
              CHOREOGRAPHER <span className="italic text-[#D4AF37]">COLLABORATIONS</span>
            </h1>

            <p className="font-jost text-base sm:text-lg md:text-xl text-[#444444] dark:text-white/85 font-light leading-relaxed max-w-3xl mx-auto">
              FashAI Universal reviews and collaborates with runway choreographers and movement directors to design immersive catwalk sequences, model entrance choreography, and stage direction in Dubai and India.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/apply?role=choreographer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#D4AF37] hover:bg-[#FFEC69] text-black font-jost font-bold text-xs sm:text-sm tracking-wider uppercase py-4 px-8 rounded-full shadow-md transition-all duration-300 min-h-[48px]"
              >
                <UserPlus className="w-4 h-4" />
                <span>APPLY AS CHOREOGRAPHER →</span>
              </Link>
              <Link
                href="/talent?category=CHOREOGRAPHERS"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 font-jost font-bold text-xs sm:text-sm tracking-wider uppercase py-4 px-8 rounded-full transition-all duration-300 min-h-[48px]"
              >
                <span>BROWSE TALENT DIRECTORY</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 02. CHOREOGRAPHY SCOPE */}
      <section className="py-12 sm:py-16 border-b border-black/10 dark:border-white/10">
        <div className="w-[min(92vw,1400px)] max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="font-jost text-xs font-bold uppercase tracking-wider text-[#D4AF37] block mb-2">
              MOVEMENT DIRECTION
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-light uppercase tracking-tight">
              CHOREOGRAPHY DOMAINS WE INTEGRATE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Catwalk Walking & Rhythm Direction",
                desc: "Training runway models in stride timing, turn discipline, poise, and posture tailored to couture garment weight and music pacing.",
              },
              {
                title: "Multi-Model Stage Choreography",
                desc: "Designing entrance and exit patterns, group line-ups, and finale formations for major designer showcases.",
              },
              {
                title: "Brand Reveal & Spatial Movement",
                desc: "Choreographing dynamic movement for luxury product unveilings, spatial tech activations, and live editorial presentations.",
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
              CHOREOGRAPHER COLLABORATION PROCESS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Submit Reel", desc: "Share your show choreography reel, credits, and movement direction background via our application form." },
              { step: "02", title: "Creative Evaluation", desc: "Our production team assesses stage pacing, music interpretation, and runway show compatibility." },
              { step: "03", title: "Directory Indexing", desc: "Approved choreographers are listed in our Creative Directory for upcoming show assignments." },
              { step: "04", title: "Show Rehearsal", desc: "Assigned choreographers lead rehearsal calls, model walking sessions, and live show execution." },
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

      {/* 04. FEATURED CHOREOGRAPHERS */}
      {CHOREOGRAPHERS.length > 0 && (
        <section className="py-12 sm:py-16 border-b border-black/10 dark:border-white/10">
          <div className="w-[min(92vw,1400px)] max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="font-jost text-xs font-bold uppercase tracking-wider text-[#D4AF37] block mb-1">
                  ROSTER HIGHLIGHTS
                </span>
                <h2 className="font-serif-display text-2xl sm:text-4xl font-light uppercase">
                  FEATURED RUNWAY CHOREOGRAPHERS
                </h2>
              </div>
              <Link
                href="/talent?category=CHOREOGRAPHERS"
                className="font-jost text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:underline flex items-center gap-1"
              >
                <span>VIEW CHOREOGRAPHERS DIRECTORY ↗</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {CHOREOGRAPHERS.map((cho) => (
                <div key={cho.id} className="rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden bg-[#FAF8F5] dark:bg-[#090807] group">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={cho.image}
                      alt={`${cho.name} - ${cho.specialty}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 space-y-1">
                    <h3 className="font-serif-display text-xl font-light uppercase text-[#111111] dark:text-white">{cho.name}</h3>
                    <p className="font-jost text-xs text-[#666666] dark:text-white/70">{cho.specialty}</p>
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
                CHOREOGRAPHY NETWORK QUESTIONS
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
            APPLY TO DIRECT RUNWAY <span className="italic text-[#D4AF37]">CATWALK MOVEMENT</span>
          </h2>
          <p className="font-jost text-sm sm:text-base text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
            Join the FashAI Universal network for consideration in upcoming fashion show productions and live stage events across Dubai and India.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/apply?role=choreographer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#D4AF37] hover:bg-[#FFEC69] text-black font-jost font-bold text-xs sm:text-sm tracking-wider uppercase py-4 px-8 rounded-full transition-all duration-300 min-h-[48px]"
            >
              <span>APPLY AS CHOREOGRAPHER →</span>
            </Link>
            <Link
              href="/events"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 font-jost font-bold text-xs sm:text-sm tracking-wider uppercase py-4 px-8 rounded-full transition-all duration-300 min-h-[48px]"
            >
              <span>EXPLORE EVENTS</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
