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
    src: "/assets/fashprism/india/atelier-silhouette-study.png",
    alt: "Couture designer draping and shaping luxurious fabric on a dress form - Atelier Silhouette Study",
    tag: "FASHPRISM INDIA · ARCHIVE I",
  },
  {
    id: "fp-ind-02",
    title: "GARMENT CRAFTSMANSHIP",
    caption: "Intricate metallic embroidery & modern silhouette tailoring.",
    category: "INDIA",
    src: "/assets/fashprism/india/garment-craftsmanship.png",
    alt: "Close-up of intricate metallic embroidery and couture tailoring - Garment Craftsmanship",
    tag: "COUTURE LOOK",
  },
  {
    id: "fp-ind-03",
    title: "MONOLITH STAGE RETROSPECTIVE",
    caption: "Spatial lighting and runway atmosphere during FashPrism India.",
    category: "INDIA",
    src: "/assets/fashprism/india/monolith-stage-retrospective.png",
    alt: "Architectural runway stage with monolithic structures and champagne-gold lighting - Monolith Stage Retrospective",
    tag: "RUNWAY ART",
  },
  {
    id: "fp-ind-04",
    title: "COUTURE TEXTURE FOCUS",
    caption: "Artisanal detail focus on haute couture materials.",
    category: "INDIA",
    src: "/assets/fashprism/india/couture-texture-focus.png",
    alt: "Close-up of luxurious couture textiles, silk, organza, and embroidery details - Couture Texture Focus",
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
    src: "/assets/fashprism/international/global-runway-showcase.png",
    alt: "International fashion runway presentation with models and dramatic catwalk lighting - Global Runway Showcase",
    tag: "INTERNATIONAL SHOWCASE",
  },
  {
    id: "fp-intl-02",
    title: "INTERNATIONAL COUTURE DIRECTION",
    caption: "Avant-garde tailoring and global fashion expression.",
    category: "INTERNATIONAL",
    src: "/assets/fashprism/international/international-couture-direction.png",
    alt: "Couture designer, atelier, garment fitting, and avant-garde tailoring - International Couture Direction",
    tag: "GLOBAL ATELIER",
  },
  {
    id: "fp-intl-03",
    title: "SPATIAL LIGHT & MONOLITH STAGE",
    caption: "Architectural runway lighting design.",
    category: "INTERNATIONAL",
    src: "/assets/fashprism/international/spatial-light-monolith-stage.png",
    alt: "Architectural runway stage design and spatial lighting installation - Spatial Light & Monolith Stage",
    tag: "STAGE DESIGN",
  },
  {
    id: "fp-intl-04",
    title: "HIGH-FASHION MOTION",
    caption: "Dynamic movement capture from international showcases.",
    category: "INTERNATIONAL",
    src: "/assets/fashprism/international/high-fashion-motion.png",
    alt: "Couture model in motion, flowing fabric, and dynamic runway movement - High-Fashion Motion",
    tag: "RUNWAY MOTION",
  },
];

export const FASHPRISM_VIP_DATA: FashPrismItem[] = [
  {
    id: "fp-vip-01",
    title: "DISTINGUISHED GUEST PORTRAIT",
    caption: "Featured personality attending the FashPrism experience.",
    category: "VIP",
    src: "/assets/fashprism/vip/distinguished-guest-portrait.png",
    alt: "Minimal luxury editorial portrait of a female fashion-event guest in couture evening wear - Distinguished Guest Portrait",
    tag: "VIP GUEST",
  },
  {
    id: "fp-vip-02",
    title: "VIP SALON PARTICIPATION",
    caption: "Industry partner and guest representation.",
    category: "VIP",
    src: "/assets/fashprism/vip/vip-salon-participation.png",
    alt: "VIP fashion event guest with champagne in an intimate luxury reception salon - VIP Salon Participation",
    tag: "FEATURED PERSONALITY",
  },
  {
    id: "fp-vip-03",
    title: "CREATIVE NETWORK DELEGATE",
    caption: "Prominent industry participant from the FashPrism retrospective.",
    category: "VIP",
    src: "/assets/fashprism/vip/creative-network-delegate.png",
    alt: "Fashion-industry creative network delegate in a tailored black suit - Creative Network Delegate",
    tag: "DELEGATE GUEST",
  },
  {
    id: "fp-vip-04",
    title: "EVENT DIGNITARY & PARTNER",
    caption: "Distinguished guest capture from the official showcase.",
    category: "VIP",
    src: "/assets/fashprism/vip/event-dignitary-partner.png",
    alt: "Sophisticated luxury event dignitary and brand partner at couture exhibition - Event Dignitary & Partner",
    tag: "SPECIAL GUEST",
  },
];
