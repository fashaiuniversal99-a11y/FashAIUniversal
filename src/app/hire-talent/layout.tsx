import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hire Fashion Talent & Creative Professionals | FashAI Universal",
  description:
    "Book approved fashion models, designers, makeup artists, stylists, choreographers, and creative directors for fashion shows, brand shoots, and campaigns across Dubai and India.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/hire-talent",
  },
  openGraph: {
    title: "Hire Fashion Talent & Creative Professionals | FashAI Universal",
    description:
      "Book approved fashion models, designers, makeup artists, stylists, choreographers, and creative directors for fashion shows, brand shoots, and campaigns across Dubai and India.",
    url: "https://www.fashaiuniversal.com/hire-talent",
    siteName: "FashAI Universal",
    images: [{ url: "/assets/brand/fashai-og-share.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hire Fashion Talent & Creative Professionals | FashAI Universal",
    description:
      "Book approved fashion models, designers, makeup artists, stylists, choreographers, and creative directors for fashion shows, brand shoots, and campaigns across Dubai and India.",
    images: ["/assets/brand/fashai-og-share.png"],
  },
};

export default function HireTalentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
