import type { Metadata } from "next";
import FashionMagazineSection from "@/components/sections/FashionMagazineSection";
import InstagramSection from "@/components/sections/InstagramSection";

export const metadata: Metadata = {
  title: "Fashion Magazine & Editorial Archive — FashAI Universal",
  description:
    "Official editorial fashion publication featuring catwalk dynamics, atelier perspectives, backstage beauty direction, and visual retrospectives across the FashAI Universal ecosystem.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/fashion-magazine",
  },
};

export default function FashionMagazinePage() {
  return (
    <div className="bg-brand-void text-brand-white pt-20 min-h-screen">
      <FashionMagazineSection isFullPage={true} />
      <InstagramSection />
    </div>
  );
}
