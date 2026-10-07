import { Metadata } from "next";
import ApplicationSelectionPage from "@/components/sections/ApplicationSelectionPage";

export const metadata: Metadata = {
  title: "OPEN NOMINATIONS & APPLICATIONS | FashAI Universal Talent Network",
  description:
    "Official application interface for Model, Designer, Makeup Artist, Fashion Stylist, Choreographer, Creator, and Fashion Commentary opportunities.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/apply",
  },
};

export default function ApplicationsPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-brand-white pt-20">
      <ApplicationSelectionPage basePath="/applications" />
    </div>
  );
}

