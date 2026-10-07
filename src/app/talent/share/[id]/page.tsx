import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { APPROVED_TALENT_ROSTER } from "@/data/talent";
import TalentShareCardClient from "@/components/talent/TalentShareCardClient";

interface SharePageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return APPROVED_TALENT_ROSTER.map((talent) => ({
    id: talent.id,
  }));
}

export async function generateMetadata({ params }: SharePageProps): Promise<Metadata> {
  const talent = APPROVED_TALENT_ROSTER.find((t) => t.id === params.id);
  if (!talent) return {};

  const url = `https://www.fashaiuniversal.com/talent/share/${talent.id}`;
  const title = `${talent.name} — ${talent.category} | FashAI Universal`;
  const description = `${talent.name} (${talent.specialty}) is part of the approved FashAI Universal talent network.`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "FashAI Universal",
      images: [{ url: talent.image, width: 1200, height: 630, alt: talent.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [talent.image],
    },
  };
}

export default function TalentShareCardPage({ params }: SharePageProps) {
  const talent = APPROVED_TALENT_ROSTER.find((t) => t.id === params.id);

  if (!talent) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${talent.name} - Talent Share Card`,
    "url": `https://www.fashaiuniversal.com/talent/share/${talent.id}`,
    "description": `${talent.name} is part of the FashAI Universal approved talent ecosystem.`,
    "publisher": {
      "@type": "Organization",
      "name": "FashAI Universal",
      "url": "https://www.fashaiuniversal.com",
    },
  };

  return (
    <div className="bg-white dark:bg-[#050505] text-[#111111] dark:text-white pt-16 sm:pt-20 md:pt-24 min-h-screen font-jost select-none">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <main className="py-12 sm:py-20 bg-[#FAF8F5] dark:bg-[#080706] border-b border-black/10 dark:border-white/10">
        <div className="w-[min(92vw,1200px)] max-w-[1200px] mx-auto px-4 sm:px-6">
          <TalentShareCardClient talent={talent} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
