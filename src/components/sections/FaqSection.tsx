"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FaqItem[] = [
  {
    question: "WHAT EVENT MANAGEMENT SERVICES DOES FASHAI UNIVERSAL PROVIDE?",
    answer: "FashAI Universal conceives, plans, produces, and executes luxury fashion shows, haute couture runways, brand activations, corporate galas, and bespoke event experiences across the UAE, India, and international destinations.",
    category: "EVENT MANAGEMENT",
  },
  {
    question: "HOW MUCH DOES AN EVENT COST?",
    answer: "Event costs vary based on event type, scale, location, production requirements, talent, and services. Submit an enquiry for a tailored proposal.",
    category: "PRICING & PROPOSALS",
  },
  {
    question: "HOW EARLY SHOULD WE BOOK?",
    answer: "Booking timelines vary by event type, scale, location, and availability. We recommend contacting the team as early as possible so requirements and production planning can be assessed.",
    category: "TIMELINES & AVAILABILITY",
  },
  {
    question: "WHO CAN APPLY FOR TALENT AND RECRUITMENT OPPORTUNITIES?",
    answer: "Opportunities and open nominations are available for Designers, Models, Makeup Artists, Fashion Stylists, Choreographers, Creators, and Public Figures across our global network.",
    category: "TALENT & OPPORTUNITIES",
  },
  {
    question: "CAN BRANDS AND EVENT CLIENTS HIRE TALENT THROUGH FASHAI UNIVERSAL?",
    answer: "Yes. Corporate clients and brand partners can directly engage and hire top-tier talent through the FashAI ecosystem, including Designers, Models, Makeup Artists, Fashion Stylists, Choreographers, Creators, and Public Figures for their events and productions.",
    category: "TALENT & BRAND HIRING",
  },
  {
    question: "HOW CAN BRANDS, SPONSORS, AND CLIENTS SUBMIT AN INQUIRY?",
    answer: "Brands, sponsors, and clients can submit requirements directly via our Plan Your Event, Hire Talent, or Contact section on the website. Our event production team reviews every submission promptly.",
    category: "PARTNERSHIPS & INQUIRIES",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative pt-8 sm:pt-10 pb-8 sm:pb-10 bg-[#050505] border-b border-white/10 overflow-hidden select-none">
      <div className="container-editorial relative z-10 max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-jost tracking-widest text-brand-yellow-golden font-bold uppercase mb-3">
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-5xl md:text-6xl font-light text-brand-white uppercase mb-4">
            QUESTIONS &amp; <span className="font-serif italic text-brand-yellow-golden">ANSWERS</span>
          </h2>
          <p className="font-sans text-base sm:text-lg md:text-xl text-brand-platinum/90 font-light max-w-3xl mx-auto leading-relaxed">
            Key information regarding FashAI Universal event management, production services, talent hiring, and sponsorship inquiries.
          </p>
        </div>

        {/* Question Accordion List */}
        <div className="space-y-4">
          {FAQS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.question}
                className="bg-[#0B0A09] border border-white/10 rounded-2xl overflow-hidden transition-colors hover:border-brand-yellow-golden/40"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-1 focus:ring-brand-yellow-golden/50"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5">
                    <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-brand-yellow-golden shrink-0" />
                    <div>
                      <h3 className="font-serif-display text-brand-white uppercase text-lg sm:text-xl md:text-2xl font-light leading-tight">
                        {item.question}
                      </h3>
                    </div>
                  </div>

                  <div className={`p-2 rounded-full bg-white/5 text-brand-platinum transition-transform duration-300 ${isOpen ? "rotate-180 bg-brand-yellow-golden text-black" : ""}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-2 text-sm sm:text-base md:text-lg text-brand-platinum/90 font-light leading-relaxed border-t border-white/5 pl-5 sm:pl-14">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Section Contact Us CTA */}
        <div className="mt-8 sm:mt-10 text-center pt-6 border-t border-white/10">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2.5 bg-[#D4AF37] hover:bg-[#FFEC69] text-[#111111] border border-[#D4AF37] px-8 py-3.5 rounded-full font-jost text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 shadow-lg group"
          >
            <span>CONTACT US</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

