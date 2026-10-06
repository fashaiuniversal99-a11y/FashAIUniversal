/**
 * FashAI Universal Centralized Conversion & Analytics Tracker
 * Handles event measurement across forms, CTAs, talent requests, and sponsorship flows.
 * Strictly enforces PII protection and snake_case event naming conventions.
 * Supports GA4, Meta Pixel, and LinkedIn Insight Tag configuration safely.
 */

export type CtaLocation =
  | "header"
  | "hero"
  | "talent_section"
  | "services"
  | "lifestyle_2026"
  | "final_conversion"
  | "final_cta"
  | "how_it_works"
  | "sticky_button"
  | "mobile_menu"
  | "footer";

export interface EventParameters {
  location?: CtaLocation | string;
  source?: string;
  page?: string;
  talent_category?: string;
  talent_id?: string;
  mode?: string;
  ref_num?: string;
  [key: string]: unknown;
}

export type AnalyticsEventName =
  | "plan_event_click"
  | "hire_talent_click"
  | "apply_talent_click"
  | "contact_click"
  | "event_form_start"
  | "event_form_submit"
  | "talent_form_start"
  | "talent_form_submit"
  | "sponsorship_form_start"
  | "sponsorship_form_submit"
  | "talent_request_click"
  | "sponsorship_cta_click"
  | "sponsorship_deck_download"
  | "whatsapp_click"
  | "phone_click"
  | "email_click";

// Blacklist of personal fields that must NEVER be sent to analytics
const PII_KEYS = new Set([
  "name",
  "fullname",
  "email",
  "phone",
  "whatsapp",
  "message",
  "eventdescription",
  "sponsorshiprequirements",
  "additionalrequirements",
  "bio",
  "address",
  "password",
]);

function sanitizeParams(params?: EventParameters): Record<string, unknown> {
  if (!params) return {};
  const clean: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(params)) {
    if (PII_KEYS.has(key.toLowerCase())) {
      continue; // Strictly omit PII
    }
    clean[key] = value;
  }
  return clean;
}

export function trackEvent(eventName: AnalyticsEventName, params?: EventParameters): void {
  if (typeof window === "undefined") return;

  const sanitized = sanitizeParams(params);

  // 1. Log structured event in non-production environments
  if (process.env.NODE_ENV !== "production") {
    console.log(`[FashAI Conversion Event]: ${eventName}`, sanitized);
  }

  // 2. Dispatch custom DOM event for decoupled integrations
  try {
    const customEvent = new CustomEvent("fashai_analytics_event", {
      detail: { eventName, params: sanitized, timestamp: new Date().toISOString() },
    });
    window.dispatchEvent(customEvent);
  } catch {}

  // 3. Config-driven GA4 integration (safe no-op when unconfigured)
  const gaId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (gaId && typeof (window as any).gtag === "function") {
    try {
      (window as any).gtag("event", eventName, sanitized);
    } catch (e) {
      console.warn("GA4 event tracking error:", e);
    }
  }

  // 4. Config-driven Meta Pixel integration (safe no-op when unconfigured)
  const metaId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (metaId && typeof (window as any).fbq === "function") {
    try {
      (window as any).fbq("trackCustom", eventName, sanitized);
    } catch (e) {
      console.warn("Meta Pixel tracking error:", e);
    }
  }

  // 5. Config-driven LinkedIn Insight Tag integration (safe no-op when unconfigured)
  const linkedInId = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID;
  if (linkedInId && typeof (window as any).lintrk === "function") {
    try {
      (window as any).lintrk("track", { conversion_id: eventName });
    } catch (e) {
      console.warn("LinkedIn tracking error:", e);
    }
  }
}
