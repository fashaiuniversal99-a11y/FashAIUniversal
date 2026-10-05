export interface FashPrismItem {
  id: string;
  title: string;
  caption: string;
  category: "INDIA" | "INTERNATIONAL" | "VIP";
  src: string;
  alt: string;
  tag: string;
}

export const FASHPRISM_INDIA_DATA: FashPrismItem[] = [
  {
    id: "fp-ind-01",
    title: "ATELIER SILHOUETTE STUDY",
    caption: "High-couture textile draping and couture identity from the India chapter.",
    category: "INDIA",
    src: "/assets/fashprism/india/photo-2026-09-17-01.36.07.jpeg",
    alt: "FashPrism India Haute Couture Presentation 1",
    tag: "FASHPRISM INDIA · ARCHIVE I",
  },
  {
    id: "fp-ind-02",
    title: "GARMENT CRAFTSMANSHIP",
    caption: "Intricate metallic embroidery & modern silhouette tailoring.",
    category: "INDIA",
    src: "/assets/fashprism/india/photo-2026-09-17-01.36.07-1.jpeg",
    alt: "FashPrism India Garment Craftsmanship 2",
    tag: "COUTURE LOOK",
  },
  {
    id: "fp-ind-03",
    title: "MONOLITH STAGE RETROSPECTIVE",
    caption: "Spatial lighting and runway atmosphere during FashPrism India.",
    category: "INDIA",
    src: "/assets/fashprism/india/photo-2026-09-17-01.36.08.jpeg",
    alt: "FashPrism India Runway Presentation 3",
    tag: "RUNWAY ART",
  },
  {
    id: "fp-ind-04",
    title: "COUTURE TEXTURE FOCUS",
    caption: "Artisanal detail focus on haute couture materials.",
    category: "INDIA",
    src: "/assets/fashprism/india/photo-2026-09-17-01.36.09.jpeg",
    alt: "FashPrism India Atelier Detail 4",
    tag: "TEXTILE STUDY",
  },
  {
    id: "fp-ind-05",
    title: "CATWALK MOVEMENT",
    caption: "Catwalk choreography and model direction.",
    category: "INDIA",
    src: "/assets/fashprism/india/photo-2026-09-17-01.36.09-1.jpeg",
    alt: "FashPrism India Catwalk Movement 5",
    tag: "CHOREOGRAPHY",
  },
  {
    id: "fp-ind-06",
    title: "STAGE ILLUMINATION",
    caption: "Cinematic raytracing and stage lighting geometry.",
    category: "INDIA",
    src: "/assets/fashprism/india/photo-2026-09-17-01.36.09-3.jpeg",
    alt: "FashPrism India Stage Illumination 6",
    tag: "SPATIAL LIGHT",
  },
  {
    id: "fp-ind-07",
    title: "EDITORIAL PORTRAIT",
    caption: "High fashion editorial portrait capture.",
    category: "INDIA",
    src: "/assets/fashprism/india/photo-2026-09-17-01.36.10-1.jpeg",
    alt: "FashPrism India Editorial Portrait 7",
    tag: "EDITORIAL PORTRAIT",
  },
  {
    id: "fp-ind-08",
    title: "BACKSTAGE COMPOSITION",
    caption: "Spontaneous backstage styling and hair-makeup direction.",
    category: "INDIA",
    src: "/assets/fashprism/india/photo-2026-09-17-01.36.10-2.jpeg",
    alt: "FashPrism India Backstage Composition 8",
    tag: "BACKSTAGE PASS",
  },
];

export const FASHPRISM_INTERNATIONAL_DATA: FashPrismItem[] = [
  {
    id: "fp-intl-01",
    title: "GLOBAL RUNWAY SHOWCASE",
    caption: "Cinematic catwalk presentation from the FashPrism International chapter.",
    category: "INTERNATIONAL",
    src: "/assets/fashprism/international/photo-2026-09-17-01.36.09-2.jpeg",
    alt: "FashPrism International Global Runway Showcase 1",
    tag: "INTERNATIONAL SHOWCASE",
  },
  {
    id: "fp-intl-02",
    title: "INTERNATIONAL COUTURE DIRECTION",
    caption: "Avant-garde tailoring and global fashion expression.",
    category: "INTERNATIONAL",
    src: "/assets/fashprism/international/photo-2026-09-17-01.36.10.jpeg",
    alt: "FashPrism International Couture Direction 2",
    tag: "GLOBAL ATELIER",
  },
  {
    id: "fp-intl-03",
    title: "SPATIAL LIGHT & MONOLITH STAGE",
    caption: "Architectural runway lighting design.",
    category: "INTERNATIONAL",
    src: "/assets/fashprism/international/photo-2026-09-17-01.36.10-2.jpeg",
    alt: "FashPrism International Stage Lighting 3",
    tag: "STAGE DESIGN",
  },
  {
    id: "fp-intl-04",
    title: "HIGH-FASHION MOTION",
    caption: "Dynamic movement capture from international showcases.",
    category: "INTERNATIONAL",
    src: "/assets/fashprism/international/photo-2026-09-17-01.36.11.jpeg",
    alt: "FashPrism International Motion 4",
    tag: "RUNWAY MOTION",
  },
];

export const FASHPRISM_VIP_DATA: FashPrismItem[] = [
  {
    id: "fp-vip-01",
    title: "DISTINGUISHED GUEST PORTRAIT",
    caption: "Featured personality attending the FashPrism experience.",
    category: "VIP",
    src: "/assets/fashprism/vip/photo-2026-09-17-01.36.11-1.jpeg",
    alt: "VIP Guest Portrait 1",
    tag: "VIP GUEST",
  },
  {
    id: "fp-vip-02",
    title: "VIP SALON PARTICIPATION",
    caption: "Industry partner and guest representation.",
    category: "VIP",
    src: "/assets/fashprism/vip/photo-2026-09-17-01.36.11-2.jpeg",
    alt: "VIP Guest Portrait 2",
    tag: "FEATURED PERSONALITY",
  },
  {
    id: "fp-vip-03",
    title: "CREATIVE NETWORK DELEGATE",
    caption: "Prominent industry participant from the FashPrism retrospective.",
    category: "VIP",
    src: "/assets/fashprism/vip/photo-2026-09-17-01.36.11-3.jpeg",
    alt: "VIP Guest Portrait 3",
    tag: "DELEGATE GUEST",
  },
  {
    id: "fp-vip-04",
    title: "EVENT DIGNITARY & PARTNER",
    caption: "Distinguished guest capture from the official showcase.",
    category: "VIP",
    src: "/assets/fashprism/vip/photo-2026-09-17-01.36.12.jpeg",
    alt: "VIP Guest Portrait 4",
    tag: "SPECIAL GUEST",
  },
];
