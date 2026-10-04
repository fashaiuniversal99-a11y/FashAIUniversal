import type { Metadata } from "next";
import ProjectsPageContent from "@/components/sections/ProjectsPageContent";

export const metadata: Metadata = {
  title: "Delivered Projects & Portfolio — FashAI Universal",
  description:
    "Explore delivered fashion showcases, FashPrism India & International editions, VIP guest salons, catwalk choreography direction, and video editing production by FashAI Universal.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/projects",
  },
};

export default function ProjectsPage() {
  return (
    <div className="bg-brand-void text-brand-white pt-14 sm:pt-20 min-h-screen">
      <ProjectsPageContent />
    </div>
  );
}
