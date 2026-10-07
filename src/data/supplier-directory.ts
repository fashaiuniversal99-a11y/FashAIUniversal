export interface OfficeLocation {
  city: string;
  country: string;
  name: string;
  addressLines: string[];
  postalCode?: string;
  mapsUrl?: string;
}

export interface SupplierDirectoryConfig {
  companyName: string;
  legalEntity: string;
  website: string;
  contactEmail: string;
  socials: {
    instagram: string;
    facebook: string;
    linkedin?: string;
    youtube?: string;
  };
  locations: OfficeLocation[];
  coreServices: string[];
  eventFocus: string[];
}

export const OFFICIAL_SUPPLIER_CONFIG: SupplierDirectoryConfig = {
  companyName: "FashAI Universal",
  legalEntity: "FashAI Universal",
  website: "https://www.fashaiuniversal.com",
  contactEmail: "contact@fashaiuniversal.com",
  socials: {
    instagram: "https://www.instagram.com/fashai_universal",
    facebook: "https://www.facebook.com/61594069457693",
    // linkedin & youtube intentionally omitted until official verified URLs are established
  },
  locations: [
    {
      city: "Gurgaon",
      country: "India",
      name: "India Headquarters (HQ)",
      addressLines: [
        "Platinum Floor, 14/23",
        "Ardee City, Sector 52",
        "Gurgaon, Haryana 122002",
        "India"
      ],
      postalCode: "122002",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Platinum+Floor%2C+14%2F23%2C+Ardee+City%2C+Sector+52%2C+Gurgaon%2C+122002"
    },
    {
      city: "Dubai",
      country: "UAE",
      name: "UAE Regional Office",
      addressLines: [
        "55764-001 IFZA Business Park FZCO",
        "Building A1, Dubai Silicon Oasis",
        "Dubai",
        "United Arab Emirates"
      ]
    }
  ],
  coreServices: [
    "Fashion Show Management & Catwalk Production",
    "End-to-End Event Planning & Coordination",
    "Corporate Summits & Luxury Brand Activations",
    "Brand Shoots & Editorial Production",
    "International Talent Solutions & Casting"
  ],
  eventFocus: [
    "LifeStyle 2026 (Dubai, UAE · Date & Venue TBA)",
    "Haute Couture Runway Presentations",
    "Enterprise Summits & Tech Activations",
    "Editorial Lookbooks & Brand Shoots"
  ]
};
