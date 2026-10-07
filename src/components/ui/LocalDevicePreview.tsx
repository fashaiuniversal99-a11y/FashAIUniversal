"use client";

import { useState, useEffect } from "react";
import { Monitor, Smartphone, Tablet, Laptop, X, RotateCcw, Maximize2 } from "lucide-react";

export interface ViewportPreset {
  id: string;
  name: string;
  category: "mobile" | "tablet" | "desktop" | "full";
  width: number | "100%";
  height: number | "100%";
  icon: any;
}

const PRESETS: ViewportPreset[] = [
  { id: "full", name: "Full / Default (100%)", category: "full", width: "100%", height: "100%", icon: Maximize2 },
  { id: "android", name: "OnePlus / Android (360px)", category: "mobile", width: 360, height: 780, icon: Smartphone },
  { id: "iphone-sm", name: "iPhone Small (375px)", category: "mobile", width: 375, height: 667, icon: Smartphone },
  { id: "iphone-pro", name: "iPhone 14/15 Pro (390px)", category: "mobile", width: 390, height: 844, icon: Smartphone },
  { id: "iphone-max", name: "iPhone Pro Max (414px)", category: "mobile", width: 414, height: 896, icon: Smartphone },
  { id: "tablet-portrait", name: "iPad Portrait (768px)", category: "tablet", width: 768, height: 1024, icon: Tablet },
  { id: "tablet-air", name: "iPad Air (820px)", category: "tablet", width: 820, height: 1180, icon: Tablet },
  { id: "tablet-landscape", name: "Tablet Landscape (1024px)", category: "tablet", width: 1024, height: 768, icon: Tablet },
  { id: "laptop", name: "Laptop (1366px)", category: "desktop", width: 1366, height: 768, icon: Laptop },
  { id: "macbook", name: "MacBook Pro (1440px)", category: "desktop", width: 1440, height: 900, icon: Laptop },
  { id: "desktop-fhd", name: "Desktop (1920px)", category: "desktop", width: 1920, height: 1080, icon: Monitor },
  { id: "desktop-2k", name: "Large 2K Display (2560px)", category: "desktop", width: 2560, height: 1440, icon: Monitor },
];

export default function LocalDevicePreview() {
  const [isDev, setIsDev] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activePreset, setActivePreset] = useState<ViewportPreset>(PRESETS[0]);
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait");
  const [iframeUrl, setIframeUrl] = useState<string>("");

  useEffect(() => {
    // Strictly execute in development environment only
    if (process.env.NODE_ENV === "development") {
      setIsDev(true);
      if (typeof window !== "undefined") {
        setIframeUrl(window.location.href);
      }
    }
  }, []);

  if (!isDev) return null; // Zero render in production

  const toggleOrientation = () => {
    setOrientation((prev) => (prev === "portrait" ? "landscape" : "portrait"));
  };

  const getEffectiveWidth = () => {
    if (activePreset.width === "100%") return "100%";
    if (typeof activePreset.width === "number" && typeof activePreset.height === "number") {
      return orientation === "landscape" && activePreset.category !== "full"
        ? `${Math.max(activePreset.width, activePreset.height)}px`
        : `${Math.min(activePreset.width, activePreset.height)}px`;
    }
    return `${activePreset.width}px`;
  };

  return (
    <>
      {/* Subtle Floating Developer Badge (Bottom-Right) */}
      <div className="fixed bottom-4 right-4 z-[9999] pointer-events-auto select-none print:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-[#090807] hover:bg-black text-brand-yellow-golden border border-brand-yellow-golden/60 px-3.5 py-2 rounded-full text-[10px] font-jost font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(250,182,10,0.3)] transition-all hover:scale-105"
          title="Local Development Device Preview Switcher"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>DEV PREVIEW ({activePreset.id.toUpperCase()})</span>
        </button>
      </div>

      {/* Developer Viewport Controller Toolbar Panel */}
      {isOpen && (
        <div className="fixed inset-x-0 bottom-16 z-[9999] flex justify-center px-4 pointer-events-auto print:hidden">
          <div className="bg-[#090909]/95 backdrop-blur-xl border border-brand-yellow-golden/50 p-3 rounded-2xl shadow-2xl max-w-4xl w-full text-white flex flex-col gap-2">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-jost font-bold tracking-wider text-brand-yellow-golden uppercase">
                  LOCAL DEV VIEWPORT PREVIEWER
                </span>
                <span className="text-[9px] font-mono text-white/50">
                  (Strictly Hidden in Production)
                </span>
              </div>
              <div className="flex items-center gap-2">
                {activePreset.category !== "full" && (
                  <button
                    onClick={toggleOrientation}
                    className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-jost flex items-center gap-1 text-white/80"
                    title="Rotate orientation"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{orientation}</span>
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 bg-white/5 hover:bg-white/15 rounded-full text-white/70"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Presets Button List */}
            <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto py-1 max-h-32">
              {PRESETS.map((preset) => {
                const Icon = preset.icon;
                const isSelected = activePreset.id === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => {
                      setActivePreset(preset);
                      if (typeof window !== "undefined") {
                        setIframeUrl(window.location.href);
                      }
                    }}
                    className={`px-2.5 py-1.5 rounded-lg text-[10px] font-jost font-semibold flex items-center gap-1.5 transition-all border ${
                      isSelected
                        ? "bg-brand-yellow-golden text-black border-brand-yellow-golden font-bold shadow-md"
                        : "bg-black/60 text-white/70 border-white/10 hover:border-brand-yellow-golden/50 hover:text-white"
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{preset.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Viewport Live Device Frame (Renders actual live website in simulated device screen) */}
      {activePreset.category !== "full" && (
        <div className="fixed inset-0 top-0 z-[9990] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4">
          {/* Device Top Control Bar */}
          <div
            style={{ width: getEffectiveWidth(), maxWidth: "100%" }}
            className="flex items-center justify-between bg-[#0D0D0D] border border-white/15 px-4 py-2 rounded-t-2xl text-[10px] font-jost font-bold text-white uppercase tracking-wider shadow-lg"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <span className="ml-2 text-brand-yellow-golden">{activePreset.name}</span>
              <span className="text-white/50">({getEffectiveWidth()})</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleOrientation}
                className="hover:text-brand-yellow-golden transition-colors flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> {orientation}
              </button>
              <button
                onClick={() => setActivePreset(PRESETS[0])}
                className="hover:text-brand-yellow-golden transition-colors underline"
              >
                Reset (100% Full View)
              </button>
            </div>
          </div>

          {/* Live Device Screen Canvas */}
          <div
            style={{ width: getEffectiveWidth(), maxWidth: "100%" }}
            className="h-[80vh] border-2 border-brand-yellow-golden/60 rounded-b-2xl shadow-[0_0_60px_rgba(250,182,10,0.35)] bg-black overflow-hidden relative"
          >
            {iframeUrl && (
              <iframe
                src={iframeUrl}
                className="w-full h-full border-0 bg-black"
                title="Local Device Preview Live Screen"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
