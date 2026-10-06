"use client";

import Link from "next/link";
import { ArrowRight, Layers, Sparkles, Building2 } from "lucide-react";
import { BRAND_FAMILY_DATA } from "@/data/brand-family";

export default function BrandFamilySection() {
  const { masterBrand, parentEntity, initiatives } = BRAND_FAMILY_DATA;

  return (
    <section id="brand-family" className="py-12 sm:py-16 bg-[#FAF8F5] dark:bg-[#080706] border-b border-black/10 dark:border-white/10 select-none">
      <div className="w-[min(92vw,1400px)] max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="max-w-3xl mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#D4AF37] font-jost text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>BRAND ARCHITECTURE</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-light tracking-tight text-[#111111] dark:text-white">
            The FashAI Universal <span className="italic text-[#D4AF37]">Brand Ecosystem</span>
          </h2>
          <p className="font-jost text-sm sm:text-base text-[#444444] dark:text-white/80 font-light leading-relaxed">
            {masterBrand.description}
          </p>
        </div>

        {/* BRAND FAMILY GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* MASTER BRAND & PARENT LOCKUP CARD */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-black text-white border-2 border-[#D4AF37] space-y-6 flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <span className="text-[10px] font-jost font-bold uppercase tracking-[0.25em] text-[#D4AF37] px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 inline-block">
                MASTER BRAND
              </span>
              <h3 className="font-serif-display text-3xl sm:text-4xl font-light tracking-tight text-white">
                {masterBrand.name}
              </h3>
              <p className="font-jost text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                Central management body coordinating luxury fashion presentations, corporate activations, editorial shoot productions, and global talent onboarding across Dubai and India.
              </p>
            </div>

            {/* PARENT LOCKUP */}
            <div className="pt-4 border-t border-[#D4AF37]/30 flex items-center justify-between">
              <div>
                <span className="font-jost text-[10px] uppercase font-bold text-white/60 tracking-wider block">
                  PARENT &amp; TECHNOLOGY FOUNDATION
                </span>
                <span className="font-serif-display text-lg text-[#D4AF37] font-light block">
                  {parentEntity.lockupText}
                </span>
              </div>
              <Building2 className="w-6 h-6 text-[#D4AF37]/60 shrink-0" />
            </div>
          </div>

          {/* ECOSYSTEM INITIATIVES GRID */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {initiatives.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-white dark:bg-[#0B0A09] border border-black/10 dark:border-white/10 space-y-3 flex flex-col justify-between hover:border-[#D4AF37] transition-all group"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-jost font-bold uppercase tracking-wider text-[#D4AF37] px-2.5 py-0.5 rounded-full bg-[#D4AF37]/10 inline-block">
                    {item.type}
                  </span>
                  <h4 className="font-serif-display text-xl font-light text-[#111111] dark:text-white group-hover:text-[#D4AF37] transition-colors">
                    {item.name}
                  </h4>
                  <p className="font-jost text-xs text-[#555555] dark:text-white/75 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {item.href && (
                  <div className="pt-3 border-t border-black/10 dark:border-white/10">
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1 text-[11px] font-jost font-bold text-[#D4AF37] hover:underline"
                    >
                      <span>Explore {item.name}</span>
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
