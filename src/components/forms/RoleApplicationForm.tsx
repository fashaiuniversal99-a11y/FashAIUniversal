"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, ArrowLeft, Send, Sparkles, AlertCircle } from "lucide-react";
import Link from "next/link";
import GradientFlowText from "../ui/GradientFlowText";
import SubmitSuccessExpand from "../ui/SubmitSuccessExpand";

export type RoleSlug =
  | "model"
  | "designer"
  | "makeup-artist"
  | "makeup_artist"
  | "fashion-stylist"
  | "stylist"
  | "choreographer"
  | "influencer"
  | "celebrity"
  | "cstp"
  | "fashion-commentary"
  | "fashion_commentary"
  | "nomination";

export interface RoleApplicationFormProps {
  roleSlug: RoleSlug;
  onSuccess?: () => void;
  isModal?: boolean;
}

export interface FormState {
  fullName: string;
  stageName: string;
  realNamePrivate: string;
  email: string;
  phone: string;
  cityCountry: string;
  
  // Model specific
  age: string;
  gender: string;
  heightCm: string;
  measurements: string;
  shoeSize: string;
  modelingCategory: string;
  
  // Designer specific
  brandName: string;
  designSpecialization: string;
  yearsExperience: string;
  availableCollab: string;
  
  // Makeup artist specific
  makeupSpecialization: string;
  styleExpertise: string;
  hasKit: string;
  
  // Stylist specific
  stylingSpecialization: string;
  stylingAesthetic: string;
  availableFreelance: string;
  
  // Choreographer specific
  choreographySpecialization: string;
  danceStyles: string;
  pastEvents: string;
  showreelUrl: string;
  
  // Influencer specific
  contentCategory: string;
  primaryPlatform: string;
  socialHandle: string;
  followerCount: string;
  avgViewsReach: string;
  engagementRate: string;
  previousBrandCollabs: string;
  
  // Celebrity specific
  profession: string;
  professionalContact: string;
  majorAchievements: string;
  managementContact: string;
  interests: string;
  
  // CSTP specific
  cstpDomain: string;
  
  // Fashion Commentary specific
  publicationPlatform: string;
  previousCoverage: string;
  availableEvents: string;
  
  // Nomination specific
  nomineeName: string;
  nomineeRole: string;
  nomineeContact: string;
  
  // Shared
  portfolioUrl: string;
  instagramUrl: string;
  workSamplesUrl: string;
  availableTravel: string;
  additionalInfo: string;
}

const initialFormState: FormState = {
  fullName: "",
  stageName: "",
  realNamePrivate: "",
  email: "",
  phone: "",
  cityCountry: "",
  age: "",
  gender: "Female",
  heightCm: "",
  measurements: "",
  shoeSize: "",
  modelingCategory: "Runway",
  brandName: "",
  designSpecialization: "Couture",
  yearsExperience: "3-5 years",
  availableCollab: "Yes",
  makeupSpecialization: "Fashion",
  styleExpertise: "",
  hasKit: "Yes",
  stylingSpecialization: "Fashion",
  stylingAesthetic: "",
  availableFreelance: "Yes",
  choreographySpecialization: "Runway",
  danceStyles: "",
  pastEvents: "",
  showreelUrl: "",
  contentCategory: "Fashion",
  primaryPlatform: "Instagram",
  socialHandle: "",
  followerCount: "",
  avgViewsReach: "",
  engagementRate: "",
  previousBrandCollabs: "Yes",
  profession: "Actor",
  professionalContact: "",
  majorAchievements: "",
  managementContact: "",
  interests: "All",
  cstpDomain: "Computational Fashion",
  publicationPlatform: "",
  previousCoverage: "",
  availableEvents: "Yes",
  nomineeName: "",
  nomineeRole: "Designer",
  nomineeContact: "",
  portfolioUrl: "",
  instagramUrl: "",
  workSamplesUrl: "",
  availableTravel: "Yes",
  additionalInfo: "",
};

