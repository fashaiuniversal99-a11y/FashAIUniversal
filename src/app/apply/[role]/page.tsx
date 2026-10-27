import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import RoleApplicationForm, { RoleSlug } from "@/components/forms/RoleApplicationForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface RolePageProps {
  params: Promise<{
    role: string;
  }>;
}

interface CategoryRouteConfig {
  roleSlug: RoleSlug;
  canonicalSlug: string;
  title: string;
  badge: string;
}

const CATEGORY_MAP: Record<string, CategoryRouteConfig> = {
  // 1. Models
  models: { roleSlug: "model", canonicalSlug: "models", title: "Model", badge: "RUNWAY & EDITORIAL" },
  model: { roleSlug: "model", canonicalSlug: "models", title: "Model", badge: "RUNWAY & EDITORIAL" },

  // 2. Makeup Artists
  "makeup-artists": { roleSlug: "makeup-artist", canonicalSlug: "makeup-artists", title: "Makeup Artist", badge: "BEAUTY & BACKSTAGE" },
  "makeup-artist": { roleSlug: "makeup-artist", canonicalSlug: "makeup-artists", title: "Makeup Artist", badge: "BEAUTY & BACKSTAGE" },
  makeup_artist: { roleSlug: "makeup-artist", canonicalSlug: "makeup-artists", title: "Makeup Artist", badge: "BEAUTY & BACKSTAGE" },
  makeup: { roleSlug: "makeup-artist", canonicalSlug: "makeup-artists", title: "Makeup Artist", badge: "BEAUTY & BACKSTAGE" },

  // 3. Fashion Designers
  "fashion-designers": { roleSlug: "designer", canonicalSlug: "fashion-designers", title: "Fashion Designer", badge: "COUTURE & ATELIER" },
  "fashion-designer": { roleSlug: "designer", canonicalSlug: "fashion-designers", title: "Fashion Designer", badge: "COUTURE & ATELIER" },
  designer: { roleSlug: "designer", canonicalSlug: "fashion-designers", title: "Fashion Designer", badge: "COUTURE & ATELIER" },
  designers: { roleSlug: "designer", canonicalSlug: "fashion-designers", title: "Fashion Designer", badge: "COUTURE & ATELIER" },

  // 4. Fashion Stylists
  "fashion-stylists": { roleSlug: "fashion-stylist", canonicalSlug: "fashion-stylists", title: "Fashion Stylist", badge: "WARDROBE & STYLING" },
  "fashion-stylist": { roleSlug: "fashion-stylist", canonicalSlug: "fashion-stylists", title: "Fashion Stylist", badge: "WARDROBE & STYLING" },
  stylist: { roleSlug: "fashion-stylist", canonicalSlug: "fashion-stylists", title: "Fashion Stylist", badge: "WARDROBE & STYLING" },
  stylists: { roleSlug: "fashion-stylist", canonicalSlug: "fashion-stylists", title: "Fashion Stylist", badge: "WARDROBE & STYLING" },

  // 5. Choreographers
  choreographers: { roleSlug: "choreographer", canonicalSlug: "choreographers", title: "Choreographer", badge: "STAGE & CATWALK" },
  choreographer: { roleSlug: "choreographer", canonicalSlug: "choreographers", title: "Choreographer", badge: "STAGE & CATWALK" },

  // 6. Influencers / Creators
  creators: { roleSlug: "influencer", canonicalSlug: "creators", title: "Influencer / Creator", badge: "DIGITAL MEDIA" },
  creator: { roleSlug: "influencer", canonicalSlug: "creators", title: "Influencer / Creator", badge: "DIGITAL MEDIA" },
  influencer: { roleSlug: "influencer", canonicalSlug: "creators", title: "Influencer / Creator", badge: "DIGITAL MEDIA" },
  influencers: { roleSlug: "influencer", canonicalSlug: "creators", title: "Influencer / Creator", badge: "DIGITAL MEDIA" },
  "influencer-creator": { roleSlug: "influencer", canonicalSlug: "creators", title: "Influencer / Creator", badge: "DIGITAL MEDIA" },

  // 7. Celebrity / Public Figures
  "public-figures": { roleSlug: "celebrity", canonicalSlug: "public-figures", title: "Celebrity / Public Figure", badge: "CONFIDENTIAL VIP" },
  "public-figure": { roleSlug: "celebrity", canonicalSlug: "public-figures", title: "Celebrity / Public Figure", badge: "CONFIDENTIAL VIP" },
  celebrity: { roleSlug: "celebrity", canonicalSlug: "public-figures", title: "Celebrity / Public Figure", badge: "CONFIDENTIAL VIP" },
  celebrities: { roleSlug: "celebrity", canonicalSlug: "public-figures", title: "Celebrity / Public Figure", badge: "CONFIDENTIAL VIP" },
  "celebrity-public-figure": { roleSlug: "celebrity", canonicalSlug: "public-figures", title: "Celebrity / Public Figure", badge: "CONFIDENTIAL VIP" },

  // 8. CSTP
  cstp: { roleSlug: "cstp", canonicalSlug: "cstp", title: "CSTP Application", badge: "COMPUTATIONAL FASHION" },

  // 9. Fashion Commentary
  "fashion-commentary": { roleSlug: "fashion-commentary", canonicalSlug: "fashion-commentary", title: "Fashion Commentary", badge: "MEDIA & JOURNALISM" },
  fashion_commentary: { roleSlug: "fashion-commentary", canonicalSlug: "fashion-commentary", title: "Fashion Commentary", badge: "MEDIA & JOURNALISM" },

  // 10. Nomination
  nomination: { roleSlug: "nomination", canonicalSlug: "nomination", title: "Creative Nomination", badge: "NOMINATE TALENT" },
  nominations: { roleSlug: "nomination", canonicalSlug: "nomination", title: "Creative Nomination", badge: "NOMINATE TALENT" },
};

export async function generateMetadata({ params }: RolePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slugKey = resolvedParams.role?.toLowerCase()?.trim();
  const config = CATEGORY_MAP[slugKey];

  if (!config) {
    return {
      title: "Application Not Found | FashAI Universal",
    };
  }

  return {
    title: `${config.title} Application | FashAI Universal Talent Network`,
    description: `Official ${config.title} application form for FashAI Universal talent network, runway presentations, and luxury showcases.`,
    alternates: {
      canonical: `https://www.fashaiuniversal.com/apply/${config.canonicalSlug}`,
    },
  };
}

export default async function DedicatedRolePage({ params }: RolePageProps) {
  const resolvedParams = await params;
  const slugKey = resolvedParams.role?.toLowerCase()?.trim();
  const config = CATEGORY_MAP[slugKey];

  if (!config) {
    notFound();
  }

  // Where practical, redirect legacy URLs to their canonical category routes
  if (slugKey !== config.canonicalSlug) {
    redirect(`/apply/${config.canonicalSlug}`);
  }

  return (
    <div className="min-h-screen bg-[#050505] text-brand-white pt-24 pb-24">
      <div className="container-editorial relative z-10">
        <div className="mb-6">
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 text-xs font-syne tracking-caps font-bold text-brand-platinum/70 hover:text-brand-yellow-golden transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> ALL APPLICATION ROLES
          </Link>
        </div>

        {/* Single-Role Dedicated Form Engine */}
        <RoleApplicationForm roleSlug={config.roleSlug} isModal={false} />
      </div>
    </div>
  );
}

