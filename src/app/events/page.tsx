import type { Metadata } from "next";
import AllEventsSection from "@/components/sections/AllEventsSection";
import Chapter2026 from "@/components/sections/Chapter2026";
import Chapter2025 from "@/components/sections/Chapter2025";

export const metadata: Metadata = {
  title: "All Events & Flagship Formats — FashAI Universal",
  description:
    "Explore all event experiences produced by FashAI Universal including LifeStyle 2026 Dubai, Haute Catwalk Presentations, Product Launches, Brand Shoots, Corporate Galas, and IT Summits.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/events",
  },
};

export default function EventsPage() {
  return (
    <div className="bg-brand-void text-brand-white pt-4 sm:pt-6 min-h-screen">
      <AllEventsSection />
      <Chapter2026 />
      <Chapter2025 />
    </div>
  );
}

