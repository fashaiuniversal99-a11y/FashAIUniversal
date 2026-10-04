import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — FashAI Universal",
  description:
    "Official Privacy Policy of FashAI Universal governing data privacy, user rights, and security standards.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/privacy",
  },
  openGraph: {
    title: "Privacy Policy — FashAI Universal",
    description:
      "Official Privacy Policy of FashAI Universal governing data privacy, user rights, and security standards.",
    url: "https://www.fashaiuniversal.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="bg-brand-void text-brand-white pt-28 pb-24 min-h-screen">
      <div className="container-editorial max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-syne tracking-caps font-bold text-brand-orange hover:text-brand-yellow-golden transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO HOMEPAGE</span>
        </Link>

        <div className="border-b border-white/10 pb-8 mb-10">
          <div className="flex items-center gap-2 text-xs font-syne tracking-micro text-brand-orange font-bold uppercase mb-2">
            <Shield className="w-4 h-4 text-brand-green" />
            <span>LEGAL &amp; COMPLIANCE</span>
          </div>
          <h1 className="font-serif-display text-4xl sm:text-6xl font-light text-brand-white uppercase">
            PRIVACY POLICY
          </h1>
          <p className="font-sans text-xs text-brand-platinum mt-2 font-light">
            Effective Date: September 2026 · FashAI Universal
          </p>
        </div>

        <div className="space-y-8 font-sans text-sm sm:text-base text-brand-platinum font-light leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif-display text-xl sm:text-2xl text-brand-white font-light uppercase">
              1. Overview
            </h2>
            <p>
              FashAI Universal respects your privacy and is committed to protecting the personal information you share with us when registering for delegate access, submitting sponsorship enquiries, or interacting with our digital event platform.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif-display text-xl sm:text-2xl text-brand-white font-light uppercase">
              2. Information We Collect
            </h2>
            <p>
              We collect information provided directly by you when submitting an official enquiry form or delegate registration, including:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-brand-platinum/90">
              <li>Full Name</li>
              <li>Work Email Address</li>
              <li>Country and City of Residence</li>
              <li>Organization, Brand Name, and Professional Role</li>
              <li>Event Interest and Specific Enquiry Details</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif-display text-xl sm:text-2xl text-brand-white font-light uppercase">
              3. How We Use Your Information
            </h2>
            <p>
              Your information is processed strictly for official event administration and communication, including:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-brand-platinum/90">
              <li>Processing LifeStyle 2026 delegate and designer registrations</li>
              <li>Evaluating and responding to brand sponsorship opportunities</li>
              <li>Providing event updates, venue announcements, and dress code advisories</li>
              <li>Ensuring security and regulatory compliance for international attendees</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif-display text-xl sm:text-2xl text-brand-white font-light uppercase">
              4. Data Protection &amp; Security
            </h2>
            <p>
              We apply technical and organizational security measures to protect your personal data against unauthorized access, loss, or disclosure. We do not sell, rent, or trade your personal information to third-party data brokers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif-display text-xl sm:text-2xl text-brand-white font-light uppercase">
              5. Contact &amp; Enquiries
            </h2>
            <p>
              For any questions regarding this Privacy Policy or to request updating your delegate details, please contact the FashAI Universal team via our official contact channel.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
