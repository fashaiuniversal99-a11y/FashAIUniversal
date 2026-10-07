"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Sparkles } from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";
import GradientFlowText from "../ui/GradientFlowText";

interface NavItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
  currentPath: string;
}

export default function MobileMenu({
  isOpen,
  onClose,
  items,
  currentPath,
}: MobileMenuProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  // Escape key support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  const content = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[250] lg:hidden flex flex-col p-3 sm:p-4 select-none">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 dark:bg-black/85 backdrop-blur-2xl"
          />

          {/* Floating Glass Panel Drawer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mobile-menu-panel relative z-[260] flex flex-col justify-between h-full w-full bg-white/95 dark:bg-[#070707]/95 border border-black/10 dark:border-white/15 rounded-2xl p-5 sm:p-6 text-[#111111] dark:text-white overflow-y-auto shadow-2xl backdrop-blur-2xl"
          >
            {/* TOP HEADER ROW */}
            <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4 pt-1 shrink-0">
              {/* Logo Lockup */}
              <Link href="/" onClick={onClose} className="flex items-center gap-1.5">
                <div className="relative w-8 h-8 flex-shrink-0">
                  <Image
                    src="/assets/brand/fashai_logo_final.png"
                    alt="FashAI Universal Logo"
                    fill
                    priority
                    sizes="32px"
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-serif-display text-base font-light tracking-wider text-[#111111] dark:text-white uppercase leading-none">
                    FashAI <span className="font-serif italic font-normal text-[#D4AF37] capitalize">Universal</span>
                  </span>
                </div>
              </Link>

              {/* Circular Action Buttons */}
              <div className="flex items-center gap-2">
                <ThemeToggle inMobileMenu={true} />

                {/* Contact Us Button */}
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="hidden xs:inline-flex items-center justify-center bg-[#D4AF37] text-[#111111] hover:bg-[#FFEC69] font-syne text-[11px] font-bold tracking-wider uppercase px-3.5 py-2 rounded-full transition-all shadow-md shrink-0"
                >
                  CONTACT US →
                </Link>

                {/* Floating Circular X Close Button */}
                <button
                  onClick={onClose}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/5 dark:bg-white/15 border border-black/10 dark:border-white/20 text-[#111111] dark:text-white hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-black transition-all flex items-center justify-center shrink-0 shadow-sm aspect-square"
                  aria-label="Close Navigation Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* EDITORIAL NAVIGATION LIST */}
            <nav className="flex flex-col space-y-1 mt-4 mb-auto pt-2 pb-6 shrink-0">
              {items.map((item, index) => {
                const isActive =
                  item.href === "/"
                    ? currentPath === "/"
                    : currentPath.startsWith(item.href);

                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + index * 0.04 }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`group flex items-center justify-between py-3.5 px-3 rounded-xl border-b border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200 text-[#D4AF37] dark:text-white/90 hover:text-[#FFEC69] dark:hover:text-[#D4AF37] ${
                        isActive ? "font-bold bg-black/[0.03] dark:bg-white/[0.04]" : "font-semibold"
                      }`}
                    >
                      <span className="font-syne text-lg sm:text-xl font-bold tracking-[0.15em] uppercase">
                        {item.label}
                      </span>
                      <ArrowRight
                        className={`w-5 h-5 transition-transform duration-300 text-[#D4AF37] dark:text-white/50 group-hover:text-[#FFEC69] dark:group-hover:text-[#D4AF37] ${
                          isActive ? "translate-x-1 font-bold" : "group-hover:translate-x-1"
                        }`}
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* BOTTOM CONVERSION LOCKUP IN MOBILE MENU */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="border-t border-black/10 dark:border-white/10 pt-3 flex flex-col space-y-2 shrink-0"
            >
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/plan-your-event"
                  onClick={onClose}
                  className="w-full bg-[#D4AF37] hover:bg-[#FFEC69] text-[#111111] min-h-[44px] py-2.5 px-2 text-center font-jost text-xs font-bold tracking-wider uppercase transition-all rounded-xl shadow-xs flex items-center justify-center"
                >
                  PLAN YOUR EVENT
                </Link>

                <Link
                  href="/apply"
                  onClick={onClose}
                  className="w-full border border-[#D4AF37] hover:bg-[#D4AF37]/10 text-[#111111] dark:text-white min-h-[44px] py-2.5 px-2 text-center font-jost text-xs font-bold tracking-wider uppercase transition-all rounded-xl flex items-center justify-center"
                >
                  APPLY AS TALENT
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/hire-talent"
                  onClick={onClose}
                  className="w-full border border-black/15 dark:border-white/20 bg-black/5 dark:bg-white/5 text-[#111111] dark:text-white min-h-[44px] py-2.5 px-2 text-center font-jost text-xs font-bold tracking-wider uppercase transition-all rounded-xl flex items-center justify-center"
                >
                  HIRE TALENT
                </Link>

                <Link
                  href="/contact"
                  onClick={onClose}
                  className="w-full border border-black/15 dark:border-white/20 bg-black/5 dark:bg-white/5 text-[#111111] dark:text-white min-h-[44px] py-2.5 px-2 text-center font-jost text-xs font-bold tracking-wider uppercase transition-all rounded-xl flex items-center justify-center"
                >
                  CONTACT US
                </Link>
              </div>

              <div className="flex items-center justify-between text-[11px] font-syne text-neutral-600 dark:text-white/60 pt-1">
                <span>@fashai_universal</span>
                <Image
                  src="/assets/brand/Final_Powered_by_logo.png"
                  alt="Powered by Arav Innovation"
                  width={140}
                  height={36}
                  className="h-5 w-auto object-contain filter contrast-[1.05]"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(content, document.body);
}
