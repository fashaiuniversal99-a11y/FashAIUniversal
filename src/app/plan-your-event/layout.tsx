import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plan Your Fashion Event & Show Production | FashAI Universal",
  description:
    "Commission fashion show management, brand activations, corporate galas, and event production across Dubai and India. Submit your event brief for custom planning.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/plan-your-event",
  },
  openGraph: {
    title: "Plan Your Fashion Event & Show Production | FashAI Universal",
    description:
      "Commission fashion show management, brand activations, corporate galas, and event production across Dubai and India. Submit your event brief for custom planning.",
    url: "https://www.fashaiuniversal.com/plan-your-event",
    siteName: "FashAI Universal",
    images: [{ url: "/assets/brand/fashai-og-share.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plan Your Fashion Event & Show Production | FashAI Universal",
    description:
      "Commission fashion show management, brand activations, corporate galas, and event production across Dubai and India. Submit your event brief for custom planning.",
    images: ["/assets/brand/fashai-og-share.png"],
  },
};

export default function PlanYourEventLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
