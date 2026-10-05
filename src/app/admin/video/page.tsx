"use client";

import { useState } from "react";
import { Video, Upload, Trash2, Save, CheckCircle2 } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function VideoLibraryPage() {
  const { config, updateLocalDraftConfig, saveDraft, publish } = useSiteConfig();
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const hero = config.heroSettings || {};

  const handleHeroVideoChange = (key: string, val: string | boolean) => {
    updateLocalDraftConfig((prev) => ({
      ...prev,
      heroSettings: {
        ...prev.heroSettings,
        [key]: val,
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    await saveDraft();
    const ok = await publish("Updated Video Settings and Hero Video Background");
    setSaving(false);
    if (ok) {
      setStatusMessage("Video settings published successfully!");
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-light uppercase tracking-tight text-white">
            VIDEO LIBRARY &amp; BACKGROUND MEDIA
          </h1>
          <p className="font-sans text-xs sm:text-sm text-white/70">
            Configure video backgrounds, poster fallback frames, autoplay, loop, and mobile video options.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#F15E1C] hover:bg-[#e04f10] text-white px-5 py-2.5 rounded-xl font-syne text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-md shrink-0"
        >
          {saving ? <CheckCircle2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>PUBLISH VIDEO SETTINGS</span>
        </button>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-[#2E936F]/15 border border-[#2E936F]/30 text-[#2E936F] text-xs font-syne font-bold">
          {statusMessage}
        </div>
      )}

      {/* HERO BACKGROUND VIDEO CONFIGURATION */}
      <div className="p-6 rounded-2xl bg-[#0F0E0D] border border-white/10 space-y-5">
        <h3 className="font-syne text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
          HERO BACKGROUND VIDEO
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-2">
              HERO VIDEO URL / PATH
            </label>
            <input
              type="text"
              placeholder="e.g. /uploads/hero_cinematic.mp4"
              value={hero.heroVideo || ""}
              onChange={(e) => handleHeroVideoChange("heroVideo", e.target.value)}
              className="w-full bg-[#181715] border border-white/15 text-white text-sm rounded-xl px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-2">
              POSTER IMAGE PATH (PRE-LOAD FRAME)
            </label>
            <input
              type="text"
              value={hero.posterImage || ""}
              onChange={(e) => handleHeroVideoChange("posterImage", e.target.value)}
              className="w-full bg-[#181715] border border-white/15 text-white text-sm rounded-xl px-4 py-3 outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-[#181715] border border-white/10 flex items-center justify-between">
            <span className="text-xs font-syne font-bold uppercase text-white">AUTOPLAY</span>
            <input
              type="checkbox"
              checked={hero.videoAutoplay ?? true}
              onChange={(e) => handleHeroVideoChange("videoAutoplay", e.target.checked)}
              className="w-4 h-4 accent-[#F15E1C]"
            />
          </div>

          <div className="p-4 rounded-xl bg-[#181715] border border-white/10 flex items-center justify-between">
            <span className="text-xs font-syne font-bold uppercase text-white">LOOP PLAYBACK</span>
            <input
              type="checkbox"
              checked={hero.videoLoop ?? true}
              onChange={(e) => handleHeroVideoChange("videoLoop", e.target.checked)}
              className="w-4 h-4 accent-[#F15E1C]"
            />
          </div>

          <div className="p-4 rounded-xl bg-[#181715] border border-white/10 flex items-center justify-between">
            <span className="text-xs font-syne font-bold uppercase text-white">MUTED AUDIO</span>
            <input
              type="checkbox"
              checked={hero.videoMuted ?? true}
              onChange={(e) => handleHeroVideoChange("videoMuted", e.target.checked)}
              className="w-4 h-4 accent-[#F15E1C]"
            />
          </div>
        </div>
      </div>

      {/* MOBILE VIDEO & FALLBACK */}
      <div className="p-6 rounded-2xl bg-[#0F0E0D] border border-white/10 space-y-5">
        <h3 className="font-syne text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
          MOBILE VIDEO &amp; FALLBACK
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-2">
              MOBILE VIDEO PATH (OPTIONAL)
            </label>
            <input
              type="text"
              placeholder="e.g. /uploads/hero_mobile.mp4"
              value={hero.mobileVideo || ""}
              onChange={(e) => handleHeroVideoChange("mobileVideo", e.target.value)}
              className="w-full bg-[#181715] border border-white/15 text-white text-sm rounded-xl px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-2">
              MOBILE FALLBACK IMAGE PATH
            </label>
            <input
              type="text"
              placeholder="e.g. /assets/final/photo-2026-09-18-15.02.32.jpeg"
              value={hero.mobileFallback || ""}
              onChange={(e) => handleHeroVideoChange("mobileFallback", e.target.value)}
              className="w-full bg-[#181715] border border-white/15 text-white text-sm rounded-xl px-4 py-3 outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
