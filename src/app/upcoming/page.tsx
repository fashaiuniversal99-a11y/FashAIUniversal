import type { Metadata } from "next";
import HomeUpcomingFeature from "@/components/sections/HomeUpcomingFeature";
import InstagramSection from "@/components/sections/InstagramSection";

export const metadata: Metadata = {
  title: "Upcoming Shows & Dubai 2026 Chapter — FashAI Universal",
  description:
    "Explore upcoming fashion shows, flagship chapters, and open delegate registrations for LifeStyle 2026 in Dubai, UAE.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/upcoming",
  },
};

export default function UpcomingPage() {
  return (
    <div className="bg-brand-void text-brand-white pt-14 sm:pt-20 md:pt-24 min-h-screen">
      <HomeUpcomingFeature />
      <InstagramSection />
    </div>
  );
}