export default function RoleApplicationForm({ roleSlug, onSuccess, isModal = false }: RoleApplicationFormProps) {
  const normalizedRole = (roleSlug || "designer").toLowerCase().replace(/-/g, "_");

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const getRoleMetadata = () => {
    switch (normalizedRole) {
      case "model":
        return {
          title: "MODEL APPLICATION",
          subtitle: "Tell us about your modeling profile, measurements, and experience.",
          badge: "RUNWAY & EDITORIAL MODELING",
        };
      case "designer":
        return {
          title: "DESIGNER APPLICATION",
          subtitle: "Present your brand, couture vision, and atelier design experience.",
          badge: "COUTURE ATELIER & DIRECTION",
        };
      case "makeup_artist":
        return {
          title: "MAKEUP ARTIST APPLICATION",
          subtitle: "Share your beauty direction, backstage artistry, and look styling.",
          badge: "BEAUTY & BACKSTAGE ARTISTRY",
        };
      case "stylist":
      case "fashion_stylist":
        return {
          title: "FASHION STYLIST APPLICATION",
          subtitle: "Detail your wardrobe styling, campaign lookbook, and editorial experience.",
          badge: "WARDROBE & STYLING DIRECTION",
        };
      case "choreographer":
        return {
          title: "CHOREOGRAPHER APPLICATION",
          subtitle: "Describe your movement direction, catwalk choreography, and stage experience.",
          badge: "MOVEMENT & CATWALK CHOREOGRAPHY",
        };
      case "influencer":
      case "influencer_creator":
        return {
          title: "INFLUENCER / CONTENT CREATOR APPLICATION",
          subtitle: "Share your platform metrics, content storytelling, and brand collaborations.",
          badge: "DIGITAL MEDIA & CREATORS",
        };
      case "celebrity":
      case "celebrity_public_figure":
        return {
          title: "CELEBRITY / PUBLIC FIGURE APPLICATION",
          subtitle: "Private registration for VIP appearances, campaigns, and strategic roles.",
          badge: "CONFIDENTIAL VIP REGISTRATION",
        };
      case "cstp":
        return {
          title: "CSTP APPLICATION",
          subtitle: "Apply for Computational Style & Talent Program opportunities.",
          badge: "COMPUTATIONAL FASHION PROGRAM",
        };
      case "fashion_commentary":
        return {
          title: "FASHION COMMENTARY APPLICATION",
          subtitle: "Apply for fashion journalism, runway analysis, and commentary roles.",
          badge: "FASHION MEDIA & JOURNALISM",
        };
      case "nomination":
        return {
          title: "NOMINATE A CREATIVE TALENT",
          subtitle: "Nominate an outstanding designer, model, artist, or stylist.",
          badge: "CREATIVE NOMINATION FLOW",
        };
      default:
        return {
          title: "TALENT APPLICATION",
          subtitle: "Join the FashAI Universal Talent Network.",
          badge: "OFFICIAL TALENT NETWORK",
        };
    }
  };

  const meta = getRoleMetadata();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (normalizedRole === "nomination") {
        if (!formData.fullName || !formData.email || !formData.nomineeName) {
          setErrorMessage("Please complete all mandatory fields marked with (*).");
          return;
        }
      } else if (normalizedRole === "celebrity" || normalizedRole === "celebrity_public_figure") {
        if (!formData.stageName || !formData.realNamePrivate || !formData.email || !formData.phone) {
          setErrorMessage("Please complete all required fields (*).");
          return;
        }
      } else {
        if (!formData.fullName || !formData.email || !formData.phone || !formData.cityCountry) {
          setErrorMessage("Please complete all required contact fields (*).");
          return;
        }
      }
    }
    setErrorMessage("");
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrevStep = () => {
    setErrorMessage("");
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const payload = {
        roleApplied: normalizedRole,
        applicationType: normalizedRole,
        fullName: formData.fullName || formData.stageName,
        stageName: formData.stageName,
        realNamePrivate: formData.realNamePrivate,
        email: formData.email,
        phone: formData.phone,
        whatsapp: formData.phone,
        cityCountry: formData.cityCountry,
        location: formData.cityCountry,
        
        // Model
        age: formData.age,
        gender: formData.gender,
        heightCm: formData.heightCm,
        measurements: formData.measurements,
        shoeSize: formData.shoeSize,
        categories: formData.modelingCategory,

        // Designer
        brandName: formData.brandName,
        specializations: formData.designSpecialization || formData.makeupSpecialization || formData.stylingSpecialization || formData.choreographySpecialization || formData.cstpDomain,
        experience: formData.yearsExperience,
        availableCollab: formData.availableCollab === "Yes",

        // Makeup
        styleExpertise: formData.styleExpertise,
        hasKit: formData.hasKit === "Yes",

        // Stylist
        stylingAesthetic: formData.stylingAesthetic,
        availableFreelance: formData.availableFreelance === "Yes",

        // Choreographer
        danceStyles: formData.danceStyles,
        pastEvents: formData.pastEvents,
        showreelUrl: formData.showreelUrl,

        // Influencer
        contentCategories: formData.contentCategory,
        primaryPlatform: formData.primaryPlatform,
        socialHandle: formData.socialHandle,
        followerCount: formData.followerCount,
        avgViewsReach: formData.avgViewsReach,
        engagementRate: formData.engagementRate,

        // Celebrity
        profession: formData.profession,
        professionalContact: formData.professionalContact,
        majorAchievements: formData.majorAchievements,
        managementContact: formData.managementContact,
        interests: formData.interests,

        // CSTP & Commentary
        cstpDomain: formData.cstpDomain,
        publicationPlatform: formData.publicationPlatform,
        previousCoverage: formData.previousCoverage,
        availableEvents: formData.availableEvents,

        // Nomination
        nomineeName: formData.nomineeName,
        nomineeRole: formData.nomineeRole,
        nomineeContact: formData.nomineeContact,

        // Shared
        portfolioUrl: formData.portfolioUrl || formData.workSamplesUrl,
        instagramUrl: formData.instagramUrl || formData.socialHandle,
        availableTravel: formData.availableTravel === "Yes",
        notes: formData.additionalInfo,
        additionalInfo: formData.additionalInfo,
      };

      const response = await fetch("/api/talent-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Submission failed. Please check your entries.");
      }

      setIsSubmitted(true);
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "An error occurred during submission. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`w-full ${isModal ? "" : "max-w-4xl mx-auto py-4 sm:py-6 px-2 sm:px-4"}`}>
      {/* Header Section */}
      <div className="mb-6 sm:mb-8 border-b border-white/10 pb-5">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-syne tracking-widest text-brand-yellow-golden font-bold uppercase mb-2">
          <span>{meta.badge}</span>
        </div>
        <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-brand-white uppercase leading-tight mb-2">
          {meta.title}
        </h1>
        <p className="font-sans text-base sm:text-lg md:text-xl text-brand-platinum/85 font-light max-w-2xl leading-relaxed">
          {meta.subtitle}
        </p>

        {/* Step Indicator */}
        {!isSubmitted && (
          <div className="grid grid-cols-4 gap-2 sm:gap-3 mt-5 sm:mt-6">
            {[
              { num: "01", label: "PERSONAL" },
              { num: "02", label: "PROFESSIONAL" },
              { num: "03", label: "PORTFOLIO" },
              { num: "04", label: "AVAILABILITY" },
            ].map((s, idx) => (
              <div
                key={s.num}
                className={`py-2.5 px-2.5 sm:px-4 rounded-xl border text-center transition-all ${
                  step === idx + 1
                    ? "bg-brand-yellow-golden/10 border-brand-yellow-golden text-brand-yellow-golden shadow-sm"
                    : step > idx + 1
                    ? "bg-white/5 border-white/20 text-white/90"
                    : "bg-black/40 border-white/10 text-white/40"
                }`}
              >
                <div className="text-xs sm:text-sm md:text-base font-syne font-bold tracking-wider">{s.num} {s.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SUCCESS STATE */}
      <SubmitSuccessExpand show={isSubmitted}>
        <div className="bg-[#0D0C0A] border border-brand-yellow-golden/50 p-8 sm:p-12 rounded-3xl text-center space-y-6 shadow-[0_0_60px_rgba(250,182,10,0.15)]">
          <div className="w-16 h-16 bg-brand-yellow-golden/20 border border-brand-yellow-golden rounded-full flex items-center justify-center mx-auto text-brand-yellow-golden">
            <CheckCircle className="w-10 h-10" />
          </div>
          <div>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-light text-white tracking-tight mb-3">
              Application Received
            </h2>
            <p className="font-sans text-base sm:text-lg text-brand-platinum font-normal leading-relaxed max-w-lg mx-auto">
              Thank you for applying to the FashAI Universal talent network.
            </p>
            <p className="font-sans text-sm text-brand-platinum/80 font-light leading-relaxed max-w-lg mx-auto mt-1">
              Your details have been submitted for review.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/talent"
              className="inline-flex items-center gap-2 bg-brand-yellow-golden text-black px-6 py-3.5 text-xs sm:text-sm font-jost font-bold tracking-wider rounded-full hover:bg-yellow-400 transition-colors shadow-lg uppercase"
            >
              <span>VIEW TALENT NETWORK</span> <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-3.5 text-xs sm:text-sm font-jost font-bold tracking-wider rounded-full hover:bg-white/10 transition-colors uppercase"
            >
              <span>RETURN HOME</span>
            </Link>
          </div>
        </div>
      </SubmitSuccessExpand>

      {!isSubmitted && (
        /* FORM STATE */
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          {errorMessage && (
            <div className="p-4 bg-red-950/90 border border-red-500/50 text-red-200 text-sm sm:text-base rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: PERSONAL & CONTACT INFORMATION */}
          {step === 1 && (
            <div className="bg-[#090807] border border-white/10 p-5 sm:p-8 rounded-2xl space-y-5 sm:space-y-6">
              <h3 className="font-serif-display text-xl sm:text-2xl md:text-3xl font-light tracking-tight text-brand-yellow-golden uppercase border-b border-white/10 pb-3">
                01 PERSONAL &amp; CONTACT INFORMATION
              </h3>

              {normalizedRole === "celebrity" || normalizedRole === "celebrity_public_figure" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                      Professional / Stage Name <span className="text-[#F15E1C] dark:text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="text"
                      name="stageName"
                      value={formData.stageName}
                      onChange={handleChange}
                      placeholder="Public Stage Alias"
                      className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none placeholder:text-white/40"
                    />
                  </div>
                  <div>
                    <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-yellow-golden uppercase font-bold mb-1.5 sm:mb-2">
                      Real Name (PRIVATE — NOT PUBLICLY DISPLAYED) <span className="text-[#F15E1C] dark:text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="text"
                      name="realNamePrivate"
                      value={formData.realNamePrivate}
                      onChange={handleChange}
                      placeholder="Legal Name (Confidential)"
                      className="w-full bg-black/90 border border-brand-yellow-golden/50 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none placeholder:text-white/40"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                      Full Name <span className="text-[#F15E1C] dark:text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none placeholder:text-white/40"
                    />
                  </div>
                  {normalizedRole !== "nomination" && (
                    <div>
                      <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                        {normalizedRole === "designer"
                          ? "Brand / Professional Name"
                          : normalizedRole === "influencer"
                          ? "Creator / Stage Name"
                          : "Professional Alias / Stage Name"}
                      </label>
                      <input
                        type="text"
                        name="stageName"
                        value={formData.stageName}
                        onChange={handleChange}
                        placeholder="Brand or professional alias (optional)"
                        className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none placeholder:text-white/40"
                      />
                    </div>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                    Email Address <span className="text-[#F15E1C] dark:text-[#D4AF37]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@domain.com"
                    className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none placeholder:text-white/40"
                  />
                </div>
                <div>
                  <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                    WhatsApp / Contact Number <span className="text-[#F15E1C] dark:text-[#D4AF37]">*</span>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+971 50 123 4567 / +91 98765 43210"
                    className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none placeholder:text-white/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                    City &amp; Country <span className="text-[#F15E1C] dark:text-[#D4AF37]">*</span>
                  </label>
                  <input
                    type="text"
                    name="cityCountry"
                    value={formData.cityCountry}
                    onChange={handleChange}
                    placeholder="e.g. Dubai, UAE / Mumbai, India"
                    className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none placeholder:text-white/40"
                  />
                </div>

                {normalizedRole === "nomination" && (
                  <div>
                    <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-yellow-golden uppercase font-bold mb-1.5 sm:mb-2">
                      Nominee Full Name <span className="text-[#F15E1C] dark:text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="text"
                      name="nomineeName"
                      value={formData.nomineeName}
                      onChange={handleChange}
                      placeholder="Name of person you are nominating"
                      className="w-full bg-black/90 border border-brand-yellow-golden/40 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none placeholder:text-white/40"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
          {/* STEP 2: ROLE-SPECIFIC PROFESSIONAL DETAILS */}
          {step === 2 && (
            <div className="bg-[#090807] border border-white/10 p-5 sm:p-8 rounded-2xl space-y-5 sm:space-y-6">
              <h3 className="font-serif-display text-xl sm:text-2xl md:text-3xl font-light tracking-tight text-brand-yellow-golden uppercase border-b border-white/10 pb-3">
                02 PROFESSIONAL &amp; ROLE SPECIFICATION
              </h3>

              {/* MODEL FORM FIELDS */}
              {normalizedRole === "model" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
                    <div>
                      <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                        Age
                      </label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="e.g. 22"
                        className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none placeholder:text-white/40"
                      />
                    </div>
                    <div>
                      <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                        Gender
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none"
                      >
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Non-Binary">Non-Binary</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                        Height (cm)
                      </label>
                      <input
                        type="number"
                        name="heightCm"
                        value={formData.heightCm}
                        onChange={handleChange}
                        placeholder="e.g. 178"
                        className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none placeholder:text-white/40"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
                    <div>
                      <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                        Measurements (Bust/Waist/Hips)
                      </label>
                      <input
                        type="text"
                        name="measurements"
                        value={formData.measurements}
                        onChange={handleChange}
                        placeholder="e.g. 34-24-35"
                        className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none placeholder:text-white/40"
                      />
                    </div>
                    <div>
                      <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                        Shoe Size
                      </label>
                      <input
                        type="text"
                        name="shoeSize"
                        value={formData.shoeSize}
                        onChange={handleChange}
                        placeholder="e.g. EU 39 / US 8"
                        className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none placeholder:text-white/40"
                      />
                    </div>
                    <div>
                      <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                        Modeling Category
                      </label>
                      <select
                        name="modelingCategory"
                        value={formData.modelingCategory}
                        onChange={handleChange}
                        className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none"
                      >
                        <option value="Runway">Runway</option>
                        <option value="Editorial">Editorial</option>
                        <option value="Commercial">Commercial</option>
                        <option value="E-commerce">E-commerce</option>
                        <option value="Beauty">Beauty</option>
                        <option value="Bridal">Bridal</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* DESIGNER FORM FIELDS */}
              {normalizedRole === "designer" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                      Design Specialization
                    </label>
                    <select
                      name="designSpecialization"
                      value={formData.designSpecialization}
                      onChange={handleChange}
                      className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none"
                    >
                      <option value="Couture">Couture / Haute Couture</option>
                      <option value="Bridal">Bridal &amp; Eveningwear</option>
                      <option value="Ethnic">Ethnic &amp; Traditional</option>
                      <option value="Western">Western &amp; Ready-to-Wear</option>
                      <option value="Streetwear">Streetwear &amp; Avant-Garde</option>
                      <option value="Luxury">Luxury Resortwear</option>
                      <option value="Accessories">Jewelry &amp; Accessories</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                      Years of Experience
                    </label>
                    <select
                      name="yearsExperience"
                      value={formData.yearsExperience}
                      onChange={handleChange}
                      className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none"
                    >
                      <option value="Emerging (0-2 years)">Emerging (0-2 years)</option>
                      <option value="3-5 years">3–5 years</option>
                      <option value="5-10 years">5–10 years</option>
                      <option value="10+ years">10+ years</option>
                    </select>
                  </div>
                </div>
              )}

              {/* MAKEUP ARTIST FORM FIELDS */}
              {normalizedRole === "makeup_artist" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                        Specialization
                      </label>
                      <select
                        name="makeupSpecialization"
                        value={formData.makeupSpecialization}
                        onChange={handleChange}
                        className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none"
                      >
                        <option value="Fashion">Fashion &amp; Runway</option>
                        <option value="Bridal">Bridal Artistry</option>
                        <option value="Editorial">Editorial &amp; Shoot</option>
                        <option value="Celebrity">Celebrity Makeup</option>
                        <option value="Commercial">Commercial &amp; Campaign</option>
                        <option value="Film / TV">Film / TV</option>
                        <option value="SFX">Special Effects / SFX</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                        Years of Experience
                      </label>
                      <select
                        name="yearsExperience"
                        value={formData.yearsExperience}
                        onChange={handleChange}
                        className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none"
                      >
                        <option value="1-3 years">1–3 years</option>
                        <option value="3-5 years">3–5 years</option>
                        <option value="5-10 years">5–10 years</option>
                        <option value="10+ years">10+ years</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                        Makeup Style / Expertise
                      </label>
                      <input
                        type="text"
                        name="styleExpertise"
                        value={formData.styleExpertise}
                        onChange={handleChange}
                        placeholder="e.g. Glass skin, Avant-garde, High-fashion bridal"
                        className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none placeholder:text-white/40"
                      />
                    </div>
                    <div>
                      <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                        Professional Kit Available?
                      </label>
                      <select
                        name="hasKit"
                        value={formData.hasKit}
                        onChange={handleChange}
                        className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none"
                      >
                        <option value="Yes">Yes — Complete Professional Kit</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* FASHION STYLIST FORM FIELDS */}
              {(normalizedRole === "stylist" || normalizedRole === "fashion_stylist") && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                        Styling Specialization
                      </label>
                      <select
                        name="stylingSpecialization"
                        value={formData.stylingSpecialization}
                        onChange={handleChange}
                        className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none"
                      >
                        <option value="Fashion">Fashion &amp; Editorial</option>
                        <option value="Celebrity">Celebrity &amp; Red Carpet</option>
                        <option value="Personal">Personal Styling</option>
                        <option value="Bridal">Bridal Wardrobe</option>
                        <option value="Commercial">Commercial &amp; Brand</option>
                        <option value="Runway">Runway Show Direction</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                        Years of Experience
                      </label>
                      <select
                        name="yearsExperience"
                        value={formData.yearsExperience}
                        onChange={handleChange}
                        className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none"
                      >
                        <option value="1-3 years">1–3 years</option>
                        <option value="3-5 years">3–5 years</option>
                        <option value="5-10 years">5–10 years</option>
                        <option value="10+ years">10+ years</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                      Styling Aesthetic / Approach
                    </label>
                    <textarea
                      name="stylingAesthetic"
                      value={formData.stylingAesthetic}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Briefly describe your signature styling aesthetic..."
                      className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none resize-none placeholder:text-white/40"
                    />
                  </div>
                </>
              )}

              {/* CHOREOGRAPHER FORM FIELDS */}
              {normalizedRole === "choreographer" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                        Choreography Specialization
                      </label>
                      <select
                        name="choreographySpecialization"
                        value={formData.choreographySpecialization}
                        onChange={handleChange}
                        className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none"
                      >
                        <option value="Runway">Runway &amp; Fashion Show</option>
                        <option value="Contemporary">Contemporary &amp; Dance</option>
                        <option value="Commercial">Commercial &amp; Stage</option>
                        <option value="Editorial">Editorial Performance</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                        Years of Experience
                      </label>
                      <select
                        name="yearsExperience"
                        value={formData.yearsExperience}
                        onChange={handleChange}
                        className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none"
                      >
                        <option value="1-3 years">1–3 years</option>
                        <option value="3-5 years">3–5 years</option>
                        <option value="5-10 years">5–10 years</option>
                        <option value="10+ years">10+ years</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                      Past Major Shows / Events
                    </label>
                    <textarea
                      name="pastEvents"
                      value={formData.pastEvents}
                      onChange={handleChange}
                      rows={2}
                      placeholder="List key runway shows, fashion weeks, or productions choreographed..."
                      className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none resize-none placeholder:text-white/40"
                    />
                  </div>
                </>
              )}

              {/* INFLUENCER FORM FIELDS */}
              {(normalizedRole === "influencer" || normalizedRole === "influencer_creator") && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                        Content Category
                      </label>
                      <select
                        name="contentCategory"
                        value={formData.contentCategory}
                        onChange={handleChange}
                        className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none"
                      >
                        <option value="Fashion">Fashion &amp; Style</option>
                        <option value="Beauty">Beauty &amp; Makeup</option>
                        <option value="Lifestyle">Luxury &amp; Lifestyle</option>
                        <option value="Travel">Travel &amp; Culture</option>
                        <option value="Fitness">Fitness &amp; Wellness</option>
                        <option value="Entertainment">Entertainment &amp; Arts</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                        Primary Platform
                      </label>
                      <select
                        name="primaryPlatform"
                        value={formData.primaryPlatform}
                        onChange={handleChange}
                        className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none"
                      >
                        <option value="Instagram">Instagram</option>
                        <option value="YouTube">YouTube</option>
                        <option value="TikTok">TikTok</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
                    <div>
                      <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                        Follower Count
                      </label>
                      <input
                        type="number"
                        name="followerCount"
                        value={formData.followerCount}
                        onChange={handleChange}
                        placeholder="e.g. 50000"
                        className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none placeholder:text-white/40"
                      />
                    </div>
                    <div>
                      <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                        Average Views / Reach (Optional)
                      </label>
                      <input
                        type="text"
                        name="avgViewsReach"
                        value={formData.avgViewsReach}
                        onChange={handleChange}
                        placeholder="e.g. 25K avg views"
                        className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none placeholder:text-white/40"
                      />
                    </div>
                    <div>
                      <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                        Engagement Rate (Optional)
                      </label>
                      <input
                        type="text"
                        name="engagementRate"
                        value={formData.engagementRate}
                        onChange={handleChange}
                        placeholder="e.g. 4.5%"
                        className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none placeholder:text-white/40"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* CELEBRITY FORM FIELDS */}
              {(normalizedRole === "celebrity" || normalizedRole === "celebrity_public_figure") && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                        Profession / Domain
                      </label>
                      <select
                        name="profession"
                        value={formData.profession}
                        onChange={handleChange}
                        className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none"
                      >
                        <option value="Actor">Actor / Film Personality</option>
                        <option value="Singer">Singer / Musician</option>
                        <option value="Athlete">Athlete / Sports Personality</option>
                        <option value="TV Personality">TV / Host Personality</option>
                        <option value="Model">High-Fashion Model</option>
                        <option value="Other">Other Public Figure</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                        Interested In
                      </label>
                      <select
                        name="interests"
                        value={formData.interests}
                        onChange={handleChange}
                        className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none"
                      >
                        <option value="All">All Showcase &amp; Brand Opportunities</option>
                        <option value="Fashion Campaigns">Fashion Campaigns</option>
                        <option value="Brand Ambassador">Brand Ambassador</option>
                        <option value="Events">VIP Event Appearances</option>
                        <option value="Photoshoots">High Fashion Photoshoots</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                      Major Achievements / Highlights
                    </label>
                    <textarea
                      name="majorAchievements"
                      value={formData.majorAchievements}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Briefly list key awards, film releases, or notable public projects..."
                      className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none resize-none placeholder:text-white/40"
                    />
                  </div>
                </>
              )}

              {/* CSTP FORM FIELDS */}
              {normalizedRole === "cstp" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                      CSTP Domain / Specialty
                    </label>
                    <select
                      name="cstpDomain"
                      value={formData.cstpDomain}
                      onChange={handleChange}
                      className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none"
                    >
                      <option value="Computational Fashion">Computational Fashion &amp; AI</option>
                      <option value="Technical Styling">Technical &amp; Digital Styling</option>
                      <option value="Show Production">Show Production &amp; Tech</option>
                      <option value="Digital Runway">Digital Runway &amp; 3D Garments</option>
                      <option value="Other">Other CSTP Specialization</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                      Years of Experience
                    </label>
                    <select
                      name="yearsExperience"
                      value={formData.yearsExperience}
                      onChange={handleChange}
                      className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none"
                    >
                      <option value="1-3 years">1–3 years</option>
                      <option value="3-5 years">3–5 years</option>
                      <option value="5-10 years">5–10 years</option>
                      <option value="10+ years">10+ years</option>
                    </select>
                  </div>
                </div>
              )}

              {/* FASHION COMMENTARY FORM FIELDS */}
              {normalizedRole === "fashion_commentary" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                        Commentary / Media Specialization
                      </label>
                      <select
                        name="designSpecialization"
                        value={formData.designSpecialization}
                        onChange={handleChange}
                        className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none"
                      >
                        <option value="Fashion Commentary">Fashion Commentary</option>
                        <option value="Fashion Journalism">Fashion Journalism</option>
                        <option value="Fashion Analysis">Fashion &amp; Trend Analysis</option>
                        <option value="Runway Commentary">Runway Show Critique</option>
                        <option value="Event Commentary">Event &amp; Red Carpet Coverage</option>
                        <option value="Other">Other Fashion Media</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                        Publication / Platform
                      </label>
                      <input
                        type="text"
                        name="publicationPlatform"
                        value={formData.publicationPlatform}
                        onChange={handleChange}
                        placeholder="e.g. Vogue, Harper's Bazaar, Substack, YouTube"
                        className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none placeholder:text-white/40"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                      Previous Fashion Coverage / Published Links
                    </label>
                    <textarea
                      name="previousCoverage"
                      value={formData.previousCoverage}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Links to published articles, videos, or commentary pieces..."
                      className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none resize-none placeholder:text-white/40"
                    />
                  </div>
                </>
              )}

              {/* NOMINATION FORM FIELDS */}
              {normalizedRole === "nomination" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                      Nominee Creative Category <span className="text-[#F15E1C] dark:text-[#D4AF37]">*</span>
                    </label>
                    <select
                      name="nomineeRole"
                      value={formData.nomineeRole}
                      onChange={handleChange}
                      className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none"
                    >
                      <option value="Designer">Fashion Designer</option>
                      <option value="Model">Model</option>
                      <option value="Choreographer">Choreographer</option>
                      <option value="Makeup Artist">Makeup Artist</option>
                      <option value="Stylist">Fashion Stylist</option>
                      <option value="Influencer">Influencer / Creator</option>
                      <option value="CSTP">CSTP Professional</option>
                      <option value="Fashion Commentary">Fashion Commentary</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                      Nominee Social / Contact Link <span className="text-[#F15E1C] dark:text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="text"
                      name="nomineeContact"
                      value={formData.nomineeContact}
                      onChange={handleChange}
                      placeholder="@username or portfolio link"
                      className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none placeholder:text-white/40"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: PORTFOLIO & WORK LINKS */}
          {step === 3 && (
            <div className="bg-[#090807] border border-white/10 p-5 sm:p-8 rounded-2xl space-y-5 sm:space-y-6">
              <h3 className="font-serif-display text-xl sm:text-2xl md:text-3xl font-light tracking-tight text-brand-yellow-golden uppercase border-b border-white/10 pb-3">
                03 PORTFOLIO &amp; SOCIAL PRESENCE
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                    Portfolio / Official Website URL
                  </label>
                  <input
                    type="url"
                    name="portfolioUrl"
                    value={formData.portfolioUrl}
                    onChange={handleChange}
                    placeholder="https://yourportfolio.com"
                    className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none placeholder:text-white/40"
                  />
                </div>
                <div>
                  <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                    Instagram / Primary Social Handle
                  </label>
                  <input
                    type="text"
                    name="instagramUrl"
                    value={formData.instagramUrl}
                    onChange={handleChange}
                    placeholder="@username or profile URL"
                    className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none placeholder:text-white/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                  Work Samples / Drive / Cloud Storage Link
                </label>
                <input
                  type="url"
                  name="workSamplesUrl"
                  value={formData.workSamplesUrl}
                  onChange={handleChange}
                  placeholder="Link to photos, comp card, PDF portfolio, or press kit"
                  className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none placeholder:text-white/40"
                />
              </div>

              {normalizedRole === "choreographer" || normalizedRole === "fashion_commentary" ? (
                <div>
                  <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                    Video / Showreel Link URL
                  </label>
                  <input
                    type="url"
                    name="showreelUrl"
                    value={formData.showreelUrl}
                    onChange={handleChange}
                    placeholder="YouTube, Vimeo, or Drive link"
                    className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none placeholder:text-white/40"
                  />
                </div>
              ) : null}
            </div>
          )}

          {/* STEP 4: AVAILABILITY & ADDITIONAL MESSAGE */}
          {step === 4 && (
            <div className="bg-[#090807] border border-white/10 p-5 sm:p-8 rounded-2xl space-y-5 sm:space-y-6">
              <h3 className="font-serif-display text-xl sm:text-2xl md:text-3xl font-light tracking-tight text-brand-yellow-golden uppercase border-b border-white/10 pb-3">
                04 AVAILABILITY &amp; ADDITIONAL DETAILS
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                    Available for Travel?
                  </label>
                  <select
                    name="availableTravel"
                    value={formData.availableTravel}
                    onChange={handleChange}
                    className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none"
                  >
                    <option value="Yes">Yes — Global &amp; International Travel</option>
                    <option value="UAE Only">UAE &amp; Gulf Region Only</option>
                    <option value="India Only">India Region Only</option>
                    <option value="No">Local Projects Only</option>
                  </select>
                </div>

                {normalizedRole === "designer" ? (
                  <div>
                    <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                      Available for Collaborations?
                    </label>
                    <select
                      name="availableCollab"
                      value={formData.availableCollab}
                      onChange={handleChange}
                      className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none"
                    >
                      <option value="Yes">Yes — Open to Runway &amp; Brand Collaborations</option>
                      <option value="No">No — Exclusive Showcases Only</option>
                    </select>
                  </div>
                ) : null}
              </div>

              <div>
                <label className="block text-sm sm:text-base md:text-lg font-syne tracking-wider text-brand-white/95 uppercase font-bold mb-1.5 sm:mb-2">
                  Additional Information / Message
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Any additional details, upcoming showcase dates, or specific notes..."
                  className="w-full bg-black/90 border border-white/15 px-4 py-3 sm:px-5 sm:py-3.5 text-base sm:text-lg text-white rounded-xl focus:border-brand-yellow-golden outline-none resize-none placeholder:text-white/40"
                />
              </div>
            </div>
          )}

          {/* Form Step Buttons */}
          <div className="flex items-center justify-between pt-4 sm:pt-6 border-t border-white/10">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm sm:text-base font-syne font-bold text-white/80 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" /> <GradientFlowText variant="gold">Previous Step</GradientFlowText>
              </button>
            ) : <div />}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="inline-flex items-center gap-2 bg-brand-yellow-golden px-8 sm:px-9 py-3.5 sm:py-4 text-sm sm:text-base font-syne font-bold tracking-caps text-black rounded-full hover:bg-yellow-400 transition-colors shadow-lg"
              >
                <GradientFlowText variant="primary">Next Step</GradientFlowText> <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-yellow-golden to-amber-500 px-8 sm:px-9 py-3.5 sm:py-4 text-sm sm:text-base font-syne font-bold tracking-caps text-black rounded-full hover:opacity-95 transition-all shadow-xl disabled:opacity-50"
              >
                <GradientFlowText variant="primary">
                  {isSubmitting ? "Submitting Application..." : "Submit Application"}
                </GradientFlowText> <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
