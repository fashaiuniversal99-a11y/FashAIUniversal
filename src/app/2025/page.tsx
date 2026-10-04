import type { Metadata } from "next";
import HomeFeaturedProjects from "@/components/sections/HomeFeaturedProjects";

export const metadata: Metadata = {
  title: "2025 Retrospective Chapter — FashAI Universal",
  description:
    "Review the 2025 inaugural milestone productions, runway moments, and creative showcases of FashAI Universal.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/2025",
  },
  openGraph: {
    title: "2025 Retrospective Chapter — FashAI Universal",
    description:
      "Review the 2025 inaugural milestone productions, runway moments, and creative showcases of FashAI Universal.",
    url: "https://www.fashaiuniversal.com/2025",
  },
};

export default function Page2025() {
  return (
    <div className="bg-brand-void text-brand-white pt-24 min-h-screen">
      <HomeFeaturedProjects />
    </div>
  );
}
