import type { Metadata } from "next";
import FashPrismStoriesSection from "@/components/sections/FashPrismStoriesSection";
import InstagramSection from "@/components/sections/InstagramSection";

export const metadata: Metadata = {
  title: "Behind the Experience — FashAI Universal",
  description:
    "An inside look into the runway productions, backstage captures, and couture stories of FashAI Universal.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/projects",
  },
};

export default function BehindTheExperiencePage() {
  return (
    <div className="bg-brand-void text-brand-white pt-20 min-h-screen">
      <FashPrismStoriesSection />
      <InstagramSection />
    </div>
  );
}
