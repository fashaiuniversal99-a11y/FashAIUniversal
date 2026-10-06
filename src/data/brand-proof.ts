export interface VerifiedPersonRecord {
  id: string;
  name: string;
  title: string;
  organization: string;
  category: "guest" | "creativePartner" | "designer" | "publicFigure";
  image?: string;
  website?: string;
  permissionStatus: "verified" | "permission_granted";
  bio?: string;
}

export interface VerifiedOrganizationRecord {
  id: string;
  name: string;
  category: "partner" | "sponsor" | "mediaPartner" | "creativePartner" | "parentEntity";
  logo?: string;
  website?: string;
  relationship: string;
  permissionStatus: "verified" | "permission_granted";
}

export interface BrandProofData {
  guests: VerifiedPersonRecord[];
  partners: VerifiedOrganizationRecord[];
  sponsors: VerifiedOrganizationRecord[];
  mediaPartners: VerifiedOrganizationRecord[];
  creativePartners: VerifiedOrganizationRecord[];
}

/**
 * Single Source of Truth for verified external proof, guests, and partners.
 * NO fabricated or unverified claims are stored or displayed here.
 */
export const BRAND_PROOF_DATA: BrandProofData = {
  guests: [],
  partners: [
    {
      id: "arav-innovations",
      name: "Arav Innovations",
      category: "parentEntity",
      relationship: "Parent Technology & Platform Foundation",
      permissionStatus: "verified",
    },
  ],
  sponsors: [],
  mediaPartners: [],
  creativePartners: [],
};
