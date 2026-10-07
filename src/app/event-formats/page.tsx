import type { Metadata } from "next";
import OurEventsSection from "@/components/sections/OurEventsSection";
import WhatWeDoSection from "@/components/sections/WhatWeDoSection";

export const metadata: Metadata = {
  title: "Event Formats — FashAI Universal",
  description:
    "Discover the specialized event formats of FashAI Universal: Fashion, Lifestyle, Product, Corporate, and IT events.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/events",
  },
};

export default function EventFormatsPage() {
  return (
    <div className="bg-brand-void text-brand-white pt-20 min-h-screen">
      <OurEventsSection />
      <WhatWeDoSection />
    </div>
  );
}
