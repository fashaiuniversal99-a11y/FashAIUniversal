import { NextResponse } from "next/server";

// Simple sliding window rate limiter (In-memory per IP instance)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// Helper for XSS sanitization (removes HTML tags and dangerous scripts)
function sanitizeInput(str: string | undefined): string {
  if (!str || typeof str !== "string") return "";
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/javascript:/gi, "")
    .replace(/onerror\s*=/gi, "")
    .replace(/onload\s*=/gi, "")
    .trim();
}

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
          { error: "Too many enquiry submissions from this IP. Please wait a few minutes before trying again." },
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

    // Clean up expired rate limit entries safely using forEach
    if (rateLimitMap.size > 1000) {
      rateLimitMap.forEach((value, key) => {
        if (now > value.resetTime) {
          rateLimitMap.delete(key);
        }
      });
    }

    // 2. Parse payload safely
    const body = await request.json();
    const name = sanitizeInput(body.name);
    const email = sanitizeInput(body.email);
    const phone = sanitizeInput(body.phone);
    const country = sanitizeInput(body.country);
    const city = sanitizeInput(body.city);
    const organization = sanitizeInput(body.organization);
    const role = sanitizeInput(body.role);
    const enquiryType = sanitizeInput(body.enquiryType || body.subject || body.inquiryType || "Registration");
    const eventInterest = sanitizeInput(body.eventInterest || body.interest || "LifeStyle 2026");
    const message = sanitizeInput(body.message);

    // 3. Required Field Validation
    if (!name || !email || !enquiryType || !eventInterest || !message) {
      return NextResponse.json(
        { error: "Please complete all required fields (*)." },
        { status: 400 }
      );
    }

    // 4. Input Length Constraints
    if (name.length > 100) {
      return NextResponse.json(
        { error: "Name exceeds maximum permitted length (100 characters)." },
        { status: 400 }
      );
    }

    if (email.length > 150) {
      return NextResponse.json(
        { error: "Email exceeds maximum permitted length (150 characters)." },
        { status: 400 }
      );
    }

    if (phone.length > 35) {
      return NextResponse.json(
        { error: "Phone number exceeds maximum permitted length." },
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        { error: "Please provide a detailed message (minimum 10 characters)." },
        { status: 400 }
      );
    }

    if (message.length > 3000) {
      return NextResponse.json(
        { error: "Message exceeds maximum permitted length (3000 characters)." },
        { status: 400 }
      );
    }

    // 5. Server-side Email Format Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // 6. Save Submission to Master Admin Data Repository
    try {
      const { saveSubmission } = await import("@/lib/admin/storage");
      await saveSubmission({
        type: "CONTACT",
        source: (body.source as any) || "CONTACT_FORM",
        domain: enquiryType || "General Inquiry",
        fullName: name,
        email,
        phone,
        country,
        city,
        organization,
        role,
        enquiryType,
        eventInterest,
        message,
        status: "NEW",
      });
    } catch (err) {
      console.warn("Could not persist contact submission to storage:", err);
    }

    return NextResponse.json({
      success: true,
      message: "Your enquiry has been submitted successfully to FashAI Universal.",
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to process enquiry. Please check your submission and try again." },
      { status: 500 }
    );
  }
}
