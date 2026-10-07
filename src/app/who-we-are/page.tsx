import type { Metadata } from "next";
import WhoWeAreSection from "@/components/sections/WhoWeAreSection";
import AboutUsSection from "@/components/sections/AboutUsSection";

export const metadata: Metadata = {
  title: "Who We Are — FashAI Universal",
  description:
    "Discover the vision, ecosystem, and cross-border reach of FashAI Universal across Dubai, UAE, and India.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/about",
  },
};

export default function WhoWeArePage() {
  return (
    <div className="bg-brand-void text-brand-white pt-20 min-h-screen">
      <WhoWeAreSection />
      <AboutUsSection />
    </div>
  );
}
