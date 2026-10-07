"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Upload, AlertCircle, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import GradientFlowText from "../ui/GradientFlowText";
import SubmitSuccessExpand from "../ui/SubmitSuccessExpand";

export type CategoryId =
  | "fashion_designer"
  | "model"
  | "makeup_artist"
  | "fashion_stylist"
  | "influencer_creator"
  | "celebrity_public_figure"
  | "choreographer";

export interface TalentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: CategoryId | string;
}

const CATEGORIES: { id: CategoryId; title: string; formTitle: string }[] = [
  { id: "fashion_designer", title: "Fashion Designer", formTitle: "JOIN AS A FASHION DESIGNER" },
  { id: "model", title: "Model", formTitle: "JOIN AS A MODEL" },
  { id: "makeup_artist", title: "Makeup Artist", formTitle: "JOIN AS A MAKEUP ARTIST" },
  { id: "fashion_stylist", title: "Fashion Stylist", formTitle: "JOIN AS A FASHION STYLIST" },
  { id: "influencer_creator", title: "Influencer / Content Creator", formTitle: "JOIN AS AN INFLUENCER / CREATOR" },
  { id: "celebrity_public_figure", title: "Celebrity / Public Figure", formTitle: "JOIN AS A CELEBRITY / PUBLIC FIGURE" },
  { id: "choreographer", title: "Choreographer", formTitle: "JOIN AS A CHOREOGRAPHER" },
];

function normalizeCategoryId(catId?: string): CategoryId {
  if (!catId) return "fashion_designer";
  if (catId === "designers" || catId === "fashion_designer") return "fashion_designer";
  if (catId === "models" || catId === "model") return "model";
  if (catId === "makeup-artists" || catId === "makeup_artist") return "makeup_artist";
  if (catId === "stylists" || catId === "fashion_stylist") return "fashion_stylist";
  if (catId === "influencers" || catId === "influencer_creator") return "influencer_creator";
  if (catId === "celebrities" || catId === "celebrity_public_figure") return "celebrity_public_figure";
  if (catId === "choreographers" || catId === "choreographer") return "choreographer";
  return "fashion_designer";
}

