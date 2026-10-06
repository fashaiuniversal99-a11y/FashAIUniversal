export interface BrandInitiative {
  id: string;
  name: string;
  role: string;
  type: "Initiative" | "Platform" | "Service";
  description: string;
  href?: string;
}

export interface BrandFamilyConfig {
  masterBrand: {
    name: string;
    tagline: string;
    description: string;
  };
  parentEntity: {
    name: string;
    lockupText: string;
    role: string;
  };
  initiatives: BrandInitiative[];
}

export const BRAND_FAMILY_DATA: BrandFamilyConfig = {
  masterBrand: {
    name: "FashAI Universal",
    tagline: "International Fashion & Events Platform",
    description:
      "FashAI Universal is the master platform managing haute couture runway productions, corporate activations, brand shoots, and talent orchestration across Dubai, UAE, and Gurgaon, India.",
  },
  parentEntity: {
    name: "Arav Innovations",
    lockupText: "Powered by Arav Innovations",
    role: "Technology & Parent Foundation",
  },
  initiatives: [
    {
      id: "lifestyle",
      name: "LifeStyle",
      role: "Premier International Event Experience",
      type: "Initiative",
      description:
        "An exclusive luxury fashion and lifestyle event series uniting designers, VIP patrons, and international talent in Dubai (LifeStyle 2026).",
      href: "/2026",
    },
    {
      id: "fashprism",
      name: "FashPrism",
      role: "Fashion & Event Showcase Platform",
      type: "Platform",
      description:
        "Regional and international showcase chapters celebrating creative craftsmanship across India (FashPrism India) and global markets.",
      href: "/fashprism-india",
    },
    {
      id: "brand-shoots",
      name: "Brand Shoots",
      role: "Commercial & Editorial Shoot Production",
      type: "Service",
      description:
        "High-end editorial direction, lookbook photography, model casting, and location curation for luxury fashion and corporate brands.",
      href: "/services/brand-shoots-dubai",
    },
  ],
};
