import Hero from "@/components/sections/Hero";
import TwoPrimaryDoorsSection from "@/components/sections/TwoPrimaryDoorsSection";
import HireTalentBridgeSection from "@/components/sections/HireTalentBridgeSection";
import Chapter2026 from "@/components/sections/Chapter2026";
import WhatWeDoSection from "@/components/sections/WhatWeDoSection";
import OurEventsSection from "@/components/sections/OurEventsSection";
import Chapter2025 from "@/components/sections/Chapter2025";
import HomepageTalentSection from "@/components/talent/HomepageTalentSection";
import HomepageProofSection from "@/components/sections/HomepageProofSection";
import FinalConversionSection from "@/components/sections/FinalConversionSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-brand-white selection:bg-[#D4AF37] selection:text-black">
      {/* 01. HERO SECTION */}
      <Hero />

      {/* 02. TWO PRIMARY DOORS: PLAN YOUR EVENT / APPLY AS TALENT */}
      <TwoPrimaryDoorsSection />

      {/* 03. HIRE TALENT BRIDGE */}
      <HireTalentBridgeSection />

      {/* 04. LIFESTYLE 2026 */}
      <Chapter2026 />

      {/* 05. WHAT WE DO / SERVICES */}
      <WhatWeDoSection />

      {/* 06. OUR EVENTS / EXPERIENCE PROOF */}
      <OurEventsSection />

      {/* 07. PROJECTS / WORK */}
      <Chapter2025 />

      {/* 08. TALENT / NETWORK */}
      <HomepageTalentSection />

      {/* 09. PROOF / TRUST */}
      <HomepageProofSection />

      {/* 10. FINAL CONVERSION / CONTACT */}
      <FinalConversionSection />
    </main>
  );
}
