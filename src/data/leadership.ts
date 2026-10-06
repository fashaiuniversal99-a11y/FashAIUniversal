export interface LeadershipMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  location?: string;
  image?: string;
  linkedin?: string;
  isVerified: boolean;
}

/**
 * HUMAN TRUST & LEADERSHIP DATA SOURCE
 * 
 * IMPORTANT BRAND RULES:
 * - Do NOT populate fake names, stock headshots, artificial titles, or invented bios.
 * - Only add team members when real, verified leadership biographies and approved high-resolution headshots exist.
 * - When empty, the UI safely omits empty team placeholders to maintain brand credibility.
 */
export const VERIFIED_LEADERSHIP_MEMBERS: LeadershipMember[] = [];
