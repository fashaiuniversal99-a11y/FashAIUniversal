"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ArrowLeft, Check } from "lucide-react";
import RoleApplicationForm, { RoleSlug } from "@/components/forms/RoleApplicationForm";

export interface ApplicationCategory {
  id: RoleSlug;
  slug: string;
  label: string;
  badge: string;
  description: string;
  isNomination?: boolean;
}

export const CATEGORIES: ApplicationCategory[] = [
  {
    id: "designer",
    slug: "designer",
    label: "FASHION DESIGNER",
    badge: "COUTURE & ATELIER",
    description: "Present haute couture collections, fashion lines, or apparel designs.",
  },
  {
    id: "model",
    slug: "model",
    label: "MODEL",
    badge: "RUNWAY & EDITORIAL",
    description: "Runway, editorial, and commercial modeling participation.",
  },
  {
    id: "makeup-artist",
    slug: "makeup-artist",
    label: "MAKEUP ARTIST",
    badge: "BEAUTY & BACKSTAGE",
    description: "Beauty direction, backstage artistry, and look styling.",
  },
  {
    id: "fashion-stylist",
    slug: "stylist",
    label: "FASHION STYLIST",
    badge: "WARDROBE & STYLING",
    description: "Wardrobe coordination, campaign lookbook, and editorial styling.",
  },
  {
    id: "choreographer",
    slug: "choreographer",
    label: "CHOREOGRAPHER",
    badge: "STAGE & CATWALK",
    description: "Catwalk choreography, runway movement, and stage direction.",
  },
  {
    id: "influencer",
    slug: "influencer",
    label: "INFLUENCER / CREATOR",
    badge: "DIGITAL MEDIA",
    description: "Digital media storytelling and event content amplification.",
  },
  {
    id: "celebrity",
    slug: "celebrity",
    label: "CELEBRITY / PUBLIC FIGURE",
    badge: "CONFIDENTIAL VIP",
    description: "Special appearances, VIP participation, and campaign roles.",
  },
  {
    id: "cstp",
    slug: "cstp",
    label: "CSTP APPLICATION",
    badge: "COMPUTATIONAL FASHION",
    description: "Computational Style & Talent Program specialization.",
  },
  {
    id: "fashion-commentary",
    slug: "fashion-commentary",
    label: "FASHION COMMENTARY",
    badge: "MEDIA & JOURNALISM",
    description: "Fashion journalism, runway critique, and media coverage.",
  },
  {
    id: "nomination",
    slug: "nomination",
    label: "CREATIVE NOMINATION",
    badge: "NOMINATE TALENT",
    description: "Nominate a designer, model, artist, or stylist for recognition.",
    isNomination: true,
  },
];

interface ApplicationSelectionPageProps {
  initialRole?: RoleSlug | null;
  basePath?: string;
}

export default function ApplicationSelectionPage({
  initialRole = null,
  basePath = "/apply",
}: ApplicationSelectionPageProps) {
  const [selectedRole, setSelectedRole] = useState<RoleSlug | null>(initialRole);

  const activeCategory = CATEGORIES.find(
    (c) => c.id === selectedRole || c.slug === selectedRole
  );

  return (
    <section className="relative pt-6 sm:pt-10 pb-12 sm:pb-16 bg-[#050505] min-h-[85vh] text-brand-white">
      <div className="container-editorial relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Section Header */}
        <div className="max-w-4xl mb-6 sm:mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-brand-yellow-golden/40 bg-brand-yellow-golden/10 text-brand-yellow-golden text-xs font-jost font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FASHAI UNIVERSAL CREATIVE NETWORK</span>
          </div>

          <h1 className="font-serif-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-brand-white uppercase leading-tight tracking-tight">
            APPLY AS <span className="font-serif italic text-brand-yellow-golden">TALENT</span>
          </h1>

          <div className="h-[2px] w-20 bg-brand-yellow-golden shadow-[0_0_10px_rgba(250,182,10,0.6)]" />

          <p className="font-jost text-xs sm:text-sm font-bold text-[#D4AF37] uppercase tracking-wider">
            A platform for fashion talent to apply, be discovered, and connect with opportunities.
          </p>

          <p className="font-sans text-base sm:text-lg md:text-xl text-brand-platinum/95 font-light leading-relaxed max-w-3xl pt-1">
            Official application portal for fashion designers, runway models, makeup artists, stylists, choreographers, and creative talent seeking participation in international fashion shows, campaigns, and luxury experiences across Dubai, India, and global hubs.
          </p>

          {/* 4-STEP TALENT JOURNEY */}
          <div className="pt-3 border-t border-white/10">
            <span className="font-jost text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider block mb-2">
              TALENT JOURNEY:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs font-jost text-brand-platinum/90">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/10">
                <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-black flex items-center justify-center font-bold text-xs shrink-0">1</span>
                <span><strong>Apply:</strong> Submit application &amp; portfolio</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/10">
                <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-black flex items-center justify-center font-bold text-xs shrink-0">2</span>
                <span><strong>Selection:</strong> Editorial review &amp; curation</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/10">
                <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-black flex items-center justify-center font-bold text-xs shrink-0">3</span>
                <span><strong>Approved Roster:</strong> Listed in talent directory</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/10">
                <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-black flex items-center justify-center font-bold text-xs shrink-0">4</span>
                <span><strong>Client Request:</strong> Discovery &amp; event booking</span>
              </div>
            </div>
          </div>
        </div>

        {/* If NO role is selected: Show Category Selection Grid */}
        {!selectedRole ? (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
              <h2 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-light uppercase text-brand-yellow-golden tracking-wider">
                CHOOSE AN OPPORTUNITY
              </h2>
              <span className="text-xs sm:text-sm font-jost text-brand-platinum/70 font-bold uppercase">
                {CATEGORIES.length} CATEGORIES AVAILABLE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => setSelectedRole(cat.id)}
                  className="group relative flex flex-col justify-between p-5 sm:p-7 bg-[#080706] border border-white/10 rounded-2xl hover:border-brand-yellow-golden/70 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(250,182,10,0.15)]"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-jost font-bold uppercase tracking-wider text-brand-yellow-golden">
                        {cat.badge}
                      </span>
                      {cat.isNomination && (
                        <span className="w-2.5 h-2.5 rounded-full bg-brand-yellow-golden animate-pulse" />
                      )}
                    </div>

                    <h3 className="font-serif-display text-xl sm:text-2xl md:text-3xl font-light text-brand-white uppercase group-hover:text-brand-yellow-golden transition-colors leading-snug">
                      {cat.label}
                    </h3>

                    <p className="font-sans text-sm sm:text-base text-brand-platinum/80 font-light leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-sm sm:text-base font-jost font-bold uppercase tracking-wider text-brand-yellow-golden group-hover:text-white transition-colors">
                    <span>APPLY NOW</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-brand-yellow-golden group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* If a role IS selected: Show ONLY that single category's form */
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
              <button
                onClick={() => setSelectedRole(null)}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-jost tracking-wider font-bold text-brand-yellow-golden hover:text-white transition-colors uppercase"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" /> ALL CATEGORIES
              </button>
              {activeCategory && (
                <span className="text-xs sm:text-sm font-jost text-brand-yellow-golden font-bold uppercase">
                  {activeCategory.label}
                </span>
              )}
            </div>

            {/* Render ONLY the single active role application form */}
            <div className="bg-[#080706] border border-brand-yellow-golden/30 rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl">
              <RoleApplicationForm key={selectedRole} roleSlug={selectedRole} isModal={false} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
