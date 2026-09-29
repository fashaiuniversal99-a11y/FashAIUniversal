"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, ArrowUpRight } from "lucide-react";
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
  };
  timestamp: string;
}

interface ConciergePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export default function ConciergePanel({ isOpen, onClose }: ConciergePanelProps) {
  const router = useRouter();
  const { config } = useSiteConfig();

  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Guided Multi-Step Conversational State
  const [activeFlow, setActiveFlow] = useState<"EVENT" | "CREATIVE" | "SPONSORSHIP" | "CONTACT" | null>(null);
  const [flowRole, setFlowRole] = useState<string | null>(null);
  const [flowStep, setFlowStep] = useState<number>(0);
  const [flowData, setFlowData] = useState<Record<string, any>>({});

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

  // Minimal Conversational Greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      setMessages([
        {
          id: "msg-init",
          sender: "bot",
          text: "Hi, welcome to FashAI Universal.\nI'm your Event Concierge.\n\nHow can I help you today?",
          timestamp: time,
          quickChips: [
            { id: "qp-plan", label: "Plan an event", actionKey: "START_EVENT_FLOW" },
            { id: "qp-opp", label: "Explore opportunities", actionKey: "JOIN_NETWORK" },
            { id: "qp-q", label: "Ask a question", actionKey: "ASK_QUESTION" },
          ],
        },
      ]);
    }
  }, [isOpen, messages.length]);

  // Helper to append Bot Message
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

  // Mandatory typing delay engine (natural feel)
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
        text: "I'm having trouble processing that right now. Could you please try again?",
        chips: [
          { id: "err-plan", label: "Plan an event", actionKey: "START_EVENT_FLOW" },
          { id: "err-contact", label: "Contact team", actionKey: "START_CONTACT" },
        ],
      };
    }

    const elapsed = Date.now() - startTime;
    const minTypingMs = 600;
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

  // Smart Entity Extraction from Free Text
  const extractEntities = (text: string) => {
    const extracted: Record<string, any> = {};
    const lower = text.toLowerCase();

    // Event Type
    if (lower.includes("fashion show")) extracted.eventType = "Fashion Show";
    else if (lower.includes("runway")) extracted.eventType = "Runway Presentation";
    else if (lower.includes("brand activation")) extracted.eventType = "Brand Activation";
    else if (lower.includes("product launch") || lower.includes("launch")) extracted.eventType = "Product Launch";
    else if (lower.includes("corporate")) extracted.eventType = "Corporate Event";
    else if (lower.includes("lifestyle")) extracted.eventType = "Lifestyle Event";

    // Location
    if (lower.includes("dubai")) extracted.location = "Dubai · UAE";
    else if (lower.includes("abu dhabi")) extracted.location = "Abu Dhabi · UAE";
    else if (lower.includes("india") || lower.includes("mumbai") || lower.includes("delhi")) extracted.location = "India";

    // Guest Count
    if (lower.includes("under 50") || lower.includes("<50")) extracted.guestCountRange = "Under 50";
    else if (lower.includes("50-100") || lower.includes("50 to 100")) extracted.guestCountRange = "50–100";
    else if (lower.includes("100-250") || lower.includes("100 to 250") || lower.includes("200 guests") || lower.includes("200 people")) extracted.guestCountRange = "100–250";
    else if (lower.includes("250-500") || lower.includes("500 guests")) extracted.guestCountRange = "250–500";
    else if (lower.includes("1000") || lower.includes("1,000")) extracted.guestCountRange = "1,000+";

    // Email
    const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (emailMatch) extracted.email = emailMatch[0];

    // Phone
    const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
    if (phoneMatch) extracted.phone = phoneMatch[0];

    // Name Heuristics
    const nameMatch = text.match(/(?:i am|i'm|my name is|name is|this is)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i);
    if (nameMatch) extracted.fullName = nameMatch[1];

    return extracted;
  };

  // Submit Event Inquiry API & DB Persistence
  const submitEventInquiry = async (data: Record<string, any>) => {
    queueBotResponse(async () => {
      try {
        const history = messages.map((m) => ({
          sender: m.sender,
          text: m.text,
          timestamp: m.timestamp,
        }));

        const res = await fetch("/api/event-inquiries", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source: "CHATBOT",
            fullName: data.fullName,
            email: data.email,
            phone: data.phone || data.whatsapp,
            company: data.company,
            eventType: data.eventType ? [data.eventType] : ["Fashion Show"],
            eventDescription: data.eventVision || `Event Brief: ${data.eventType || "Event"} in ${data.location || "Dubai"}`,
            preferredDate: data.preferredDate || "TBD",
            location: data.location || "Dubai · UAE",
            guestCountRange: data.guestCountRange || "50-100",
            servicesRequested: Array.isArray(data.servicesRequested) ? data.servicesRequested : [data.servicesRequested || "Full Event Production"],
            budgetRange: data.budgetRange || "Discuss with team",
            budgetCurrency: data.budgetCurrency || "AED",
            consent: true,
            conversationHistory: history,
          }),
        });

        const resData = await res.json();
        const refNum = resData.referenceNumber || `FI-2026-${Math.floor(10000 + Math.random() * 90000)}`;

        fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source: "CHATBOT",
            name: data.fullName,
            email: data.email,
            phone: data.phone || data.whatsapp,
            city: data.location,
            organization: data.company,
            enquiryType: "Event Inquiry",
            eventInterest: data.eventType || "LifeStyle 2026",
            message: `[Ref: ${refNum}] Date: ${data.preferredDate || "TBD"}, Guests: ${data.guestCountRange || "N/A"}`,
          }),
        }).catch(() => {});

        return {
          text: `Thank you, ${data.fullName}! Your event brief has been submitted successfully to FashAI Universal.\n\nReference Number: ${refNum}\n\nOur senior production team will review your requirements and reach out to ${data.email} shortly.`,
          quickChips: [
            { id: "done-home", label: "Back to Home ↗", actionKey: "NAVIGATE", payload: "/" },
            { id: "done-events", label: "Explore Events ↗", actionKey: "NAVIGATE", payload: "/upcoming" },
          ],
        };
      } catch {
        return {
          text: "Something went wrong submitting your brief. Please try again or reach out to our team directly.",
          quickChips: [{ id: "err-contact", label: "Contact Team ↗", actionKey: "NAVIGATE", payload: "/contact" }],
        };
      } finally {
        resetFlow();
      }
    });
  };

  // Submit Talent Application API
  const submitTalentApplication = async (data: Record<string, any>, role: string) => {
    queueBotResponse(async () => {
      try {
        const res = await fetch("/api/talent-application", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source: "CHATBOT",
            applicationType: role,
            fullName: data.fullName,
            email: data.email,
            whatsapp: data.phone || data.whatsapp,
            cityCountry: data.location || data.cityCountry,
            portfolioUrl: data.portfolioUrl,
            notes: data.detail1 || "",
          }),
        });

        const resData = await res.json();
        if (res.ok && resData.success) {
          return {
            text: `Your application has been received successfully! Our Concierge team will review your profile and reach out to ${data.email}.`,
            quickChips: [
              { id: "done-events", label: "Explore Events ↗", actionKey: "NAVIGATE", payload: "/upcoming" },
              { id: "done-gallery", label: "View Gallery ↗", actionKey: "NAVIGATE", payload: "/gallery" },
            ],
          };
        } else {
          return {
            text: resData.error || "Something went wrong submitting your application. Please try again.",
            quickChips: [{ id: "retry-contact", label: "Contact Team ↗", actionKey: "NAVIGATE", payload: "/contact" }],
          };
        }
      } catch {
        return {
          text: "Network error occurred. Please try again.",
          quickChips: [{ id: "err-contact", label: "Contact Team ↗", actionKey: "NAVIGATE", payload: "/contact" }],
        };
      } finally {
        resetFlow();
      }
    });
  };

  // Submit Contact Form API
  const submitContactForm = async (data: Record<string, any>, type: string) => {
    queueBotResponse(async () => {
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source: "CHATBOT",
            name: data.fullName,
            email: data.email,
            phone: data.phone || data.whatsapp,
            city: data.location || data.city,
            organization: data.company || "",
            enquiryType: type,
            eventInterest: config?.events?.[0]?.title || "LifeStyle 2026",
            message: data.message || "General Concierge Enquiry",
          }),
        });

        const resData = await res.json();
        if (res.ok && resData.success) {
          return {
            text: `Thank you, ${data.fullName}! Your message has been submitted to FashAI Universal. We will contact you at ${data.email}.`,
            quickChips: [
              { id: "done-events", label: "Explore Events ↗", actionKey: "NAVIGATE", payload: "/upcoming" },
              { id: "done-home", label: "Back to Home ↗", actionKey: "NAVIGATE", payload: "/" },
            ],
          };
        } else {
          return {
            text: resData.error || "Something went wrong. Please try again.",
            quickChips: [{ id: "err-fallback", label: "Contact Team ↗", actionKey: "NAVIGATE", payload: "/contact" }],
          };
        }
      } catch {
        return {
          text: "Network error occurred. Please try again.",
          quickChips: [{ id: "err-contact-fall", label: "Contact Team ↗", actionKey: "NAVIGATE", payload: "/contact" }],
        };
      } finally {
        resetFlow();
      }
    });
  };

  // Handle Quick Action Chips
  const handleChipClick = (chip: QuickChip) => {
    if (isTyping || isLoading) return;

    addUserMessage(chip.label);

    queueBotResponse(() => {
      if (chip.actionKey === "START_EVENT_FLOW") {
        setActiveFlow("EVENT");
        setFlowStep(1);
        return {
          text: "Target event established.\nI'd be happy to assist you with planning.\n\nWhat type of event are you considering?",
          chips: [
            { id: "ev-fashion", label: "Fashion Show", actionKey: "SET_EVENT_TYPE", payload: "Fashion Show" },
            { id: "ev-runway", label: "Runway Presentation", actionKey: "SET_EVENT_TYPE", payload: "Runway Presentation" },
            { id: "ev-brand", label: "Brand Activation", actionKey: "SET_EVENT_TYPE", payload: "Brand Activation" },
            { id: "ev-launch", label: "Product Launch", actionKey: "SET_EVENT_TYPE", payload: "Product Launch" },
            { id: "ev-corp", label: "Corporate Event", actionKey: "SET_EVENT_TYPE", payload: "Corporate Event" },
          ],
        };
      } else if (chip.actionKey === "SET_EVENT_TYPE") {
        const type = chip.payload || "Fashion Show";
        setActiveFlow("EVENT");
        setFlowData((prev) => ({ ...prev, eventType: type }));
        return {
          text: `Got it. A ${type}.\n\nWhere are you planning to host it?`,
          chips: [
            { id: "loc-dubai", label: "Dubai · UAE", actionKey: "SET_LOCATION", payload: "Dubai · UAE" },
            { id: "loc-abu", label: "Abu Dhabi", actionKey: "SET_LOCATION", payload: "Abu Dhabi · UAE" },
            { id: "loc-india", label: "India", actionKey: "SET_LOCATION", payload: "India" },
          ],
        };
      } else if (chip.actionKey === "SET_LOCATION") {
        const loc = chip.payload || "Dubai · UAE";
        setActiveFlow("EVENT");
        setFlowData((prev) => ({ ...prev, location: loc }));
        return {
          text: `Great, ${loc}.\n\nDo you have a target date or month in mind?`,
        };
      } else if (chip.actionKey === "JOIN_NETWORK") {
        return {
          text: "Which role would you like to participate as in the FashAI network?",
          chips: [
            { id: "r-designer", label: "Designer", actionKey: "START_ROLE_APP", payload: "fashion_designer" },
            { id: "r-model", label: "Model", actionKey: "START_ROLE_APP", payload: "model" },
            { id: "r-makeup", label: "Makeup Artist", actionKey: "START_ROLE_APP", payload: "makeup_artist" },
            { id: "r-stylist", label: "Stylist", actionKey: "START_ROLE_APP", payload: "fashion_stylist" },
            { id: "r-creator", label: "Creator", actionKey: "START_ROLE_APP", payload: "influencer_creator" },
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
          text: `Awesome. Are you looking to showcase work or join our network as a ${readableRole}? What is your full name?`,
        };
      } else if (chip.actionKey === "START_SPONSORSHIP") {
        setActiveFlow("SPONSORSHIP");
        setFlowStep(1);
        setFlowData({});
        return {
          text: "We welcome brand & luxury sponsors for FashAI Universal events. What is your full name?",
        };
      } else if (chip.actionKey === "START_CONTACT" || chip.actionKey === "CONTACT_TEAM") {
        setActiveFlow("CONTACT");
        setFlowStep(1);
        setFlowData({});
        return {
          text: "How can our Concierge team help you today? What is your full name?",
        };
      } else if (chip.actionKey === "ASK_QUESTION") {
        return {
          text: "Feel free to ask me anything about our event planning services, upcoming runway experiences, or talent network.",
        };
      } else if (chip.actionKey === "NAVIGATE" && chip.payload) {
        router.push(chip.payload);
        return {
          text: `Navigating to ${chip.payload}...`,
        };
      }
      return { text: "How else can I assist your event today?" };
    });
  };

  // Process Typed User Input
  const handleSendInput = () => {
    const text = inputValue.trim();
    if (!text || isTyping || isLoading) return;

    setInputValue("");
    addUserMessage(text);

    queueBotResponse(async () => {
      // Parse any free-text entities
      const newEntities = extractEntities(text);

      // 1. ACTIVE EVENT FLOW
      if (activeFlow === "EVENT") {
        const updatedData = { ...flowData, ...newEntities };

        if (!updatedData.eventType) {
          updatedData.eventType = text;
          setFlowData(updatedData);
          return {
            text: "Got it! Where are you planning to host it?",
            chips: [
              { id: "loc-dubai", label: "Dubai · UAE", actionKey: "SET_LOCATION", payload: "Dubai · UAE" },
              { id: "loc-india", label: "India", actionKey: "SET_LOCATION", payload: "India" },
            ],
          };
        }

        if (!updatedData.location) {
          updatedData.location = text;
          setFlowData(updatedData);
          return { text: "Understood. Do you have a target date or month in mind?" };
        }

        if (!updatedData.preferredDate) {
          updatedData.preferredDate = text;
          setFlowData(updatedData);
          return {
            text: "Great! Approximately how many guests are you expecting?",
            chips: [
              { id: "g-50", label: "Under 50", actionKey: "SET_GUESTS", payload: "Under 50" },
              { id: "g-100", label: "50–100", actionKey: "SET_GUESTS", payload: "50–100" },
              { id: "g-250", label: "100–250", actionKey: "SET_GUESTS", payload: "100–250" },
              { id: "g-500", label: "250–500", actionKey: "SET_GUESTS", payload: "250–500" },
              { id: "g-1000", label: "1,000+", actionKey: "SET_GUESTS", payload: "1,000+" },
            ],
          };
        }

        if (!updatedData.guestCountRange) {
          updatedData.guestCountRange = text;
          setFlowData(updatedData);
          return {
            text: "What services do you need — full production, runway design, creative direction, or talent coordination?",
          };
        }

        if (!updatedData.servicesRequested) {
          updatedData.servicesRequested = [text];
          setFlowData(updatedData);
          return { text: "What is your vision or estimated budget range for the event?" };
        }

        if (!updatedData.budgetRange) {
          updatedData.budgetRange = text;
          setFlowData(updatedData);
          if (!updatedData.fullName) return { text: "Perfect! What is your full name?" };
        }

        if (!updatedData.fullName) {
          updatedData.fullName = text;
          setFlowData(updatedData);
          if (!updatedData.email) return { text: "Thanks! What is your work email address?" };
        }

        if (!updatedData.email) {
          if (!isValidEmail(text)) {
            return { text: "Please enter a valid email address (e.g. name@example.com)." };
          }
          updatedData.email = text;
          setFlowData(updatedData);
          if (!updatedData.phone) return { text: "And your phone / WhatsApp number?" };
        }

        if (!updatedData.phone) {
          updatedData.phone = text;
          setFlowData(updatedData);
        }

        // Summary Confirmation Card
        return {
          text: `Thank you, ${updatedData.fullName || "there"}! Here is the summary of your event brief:`,
          chips: [
            { id: "sub-ev-confirm", label: "SUBMIT ENQUIRY ✓", actionKey: "CUSTOM_SUBMIT_EVENT" },
            { id: "sub-ev-reset", label: "Edit details", actionKey: "CUSTOM_RESET" },
          ],
          summary: {
            title: "EVENT BRIEF SUMMARY",
            details: [
              { label: "Event Type", value: updatedData.eventType || "Event" },
              { label: "Location", value: updatedData.location || "Dubai" },
              { label: "Target Date", value: updatedData.preferredDate || "TBD" },
              { label: "Guests", value: updatedData.guestCountRange || "50-100" },
              { label: "Services", value: Array.isArray(updatedData.servicesRequested) ? updatedData.servicesRequested.join(", ") : updatedData.servicesRequested || "Production" },
              { label: "Name", value: updatedData.fullName || "Pending" },
              { label: "Email", value: updatedData.email || "Pending" },
            ],
            onConfirm: () => submitEventInquiry(updatedData),
          },
        };
      }

      // 2. CREATIVE FLOW
      if (activeFlow === "CREATIVE" && flowRole) {
        return handleCreativeFlowInput(text);
      }

      // 3. SPONSORSHIP / CONTACT FLOW
      if (activeFlow === "SPONSORSHIP" || activeFlow === "CONTACT") {
        return handleContactFlowInput(text);
      }

      // 4. KNOWLEDGE BASE SEARCH
      const response: ConciergeKnowledgeResponse = queryKnowledgeBase(text, config);

      if (response.startFlow === "EVENT") {
        setActiveFlow("EVENT");
        setFlowStep(1);
        setFlowData(newEntities);
      } else if (response.startFlow === "CREATIVE" && response.detectedRole) {
        setActiveFlow("CREATIVE");
        setFlowRole(response.detectedRole);
        setFlowStep(1);
        setFlowData(newEntities);
      } else if (response.startFlow === "SPONSORSHIP") {
        setActiveFlow("SPONSORSHIP");
        setFlowStep(1);
        setFlowData(newEntities);
      }

      return {
        text: response.message,
        chips: response.quickChips,
        navTarget: response.navigationTarget,
      };
    });
  };

  // Creative Flow Input Engine
  const handleCreativeFlowInput = (input: string) => {
    const nextData = { ...flowData };

    if (flowStep === 1) {
      nextData.fullName = input;
      setFlowData(nextData);
      setFlowStep(2);
      return { text: `Thanks, ${input}! What is the best email address to reach you?` };
    } else if (flowStep === 2) {
      if (!isValidEmail(input)) {
        return { text: "Please enter a valid email address (e.g. name@example.com)." };
      }
      nextData.email = input;
      setFlowData(nextData);
      setFlowStep(3);
      return { text: "What is your WhatsApp or phone number?" };
    } else if (flowStep === 3) {
      nextData.whatsapp = input;
      setFlowData(nextData);
      setFlowStep(4);
      return { text: "Which city and country are you based in?" };
    } else if (flowStep === 4) {
      nextData.cityCountry = input;
      setFlowData(nextData);
      setFlowStep(5);
      return { text: "What is your Instagram or portfolio website link?" };
    } else if (flowStep === 5) {
      nextData.portfolioUrl = input;
      setFlowData(nextData);
      setFlowStep(6);

      const roleTitle = flowRole?.replace(/_/g, " ").toUpperCase() || "APPLICATION";
      return {
        text: `Thank you, ${nextData.fullName}! Review your summary below:`,
        chips: [
          { id: "sub-app", label: "SUBMIT APPLICATION ✓", actionKey: "CUSTOM_SUBMIT_APP" },
          { id: "reset-app", label: "Edit details", actionKey: "CUSTOM_RESET" },
        ],
        summary: {
          title: `${roleTitle} SUMMARY`,
          details: [
            { label: "Name", value: nextData.fullName },
            { label: "Email", value: nextData.email },
            { label: "Phone", value: nextData.whatsapp },
            { label: "Location", value: nextData.cityCountry },
            { label: "Portfolio", value: nextData.portfolioUrl },
          ],
          onConfirm: () => submitTalentApplication(nextData, flowRole!),
        },
      };
    }
    return { text: "How else can I assist your event today?" };
  };

  // Contact Flow Input Engine
  const handleContactFlowInput = (input: string) => {
    const nextData = { ...flowData };

    if (flowStep === 1) {
      nextData.fullName = input;
      setFlowData(nextData);
      setFlowStep(2);
      return { text: `Thanks, ${input}! What is your email address?` };
    } else if (flowStep === 2) {
      if (!isValidEmail(input)) {
        return { text: "Please enter a valid email address." };
      }
      nextData.email = input;
      setFlowData(nextData);
      setFlowStep(3);
      return { text: "What is your WhatsApp or phone number?" };
    } else if (flowStep === 3) {
      nextData.whatsapp = input;
      setFlowData(nextData);
      setFlowStep(4);
      return { text: "How can we help you today? Please describe your enquiry." };
    } else if (flowStep === 4) {
      nextData.message = input;
      setFlowData(nextData);
      setFlowStep(5);

      return {
        text: `Thank you, ${nextData.fullName}! Ready to submit your enquiry?`,
        chips: [
          { id: "sub-ct", label: "SUBMIT ENQUIRY ✓", actionKey: "CUSTOM_SUBMIT_CT" },
          { id: "reset-ct", label: "Edit details", actionKey: "CUSTOM_RESET" },
        ],
        summary: {
          title: "ENQUIRY SUMMARY",
          details: [
            { label: "Name", value: nextData.fullName },
            { label: "Email", value: nextData.email },
            { label: "Phone", value: nextData.whatsapp },
          ],
          onConfirm: () => submitContactForm(nextData, activeFlow === "SPONSORSHIP" ? "Sponsorship" : "General Contact"),
        },
      };
    }
    return { text: "How else can I assist your event today?" };
  };

  // Custom Confirm Actions
  const dispatchCustomChipAction = (actionKey: string) => {
    if (isTyping || isLoading) return;

    if (actionKey === "CUSTOM_SUBMIT_EVENT") {
      submitEventInquiry(flowData);
    } else if (actionKey === "CUSTOM_SUBMIT_APP") {
      submitTalentApplication(flowData, flowRole!);
    } else if (actionKey === "CUSTOM_SUBMIT_CT") {
      submitContactForm(flowData, activeFlow === "SPONSORSHIP" ? "Sponsorship" : "General Contact");
    } else if (actionKey === "CUSTOM_RESET") {
      addUserMessage("Edit details");
      queueBotResponse(() => {
        resetFlow();
        return { text: "Enquiry reset. What would you like to plan or discuss?" };
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

        {/* Hyper-Rounded Soft Floating Chatbot Surface */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.92 }}
          transition={{ type: "spring", stiffness: 350, damping: 26 }}
          style={{ willChange: "transform, opacity" }}
          className="relative z-[242] pointer-events-auto w-[calc(100vw-1rem)] sm:w-[440px] h-[84vh] sm:h-[580px] max-h-[640px] bg-[#FAF8F5]/90 dark:bg-[#0C0B0A]/90 border border-white/20 dark:border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.35)] dark:shadow-[0_25px_90px_rgba(0,0,0,0.95)] backdrop-blur-3xl flex flex-col justify-between overflow-hidden rounded-[28px] sm:rounded-[36px] text-[#111111] dark:text-white mb-2 mr-2 sm:mb-0 sm:mr-0"
          role="dialog"
          aria-label="FashAI Event Concierge"
        >
          {/* Header Bar with Circular Logo & Clean Title */}
          <div className="flex items-center justify-between px-6 py-4.5 border-b border-black/5 dark:border-white/5 bg-transparent shrink-0">
            <div className="flex items-center gap-3">
              {/* Circular Chatbot Header Logo */}
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#111111] dark:bg-[#161514] border border-[#D4AF37]/40 flex items-center justify-center p-1 shadow-sm shrink-0 overflow-hidden">
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
                  <span className="font-jost text-sm font-bold uppercase tracking-wider text-[#111111] dark:text-white">
                    FashAI
                  </span>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2E936F] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2E936F]" />
                  </span>
                </div>
                <span className="font-jost text-[11px] text-[#D4AF37] font-medium tracking-wide">
                  Event Concierge
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-[#111111]/70 dark:text-white/70 hover:text-black dark:hover:text-white flex items-center justify-center transition-all"
              aria-label="Close chatbot"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Scroll Area with Breathing Room */}
          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4 bg-transparent">
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
                      <div className="px-4.5 py-3.5 text-xs leading-relaxed font-jost bg-white/90 dark:bg-[#161514]/90 border border-black/5 dark:border-white/10 text-[#111111] dark:text-white/95 rounded-[22px] rounded-tl-xs shadow-xs">
                        <p className="whitespace-pre-line">{msg.text}</p>

                        {/* Review Summary Card */}
                        {msg.reviewSummary && (
                          <div className="mt-3 p-3.5 bg-[#FAF8F5] dark:bg-black/50 border border-[#D4AF37]/40 rounded-2xl space-y-2 text-[11px]">
                            <span className="font-jost font-bold uppercase text-[#D4AF37] block">
                              {msg.reviewSummary.title}
                            </span>
                            {msg.reviewSummary.details.map((d, i) => (
                              <div key={i} className="flex justify-between gap-2 border-b border-black/5 dark:border-white/5 pb-1">
                                <span className="text-[#111111]/70 dark:text-white/70">{d.label}:</span>
                                <span className="font-medium text-[#111111] dark:text-white truncate max-w-[150px]">{d.value}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Navigation Target Button */}
                        {msg.navigationTarget && (
                          <button
                            onClick={() => router.push(msg.navigationTarget!)}
                            className="mt-2.5 inline-flex items-center gap-1.5 text-[10px] font-jost font-bold text-[#D4AF37] hover:underline uppercase pt-1.5 border-t border-black/10 dark:border-white/10 w-full"
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

                      {/* Quick Action Chips (Soft Pill Buttons) */}
                      {msg.quickChips && msg.quickChips.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2.5 max-w-full">
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
                              className="px-4 py-2 rounded-full text-[11px] font-jost font-medium tracking-wide transition-all border bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/40 dark:border-[#D4AF37]/50 hover:bg-[#D4AF37] hover:text-black hover:scale-105 active:scale-95 disabled:opacity-40 shadow-xs"
                            >
                              ( {chip.label} )
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* User Message (Soft Gold Accent, Zero Orange) */
                  <div className="flex flex-col items-end max-w-[85%] self-end">
                    <div className="px-4.5 py-3.5 text-xs leading-relaxed font-jost bg-[#FAF8F3] dark:bg-[#1E1C18] border border-[#D4AF37]/50 dark:border-[#D4AF37]/40 text-[#111111] dark:text-white/95 rounded-[22px] rounded-tr-xs shadow-xs font-medium">
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
                <div className="bg-white/90 dark:bg-[#161514]/90 border border-black/5 dark:border-[#D4AF37]/40 px-4.5 py-3 rounded-[22px] rounded-tl-xs shadow-xs flex items-center gap-2">
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

          {/* Soft Integrated Floating Composer Row */}
          <div className="p-3 sm:p-4 bg-transparent border-t border-black/5 dark:border-white/5 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendInput();
              }}
              className="flex items-center gap-2 sm:gap-2.5 bg-white/80 dark:bg-[#161514]/80 border border-black/10 dark:border-white/15 focus-within:border-[#D4AF37] rounded-full p-1.5 pl-5 transition-all shadow-sm"
            >
              {/* Input Field Box */}
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
                className="flex-1 min-w-0 bg-transparent text-xs font-jost text-[#111111] dark:text-white placeholder:text-[#111111]/45 dark:placeholder:text-white/40 focus:outline-none disabled:opacity-50"
              />

              {/* Dedicated Send Button (Immediately LEFT of Close) */}
              <button
                type="submit"
                disabled={isTyping || isLoading || !inputValue.trim()}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#D4AF37] text-black hover:bg-[#FFEC69] dark:bg-[#D4AF37] dark:text-black dark:hover:bg-[#FFEC69] border border-[#D4AF37] flex items-center justify-center transition-all disabled:opacity-35 disabled:hover:bg-[#D4AF37] shrink-0 shadow-sm hover:scale-105 active:scale-95 min-w-[40px] sm:min-w-[44px] min-h-[40px] sm:min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                aria-label="Send message"
                title="Send message"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>

              {/* Dedicated Close Button (Far-Right Control) */}
              <button
                type="button"
                onClick={onClose}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-[#111111]/70 dark:text-white/70 hover:text-black dark:hover:text-white border border-black/10 dark:border-white/20 flex items-center justify-center transition-all shrink-0 hover:scale-105 active:scale-95 min-w-[40px] sm:min-w-[44px] min-h-[40px] sm:min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                aria-label="Close chatbot"
                title="Close chatbot"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
