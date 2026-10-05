"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function FashAiIntro() {
  return (
    <section className="relative w-full flex flex-col justify-center py-10 sm:py-14 bg-brand-void border-t border-b border-hairline-orange overflow-hidden">
      {/* Rich Background Atmosphere & Graphical Layer */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        <div className="editorial-watermark absolute top-1/2 left-0 -translate-y-1/2 text-[15vw] font-serif-display font-light uppercase tracking-tighter leading-none pointer-events-none select-none">
          FASHAI
        </div>
      </div>

      <div className="container-editorial relative z-10">
        {/* Eyebrow Label */}
        <div className="flex items-center gap-4 mb-10">
          <span className="text-xs font-syne tracking-micro text-brand-orange font-bold uppercase">
            01 / PROJECT IDENTITY
          </span>
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="h-[1.5px] w-32 bg-brand-green origin-left"
          />
        </div>

        <div className="max-w-6xl">
          {/* Main Statement */}
          <motion.h2
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-brand-white font-light leading-[1.1]"
          >
            FashAI Universal is an international digital experience{" "}
            <span className="text-brand-orange italic font-normal">
              where fashion, technology and imagination converge.
            </span>
          </motion.h2>

          {/* Supporting Paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14"
          >
            <p className="font-sans text-base sm:text-lg text-brand-platinum font-light leading-relaxed mb-8">
              FashAI Universal connects fashion, technology and imagination within a global digital framework.
            </p>

            <div className="pt-8 border-t border-hairline-orange grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8">
                <span className="font-syne text-[10px] tracking-micro text-brand-orange uppercase font-bold block mb-1">
                  FASHION · TALENT · DIGITAL EXPERIENCES
                </span>
                <p className="font-sans text-xs text-brand-platinum font-light">
                  Bridging physical garment art with spatial lighting and high-couture identity.
                </p>
              </div>
              <div className="md:col-span-4 flex flex-col justify-end items-start md:items-end text-xs font-syne tracking-caps text-brand-yellow-golden space-y-2">
                <span className="text-brand-orange font-bold uppercase">FASHAI UNIVERSAL</span>
                <Image
                  src="/assets/brand/Final_Powered_by_logo.png"
                  alt="Powered by Arav Innovation"
                  width={220}
                  height={58}
                  className="h-7 sm:h-9 w-auto object-contain"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
