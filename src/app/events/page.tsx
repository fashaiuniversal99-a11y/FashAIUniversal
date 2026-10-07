import type { Metadata } from "next";
import AllEventsSection from "@/components/sections/AllEventsSection";
import Chapter2026 from "@/components/sections/Chapter2026";
import Chapter2025 from "@/components/sections/Chapter2025";

export const metadata: Metadata = {
  title: "Fashion Events, Catwalk Presentations & Galas | FashAI Universal",
  description:
    "Explore fashion shows, luxury brand activations, LifeStyle 2026, and corporate event presentations managed by FashAI Universal across Dubai and India.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/events",
  },
  openGraph: {
    title: "Fashion Events, Catwalk Presentations & Galas | FashAI Universal",
    description:
      "Explore fashion shows, luxury brand activations, LifeStyle 2026, and corporate event presentations managed by FashAI Universal across Dubai and India.",
    url: "https://www.fashaiuniversal.com/events",
    siteName: "FashAI Universal",
    images: [{ url: "/assets/brand/fashai-og-share.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fashion Events, Catwalk Presentations & Galas | FashAI Universal",
    description:
      "Explore fashion shows, luxury brand activations, LifeStyle 2026, and corporate event presentations managed by FashAI Universal across Dubai and India.",
    images: ["/assets/brand/fashai-og-share.png"],
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

