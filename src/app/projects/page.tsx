import type { Metadata } from "next";
import ProjectsPageContent from "@/components/sections/ProjectsPageContent";

export const metadata: Metadata = {
  title: "Delivered Fashion Shows & Case Studies | FashAI Universal",
  description:
    "Explore delivered fashion show productions, FashPrism showcases, VIP guest salons, catwalk choreography, and video editing production by FashAI Universal.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/projects",
  },
  openGraph: {
    title: "Delivered Fashion Shows & Case Studies | FashAI Universal",
    description:
      "Explore delivered fashion show productions, FashPrism showcases, VIP guest salons, catwalk choreography, and video editing production by FashAI Universal.",
    url: "https://www.fashaiuniversal.com/projects",
    siteName: "FashAI Universal",
    images: [{ url: "/assets/brand/fashai-og-share.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Delivered Fashion Shows & Case Studies | FashAI Universal",
    description:
      "Explore delivered fashion show productions, FashPrism showcases, VIP guest salons, catwalk choreography, and video editing production by FashAI Universal.",
    images: ["/assets/brand/fashai-og-share.png"],
  },
};

export default function ProjectsPage() {
  return (
    <div className="bg-brand-void text-brand-white pt-14 sm:pt-20 min-h-screen">
      <ProjectsPageContent />
    </div>
  );
}
