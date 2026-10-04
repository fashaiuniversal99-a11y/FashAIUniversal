"use client";

import { useState } from "react";
import { Sliders, Save, ChevronDown, ChevronUp, Cpu, Zap, Shield, Image as ImageIcon } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function GlobalSettingsPage() {
  const { config, updateLocalDraftConfig, saveDraft, publish, showToast } = useSiteConfig();
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const g = config.globalSettings || {
    siteTitle: "FashAI Universal — International Luxury Fashion & Events Platform",
    metaTitle: "FashAI Universal — International Fashion & Events Platform",
    metaDescription: "FashAI Universal is an international fashion, lifestyle, and events platform connecting global designers, models, creative talent, and brand experiences across Dubai, UAE & India.",
    favicon: "/favicon.ico",
    ogImage: "/assets/brand/fashai-og-share.png",
    contactEmail: "contact@fashaiuniversal.com",
    instagramUrl: "https://www.instagram.com/fashai_universal",
    copyrightYear: "2026",
    defaultCtaText: "CONTACT US →",
    defaultCtaUrl: "/contact",
  };

  const handleChange = (key: keyof typeof g, value: string) => {
    updateLocalDraftConfig((prev) => ({
      ...prev,
      globalSettings: {
        ...prev.globalSettings,
        [key]: value,
      },
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 select-none font-sans">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-4">
        <span className="font-syne text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
          SYSTEM CONFIGURATION
        </span>
        <h1 className="font-serif-display text-2xl sm:text-3xl font-light uppercase tracking-tight text-white">
          GLOBAL <span className="text-[#D4AF37]">SETTINGS</span>
        </h1>
        <p className="font-sans text-xs text-white/60">
          Configure core website metadata, social channels, copyright details, and advanced technical settings.
        </p>
      </div>

      {/* GENERAL METADATA & CONTACT SETTINGS */}
      <div className="p-6 rounded-3xl bg-[#0F0E0D] border border-white/10 space-y-4 shadow-xl">
        <h3 className="font-syne text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
          METADATA &amp; BRAND IDENTIFIERS
        </h3>

        <div className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="text-white/70 font-syne">Site Title (SEO Title Tag)</label>
            <input
              type="text"
              value={g.siteTitle}
              onChange={(e) => handleChange("siteTitle", e.target.value)}
              className="w-full bg-[#1A1918] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-white/70 font-syne">Meta Description</label>
            <textarea
              rows={3}
              value={g.metaDescription}
              onChange={(e) => handleChange("metaDescription", e.target.value)}
              className="w-full bg-[#1A1918] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-white/70 font-syne">Official Contact Email</label>
              <input
                type="text"
                value={g.contactEmail}
                onChange={(e) => handleChange("contactEmail", e.target.value)}
                className="w-full bg-[#1A1918] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-white/70 font-syne">Instagram URL</label>
              <input
                type="text"
                value={g.instagramUrl}
                onChange={(e) => handleChange("instagramUrl", e.target.value)}
                className="w-full bg-[#1A1918] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ADVANCED SETTINGS SECTION (COLLAPSED BY DEFAULT - Section 29) */}
      <div className="border border-white/10 rounded-3xl overflow-hidden bg-[#0F0E0D]">
        <button
          onClick={() => setAdvancedOpen(!advancedOpen)}
          className="w-full p-5 bg-[#141312] flex items-center justify-between text-xs font-syne font-bold text-white hover:text-[#D4AF37] transition-colors"
        >
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#D4AF37]" />
            <span className="uppercase tracking-wider">ADVANCED TECHNICAL SETTINGS</span>
          </div>
          {advancedOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {advancedOpen && (
          <div className="p-6 space-y-6 bg-[#0A0A0A] border-t border-white/10 text-xs">
            {/* PERFORMANCE & CACHING */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#D4AF37] font-syne font-bold uppercase">
                <Zap className="w-4 h-4" />
                Performance &amp; Cache Control
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-[#121110] rounded-2xl border border-white/10 space-y-2">
                  <div className="font-syne text-white font-bold">Edge Caching</div>
                  <p className="text-white/50 text-[11px]">Cache published JSON configuration on Vercel CDN edge nodes.</p>
                </div>
                <div className="p-3 bg-[#121110] rounded-2xl border border-white/10 space-y-2">
                  <div className="font-syne text-white font-bold">Image Optimization</div>
                  <p className="text-white/50 text-[11px]">Automatic WebP &amp; AVIF compression for high-res media library uploads.</p>
                </div>
              </div>
            </div>

            {/* DEVELOPER SETTINGS */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#F15E1C] font-syne font-bold uppercase">
                <Shield className="w-4 h-4" />
                Security &amp; API Keys
              </div>
              <div className="space-y-1.5">
                <label className="text-white/60">Strict Content Security Policy (CSP)</label>
                <input
                  type="text"
                  readOnly
                  value="default-src 'self' *.fashai.com; img-src 'self' data: blob: https:;"
                  className="w-full bg-[#121110] border border-white/10 rounded-xl px-3 py-2 text-white/50 font-mono text-[11px]"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
