export interface VerifiedTestimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  testimonial: string;
  projectOrEvent?: string;
  image?: string;
  status: "verified" | "pending";
}

/**
 * SINGLE SOURCE OF TRUTH FOR VERIFIED CLIENT/PARTNER TESTIMONIALS.
 * Only render testimonials that are officially supplied and verified.
 * NO generic, unverified, or sample testimonials are stored here.
 */
export const VERIFIED_TESTIMONIALS: VerifiedTestimonial[] = [];

/**
 * Helper function returning only publicly approved and verified testimonials.
 */
export function getVerifiedTestimonials(): VerifiedTestimonial[] {
  return VERIFIED_TESTIMONIALS.filter((t) => t.status === "verified");
}