export default function TalentApplicationModal({ isOpen, onClose, initialCategory }: TalentModalProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryId>(normalizeCategoryId(initialCategory));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string }[]>([]);

  // Synchronize initial category whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveCategory(normalizeCategoryId(initialCategory));
      setIsSubmitted(false);
      setErrorMessage("");
      setUploadedFiles([]);
    }
  }, [isOpen, initialCategory]);

  if (!isOpen) return null;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const filesArray = Array.from(e.target.files);
    const fileInfos = filesArray.map((file) => ({
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
    }));
    setUploadedFiles(fileInfos);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const data: Record<string, unknown> = {
      applicationType: activeCategory,
    };

    // Extract all input values dynamically
    formData.forEach((value, key) => {
      if (key === "fileUpload") return; // files are attached separately in fileNames
      if (data[key] !== undefined) {
        if (Array.isArray(data[key])) {
          (data[key] as string[]).push(value as string);
        } else {
          data[key] = [data[key] as string, value as string];
        }
      } else {
        data[key] = value;
      }
    });

    if (uploadedFiles.length > 0) {
      data.fileNames = uploadedFiles.map((f) => f.name);
      data.fileName = uploadedFiles[0].name;
    }

    try {
      const res = await fetch("/api/talent-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        setErrorMessage(json.error || "Failed to submit application. Please verify all inputs.");
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch {
      setErrorMessage("Network error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  const activeCategoryMeta = CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[500] flex items-center justify-center p-2 sm:p-4 lg:p-6 overflow-y-auto">
        {/* Dark Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Modal Drawer Shell */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[92vh] bg-[#0D0B0A] dark:bg-[#0D0B0A] border border-brand-orange/40 text-brand-white shadow-[0_0_80px_rgba(241,94,28,0.3)] flex flex-col z-10 overflow-hidden"
        >
          {/* Top Header Bar */}
          <div className="relative px-6 py-5 sm:px-8 sm:py-6 border-b border-white/10 bg-black/60 flex items-center justify-between flex-shrink-0">
            <div>
              <div className="flex items-center gap-2 text-[10px] sm:text-xs font-jost tracking-micro text-brand-orange font-bold uppercase mb-1">
                <span>OFFICIAL TALENT RECRUITMENT PORTAL</span>
              </div>
              <h2 className="font-serif-display text-2xl sm:text-4xl font-light text-brand-white uppercase tracking-tight">
                JOIN OUR TALENT NETWORK
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 sm:w-10 sm:h-10 border border-white/20 bg-brand-void text-brand-white hover:text-brand-orange hover:border-brand-orange flex items-center justify-center transition-colors flex-shrink-0 ml-4"
              aria-label="Close talent application modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Category Tabs Bar */}
          <div className="px-4 py-3 sm:px-8 sm:py-4 bg-brand-void/90 border-b border-white/10 overflow-x-auto flex items-center gap-2 flex-shrink-0 no-scrollbar">
            {CATEGORIES.map((cat) => {
              const isActive = cat.id === activeCategory;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setIsSubmitted(false);
                    setErrorMessage("");
                  }}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-jost tracking-wider uppercase whitespace-nowrap transition-all duration-300 border ${
                    isActive
                      ? "bg-brand-orange text-white border-brand-orange font-bold shadow-[0_0_15px_rgba(241,94,28,0.4)]"
                      : "bg-black/40 text-brand-platinum/80 border-white/10 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {cat.title}
                </button>
              );
            })}
          </div>

          {/* Modal Main Content Area */}
          <div className="p-6 sm:p-8 lg:p-10 overflow-y-auto flex-1 custom-scrollbar">
            <SubmitSuccessExpand show={isSubmitted}>
              <div className="py-12 sm:py-16 text-center max-w-xl mx-auto space-y-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-brand-green/20 border-2 border-brand-green flex items-center justify-center text-brand-green shadow-[0_0_40px_rgba(46,147,111,0.4)]">
                  <Check className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-jost tracking-micro text-brand-green font-bold uppercase">
                    CONFIRMATION CODE #TN-{Math.floor(100000 + Math.random() * 900000)}
                  </span>
                  <h3 className="font-serif-display text-3xl sm:text-5xl font-light text-brand-white uppercase">
                    APPLICATION RECEIVED
                  </h3>
                </div>
                <p className="font-sans text-sm sm:text-base text-brand-platinum/90 font-light leading-relaxed">
                  Thank you for applying to the FashAI Universal Talent Network. Our team will review your profile and contact you if a suitable opportunity becomes available.
                </p>
                <div className="pt-6">
                  <button
                    onClick={onClose}
                    className="inline-flex items-center gap-3 bg-brand-orange hover:bg-[#ff6f2d] text-white px-8 py-3.5 text-xs font-jost tracking-caps font-bold transition-all shadow-lg hover:shadow-brand-orange/40"
                  >
                    <GradientFlowText variant="gold">BACK TO FASHAI UNIVERSAL</GradientFlowText>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </SubmitSuccessExpand>

            {!isSubmitted && (
              /* Active Form View */
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Form Title & Sub-header */}
                <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-jost tracking-micro text-brand-green font-bold uppercase">
                      ACTIVE CATEGORY RECRUITMENT
                    </span>
                    <h3 className="font-serif-display text-2xl sm:text-3xl font-light text-brand-white uppercase text-brand-yellow-golden">
                      {activeCategoryMeta.formTitle}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-jost text-brand-platinum/70 bg-black/40 px-3 py-1.5 border border-white/10 self-start sm:self-auto">
                    <ShieldCheck className="w-4 h-4 text-brand-green" />
                    <span>CONFIDENTIAL APPLICATION</span>
                  </div>
                </div>

                {errorMessage && (
                  <div className="p-4 bg-red-500/10 border border-red-500/40 text-red-300 text-xs sm:text-sm font-sans flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* 01 — PERSONAL SECTION */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-2">
                    <span className="text-xs font-jost tracking-micro font-bold text-brand-orange">
                      01 — PERSONAL
                    </span>
                    <span className="text-xs text-brand-platinum/50 font-light">
                      Identity & Direct Contact Details
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Role specific: Stage vs Full Name */}
                    {activeCategory === "celebrity_public_figure" ? (
                      <>
                        <div className="space-y-2">
                          <label className="block text-xs font-jost tracking-wider text-brand-platinum/90 uppercase font-semibold">
                            01. PROFESSIONAL / STAGE NAME <span className="text-brand-orange">*</span>
                          </label>
                          <input
                            type="text"
                            name="stageName"
                            required
                            placeholder="e.g. Maya Lin"
                            className="w-full bg-[#151210] border border-white/20 text-brand-white px-4 py-3 text-sm font-sans focus:border-brand-orange focus:outline-none transition-colors"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="block text-xs font-jost tracking-wider text-brand-platinum/90 uppercase font-semibold">
                              02. REAL NAME <span className="text-brand-orange">*</span>
                            </label>
                            <span className="text-[10px] font-jost text-brand-green font-bold px-1.5 py-0.5 bg-brand-green/10 border border-brand-green/30 uppercase">
                              PRIVATE / CONFIDENTIAL
                            </span>
                          </div>
                          <input
                            type="text"
                            name="realNamePrivate"
                            required
                            placeholder="Strictly confidential (internal record)"
                            className="w-full bg-[#151210] border border-brand-green/40 text-brand-white px-4 py-3 text-sm font-sans focus:border-brand-green focus:outline-none transition-colors"
                          />
                        </div>
                      </>
                    ) : (
                      <div className="space-y-2 sm:col-span-2">
                        <label className="block text-xs font-jost tracking-wider text-brand-platinum/90 uppercase font-semibold">
                          01. FULL NAME <span className="text-brand-orange">*</span>
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          placeholder="Your legal or full name"
                          className="w-full bg-[#151210] border border-white/20 text-brand-white px-4 py-3 text-sm font-sans focus:border-brand-orange focus:outline-none transition-colors"
                        />
                      </div>
                    )}

                    {/* Choreographer, Designer & Creator Stage/Brand name */}
                    {activeCategory === "choreographer" && (
                      <div className="space-y-2 sm:col-span-2">
                        <label className="block text-xs font-jost tracking-wider text-brand-platinum/90 uppercase font-semibold">
                          02. PROFESSIONAL / STAGE NAME
                        </label>
                        <input
                          type="text"
                          name="stageName"
                          placeholder="e.g. Movement Director / Stage Name"
                          className="w-full bg-[#151210] border border-white/20 text-brand-white px-4 py-3 text-sm font-sans focus:border-brand-orange focus:outline-none transition-colors"
                        />
                      </div>
                    )}

                    {activeCategory === "fashion_designer" && (
                      <div className="space-y-2 sm:col-span-2">
                        <label className="block text-xs font-jost tracking-wider text-brand-platinum/90 uppercase font-semibold">
                          02. BRAND / PROFESSIONAL NAME
                        </label>
                        <input
                          type="text"
                          name="brandName"
                          placeholder="e.g. Maison Atelier / Couture Label"
                          className="w-full bg-[#151210] border border-white/20 text-brand-white px-4 py-3 text-sm font-sans focus:border-brand-orange focus:outline-none transition-colors"
                        />
                      </div>
                    )}

                    {activeCategory === "influencer_creator" && (
                      <div className="space-y-2">
                        <label className="block text-xs font-jost tracking-wider text-brand-platinum/90 uppercase font-semibold">
                          02. CREATOR / STAGE NAME
                        </label>
                        <input
                          type="text"
                          name="stageName"
                          placeholder="Your channel or alias name"
                          className="w-full bg-[#151210] border border-white/20 text-brand-white px-4 py-3 text-sm font-sans focus:border-brand-orange focus:outline-none transition-colors"
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="block text-xs font-jost tracking-wider text-brand-platinum/90 uppercase font-semibold">
                        EMAIL ADDRESS <span className="text-brand-orange">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="yourname@domain.com"
                        className="w-full bg-[#151210] border border-white/20 text-brand-white px-4 py-3 text-sm font-sans focus:border-brand-orange focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-jost tracking-wider text-brand-platinum/90 uppercase font-semibold">
                        WHATSAPP / TELEPHONE <span className="text-brand-orange">*</span>
                      </label>
                      <input
                        type="tel"
                        name="whatsapp"
                        required
                        placeholder="+1 (555) 000-0000 (International format)"
                        className="w-full bg-[#151210] border border-white/20 text-brand-white px-4 py-3 text-sm font-sans focus:border-brand-orange focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <label className="block text-xs font-jost tracking-wider text-brand-platinum/90 uppercase font-semibold">
                        CITY / COUNTRY <span className="text-brand-orange">*</span>
                      </label>
                      <input
                        type="text"
                        name="cityCountry"
                        required
                        placeholder="e.g. Paris, France / Dubai, UAE / Mumbai, India"
                        className="w-full bg-[#151210] border border-white/20 text-brand-white px-4 py-3 text-sm font-sans focus:border-brand-orange focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* 02 — PROFESSIONAL SECTION */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-2">
                    <span className="text-xs font-jost tracking-micro font-bold text-brand-orange">
                      02 — PROFESSIONAL
                    </span>
                    <span className="text-xs text-brand-platinum/50 font-light">
                      Specialization, Skills & Experience
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* CHOREOGRAPHER Fields */}
                    {activeCategory === "choreographer" && (
                      <>
                        <div className="space-y-2 sm:col-span-2">
                          <label className="block text-xs font-jost tracking-wider text-brand-platinum/90 uppercase font-semibold">
                            YEARS OF EXPERIENCE
                          </label>
                          <select name="experience" className="w-full bg-[#151210] border border-white/20 text-brand-white px-4 py-3 text-sm font-sans focus:border-brand-orange focus:outline-none">
                            <option value="0–1 years">0–1 years</option>
                            <option value="2–3 years">2–3 years</option>
                            <option value="4–5 years">4–5 years</option>
                            <option value="6–10 years">6–10 years</option>
                            <option value="10+ years">10+ years</option>
                          </select>
                        </div>

                        <div className="space-y-2 sm:col-span-2">
                          <label className="block text-xs font-jost tracking-wider text-brand-platinum/90 uppercase font-semibold">
                            CHOREOGRAPHY SPECIALIZATION
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                            {[
                              "Fashion / Runway",
                              "Bollywood",
                              "Contemporary",
                              "Hip-Hop",
                              "Classical",
                              "Commercial",
                              "Music Videos",
                              "Wedding / Events",
                              "Other",
                            ].map((opt) => (
                              <label key={opt} className="flex items-center gap-2 cursor-pointer bg-[#151210] border border-white/10 p-2.5 text-xs text-brand-platinum hover:border-brand-orange">
                                <input type="checkbox" name="specializations" value={opt} className="accent-[#F15E1C]" />
                                <span>{opt}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2 sm:col-span-2">
                          <label className="block text-xs font-jost tracking-wider text-brand-platinum/90 uppercase font-semibold">
                            PROFESSIONAL SKILLS / DANCE STYLES
                          </label>
                          <input
                            type="text"
                            name="danceStyles"
                            placeholder="e.g. Catwalk choreography, Stage blocking, Heels, Jazz, Aerial"
                            className="w-full bg-[#151210] border border-white/20 text-brand-white px-4 py-3 text-sm font-sans focus:border-brand-orange focus:outline-none"
                          />
                        </div>
                      </>
                    )}

                    {/* DESIGNER Fields */}
                    {activeCategory === "fashion_designer" && (
                      <>
                        <div className="space-y-2 sm:col-span-2">
                          <label className="block text-xs font-jost tracking-wider text-brand-platinum/90 uppercase font-semibold">
                            DESIGN SPECIALIZATION
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                            {["Couture", "Bridal", "Ethnic", "Western", "Streetwear", "Luxury", "Accessories", "Other"].map((opt) => (
                              <label key={opt} className="flex items-center gap-2 cursor-pointer bg-[#151210] border border-white/10 p-2.5 text-xs text-brand-platinum hover:border-brand-orange">
                                <input type="checkbox" name="specializations" value={opt} className="accent-[#F15E1C]" />
                                <span>{opt}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2 sm:col-span-2">
                          <label className="block text-xs font-jost tracking-wider text-brand-platinum/90 uppercase font-semibold">
                            YEARS OF EXPERIENCE
                          </label>
                          <select name="experience" className="w-full bg-[#151210] border border-white/20 text-brand-white px-4 py-3 text-sm font-sans focus:border-brand-orange focus:outline-none">
                            <option value="0–1 years">0–1 years</option>
                            <option value="2–3 years">2–3 years</option>
                            <option value="4–5 years">4–5 years</option>
                            <option value="6–10 years">6–10 years</option>
                            <option value="10+ years">10+ years</option>
                          </select>
                        </div>
                      </>
                    )}

                    {/* MODEL Fields - NO WEIGHT FIELD */}
                    {activeCategory === "model" && (
                      <>
                        <div className="space-y-2">
                          <label className="block text-xs font-jost tracking-wider text-brand-platinum/90 uppercase font-semibold">
                            AGE <span className="text-brand-orange">*</span>
                          </label>
                          <input
                            type="number"
                            name="age"
                            min="14"
                            max="99"
                            required
                            placeholder="e.g. 22"
                            className="w-full bg-[#151210] border border-white/20 text-brand-white px-4 py-3 text-sm font-sans focus:border-brand-orange focus:outline-none"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-jost tracking-wider text-brand-platinum/90 uppercase font-semibold">
                            GENDER
                          </label>
                          <select name="gender" className="w-full bg-[#151210] border border-white/20 text-brand-white px-4 py-3 text-sm font-sans focus:border-brand-orange focus:outline-none">
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                            <option value="Non-binary">Non-binary</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-jost tracking-wider text-brand-platinum/90 uppercase font-semibold">
                            HEIGHT (CM) <span className="text-brand-orange">*</span>
                          </label>
                          <input
                            type="number"
                            name="heightCm"
                            min="120"
                            max="230"
                            required
                            placeholder="e.g. 178"
                            className="w-full bg-[#151210] border border-white/20 text-brand-white px-4 py-3 text-sm font-sans focus:border-brand-orange focus:outline-none"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-jost tracking-wider text-brand-platinum/90 uppercase font-semibold">
                            MEASUREMENTS (BUST/CHEST – WAIST – HIPS)
                          </label>
                          <input
                            type="text"
                            name="measurements"
                            placeholder="e.g. 34 – 26 – 36 (or 38 – 32 – 36)"
                            className="w-full bg-[#151210] border border-white/20 text-brand-white px-4 py-3 text-sm font-sans focus:border-brand-orange focus:outline-none"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-jost tracking-wider text-brand-platinum/90 uppercase font-semibold">
                            SHOE SIZE
                          </label>
                          <select name="shoeSize" className="w-full bg-[#151210] border border-white/20 text-brand-white px-4 py-3 text-sm font-sans focus:border-brand-orange focus:outline-none">
                            <option value="EU 36 / US 5">EU 36 / US 5</option>
                            <option value="EU 37 / US 6">EU 37 / US 6</option>
                            <option value="EU 38 / US 7">EU 38 / US 7</option>
                            <option value="EU 39 / US 8">EU 39 / US 8</option>
                            <option value="EU 40 / US 9">EU 40 / US 9</option>
                            <option value="EU 41 / US 10">EU 41 / US 10</option>
                            <option value="EU 42+ / US 11+">EU 42+ / US 11+</option>
                          </select>
                        </div>

                        <div className="space-y-2 sm:col-span-2">
                          <label className="block text-xs font-jost tracking-wider text-brand-platinum/90 uppercase font-semibold">
                            MODELING CATEGORY
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                            {["Runway", "Editorial", "Commercial", "E-commerce", "Beauty", "Bridal"].map((opt) => (
                              <label key={opt} className="flex items-center gap-2 cursor-pointer bg-[#151210] border border-white/10 p-2.5 text-xs text-brand-platinum hover:border-brand-orange">
                                <input type="checkbox" name="categories" value={opt} className="accent-[#F15E1C]" />
                                <span>{opt}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {/* MAKEUP ARTIST Fields */}
                    {activeCategory === "makeup_artist" && (
                      <>
                        <div className="space-y-2 sm:col-span-2">
                          <label className="block text-xs font-jost tracking-wider text-brand-platinum/90 uppercase font-semibold">
                            YEARS OF EXPERIENCE
                          </label>
                          <select name="experience" className="w-full bg-[#151210] border border-white/20 text-brand-white px-4 py-3 text-sm font-sans focus:border-brand-orange focus:outline-none">
                            <option value="0–1 years">0–1 years</option>
                            <option value="2–3 years">2–3 years</option>
                            <option value="4–5 years">4–5 years</option>
                            <option value="6–10 years">6–10 years</option>
                            <option value="10+ years">10+ years</option>
                          </select>
                        </div>

                        <div className="space-y-2 sm:col-span-2">
                          <label className="block text-xs font-jost tracking-wider text-brand-platinum/90 uppercase font-semibold">
                            SPECIALIZATION
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                            {["Fashion", "Bridal", "Editorial", "Celebrity", "Commercial", "Film / TV", "SFX"].map((opt) => (
                              <label key={opt} className="flex items-center gap-2 cursor-pointer bg-[#151210] border border-white/10 p-2.5 text-xs text-brand-platinum hover:border-brand-orange">
                                <input type="checkbox" name="specializations" value={opt} className="accent-[#F15E1C]" />
                                <span>{opt}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2 sm:col-span-2">
                          <label className="block text-xs font-jost tracking-wider text-brand-platinum/90 uppercase font-semibold">
                            MAKEUP STYLE / EXPERTISE
                          </label>
                          <input
                            type="text"
                            name="styleExpertise"
                            placeholder="e.g. High-Fashion Runway Glow, Avant-Garde Editorial, Airbrush"
                            className="w-full bg-[#151210] border border-white/20 text-brand-white px-4 py-3 text-sm font-sans focus:border-brand-orange focus:outline-none"
                          />
                        </div>
                      </>
                    )}

                    {/* STYLIST Fields */}
                    {activeCategory === "fashion_stylist" && (
                      <>
                        <div className="space-y-2 sm:col-span-2">
                          <label className="block text-xs font-jost tracking-wider text-brand-platinum/90 uppercase font-semibold">
                            YEARS OF EXPERIENCE
                          </label>
                          <select name="experience" className="w-full bg-[#151210] border border-white/20 text-brand-white px-4 py-3 text-sm font-sans focus:border-brand-orange focus:outline-none">
                            <option value="0–1 years">0–1 years</option>
                            <option value="2–3 years">2–3 years</option>
                            <option value="4–5 years">4–5 years</option>
                            <option value="6–10 years">6–10 years</option>
                            <option value="10+ years">10+ years</option>
                          </select>
                        </div>

                        <div className="space-y-2 sm:col-span-2">
                          <label className="block text-xs font-jost tracking-wider text-brand-platinum/90 uppercase font-semibold">
                            STYLING SPECIALIZATION
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                            {["Fashion", "Celebrity", "Editorial", "Personal", "Bridal", "Commercial", "Runway"].map((opt) => (
                              <label key={opt} className="flex items-center gap-2 cursor-pointer bg-[#151210] border border-white/10 p-2.5 text-xs text-brand-platinum hover:border-brand-orange">
                                <input type="checkbox" name="specializations" value={opt} className="accent-[#F15E1C]" />
                                <span>{opt}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2 sm:col-span-2">
                          <label className="block text-xs font-jost tracking-wider text-brand-platinum/90 uppercase font-semibold">
                            YOUR STYLING / AESTHETIC
                          </label>
                          <input
                            type="text"
                            name="stylingAesthetic"
                            placeholder="e.g. Minimalist Luxe, High-Glamour Red Carpet, Futuristic Streetwear"
                            className="w-full bg-[#151210] border border-white/20 text-brand-white px-4 py-3 text-sm font-sans focus:border-brand-orange focus:outline-none"
                          />
                        </div>
                      </>
                    )}

                    {/* CREATOR Fields */}
                    {activeCategory === "influencer_creator" && (
                      <>
                        <div className="space-y-2 sm:col-span-2">
                          <label className="block text-xs font-jost tracking-wider text-brand-platinum/90 uppercase font-semibold">
                            CONTENT CATEGORY
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                            {["Fashion", "Beauty", "Lifestyle", "Luxury", "Makeup", "Travel", "Fitness", "Entertainment", "Other"].map((opt) => (
                              <label key={opt} className="flex items-center gap-2 cursor-pointer bg-[#151210] border border-white/10 p-2.5 text-xs text-brand-platinum hover:border-brand-orange">
                                <input type="checkbox" name="contentCategories" value={opt} className="accent-[#F15E1C]" />
                                <span>{opt}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-jost tracking-wider text-brand-platinum/90 uppercase font-semibold">
                            PRIMARY PLATFORM
                          </label>
                          <select name="primaryPlatform" className="w-full bg-[#151210] border border-white/20 text-brand-white px-4 py-3 text-sm font-sans focus:border-brand-orange focus:outline-none">
                            <option value="Instagram">Instagram</option>
                            <option value="YouTube">YouTube</option>
                            <option value="TikTok">TikTok</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-jost tracking-wider text-brand-platinum/90 uppercase font-semibold">
                            FOLLOWER COUNT <span className="text-brand-orange">*</span>
                          </label>
                          <input
                            type="number"
                            name="followerCount"
                            required
                            placeholder="e.g. 85000"
                            className="w-full bg-[#151210] border border-white/20 text-brand-white px-4 py-3 text-sm font-sans focus:border-brand-orange focus:outline-none"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-jost tracking-wider text-brand-platinum/90 uppercase font-semibold">
                            AVERAGE VIEWS / REACH <span className="text-brand-orange">*</span>
                          </label>
                          <input
                            type="text"
                            name="avgViewsReach"
                            required
                            placeholder="e.g. 50K - 120K avg reel views"
                            className="w-full bg-[#151210] border border-white/20 text-brand-white px-4 py-3 text-sm font-sans focus:border-brand-orange focus:outline-none"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-jost tracking-wider text-brand-platinum/90 uppercase font-semibold">
                            ENGAGEMENT RATE (OPTIONAL)
                          </label>
                          <input
                            type="text"
                            name="engagementRate"
                            placeholder="e.g. 4.8%"
                            className="w-full bg-[#151210] border border-white/20 text-brand-white px-4 py-3 text-sm font-sans focus:border-brand-orange focus:outline-none"
                          />
                        </div>
                      </>
                    )}

                    {/* CELEBRITY Fields */}
                    {activeCategory === "celebrity_public_figure" && (
                      <>
                        <div className="space-y-2">
                          <label className="block text-xs font-jost tracking-wider text-brand-platinum/90 uppercase font-semibold">
                            PROFESSION
                          </label>
                          <select name="profession" className="w-full bg-[#151210] border border-white/20 text-brand-white px-4 py-3 text-sm font-sans focus:border-brand-orange focus:outline-none">
                            <option value="Actor">Actor</option>
                            <option value="Singer">Singer</option>
                            <option value="Athlete">Athlete</option>
                            <option value="TV Personality">TV Personality</option>
                            <option value="Model">Model</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-jost tracking-wider text-brand-platinum/90 uppercase font-semibold">
                            PROFESSIONAL CONTACT / PHONE <span className="text-brand-orange">*</span>
                          </label>
                          <input
                            type="tel"
                            name="professionalContact"
                            required
                            placeholder="Direct or Management Phone"
                            className="w-full bg-[#151210] border border-white/20 text-brand-white px-4 py-3 text-sm font-sans focus:border-brand-orange focus:outline-none"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-jost tracking-wider text-brand-platinum/90 uppercase font-semibold">
                            FOLLOWER COUNT
                          </label>
                          <input
                            type="number"
                            name="followerCount"
                            placeholder="e.g. 1500000"
                            className="w-full bg-[#151210] border border-white/20 text-brand-white px-4 py-3 text-sm font-sans focus:border-brand-orange focus:outline-none"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-jost tracking-wider text-brand-platinum/90 uppercase font-semibold">
                            MANAGEMENT / AGENT CONTACT
                          </label>
                          <input
                            type="text"
                            name="managementContact"
                            placeholder="Agency Name & Agent Email"
                            className="w-full bg-[#151210] border border-white/20 text-brand-white px-4 py-3 text-sm font-sans focus:border-brand-orange focus:outline-none"
                          />
                        </div>

                        <div className="space-y-2 sm:col-span-2">
                          <label className="block text-xs font-jost tracking-wider text-brand-platinum/90 uppercase font-semibold">
                            MAJOR WORK / ACHIEVEMENTS
                          </label>
                          <input
                            type="text"
                            name="majorAchievements"
                            placeholder="Key film credits, titles, awards, or major global campaigns"
                            className="w-full bg-[#151210] border border-white/20 text-brand-white px-4 py-3 text-sm font-sans focus:border-brand-orange focus:outline-none"
                          />
                        </div>

                        <div className="space-y-2 sm:col-span-2">
                          <label className="block text-xs font-jost tracking-wider text-brand-platinum/90 uppercase font-semibold">
                            INTERESTED IN
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                            {["Fashion Campaigns", "Brand Campaigns", "Events", "Photoshoots", "Brand Ambassador", "All"].map((opt) => (
                              <label key={opt} className="flex items-center gap-2 cursor-pointer bg-[#151210] border border-white/10 p-2.5 text-xs text-brand-platinum hover:border-brand-orange">
                                <input type="checkbox" name="interests" value={opt} className="accent-[#F15E1C]" />
                                <span>{opt}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* 03 — PORTFOLIO / SOCIAL SECTION */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-2">
                    <span className="text-xs font-jost tracking-micro font-bold text-brand-orange">
                      03 — PORTFOLIO / SOCIAL
                    </span>
                    <span className="text-xs text-brand-platinum/50 font-light">
                      Digital Handles, Websites, Showreels & Work Samples
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-jost tracking-wider text-brand-platinum/90 uppercase font-semibold">
                        INSTAGRAM / SOCIAL MEDIA PROFILE
                      </label>
                      <input
                        type="url"
                        name={activeCategory === "model" ? "instagramLink" : "instagramUrl"}
                        placeholder="https://instagram.com/yourhandle"
                        className="w-full bg-[#151210] border border-white/20 text-brand-white px-4 py-3 text-sm font-sans focus:border-brand-orange focus:outline-none"
                      />
                    </div>

                    {activeCategory === "choreographer" && (
                      <div className="space-y-2">
                        <label className="block text-xs font-jost tracking-wider text-brand-platinum/90 uppercase font-semibold">
                          PORTFOLIO / SHOWREEL LINK
                        </label>
                        <input
                          type="url"
                          name="showreelUrl"
                          placeholder="https://vimeo.com/showreel or YouTube / Portfolio link"
                          className="w-full bg-[#151210] border border-white/20 text-brand-white px-4 py-3 text-sm font-sans focus:border-brand-orange focus:outline-none"
                        />
                      </div>
                    )}

                    {activeCategory !== "influencer_creator" && activeCategory !== "choreographer" && (
                      <div className="space-y-2">
                        <label className="block text-xs font-jost tracking-wider text-brand-platinum/90 uppercase font-semibold">
                          PORTFOLIO / WEBSITE LINK
                        </label>
                        <input
                          type="url"
                          name={activeCategory === "celebrity_public_figure" ? "mediaKitUrl" : "portfolioUrl"}
                          placeholder="https://yourportfolio.com"
                          className="w-full bg-[#151210] border border-white/20 text-brand-white px-4 py-3 text-sm font-sans focus:border-brand-orange focus:outline-none"
                        />
                      </div>
                    )}

                    {activeCategory === "influencer_creator" && (
                      <div className="space-y-2">
                        <label className="block text-xs font-jost tracking-wider text-brand-platinum/90 uppercase font-semibold">
                          SOCIAL MEDIA HANDLE / LINK
                        </label>
                        <input
                          type="text"
                          name="socialHandle"
                          placeholder="@yourcreatorhandle or channel URL"
                          className="w-full bg-[#151210] border border-white/20 text-brand-white px-4 py-3 text-sm font-sans focus:border-brand-orange focus:outline-none"
                        />
                      </div>
                    )}

                    {activeCategory === "choreographer" && (
                      <div className="space-y-2 sm:col-span-2">
                        <label className="block text-xs font-jost tracking-wider text-brand-platinum/90 uppercase font-semibold">
                          PREVIOUS SHOWS / MAJOR PROJECTS
                        </label>
                        <input
                          type="text"
                          name="previousProjects"
                          placeholder="e.g. Paris Fashion Week 2024 Catwalk, Bollywood Award Show, Major Brand Live Event"
                          className="w-full bg-[#151210] border border-white/20 text-brand-white px-4 py-3 text-sm font-sans focus:border-brand-orange focus:outline-none"
                        />
                      </div>
                    )}

                    {/* FILE UPLOAD FIELD */}
                    <div className="space-y-2 sm:col-span-2">
                      <label className="block text-xs font-syne tracking-wider text-brand-platinum/90 uppercase font-semibold">
                        {activeCategory === "model"
                          ? "UPLOAD 2–3 RECENT PHOTOS (JPG, PNG, WEBP)"
                          : activeCategory === "influencer_creator"
                          ? "UPLOAD MEDIA KIT / PORTFOLIO (PDF, JPG, PNG)"
                          : "UPLOAD PORTFOLIO / WORK SAMPLES (PDF, JPG, PNG, WEBP)"}
                      </label>

                      <div className="relative border-2 border-dashed border-white/20 hover:border-brand-orange bg-[#151210] p-6 text-center transition-colors cursor-pointer group">
                        <input
                          type="file"
                          name="fileUpload"
                          multiple={activeCategory === "model"}
                          accept=".pdf,.jpg,.jpeg,.png,.webp"
                          onChange={handleFileChange}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <div className="w-10 h-10 rounded-full bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center text-brand-orange group-hover:scale-110 transition-transform">
                            <Upload className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-syne text-brand-white uppercase tracking-wider font-semibold">
                            {uploadedFiles.length > 0 ? "CHANGE FILE(S)" : "CLICK TO CHOOSE FILE(S) OR DRAG & DROP"}
                          </span>
                          <span className="text-[11px] font-sans text-brand-platinum/60">
                            Supported: PDF, JPG, JPEG, PNG, WEBP (Max 15MB)
                          </span>
                        </div>
                      </div>

                      {uploadedFiles.length > 0 && (
                        <div className="pt-2 space-y-1">
                          {uploadedFiles.map((file, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs bg-black/50 p-2.5 border border-brand-orange/30">
                              <span className="text-brand-white truncate max-w-xs">{file.name}</span>
                              <span className="text-brand-orange font-mono font-bold">{file.size}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 04 — AVAILABILITY SECTION */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-2">
                    <span className="text-xs font-syne tracking-micro font-bold text-brand-orange">
                      04 — AVAILABILITY
                    </span>
                    <span className="text-xs text-brand-platinum/50 font-light">
                      Travel & Production Terms
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Makeup Kit specific */}
                    {activeCategory === "makeup_artist" && (
                      <div className="space-y-2">
                        <label className="block text-xs font-syne tracking-wider text-brand-platinum/90 uppercase font-semibold">
                          DO YOU HAVE YOUR OWN PROFESSIONAL KIT?
                        </label>
                        <select name="hasKit" className="w-full bg-[#151210] border border-white/20 text-brand-white px-4 py-3 text-sm font-sans focus:border-brand-orange focus:outline-none">
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                    )}

                    {/* Freelance availability for Stylists */}
                    {activeCategory === "fashion_stylist" && (
                      <div className="space-y-2">
                        <label className="block text-xs font-syne tracking-wider text-brand-platinum/90 uppercase font-semibold">
                          AVAILABLE FOR FREELANCE PROJECTS?
                        </label>
                        <select name="availableFreelance" className="w-full bg-[#151210] border border-white/20 text-brand-white px-4 py-3 text-sm font-sans focus:border-brand-orange focus:outline-none">
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                    )}

                    {/* Travel / Collab fields */}
                    <div className="space-y-2">
                      <label className="block text-xs font-syne tracking-wider text-brand-platinum/90 uppercase font-semibold">
                        AVAILABLE FOR INTERNATIONAL TRAVEL?
                      </label>
                      <select name="availableTravel" className="w-full bg-[#151210] border border-white/20 text-brand-white px-4 py-3 text-sm font-sans focus:border-brand-orange focus:outline-none">
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-syne tracking-wider text-brand-platinum/90 uppercase font-semibold">
                        AVAILABLE FOR COLLABORATIONS?
                      </label>
                      <select name="availableCollab" className="w-full bg-[#151210] border border-white/20 text-brand-white px-4 py-3 text-sm font-sans focus:border-brand-orange focus:outline-none">
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>

                    {/* Optional Long text notes */}
                    {(activeCategory === "fashion_designer" || activeCategory === "makeup_artist") && (
                      <div className="space-y-2 sm:col-span-2">
                        <label className="block text-xs font-syne tracking-wider text-brand-platinum/90 uppercase font-semibold">
                          ANYTHING ELSE YOU'D LIKE US TO KNOW? (OPTIONAL)
                        </label>
                        <textarea
                          name="notes"
                          rows={3}
                          placeholder="Share details regarding recent collections, runway experience, or specific requirements..."
                          className="w-full bg-[#151210] border border-white/20 text-brand-white p-4 text-sm font-sans focus:border-brand-orange focus:outline-none"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Form Footer Buttons */}
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-[11px] font-sans text-brand-platinum/60">
                    By submitting, your details will be added to the FashAI Universal Private Talent Roster.
                  </div>
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-6 py-3 border border-white/20 text-xs font-syne tracking-wider text-brand-white hover:bg-white/10 transition-colors w-1/2 sm:w-auto"
                    >
                      CANCEL
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3.5 bg-brand-orange hover:bg-[#ff6f2d] text-white text-xs font-syne tracking-caps font-bold transition-all shadow-lg hover:shadow-brand-orange/40 disabled:opacity-50 w-1/2 sm:w-auto flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>SUBMITTING...</span>
                      ) : (
                        <>
                          <span>SUBMIT APPLICATION</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
