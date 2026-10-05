import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, UserPlus, Briefcase, HelpCircle, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { APPROVED_TALENT_ROSTER } from "@/data/talent";

export const metadata: Metadata = {
  title: "Creator Collaborations | FashAI Universal Talent Network",
  description:
    "Apply for fashion content creator and digital influencer collaborations with FashAI Universal. Amplify fashion events, brand launches, and spatial media projects.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/talent/creator-collaborations",
  },
  openGraph: {
    title: "Creator Collaborations | FashAI Universal Talent Network",
    description:
      "Digital media amplification and creator content collaboration opportunities for fashion shows and luxury brand events.",
    url: "https://www.fashaiuniversal.com/talent/creator-collaborations",
    siteName: "FashAI Universal",
    images: [{ url: "/assets/brand/fashai-og-share.png", width: 1200, height: 630 }],
  },
};

const CREATORS = APPROVED_TALENT_ROSTER.filter(
  (t) => t.category === "CREATORS"
);

const FAQS = [
  {
    q: "How can fashion and lifestyle creators apply to collaborate with FashAI Universal?",
    a: "Creators submit their primary social media handles, content portfolio, engagement metrics overview, and audience demographics through our online application under the Influencer/Creator category.",
  },
  {
    q: "What content collaboration formats exist?",
    a: "Collaborations cover front-row event coverage, backstage interviews, digital campaign amplification, luxury brand unboxings, and computational style features.",
  },
  {
    q: "Are micro-creators considered for event coverage?",
    a: "Yes. We evaluate creator applications based on aesthetic alignment, audience engagement quality, and content presentation standard rather than follower count alone.",
  },
  {
    q: "How are creators matched with brand events?",
    a: "Accepted creators in our Creative Directory are matched against upcoming brand briefs, event accreditation calls, and campaign sponsorship mandates.",
  },
];

export default function CreatorCollaborationsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Creator Collaborations",
    "url": "https://www.fashaiuniversal.com/talent/creator-collaborations",
    "description": "Application pathway for digital fashion creators and influencers joining the FashAI Universal network.",
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
              <span>DIGITAL MEDIA &amp; CONTENT CREATOR NETWORK</span>
            </div>

            <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light uppercase tracking-tight leading-[0.95]">
              CREATOR <span className="italic text-[#D4AF37]">COLLABORATIONS</span>
            </h1>

            <p className="font-jost text-base sm:text-lg md:text-xl text-[#444444] dark:text-white/85 font-light leading-relaxed max-w-3xl mx-auto">
              FashAI Universal connects digital media creators, fashion storytellers, and lifestyle influencers with exclusive runway events, brand unveilings, and spatial media campaigns in Dubai and India.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/apply?role=influencer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#D4AF37] hover:bg-[#FFEC69] text-black font-jost font-bold text-xs sm:text-sm tracking-wider uppercase py-4 px-8 rounded-full shadow-md transition-all duration-300 min-h-[48px]"
              >
                <UserPlus className="w-4 h-4" />
                <span>APPLY AS CREATOR →</span>
              </Link>
              <Link
                href="/talent?category=CREATORS"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 font-jost font-bold text-xs sm:text-sm tracking-wider uppercase py-4 px-8 rounded-full transition-all duration-300 min-h-[48px]"
              >
                <span>BROWSE TALENT DIRECTORY</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 02. CREATOR SCOPE */}
      <section className="py-12 sm:py-16 border-b border-black/10 dark:border-white/10">
        <div className="w-[min(92vw,1400px)] max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="font-jost text-xs font-bold uppercase tracking-wider text-[#D4AF37] block mb-2">
              COLLABORATION FORMATS
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-light uppercase tracking-tight">
              HOW CREATORS ENGAGE WITH OUR EVENTS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Event & Runway Amplification",
                desc: "Front-row coverage, reel production, catwalk highlights, and VIP delegate interviews during live fashion presentations.",
              },
              {
                title: "Brand Campaign Storytelling",
                desc: "Co-creating visual narratives, lookbook reactions, and product unveilings for luxury brand sponsors.",
              },
              {
                title: "AI & Digital Fashion Media",
                desc: "Exploring computational style, virtual model showcases, and generative fashion commentary across social channels.",
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
              CREATOR ONBOARDING PATHWAY
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Submit Handles", desc: "Fill out the online application with social profiles, content niche, and primary location." },
              { step: "02", title: "Media Audit", desc: "Our team evaluates content quality, visual aesthetics, engagement integrity, and brand safety." },
              { step: "03", title: "Roster Indexing", desc: "Approved creators are indexed in our directory for brand accreditation and event invitations." },
              { step: "04", title: "Event Accreditation", desc: "Receive pass accreditation, press briefs, and backstage access for assigned fashion shows." },
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

      {/* 04. FEATURED CREATORS */}
      {CREATORS.length > 0 && (
        <section className="py-12 sm:py-16 border-b border-black/10 dark:border-white/10">
          <div className="w-[min(92vw,1400px)] max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="font-jost text-xs font-bold uppercase tracking-wider text-[#D4AF37] block mb-1">
                  ROSTER HIGHLIGHTS
                </span>
                <h2 className="font-serif-display text-2xl sm:text-4xl font-light uppercase">
                  FEATURED DIGITAL CREATORS &amp; INFLUENCERS
                </h2>
              </div>
              <Link
                href="/talent?category=CREATORS"
                className="font-jost text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:underline flex items-center gap-1"
              >
                <span>VIEW CREATORS DIRECTORY ↗</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {CREATORS.map((cre) => (
                <div key={cre.id} className="rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden bg-[#FAF8F5] dark:bg-[#090807] group">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={cre.image}
                      alt={`${cre.name} - ${cre.specialty}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 space-y-1">
                    <h3 className="font-serif-display text-xl font-light uppercase text-[#111111] dark:text-white">{cre.name}</h3>
                    <p className="font-jost text-xs text-[#666666] dark:text-white/70">{cre.specialty}</p>
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
                CREATOR NETWORK QUESTIONS
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
            APPLY TO JOIN THE FASHAI <span className="italic text-[#D4AF37]">CREATOR NETWORK</span>
          </h2>
          <p className="font-jost text-sm sm:text-base text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
            Submit your profile for accreditation and collaboration opportunities across upcoming runway presentations and brand activations.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/apply?role=influencer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#D4AF37] hover:bg-[#FFEC69] text-black font-jost font-bold text-xs sm:text-sm tracking-wider uppercase py-4 px-8 rounded-full transition-all duration-300 min-h-[48px]"
            >
              <span>APPLY AS CREATOR →</span>
            </Link>
            <Link
              href="/hire-talent"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 font-jost font-bold text-xs sm:text-sm tracking-wider uppercase py-4 px-8 rounded-full transition-all duration-300 min-h-[48px]"
            >
              <span>HIRE CREATORS</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
