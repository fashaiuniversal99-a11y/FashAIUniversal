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
  startFlow?: "EVENT" | "CREATIVE" | "SPONSORSHIP" | "CONTACT";
}

export function queryKnowledgeBase(queryText: string, siteConfig?: any): ConciergeKnowledgeResponse {
  const q = queryText.toLowerCase().trim();

  // Dynamic values from live site config (Source of Truth)
  const brandName = siteConfig?.footerSettings?.brandName || siteConfig?.globalSettings?.siteTitle || "FashAI Universal";
  const upcomingEventName = siteConfig?.events?.[0]?.title || "LifeStyle 2026";
  const upcomingLocation = siteConfig?.events?.[0]?.location || "Dubai · UAE";

  // 1. GREETINGS & INITIAL WELCOME
  if (q === "hi" || q === "hello" || q === "hey" || q.startsWith("good morning") || q.startsWith("good evening")) {
    return {
      message: `Hi, welcome to ${brandName}. I'm your Event Concierge.\n\nWhat can I help you with today?`,
      quickChips: [
        { id: "qp-plan", label: "Plan an event", actionKey: "START_EVENT_FLOW" },
        { id: "qp-opp", label: "Explore opportunities", actionKey: "JOIN_NETWORK" },
        { id: "qp-q", label: "Ask a question", actionKey: "ASK_QUESTION" },
      ],
    };
  }

  // 1.5 HIRE TALENT DIRECT INTENT
  if (
    q.includes("hire talent") ||
    q.includes("book talent") ||
    q.includes("hire model") ||
    q.includes("book model") ||
    q.includes("hire designer") ||
    q.includes("hire photographer") ||
    q.includes("book photographer") ||
    q.includes("hire stylist") ||
    q.includes("hire makeup") ||
    q.includes("hire choreographer")
  ) {
    return {
      message: `${brandName} connects brands, designers, and event organizers with verified models, designers, choreographers, stylists, photographers, and creative directors.\n\nWould you like to open our dedicated Hire Talent client enquiry form?`,
      navigationTarget: "/hire-talent",
      quickChips: [
        { id: "ht-open", label: "Open Hire Talent Form ↗", actionKey: "NAVIGATE", payload: "/hire-talent" },
        { id: "ht-plan", label: "Plan an Event ↗", actionKey: "START_EVENT_FLOW" },
      ],
    };
  }

  // 2. EVENT PLANNING DIRECT INTENT
  if (
    q.includes("plan an event") ||
    q.includes("organize an event") ||
    q.includes("book an event") ||
    q.includes("host an event") ||
    q.includes("create an event") ||
    q.includes("event planning") ||
    q.includes("fashion show production")
  ) {
    return {
      message: "Absolutely. I'd be happy to help you plan it.\n\nWhat type of event are you considering?",
      startFlow: "EVENT",
      quickChips: [
        { id: "ev-fashion", label: "Fashion Show", actionKey: "SET_EVENT_TYPE", payload: "Fashion Show" },
        { id: "ev-runway", label: "Runway Presentation", actionKey: "SET_EVENT_TYPE", payload: "Runway Presentation" },
        { id: "ev-brand", label: "Brand Activation", actionKey: "SET_EVENT_TYPE", payload: "Brand Activation" },
        { id: "ev-launch", label: "Product Launch", actionKey: "SET_EVENT_TYPE", payload: "Product Launch" },
        { id: "ev-corp", label: "Corporate Event", actionKey: "SET_EVENT_TYPE", payload: "Corporate Event" },
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
      message: `${brandName} is an event management, fashion production, and creative orchestration platform connecting global brands, designers, and talent across Dubai, UAE, and India.\n\nAre you looking to plan an event or explore creative opportunities?`,
      quickChips: [
        { id: "qp-plan", label: "Plan an event", actionKey: "START_EVENT_FLOW" },
        { id: "qp-opp", label: "Explore opportunities", actionKey: "JOIN_NETWORK" },
      ],
    };
  }

  if (q.includes("services") || q.includes("what services") || q.includes("what do you offer")) {
    return {
      message: `${brandName} delivers full event planning & production, creative direction, runway choreography, brand activations, and talent coordination.\n\nAre you looking for a specific service for an upcoming event?`,
      quickChips: [
        { id: "qp-plan", label: "Plan an event", actionKey: "START_EVENT_FLOW" },
        { id: "qp-nav-serv", label: "View services ↗", actionKey: "NAVIGATE", payload: "/services" },
      ],
    };
  }

  // 3. LOCATION & PRESENCE
  if (q.includes("where are you based") || q.includes("location") || q.includes("where is fashai")) {
    return {
      message: `${brandName} operates internationally with primary hubs in Dubai (UAE) and India.\n\nWhere are you planning your upcoming event?`,
      quickChips: [
        { id: "loc-dubai", label: "Dubai / UAE", actionKey: "SET_LOCATION", payload: "Dubai · UAE" },
        { id: "loc-india", label: "India", actionKey: "SET_LOCATION", payload: "India" },
        { id: "loc-other", label: "Other location", actionKey: "SET_LOCATION", payload: "International" },
      ],
    };
  }

  // 4. EVENT QUERIES (LifeStyle 2026, Upcoming)
  if (
    q.includes("what events") ||
    q.includes("upcoming events") ||
    q.includes("tell me about lifestyle") ||
    q.includes("lifestyle 2026")
  ) {
    return {
      message: `${upcomingEventName} is our flagship upcoming fashion & lifestyle experience in ${upcomingLocation}, bringing together runway showcases, luxury activations, and global talent.\n\nWould you like to register, sponsor, or showcase your brand?`,
      quickChips: [
        { id: "qp-reg", label: "Register / Enquire", actionKey: "START_REGISTRATION" },
        { id: "qp-sponsor", label: "Brand Sponsorship", actionKey: "START_SPONSORSHIP" },
        { id: "qp-upcoming", label: "View event page ↗", actionKey: "NAVIGATE", payload: "/upcoming" },
      ],
      navigationTarget: "/upcoming",
    };
  }

  // 5. DESIGNER ROLE & APPLICATION
  if (
    q.includes("designer") ||
    q.includes("fashion designer") ||
    q.includes("i am a designer") ||
    q.includes("i'm a designer") ||
    q.includes("showcase my collection")
  ) {
    return {
      message: "Great! Are you looking to showcase a collection in an upcoming runway presentation, join our designer network, or connect with the team?",
      detectedRole: "fashion_designer",
      startFlow: "CREATIVE",
      quickChips: [
        { id: "qp-des-show", label: "Showcase collection", actionKey: "START_ROLE_APP", payload: "fashion_designer" },
        { id: "qp-des-team", label: "Connect with team", actionKey: "CONTACT_TEAM" },
      ],
    };
  }

  // 6. MODEL ROLE & APPLICATION
  if (
    q.includes("model") ||
    q.includes("become a model") ||
    q.includes("modeling") ||
    q.includes("i am a model") ||
    q.includes("i'm a model")
  ) {
    return {
      message: "Awesome. We casting models for upcoming runway presentations and brand campaigns. Would you like to submit your portfolio?",
      detectedRole: "model",
      startFlow: "CREATIVE",
      quickChips: [
        { id: "qp-mod-sub", label: "Submit portfolio", actionKey: "START_ROLE_APP", payload: "model" },
        { id: "qp-mod-other", label: "Explore other roles", actionKey: "JOIN_NETWORK" },
      ],
    };
  }

  // 7. MAKEUP & STYLIST & CREATOR ROLES
  if (q.includes("makeup") || q.includes("stylist") || q.includes("creator") || q.includes("influencer")) {
    const detectedRole = q.includes("makeup") ? "makeup_artist" : q.includes("stylist") ? "fashion_stylist" : "influencer_creator";
    return {
      message: "We welcome creative talent and visionaries across our international events. Would you like to start your application?",
      detectedRole,
      startFlow: "CREATIVE",
      quickChips: [
        { id: "qp-cr-sub", label: "Start application", actionKey: "START_ROLE_APP", payload: detectedRole },
      ],
    };
  }

  // 8. SPONSORSHIP & PARTNERSHIP
  if (q.includes("sponsor") || q.includes("sponsorship") || q.includes("brand partner") || q.includes("collaborate")) {
    return {
      message: `We offer title, runway showcase, media, and technology partnerships for ${upcomingEventName}.\n\nIs this for a brand partnership, event sponsorship, or media collaboration?`,
      startFlow: "SPONSORSHIP",
      quickChips: [
        { id: "sp-brand", label: "Brand Partnership", actionKey: "START_SPONSORSHIP" },
        { id: "sp-event", label: "Event Sponsorship", actionKey: "START_SPONSORSHIP" },
        { id: "sp-media", label: "Media Collaboration", actionKey: "START_SPONSORSHIP" },
      ],
    };
  }

  // 9. GALLERY & ARCHIVE
  if (q.includes("gallery") || q.includes("photos") || q.includes("past events") || q.includes("work")) {
    return {
      message: "Our Visual Archive features moments from past runway presentations, couture details, and luxury activations.\n\nWould you like to browse the gallery or plan your own event?",
      quickChips: [
        { id: "qp-gal-link", label: "View Visual Archive ↗", actionKey: "NAVIGATE", payload: "/gallery" },
        { id: "qp-gal-plan", label: "Plan an event", actionKey: "START_EVENT_FLOW" },
      ],
      navigationTarget: "/gallery",
    };
  }

  // 10. CONTACT DIRECT
  if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("speak to someone")) {
    return {
      message: "You can reach our senior Concierge team directly for custom event inquiries or brand discussions.\n\nHow can we help you today?",
      quickChips: [
        { id: "qp-ct-send", label: "Send a message", actionKey: "START_CONTACT" },
        { id: "qp-ct-link", label: "View contact page ↗", actionKey: "NAVIGATE", payload: "/contact" },
      ],
    };
  }

  // 11. CONVERSATIONAL FALLBACK (NEVER robotic or Menu-heavy)
  return {
    message: "That sounds interesting! Could you tell me a little more about what you have in mind?",
    quickChips: [
      { id: "fb-plan", label: "Plan an event", actionKey: "START_EVENT_FLOW" },
      { id: "fb-opp", label: "Explore opportunities", actionKey: "JOIN_NETWORK" },
      { id: "fb-contact", label: "Contact team", actionKey: "START_CONTACT" },
    ],
  };
}

