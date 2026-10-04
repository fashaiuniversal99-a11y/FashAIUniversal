import type { Metadata } from "next";
import ContactSection from "@/components/sections/ContactSection";
import InstagramSection from "@/components/sections/InstagramSection";

export const metadata: Metadata = {
  title: "Contact Us & Inquiries — FashAI Universal",
  description:
    "Contact the FashAI Universal team for event production, delegate registrations, brand sponsorships, designer participation, and media inquiries in Dubai, UAE & India.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="bg-brand-void text-brand-white pt-14 sm:pt-20 md:pt-24 min-h-screen">
      <ContactSection />
      <InstagramSection />
    </div>
  );
}
