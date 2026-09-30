"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import MagazineArticleModal, { MagazineArticle } from "@/components/magazine/MagazineArticleModal";

const ARTICLES_DATA: MagazineArticle[] = [
  {
    id: "beauty-artistry",
    category: "FASHION",
    title: "BACKSTAGE BEAUTY & EDITORIAL ARTISTRY",
    subtitle: "Precision beauty direction and makeup artistry crafted for high-definition catwalk and camera lighting.",
    readTime: "3 MIN READ",
    primaryImage: "/assets/homepage/Fashion.png",
    primaryImageAlt: "Fashion editorial presentation and runway direction",
    imagePosition: "object-top",
    introduction: "Backstage makeup artistry demands technical precision engineered to withstand intense stage lights, high-definition cameras, and fast-paced runway changes.",
    experience: [
      "Beauty directors collaborate closely with fashion designers to craft makeup looks that enhance collection themes. Glowing skin finishes, graphic eye accents, and tailored lip tones are sculpted to harmonize with collection color palettes.",
      "Backstage beauty teams work under tight schedules, executing seamless transitions between designer collection reveals."
    ],
    visualHighlights: [
      "Macro editorial photos highlight luminous skin textures, bold editorial eye artistry, and precise hair sculpting against backstage studio lighting."
    ],
    fashionCulture: [
      "Beauty artistry is an integral extension of fashion presentation. By establishing elevated beauty standards, FashAI Universal productions deliver runway and editorial imagery worthy of global magazine covers."
    ],
    keyMoments: [
      "Skin Preparation: Creating luminous, camera-ready base textures.",
      "Theme Harmonization: Matching beauty accents to collection textiles.",
      "Catwalk Final Touch: Quick backstage touch-ups seconds before stage entry."
    ],
    closing: "Backstage artistry elevates fashion presentations into complete, polished visual masterpieces.",
    content: [
      "Backstage makeup artistry requires high-precision application tailored to venue lighting and runway cameras. Beauty directors craft clean, glowing skin textures and graphic accents.",
      "Harmonizing beauty direction with garment palettes ensures a cohesive aesthetic vision across the entire designer collection.",
      "Our backstage beauty teams bring technical expertise to both live runway productions and editorial campaign shoots."
    ]
  },
  {
    id: "gala-appearances",
    category: "EVENTS",
    title: "VIP SALONS & GLOBAL PATRON ENGAGEMENT",
    subtitle: "High-profile VIP gatherings, luxury galas, and celebrity appearances across our event formats.",
    readTime: "4 MIN READ",
    primaryImage: "/assets/homepage/Production.png",
    primaryImageAlt: "Production and luxury event format showcase",
    imagePosition: "object-top",
    introduction: "Luxury event formats achieve true distinction through exclusive audience engagement and executive hospitality. FashAI Universal galas host industry leaders, public figures, and creative talent.",
    experience: [
      "Set in premiere venues across Dubai and international fashion capitals, our VIP galas blend haute couture presentations with red carpet reception and corporate networking.",
      "Guests experience an atmosphere of sophisticated elegance, complete with curated dining, live entertainment, and exclusive sponsor activations."
    ],
    visualHighlights: [
      "Red carpet photography captures high-fashion guest attire, celebrity arrivals, and candid moments inside executive lounge environments."
    ],
    fashionCulture: [
      "Creating networking salons at the intersection of fashion, business, and technology fosters strategic partnerships across international markets."
    ],
    keyMoments: [
      "Red Carpet Arrivals: Welcoming VIP guests, media press, and industry patrons.",
      "Executive Salon Gatherings: High-level networking and brand collaboration.",
      "Couture Gala Presentation: Evening showcase celebrating creative excellence."
    ],
    closing: "Our VIP event formats redefine corporate and lifestyle gatherings through luxury fashion orchestration.",
    content: [
      "Luxury event experiences thrive on exclusive audience engagement. FashAI Universal galas host celebrities, public figures, and industry leaders.",
      "The intersection of fashion, enterprise, and lifestyle creates networking salons for collaboration and cultural exchange in Dubai and India.",
      "Every event format is curated with executive hospitality, red carpet press opportunities, and spatial elegance."
    ]
  },
  {
    id: "lifestyle-retrospective",
    category: "LIFESTYLE",
    title: "LIFESTYLE 2025: VISUAL RETROSPECTIVE",
    subtitle: "A visual record of the physical garment art, luxury lighting, and delegate gatherings from LifeStyle 2025.",
    readTime: "3 MIN READ",
    primaryImage: "/assets/homepage/Talent.png",
    primaryImageAlt: "Editorial model portrait from LifeStyle 2025 showcase",
    imagePosition: "object-top",
    introduction: "LifeStyle 2025 represented a landmark edition in our global visual archive, bringing together fashion designers, creative directors, model talent, and international delegates under an immersive atmosphere.",
    experience: [
      "The edition transformed the venue into a multi-sensory showcase, where bespoke runway staging met curated lifestyle lounges. Guests experienced high-end couture presentations paired with direct networking salons connecting creative communities across international markets.",
      "Throughout the showcase, every garment presentation emphasized structural tailored lines, delicate fabric movement, and architectural lighting, setting an elevated tone for corporate and lifestyle event formats."
    ],
    visualHighlights: [
      "Our editorial photo team captured pivotal moments across the runway and backstage ateliers. Key highlights include dramatic movement photography of floor-length silhouettes, intricate hand-stitched details, and candid backstage artist preparations under high-definition spotlights."
    ],
    fashionCulture: [
      "Fashion at FashAI Universal is designed as a cross-border medium linking creative markets in Dubai, the UAE, India, and global fashion hubs. LifeStyle 2025 demonstrated how runway presentations intersect with commercial visual production, corporate galas, and digital editorial formats."
    ],
    keyMoments: [
      "Grand Opening Runway: High-concept couture debut under spatial arena lighting.",
      "Atelier Craftsmanship Display: Direct lookbook previews featuring bespoke fabric construction.",
      "VIP Networking Salons: International delegate gatherings bridging fashion, business, and enterprise."
    ],
    closing: "As we prepare for LifeStyle 2026, the visual record of 2025 stands as an enduring benchmark of production excellence and creative community building.",
    content: [
      "LifeStyle 2025 represented a landmark edition in our visual archive, uniting fashion designers, creative directors, and industry guests under an immersive atmosphere.",
      "The retrospective highlights runway moments, lookbook captures, and spatial design elements that defined the completed edition.",
      "As we prepare for LifeStyle 2026 in Dubai, the visual archive of 2025 serves as a foundational benchmark for event production excellence."
    ],
    galleryImages: [
      { src: "/assets/homepage/Talent.png", alt: "LifeStyle 2025 Event Atmosphere" },
      { src: "/assets/homepage/Moments.png", alt: "LifeStyle 2025 Runway Highlight" }
    ]
  },
  {
    id: "runway-dynamics",
    category: "RUNWAY",
    title: "THE ARCHITECTURE OF MOVEMENT: CATWALK DYNAMICS IN DUBAI",
    subtitle: "An in-depth editorial look at how couture silhouettes and spatial lighting redefine the modern runway experience.",
    readTime: "4 MIN READ",
    primaryImage: "/assets/homepage/Moments.png",
    primaryImageAlt: "High fashion runway dynamics and catwalk movement showcase",
    imagePosition: "object-top",
    introduction: "Catwalk presentation is an intricate discipline balancing garment architecture, model cadence, and spatial lighting design. In our Dubai runway showcases, catwalk choreography is meticulously tailored to amplify each designer's textural language.",
    experience: [
      "On the runway, floor-length trains, structured coats, and fluid silk drapes behave differently under intense arena spotlights. Choreographers work side-by-side with lighting directors to ensure that pacing allows audience members and press photographers to absorb fabric weight, movement, and silhouette contours.",
      "The result is a fluid performance where fashion transcends simple garment displays and becomes an immersive visual event."
    ],
    visualHighlights: [
      "High-speed photography captures the dynamic motion of trailing silks and structural shoulder lines. Spotlights accentuate metallic threading and sheer textures, producing striking high-contrast imagery for international publication."
    ],
    fashionCulture: [
      "Dubai continues to solidify its role as a global fashion crossroads. Bringing international talent, couture houses, and global delegates into one arena fosters cross-market creative exchange across the UAE, Middle East, and Asia."
    ],
    keyMoments: [
      "Precision Cadence: Synchronized model movement matching atmospheric soundscapes.",
      "Lighting Architecture: Dynamic spotlight angles designed for 4K video recording.",
      "Final Ensemble Walk: Full designer collection showcase under multi-beam lighting."
    ],
    closing: "The continuous refinement of catwalk dynamics ensures FashAI Universal runway showcases remain premier destinations for global fashion expression.",
    content: [
      "Runway presentation is an intricate balance of silhouette architecture, cadence, and ambient lighting. In our Dubai showcases, catwalk choreography is crafted to complement each designer's textural language.",
      "From dramatic floor-length trains to structural tailoring, movement on the runway bridges the boundary between physical garment artistry and spatial performance.",
      "The FashAI Universal runway ecosystem brings together international models, lighting directors, and movement choreographers to deliver high-impact runway presentations across international fashion hubs."
    ],
    galleryImages: [
      { src: "/assets/homepage/Moments.png", alt: "LifeStyle 2025 Runway Presentation Photo 1" },
      { src: "/assets/homepage/Fashion.png", alt: "LifeStyle 2025 Runway Presentation Photo 2" }
    ]
  },
  {
    id: "designer-spotlight",
    category: "DESIGNERS",
    title: "ATELIER PERSPECTIVES & COUTURE INTEGRITY",
    subtitle: "Exploring high-end craftsmanship, material selection, and structural garment construction with participating ateliers.",
    readTime: "5 MIN READ",
    primaryImage: "/assets/homepage/Design.png",
    primaryImageAlt: "Fashion designer in couture atelier inspecting garment construction",
    imagePosition: "object-top",
    introduction: "Crafting couture demands an uncompromising commitment to garment structure, hand-embroidery, and textile selection. Designers within our network combine time-honored atelier techniques with forward-looking aesthetic visions.",
    experience: [
      "Inside the atelier, raw fabrics undergo months of cutting, fitting, and embellishment before taking center stage. From delicate lace overlays to heavy velvet tailoring, each piece represents a labor of precision craftsmanship.",
      "FashAI Universal provides ateliers with direct presentation platforms, connecting couture creators directly with luxury buyers, press editors, and VIP patrons."
    ],
    visualHighlights: [
      "Close-up editorial photography reveals the intricacy of needlework, beaded embellishments, and internal boning structures that give haute couture its sculptural form."
    ],
    fashionCulture: [
      "Supporting independent designers and established fashion houses maintains the cultural integrity of couture craftsmanship. By spotlighting talent across the UAE, India, and global markets, FashAI Universal strengthens creative economic ecosystems."
    ],
    keyMoments: [
      "Material Selection: Curating rare silks, organzas, and sustainable textiles.",
      "Pattern Fitting: Perfecting drape ergonomics and structural balance.",
      "Collection Debut: Presenting completed couture series to international attendees."
    ],
    closing: "Celebrating atelier perspectives ensures that true fashion craftsmanship remains at the center of the global creative narrative.",
    content: [
      "Crafting couture requires an uncompromising focus on fabric weight, hand-stitching, and geometric proportions. Designers within our network combine traditional atelier techniques with avant-garde aesthetic visions.",
      "By offering dedicated presentation platforms, FashAI Universal enables designers to showcase their creative direction directly to press, buyers, and high-net-worth patrons across the UAE and India.",
      "Each atelier presentation reflects months of meticulous craftsmanship, turning raw textiles into emotive fashion statements on the global stage."
    ],
    galleryImages: [
      { src: "/assets/homepage/Design.png", alt: "Couture Atelier Material Selection Detail" }
    ]
  },
  {
    id: "styling-direction",
    category: "CREATIVE",
    title: "WARDROBE DIRECTION & CAMPAIGN VISUALS",
    subtitle: "Behind the styling process for editorial shoots, campaign lookbooks, and high-fashion stage presentations.",
    readTime: "4 MIN READ",
    primaryImage: "/assets/master/stylist/stylist_01.png",
    primaryImageAlt: "Fashion stylist curating wardrobe looks for campaign production",
    imagePosition: "object-top",
    introduction: "Styling is the essential creative thread unifying garment design, model presence, and visual campaign storytelling. Fashion stylists curate outfit pairings, accessory accents, and footwear balance to articulate a cohesive aesthetic narrative.",
    experience: [
      "Whether preparing a commercial brand campaign or a live runway presentation, wardrobe directors curate every layer with intent. Color harmony, texture contrast, and silhouette proportions are evaluated under continuous studio and event lighting.",
      "This meticulous approach ensures that visual campaigns communicate brand identity effortlessly across print, digital, and video media."
    ],
    visualHighlights: [
      "Behind-the-scenes imagery documents the fast-paced environment of wardrobe racks, garment steamers, and final accessory checks before camera roll."
    ],
    fashionCulture: [
      "Visual styling translates abstract artistic concepts into accessible commercial narratives. FashAI Universal styling teams support designers, corporate brands, and visual productions across UAE and India operations."
    ],
    keyMoments: [
      "Lookbook Curation: Pairing statement garments with complementary accessories.",
      "On-Set Adjustments: Real-time garment pinning and drape refinement during shoots.",
      "Campaign Launch: Delivering polished visual assets for global brand promotion."
    ],
    closing: "Expert wardrobe direction transforms individual garments into iconic visual stories.",
    content: [
      "Styling is the connective thread that unifies garment design, model presence, and campaign storytelling. Stylists curate look pairings, accessory accents, and footwear balance.",
      "In FashAI Universal productions, styling direction ensures that every outfit communicates a clear aesthetic narrative aligned with the event format.",
      "Collaborating with top-tier fashion stylists creates memorable editorial imagery for digital media, press features, and brand campaigns."
    ]
  }
];

