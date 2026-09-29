export interface QuickChip {
  id: string;
  label: string;
  actionKey: string;
  payload?: string;
}

export interface ConciergeKnowledgeResponse {
  message: string;
  quickChips?: QuickChip[];
  navigationTarget?: string;
  detectedRole?: string;
  startFlow?: "EVENT_PLANNING" | "CREATIVE" | "SPONSORSHIP" | "REGISTRATION" | "CONTACT";
}

export function queryKnowledgeBase(queryText: string, siteConfig?: any): ConciergeKnowledgeResponse {
  const q = queryText.toLowerCase().trim();

  // Dynamic values from live site config (Source of Truth)
  const brandName = siteConfig?.footerSettings?.brandName || siteConfig?.globalSettings?.siteTitle || "FashAI Universal";
  const upcomingEventName = siteConfig?.events?.[0]?.title || "LifeStyle 2026";
  const upcomingLocation = siteConfig?.events?.[0]?.location || "Dubai · UAE";

  // 1. GREETINGS & GENERAL BRAND INTENT
  if (q === "hi" || q === "hello" || q === "hey" || q.startsWith("good morning") || q.startsWith("good evening")) {
    return {
      message: `Hi, welcome to ${brandName}.\nI'm your Event Concierge. How can I help you today?`,
      quickChips: [
        { id: "qp-plan", label: "Plan an event ✦", actionKey: "START_EVENT_FLOW" },
        { id: "qp-opp", label: "Explore opportunities ✦", actionKey: "JOIN_NETWORK" },
        { id: "qp-ask", label: "Ask a question", actionKey: "ASK_QUESTION" },
      ],
    };
  }

  // 2. EVENT PLANNING INTENT TRIGGER
  if (
    q.includes("plan an event") ||
    q.includes("organize an event") ||
    q.includes("book an event") ||
    q.includes("want to organize") ||
    q.includes("want an event") ||
    q.includes("host an event") ||
    q.includes("plan event") ||
    q.includes("event management") ||
    q.includes("event production")
  ) {
    return {
      message: "Target event established! I'd be happy to assist you in planning, producing, and executing your event with FashAI Universal.\n\nWhat type of event are you considering?",
      startFlow: "EVENT_PLANNING",
      quickChips: [
        { id: "et-fashion", label: "Fashion Show / Runway", actionKey: "SET_EVENT_TYPE", payload: "Fashion Show" },
        { id: "et-launch", label: "Brand Launch / Activation", actionKey: "SET_EVENT_TYPE", payload: "Brand Launch" },
        { id: "et-[#111111]", label: "Corporate Event / Summit", actionKey: "SET_EVENT_TYPE", payload: "Corporate Summit" },
      ],
    };
  }

  if (
    q.includes("what is fashai") ||
    q.includes("tell me about fashai") ||
    q.includes("what do you do") ||
    q.includes("what is this website") ||
    q.includes("who are you")
  ) {
    return {
      message: `${brandName} is a premier fashion show production and computational experience house connecting designers, talent, luxury brands, and global events across Dubai, the UAE, and India.`,
      quickChips: [
        { id: "qp-plan", label: "Plan an event ✦", actionKey: "START_EVENT_FLOW" },
        { id: "qp-services", label: "Our Services", actionKey: "NAVIGATE", payload: "/services" },
        { id: "qp-join", label: "Join Network", actionKey: "JOIN_NETWORK" },
      ],
    };
  }

  if (q.includes("how can you help") || q.includes("what can i do here") || q.includes("i want to know more")) {
    return {
      message: `I can guide you through planning your custom event, exploring upcoming runway showcases, applying to our global talent network, or establishing a luxury brand partnership.`,
      quickChips: [
        { id: "qp-plan", label: "Plan an event ✦", actionKey: "START_EVENT_FLOW" },
        { id: "qp-opp", label: "Explore opportunities", actionKey: "JOIN_NETWORK" },
        { id: "qp-contact", label: "Contact Concierge", actionKey: "CONTACT_TEAM" },
      ],
    };
  }

  // 3. LOCATION & SERVICES INQUIRIES
  if (q.includes("where are you based") || q.includes("location") || q.includes("where is fashai")) {
    return {
      message: `${brandName} operates internationally with strategic hubs in Dubai, United Arab Emirates, and India. Are you planning an event in one of these regions?`,
      quickChips: [
        { id: "qp-plan-dubai", label: "Plan event in Dubai", actionKey: "START_EVENT_FLOW", payload: "Dubai" },
        { id: "qp-contact", label: "Contact team", actionKey: "CONTACT_TEAM" },
      ],
    };
  }

  if (q.includes("what services") || q.includes("services do you offer") || q.includes("services you provide") || q.includes("service list")) {
    return {
      message: `${brandName} delivers end-to-end event planning & production, runway creative direction, talent & model coordination, AI computational design, and luxury brand activations.\n\nAre you looking for a specific service for an upcoming event?`,
      quickChips: [
        { id: "qp-plan", label: "Plan an event ✦", actionKey: "START_EVENT_FLOW" },
        { id: "qp-services-page", label: "View Services Page ↗", actionKey: "NAVIGATE", payload: "/services" },
      ],
    };
  }

  // 4. EVENT QUERIES (LifeStyle, Runway, Upcoming)
  if (
    q.includes("what events") ||
    q.includes("upcoming events") ||
    q.includes("what is upcoming") ||
    q.includes("tell me about lifestyle") ||
    q.includes("what is lifestyle") ||
    q.includes("tell me about runway") ||
    q.includes("runway event") ||
    q.includes("lifestyle event") ||
    q.includes("event details") ||
    q === "show upcoming" ||
    q === "upcoming"
  ) {
    return {
      message: `${upcomingEventName} is our upcoming flagship international fashion & lifestyle experience in ${upcomingLocation}, featuring runway presentations, couture showcases, and global VIP talent.`,
      quickChips: [
        { id: "qp-nav-upcoming", label: "View Upcoming Page ↗", actionKey: "NAVIGATE", payload: "/upcoming" },
        { id: "qp-reg", label: "Enquire / Attend", actionKey: "START_REGISTRATION" },
        { id: "qp-sponsor", label: "Sponsorship Enquiry", actionKey: "START_SPONSORSHIP" },
      ],
      navigationTarget: "/upcoming",
    };
  }

  // Specific Date/Venue Guardrail
  if (
    q.includes("where is the event") ||
    q.includes("when is the event") ||
    q.includes("exact date") ||
    q.includes("exact venue") ||
    q.includes("ticket price") ||
    q.includes("ticket cost")
  ) {
    return {
      message: "Venue and schedule details are shared with registered partners and guests. Would you like to register your interest with our Concierge team?",
      quickChips: [
        { id: "qp-reg", label: "Register interest", actionKey: "START_REGISTRATION" },
        { id: "qp-sponsor", label: "Sponsorship", actionKey: "START_SPONSORSHIP" },
      ],
    };
  }

  // 5. TALENT & ROLES (DESIGNER, MODEL, MAKEUP, STYLIST, CREATOR, CELEBRITY)
  if (
    q.includes("designer") ||
    q.includes("fashion designer") ||
    q.includes("showcase my designs") ||
    q.includes("i am a designer") ||
    q.includes("i'm a designer")
  ) {
    return {
      message: "Great! Are you looking to participate in an upcoming runway showcase, present your collection, or connect with the FashAI team?",
      detectedRole: "fashion_designer",
      startFlow: "CREATIVE",
      quickChips: [
        { id: "qp-start-designer", label: "Showcase collection", actionKey: "START_ROLE_APP", payload: "fashion_designer" },
        { id: "qp-sponsor", label: "Brand partnership", actionKey: "START_SPONSORSHIP" },
      ],
    };
  }

  if (
    q.includes("model") ||
    q.includes("become a model") ||
    q.includes("modeling") ||
    q.includes("i am a model") ||
    q.includes("i'm a model")
  ) {
    return {
      message: "Wonderful! We coordinate models for runway showcases, brand shoots, and global events. Would you like to submit your portfolio to our network?",
      detectedRole: "model",
      startFlow: "CREATIVE",
      quickChips: [
        { id: "qp-start-model", label: "Submit model profile", actionKey: "START_ROLE_APP", payload: "model" },
      ],
    };
  }

  if (q.includes("makeup") || q.includes("make up") || q.includes("makeup artist")) {
    return {
      message: "Applications are open for editorial and runway makeup artists across Dubai and international editions. Would you like to submit your work?",
      detectedRole: "makeup_artist",
      startFlow: "CREATIVE",
      quickChips: [
        { id: "qp-start-makeup", label: "Submit MUA details", actionKey: "START_ROLE_APP", payload: "makeup_artist" },
      ],
    };
  }

  if (q.includes("stylist") || q.includes("fashion stylist") || q.includes("styling")) {
    return {
      message: "We collaborate with editorial and fashion stylists for runway production and brand activations. Would you like to apply to our network?",
      detectedRole: "fashion_stylist",
      startFlow: "CREATIVE",
      quickChips: [
        { id: "qp-start-stylist", label: "Submit stylist profile", actionKey: "START_ROLE_APP", payload: "fashion_stylist" },
      ],
    };
  }

  if (q.includes("influencer") || q.includes("creator") || q.includes("content creator")) {
    return {
      message: "We collaborate with fashion creators and influencers for event access and brand partnerships. Would you like to connect with our media team?",
      detectedRole: "influencer_creator",
      startFlow: "CREATIVE",
      quickChips: [
        { id: "qp-start-creator", label: "Apply as Creator", actionKey: "START_ROLE_APP", payload: "influencer_creator" },
      ],
    };
  }

  // 6. SPONSORSHIP & BRAND PARTNERSHIPS
  if (
    q.includes("sponsor") ||
    q.includes("sponsorship") ||
    q.includes("collaborate") ||
    q.includes("brand partner") ||
    q.includes("work with you") ||
    q.includes("partnership")
  ) {
    return {
      message: "FashAI Universal offers title, runway showcase, media, and tech sponsorship opportunities. Is this for a brand partnership, event sponsorship, or showcase collaboration?",
      startFlow: "SPONSORSHIP",
      quickChips: [
        { id: "qp-start-sp", label: "Start sponsorship enquiry", actionKey: "START_SPONSORSHIP" },
        { id: "qp-contact", label: "Contact Concierge", actionKey: "CONTACT_TEAM" },
      ],
    };
  }

  // 7. GALLERY & VISUAL ARCHIVE
  if (q.includes("gallery") || q.includes("photos") || q.includes("previous events") || q.includes("lookbook") || q.includes("archive")) {
    return {
      message: "Our Visual Archive showcases moments across Runway & Stage, Couture Details, and VIP Experience.",
      quickChips: [
        { id: "qp-nav-gallery", label: "View Visual Archive ↗", actionKey: "NAVIGATE", payload: "/gallery" },
        { id: "qp-events", label: "Upcoming Events", actionKey: "EXPLORE_EVENTS" },
      ],
      navigationTarget: "/gallery",
    };
  }

  // 8. CONTACT & REACH OUT
  if (q.includes("contact") || q.includes("reach out") || q.includes("speak to someone") || q.includes("talk to human")) {
    return {
      message: "You can reach the FashAI Universal Concierge team directly or submit a message here.",
      quickChips: [
        { id: "qp-start-contact", label: "Send a message", actionKey: "START_CONTACT" },
        { id: "qp-nav-contact", label: "Contact Page ↗", actionKey: "NAVIGATE", payload: "/contact" },
      ],
      navigationTarget: "/contact",
    };
  }

  // 9. CONVERSATIONAL FALLBACK (NEVER BLIND ASSUMPTION OR DUMP OF 6 CHIPS)
  return {
    message: "I'd be happy to help with that! Could you tell me a bit more about what you're looking for — are you planning an event, exploring talent opportunities, or reaching out for a brand collaboration?",
    quickChips: [
      { id: "qp-plan", label: "Plan an event ✦", actionKey: "START_EVENT_FLOW" },
      { id: "qp-opp", label: "Explore opportunities ✦", actionKey: "JOIN_NETWORK" },
      { id: "qp-sponsor", label: "Brand partnership ✦", actionKey: "START_SPONSORSHIP" },
    ],
  };
}
