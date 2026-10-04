import type { Metadata } from "next";
import FashPrismInternationalSection from "@/components/sections/FashPrismInternationalSection";
import InstagramSection from "@/components/sections/InstagramSection";

export const metadata: Metadata = {
  title: "FashPrism International Showcase — FashAI Universal",
  description:
    "Explore the FashPrism International presentation series featuring cinematic catwalk staging, Miss International showcase editions, and architectural monolith illumination.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/fashprism-international",
  },
};

export default function FashPrismInternationalPage() {
  return (
    <div className="bg-brand-void text-brand-white pt-20 min-h-screen">
      <FashPrismInternationalSection />
      <InstagramSection />
    </div>
  );
}
