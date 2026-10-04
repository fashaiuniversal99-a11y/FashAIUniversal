import type { Metadata } from "next";
import AboutUsSection from "@/components/sections/AboutUsSection";
import WhoWeAreSection from "@/components/sections/WhoWeAreSection";
import OfficeLocations from "@/components/sections/OfficeLocations";
import InstagramSection from "@/components/sections/InstagramSection";

export const metadata: Metadata = {
  title: "About FashAI Universal — Event Management & Talent Ecosystem",
  description:
    "Learn about FashAI Universal: a global event management and production platform connecting luxury fashion experiences, brand activations, and creative talent across the UAE, India, and international destinations.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-brand-void text-brand-white pt-20 min-h-screen">
      <AboutUsSection />
      <WhoWeAreSection />
      <section className="py-12 sm:py-16 bg-white dark:bg-[#050505] border-b border-black/10 dark:border-white/10">
        <div className="container-editorial">
          <OfficeLocations showHeading={true} />
        </div>
      </section>
      <InstagramSection />
    </div>
  );
}
