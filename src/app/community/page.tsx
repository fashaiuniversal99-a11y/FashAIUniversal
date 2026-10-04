import type { Metadata } from "next";
import FashionCommunitySection from "@/components/sections/FashionCommunitySection";
import OpenNominationsSection from "@/components/sections/OpenNominationsSection";

export const metadata: Metadata = {
  title: "Global Talent Network & Fashion Community — FashAI Universal",
  description:
    "Discover FashAI Universal's international creative network connecting Fashion Designers, Models, Makeup Artists, Stylists, Choreographers, Content Creators, and Public Figures.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/community",
  },
};

export default function CommunityPage() {
  return (
    <div className="bg-brand-void text-brand-white pt-20 min-h-screen">
      <FashionCommunitySection />
      <OpenNominationsSection />
    </div>
  );
}
