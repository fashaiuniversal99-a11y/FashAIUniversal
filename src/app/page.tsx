import Hero from "@/components/sections/Hero";
import HomepageProofSection from "@/components/sections/HomepageProofSection";
import Chapter2026 from "@/components/sections/Chapter2026";
import WhatWeDoSection from "@/components/sections/WhatWeDoSection";
import HomepageTalentSection from "@/components/talent/HomepageTalentSection";
import Chapter2025 from "@/components/sections/Chapter2025";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import FashionMagazineSection from "@/components/sections/FashionMagazineSection";
import FaqSection from "@/components/sections/FaqSection";
import AboutUsSection from "@/components/sections/AboutUsSection";
import LeadershipSection from "@/components/sections/LeadershipSection";
import FinalConversionSection from "@/components/sections/FinalConversionSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-brand-white selection:bg-[#D4AF37] selection:text-black">
      {/* 01. HERO */}
      <Hero />

      {/* 02. PROOF STRIP */}
      <HomepageProofSection />

      {/* 03. LIFESTYLE 2026 */}
      <Chapter2026 />

      {/* 04. EVENT SERVICES */}
      <WhatWeDoSection />

      {/* 05. TALENT NETWORK */}
      <HomepageTalentSection />

      {/* 06. PROJECTS */}
      <Chapter2025 />

      {/* 07. HOW IT WORKS */}
      <HowItWorksSection />

      {/* 08. MAGAZINE + FAQ */}
      <FashionMagazineSection />
      <FaqSection />

      {/* 09. ABOUT + TEAM */}
      <AboutUsSection />
      <LeadershipSection />

      {/* 10. FINAL CONVERSION + FOOTER */}
      <FinalConversionSection />
    </main>
  );
}
