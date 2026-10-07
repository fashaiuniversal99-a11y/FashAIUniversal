import type { Metadata } from "next";
import AboutUsSection from "@/components/sections/AboutUsSection";
import WhoWeAreSection from "@/components/sections/WhoWeAreSection";
import BrandFamilySection from "@/components/sections/BrandFamilySection";
import VerifiedGuestsPartnersSection from "@/components/sections/VerifiedGuestsPartnersSection";
import LeadershipSection from "@/components/sections/LeadershipSection";
import OfficeLocations from "@/components/sections/OfficeLocations";
import InstagramSection from "@/components/sections/InstagramSection";

export const metadata: Metadata = {
  title: "About FashAI Universal | Fashion Events & Talent Platform",
  description:
    "FashAI Universal delivers end-to-end fashion show management, brand activations, and creative talent solutions across Dubai, UAE, and Gurgaon, India. Powered by Arav Innovations.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/about",
  },
  openGraph: {
    title: "About FashAI Universal | Fashion Events & Talent Platform",
    description:
      "FashAI Universal delivers end-to-end fashion show management, brand activations, and creative talent solutions across Dubai, UAE, and Gurgaon, India. Powered by Arav Innovations.",
    url: "https://www.fashaiuniversal.com/about",
    siteName: "FashAI Universal",
    images: [{ url: "/assets/brand/fashai-og-share.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About FashAI Universal | Fashion Events & Talent Platform",
    description:
      "FashAI Universal delivers end-to-end fashion show management, brand activations, and creative talent solutions across Dubai, UAE, and Gurgaon, India. Powered by Arav Innovations.",
    images: ["/assets/brand/fashai-og-share.png"],
  },
};

export default function AboutPage() {
  return (
    <div className="bg-brand-void text-brand-white pt-20 min-h-screen">
      <AboutUsSection />
      <BrandFamilySection />
      <VerifiedGuestsPartnersSection />
      <WhoWeAreSection />
      <LeadershipSection />
      <section className="py-12 sm:py-16 bg-white dark:bg-[#050505] border-b border-black/10 dark:border-white/10">
        <div className="container-editorial">
          <OfficeLocations showHeading={true} />
        </div>
      </section>
      <InstagramSection />
    </div>
  );
}

