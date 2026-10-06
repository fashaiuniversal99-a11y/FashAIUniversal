"use client";

import Image from "next/image";
import { Users, Linkedin, Sparkles } from "lucide-react";
import { VERIFIED_LEADERSHIP_MEMBERS } from "@/data/leadership";

export default function LeadershipSection() {
  // SAFELY OMIT ENTIRE SECTION IF NO VERIFIED LEADERSHIP MEMBERS ARE POPULATED
  if (!VERIFIED_LEADERSHIP_MEMBERS || VERIFIED_LEADERSHIP_MEMBERS.length === 0) {
    return null;
  }

  return (
    <section id="leadership" className="py-12 sm:py-16 bg-white dark:bg-[#050505] border-b border-black/10 dark:border-white/10 select-none">
      <div className="w-[min(92vw,1400px)] max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#D4AF37] font-jost text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>EXECUTIVE LEADERSHIP</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-light uppercase tracking-tight text-[#111111] dark:text-white">
            THE PEOPLE BEHIND <span className="italic text-[#D4AF37]">FASHAI UNIVERSAL</span>
          </h2>
          <p className="font-jost text-sm sm:text-base text-[#444444] dark:text-white/80 font-light leading-relaxed">
            Verified executive direction guiding event management, runway production, and international creative partnerships across Dubai and India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VERIFIED_LEADERSHIP_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="p-6 rounded-2xl bg-[#FAF8F5] dark:bg-[#090807] border border-black/10 dark:border-white/10 space-y-4 shadow-sm"
            >
              {member.image && (
                <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-black border border-black/10 dark:border-white/10">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
              )}
              <div className="space-y-1">
                <h3 className="font-serif-display text-xl sm:text-2xl font-light uppercase text-[#111111] dark:text-white">
                  {member.name}
                </h3>
                <p className="font-jost text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                  {member.title}
                </p>
              </div>
              <p className="font-jost text-xs sm:text-sm text-[#555555] dark:text-white/80 font-light leading-relaxed">
                {member.bio}
              </p>
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-jost font-bold uppercase text-[#D4AF37] hover:underline pt-2"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>CONNECT ON LINKEDIN</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
