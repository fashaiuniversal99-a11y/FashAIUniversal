import { NextResponse } from "next/server";

// Rate Limiter: In-memory per IP instance (15 min window, max 5 applications per IP)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

function sanitizeInput(str: unknown): string {
  if (typeof str !== "string") return "";
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/javascript:/gi, "")
    .replace(/onerror\s*=/gi, "")
    .replace(/onload\s*=/gi, "")
    .trim();
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidUrl(url: string): boolean {
  if (!url) return true;
  try {
    const formatted = url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;
    new URL(formatted);
    return true;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  try {
    // 1. Rate Limiting Check
    const forwarded = request.headers.get("x-forwarded-for");
    const clientIp = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
    const now = Date.now();
    const userLimit = rateLimitMap.get(clientIp);

    if (userLimit && now < userLimit.resetTime) {
      if (userLimit.count >= MAX_REQUESTS_PER_WINDOW) {
        return NextResponse.json(
          { error: "Too many application attempts. Please wait a few minutes before submitting again." },
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

    // 2. Parse Body Payload
    const body = await request.json();
    const rawType = (body.applicationType || body.roleApplied || "").toString().toLowerCase().replace(/[\s-]/g, "_");

    const validTypesMap: Record<string, string> = {
      fashion_designer: "fashion_designer",
      designer: "fashion_designer",
      model: "model",
      makeup_artist: "makeup_artist",
      fashion_stylist: "fashion_stylist",
      stylist: "fashion_stylist",
      influencer_creator: "influencer_creator",
      influencer: "influencer_creator",
      celebrity_public_figure: "celebrity_public_figure",
      celebrity: "celebrity_public_figure",
      choreographer: "choreographer",
      cstp: "cstp",
      fashion_commentary: "fashion_commentary",
      nomination: "nomination",
    };

    const applicationType = validTypesMap[rawType] || "fashion_designer";

    // Common Personal Data
    const fullName = sanitizeInput(body.fullName);
    const email = sanitizeInput(body.email);
    const whatsapp = sanitizeInput(body.whatsapp || body.phone);
    const cityCountry = sanitizeInput(body.cityCountry || body.location || body.city);

    if (!fullName || !email || !whatsapp) {
      return NextResponse.json(
        { error: "Please complete all mandatory contact fields (Full Name, Email, Contact Number)." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Category Specific Sanitized & Validated Record
    let categoryDetails: Record<string, unknown> = {};

    switch (applicationType) {
      case "fashion_designer": {
        const brandName = sanitizeInput(body.brandName);
        const specializations = Array.isArray(body.specializations)
          ? body.specializations.map(sanitizeInput)
          : [sanitizeInput(body.specializations)];
        const experience = sanitizeInput(body.experience);
        const portfolioUrl = sanitizeInput(body.portfolioUrl);
        const instagramUrl = sanitizeInput(body.instagramUrl);
        const availableCollab = body.availableCollab === true || body.availableCollab === "Yes";
        const notes = sanitizeInput(body.notes || body.additionalInfo);

        if (portfolioUrl && !isValidUrl(portfolioUrl)) {
          return NextResponse.json({ error: "Please provide a valid Portfolio URL." }, { status: 400 });
        }

        categoryDetails = {
          brandName,
          specializations,
          experience,
          portfolioUrl,
          instagramUrl,
          availableCollab,
          notes,
        };
        break;
      }

      case "model": {
        const age = body.age ? Number(body.age) : undefined;
        const gender = sanitizeInput(body.gender);
        const heightCm = body.heightCm ? Number(body.heightCm) : undefined;
        const measurements = sanitizeInput(body.measurements);
        const shoeSize = sanitizeInput(body.shoeSize);
        const categories = Array.isArray(body.categories)
          ? body.categories.map(sanitizeInput)
          : [sanitizeInput(body.categories)];
        const instagramLink = sanitizeInput(body.instagramUrl || body.portfolioUrl);
        const availableTravel = body.availableTravel === true || body.availableTravel === "Yes";
        const notes = sanitizeInput(body.notes || body.additionalInfo);

        categoryDetails = {
          age,
          gender,
          heightCm,
          measurements,
          shoeSize,
          categories,
          instagramLink,
          availableTravel,
          notes,
        };
        break;
      }

      case "makeup_artist": {
        const experience = sanitizeInput(body.experience);
        const specializations = Array.isArray(body.specializations)
          ? body.specializations.map(sanitizeInput)
          : [sanitizeInput(body.specializations)];
        const styleExpertise = sanitizeInput(body.styleExpertise);
        const instagramUrl = sanitizeInput(body.instagramUrl);
        const portfolioUrl = sanitizeInput(body.portfolioUrl);
        const hasKit = body.hasKit === true || body.hasKit === "Yes";
        const availableTravel = body.availableTravel === true || body.availableTravel === "Yes";
        const notes = sanitizeInput(body.notes || body.additionalInfo);

        categoryDetails = {
          experience,
          specializations,
          styleExpertise,
          instagramUrl,
          portfolioUrl,
          hasKit,
          availableTravel,
          notes,
        };
        break;
      }

      case "fashion_stylist": {
        const experience = sanitizeInput(body.experience);
        const specializations = Array.isArray(body.specializations)
          ? body.specializations.map(sanitizeInput)
          : [sanitizeInput(body.specializations)];
        const stylingAesthetic = sanitizeInput(body.stylingAesthetic);
        const instagramUrl = sanitizeInput(body.instagramUrl);
        const portfolioUrl = sanitizeInput(body.portfolioUrl);
        const availableTravel = body.availableTravel === true || body.availableTravel === "Yes";
        const availableFreelance = body.availableFreelance === true || body.availableFreelance === "Yes";
        const notes = sanitizeInput(body.notes || body.additionalInfo);

        categoryDetails = {
          experience,
          specializations,
          stylingAesthetic,
          instagramUrl,
          portfolioUrl,
          availableTravel,
          availableFreelance,
          notes,
        };
        break;
      }

      case "influencer_creator": {
        const stageName = sanitizeInput(body.stageName);
        const contentCategories = Array.isArray(body.contentCategories)
          ? body.contentCategories.map(sanitizeInput)
          : [sanitizeInput(body.contentCategories)];
        const primaryPlatform = sanitizeInput(body.primaryPlatform);
        const socialHandle = sanitizeInput(body.socialHandle || body.instagramUrl);
        const followerCount = body.followerCount ? Number(body.followerCount) : undefined;
        const avgViewsReach = sanitizeInput(body.avgViewsReach);
        const engagementRate = sanitizeInput(body.engagementRate);
        const portfolioUrl = sanitizeInput(body.portfolioUrl);
        const availableCollab = body.availableCollab === true || body.availableCollab === "Yes";
        const notes = sanitizeInput(body.notes || body.additionalInfo);

        categoryDetails = {
          stageName,
          contentCategories,
          primaryPlatform,
          socialHandle,
          followerCount,
          avgViewsReach,
          engagementRate,
          portfolioUrl,
          availableCollab,
          notes,
        };
        break;
      }

      case "celebrity_public_figure": {
        const stageName = sanitizeInput(body.stageName);
        const realNamePrivate = sanitizeInput(body.realNamePrivate); // PRIVATE / CONFIDENTIAL FIELD
        const profession = sanitizeInput(body.profession);
        const professionalContact = sanitizeInput(body.professionalContact);
        const instagramUrl = sanitizeInput(body.instagramUrl);
        const followerCount = body.followerCount ? Number(body.followerCount) : undefined;
        const majorAchievements = sanitizeInput(body.majorAchievements);
        const mediaKitUrl = sanitizeInput(body.mediaKitUrl || body.portfolioUrl);
        const managementContact = sanitizeInput(body.managementContact);
        const interests = Array.isArray(body.interests)
          ? body.interests.map(sanitizeInput)
          : [sanitizeInput(body.interests)];
        const availableTravel = body.availableTravel === true || body.availableTravel === "Yes";
        const notes = sanitizeInput(body.notes || body.additionalInfo);

        categoryDetails = {
          stageName,
          realNamePrivate, // Preserved strictly in server-side payload, never exposed in client API responses
          profession,
          professionalContact,
          instagramUrl,
          followerCount,
          majorAchievements,
          mediaKitUrl,
          managementContact,
          interests,
          availableTravel,
          notes,
        };
        break;
      }

      case "choreographer": {
        const stageName = sanitizeInput(body.stageName);
        const experience = sanitizeInput(body.experience);
        const specializations = Array.isArray(body.specializations)
          ? body.specializations.map(sanitizeInput)
          : [sanitizeInput(body.specializations)];
        const danceStyles = sanitizeInput(body.danceStyles);
        const instagramUrl = sanitizeInput(body.instagramUrl);
        const showreelUrl = sanitizeInput(body.showreelUrl);
        const pastEvents = sanitizeInput(body.pastEvents || body.previousProjects);
        const availableTravel = body.availableTravel === true || body.availableTravel === "Yes";
        const notes = sanitizeInput(body.notes || body.additionalInfo);

        categoryDetails = {
          stageName,
          experience,
          specializations,
          danceStyles,
          instagramUrl,
          showreelUrl,
          pastEvents,
          availableTravel,
          notes,
        };
        break;
      }

      case "cstp": {
        const cstpDomain = sanitizeInput(body.cstpDomain || body.specializations);
        const experience = sanitizeInput(body.experience);
        const portfolioUrl = sanitizeInput(body.portfolioUrl);
        const instagramUrl = sanitizeInput(body.instagramUrl);
        const availableTravel = body.availableTravel === true || body.availableTravel === "Yes";
        const notes = sanitizeInput(body.notes || body.additionalInfo);

        categoryDetails = {
          cstpDomain,
          experience,
          portfolioUrl,
          instagramUrl,
          availableTravel,
          notes,
        };
        break;
      }

      case "fashion_commentary": {
        const stageName = sanitizeInput(body.stageName);
        const specializations = Array.isArray(body.specializations)
          ? body.specializations.map(sanitizeInput)
          : [sanitizeInput(body.specializations)];
        const publicationPlatform = sanitizeInput(body.publicationPlatform);
        const previousCoverage = sanitizeInput(body.previousCoverage);
        const portfolioUrl = sanitizeInput(body.portfolioUrl);
        const instagramUrl = sanitizeInput(body.instagramUrl);
        const showreelUrl = sanitizeInput(body.showreelUrl);
        const availableEvents = body.availableEvents === true || body.availableEvents === "Yes";
        const availableTravel = body.availableTravel === true || body.availableTravel === "Yes";
        const notes = sanitizeInput(body.notes || body.additionalInfo);

        categoryDetails = {
          stageName,
          specializations,
          publicationPlatform,
          previousCoverage,
          portfolioUrl,
          instagramUrl,
          showreelUrl,
          availableEvents,
          availableTravel,
          notes,
        };
        break;
      }

      case "nomination": {
        const nomineeName = sanitizeInput(body.nomineeName);
        const nomineeRole = sanitizeInput(body.nomineeRole);
        const nomineeContact = sanitizeInput(body.nomineeContact);
        const notes = sanitizeInput(body.notes || body.additionalInfo);

        categoryDetails = {
          nomineeName,
          nomineeRole,
          nomineeContact,
          notes,
        };
        break;
      }
    }

    const applicationRecord = {
      applicationType,
      fullName,
      email,
      whatsapp,
      cityCountry,
      categoryDetails,
      submittedAt: new Date().toISOString(),
    };

    // Save submission to Master Admin Data Repository
    try {
      const { saveSubmission } = await import("@/lib/admin/storage");
      const domainLabelsMap: Record<string, string> = {
        fashion_designer: "Fashion Designer",
        model: "Model",
        makeup_artist: "Makeup Artist",
        fashion_stylist: "Fashion Stylist",
        influencer_creator: "Influencer / Creator",
        celebrity_public_figure: "Celebrity / Public Figure",
        choreographer: "Choreographer",
        cstp: "Creative & Technical Professional",
        fashion_commentary: "Fashion Commentary / Media",
        nomination: "Industry Nomination",
      };

      await saveSubmission({
        type: "APPLICATION",
        source: (body.source as any) || "APPLICATION_FORM",
        applicationType,
        domain: domainLabelsMap[applicationType] || applicationType,
        fullName,
        email,
        phone: whatsapp,
        city: cityCountry,
        categoryDetails,
        status: "NEW",
      });
    } catch (err) {
      console.warn("Could not persist talent application to storage:", err);
    }

    return NextResponse.json({
      success: true,
      message: "Application received successfully. Thank you for applying to the FashAI Universal Talent Network.",
      submittedAt: applicationRecord.submittedAt,
    });
  } catch (err) {
    console.error("Talent application submission error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your application. Please try again." },
      { status: 500 }
    );
  }
}
