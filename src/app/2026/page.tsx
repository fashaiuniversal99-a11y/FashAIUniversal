import type { Metadata } from "next";
import HomeUpcomingFeature from "@/components/sections/HomeUpcomingFeature";
import LifeStyleHighlightVideo from "@/components/media/LifeStyleHighlightVideo";
import InstagramSection from "@/components/sections/InstagramSection";

export const metadata: Metadata = {
  title: "2026 Dubai Chapter — FashAI Universal",
  description:
    "Explore the upcoming 2026 Dubai edition of FashAI Universal. High fashion production and global talent integration.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/2026",
  },
  openGraph: {
    title: "2026 Dubai Chapter — FashAI Universal",
    description:
      "Explore the upcoming 2026 Dubai edition of FashAI Universal. High fashion production and global talent integration.",
    url: "https://www.fashaiuniversal.com/2026",
  },
};

export default function Page2026() {
  return (
    <div className="bg-brand-void text-brand-white pt-24 min-h-screen">
      <HomeUpcomingFeature />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <LifeStyleHighlightVideo />
      </div>
      <InstagramSection />
    </div>
  );
}

