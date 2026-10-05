"use client";

import { useState } from "react";
import { Sparkles, Monitor, Tablet, Smartphone, Save, CheckCircle2 } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { HeroSettings } from "@/lib/admin/config-schema";

export default function HeroControlPage() {
  const { config, updateLocalDraftConfig, saveDraft, publish } = useSiteConfig();
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [previewViewport, setPreviewViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const hero = config.heroSettings || {
    title: "INTERNATIONAL FASHION & EVENTS PLATFORM",
    subtitle: "BRIDGING DUBAI, THE UAE & INDIA THROUGH RUNWAY, CULTURE AND CREATIVE TALENT",
    eyebrow: "DUBAI · UAE · INDIA",
    supportingText: "Connecting designers, talent, brands and audiences.",
    ctaText: "SEE UPCOMING",
    ctaUrl: "/upcoming",
    heroImage: "/assets/home/where_fashion_creates_possibilities.png",
    heroFallbackImage: "/assets/final/photo-2026-09-18-15.02.32.jpeg",
    heroVideo: "",
    posterImage: "/assets/home/where_fashion_creates_possibilities.png",
    overlayOpacity: 0.3,
    brightness: 1.0,
    imagePosition: "center",
    videoAutoplay: true,
    videoLoop: true,
    videoMuted: true,
    mobileImage: "",
    mobileVideo: "",
    mobileFallback: "",
  };

  const handleChange = (key: keyof HeroSettings, value: string | number | boolean) => {
    updateLocalDraftConfig((prev) => ({
      ...prev,
      heroSettings: {
        ...prev.heroSettings,
        [key]: value,
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    await saveDraft();
    const ok = await publish("Updated Hero Settings and Media");
    setSaving(false);
    if (ok) {
      setStatusMessage("Hero configuration published successfully!");
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-light uppercase tracking-tight text-white">
            HERO CONTROL &amp; PREVIEW
          </h1>
          <p className="font-sans text-xs sm:text-sm text-white/70">
            Configure Hero text, video/image media, overlay opacity, fallback backup image, and multi-device preview.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#F15E1C] hover:bg-[#e04f10] text-white px-5 py-2.5 rounded-xl font-syne text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-md shrink-0"
        >
          {saving ? <CheckCircle2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>PUBLISH HERO</span>
        </button>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-[#2E936F]/15 border border-[#2E936F]/30 text-[#2E936F] text-xs font-syne font-bold">
          {statusMessage}
        </div>
      )}

      {/* VIEWPORT PREVIEW SWITCHER */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-[#0F0E0D] border border-white/10">
        <span className="font-syne text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
          VIEWPORT PREVIEW MODE:
        </span>
        <div className="flex items-center gap-2">
          {[
            { id: "desktop", label: "DESKTOP", icon: Monitor },
            { id: "tablet", label: "TABLET", icon: Tablet },
            { id: "mobile", label: "MOBILE", icon: Smartphone },
          ].map((vp) => {
            const Icon = vp.icon;
            const isActive = previewViewport === vp.id;
            return (
              <button
                key={vp.id}
                onClick={() => setPreviewViewport(vp.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-syne font-bold transition-all ${
                  isActive ? "bg-[#F15E1C] text-white" : "bg-white/5 text-white/60 hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{vp.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* PREVIEW CONTAINER */}
      <div className="p-4 rounded-2xl bg-[#0F0E0D] border border-white/10 flex justify-center">
        <div
          className={`relative border border-white/20 rounded-xl overflow-hidden bg-black transition-all duration-300 ${
            previewViewport === "desktop"
              ? "w-full aspect-[16/8]"
              : previewViewport === "tablet"
              ? "w-[600px] aspect-[4/3]"
              : "w-[320px] aspect-[9/16]"
          }`}
        >
          {/* Hero Background Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={hero.heroImage || hero.heroFallbackImage}
            alt="Hero Preview"
            style={{
              opacity: hero.brightness,
              objectFit: "cover",
            }}
            className="w-full h-full object-center"
          />

          {/* Overlay */}
          <div
            style={{ backgroundColor: `rgba(0,0,0,${hero.overlayOpacity})` }}
            className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center"
          >
            <div className="text-[10px] sm:text-xs font-syne tracking-[0.25em] text-[#D4AF37] font-bold uppercase mb-2">
              {hero.eyebrow}
            </div>
            <h2 className="font-serif-display text-lg sm:text-2xl lg:text-3xl font-light text-white uppercase leading-tight max-w-lg">
              {hero.title}
            </h2>
            <p className="font-syne text-[10px] sm:text-xs text-white/80 uppercase tracking-wider mt-2 max-w-md">
              {hero.subtitle}
            </p>
            <div className="mt-4">
              <span className="inline-block bg-[#F15E1C] text-white px-4 py-2 rounded-lg font-syne text-xs font-bold uppercase">
                {hero.ctaText} →
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* FORM INPUTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* TEXT EDITING */}
        <div className="p-6 rounded-2xl bg-[#0F0E0D] border border-white/10 space-y-4">
          <h3 className="font-syne text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            HERO TEXT CONTENT
          </h3>

          <div>
            <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-2">
              LOCATION EYEBROW
            </label>
            <input
              type="text"
              value={hero.eyebrow}
              onChange={(e) => handleChange("eyebrow", e.target.value)}
              className="w-full bg-[#181715] border border-white/15 text-white text-sm rounded-xl px-4 py-2.5 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-2">
              HERO TITLE
            </label>
            <input
              type="text"
              value={hero.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full bg-[#181715] border border-white/15 text-white text-sm rounded-xl px-4 py-2.5 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-2">
              SUBTITLE
            </label>
            <input
              type="text"
              value={hero.subtitle}
              onChange={(e) => handleChange("subtitle", e.target.value)}
              className="w-full bg-[#181715] border border-white/15 text-white text-sm rounded-xl px-4 py-2.5 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-2">
                CTA BUTTON TEXT
              </label>
              <input
                type="text"
                value={hero.ctaText}
                onChange={(e) => handleChange("ctaText", e.target.value)}
                className="w-full bg-[#181715] border border-white/15 text-white text-sm rounded-xl px-4 py-2.5 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-2">
                CTA DESTINATION URL
              </label>
              <input
                type="text"
                value={hero.ctaUrl}
                onChange={(e) => handleChange("ctaUrl", e.target.value)}
                className="w-full bg-[#181715] border border-white/15 text-white text-sm rounded-xl px-4 py-2.5 outline-none"
              />
            </div>
          </div>
        </div>

        {/* MEDIA & FALLBACK EDITING */}
        <div className="p-6 rounded-2xl bg-[#0F0E0D] border border-white/10 space-y-4">
          <h3 className="font-syne text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            MEDIA &amp; FALLBACK BACKUP
          </h3>

          <div>
            <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-2">
              PRIMARY HERO IMAGE PATH
            </label>
            <input
              type="text"
              value={hero.heroImage}
              onChange={(e) => handleChange("heroImage", e.target.value)}
              className="w-full bg-[#181715] border border-white/15 text-white text-sm rounded-xl px-4 py-2.5 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-2">
              HERO FALLBACK IMAGE PATH (BACKUP ONLY)
            </label>
            <input
              type="text"
              value={hero.heroFallbackImage}
              onChange={(e) => handleChange("heroFallbackImage", e.target.value)}
              className="w-full bg-[#181715] border border-white/15 text-white text-sm rounded-xl px-4 py-2.5 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-xs font-syne font-bold uppercase text-white/80 mb-2">
                <span>OVERLAY OPACITY</span>
                <span className="text-[#D4AF37]">{hero.overlayOpacity}</span>
              </div>
              <input
                type="range"
                min="0"
                max="0.9"
                step="0.05"
                value={hero.overlayOpacity}
                onChange={(e) => handleChange("overlayOpacity", parseFloat(e.target.value))}
                className="w-full accent-[#F15E1C]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-syne font-bold uppercase text-white/80 mb-2">
                <span>BRIGHTNESS</span>
                <span className="text-[#D4AF37]">{hero.brightness}</span>
              </div>
              <input
                type="range"
                min="0.4"
                max="1.2"
                step="0.05"
                value={hero.brightness}
                onChange={(e) => handleChange("brightness", parseFloat(e.target.value))}
                className="w-full accent-[#F15E1C]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
