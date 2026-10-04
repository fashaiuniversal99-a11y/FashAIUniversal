export interface LifestyleEventData {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  isConfirmed: boolean;
  dateDisplay: string;
  venueDisplay: string;
  dressCode: string;
  badge: string;
  description: string;
  announcement: string;
  waitingListCtaText: string;
  waitingListCtaUrl: string;
}

export const LIFESTYLE_2026: LifestyleEventData = {
  id: "lifestyle-2026",
  title: "LIFESTYLE 2026",
  subtitle: "AN INTERNATIONAL FASHION & LIFESTYLE EXPERIENCE",
  location: "DUBAI · UNITED ARAB EMIRATES",
  isConfirmed: false, // Date & Venue unconfirmed -> trigger waiting list fallback
  dateDisplay: "TO BE ANNOUNCED",
  venueDisplay: "TO BE ANNOUNCED",
  dressCode: "HAUTE COUTURE",
  badge: "JOIN THE WAITING LIST",
  description:
    "An international fashion and lifestyle experience bringing together global designers, runway talent, luxury brands, and delegates in Dubai.",
  announcement: "OFFICIAL DATE & VENUE ANNOUNCEMENT PENDING",
  waitingListCtaText: "JOIN THE WAITING LIST",
  waitingListCtaUrl: "/contact?type=WaitingList",
};
