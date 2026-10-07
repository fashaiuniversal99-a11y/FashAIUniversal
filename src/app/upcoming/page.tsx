import type { Metadata } from "next";
import HomeUpcomingFeature from "@/components/sections/HomeUpcomingFeature";
import InstagramSection from "@/components/sections/InstagramSection";

export const metadata: Metadata = {
  title: "Upcoming Shows & LifeStyle 2026 Dubai Chapter | FashAI Universal",
  description:
    "Discover upcoming fashion shows, luxury brand activations, and LifeStyle 2026 Dubai chapter updates. Dates and venue TBA — join the waiting list for official announcements.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/upcoming",
  },
  openGraph: {
    title: "Upcoming Shows & LifeStyle 2026 Dubai Chapter | FashAI Universal",
    description:
      "Discover upcoming fashion shows, luxury brand activations, and LifeStyle 2026 Dubai chapter updates. Dates and venue TBA — join the waiting list for official announcements.",
    url: "https://www.fashaiuniversal.com/upcoming",
    siteName: "FashAI Universal",
    images: [{ url: "/assets/brand/fashai-og-share.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Upcoming Shows & LifeStyle 2026 Dubai Chapter | FashAI Universal",
    description:
      "Discover upcoming fashion shows, luxury brand activations, and LifeStyle 2026 Dubai chapter updates. Dates and venue TBA — join the waiting list for official announcements.",
    images: ["/assets/brand/fashai-og-share.png"],
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
