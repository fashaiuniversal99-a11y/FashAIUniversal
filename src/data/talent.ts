export interface ApprovedTalentItem {
  id: string;
  name: string;
  category:
    | "MODELS"
    | "DESIGNERS"
    | "MAKEUP ARTISTS"
    | "STYLISTS"
    | "CHOREOGRAPHERS"
    | "CREATORS"
    | "PUBLIC FIGURES";
  categoryId:
    | "model"
    | "fashion_designer"
    | "makeup_artist"
    | "fashion_stylist"
    | "choreographer"
    | "influencer_creator"
    | "celebrity_public_figure";
  specialty: string;
  location?: string;
  image: string;
  objectPosition?: string;
  isFeatured?: boolean;
}

export const APPROVED_TALENT_ROSTER: ApprovedTalentItem[] = [
  // MODELS
  {
    id: "elena-vance",
    name: "Elena Vance",
    category: "MODELS",
    categoryId: "model",
    specialty: "Couture Principal Runway",
    location: "Dubai, UAE",
    image: "/assets/final/photo-2026-09-18-15.02.32.jpeg",
    objectPosition: "object-top",
    isFeatured: true,
  },
  {
    id: "amara-diop",
    name: "Amara Diop",
    category: "MODELS",
    categoryId: "model",
    specialty: "High Fashion Catwalk Lead",
    location: "Dubai, UAE",
    image: "/assets/final/photo-2026-09-18-15.02.35.jpeg",
    objectPosition: "object-top",
    isFeatured: true,
  },
  {
    id: "viktor-petrov",
    name: "Viktor Petrov",
    category: "MODELS",
    categoryId: "model",
    specialty: "Editorial & Catwalk Model",
    location: "International",
    image: "/assets/final/photo-2026-09-18-15.02.36.jpeg",
    objectPosition: "object-top",
    isFeatured: false,
  },
  {
    id: "kai-takahashi",
    name: "Kai Takahashi",
    category: "MODELS",
    categoryId: "model",
    specialty: "Couture Silhouette Model",
    location: "Tokyo / Dubai",
    image: "/assets/final/photo-2026-09-18-15.02.38.jpeg",
    objectPosition: "object-top",
    isFeatured: false,
  },
  {
    id: "daria-novak",
    name: "Daria Novak",
    category: "MODELS",
    categoryId: "model",
    specialty: "High Fashion Runway Specialist",
    location: "Europe / UAE",
    image: "/assets/final/photo-2026-09-18-15.02.41.jpeg",
    objectPosition: "object-top",
    isFeatured: true,
  },
  {
    id: "astrid-lindqvist",
    name: "Astrid Lindqvist",
    category: "MODELS",
    categoryId: "model",
    specialty: "Runway & Lookbook Model",
    location: "Global Capitals",
    image: "/assets/final/photo-2026-09-18-15.02.44.jpeg",
    objectPosition: "object-top",
    isFeatured: false,
  },
  {
    id: "siddharth-mehta",
    name: "Siddharth Mehta",
    category: "MODELS",
    categoryId: "model",
    specialty: "Couture & Menswear Model",
    location: "Mumbai / Dubai",
    image: "/assets/final/photo-2026-09-18-15.02.45.jpeg",
    objectPosition: "object-top",
    isFeatured: false,
  },
  {
    id: "zoe-chen",
    name: "Zoe Chen",
    category: "MODELS",
    categoryId: "model",
    specialty: "Editorial Runway Model",
    location: "Singapore / Dubai",
    image: "/assets/final/photo-2026-09-18-15.02.47.jpeg",
    objectPosition: "object-top",
    isFeatured: false,
  },
  {
    id: "nia-okonjo",
    name: "Nia Okonjo",
    category: "MODELS",
    categoryId: "model",
    specialty: "High Fashion Catwalk Lead",
    location: "London / Dubai",
    image: "/assets/final/photo-2026-09-18-15.02.48.jpeg",
    objectPosition: "object-top",
    isFeatured: false,
  },

  // DESIGNERS
  {
    id: "valentina-atelier",
    name: "Valentina Atelier",
    category: "DESIGNERS",
    categoryId: "fashion_designer",
    specialty: "Luxury Apparel & Couture Atelier",
    location: "Dubai / Paris",
    image: "/assets/master/designer/designer_01.png",
    objectPosition: "object-top",
    isFeatured: true,
  },
  {
    id: "arav-couture",
    name: "Arav Design House",
    category: "DESIGNERS",
    categoryId: "fashion_designer",
    specialty: "Experimental Silhouette & Garment Direction",
    location: "India / UAE",
    image: "/assets/master/designer/designer_02.jpg",
    objectPosition: "object-top",
    isFeatured: true,
  },

  // MAKEUP ARTISTS
  {
    id: "seraphina-makeup",
    name: "Seraphina V.",
    category: "MAKEUP ARTISTS",
    categoryId: "makeup_artist",
    specialty: "Runway Beauty & Backstage Artistry Lead",
    location: "Dubai, UAE",
    image: "/assets/master/makeup/makeup_01.png",
    objectPosition: "object-top",
    isFeatured: true,
  },
  {
    id: "marcus-beauty",
    name: "Marcus Lin",
    category: "MAKEUP ARTISTS",
    categoryId: "makeup_artist",
    specialty: "Editorial & Stage Makeup Specialist",
    location: "International",
    image: "/assets/master/makeup/makeup_02.png",
    objectPosition: "object-top",
    isFeatured: false,
  },

  // STYLISTS
  {
    id: "chloe-laurent",
    name: "Chloe Laurent",
    category: "STYLISTS",
    categoryId: "fashion_stylist",
    specialty: "Campaign & Lookbook Wardrobe Director",
    location: "Paris / Dubai",
    image: "/assets/master/stylist/stylist_01.png",
    objectPosition: "object-top",
    isFeatured: true,
  },
  {
    id: "ren-tanaka",
    name: "Ren Tanaka",
    category: "STYLISTS",
    categoryId: "fashion_stylist",
    specialty: "Editorial Fashion Stylist",
    location: "Tokyo / UAE",
    image: "/assets/master/stylist/stylist_02.png",
    objectPosition: "object-top",
    isFeatured: false,
  },

  // CHOREOGRAPHERS
  {
    id: "matteo-rossi",
    name: "Matteo Rossi",
    category: "CHOREOGRAPHERS",
    categoryId: "choreographer",
    specialty: "Runway Movement & Catwalk Direction",
    location: "Milan / Dubai",
    image: "/assets/master/choreographer/choreographer.png",
    objectPosition: "object-top",
    isFeatured: true,
  },

  // CREATORS
  {
    id: "aria-digital",
    name: "Aria Vance",
    category: "CREATORS",
    categoryId: "influencer_creator",
    specialty: "Fashion & Lifestyle Storyteller",
    location: "Dubai / London",
    image: "/assets/master/influencers/influencer_01.png",
    objectPosition: "object-top",
    isFeatured: true,
  },
  {
    id: "lucas-visuals",
    name: "Lucas Thorne",
    category: "CREATORS",
    categoryId: "influencer_creator",
    specialty: "Digital Fashion Media & Culture",
    location: "Dubai / Mumbai",
    image: "/assets/master/influencers/influencer_02.png",
    objectPosition: "object-top",
    isFeatured: false,
  },

  // PUBLIC FIGURES
  {
    id: "soraya-al-mansoor",
    name: "Soraya Al-Mansoor",
    category: "PUBLIC FIGURES",
    categoryId: "celebrity_public_figure",
    specialty: "Creative Ambassador & Cultural Patron",
    location: "Dubai, UAE",
    image: "/assets/final/photo-2026-09-18-15.02.34.jpeg",
    objectPosition: "object-top",
    isFeatured: true,
  },
  {
    id: "marcus-aurel",
    name: "Marcus Aurel",
    category: "PUBLIC FIGURES",
    categoryId: "celebrity_public_figure",
    specialty: "VIP Patron & Guest of Honor",
    location: "Dubai / International",
    image: "/assets/final/photo-2026-09-18-15.02.33.jpeg",
    objectPosition: "object-top",
    isFeatured: true,
  },
];

export const getTalentById = (id: string): ApprovedTalentItem | undefined => {
  return APPROVED_TALENT_ROSTER.find((t) => t.id === id);
};

export const getTalentByCategory = (category: string): ApprovedTalentItem[] => {
  if (category === "ALL") return APPROVED_TALENT_ROSTER;
  return APPROVED_TALENT_ROSTER.filter(
    (t) => t.category === category || t.categoryId === category
  );
};
