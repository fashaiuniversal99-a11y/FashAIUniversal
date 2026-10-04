import type { Metadata } from "next";
import "./globals.css";
import ClientLayoutWrapper from "@/components/layout/ClientLayoutWrapper";

export const metadata: Metadata = {
  metadataBase: new URL("https://fashai-beryl.vercel.app"),
  title: "FashAI Universal — International Luxury Fashion & Events Platform",
  description:
    "FashAI Universal is an international fashion, lifestyle, and events platform connecting global designers, models, creative talent, and brand experiences across Dubai, UAE & India.",
  alternates: {
    canonical: "https://fashai-beryl.vercel.app",
  },
  keywords: [
    "FashAI Universal",
    "Fashion AI",
    "Haute Couture",
    "2026 Dubai",
    "Fashion Events Dubai",
    "Designer Applications",
    "Fashion Talent Network",
    "Luxury Fashion Events",
    "Lifestyle Events UAE",
    "Corporate Fashion Events",
    "Model Applications Dubai",
    "Choreographer Registrations",
  ],
  authors: [{ name: "FashAI Universal" }],
  openGraph: {
    title: "FashAI Universal — International Fashion & Events Platform",
    description:
      "Where fashion, technology and imagination converge. An international luxury fashion, lifestyle and event platform.",
    url: "https://fashai-beryl.vercel.app",
    siteName: "FashAI Universal",
    images: [
      {
        url: "/assets/final/WhatsApp Image 2026-09-18 at 15.02.32.jpeg",
        width: 1200,
        height: 630,
        alt: "FashAI Universal",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FashAI Universal — International Fashion & Events Platform",
    description:
      "Where fashion, technology and imagination converge.",
    images: ["/assets/final/WhatsApp Image 2026-09-18 at 15.02.32.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/assets/brand/fashai_logo_final.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: ["/assets/brand/fashai_logo_final.png"],
    apple: [
      { url: "/assets/brand/fashai_logo_final.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://fashai-beryl.vercel.app/#organization",
        name: "FashAI Universal",
        url: "https://fashai-beryl.vercel.app",
        logo: "https://fashai-beryl.vercel.app/assets/brand/fashai_logo_final.png",
        sameAs: ["https://www.instagram.com/fashai_universal"],
        description:
          "FashAI Universal is an international fashion and events platform focused on fashion experiences, events, creative talent, designers, artists, and brand participation.",
        location: [
          {
            "@type": "Place",
            name: "India Headquarters (HQ)",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Platinum Floor, 14/23, Ardee City, Sector 52",
              addressLocality: "Gurgaon",
              addressRegion: "Haryana",
              postalCode: "122002",
              addressCountry: "IN",
            },
          },
          {
            "@type": "Place",
            name: "UAE Regional Office",
            address: {
              "@type": "PostalAddress",
              streetAddress: "55764-001 IFZA Business Park FZCO, Building A1, Dubai Silicon Oasis",
              addressLocality: "Dubai",
              addressCountry: "AE",
            },
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://fashai-beryl.vercel.app/#website",
        url: "https://fashai-beryl.vercel.app",
        name: "FashAI Universal",
        publisher: { "@id": "https://fashai-beryl.vercel.app/#organization" },
      },
      {
        "@type": "Event",
        name: "LifeStyle 2026 · Dubai",
        eventStatus: "https://schema.org/EventRescheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: "Dubai, United Arab Emirates (Venue to be announced)",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Dubai",
            addressCountry: "AE",
          },
        },
        description:
          "An international luxury fashion and lifestyle experience hosted in Dubai. Dates and venue to be announced — join the waiting list for official updates.",
        organizer: { "@id": "https://fashai-beryl.vercel.app/#organization" },
      },
    ],
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/assets/brand/fashai_logo_final.png" type="image/png" sizes="any" />
        <link rel="shortcut icon" href="/assets/brand/fashai_logo_final.png" type="image/png" />
        <link rel="apple-touch-icon" href="/assets/brand/fashai_logo_final.png" sizes="180x180" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-brand-void text-brand-off-white selection:bg-brand-orange selection:text-white font-sans-body">
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
