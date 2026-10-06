import React from "react";
import { LIFESTYLE_MEDIA_DATA, LifestyleHighlightVideoConfig } from "@/data/lifestyle-media";

interface LifeStyleHighlightVideoProps {
  config?: LifestyleHighlightVideoConfig;
  className?: string;
}

export const LifeStyleHighlightVideo: React.FC<LifeStyleHighlightVideoProps> = ({
  config = LIFESTYLE_MEDIA_DATA.highlightVideo,
  className = "",
}) => {
  if (config.isAvailable && config.videoUrl) {
    return (
      <div className={`relative rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 ${className}`}>
        <video
          controls
          poster={config.posterImageUrl}
          className="w-full aspect-video object-cover"
        >
          <source src={config.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="p-4 bg-neutral-950/80 backdrop-blur-sm border-t border-neutral-800/60">
          <h3 className="text-white font-medium text-lg font-jost">{config.title}</h3>
          <p className="text-xs text-neutral-400 mt-1 font-jost">{config.description}</p>
        </div>
      </div>
    );
  }

  // Pre-event readiness state: Truthful editorial placeholder explaining post-event availability
  return (
    <div
      className={`relative rounded-xl border border-neutral-800/80 bg-neutral-900/40 p-6 text-center backdrop-blur-sm ${className}`}
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-xs uppercase tracking-widest font-jost mb-3">
        <span>Target Duration: ~{config.targetDurationSeconds} Seconds</span>
      </div>
      <h3 className="text-xl font-serif text-white font-dm-serif mb-2">{config.title}</h3>
      <p className="text-sm text-neutral-400 max-w-xl mx-auto font-jost mb-4">
        {config.description}
      </p>
      
      <div className="inline-block px-4 py-2 rounded bg-neutral-950 border border-neutral-800 text-xs text-neutral-400 font-jost">
        <span className="text-[#D4AF37] font-medium mr-2 font-jost">STATUS:</span>
        {config.releaseStatus}
      </div>

      <div className="mt-6 pt-4 border-t border-neutral-800/60 flex flex-wrap justify-center gap-2 text-[11px] text-neutral-500 font-jost">
        <span className="text-neutral-400 font-jost">Distribution Ready:</span>
        {config.platformsReady.map((platform, i) => (
          <span key={platform} className="bg-neutral-800/60 px-2 py-0.5 rounded text-neutral-300 font-jost">
            {platform}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LifeStyleHighlightVideo;
