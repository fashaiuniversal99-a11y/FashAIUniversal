"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Calendar, Users, UserPlus, Mail } from "lucide-react";

export default function FinalConversionSection() {
  const conversionPaths = [
    {
      id: "plan-event",
      title: "PLAN YOUR EVENT",
      subtitle: "For brands and organizations looking for event planning & management.",
      icon: Calendar,
      href: "/plan-your-event",
      badge: "EVENT CLIENTS",
    },
    {
      id: "hire-talent",
      title: "HIRE TALENT",
      subtitle: "For clients looking to book verified runway models, designers & artists.",
      icon: Users,
      href: "/hire-talent",
      badge: "TALENT BOOKING",
    },
    {
      id: "apply-talent",
      title: "APPLY AS TALENT",
      subtitle: "For designers, models, stylists & creators looking to join our roster.",
      icon: UserPlus,
      href: "/apply",
      badge: "CREATIVE NETWORK",
    },
    {
      id: "contact-us",
      title: "CONTACT US",
      subtitle: "For general enquiries, partnerships, press and delegate questions.",
      icon: Mail,
      href: "/contact",
      badge: "GENERAL ENQUIRIES",
    },
  ];

  return (
    <section
      id="final-conversion"
      className="relative py-12 sm:py-16 lg:py-20 bg-black text-white border-b border-white/10 select-none overflow-hidden"
    >
      {/* Background Watermark Accent */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="editorial-watermark absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[16vw] font-serif-display font-light uppercase tracking-tighter leading-none opacity-20 text-white/[0.02]">
          FASHAI
        </div>
      </div>

      <div className="container-editorial relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-syne font-bold tracking-wider uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
            <span>TAKE THE NEXT STEP</span>
          </div>

          <h2 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-light text-white uppercase leading-tight tracking-tight">
            START YOUR JOURNEY WITH <span className="font-serif italic text-[#D4AF37]">FASHAI</span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-brand-platinum/85 font-light max-w-xl mx-auto leading-relaxed">
            Select your destination to connect with our team and access our international ecosystem.
          </p>
        </div>

        {/* 4 CONVERSION PATHS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
          {conversionPaths.map((path, idx) => {
            const IconComponent = path.icon;
            return (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group relative bg-[#0C0B0A] border border-white/10 hover:border-[#D4AF37] rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 shadow-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-syne tracking-widest font-bold text-[#D4AF37] uppercase">
                      {path.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif-display text-xl sm:text-2xl font-light text-white uppercase tracking-tight group-hover:text-[#D4AF37] transition-colors">
                      {path.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-brand-platinum/75 font-light leading-relaxed mt-2">
                      {path.subtitle}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-white/10">
                  <Link
                    href={path.href}
                    className="w-full inline-flex items-center justify-between bg-[#D4AF37] hover:bg-[#FFEC69] text-black py-3 px-4 rounded-xl font-syne text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-md group/btn"
                  >
                    <span>{path.title}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
