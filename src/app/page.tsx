import Hero from "@/components/sections/Hero";
import WhoWeAreSection from "@/components/sections/WhoWeAreSection";
import WhatWeDoSection from "@/components/sections/WhatWeDoSection";
import CreateEventSection from "@/components/sections/CreateEventSection";
import WhoWeServeSection from "@/components/sections/WhoWeServeSection";
import OpenNominationsSection from "@/components/sections/OpenNominationsSection";
import FashionCommunitySection from "@/components/sections/FashionCommunitySection";
import OurEventsSection from "@/components/sections/OurEventsSection";
import FashionMagazineSection from "@/components/sections/FashionMagazineSection";
import Chapter2025 from "@/components/sections/Chapter2025";
import FashPrismStoriesSection from "@/components/sections/FashPrismStoriesSection";
import AboutUsSection from "@/components/sections/AboutUsSection";
import FaqSection from "@/components/sections/FaqSection";
import ContactSection from "@/components/sections/ContactSection";
import InstagramSection from "@/components/sections/InstagramSection";

import HomepageTalentSection from "@/components/talent/HomepageTalentSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-brand-white selection:bg-brand-orange selection:text-white">
      {/* 01. LANDING VIDEO */}
      <Hero />

      {/* 02. EVENT MANAGEMENT POSITIONING & INTRODUCTION */}
      <WhoWeAreSection />

      {/* 03. OUR EVENTS & FLAGSHIP EXPERIENCES */}
      <OurEventsSection />

      {/* 04. WHAT WE DO / SERVICES */}
      <WhatWeDoSection />

      {/* 05. FASHION MAGAZINE */}
      <FashionMagazineSection />

      {/* 06. INDUSTRIES WE SUPPORT */}
      <WhoWeServeSection />

      {/* 07. OUR PROJECTS */}
      <Chapter2025 />

      {/* 08. FASHPRISM / PROJECT CONTENT */}
      <FashPrismStoriesSection />

      {/* 09. OPPORTUNITIES & TALENT NETWORK */}
      <OpenNominationsSection />
      <HomepageTalentSection />
      <AboutUsSection />

      {/* 10. FAQ */}
      <FaqSection />

      {/* 11. CREATE YOUR OWN EVENT */}
      <CreateEventSection />

      {/* 12. CONTACT & ENQUIRIES */}
      <ContactSection />

      {/* 13. FOLLOW OUR JOURNEY */}
      <InstagramSection />
    </main>
  );
}

