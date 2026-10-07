import type { Metadata } from "next";
import WhatWeDoSection from "@/components/sections/WhatWeDoSection";
import WhoWeServeSection from "@/components/sections/WhoWeServeSection";
import WithWhomWeWorkSection from "@/components/sections/WithWhomWeWorkSection";

export const metadata: Metadata = {
  title: "What We Do — FashAI Universal",
  description:
    "Explore FashAI Universal's event formats, haute couture presentations, talent networks, lifestyle summits, and corporate event management.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/services",
  },
};

export default function WhatWeDoPage() {
  return (
    <div className="bg-brand-void text-brand-white pt-20 min-h-screen">
      <WhatWeDoSection />
      <WhoWeServeSection />
      <WithWhomWeWorkSection />
    </div>
  );
}
