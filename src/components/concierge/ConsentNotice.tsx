"use client";

import { motion } from "framer-motion";
import { Sparkles, ShieldCheck } from "lucide-react";

interface ConsentNoticeProps {
  onAllow: () => void;
  onDecline: () => void;
}

export default function ConsentNotice({ onAllow, onDecline }: ConsentNoticeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="p-3.5 mb-3 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-2xl text-white text-xs space-y-2.5 shadow-md backdrop-blur-md"
    >
      <div className="flex items-center gap-2 text-[11px] font-jost font-bold text-[#D4AF37] uppercase tracking-wider">
        <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#D4AF37]" />
        <span>PERSONALIZE YOUR EVENT EXPERIENCE</span>
      </div>

      <p className="font-jost text-[11px] text-white/90 font-light leading-relaxed">
        Allow Event Concierge to store your preferences for tailored event production & design recommendations.
      </p>

      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={onAllow}
          className="flex-1 bg-[#D4AF37] px-4 py-2 text-[10px] font-jost tracking-wider font-bold text-black hover:bg-[#FFEC69] transition-all rounded-full flex items-center justify-center gap-1.5 shadow-sm hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>ALLOW & PERSONALIZE</span>
        </button>
        <button
          onClick={onDecline}
          className="px-3.5 py-2 text-[10px] font-jost tracking-wider text-white/80 hover:text-white border border-white/20 hover:border-white/40 transition-all rounded-full hover:bg-white/5 active:scale-[0.98] cursor-pointer"
        >
          NOT NOW
        </button>
      </div>
    </motion.div>
  );
}
