"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function HomeContactInvitation() {
  return (
    <section id="contact" className="relative w-full flex flex-col justify-center py-8 sm:py-12 md:py-14 px-6 sm:px-12 bg-brand-void border-b border-hairline-orange overflow-hidden">
      <div className="mx-auto max-w-7xl text-center flex flex-col items-center w-full relative z-10">
        <span className="text-xs font-syne tracking-micro text-[#D4AF37] font-bold block mb-4 uppercase">
          04 / CONNECTION
        </span>

        <div className="flex items-center gap-2 mb-6">
          <div className="relative w-4 h-4 flex-shrink-0 overflow-hidden rounded-[2px] bg-black border border-[#D4AF37]/40">
            <Image
              src="/assets/brand/fashai_logo_final.png"
              alt="Powered by Arav Innovation Logo"
              fill
              sizes="16px"
              className="object-contain"
            />
          </div>
          <span className="text-[10px] font-syne tracking-[0.25em] text-[#D4AF37] uppercase font-bold">
            Powered by Arav Innovations
          </span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="font-serif-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-brand-white leading-[1.05] tracking-tight mb-6"
        >
          ENTER THE <br />
          <span className="italic font-normal text-[#D4AF37]">
            FASHAI UNIVERSAL.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-sans text-base sm:text-lg text-brand-platinum font-light max-w-xl leading-relaxed mb-8"
        >
          For enquiries, collaborations, partnerships, press accreditation, and delegate interest across the FashAI Universal roadmap.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="/contact"
            className="bg-[#D4AF37] hover:bg-[#FFEC69] text-[#111111] font-bold border border-[#D4AF37] px-9 py-4 rounded-full font-syne text-xs tracking-wider uppercase transition-all duration-300 shadow-xl inline-block"
            data-cursor="explore"
          >
            CONTACT US ↗
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

