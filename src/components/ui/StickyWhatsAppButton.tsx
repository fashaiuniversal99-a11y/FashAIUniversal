"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { trackEvent } from "@/lib/analytics/tracker";

export const StickyWhatsAppButton: React.FC = () => {
  const { config } = useSiteConfig();

  // Check if a verified WhatsApp number is configured in SiteConfig or env
  const whatsappNumber =
    (config?.globalSettings as any)?.contactWhatsApp ||
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    "";

  const isEnabled =
    (config?.globalSettings as any)?.whatsappEnabled === true ||
    (Boolean(whatsappNumber) && process.env.NEXT_PUBLIC_WHATSAPP_ENABLED === "true");

  // If no verified WhatsApp number or integration is unconfigured/disabled, safely render null
  if (!isEnabled || !whatsappNumber) {
    return null;
  }

  // Sanitize number for wa.me URL
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    "Hello FashAI Universal, I would like to enquire about event planning and talent requirements."
  )}`;

  const handleClick = () => {
    trackEvent("whatsapp_click", { location: "sticky_button" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[180] pb-safe select-none">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-label="Contact FashAI Universal on WhatsApp"
        className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-black"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-current" />
        <span className="sr-only">Contact FashAI Universal on WhatsApp</span>

        {/* Hover Label */}
        <span className="absolute right-full mr-3 px-3 py-1.5 rounded-xl bg-black/90 border border-white/15 text-white font-jost text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
};

export default StickyWhatsAppButton;
