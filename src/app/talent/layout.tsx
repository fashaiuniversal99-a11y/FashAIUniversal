import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fashion Talent Network & Creative Directory | FashAI Universal",
  description:
    "Discover and request approved fashion models, designers, makeup artists, stylists, choreographers, and creators across Dubai and India, or apply to join the network.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/talent",
  },
  openGraph: {
    title: "Fashion Talent Network & Creative Directory | FashAI Universal",
    description:
      "Discover and request approved fashion models, designers, makeup artists, stylists, choreographers, and creators across Dubai and India, or apply to join the network.",
    url: "https://www.fashaiuniversal.com/talent",
    siteName: "FashAI Universal",
    images: [{ url: "/assets/brand/fashai-og-share.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fashion Talent Network & Creative Directory | FashAI Universal",
    description:
      "Discover and request approved fashion models, designers, makeup artists, stylists, choreographers, and creators across Dubai and India, or apply to join the network.",
    images: ["/assets/brand/fashai-og-share.png"],
  },
};

export default function TalentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
