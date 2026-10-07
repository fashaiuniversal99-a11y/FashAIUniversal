import type { Metadata } from "next";
import VipGuestsSection from "@/components/sections/VipGuestsSection";
import InstagramSection from "@/components/sections/InstagramSection";

export const metadata: Metadata = {
  title: "VIP Guests & Dignitaries — FashAI Universal",
  description:
    "Distinguished VIP guests, celebrity attendees, brand patrons, and international dignitaries at FashAI Universal events.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/events",
  },
};

export default function VipGuestsPage() {
  return (
    <div className="bg-brand-void text-brand-white pt-20 min-h-screen">
      <VipGuestsSection />
      <InstagramSection />
    </div>
  );
}