const FILTER_CATEGORIES = [
  { id: "ALL", label: "ALL" },
  { id: "FASHION", label: "FASHION" },
  { id: "EVENTS", label: "EVENTS" },
  { id: "DESIGNERS", label: "DESIGNERS" },
  { id: "RUNWAY", label: "RUNWAY" },
  { id: "LIFESTYLE", label: "LIFESTYLE" },
  { id: "CREATIVE", label: "CREATIVE" },
];

interface FashionMagazineSectionProps {
  isFullPage?: boolean;
}

// Shared Editorial Card Heading Component (Single Source of Truth)
function EditorialHeading({
  title,
  level = "h3",
  className = "",
}: {
  title: string;
  level?: "h3" | "h4";
  className?: string;
}) {
  const Component = level;
  return (
    <Component
      style={{
        fontSize: "clamp(25px, 2.5vw, 38px)",
        lineHeight: 1.15,
      }}
      className={`font-serif-display font-light text-[#111111] dark:text-[#D4AF37] uppercase tracking-tight group-hover:text-[#FFEC69] transition-colors ${className}`}
    >
      {title}
    </Component>
  );
}

// Shared Editorial Card Description Component (Single Source of Truth)
function EditorialDescription({
  text,
  className = "",
  lineClamp,
}: {
  text: string;
  className?: string;
  lineClamp?: string;
}) {
  return (
    <p
      style={{
        fontSize: "clamp(16px, 1.1vw, 18px)",
        lineHeight: 1.6,
      }}
      className={`font-jost font-normal text-[#222222] dark:text-brand-off-white ${lineClamp ? lineClamp : ""} ${className}`}
    >
      {text}
    </p>
  );
}

