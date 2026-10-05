"use client";

import { useState } from "react";
import { Grid, Plus, Trash2, ArrowUp, ArrowDown, Save, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { GalleryItemConfig } from "@/lib/admin/config-schema";

export default function GalleryManagerPage() {
  const { config, updateLocalDraftConfig, saveDraft, publish } = useSiteConfig();
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const galleryItems = config.galleryItems || [];

  const handleAddItem = () => {
    const newItem: GalleryItemConfig = {
      id: `gal_${Date.now()}`,
      title: "New Gallery Asset",
      image: "/assets/final/photo-2026-09-18-15.02.32.jpeg",
      category: "COUTURE DETAILS",
      caption: "Haute couture presentation",
      altText: "Fashion Showcase",
      published: true,
      featured: false,
      order: galleryItems.length + 1,
    };

    updateLocalDraftConfig((prev) => ({
      ...prev,
      galleryItems: [...prev.galleryItems, newItem],
    }));
  };

  const handleRemoveItem = (id: string) => {
    updateLocalDraftConfig((prev) => ({
      ...prev,
      galleryItems: prev.galleryItems.filter((g) => g.id !== id),
    }));
  };

  const handleItemChange = (id: string, key: keyof GalleryItemConfig, val: any) => {
    updateLocalDraftConfig((prev) => ({
      ...prev,
      galleryItems: prev.galleryItems.map((g) => (g.id === id ? { ...g, [key]: val } : g)),
    }));
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === galleryItems.length - 1)
    ) {
      return;
    }

    const items = [...galleryItems];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    const temp = items[index];
    items[index] = items[targetIdx];
    items[targetIdx] = temp;

    items.forEach((item, idx) => {
      item.order = idx + 1;
    });

    updateLocalDraftConfig((prev) => ({
      ...prev,
      galleryItems: items,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    await saveDraft();
    const ok = await publish("Updated Gallery Manager items");
    setSaving(false);
    if (ok) {
      setStatusMessage("Gallery changes published successfully!");
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-light uppercase tracking-tight text-white">
            GALLERY ARCHIVE MANAGER
          </h1>
          <p className="font-sans text-xs sm:text-sm text-white/70">
            Add, reorder, categorize, and publish gallery retrospective images across approved categories.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAddItem}
            className="bg-[#2E936F] hover:bg-[#257759] text-white px-4 py-2.5 rounded-xl font-syne text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>ADD GALLERY ITEM</span>
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#F15E1C] hover:bg-[#e04f10] text-white px-5 py-2.5 rounded-xl font-syne text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-md shrink-0"
          >
            {saving ? <CheckCircle2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>PUBLISH GALLERY</span>
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-[#2E936F]/15 border border-[#2E936F]/30 text-[#2E936F] text-xs font-syne font-bold">
          {statusMessage}
        </div>
      )}

      {/* GALLERY ITEMS LIST */}
      <div className="space-y-4">
        {galleryItems.map((item, idx) => (
          <div
            key={item.id}
            className={`p-5 rounded-2xl border flex flex-col lg:flex-row lg:items-center justify-between gap-5 transition-all ${
              item.published ? "bg-[#0F0E0D] border-white/10" : "bg-black/40 border-white/5 opacity-60"
            }`}
          >
            <div className="flex items-start gap-4 flex-1">
              {/* Thumbnail */}
              <div className="relative w-20 h-20 bg-black rounded-xl overflow-hidden shrink-0 border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>

              {/* Form Controls */}
              <div className="space-y-3 flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-syne font-bold uppercase text-white/60 mb-1">
                      TITLE
                    </label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleItemChange(item.id, "title", e.target.value)}
                      className="w-full bg-[#181715] border border-white/15 text-white text-xs rounded-lg px-3 py-2 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-syne font-bold uppercase text-white/60 mb-1">
                      CATEGORY
                    </label>
                    <select
                      value={item.category}
                      onChange={(e) => handleItemChange(item.id, "category", e.target.value)}
                      className="w-full bg-[#181715] border border-white/15 text-white text-xs rounded-lg px-3 py-2 outline-none"
                    >
                      <option value="RUNWAY & STAGE">RUNWAY &amp; STAGE</option>
                      <option value="COUTURE DETAILS">COUTURE DETAILS</option>
                      <option value="PEOPLE & MOMENTS">PEOPLE &amp; MOMENTS</option>
                      <option value="ARCHITECTURE & LIGHTING">ARCHITECTURE &amp; LIGHTING</option>
                      <option value="EXPERIENCE">EXPERIENCE</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-syne font-bold uppercase text-white/60 mb-1">
                      IMAGE URL / PATH
                    </label>
                    <input
                      type="text"
                      value={item.image}
                      onChange={(e) => handleItemChange(item.id, "image", e.target.value)}
                      className="w-full bg-[#181715] border border-white/15 text-white text-xs rounded-lg px-3 py-2 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Caption text..."
                    value={item.caption}
                    onChange={(e) => handleItemChange(item.id, "caption", e.target.value)}
                    className="w-full bg-[#181715] border border-white/15 text-white text-xs rounded-lg px-3 py-1.5 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Alt text..."
                    value={item.altText}
                    onChange={(e) => handleItemChange(item.id, "altText", e.target.value)}
                    className="w-full bg-[#181715] border border-white/15 text-white text-xs rounded-lg px-3 py-1.5 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 self-end lg:self-center shrink-0">
              <button
                onClick={() => handleMove(idx, "up")}
                disabled={idx === 0}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 text-white"
                title="Move Up"
              >
                <ArrowUp className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleMove(idx, "down")}
                disabled={idx === galleryItems.length - 1}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 text-white"
                title="Move Down"
              >
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleItemChange(item.id, "published", !item.published)}
                className={`p-2 rounded-lg transition-all ${
                  item.published ? "bg-[#2E936F]/20 text-[#2E936F]" : "bg-white/10 text-white/40"
                }`}
                title={item.published ? "Published (Visible)" : "Unpublished (Hidden)"}
              >
                {item.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>

              <button
                onClick={() => handleRemoveItem(item.id)}
                className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                title="Remove Gallery Item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
