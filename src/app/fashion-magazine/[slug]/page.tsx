import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Calendar, User, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { MAGAZINE_ARTICLES, MagazineArticle } from "@/data/magazine";

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return MAGAZINE_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = MAGAZINE_ARTICLES.find((a) => a.slug === params.slug || a.id === params.slug);
  if (!article) return {};

  const url = `https://www.fashaiuniversal.com/fashion-magazine/${article.slug}`;
  const imageUrl = `https://www.fashaiuniversal.com${article.primaryImage}`;
  const title = `${article.seoTitle || article.title} | FashAI Universal`;

  return {
    title,
    description: article.metaDescription || article.subtitle,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description: article.metaDescription || article.subtitle,
      url,
      siteName: "FashAI Universal",
      type: "article",
      publishedTime: article.publishedDate,
      modifiedTime: article.publishedDate,
      authors: ["FashAI Universal"],
      images: [{ url: imageUrl, width: 1200, height: 630, alt: article.primaryImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: article.metaDescription || article.subtitle,
      images: [imageUrl],
    },
  };
}

export default function MagazineArticleDetailPage({ params }: ArticlePageProps) {
  const article = MAGAZINE_ARTICLES.find((a) => a.slug === params.slug || a.id === params.slug);

  if (!article) {
    notFound();
  }

  const currentIndex = MAGAZINE_ARTICLES.findIndex((a) => a.slug === article.slug || a.id === article.slug);
  const prevArticle = currentIndex > 0 ? MAGAZINE_ARTICLES[currentIndex - 1] : null;
  const nextArticle = currentIndex < MAGAZINE_ARTICLES.length - 1 ? MAGAZINE_ARTICLES[currentIndex + 1] : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `https://www.fashaiuniversal.com/fashion-magazine/${article.slug}#article`,
        "isPartOf": {
          "@type": "WebPage",
          "@id": `https://www.fashaiuniversal.com/fashion-magazine/${article.slug}`,
          "url": `https://www.fashaiuniversal.com/fashion-magazine/${article.slug}`,
          "name": article.seoTitle || article.title,
        },
        "headline": article.title,
        "description": article.metaDescription || article.subtitle,
        "image": `https://www.fashaiuniversal.com${article.primaryImage}`,
        "datePublished": article.publishedDate,
        "dateModified": article.publishedDate,
        "author": {
          "@type": "Organization",
          "name": "FashAI Universal",
          "url": "https://www.fashaiuniversal.com",
        },
        "publisher": {
          "@type": "Organization",
          "name": "FashAI Universal",
          "url": "https://www.fashaiuniversal.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.fashaiuniversal.com/assets/brand/fashai_logo_final.png",
          },
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://www.fashaiuniversal.com/fashion-magazine/${article.slug}`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.fashaiuniversal.com",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Fashion Magazine",
            "item": "https://www.fashaiuniversal.com/fashion-magazine",
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": article.seoTitle || article.title,
            "item": `https://www.fashaiuniversal.com/fashion-magazine/${article.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="bg-white dark:bg-[#050505] text-[#111111] dark:text-white pt-16 sm:pt-20 md:pt-24 min-h-screen font-jost select-none">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      {/* ARTICLE HEADER */}
      <article className="py-10 sm:py-16 border-b border-black/10 dark:border-white/10 bg-[#FAF8F5] dark:bg-[#080706]">
        <div className="w-[min(92vw,1000px)] max-w-[1000px] mx-auto px-4 sm:px-6">
          <div className="space-y-6">
            <Link
              href="/fashion-magazine"
              className="inline-flex items-center gap-2 text-xs font-jost font-bold uppercase tracking-wider text-[#D4AF37] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>BACK TO MAGAZINE</span>
            </Link>

            <div className="flex flex-wrap items-center gap-3 text-xs font-jost font-bold uppercase">
              <span className="px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#D4AF37]">
                {article.category}
              </span>
              <span className="flex items-center gap-1 text-[#666666] dark:text-white/60">
                <Clock className="w-3.5 h-3.5" />
                <span>{article.readTime}</span>
              </span>
              <span className="flex items-center gap-1 text-[#666666] dark:text-white/60">
                <Calendar className="w-3.5 h-3.5" />
                <span>{article.publishedDate}</span>
              </span>
            </div>

            <h1 className="font-serif-display text-3xl sm:text-5xl md:text-6xl font-light uppercase tracking-tight leading-[1.05]">
              {article.title}
            </h1>

            <p className="font-jost text-lg sm:text-xl text-[#444444] dark:text-white/85 font-light leading-relaxed">
              {article.subtitle}
            </p>
          </div>
        </div>
      </article>

      {/* FEATURED IMAGE */}
      <div className="w-[min(92vw,1000px)] max-w-[1000px] mx-auto px-4 sm:px-6 -mt-6 sm:-mt-10 relative z-10">
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-xl">
          <Image
            src={article.primaryImage}
            alt={article.primaryImageAlt}
            fill
            className={`object-cover ${article.imagePosition || "object-top"}`}
            priority
          />
        </div>
      </div>

      {/* ARTICLE BODY & CONTENT */}
      <div className="w-[min(92vw,800px)] max-w-[800px] mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8 font-jost text-base sm:text-lg text-[#333333] dark:text-white/90 leading-relaxed font-light">
        <p className="font-serif-display text-xl sm:text-2xl text-[#111111] dark:text-white leading-snug uppercase border-l-2 border-[#D4AF37] pl-4 italic">
          &ldquo;{article.introduction}&rdquo;
        </p>

        {article.content.map((paragraph, idx) => (
          <p key={idx} className="text-justify font-light">
            {paragraph}
          </p>
        ))}

        {/* KEY TAKEAWAYS / EXECUTIVE SUMMARY */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF8F5] dark:bg-[#090807] border border-black/10 dark:border-white/10 space-y-4 my-8">
            <h2 className="font-serif-display text-xl sm:text-2xl font-light uppercase text-[#111111] dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              <span>KEY PRODUCTION TAKEAWAYS</span>
            </h2>
            <ul className="space-y-3">
              {article.keyTakeaways.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-[#444444] dark:text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CONTEXTUAL RELATED SERVICES & EXPERIENCES */}
        {article.relatedLinks && article.relatedLinks.length > 0 && (
          <div className="pt-6 border-t border-black/10 dark:border-white/10 space-y-3">
            <span className="font-jost text-xs font-bold uppercase tracking-wider text-[#D4AF37] block">
              EXPLORE RELATED SERVICES &amp; EXPERIENCES
            </span>
            <div className="flex flex-wrap gap-4 text-xs font-jost font-bold uppercase">
              {article.relatedLinks.map((link, i) => (
                <Link key={i} href={link.href} className="text-[#D4AF37] hover:underline">
                  {link.label} ↗
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CONTEXTUAL TALENT & COLLABORATION LINKS */}
        {article.talentLinks && article.talentLinks.length > 0 && (
          <div className="pt-4 space-y-3">
            <span className="font-jost text-xs font-bold uppercase tracking-wider text-[#D4AF37] block">
              EXPLORE FASHION TALENT &amp; COLLABORATION
            </span>
            <div className="flex flex-wrap gap-4 text-xs font-jost font-bold uppercase">
              {article.talentLinks.map((link, i) => (
                <Link key={i} href={link.href} className="text-[#D4AF37] hover:underline">
                  {link.label} ↗
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ARTICLE NAVIGATION (PREV / NEXT) */}
        {(prevArticle || nextArticle) && (
          <div className="pt-6 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-jost font-bold uppercase">
            {prevArticle ? (
              <Link href={`/fashion-magazine/${prevArticle.slug}`} className="inline-flex items-center gap-2 text-[#D4AF37] hover:underline">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>PREVIOUS: {prevArticle.seoTitle}</span>
              </Link>
            ) : <div />}
            {nextArticle && (
              <Link href={`/fashion-magazine/${nextArticle.slug}`} className="inline-flex items-center gap-2 text-[#D4AF37] hover:underline sm:ml-auto">
                <span>NEXT: {nextArticle.seoTitle}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        )}

        {/* TAILORED CTA BANNER */}
        <div className="pt-8">
          <div className="p-8 rounded-2xl bg-black text-white text-center space-y-4 border border-[#D4AF37]/30">
            <h3 className="font-serif-display text-2xl sm:text-3xl font-light uppercase">
              READY TO DISCUSS YOUR FASHION PRODUCTION?
            </h3>
            <p className="font-jost text-sm text-white/70 max-w-xl mx-auto">
              {article.ctaDescription || "Discuss your runway production, corporate summit, or event partnership parameters with FashAI Universal."}
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href={article.ctaHref || "/plan-your-event"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#D4AF37] text-black px-6 py-3 rounded-full font-jost font-bold text-xs uppercase tracking-wider hover:bg-[#FFEC69] transition-all"
              >
                <span>{article.ctaText || "PLAN YOUR EVENT →"}</span>
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#D4AF37] text-[#D4AF37] px-6 py-3 rounded-full font-jost font-bold text-xs uppercase tracking-wider hover:bg-[#D4AF37]/10 transition-all"
              >
                <span>CONTACT US</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
