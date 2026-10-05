import Hero from "@/components/sections/Hero";
import Chapter2026 from "@/components/sections/Chapter2026";
import Chapter2025 from "@/components/sections/Chapter2025";
import WhatWeDoSection from "@/components/sections/WhatWeDoSection";
import HomepageTalentSection from "@/components/talent/HomepageTalentSection";
import HomepageProofSection from "@/components/sections/HomepageProofSection";
import AboutUsSection from "@/components/sections/AboutUsSection";
import FashionMagazineSection from "@/components/sections/FashionMagazineSection";
import WhoWeServeSection from "@/components/sections/WhoWeServeSection";
import FaqSection from "@/components/sections/FaqSection";
import FinalConversionSection from "@/components/sections/FinalConversionSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-brand-white selection:bg-[#D4AF37] selection:text-black">
      {/* 01. HERO (INCLUDES 2 PRIMARY DOORS & HIRE TALENT LINK) */}
      <Hero />

      {/* 02. UPCOMING / LIFESTYLE 2026 */}
      <Chapter2026 />

      {/* 03. OUR PROJECTS 2025 (DELIVERED WORK PROOF) */}
      <Chapter2025 />

      {/* 04. SERVICES (4 CONCISE CATEGORIES) */}
      <WhatWeDoSection />

      {/* 05. TALENT NETWORK (7 CATEGORIES WITH APPLY & HIRE TALENT) */}
      <HomepageTalentSection />

      {/* 06. PROOF & EDITORIAL POSITIONING */}
      <HomepageProofSection />

      {/* 07. ABOUT FASHAI UNIVERSAL */}
      <AboutUsSection />

      {/* 08. FASHION MAGAZINE (3 FEATURED STORIES) */}
      <FashionMagazineSection />

      {/* 09. INDUSTRIES WE SUPPORT */}
      <WhoWeServeSection />

      {/* 10. FAQ (CONCISE COST & TIMING QUESTIONS) */}
      <FaqSection />

      {/* 11. FINAL CONVERSION & INQUIRY */}
      <FinalConversionSection />
    </main>
  );
}


