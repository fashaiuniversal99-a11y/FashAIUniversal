import type { Metadata } from "next";
import ContactSection from "@/components/sections/ContactSection";
import InstagramSection from "@/components/sections/InstagramSection";

export const metadata: Metadata = {
  title: "Contact FashAI Universal | Event & Talent Inquiries",
  description:
    "Get in touch with FashAI Universal for fashion show production, event management, brand activations, talent booking, and media inquiries in Dubai and India.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/contact",
  },
  openGraph: {
    title: "Contact FashAI Universal | Event & Talent Inquiries",
    description:
      "Get in touch with FashAI Universal for fashion show production, event management, brand activations, talent booking, and media inquiries in Dubai and India.",
    url: "https://www.fashaiuniversal.com/contact",
    siteName: "FashAI Universal",
    images: [{ url: "/assets/brand/fashai-og-share.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact FashAI Universal | Event & Talent Inquiries",
    description:
      "Get in touch with FashAI Universal for fashion show production, event management, brand activations, talent booking, and media inquiries in Dubai and India.",
    images: ["/assets/brand/fashai-og-share.png"],
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
