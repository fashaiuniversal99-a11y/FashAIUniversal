import type { Metadata } from "next";
import FashionMagazineSection from "@/components/sections/FashionMagazineSection";
import InstagramSection from "@/components/sections/InstagramSection";

export const metadata: Metadata = {
  title: "Fashion Magazine & Editorial Index | FashAI Universal",
  description:
    "Official editorial fashion publication featuring catwalk dynamics, buyer guides, runway planning checklists, backstage beauty direction, and event management insights.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/fashion-magazine",
  },
  openGraph: {
    title: "Fashion Magazine & Editorial Index | FashAI Universal",
    description:
      "Official editorial fashion publication featuring catwalk dynamics, buyer guides, runway planning checklists, backstage beauty direction, and event management insights.",
    url: "https://www.fashaiuniversal.com/fashion-magazine",
    siteName: "FashAI Universal",
    images: [{ url: "https://www.fashaiuniversal.com/assets/brand/fashai-og-share.png", width: 1200, height: 630, alt: "FashAI Universal Editorial Magazine" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fashion Magazine & Editorial Index | FashAI Universal",
    description:
      "Official editorial fashion publication featuring catwalk dynamics, buyer guides, runway planning checklists, backstage beauty direction, and event management insights.",
    images: ["https://www.fashaiuniversal.com/assets/brand/fashai-og-share.png"],
  },
};

export default function FashionMagazinePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://www.fashaiuniversal.com/fashion-magazine#webpage",
        "url": "https://www.fashaiuniversal.com/fashion-magazine",
        "name": "Fashion Magazine & Editorial Index | FashAI Universal",
        "description": "Official editorial fashion publication featuring catwalk dynamics, buyer guides, runway planning checklists, backstage beauty direction, and event management insights.",
        "publisher": {
          "@type": "Organization",
          "name": "FashAI Universal",
          "url": "https://www.fashaiuniversal.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.fashaiuniversal.com/assets/brand/fashai_logo_final.png",
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.fashaiuniversal.com",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Fashion Magazine",
            "item": "https://www.fashaiuniversal.com/fashion-magazine",
          },
        ],
      },
    ],
  };

  return (
    <div className="bg-brand-void text-brand-white pt-20 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FashionMagazineSection isFullPage={true} />
      <InstagramSection />
    </div>
  );
}
