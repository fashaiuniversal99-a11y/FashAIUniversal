"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS_DATA, ProjectItem } from "@/data/projects";

export default function HomeFeaturedProjects() {
  return (
    <section className="bg-brand-void border-b border-hairline-orange overflow-hidden">
      {/* Section Header */}
      <div className="py-20 container-editorial border-b border-hairline-orange flex flex-col sm:flex-row justify-between items-start sm:items-end">
        <div>
          <span className="text-xs font-syne tracking-micro text-brand-orange block mb-3 font-bold uppercase">
            02 / LIFESTYLE EDITIONS
          </span>
          <h2 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-light text-brand-white">
            LifeStyle Editions
          </h2>
        </div>
        <p className="font-sans text-xs sm:text-sm text-brand-platinum max-w-xs mt-4 sm:mt-0 font-light leading-relaxed">
          LifeStyle 2025 Previous Edition &amp; LifeStyle 2026 Upcoming Dubai Edition.
        </p>
      </div>

      {/* Featured Projects Full-Screen Chapters */}
      <div>
        {PROJECTS_DATA.map((project: ProjectItem, index: number) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="min-h-[85vh] w-full flex flex-col justify-between py-20 border-b border-hairline-orange relative"
            >
              {/* Background Imagery */}
              <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
                <Image
                  src={project.heroImage}
                  alt={project.title}
                  fill
                  sizes="100vw"
                  className="object-cover filter grayscale contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-void via-brand-void/85 to-brand-void/70" />
              </div>

              <div className="relative z-10 container-editorial grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
                {/* Large Photography Frame */}
                <div
                  className={`lg:col-span-7 relative group overflow-hidden border border-hairline-orange/50 bg-brand-charcoal ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                  data-cursor="view"
                >
                  <Link href="/projects">
                    <div className="relative aspect-[4/5] sm:aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={project.heroImage}
                        alt={project.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover object-top filter contrast-110 transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-void/90 via-transparent to-transparent opacity-80" />

                      {/* Large Golden Yellow Project Number Overlay */}
                      <div className="absolute top-6 left-6 font-serif-display text-7xl sm:text-9xl text-brand-yellow-golden/30 select-none font-light">
                        {project.number}
                      </div>

                      {/* Hover Primary Orange Accent Line */}
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                      {/* Small Metadata Overlay */}
                      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                        <span className="text-[10px] font-syne tracking-micro text-brand-green bg-brand-void/90 px-3 py-1 border border-brand-green/40 uppercase font-semibold">
                          {project.category}
                        </span>
                        <span className="text-[10px] font-syne tracking-micro text-brand-orange font-bold uppercase">
                          {project.location}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Content Frame */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-between ${
                    isEven ? "lg:order-2 lg:pl-6" : "lg:order-1 lg:pr-6"
                  }`}
                >
                  <div>
                    <div className="text-xs font-syne tracking-micro text-brand-orange mb-3 font-bold uppercase">
                      PROJECT {project.number} / {project.year}
                    </div>

                    <h3 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-light text-brand-white leading-tight mb-4">
                      {project.title}
                    </h3>

                    <p className="font-sans text-sm sm:text-base text-brand-platinum font-light leading-relaxed mb-8">
                      {project.description}
                    </p>

                    <div className="border-t border-hairline-orange pt-6 mb-8 flex items-center justify-between text-xs font-syne tracking-caps text-brand-yellow-golden">
                      <span>LOCATION: {project.location}</span>
                      <span className="font-bold text-brand-orange">{project.year}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href="/projects"
                      className="inline-flex items-center gap-3 bg-brand-orange px-8 py-4 text-xs font-syne tracking-caps text-white hover:bg-[#ff6f2d] hover:translate-y-[-2px] transition-all duration-300 shadow-md font-bold group"
                      data-cursor="explore"
                    >
                      <span>DISCOVER PROJECT</span>
                      <span className="group-hover:translate-x-1 transition-transform">↗</span>
                    </Link>

                    {project.socialUrl && (
                      <a
                        href={project.socialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 border border-brand-orange/60 bg-brand-void/50 px-8 py-4 text-xs font-syne tracking-caps text-white hover:bg-brand-orange hover:border-brand-orange hover:translate-y-[-2px] transition-all duration-300 shadow-md font-bold group"
                        data-cursor="explore"
                      >
                        <span>VIEW SOCIALS</span>
                        <span className="group-hover:translate-x-1 transition-transform">↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="relative z-10 container-editorial flex justify-between text-[10px] font-syne tracking-micro text-brand-platinum pt-4 border-t border-hairline-orange/30">
                <span>HAUTE PRESENTATION {project.number}</span>
                <span className="text-brand-orange font-bold">{project.subtitle}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* View All Projects CTA */}
      <div className="py-20 text-center bg-brand-atelier">
        <Link
          href="/projects"
          className="inline-flex items-center gap-3 bg-brand-orange px-10 py-5 text-xs font-syne tracking-caps font-bold text-white hover:bg-[#ff6f2d] hover:translate-y-[-2px] transition-all duration-300 shadow-lg"
          data-cursor="explore"
        >
          <span>VIEW ALL PROJECTS ↗</span>
        </Link>
      </div>
    </section>
  );
}

