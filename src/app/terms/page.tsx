import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions — FashAI Universal",
  description:
    "Official Terms & Conditions of FashAI Universal outlining platform usage, event participation, and service terms.",
  alternates: {
    canonical: "https://www.fashaiuniversal.com/terms",
  },
  openGraph: {
    title: "Terms & Conditions — FashAI Universal",
    description:
      "Official Terms & Conditions of FashAI Universal outlining platform usage, event participation, and service terms.",
    url: "https://www.fashaiuniversal.com/terms",
  },
};

export default function TermsPage() {
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
            <FileText className="w-4 h-4 text-brand-yellow-golden" />
            <span>TERMS OF SERVICE</span>
          </div>
          <h1 className="font-serif-display text-4xl sm:text-6xl font-light text-brand-white uppercase">
            TERMS &amp; CONDITIONS
          </h1>
          <p className="font-sans text-xs text-brand-platinum mt-2 font-light">
            Effective Date: September 2026 · FashAI Universal
          </p>
        </div>

        <div className="space-y-8 font-sans text-sm sm:text-base text-brand-platinum font-light leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif-display text-xl sm:text-2xl text-brand-white font-light uppercase">
              1. Platform Acceptance
            </h2>
            <p>
              By accessing or using the FashAI Universal platform, registering for delegate entry, or submitting sponsorship enquiries for LifeStyle 2026 Dubai, you agree to be bound by these Terms &amp; Conditions and all applicable regulations enforced by FashAI Universal.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif-display text-xl sm:text-2xl text-brand-white font-light uppercase">
              2. Event Registrations &amp; Sponsorships
            </h2>
            <p>
              All submissions received through the official enquiry forms undergo review by the delegate committee. Delegate access, press credentials, and sponsorship agreements are confirmed upon formal written verification from FashAI Universal.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif-display text-xl sm:text-2xl text-brand-white font-light uppercase">
              3. Intellectual Property
            </h2>
            <p>
              All trademarks, logos, haute couture photography, spatial lighting art, computational fashion media, and official brand assets associated with FashAI Universal remain the exclusive property of their respective owners.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif-display text-xl sm:text-2xl text-brand-white font-light uppercase">
              4. Event Announcements &amp; Updates
            </h2>
            <p>
              Official event dates, venues, and schedule parameters for LifeStyle 2026 Dubai are communicated through official platform announcements. Attendees are responsible for reviewing updated advisories prior to travel.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif-display text-xl sm:text-2xl text-brand-white font-light uppercase">
              5. Governing Law
            </h2>
            <p>
              These terms shall be governed and construed in accordance with applicable corporate and event laws under the jurisdiction of FashAI Universal initiatives.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
