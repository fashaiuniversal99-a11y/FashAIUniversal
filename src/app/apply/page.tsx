import { Metadata } from "next";
import ApplicationSelectionPage from "@/components/sections/ApplicationSelectionPage";

export const metadata: Metadata = {
  title: "Open Nominations & Applications — FashAI Universal Talent Network",
  description:
    "Official application interface for Model, Designer, Makeup Artist, Fashion Stylist, Choreographer, Influencer, CSTP, and Fashion Commentary opportunities.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/apply",
  },
  openGraph: {
    title: "Open Nominations & Applications — FashAI Universal Talent Network",
    description:
      "Official application interface for Model, Designer, Makeup Artist, Fashion Stylist, Choreographer, Influencer, CSTP, and Fashion Commentary opportunities.",
    url: "https://www.fashaiuniversal.com/apply",
  },
};

export default function ApplyIndexPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-brand-white pt-14 sm:pt-20 md:pt-24">
      <ApplicationSelectionPage basePath="/apply" />
    </div>
  );
}

