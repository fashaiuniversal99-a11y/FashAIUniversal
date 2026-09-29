import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { saveSubmission, addActivityLog } from "@/lib/admin/storage";
import { SubmissionAttachment } from "@/lib/admin/config-schema";

// Simple sliding window rate limiter (In-memory per IP instance)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// Helper for XSS sanitization (removes HTML tags and dangerous scripts)
function sanitizeInput(str: unknown): string {
  if (!str || typeof str !== "string") return "";
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/javascript:/gi, "")
    .replace(/onerror\s*=/gi, "")
    .replace(/onload\s*=/gi, "")
    .trim();
}

function sanitizeArray(arr: unknown): string[] {
  if (!Array.isArray(arr)) {
    if (typeof arr === "string" && arr.trim()) {
      return [sanitizeInput(arr)];
    }
    return [];
  }
  return arr.map((item) => sanitizeInput(item)).filter(Boolean);
}

const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx", ".ppt", ".pptx", ".jpg", ".jpeg", ".png"];
const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15 MB

export async function POST(request: Request) {
  try {
    // 1. IP Rate Limiting
    const forwarded = request.headers.get("x-forwarded-for");
    const clientIp = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

    const now = Date.now();
    const userLimit = rateLimitMap.get(clientIp);

    if (userLimit && now < userLimit.resetTime) {
      if (userLimit.count >= MAX_REQUESTS_PER_WINDOW) {
        return NextResponse.json(
          { error: "Too many event inquiry submissions from this IP. Please wait a few minutes before trying again." },
          { status: 429 }
        );
      }
      userLimit.count += 1;
    } else {
      rateLimitMap.set(clientIp, {
        count: 1,
        resetTime: now + RATE_LIMIT_WINDOW_MS,
      });
    }

    // 2. Parse payload (Supports both JSON and Multipart FormData)
    const contentType = request.headers.get("content-type") || "";
    let body: Record<string, unknown> = {};
    const attachments: SubmissionAttachment[] = [];

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      formData.forEach((value, key) => {
        if (key === "file" || key === "attachment" || key === "attachments") {
          // File object handled separately below
        } else if (key.endsWith("[]")) {
          const cleanKey = key.slice(0, -2);
          if (!body[cleanKey]) body[cleanKey] = [];
          (body[cleanKey] as string[]).push(value.toString());
        } else {
          // Parse JSON strings for arrays if applicable
          try {
            const parsed = JSON.parse(value.toString());
            if (Array.isArray(parsed)) {
              body[key] = parsed;
              return;
            }
          } catch {}
          body[key] = value.toString();
        }
      });

      // Handle File Attachments securely
      const files = formData.getAll("file").concat(formData.getAll("attachment")).concat(formData.getAll("attachments"));
      for (const fileObj of files) {
        if (fileObj && typeof fileObj === "object" && "name" in fileObj && "arrayBuffer" in fileObj) {
          const file = fileObj as File;
          if (file.size > 0) {
            if (file.size > MAX_FILE_SIZE) {
              return NextResponse.json(
                { error: `Attachment ${file.name} exceeds maximum permitted size of 15MB.` },
                { status: 400 }
              );
            }

            const ext = path.extname(file.name).toLowerCase();
            if (!ALLOWED_EXTENSIONS.includes(ext)) {
              return NextResponse.json(
                { error: `File extension ${ext} is not permitted. Allowed: PDF, DOC, PPT, JPG, PNG.` },
                { status: 400 }
              );
            }

            const uploadDir = path.join(process.cwd(), "public", "uploads", "event-briefs");
            await fs.mkdir(uploadDir, { recursive: true });

            const safeFilename = `brief_${Date.now()}_${Math.random().toString(36).substr(2, 6)}${ext}`;
            const filePath = path.join(uploadDir, safeFilename);

            const buffer = Buffer.from(await file.arrayBuffer());
            await fs.writeFile(filePath, buffer);

            attachments.push({
              filename: safeFilename,
              originalName: sanitizeInput(file.name),
              size: file.size,
              url: `/uploads/event-briefs/${safeFilename}`,
              mimeType: file.type || "application/octet-stream",
            });
          }
        }
      }
    } else {
      body = await request.json();
    }

    // 3. Extract & Sanitize Input Fields
    const fullName = sanitizeInput(body.fullName || body.name);
    const company = sanitizeInput(body.company || body.organization);
    const email = sanitizeInput(body.email);
    const phone = sanitizeInput(body.phone);
    const role = sanitizeInput(body.role);
    const preferredContactMethod = sanitizeInput(body.preferredContactMethod || "Email");

    const eventName = sanitizeInput(body.eventName);
    const eventTypes = sanitizeArray(body.eventTypes || body.eventType);
    const eventDescription = sanitizeInput(body.eventDescription || body.message);

    const preferredDate = sanitizeInput(body.preferredDate || body.date);
    const dateFlexible = sanitizeInput(body.dateFlexible || "Not decided");
    const alternativeDate = sanitizeInput(body.alternativeDate);
    const guestCountRange = sanitizeInput(body.guestCountRange || body.guestCount);
    const guestCount = sanitizeInput(body.guestCountExact || body.guestCount);
    const location = sanitizeInput(body.location || body.city);
    const venueStatus = sanitizeInput(body.venueStatus || "Not decided");
    const venueName = sanitizeInput(body.venueName);
    const venueAddress = sanitizeInput(body.venueAddress);

    const startDateTime = sanitizeInput(body.startDateTime);
    const endDateTime = sanitizeInput(body.endDateTime);
    const duration = sanitizeInput(body.duration);
    const indoorOutdoor = sanitizeInput(body.indoorOutdoor || "Not decided");
    const eventScale = sanitizeInput(body.eventScale || "Mid-size");

    const servicesRequested = sanitizeArray(body.servicesRequested || body.services);

    const eventVision = sanitizeInput(body.eventVision);
    const desiredOutcomes = sanitizeArray(body.desiredOutcomes || body.outcomes);
    const creativeDirection = sanitizeInput(body.creativeDirection);

    const budgetCurrency = sanitizeInput(body.budgetCurrency || "AED");
    const budgetRange = sanitizeInput(body.budgetRange || body.budget);
    const budget = sanitizeInput(body.budgetExact || body.budget);

    const planningTimeline = sanitizeInput(body.planningTimeline || body.timeline);
    const proposalDeadline = sanitizeInput(body.proposalDeadline);
    const additionalRequirements = sanitizeInput(body.additionalRequirements);
    const consent = body.consent === true || body.consent === "true" || body.consent === "on";

    // 4. Server-Side Validation
    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: "Please complete all mandatory contact fields (Full Name, Work Email, Phone/WhatsApp)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid work email address." },
        { status: 400 }
      );
    }

    if (!eventTypes || eventTypes.length === 0) {
      return NextResponse.json(
        { error: "Please select at least one event type you are planning." },
        { status: 400 }
      );
    }

    if (!eventDescription || eventDescription.length < 10) {
      return NextResponse.json(
        { error: "Please provide a brief description of your event (minimum 10 characters)." },
        { status: 400 }
      );
    }

    if (!preferredDate) {
      return NextResponse.json(
        { error: "Please select your preferred event date." },
        { status: 400 }
      );
    }

    if (!location) {
      return NextResponse.json(
        { error: "Please specify your target event location or city." },
        { status: 400 }
      );
    }

    if (!consent) {
      return NextResponse.json(
        { error: "Please check the consent box to allow FashAI Universal to contact you regarding your event brief." },
        { status: 400 }
      );
    }

    // 5. Generate Unique Reference Number (FI-2026-XXXXX)
    const refNum = `FI-2026-${Math.floor(10000 + Math.random() * 90000)}`;

    // 6. Save Record to Storage
    const newRecord = await saveSubmission({
      type: "EVENT_INQUIRY",
      source: (body.source as any) || "EVENT_MANAGEMENT_FORM",
      referenceNumber: refNum,
      domain: eventTypes.join(", "),
      fullName,
      company: company || undefined,
      email,
      phone,
      preferredContactMethod,
      role: role || undefined,

      eventName: eventName || undefined,
      eventTypes,
      eventDescription,

      preferredDate,
      dateFlexible,
      alternativeDate: alternativeDate || undefined,

      guestCount: guestCount || undefined,
      guestCountRange,
      location,
      venueStatus,
      venueName: venueName || undefined,
      venueAddress: venueAddress || undefined,

      startDateTime: startDateTime || undefined,
      endDateTime: endDateTime || undefined,
      duration: duration || undefined,
      indoorOutdoor,
      eventScale,

      servicesRequested,

      eventVision: eventVision || undefined,
      desiredOutcomes,
      creativeDirection: creativeDirection || undefined,

      budgetCurrency,
      budgetRange,
      budget: budget || undefined,

      planningTimeline: planningTimeline || undefined,
      proposalDeadline: proposalDeadline || undefined,
      additionalRequirements: additionalRequirements || undefined,

      attachments: attachments.length > 0 ? attachments : undefined,
      consent: true,
      conversationHistory: Array.isArray(body.conversationHistory) ? (body.conversationHistory as any) : undefined,
      conversationId: typeof body.conversationId === "string" ? body.conversationId : undefined,

      status: "NEW",
    });

    await addActivityLog("CONTENT", `Received new Event Inquiry ${refNum}`, fullName, `Event: ${eventName || eventTypes.join(", ")}`);

    return NextResponse.json({
      success: true,
      referenceNumber: refNum,
      id: newRecord.id,
      message: "Your event brief has been submitted successfully to FashAI Universal.",
    });
  } catch (err) {
    console.error("Event Inquiry API Error:", err);
    return NextResponse.json(
      { error: "Failed to submit event inquiry. Please check your brief and try again." },
      { status: 500 }
    );
  }
}