export default function FashionMagazineSection({ isFullPage = false }: FashionMagazineSectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [selectedArticle, setSelectedArticle] = useState<MagazineArticle | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Featured Story for Homepage (1 BIG CARD)
  const featuredStory = ARTICLES_DATA[0]; // BACKSTAGE BEAUTY & EDITORIAL ARTISTRY

  // 3 Small Stories for Homepage
  const smallStories = ARTICLES_DATA.slice(1, 4); // VIP SALONS, LIFESTYLE 2025, CATWALK DYNAMICS

  // Full Page Archive Articles Filtering
  const filteredArticles = activeFilter === "ALL"
    ? ARTICLES_DATA
    : ARTICLES_DATA.filter((art) => art.category === activeFilter);

  const archiveFeatured = filteredArticles[0] || ARTICLES_DATA[0];
  const archiveGrid = filteredArticles.slice(1);

  return (
    <section id="magazine" className="relative py-8 sm:py-12 md:py-14 bg-white dark:bg-[#050505] text-[#111111] dark:text-white border-b border-black/10 dark:border-white/10 overflow-hidden select-none">
      {/* Background Ambience & Editorial Watermark */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="editorial-watermark absolute top-6 right-4 text-[16vw] font-serif-display font-light uppercase text-black/[0.03] dark:text-white/[0.02] leading-none pointer-events-none">
          EDITORIAL
        </div>
      </div>

      <div className="container-editorial relative z-10">
        {/* Magazine Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6 sm:mb-8 border-b border-black/10 dark:border-white/10 pb-6 sm:pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-syne tracking-micro text-[#D4AF37] font-bold uppercase mb-3">
              <span>FASHAI UNIVERSAL EDITORIAL</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-light text-[#111111] dark:text-brand-white uppercase leading-none">
              FASHION <span className="font-serif italic font-normal text-[#D4AF37]">MAGAZINE</span>
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3">
            <p className="font-sans text-sm sm:text-base md:text-lg text-[#333333] dark:text-brand-off-white max-w-md font-light leading-relaxed text-left md:text-right">
              Fashion stories, event moments, creative perspectives and visual highlights from the FashAI Universal ecosystem.
            </p>
            {!isFullPage && (
              <Link
                href="/fashion-magazine"
                className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#FFEC69] text-[#111111] border border-[#D4AF37] px-6 py-2.5 rounded-full font-syne text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-md group"
              >
                <span>EXPLORE MORE</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </div>

        {/* ==================================================== */}
        {/* HOMEPAGE VIEW: EXACTLY 1 BIG FEATURED CARD + 3 SMALL CARDS */}
        {/* ==================================================== */}
        {!isFullPage ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
              {/* 1 BIG FEATURED CARD (lg:col-span-7) */}
              <div className="lg:col-span-7 flex">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="group relative w-full bg-[#FAF8F5] dark:bg-[#090807] border border-black/10 dark:border-[#D4AF37]/40 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between hover:border-[#D4AF37] transition-all duration-300"
                >
                  <div>
                    {/* Clean Featured Image Frame */}
                    <div className="relative aspect-[16/10] sm:aspect-[16/9.5] w-full overflow-hidden bg-black">
                      <Image
                        src={featuredStory.primaryImage}
                        alt={featuredStory.primaryImageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover object-top filter contrast-[1.03] group-hover:scale-105 transition-transform duration-700 ease-out"
                        priority
                      />
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-syne font-bold uppercase tracking-wider bg-black/80 text-[#D4AF37] border border-[#D4AF37]/40 backdrop-blur-md">
                          FEATURED STORY · {featuredStory.category}
                        </span>
                      </div>
                    </div>

                    {/* Featured Story Content Below Image */}
                    <div className="p-6 sm:p-8 space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-syne text-[#D4AF37] font-bold uppercase tracking-wider">
                          {featuredStory.readTime}
                        </span>
                      </div>

                      <EditorialHeading title={featuredStory.title} level="h3" />
                      <EditorialDescription text={featuredStory.subtitle} className="text-justified" />
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 pt-0">
                    <button
                      onClick={() => setSelectedArticle(featuredStory)}
                      className="inline-flex items-center gap-2.5 bg-[#D4AF37] hover:bg-[#FFEC69] text-[#111111] border border-[#D4AF37] px-6 py-3 rounded-full text-xs font-syne font-bold tracking-widest uppercase transition-all shadow-md group/btn"
                    >
                      <span>READ STORY</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* 3 SMALL CARDS STACKED (lg:col-span-5) */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                {smallStories.map((story, idx) => (
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="group relative bg-[#FAF8F5] dark:bg-[#090807] border border-black/10 dark:border-white/10 rounded-2xl p-4 sm:p-5 hover:border-[#D4AF37]/60 transition-all duration-300 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between shadow-sm"
                  >
                    <div className="relative w-full sm:w-36 aspect-[16/10] sm:aspect-square shrink-0 rounded-xl overflow-hidden bg-black border border-black/10 dark:border-white/10">
                      <Image
                        src={story.primaryImage}
                        alt={story.primaryImageAlt}
                        fill
                        sizes="(max-width: 640px) 100vw, 150px"
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="flex flex-col justify-between flex-grow space-y-2 w-full">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] sm:text-xs font-syne font-bold uppercase tracking-wider text-[#D4AF37]">
                          {story.category}
                        </span>
                        <span className="text-[10px] sm:text-xs font-syne text-[#555555] dark:text-brand-off-white/80 uppercase font-semibold">
                          {story.readTime}
                        </span>
                      </div>

                      <EditorialHeading title={story.title} level="h4" className="line-clamp-2" />
                      <EditorialDescription text={story.subtitle} lineClamp="line-clamp-2" />

                      <div className="pt-1">
                        <button
                          onClick={() => setSelectedArticle(story)}
                          className="inline-flex items-center gap-1.5 text-xs font-syne font-bold uppercase text-[#D4AF37] hover:text-[#111111] dark:hover:text-white transition-colors"
                        >
                          <span>READ STORY</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom Section Explore More CTA */}
            <div className="mt-6 text-center pt-4 border-t border-black/10 dark:border-white/10">
              <Link
                href="/fashion-magazine"
                className="inline-flex items-center justify-center gap-2.5 bg-[#D4AF37] hover:bg-[#FFEC69] text-[#111111] border border-[#D4AF37] px-8 py-3.5 rounded-full font-syne text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 shadow-lg group"
              >
                <span>EXPLORE MORE</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        ) : (
          /* ==================================================== */
          /* DEDICATED MAGAZINE ARCHIVE PAGE VIEW (isFullPage = true) */
          /* ==================================================== */
          <div className="space-y-8">
            {/* Mobile Dropdown Category Selector */}
            <div className="sm:hidden mb-6 relative">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-full px-4 py-3 bg-[#FAF8F5] dark:bg-[#0A0A0A] border border-black/10 dark:border-white/15 rounded-xl flex items-center justify-between text-left shadow-sm"
              >
                <div>
                  <span className="text-[10px] font-syne uppercase text-[#F15E1C] dark:text-brand-yellow-golden tracking-wider block font-bold">
                    CATEGORY FILTER
                  </span>
                  <span className="font-syne text-sm sm:text-base font-bold text-[#111111] dark:text-white uppercase tracking-wider">
                    {FILTER_CATEGORIES.find((c) => c.id === activeFilter)?.label || "ALL"}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-black/60 dark:text-white/60 transition-transform duration-200 ${
                    isMobileMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-[#0C0B0A] border border-black/10 dark:border-white/15 rounded-xl shadow-xl z-30 overflow-hidden py-1">
                  {FILTER_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setActiveFilter(cat.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left flex items-center justify-between text-xs sm:text-sm font-syne uppercase tracking-wider transition-colors ${
                        activeFilter === cat.id
                          ? "bg-[#F15E1C]/10 dark:bg-brand-yellow-golden/10 text-[#F15E1C] dark:text-brand-yellow-golden font-bold"
                          : "text-[#333333] dark:text-white/80 hover:text-[#F15E1C] dark:hover:text-brand-yellow-golden hover:bg-black/5 dark:hover:bg-white/5"
                      }`}
                    >
                      <span>{cat.label}</span>
                      {activeFilter === cat.id && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F15E1C] dark:bg-brand-yellow-golden" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop Category Filter Bar */}
            <div className="hidden sm:block mb-8 overflow-x-auto no-scrollbar pb-2">
              <div className="flex items-center gap-2 sm:gap-3 min-w-max">
                {FILTER_CATEGORIES.map((cat) => {
                  const isActive = activeFilter === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveFilter(cat.id)}
                      className={`px-4 py-2 font-syne text-xs tracking-micro font-bold uppercase rounded-full transition-all duration-300 border ${
                        isActive
                          ? "bg-[#F15E1C] dark:bg-brand-yellow-golden text-white dark:text-black border-[#F15E1C] dark:border-brand-yellow-golden shadow-md"
                          : "bg-[#FAF8F5] dark:bg-[#0A0A0A] text-[#111111] dark:text-white/80 border-black/10 dark:border-white/10 hover:border-[#F15E1C] dark:hover:border-brand-yellow-golden/40"
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Featured Article Banner */}
            {archiveFeatured && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8 group relative bg-[#0A0908] border border-brand-yellow-golden/40 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:border-brand-yellow-golden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                  <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-[4/3] w-full overflow-hidden bg-black">
                    <Image
                      src={archiveFeatured.primaryImage}
                      alt={archiveFeatured.primaryImageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className={`object-cover ${archiveFeatured.imagePosition || "object-center"} filter contrast-105 group-hover:scale-[1.03] transition-transform duration-700 ease-out`}
                      priority
                    />
                  </div>

                  <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] sm:text-xs font-syne text-brand-yellow-golden font-bold uppercase tracking-wider">
                          FEATURED ARTICLE · {archiveFeatured.category}
                        </span>
                        <span className="text-[10px] sm:text-xs font-syne text-brand-off-white/80 uppercase">
                          {archiveFeatured.readTime}
                        </span>
                      </div>

                      <EditorialHeading title={archiveFeatured.title} level="h3" className="mb-4" />
                      <EditorialDescription text={archiveFeatured.subtitle} className="mb-6 text-justified" />
                    </div>

                    <div>
                      <button
                        onClick={() => setSelectedArticle(archiveFeatured)}
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-brand-yellow-golden to-amber-500 hover:opacity-95 text-black py-3 px-6 rounded-2xl font-syne text-xs font-bold tracking-caps shadow-xl transition-all group/btn"
                      >
                        <span>READ STORY</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Archive Grid */}
            {archiveGrid.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                <AnimatePresence>
                  {archiveGrid.map((article, idx) => (
                    <motion.div
                      key={article.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.08 }}
                      className="group relative bg-[#090807] border border-white/10 rounded-2xl overflow-hidden p-6 hover:border-brand-yellow-golden/60 transition-all duration-500 flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl mb-5 bg-black border border-white/10">
                          <Image
                            src={article.primaryImage}
                            alt={article.primaryImageAlt}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className={`object-cover ${article.imagePosition || "object-center"} filter contrast-105 group-hover:scale-[1.04] transition-transform duration-700 ease-out`}
                          />
                          <div className="absolute top-3 left-3">
                            <span className="text-[10px] font-syne text-brand-yellow-golden font-bold uppercase tracking-wider">
                              {article.category}
                            </span>
                          </div>
                        </div>

                        <EditorialHeading title={article.title} level="h4" className="mb-3" />
                        <EditorialDescription text={article.subtitle} lineClamp="line-clamp-3" className="mb-6 text-justified" />
                      </div>

                      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                        <span className="text-[10px] sm:text-xs font-syne text-brand-off-white/80 uppercase">
                          {article.readTime}
                        </span>
                        <button
                          onClick={() => setSelectedArticle(article)}
                          className="inline-flex items-center gap-1.5 text-xs font-syne text-brand-yellow-golden font-bold uppercase hover:text-white transition-colors group/link"
                        >
                          <span>READ STORY</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Editorial Article Reader Modal */}
      <MagazineArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </section>
  );
}
