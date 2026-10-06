export type LifestyleMediaCategory =
  | "Runway"
  | "Talent"
  | "VIP / Guests"
  | "Backstage"
  | "Venue"
  | "Production"
  | "Brand Activations"
  | "Sponsor Integrations"
  | "Designer Moments"
  | "Behind the Scenes";

export interface LifestyleMediaAsset {
  id: string;
  url: string;
  thumbnailUrl?: string;
  category: LifestyleMediaCategory;
  altText: string;
  caption?: string;
  photographerCredit?: string;
  approvalStatus: "approved" | "pending_event" | "archival";
  aspectRatio?: "16:9" | "4:3" | "1:1" | "9:16";
  featured?: boolean;
}

export interface LifestyleHighlightVideoConfig {
  id: string;
  title: string;
  description: string;
  targetDurationSeconds: number; // e.g. 60
  videoUrl?: string; // Approved stream or MP4 URL (empty until event occurs and video is edited)
  posterImageUrl?: string;
  isAvailable: boolean;
  releaseStatus: "Post-Event Official Release Pending" | "Available";
  platformsReady: Array<"Homepage" | "Instagram / Reels" | "YouTube" | "LinkedIn" | "Press / Media">;
}

export interface LifestyleMediaInfrastructure {
  eventId: string;
  eventTitle: string;
  eventStatus: "TO BE ANNOUNCED";
  categories: LifestyleMediaCategory[];
  assets: LifestyleMediaAsset[];
  highlightVideo: LifestyleHighlightVideoConfig;
}

/**
 * Reusable Media Infrastructure for LifeStyle Event Photography and Video Coverage.
 * Ready for post-event official media assets.
 * NO fabricated assets or fake event recaps are contained here.
 */
export const LIFESTYLE_MEDIA_DATA: LifestyleMediaInfrastructure = {
  eventId: "lifestyle-2026",
  eventTitle: "LifeStyle 2026",
  eventStatus: "TO BE ANNOUNCED",
  categories: [
    "Runway",
    "Talent",
    "VIP / Guests",
    "Backstage",
    "Venue",
    "Production",
    "Brand Activations",
    "Sponsor Integrations",
    "Designer Moments",
    "Behind the Scenes",
  ],
  assets: [], // Empty until official event photography is captured and verified
  highlightVideo: {
    id: "lifestyle-2026-highlight-film",
    title: "LifeStyle 2026 Official Highlight Film",
    description:
      "Official 60-second highlight reel showcasing runway productions, designer debuts, backstage curation, and VIP moments upon official event staging.",
    targetDurationSeconds: 60,
    isAvailable: false,
    releaseStatus: "Post-Event Official Release Pending",
    platformsReady: ["Homepage", "Instagram / Reels", "YouTube", "LinkedIn", "Press / Media"],
  },
};
