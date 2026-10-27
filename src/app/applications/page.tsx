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

import { redirect } from "next/navigation";

interface ApplicationsPageProps {
  searchParams?: Promise<{ role?: string }>;
}

const ROLE_PARAM_TO_CANONICAL: Record<string, string> = {
  model: "models",
  models: "models",
  "makeup-artist": "makeup-artists",
  "makeup-artists": "makeup-artists",
  makeup_artist: "makeup-artists",
  makeup_artists: "makeup-artists",
  makeup: "makeup-artists",
  designer: "fashion-designers",
  designers: "fashion-designers",
  "fashion-designer": "fashion-designers",
  "fashion-designers": "fashion-designers",
  fashion_designer: "fashion-designers",
  stylist: "fashion-stylists",
  stylists: "fashion-stylists",
  "fashion-stylist": "fashion-stylists",
  "fashion-stylists": "fashion-stylists",
  fashion_stylist: "fashion-stylists",
  choreographer: "choreographers",
  choreographers: "choreographers",
  influencer: "creators",
  influencers: "creators",
  "influencer-creator": "creators",
  creator: "creators",
  creators: "creators",
  celebrity: "public-figures",
  celebrities: "public-figures",
  "celebrity-public-figure": "public-figures",
  "public-figure": "public-figures",
  "public-figures": "public-figures",
  cstp: "cstp",
  "fashion-commentary": "fashion-commentary",
  fashion_commentary: "fashion-commentary",
  commentary: "fashion-commentary",
  nomination: "nomination",
  nominations: "nomination",
};

export default async function ApplicationsPage({ searchParams }: ApplicationsPageProps) {
  const resolvedParams = await searchParams;
  const rawRole = resolvedParams?.role?.toLowerCase()?.trim();
  if (rawRole && ROLE_PARAM_TO_CANONICAL[rawRole]) {
    redirect(`/apply/${ROLE_PARAM_TO_CANONICAL[rawRole]}`);
  }

  return (
    <div className="min-h-screen bg-[#050505] text-brand-white pt-20">
      <ApplicationSelectionPage basePath="/apply" />
    </div>
  );
}

