"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, ArrowUpRight, Check, RefreshCw } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { queryKnowledgeBase, QuickChip, ConciergeKnowledgeResponse } from "@/lib/concierge/knowledge";

interface MessageItem {
  id: string;
  sender: "bot" | "user";
  text: string;
  quickChips?: QuickChip[];
  navigationTarget?: string;
  reviewSummary?: {
    title: string;
    details: Array<{ label: string; value: string }>;
    onConfirm: () => void;
    onReset?: () => void;
  };
  timestamp: string;
}

interface ConciergePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

// Intelligent Entity Extractor
function extractEntities(input: string, currentData: Record<string, string>): Record<string, string> {
  const data = { ...currentData };
  const lower = input.toLowerCase();

  // Email extraction
  const emailMatch = input.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch && !data.email) {
    data.email = emailMatch[0];
  }

  // Phone / WhatsApp extraction
  const phoneMatch = input.match(/\+?\d[\d\s-]{7,14}\d/);
  if (phoneMatch && !data.phone && !data.whatsapp) {
    data.phone = phoneMatch[0];
    data.whatsapp = phoneMatch[0];
  }

  // Event Type extraction
  if (!data.eventType) {
    if (lower.includes("fashion show") || lower.includes("runway")) data.eventType = "Fashion Show";
    else if (lower.includes("brand launch") || lower.includes("product launch")) data.eventType = "Brand Launch";
    else if (lower.includes("corporate") || lower.includes("summit") || lower.includes("conference")) data.eventType = "Corporate Summit";
    else if (lower.includes("lifestyle")) data.eventType = "Lifestyle Event";
    else if (lower.includes("shoot") || lower.includes("brand shoot")) data.eventType = "Brand Shoot";
  }

  // Location extraction
  if (!data.location && !data.city) {
    if (lower.includes("dubai")) data.location = "Dubai";
    else if (lower.includes("mumbai")) data.location = "Mumbai";
    else if (lower.includes("abu dhabi")) data.location = "Abu Dhabi";
    else if (lower.includes("delhi")) data.location = "Delhi";
    else if (lower.includes("india")) data.location = "India";
    else if (lower.includes("uae")) data.location = "UAE";
  }

  // Date / Month extraction
  if (!data.preferredDate) {
    const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
    for (const m of months) {
      if (lower.includes(m)) {
        data.preferredDate = m.charAt(0).toUpperCase() + m.slice(1);
        break;
      }
    }
    if (!data.preferredDate && (lower.includes("next month") || lower.includes("q1") || lower.includes("q2") || lower.includes("q3") || lower.includes("q4") || lower.includes("2026"))) {
      data.preferredDate = input.trim();
    }
  }

  // Guest count extraction
  if (!data.guestCount) {
    const numberMatch = input.match(/\b(\d{2,5})\b\s*(guests|people|attendees)?/i);
    if (numberMatch) {
      data.guestCount = `${numberMatch[1]} guests`;
    }
  }

  // Name extraction (e.g. "I am Rahul", "My name is Rahul", "I'm Rahul from XYZ")
  if (!data.fullName) {
    const nameMatch = input.match(/(?:i'm|i am|my name is|this is)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i);
    if (nameMatch) {
      data.fullName = nameMatch[1];
    }
  }

  // Company extraction (e.g. "from XYZ Fashion", "representing XYZ")
  if (!data.company) {
    const companyMatch = input.match(/(?:from|representing|brand|company)\s+([A-Z0-9\s&'-]+?)(?:\s+in|\s+and|\s+for|\.|$)/i);
    if (companyMatch && companyMatch[1].trim().length > 2) {
      data.company = companyMatch[1].trim();
    }
  }

  return data;
}

export default function ConciergePanel({ isOpen, onClose }: ConciergePanelProps) {
  const router = useRouter();
  const { config } = useSiteConfig();

  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Guided Multi-Step Conversational State
  const [activeFlow, setActiveFlow] = useState<"EVENT_PLANNING" | "CREATIVE" | "SPONSORSHIP" | "REGISTRATION" | "CONTACT" | null>(null);
  const [flowRole, setFlowRole] = useState<string | null>(null);
  const [flowStep, setFlowStep] = useState<number>(0);
  const [flowData, setFlowData] = useState<Record<string, string>>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom whenever messages or typing state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, isLoading]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Clean Opening Greeting (No top category bar, directly conversational)
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      setMessages([
        {
          id: "msg-init",
          sender: "bot",
          text: "Hi, welcome to FashAI Universal.\n\nI'm your Event Concierge. How can I help you today?",
          timestamp: time,
          quickChips: [
            { id: "qp-plan", label: "Plan an event ✦", actionKey: "START_EVENT_FLOW" },
            { id: "qp-opp", label: "Explore opportunities ✦", actionKey: "JOIN_NETWORK" },
            { id: "qp-ask", label: "Ask a question", actionKey: "ASK_QUESTION" },
          ],
        },
      ]);
    }
  }, [isOpen, messages.length]);

  // Helper to append Bot Message directly
  const addBotMessage = (
    text: string,
    chips?: QuickChip[],
    navTarget?: string,
    summary?: MessageItem["reviewSummary"]
  ) => {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [
      ...prev,
      {
        id: "bot-" + Date.now() + Math.random(),
        sender: "bot",
        text,
        quickChips: chips,
        navigationTarget: navTarget,
        reviewSummary: summary,
        timestamp: time,
      },
    ]);
  };

  // Helper to append User Message
  const addUserMessage = (text: string) => {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [
      ...prev,
      {
        id: "user-" + Date.now() + Math.random(),
        sender: "user",
        text,
        timestamp: time,
      },
    ]);
  };

  // MANDATORY TYPING DELAY & QUEUE ENGINE
  const queueBotResponse = async (
    generator: () => Promise<{ text: string; chips?: QuickChip[]; navTarget?: string; summary?: MessageItem["reviewSummary"] }> | { text: string; chips?: QuickChip[]; navTarget?: string; summary?: MessageItem["reviewSummary"] },
    onComplete?: () => void
  ) => {
    setIsTyping(true);
    setIsLoading(true);

    const startTime = Date.now();
    let res: { text: string; chips?: QuickChip[]; navTarget?: string; summary?: MessageItem["reviewSummary"] };

    try {
      res = await generator();
    } catch {
      res = {
        text: "I experienced a temporary network connection issue. How else can I assist your enquiry?",
        chips: [
          { id: "err-plan", label: "Plan an event ✦", actionKey: "START_EVENT_FLOW" },
          { id: "err-contact", label: "Contact Concierge", actionKey: "CONTACT_TEAM" },
        ],
      };
    }

    const elapsed = Date.now() - startTime;
    const minTypingMs = 600; // Natural 600ms typing cadence
    const remainingMs = Math.max(0, minTypingMs - elapsed);

    if (remainingMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, remainingMs));
    }

    setIsTyping(false);
    setIsLoading(false);

    addBotMessage(res.text, res.chips, res.navTarget, res.summary);
    if (onComplete) onComplete();
  };

  // Reset Flow
  const resetFlow = () => {
    setActiveFlow(null);
    setFlowRole(null);
    setFlowStep(0);
    setFlowData({});
  };

  // Action Chip Click Dispatcher
  const handleChipClick = (chip: QuickChip) => {
    if (isTyping || isLoading) return;

    addUserMessage(chip.label);

    queueBotResponse(() => {
      if (chip.actionKey === "START_EVENT_FLOW") {
        setActiveFlow("EVENT_PLANNING");
        setFlowStep(1);
        setFlowData({});
        return {
          text: "Target event established! I'd be happy to assist you in planning, producing, and executing your event with FashAI Universal.\n\nWhat type of event are you considering?",
          chips: [
            { id: "et-fashion", label: "Fashion Show / Runway", actionKey: "SET_EVENT_TYPE", payload: "Fashion Show" },
            { id: "et-launch", label: "Brand Launch / Activation", actionKey: "SET_EVENT_TYPE", payload: "Brand Launch" },
            { id: "et-corporate", label: "Corporate Event / Summit", actionKey: "SET_EVENT_TYPE", payload: "Corporate Summit" },
          ],
        };
      } else if (chip.actionKey === "SET_EVENT_TYPE") {
        const type = chip.payload || chip.label;
        setFlowData((prev) => ({ ...prev, eventType: type }));
        setFlowStep(2);
        return {
          text: `Understood — a ${type}. Where are you planning to host it?`,
          chips: [
            { id: "loc-dubai", label: "Dubai, UAE", actionKey: "SET_LOCATION", payload: "Dubai" },
            { id: "loc-mumbai", label: "Mumbai, India", actionKey: "SET_LOCATION", payload: "Mumbai" },
            { id: "loc-abudhabi", label: "Abu Dhabi", actionKey: "SET_LOCATION", payload: "Abu Dhabi" },
          ],
        };
      } else if (chip.actionKey === "SET_LOCATION") {
        const loc = chip.payload || chip.label;
        setFlowData((prev) => ({ ...prev, location: loc }));
        setFlowStep(3);
        return {
          text: `Got it, ${loc}. Do you already have a target date or month in mind?`,
        };
      } else if (chip.actionKey === "EXPLORE_EVENTS") {
        return {
          text: "LifeStyle 2026 is our upcoming flagship international fashion & lifestyle experience in Dubai, featuring runway showcases, couture presentations, and global talent.",
          chips: [
            { id: "nav-upcoming", label: "View Upcoming Page ↗", actionKey: "NAVIGATE", payload: "/upcoming" },
            { id: "nav-gallery", label: "Visual Archive / Gallery ↗", actionKey: "NAVIGATE", payload: "/gallery" },
            { id: "flow-plan", label: "Plan custom event ✦", actionKey: "START_EVENT_FLOW" },
          ],
        };
      } else if (chip.actionKey === "JOIN_NETWORK") {
        return {
          text: "Great! Are you looking to participate in an upcoming opportunity, showcase your work, or connect with the FashAI team?",
          chips: [
            { id: "r-designer", label: "Designer", actionKey: "START_ROLE_APP", payload: "fashion_designer" },
            { id: "r-model", label: "Model", actionKey: "START_ROLE_APP", payload: "model" },
            { id: "r-makeup", label: "Makeup Artist", actionKey: "START_ROLE_APP", payload: "makeup_artist" },
            { id: "r-stylist", label: "Stylist", actionKey: "START_ROLE_APP", payload: "fashion_stylist" },
            { id: "r-creator", label: "Creator / Influencer", actionKey: "START_ROLE_APP", payload: "influencer_creator" },
          ],
        };
      } else if (chip.actionKey === "START_ROLE_APP") {
        const role = chip.payload || "fashion_designer";
        const readableRole = role.replace(/_/g, " ");
        setActiveFlow("CREATIVE");
        setFlowRole(role);
        setFlowStep(1);
        setFlowData({});
        return {
          text: `Awesome. Let's get a few details to start your ${readableRole} application. What is your full name?`,
        };
      } else if (chip.actionKey === "START_SPONSORSHIP") {
        setActiveFlow("SPONSORSHIP");
        setFlowStep(1);
        setFlowData({});
        return {
          text: "We welcome brand, luxury, and technology partners for our global showcases. What is your full name?",
        };
      } else if (chip.actionKey === "START_REGISTRATION") {
        setActiveFlow("REGISTRATION");
        setFlowStep(1);
        setFlowData({});
        return {
          text: "We'd love to assist you. What is your full name?",
        };
      } else if (chip.actionKey === "START_CONTACT" || chip.actionKey === "CONTACT_TEAM") {
        setActiveFlow("CONTACT");
        setFlowStep(1);
        setFlowData({});
        return {
          text: "How can our Concierge team help you today? May I have your full name?",
        };
      } else if (chip.actionKey === "ASK_QUESTION") {
        return {
          text: "Feel free to ask me anything about FashAI Universal, our event production services, upcoming showcases, or how to collaborate!",
        };
      } else if (chip.actionKey === "NAVIGATE" && chip.payload) {
        router.push(chip.payload);
        return {
          text: `Navigating to ${chip.payload}...`,
        };
      }
      return { text: "How else can our Event Concierge help?" };
    });
  };

  // Submit Event Inquiry API (Persisted to Database & Admin Panel)
  const submitEventInquiry = async (data: Record<string, string>) => {
    queueBotResponse(async () => {
      try {
        const historyForApi = messages.map((m) => ({
          sender: m.sender,
          text: m.text,
          timestamp: m.timestamp,
        }));

        const res = await fetch("/api/event-inquiries", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source: "CHATBOT",
            fullName: data.fullName || "Valued Client",
            company: data.company || "",
            email: data.email,
            phone: data.phone || data.whatsapp || "",
            eventType: data.eventType || "Fashion Show",
            eventDescription: data.eventVision || data.message || "Event brief submitted via Chatbot Event Concierge.",
            preferredDate: data.preferredDate || "To be decided",
            guestCount: data.guestCount || "50-100",
            location: data.location || "Dubai",
            services: data.servicesRequested ? [data.servicesRequested] : ["Event Production & Management"],
            budgetCurrency: data.budgetCurrency || "AED",
            budgetRange: data.budgetRange || "Flexible",
            consent: true,
            conversationHistory: historyForApi,
          }),
        });

        const resData = await res.json();
        if (res.ok && resData.success) {
          const ref = resData.referenceNumber || "FI-2026-CONFIRMED";
          return {
            text: `Thank you, ${data.fullName || "client"}! Your event brief (Ref: ${ref}) has been sent directly to the FashAI team. We will review your vision and reach out to ${data.email} shortly.`,
            chips: [
              { id: "done-events", label: "Explore upcoming events ↗", actionKey: "NAVIGATE", payload: "/upcoming" },
              { id: "done-home", label: "Return to home ↗", actionKey: "NAVIGATE", payload: "/" },
            ],
          };
        } else {
          return {
            text: resData.error || "Something went wrong submitting your enquiry. Please try again or contact our team directly.",
            chips: [{ id: "err-contact", label: "Contact team ↗", actionKey: "NAVIGATE", payload: "/contact" }],
          };
        }
      } catch {
        return {
          text: "Network error occurred. Please try again.",
          chips: [{ id: "err-contact", label: "Contact team ↗", actionKey: "NAVIGATE", payload: "/contact" }],
        };
      } finally {
        resetFlow();
      }
    });
  };

  // Submit Talent Application API
  const submitTalentApplication = async (data: Record<string, string>, role: string) => {
    queueBotResponse(async () => {
      try {
        const historyForApi = messages.map((m) => ({
          sender: m.sender,
          text: m.text,
          timestamp: m.timestamp,
        }));

        const res = await fetch("/api/talent-application", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source: "CHATBOT",
            applicationType: role,
            fullName: data.fullName,
            email: data.email,
            whatsapp: data.whatsapp || data.phone,
            cityCountry: data.cityCountry || data.location,
            portfolioUrl: data.portfolioUrl || data.instagramUrl,
            notes: `${data.detail1 || ""} ${data.detail2 || ""}`.trim(),
            conversationHistory: historyForApi,
          }),
        });

        const resData = await res.json();
        if (res.ok && resData.success) {
          return {
            text: `Your application has been received successfully! Our Concierge team will review your profile and reach out to ${data.email}.`,
            chips: [
              { id: "done-plan", label: "Plan an Event ✦", actionKey: "START_EVENT_FLOW" },
              { id: "done-upcoming", label: "Explore events ↗", actionKey: "NAVIGATE", payload: "/upcoming" },
              { id: "done-gallery", label: "View gallery ↗", actionKey: "NAVIGATE", payload: "/gallery" },
            ],
          };
        } else {
          return {
            text: resData.error || "Something went wrong submitting your application. Please try again.",
            chips: [{ id: "retry-contact", label: "Contact team ↗", actionKey: "NAVIGATE", payload: "/contact" }],
          };
        }
      } catch {
        return {
          text: "Network error occurred. Please try again.",
          chips: [{ id: "err-contact", label: "Contact team ↗", actionKey: "NAVIGATE", payload: "/contact" }],
        };
      } finally {
        resetFlow();
      }
    });
  };

  // Submit Contact / Sponsorship Form API
  const submitContactForm = async (data: Record<string, string>, type: string) => {
    queueBotResponse(async () => {
      try {
        const historyForApi = messages.map((m) => ({
          sender: m.sender,
          text: m.text,
          timestamp: m.timestamp,
        }));

        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source: "CHATBOT",
            name: data.fullName,
            email: data.email,
            phone: data.whatsapp || data.phone,
            city: data.cityCountry || data.location || data.city,
            organization: data.company || "",
            enquiryType: type,
            eventInterest: config?.events?.[0]?.title || "LifeStyle 2026",
            message: data.sponsorType ? `[${data.sponsorType}] ${data.message || ""}` : data.message || "General Enquiry",
            conversationHistory: historyForApi,
          }),
        });

        const resData = await res.json();
        if (res.ok && resData.success) {
          return {
            text: `Thank you, ${data.fullName}! Your request has been submitted successfully to FashAI Universal. We will contact you at ${data.email}.`,
            chips: [
              { id: "done-plan", label: "Plan an Event ✦", actionKey: "START_EVENT_FLOW" },
              { id: "done-events", label: "Explore events ↗", actionKey: "NAVIGATE", payload: "/upcoming" },
              { id: "done-home", label: "Back to home ↗", actionKey: "NAVIGATE", payload: "/" },
            ],
          };
        } else {
          return {
            text: resData.error || "Something went wrong. Please try again.",
            chips: [{ id: "err-fallback", label: "Contact team ↗", actionKey: "NAVIGATE", payload: "/contact" }],
          };
        }
      } catch {
        return {
          text: "Network error occurred. Please try again.",
          chips: [{ id: "err-contact-fall", label: "Contact team ↗", actionKey: "NAVIGATE", payload: "/contact" }],
        };
      } finally {
        resetFlow();
      }
    });
  };

  // Process Typed Free-Text User Input
  const handleSendInput = () => {
    const text = inputValue.trim();
    if (!text || isTyping || isLoading) return;

    setInputValue("");
    addUserMessage(text);

    queueBotResponse(async () => {
      // Extract entities from user's free text
      const extracted = extractEntities(text, flowData);

      // 1. ACTIVE EVENT PLANNING FLOW
      if (activeFlow === "EVENT_PLANNING") {
        return handleEventPlanningFlowInput(text, extracted);
      }

      // 2. ACTIVE CREATIVE FLOW
      if (activeFlow === "CREATIVE" && flowRole) {
        return handleCreativeFlowInput(text, extracted);
      }

      // 3. ACTIVE SPONSORSHIP FLOW
      if (activeFlow === "SPONSORSHIP") {
        return handleSponsorshipFlowInput(text, extracted);
      }

      // 4. ACTIVE CONTACT / REGISTRATION FLOW
      if (activeFlow === "REGISTRATION" || activeFlow === "CONTACT") {
        return handleContactFlowInput(text, extracted);
      }

      // 5. KNOWLEDGE BASE QUERY
      const response: ConciergeKnowledgeResponse = queryKnowledgeBase(text, config);

      if (response.startFlow === "EVENT_PLANNING") {
        setActiveFlow("EVENT_PLANNING");
        setFlowStep(1);
        setFlowData(extracted);
      } else if (response.startFlow === "CREATIVE" && response.detectedRole) {
        setActiveFlow("CREATIVE");
        setFlowRole(response.detectedRole);
        setFlowStep(1);
        setFlowData(extracted);
      } else if (response.startFlow === "SPONSORSHIP") {
        setActiveFlow("SPONSORSHIP");
        setFlowStep(1);
        setFlowData(extracted);
      }

      return {
        text: response.message,
        chips: response.quickChips,
        navTarget: response.navigationTarget,
      };
    });
  };

  // Event Planning Conversational Engine
  const handleEventPlanningFlowInput = (input: string, extracted: Record<string, string>) => {
    const nextData = { ...extracted };
    setFlowData(nextData);

    // Progressive field determination
    if (!nextData.eventType && flowStep <= 1) {
      nextData.eventType = input;
      setFlowData(nextData);
      setFlowStep(2);
      return {
        text: `Understood — a ${input}. Where are you planning to host it?`,
        chips: [
          { id: "loc-d", label: "Dubai", actionKey: "SET_LOCATION", payload: "Dubai" },
          { id: "loc-m", label: "Mumbai", actionKey: "SET_LOCATION", payload: "Mumbai" },
        ],
      };
    }

    if (!nextData.location && flowStep <= 2) {
      nextData.location = input;
      setFlowData(nextData);
      setFlowStep(3);
      return { text: `Got it, ${input}. Do you already have a target date or month in mind?` };
    }

    if (!nextData.preferredDate && flowStep <= 3) {
      nextData.preferredDate = input;
      setFlowData(nextData);
      setFlowStep(4);
      return { text: "Approximately how many guests are you expecting?" };
    }

    if (!nextData.guestCount && flowStep <= 4) {
      nextData.guestCount = input;
      setFlowData(nextData);
      setFlowStep(5);
      return {
        text: "What specific services do you need from us (e.g. Event Production, Creative Direction, Runway & Talent)?",
      };
    }

    if (!nextData.servicesRequested && flowStep <= 5) {
      nextData.servicesRequested = input;
      setFlowData(nextData);
      setFlowStep(6);
      return { text: "Thanks. May I have your full name?" };
    }

    if (!nextData.fullName && flowStep <= 6) {
      nextData.fullName = input;
      setFlowData(nextData);
      setFlowStep(7);
      return { text: `Thanks, ${input}! What is your company or brand name?` };
    }

    if (!nextData.company && flowStep === 7 && !nextData.email) {
      nextData.company = input;
      setFlowData(nextData);
      setFlowStep(8);
      return { text: "What is the best work email address to send your proposal to?" };
    }

    if (!nextData.email) {
      if (!isValidEmail(input) && !isValidEmail(nextData.email || "")) {
        return { text: "Please enter a valid work email address (e.g. name@company.com)." };
      }
      nextData.email = input;
      setFlowData(nextData);
      setFlowStep(9);
      return { text: "What is your WhatsApp or phone number?" };
    }

    if (!nextData.phone && !nextData.whatsapp) {
      nextData.phone = input;
      nextData.whatsapp = input;
      setFlowData(nextData);
      setFlowStep(10);
    }

    // Final Review & Confirmation Summary
    const summaryTitle = "EVENT BRIEF SUMMARY";
    return {
      text: `Here is a summary of your event brief so far, ${nextData.fullName || "client"}:`,
      chips: [
        { id: "sub-event", label: "Submit Enquiry ✓", actionKey: "CUSTOM_SUBMIT_EVENT" },
        { id: "reset-event", label: "Edit details / Start over", actionKey: "CUSTOM_RESET" },
      ],
      summary: {
        title: summaryTitle,
        details: [
          { label: "Name", value: nextData.fullName || "Provided" },
          { label: "Company", value: nextData.company || "Direct Inquiry" },
          { label: "Email", value: nextData.email },
          { label: "Phone", value: nextData.phone || nextData.whatsapp || "Provided" },
          { label: "Event Type", value: nextData.eventType || "Fashion Show" },
          { label: "Location", value: nextData.location || "Dubai" },
          { label: "Target Date", value: nextData.preferredDate || "To be decided" },
          { label: "Expected Guests", value: nextData.guestCount || "50-100" },
          { label: "Services Needed", value: nextData.servicesRequested || "Full Production" },
        ],
        onConfirm: () => submitEventInquiry(nextData),
        onReset: () => resetFlow(),
      },
    };
  };

  // Creative Multi-Step Engine
  const handleCreativeFlowInput = (input: string, extracted: Record<string, string>) => {
    const nextData = { ...extracted, ...flowData };

    if (!nextData.fullName && flowStep <= 1) {
      nextData.fullName = input;
      setFlowData(nextData);
      setFlowStep(2);
      return { text: `Thanks, ${input}! What is the best email address to reach you?` };
    }

    if (!nextData.email && flowStep <= 2) {
      if (!isValidEmail(input)) {
        return { text: "Please enter a valid email address (e.g. name@example.com)." };
      }
      nextData.email = input;
      setFlowData(nextData);
      setFlowStep(3);
      return { text: "What is your WhatsApp or phone number?" };
    }

    if ((!nextData.whatsapp || !nextData.phone) && flowStep <= 3) {
      nextData.whatsapp = input;
      nextData.phone = input;
      setFlowData(nextData);
      setFlowStep(4);
      return { text: "Which city and country are you based in?" };
    }

    if (!nextData.cityCountry && !nextData.location && flowStep <= 4) {
      nextData.cityCountry = input;
      setFlowData(nextData);
      setFlowStep(5);
      return { text: "What is your Instagram or portfolio website link?" };
    }

    if (!nextData.portfolioUrl && flowStep <= 5) {
      nextData.portfolioUrl = input;
      setFlowData(nextData);
      setFlowStep(6);
    }

    const roleTitle = flowRole?.replace(/_/g, " ").toUpperCase() || "APPLICATION";
    return {
      text: `Thank you, ${nextData.fullName}! Review your details below:`,
      chips: [
        { id: "sub-app", label: "Submit Application ✓", actionKey: "CUSTOM_SUBMIT_APP" },
        { id: "reset-app", label: "Start over", actionKey: "CUSTOM_RESET" },
      ],
      summary: {
        title: `${roleTitle} SUMMARY`,
        details: [
          { label: "Name", value: nextData.fullName || "Provided" },
          { label: "Email", value: nextData.email },
          { label: "Phone", value: nextData.whatsapp || nextData.phone || "Provided" },
          { label: "Location", value: nextData.cityCountry || nextData.location || "Dubai" },
          { label: "Portfolio Link", value: nextData.portfolioUrl || "Provided" },
        ],
        onConfirm: () => submitTalentApplication(nextData, flowRole!),
        onReset: () => resetFlow(),
      },
    };
  };

  // Sponsorship Multi-Step Engine
  const handleSponsorshipFlowInput = (input: string, extracted: Record<string, string>) => {
    const nextData = { ...extracted, ...flowData };

    if (!nextData.fullName && flowStep <= 1) {
      nextData.fullName = input;
      setFlowData(nextData);
      setFlowStep(2);
      return { text: `Thanks, ${input}! What is your company or brand name?` };
    }

    if (!nextData.company && flowStep <= 2) {
      nextData.company = input;
      setFlowData(nextData);
      setFlowStep(3);
      return { text: "What is your official business email address?" };
    }

    if (!nextData.email && flowStep <= 3) {
      if (!isValidEmail(input)) {
        return { text: "Please enter a valid email address." };
      }
      nextData.email = input;
      setFlowData(nextData);
      setFlowStep(4);
      return { text: "What is your contact phone / WhatsApp number?" };
    }

    if ((!nextData.whatsapp || !nextData.phone) && flowStep <= 4) {
      nextData.whatsapp = input;
      nextData.phone = input;
      setFlowData(nextData);
      setFlowStep(5);
      return { text: "What type of sponsorship or partnership are you interested in?" };
    }

    if (!nextData.sponsorType && flowStep <= 5) {
      nextData.sponsorType = input;
      setFlowData(nextData);
      setFlowStep(6);
    }

    return {
      text: `Thank you, ${nextData.fullName}! Review your partnership summary:`,
      chips: [
        { id: "sub-sp", label: "Submit Enquiry ✓", actionKey: "CUSTOM_SUBMIT_SP" },
        { id: "reset-sp", label: "Start over", actionKey: "CUSTOM_RESET" },
      ],
      summary: {
        title: "SPONSORSHIP SUMMARY",
        details: [
          { label: "Name", value: nextData.fullName || "Provided" },
          { label: "Company", value: nextData.company || "Provided" },
          { label: "Email", value: nextData.email },
          { label: "Phone", value: nextData.whatsapp || nextData.phone || "Provided" },
          { label: "Type", value: nextData.sponsorType || "Partnership" },
        ],
        onConfirm: () => submitContactForm(nextData, "Sponsorship"),
        onReset: () => resetFlow(),
      },
    };
  };

  // Contact Multi-Step Engine
  const handleContactFlowInput = (input: string, extracted: Record<string, string>) => {
    const nextData = { ...extracted, ...flowData };

    if (!nextData.fullName && flowStep <= 1) {
      nextData.fullName = input;
      setFlowData(nextData);
      setFlowStep(2);
      return { text: `Thanks, ${input}! What is your email address?` };
    }

    if (!nextData.email && flowStep <= 2) {
      if (!isValidEmail(input)) {
        return { text: "Please enter a valid email address." };
      }
      nextData.email = input;
      setFlowData(nextData);
      setFlowStep(3);
      return { text: "What is your WhatsApp or phone number?" };
    }

    if ((!nextData.whatsapp || !nextData.phone) && flowStep <= 3) {
      nextData.whatsapp = input;
      nextData.phone = input;
      setFlowData(nextData);
      setFlowStep(4);
      return { text: "How can we help you today? Please describe your enquiry." };
    }

    if (!nextData.message && flowStep <= 4) {
      nextData.message = input;
      setFlowData(nextData);
      setFlowStep(5);
    }

    return {
      text: `Thank you, ${nextData.fullName}! Ready to submit your message?`,
      chips: [
        { id: "sub-ct", label: "Submit Message ✓", actionKey: "CUSTOM_SUBMIT_CT" },
        { id: "reset-ct", label: "Start over", actionKey: "CUSTOM_RESET" },
      ],
      summary: {
        title: "ENQUIRY SUMMARY",
        details: [
          { label: "Name", value: nextData.fullName || "Provided" },
          { label: "Email", value: nextData.email },
          { label: "Phone", value: nextData.whatsapp || nextData.phone || "Provided" },
        ],
        onConfirm: () => submitContactForm(nextData, activeFlow === "REGISTRATION" ? "Registration" : "General Contact"),
        onReset: () => resetFlow(),
      },
    };
  };

  // Dispatch Custom Actions
  const dispatchCustomChipAction = (actionKey: string) => {
    if (isTyping || isLoading) return;

    if (actionKey === "CUSTOM_SUBMIT_EVENT") {
      submitEventInquiry(flowData);
    } else if (actionKey === "CUSTOM_SUBMIT_APP") {
      submitTalentApplication(flowData, flowRole!);
    } else if (actionKey === "CUSTOM_SUBMIT_SP") {
      submitContactForm(flowData, "Sponsorship");
    } else if (actionKey === "CUSTOM_SUBMIT_CT") {
      submitContactForm(flowData, activeFlow === "REGISTRATION" ? "Registration" : "General Contact");
    } else if (actionKey === "CUSTOM_RESET") {
      addUserMessage("Start over");
      queueBotResponse(() => {
        resetFlow();
        return { text: "Enquiry reset. How can I help you today?" };
      });
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[240] pointer-events-none flex items-end justify-end p-0 sm:p-6">
        {/* Mobile Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm sm:hidden pointer-events-auto z-[241]"
        />

        {/* Hyper-Rounded Floating Chatbot Panel */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.92 }}
          transition={{ type: "spring", stiffness: 350, damping: 26 }}
          style={{ willChange: "transform, opacity" }}
          className="relative z-[242] pointer-events-auto w-[calc(100vw-1.25rem)] sm:w-[400px] h-[84vh] sm:h-[560px] max-h-[620px] max-w-[430px] bg-[#FAF8F5]/95 dark:bg-[#0C0B0A]/95 border border-black/10 dark:border-[#D4AF37]/40 shadow-[0_25px_70px_rgba(0,0,0,0.3)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.95)] backdrop-blur-2xl flex flex-col justify-between overflow-hidden rounded-[32px] sm:rounded-[36px] text-[#111111] dark:text-white mb-2 mr-2.5 sm:mb-0 sm:mr-0"
          role="dialog"
          aria-label="FashAI Event Concierge"
        >
          {/* Header Bar with Circular Logo & Minimal Status */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-black/10 dark:border-white/10 bg-[#FAF8F5]/90 dark:bg-[#0C0B0A]/90 backdrop-blur-md shrink-0 rounded-t-[32px] sm:rounded-t-[36px]">
            <div className="flex items-center gap-3">
              {/* Circular Chatbot Header Logo */}
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#111111] dark:bg-[#161514] border border-[#D4AF37]/50 flex items-center justify-center p-1 shadow-sm shrink-0 overflow-hidden">
                <Image
                  src="/assets/brand/chatbot_logo.png"
                  alt="FashAI Logo"
                  width={30}
                  height={30}
                  className="object-contain rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-jost text-xs sm:text-sm font-bold uppercase tracking-wider text-[#111111] dark:text-white">
                    FashAI
                  </span>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2E936F] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2E936F]" />
                  </span>
                </div>
                <span className="font-jost text-[11px] text-[#B8962E] dark:text-[#D4AF37] font-semibold tracking-wide">
                  Event Concierge
                </span>
              </div>
            </div>

            {/* Circular Close Button in Header */}
            <button
              onClick={onClose}
              className="w-8.5 h-8.5 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-[#111111]/70 dark:text-white/70 hover:text-[#B8962E] dark:hover:text-[#D4AF37] flex items-center justify-center transition-all cursor-pointer"
              aria-label="Close Event Concierge"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-transparent">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.2 }}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                {msg.sender === "bot" ? (
                  /* Bot Message with Circular Logo Avatar */
                  <div className="flex items-start gap-2.5 max-w-[92%]">
                    <div className="w-6.5 h-6.5 rounded-full overflow-hidden shrink-0 border border-[#D4AF37]/50 relative bg-[#111111] dark:bg-[#161514] flex items-center justify-center p-0.5 mt-0.5 shadow-xs">
                      <Image
                        src="/assets/brand/chatbot_logo.png"
                        alt="FashAI Event Concierge"
                        width={20}
                        height={20}
                        className="object-contain rounded-full"
                      />
                    </div>
                    <div className="flex flex-col items-start min-w-0">
                      <div className="px-4.5 py-3.5 text-xs sm:text-sm leading-relaxed font-jost bg-white dark:bg-[#161514] border border-black/10 dark:border-white/15 text-[#111111] dark:text-white/95 rounded-[22px] rounded-tl-xs shadow-sm">
                        <p className="whitespace-pre-line">{msg.text}</p>

                        {/* Review Summary Card */}
                        {msg.reviewSummary && (
                          <div className="mt-3 p-3.5 bg-[#FAF8F5] dark:bg-black/60 border border-[#D4AF37]/40 rounded-[22px] space-y-2 text-[11px] sm:text-xs">
                            <span className="font-jost font-bold uppercase text-[#B8962E] dark:text-[#D4AF37] block tracking-wider">
                              {msg.reviewSummary.title}
                            </span>
                            {msg.reviewSummary.details.map((d, i) => (
                              <div key={i} className="flex justify-between gap-2 border-b border-black/5 dark:border-white/5 pb-1">
                                <span className="text-[#111111]/70 dark:text-white/70">{d.label}:</span>
                                <span className="font-medium text-[#111111] dark:text-white truncate max-w-[160px]">{d.value}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Navigation Target Button */}
                        {msg.navigationTarget && (
                          <button
                            onClick={() => router.push(msg.navigationTarget!)}
                            className="mt-2.5 inline-flex items-center gap-1.5 text-[10px] font-jost font-bold text-[#B8962E] dark:text-[#D4AF37] hover:underline uppercase pt-1.5 border-t border-black/10 dark:border-white/10 w-full cursor-pointer"
                          >
                            <span>GO TO {msg.navigationTarget}</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {/* Timestamp */}
                      <span className="text-[9px] font-jost text-[#111111]/40 dark:text-white/40 mt-1 px-2">
                        {msg.timestamp}
                      </span>

                      {/* Quick Action Chips (Subtle Pill Shortcuts) */}
                      {msg.quickChips && msg.quickChips.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-full">
                          {msg.quickChips.map((chip) => (
                            <button
                              key={chip.id}
                              disabled={isTyping || isLoading}
                              onClick={() => {
                                if (chip.actionKey.startsWith("CUSTOM_")) {
                                  dispatchCustomChipAction(chip.actionKey);
                                } else {
                                  handleChipClick(chip);
                                }
                              }}
                              className="px-3.5 py-1.5 rounded-full text-[11px] font-jost font-medium tracking-wide transition-all border bg-white dark:bg-[#161514] text-[#111111] dark:text-white border-black/15 dark:border-white/20 hover:border-[#D4AF37] hover:text-[#B8962E] dark:hover:text-[#D4AF37] hover:scale-105 active:scale-95 disabled:opacity-40 shadow-xs cursor-pointer"
                            >
                              {chip.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* User Message: NO ORANGE, Gold Accent Border, Soft Dark/Light Surface */
                  <div className="flex flex-col items-end max-w-[85%] self-end">
                    <div className="px-4.5 py-3.5 text-xs sm:text-sm leading-relaxed font-jost bg-[#F3EFEA] dark:bg-[#1C1A17] border border-[#D4AF37]/50 text-[#111111] dark:text-white/95 rounded-[22px] rounded-tr-xs shadow-sm font-medium">
                      <p className="whitespace-pre-line">{msg.text}</p>
                    </div>
                    <span className="text-[9px] font-jost text-[#111111]/40 dark:text-white/40 mt-1 px-2 text-right">
                      {msg.timestamp}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}

            {/* STAGGERED 3-DOT TYPING ANIMATION WITH LOGO AVATAR */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-start gap-2.5 max-w-[90%]"
                role="status"
                aria-live="polite"
                aria-label="Event Concierge is typing"
              >
                <div className="w-6.5 h-6.5 rounded-full overflow-hidden shrink-0 border border-[#D4AF37]/50 relative bg-[#111111] dark:bg-[#161514] flex items-center justify-center p-0.5 mt-0.5 shadow-xs">
                  <Image
                    src="/assets/brand/chatbot_logo.png"
                    alt="FashAI"
                    width={20}
                    height={20}
                    className="object-contain rounded-full"
                  />
                </div>
                <div className="bg-white dark:bg-[#161514] border border-black/10 dark:border-[#D4AF37]/40 px-4.5 py-3 rounded-[22px] rounded-tl-xs shadow-sm flex items-center gap-2">
                  <span className="sr-only">Event Concierge is typing...</span>
                  <span className="hidden motion-reduce:inline text-xs font-jost text-[#D4AF37]">typing...</span>
                  <div className="flex items-center gap-1.5 motion-reduce:hidden py-0.5">
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-typing-dot-1" />
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-typing-dot-2" />
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-typing-dot-3" />
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chatbot Bottom Controls composer row: [ Input ] [ SEND ] [ X ] */}
          <div className="p-3 sm:p-4 bg-[#FAF8F5]/95 dark:bg-[#0C0B0A]/95 border-t border-black/10 dark:border-white/10 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendInput();
              }}
              className="flex items-center gap-2 sm:gap-2.5 w-full"
            >
              {/* Input Field (flex: 1) */}
              <div className="flex-1 min-w-0 relative flex items-center bg-white dark:bg-[#161514] border border-black/15 dark:border-white/20 focus-within:border-[#D4AF37] rounded-full px-4 py-2 sm:py-2.5 transition-all shadow-xs">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendInput();
                    }
                  }}
                  disabled={isTyping || isLoading}
                  placeholder={isTyping ? "Event Concierge is responding..." : "Type your message..."}
                  className="w-full bg-transparent text-xs sm:text-sm font-jost text-[#111111] dark:text-white placeholder:text-[#111111]/45 dark:placeholder:text-white/40 focus:outline-none disabled:opacity-50"
                />
              </div>

              {/* Dedicated Send Button (Gold Accent, Left of Close) */}
              <button
                type="submit"
                disabled={isTyping || isLoading || !inputValue.trim()}
                className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-[#D4AF37] text-black hover:bg-[#FFEC69] border border-[#D4AF37] flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0 shadow-md hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 cursor-pointer"
                aria-label="Send message"
                title="Send message"
              >
                <Send className="w-4.5 h-4.5 text-black" />
              </button>

              {/* Dedicated Close Button (Far Right Control) */}
              <button
                type="button"
                onClick={onClose}
                className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-black/5 dark:bg-white/10 text-[#111111]/80 dark:text-white/80 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/20 border border-black/10 dark:border-white/15 flex items-center justify-center transition-all shrink-0 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 cursor-pointer"
                aria-label="Close chatbot"
                title="Close chatbot"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
