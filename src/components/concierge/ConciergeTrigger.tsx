"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import FashAIChatbotLogo from "./FashAIChatbotLogo";

interface ConciergeTriggerProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function ConciergeTrigger({ isOpen, onToggle }: ConciergeTriggerProps) {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInFooter, setIsInFooter] = useState(false);
  const hasTriggeredRef = useRef(false);

  // 1. Observe footer visibility to immediately hide/prevent popup when in footer
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkFooter = () => {
      const footer = document.querySelector("footer");
      if (!footer) return;

      const rect = footer.getBoundingClientRect();
      const inView = rect.top <= window.innerHeight;
      
      setIsInFooter(inView);
      if (inView) {
        setShowPrompt(false);
      }
    };

    window.addEventListener("scroll", checkFooter, { passive: true });
    checkFooter();

    return () => {
      window.removeEventListener("scroll", checkFooter);
    };
  }, []);

  // 2. 4-second delay -> 5-second popup duration lifecycle
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isDismissed = sessionStorage.getItem("fashai_chat_prompt_dismissed") === "true";
    if (isDismissed || isOpen || isInFooter || hasTriggeredRef.current) {
      if (isInFooter || isOpen) {
        setShowPrompt(false);
      }
      return;
    }

    let hideTimer: NodeJS.Timeout;

    // 4 seconds delay after load before showing popup
    const showTimer = setTimeout(() => {
      const footer = document.querySelector("footer");
      const inFooterNow = footer ? footer.getBoundingClientRect().top <= window.innerHeight : false;

      if (!inFooterNow && !isOpen) {
        setShowPrompt(true);
        hasTriggeredRef.current = true;

        // Automatically hide popup after 5 seconds
        hideTimer = setTimeout(() => {
          setShowPrompt(false);
        }, 5000);
      }
    }, 4000);

    return () => {
      clearTimeout(showTimer);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [isOpen, isInFooter]);

  // Hide prompt when chat panel is opened
  useEffect(() => {
    if (isOpen) {
      setShowPrompt(false);
    }
  }, [isOpen]);

  const handleOpenChat = () => {
    setShowPrompt(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("fashai_chat_prompt_dismissed", "true");
    }
    onToggle();
  };

  const handleDismissPrompt = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPrompt(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("fashai_chat_prompt_dismissed", "true");
    }
  };

  if (isOpen) return null;

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[250] flex items-center gap-3 select-none pointer-events-none">
      {/* INTRODUCTORY PROMPT MESSAGE WITH PILL ROUNDED DESIGN */}
      <AnimatePresence>
        {showPrompt && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 14, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 14, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            onClick={handleOpenChat}
            className="pointer-events-auto cursor-pointer max-w-[260px] sm:max-w-[300px] bg-[#FAF8F5] dark:bg-[#121110] text-[#111111] dark:text-white border border-black/10 dark:border-[#D4AF37]/50 px-4 py-3 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-2xl flex items-center justify-between gap-3 relative group hover:border-[#F15E1C] dark:hover:border-[#D4AF37] hover:scale-105 transition-all"
          >
            {/* SPEECH BUBBLE TAIL */}
            <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[#FAF8F5] dark:bg-[#121110] border-r border-t border-black/10 dark:border-[#D4AF37]/50 rotate-45 group-hover:border-[#F15E1C] dark:group-hover:border-[#D4AF37] transition-all rounded-tr-xs" />

            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-full bg-[#F15E1C]/15 dark:bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center shrink-0 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#F15E1C] dark:text-[#D4AF37]" />
              </div>
              <p className="font-jost text-xs font-medium leading-snug tracking-tight text-[#111111] dark:text-white/95 truncate">
                Need help? <span className="font-bold text-[#F15E1C] dark:text-[#D4AF37]">Event Concierge</span>
              </p>
            </div>

            <button
              onClick={handleDismissPrompt}
              aria-label="Dismiss message"
              className="p-1 rounded-full text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING CIRCULAR LAUNCHER BUTTON WITH ROTATING LOGO */}
      <motion.button
        onClick={handleOpenChat}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 350, damping: 22 }}
        aria-label={isOpen ? "Close Event Concierge" : "Open Event Concierge"}
        aria-expanded={isOpen}
        className={`pointer-events-auto flex items-center justify-center rounded-full transition-all duration-300 select-none group shrink-0 relative ${
          isOpen
            ? "w-12 h-12 sm:w-14 sm:h-14 bg-[#111111] border border-[#D4AF37] text-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.45)]"
            : "w-13 h-13 sm:w-15 sm:h-15 lg:w-[60px] lg:h-[60px] bg-[#0B0A09]/95 border border-[#D4AF37]/60 shadow-[0_8px_30px_rgba(0,0,0,0.65)] backdrop-blur-xl hover:border-[#D4AF37] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)]"
        }`}
      >
        {!isOpen ? (
          <div className="relative z-10 w-full h-full p-1 flex items-center justify-center overflow-visible">
            <div className="relative w-full h-full flex items-center justify-center rounded-full overflow-hidden">
              <FashAIChatbotLogo size={48} className="animate-chatbot-spin" />
            </div>

            {/* GREEN ONLINE STATUS INDICATOR DOT */}
            <span className="absolute top-0 right-0 flex h-3.5 w-3.5 z-20 pointer-events-none">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2E936F] opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#2E936F] border-2 border-black" />
            </span>
          </div>
        ) : (
          <X className="w-6 h-6 text-[#D4AF37] relative z-10" />
        )}
      </motion.button>
    </div>
  );
}


