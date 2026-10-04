import type { Metadata } from "next";
import FashPrismIndiaSection from "@/components/sections/FashPrismIndiaSection";
import InstagramSection from "@/components/sections/InstagramSection";

export const metadata: Metadata = {
  title: "FashPrism India Showcase — FashAI Universal",
  description:
    "Explore the FashPrism India visual archive featuring haute couture textile draping, Miss India pageant presentation chapters, and creative talent showcases.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/fashprism-india",
  },
};

export default function FashPrismIndiaPage() {
  return (
    <div className="bg-brand-void text-brand-white pt-20 min-h-screen">
      <FashPrismIndiaSection />
      <InstagramSection />
    </div>
  );
}
