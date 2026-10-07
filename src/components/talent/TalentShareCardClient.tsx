"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Share2, Copy, Check, Sparkles, MapPin, Briefcase, UserPlus, ArrowRight } from "lucide-react";
import { ApprovedTalentItem } from "@/data/talent";

interface TalentShareCardClientProps {
  talent: ApprovedTalentItem;
}

export default function TalentShareCardClient({ talent }: TalentShareCardClientProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined"
    ? window.location.href
    : `https://www.fashaiuniversal.com/talent/share/${talent.id}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${talent.name} — FashAI Universal Talent Roster`,
          text: `${talent.name} (${talent.category}) is part of the FashAI Universal talent network.`,
          url: shareUrl,
        });
        return;
      } catch (err) {
        // Fallback to copy link if user cancels share dialog
      }
    }
    handleCopyLink();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* HEADER LABEL */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#D4AF37] font-jost text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>OFFICIAL TALENT NETWORK CARD</span>
        </div>
        <h1 className="font-serif-display text-3xl sm:text-5xl font-light uppercase tracking-tight">
          LIFESTYLE 2026 <span className="italic text-[#D4AF37]">SHARE CARD</span>
        </h1>
        <p className="font-jost text-sm sm:text-base text-[#555555] dark:text-white/80 font-light max-w-xl mx-auto">
          Approved digital badge representing {talent.name}&apos;s association with the FashAI Universal talent ecosystem.
        </p>
      </div>

      {/* SHARE CARD DISPLAY FRAME */}
      <div className="relative mx-auto max-w-xl bg-black text-white rounded-3xl overflow-hidden border-2 border-[#D4AF37] shadow-2xl p-6 sm:p-8 space-y-6">
        {/* CARD TOP BRANDING HEADER */}
        <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-4">
          <div className="space-y-0.5">
            <span className="font-serif-display text-xl tracking-wider text-[#D4AF37] font-light uppercase block">
              FASHAI UNIVERSAL
            </span>
            <span className="font-jost text-[10px] tracking-[0.2em] uppercase text-white/60 block font-bold">
              INTERNATIONAL FASHION &amp; EVENTS PLATFORM
            </span>
          </div>
          <div className="px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] font-jost text-[10px] font-bold uppercase tracking-wider">
            LIFESTYLE 2026
          </div>
        </div>

        {/* TALENT IMAGE & BADGE */}
        <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-[#D4AF37]/40 bg-black">
          <Image
            src={talent.image}
            alt={talent.name}
            fill
            sizes="(max-width: 640px) 100vw, 500px"
            className={`object-cover ${talent.objectPosition || "object-top"} filter contrast-[1.03]`}
            priority
          />
          <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-[#D4AF37]/60 px-3 py-1.5 rounded-full text-xs font-jost font-bold uppercase tracking-wider text-[#D4AF37]">
            {talent.category}
          </div>
        </div>

        {/* TALENT DETAILS */}
        <div className="space-y-2 text-center">
          <h2 className="font-serif-display text-3xl sm:text-4xl font-light uppercase tracking-tight text-white">
            {talent.name}
          </h2>
          <p className="font-jost text-sm text-[#D4AF37] font-medium tracking-wide uppercase">
            {talent.specialty}
          </p>
          {talent.location && (
            <div className="flex items-center justify-center gap-1.5 text-xs text-white/70 font-jost pt-1">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{talent.location}</span>
            </div>
          )}
        </div>

        {/* TRUTHFUL EVENT STATUS BANNER */}
        <div className="p-4 rounded-xl bg-white/5 border border-[#D4AF37]/25 text-center space-y-1">
          <span className="font-jost text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] block">
            ECOSYSTEM ASSOCIATION
          </span>
          <p className="font-jost text-xs text-white/80 font-light leading-relaxed">
            Part of the FashAI Universal Approved Talent Network.
          </p>
          <p className="font-jost text-[11px] text-white/60 font-light italic">
            LifeStyle 2026 · Date &amp; Venue: To Be Announced (Dubai, UAE)
          </p>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
        <button
          onClick={handleShare}
          className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 bg-[#D4AF37] hover:bg-[#FFEC69] text-black font-jost font-bold text-xs sm:text-sm tracking-wider uppercase py-4 px-6 rounded-full shadow-md transition-all duration-300 min-h-[48px]"
        >
          <Share2 className="w-4 h-4" />
          <span>SHARE CARD</span>
        </button>

        <button
          onClick={handleCopyLink}
          className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 font-jost font-bold text-xs sm:text-sm tracking-wider uppercase py-4 px-6 rounded-full transition-all duration-300 min-h-[48px]"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-500" />
              <span>LINK COPIED!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>COPY SHARE LINK</span>
            </>
          )}
        </button>
      </div>

      {/* NAVIGATION & COMMERCIAL CONVERSION LINKS */}
      <div className="pt-6 border-t border-black/10 dark:border-white/10 flex flex-wrap items-center justify-center gap-4 text-xs font-jost font-bold uppercase text-center">
        <Link href={`/hire-talent?talent=${talent.id}`} className="text-[#D4AF37] hover:underline flex items-center gap-1">
          <Briefcase className="w-3.5 h-3.5" />
          <span>REQUEST {talent.name.toUpperCase()} ↗</span>
        </Link>
        <Link href="/talent" className="text-[#D4AF37] hover:underline">
          Browse Creative Directory ↗
        </Link>
        <Link href="/apply" className="text-[#D4AF37] hover:underline flex items-center gap-1">
          <UserPlus className="w-3.5 h-3.5" />
          <span>Apply As Talent ↗</span>
        </Link>
      </div>
    </div>
  );
}
