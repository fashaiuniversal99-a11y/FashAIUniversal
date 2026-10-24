"use client";

import { useState, useRef, ChangeEvent, DragEvent } from "react";
import Image from "next/image";
import {
  Film,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Save,
  CheckCircle2,
  Eye,
  EyeOff,
  Upload,
  Sliders,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { ProjectShowcaseItem, ProjectShowcaseSettings } from "@/lib/admin/config-schema";

export default function ShowcaseManagerPage() {
  const { config, updateLocalDraftConfig, saveDraft, publish, showToast } = useSiteConfig();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showcaseSettings: ProjectShowcaseSettings = config.projectShowcaseSettings || {
    enabled: true,
    heading: "CINEMATIC RUNWAY RETROSPECTIVE",
    subheading: "A continuous visual showcase from delivered FashPrism editions, live catwalk presentations, and VIP dignitary ceremonies.",
    direction: "left",
    speedSeconds: 40,
    pauseOnHover: true,
    items: [],
  };

  const items = showcaseSettings.items || [];

  const updateSettings = (updater: (prev: ProjectShowcaseSettings) => ProjectShowcaseSettings) => {
    updateLocalDraftConfig((prevConfig) => {
      const current = prevConfig.projectShowcaseSettings || showcaseSettings;
      return {
        ...prevConfig,
        projectShowcaseSettings: updater(current),
      };
    });
  };

  const handleToggleGlobal = () => {
    updateSettings((prev) => ({
      ...prev,
      enabled: !prev.enabled,
    }));
  };

  const handleUpdateItem = (id: string, key: keyof ProjectShowcaseItem, val: any) => {
    updateSettings((prev) => ({
      ...prev,
      items: prev.items.map((it) => (it.id === id ? { ...it, [key]: val } : it)),
    }));
  };

  const handleRemoveItem = (id: string) => {
    updateSettings((prev) => ({
      ...prev,
      items: prev.items.filter((it) => it.id !== id),
    }));
    showToast("Showcase item removed", "info");
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === items.length - 1)
    ) {
      return;
    }

    const newItems = [...items];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    const temp = newItems[index];
    newItems[index] = newItems[targetIdx];
    newItems[targetIdx] = temp;

    newItems.forEach((item, idx) => {
      item.order = idx + 1;
    });

    updateSettings((prev) => ({
      ...prev,
      items: newItems,
    }));
  };

  const handleAddItemManual = () => {
    const newItem: ProjectShowcaseItem = {
      id: `showcase_${Date.now()}`,
      title: "Runway Presentation",
      src: "/assets/projects/showcase/fashprism-runway-showcase-01.webp",
      altText: "FashPrism Runway Showcase photograph",
      enabled: true,
      order: items.length + 1,
    };

    updateSettings((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
    showToast("Added new showcase entry", "info");
  };

  const handleFilesUpload = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;
    setUploading(true);

    const formData = new FormData();
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!allowedTypes.includes(file.type)) {
        showToast(`Skipped ${file.name}: only JPEG, PNG, WebP allowed`, "warning");
        continue;
      }
      if (file.size > 25 * 1024 * 1024) {
        showToast(`Skipped ${file.name}: exceeds 25MB limit`, "warning");
        continue;
      }
      formData.append("files", file);
    }

    try {
      const token = typeof window !== "undefined" ? sessionStorage.getItem("fashai_admin_token") : null;
      const headers: Record<string, string> = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch("/api/admin/media", {
        method: "POST",
        headers,
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.media && data.media.length > 0) {
        const newShowcaseItems: ProjectShowcaseItem[] = data.media.map((med: any, index: number) => ({
          id: `showcase_${Date.now()}_${index}`,
          title: med.altText || med.filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
          src: med.url,
          altText: med.altText || "Fashion Runway Showcase",
          enabled: true,
          order: items.length + index + 1,
        }));

        updateSettings((prev) => ({
          ...prev,
          items: [...prev.items, ...newShowcaseItems],
        }));

        showToast(`✓ Uploaded & added ${newShowcaseItems.length} photograph(s)`, "success");
      } else {
        showToast(data.error || "Failed to upload file(s)", "error");
      }
    } catch (e) {
      console.error(e);
      showToast("Error uploading photographs", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleSaveAndPublish = async () => {
    setSaving(true);
    await saveDraft();
    const ok = await publish("Updated Project Showcase Filmstrip settings and photographs");
    setSaving(false);
    if (ok) {
      setStatusMessage("Showcase filmstrip published to live website!");
      showToast("✓ Showcase changes published to live website", "success");
      setTimeout(() => setStatusMessage(null), 4000);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await handleFilesUpload(e.dataTransfer.files);
    }
  };

  return (
    <div className="space-y-8 select-none">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Film className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-[10px] font-syne tracking-widest text-[#D4AF37] font-bold uppercase">
              PROJECTS PAGE · HORIZONTAL EDITORIAL MARQUEE
            </span>
          </div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-light uppercase tracking-tight text-white">
            PROJECT SHOWCASE FILMSTRIP
          </h1>
          <p className="font-sans text-xs sm:text-sm text-white/70">
            Manage the continuous luxury fashion editorial strip positioned before FashPrism International on the Projects page.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => e.target.files && handleFilesUpload(e.target.files)}
            multiple
            accept="image/jpeg,image/png,image/webp,image/avif"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl font-syne text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
          >
            <Upload className={`w-4 h-4 ${uploading ? "animate-bounce" : ""}`} />
            <span>{uploading ? "UPLOADING..." : "UPLOAD IMAGES"}</span>
          </button>

          <button
            onClick={handleAddItemManual}
            className="bg-[#2E936F] hover:bg-[#257759] text-white px-4 py-2.5 rounded-xl font-syne text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>ADD ITEM</span>
          </button>

          <button
            onClick={handleSaveAndPublish}
            disabled={saving}
            className="bg-[#F15E1C] hover:bg-[#e04f10] text-white px-5 py-2.5 rounded-xl font-syne text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-md shrink-0"
          >
            {saving ? <CheckCircle2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>PUBLISH CHANGES</span>
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-4 rounded-xl bg-[#2E936F]/15 border border-[#2E936F]/30 text-[#2E936F] text-xs font-syne font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* GLOBAL FILMSTRIP CONTROLS */}
      <div className="bg-[#0F0E0D] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <Sliders className="w-5 h-5 text-[#D4AF37]" />
            <div>
              <h2 className="font-serif-display text-lg uppercase text-white font-light">
                MOTION &amp; PRESENTATION CONFIGURATION
              </h2>
              <p className="font-sans text-xs text-white/60">
                Configure continuous animation speed, movement direction, pause behavior, and section copy.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-syne font-bold uppercase text-white/70">
              SHOWCASE STATUS:
            </span>
            <button
              onClick={handleToggleGlobal}
              className={`px-4 py-1.5 rounded-full text-xs font-syne font-bold uppercase tracking-wider transition-all ${
                showcaseSettings.enabled
                  ? "bg-[#2E936F] text-white shadow-sm"
                  : "bg-red-500/20 text-red-400 border border-red-500/30"
              }`}
            >
              {showcaseSettings.enabled ? "ACTIVE / VISIBLE" : "DISABLED / HIDDEN"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Direction */}
          <div>
            <label className="block text-[11px] font-syne font-bold uppercase text-white/70 mb-1.5">
              ANIMATION DIRECTION
            </label>
            <select
              value={showcaseSettings.direction}
              onChange={(e) =>
                updateSettings((prev) => ({
                  ...prev,
                  direction: e.target.value as "left" | "right",
                }))
              }
              className="w-full bg-[#181715] border border-white/15 text-white text-xs rounded-xl px-3 py-2.5 outline-none focus:border-[#D4AF37]"
            >
              <option value="left">Right to Left (Continuous Cinematic)</option>
              <option value="right">Left to Right (Reverse Motion)</option>
            </select>
          </div>

          {/* Speed */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-syne font-bold uppercase text-white/70">
                ANIMATION CYCLE TIME
              </label>
              <span className="text-[11px] font-mono text-[#D4AF37] font-bold">
                {showcaseSettings.speedSeconds}s
              </span>
            </div>
            <input
              type="range"
              min="15"
              max="90"
              step="5"
              value={showcaseSettings.speedSeconds}
              onChange={(e) =>
                updateSettings((prev) => ({
                  ...prev,
                  speedSeconds: Number(e.target.value),
                }))
              }
              className="w-full accent-[#D4AF37] bg-white/10 rounded-lg cursor-pointer h-2"
            />
            <div className="flex justify-between text-[9px] font-mono text-white/40 mt-1">
              <span>15s (Faster)</span>
              <span>40s (Editorial)</span>
              <span>90s (Slow Film)</span>
            </div>
          </div>

          {/* Pause on Hover */}
          <div>
            <label className="block text-[11px] font-syne font-bold uppercase text-white/70 mb-1.5">
              DESKTOP HOVER BEHAVIOR
            </label>
            <button
              onClick={() =>
                updateSettings((prev) => ({
                  ...prev,
                  pauseOnHover: !prev.pauseOnHover,
                }))
              }
              className={`w-full py-2.5 px-3 rounded-xl border text-xs font-syne font-bold uppercase tracking-wider transition-all text-left flex items-center justify-between ${
                showcaseSettings.pauseOnHover
                  ? "bg-[#D4AF37]/15 border-[#D4AF37]/40 text-[#D4AF37]"
                  : "bg-white/5 border-white/10 text-white/60"
              }`}
            >
              <span>{showcaseSettings.pauseOnHover ? "PAUSE ON HOVER: ON" : "PAUSE ON HOVER: OFF"}</span>
              <span className="text-[10px] opacity-75">{showcaseSettings.pauseOnHover ? "ENABLED" : "DISABLED"}</span>
            </button>
          </div>

          {/* Total Count */}
          <div>
            <label className="block text-[11px] font-syne font-bold uppercase text-white/70 mb-1.5">
              ACTIVE PHOTOGRAPHS
            </label>
            <div className="w-full py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white flex items-center justify-between">
              <span>{items.filter((it) => it.enabled !== false).length} Active</span>
              <span className="text-white/40 font-sans">({items.length} Total)</span>
            </div>
          </div>
        </div>

        {/* Section Headings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-white/10">
          <div>
            <label className="block text-[11px] font-syne font-bold uppercase text-white/70 mb-1.5">
              SECTION HEADING
            </label>
            <input
              type="text"
              value={showcaseSettings.heading}
              onChange={(e) =>
                updateSettings((prev) => ({
                  ...prev,
                  heading: e.target.value,
                }))
              }
              className="w-full bg-[#181715] border border-white/15 text-white text-xs rounded-xl px-3 py-2 outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-syne font-bold uppercase text-white/70 mb-1.5">
              SECTION SUBHEADING / ARCHIVE DESCRIPTION
            </label>
            <input
              type="text"
              value={showcaseSettings.subheading}
              onChange={(e) =>
                updateSettings((prev) => ({
                  ...prev,
                  subheading: e.target.value,
                }))
              }
              className="w-full bg-[#181715] border border-white/15 text-white text-xs rounded-xl px-3 py-2 outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>
      </div>

      {/* DRAG & DROP UPLOAD ZONE */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
          isDragging
            ? "border-[#D4AF37] bg-[#D4AF37]/10 scale-[1.01]"
            : "border-white/15 bg-[#0C0B0A] hover:border-white/30"
        }`}
      >
        <div className="max-w-md mx-auto space-y-2">
          <Upload className="w-8 h-8 text-[#D4AF37] mx-auto" />
          <h3 className="font-syne text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
            DRAG &amp; DROP REAL FASHION PHOTOGRAPHS HERE
          </h3>
          <p className="font-sans text-xs text-white/60">
            Supports JPEG, PNG, WebP up to 25MB. Files will be uploaded securely and added to the horizontal filmstrip sequence.
          </p>
        </div>
      </div>

      {/* SHOWCASE PHOTOGRAPHS LIST & REORDERING */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <h2 className="font-serif-display text-xl uppercase text-white font-light">
            SHOWCASE EDITORIAL SEQUENCE ({items.length} ITEMS)
          </h2>
          <span className="text-xs font-syne text-white/60 font-bold uppercase">
            REORDER · RENAME · TOGGLE VISIBILITY
          </span>
        </div>

        {items.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-[#0F0E0D] border border-white/10 text-white/50 text-xs font-syne uppercase">
            No showcase photographs added yet. Click &quot;Upload Images&quot; or &quot;Add Item&quot; above.
          </div>
        ) : (
          items.map((item, idx) => (
            <div
              key={item.id}
              className={`p-4 sm:p-5 rounded-2xl border flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition-all ${
                item.enabled !== false
                  ? "bg-[#0F0E0D] border-white/10 hover:border-[#D4AF37]/40"
                  : "bg-black/40 border-white/5 opacity-50"
              }`}
            >
              <div className="flex items-start gap-4 flex-1">
                {/* Index & Order Badge */}
                <div className="shrink-0 flex flex-col items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10 font-mono text-xs text-[#D4AF37] font-bold mt-2 sm:mt-4">
                  {(idx + 1).toString().padStart(2, "0")}
                </div>

                {/* Thumbnail Preview */}
                <div className="relative w-28 h-20 sm:w-36 sm:h-24 bg-neutral-900 rounded-xl overflow-hidden shrink-0 border border-white/10 shadow-inner">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={item.altText || item.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Metadata Editors */}
                <div className="space-y-2 flex-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-syne font-bold uppercase text-white/60 mb-1">
                        DISPLAY TITLE
                      </label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleUpdateItem(item.id, "title", e.target.value)}
                        className="w-full bg-[#181715] border border-white/15 text-white text-xs rounded-lg px-3 py-1.5 outline-none focus:border-[#D4AF37]"
                        placeholder="e.g. FashPrism Runway Showcase"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-syne font-bold uppercase text-white/60 mb-1">
                        ALT TEXT (ACCESSIBILITY &amp; SEO)
                      </label>
                      <input
                        type="text"
                        value={item.altText || ""}
                        onChange={(e) => handleUpdateItem(item.id, "altText", e.target.value)}
                        className="w-full bg-[#181715] border border-white/15 text-white text-xs rounded-lg px-3 py-1.5 outline-none focus:border-[#D4AF37]"
                        placeholder="Descriptive photographic alt text"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-syne font-bold uppercase text-white/60 mb-1">
                      IMAGE PATH / SOURCE
                    </label>
                    <input
                      type="text"
                      value={item.src}
                      onChange={(e) => handleUpdateItem(item.id, "src", e.target.value)}
                      className="w-full bg-[#181715] border border-white/15 text-white/80 font-mono text-[11px] rounded-lg px-3 py-1.5 outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>

              {/* Order & Visibility Actions */}
              <div className="flex items-center gap-2 self-end lg:self-center shrink-0">
                <button
                  onClick={() => handleMove(idx, "up")}
                  disabled={idx === 0}
                  className="p-2 sm:p-2.5 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 text-white transition-all"
                  title="Move Up in Showcase Sequence"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleMove(idx, "down")}
                  disabled={idx === items.length - 1}
                  className="p-2 sm:p-2.5 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 text-white transition-all"
                  title="Move Down in Showcase Sequence"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleUpdateItem(item.id, "enabled", item.enabled === false ? true : false)}
                  className={`p-2 sm:p-2.5 rounded-xl transition-all ${
                    item.enabled !== false
                      ? "bg-[#2E936F]/20 text-[#2E936F] hover:bg-[#2E936F]/30"
                      : "bg-white/10 text-white/40 hover:bg-white/20"
                  }`}
                  title={item.enabled !== false ? "Visible on Projects Page" : "Hidden from Public"}
                >
                  {item.enabled !== false ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="p-2 sm:p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all"
                  title="Remove from Showcase"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
