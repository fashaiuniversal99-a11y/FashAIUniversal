"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, ArrowRight } from "lucide-react";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "../ui/ThemeToggle";
import GradientFlowText from "../ui/GradientFlowText";
import { useSiteConfig } from "@/context/SiteConfigContext";

import { trackEvent } from "@/lib/analytics/tracker";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [heroHeight, setHeroHeight] = useState(700);
  const pathname = usePathname();
  const { config } = useSiteConfig();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const updateHeroHeight = () => {
      const whoWeAreEl = document.getElementById("who-we-are");
      if (whoWeAreEl) {
        setHeroHeight(whoWeAreEl.offsetTop - 60);
      } else {
        setHeroHeight(window.innerHeight - 60);
      }
    };

    handleScroll();
    updateHeroHeight();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateHeroHeight, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateHeroHeight);
    };
  }, [pathname]);

  const DEFAULT_NAV_ITEMS = [
    { id: "home", label: "HOME", href: "/", enabled: true, order: 1 },
    { id: "upcoming", label: "UPCOMING", href: "/upcoming", enabled: true, order: 2 },
    { id: "services", label: "SERVICES", href: "/services", enabled: true, order: 3 },
    { id: "events", label: "EVENTS", href: "/events", enabled: true, order: 4 },
    { id: "projects", label: "PROJECTS", href: "/projects", enabled: true, order: 5 },
    { id: "blog", label: "BLOG", href: "/fashion-magazine", enabled: true, order: 6 },
    { id: "talent", label: "TALENT", href: "/talent", enabled: true, order: 7 },
  ];

  const rawConfigNav = (config.navigationSettings && config.navigationSettings.length > 0
    ? config.navigationSettings.filter(
        (item) => item.enabled && item.id !== "contact" && item.id !== "gallery"
      )
    : DEFAULT_NAV_ITEMS
  );

  const hasEvents = rawConfigNav.some((item) => item.id === "events" || item.href === "/events");
  const hasProjects = rawConfigNav.some((item) => item.id === "projects" || item.href === "/projects");
  const hasBlog = rawConfigNav.some((item) => item.id === "blog" || item.href === "/fashion-magazine");
  const hasTalent = rawConfigNav.some((item) => item.id === "talent" || item.id === "apply" || item.href === "/apply" || item.href === "/talent");

  let mergedNavItems = [...rawConfigNav];
  if (mergedNavItems.length === 0) {
    mergedNavItems = [...DEFAULT_NAV_ITEMS];
  } else {
    if (!hasEvents) {
      mergedNavItems.push({ id: "events", label: "EVENTS", href: "/events", enabled: true, order: 4 });
    }
    if (!hasProjects) {
      mergedNavItems.push({ id: "projects", label: "PROJECTS", href: "/projects", enabled: true, order: 5 });
    }
    if (!hasBlog) {
      mergedNavItems.push({ id: "blog", label: "BLOG", href: "/fashion-magazine", enabled: true, order: 6 });
    }
    if (!hasTalent) {
      mergedNavItems.push({ id: "talent", label: "TALENT", href: "/talent", enabled: true, order: 7 });
    }
  }

  const navItems = mergedNavItems.sort((a, b) => a.order - b.order);

  // Over cinematic hero video on homepage (until "A GLOBAL FASHION MOVEMENT..." / #who-we-are section)
  const isOverVideo = pathname === "/" && scrollY < heroHeight;
  const isTopAtVideo = pathname === "/" && scrollY < 25;

  return (
    <>
      {/* FLOATING / FIXED GLASS EDITORIAL NAVBAR CONTAINER */}
      <header
        className={`fixed z-[200] [transform-style:preserve-3d] [backface-visibility:hidden] transition-all duration-300 select-none ${
          isTopAtVideo
            ? "top-0 inset-x-0 w-full lg:top-3 lg:left-1/2 lg:-translate-x-1/2 lg:w-[calc(100%-1.5rem)] lg:max-w-[1520px] h-16 sm:h-20 lg:h-[70px] bg-transparent border-transparent shadow-none backdrop-blur-none lg:rounded-full"
            : isOverVideo
            ? "top-0 inset-x-0 w-full lg:top-2 lg:left-1/2 lg:-translate-x-1/2 lg:w-[calc(100%-1.5rem)] lg:max-w-[1420px] h-16 sm:h-18 lg:h-[60px] bg-black/60 lg:bg-black/40 border-b lg:border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-2xl lg:rounded-full"
            : "top-0 inset-x-0 w-full lg:top-2 lg:left-1/2 lg:-translate-x-1/2 lg:w-[calc(100%-1.5rem)] lg:max-w-[1420px] h-16 sm:h-18 lg:h-[60px] bg-black/55 dark:bg-black/60 lg:bg-[#080706]/90 lg:dark:bg-[#070707]/85 border-b lg:border border-[#D4AF37]/35 dark:border-white/15 shadow-lg backdrop-blur-xl lg:backdrop-blur-2xl lg:rounded-full"
        }`}
      >
        <div
          className={`h-full flex items-center justify-between relative transition-all duration-300 ${
            isTopAtVideo ? "px-4 sm:px-8 lg:px-12 gap-3.5 sm:gap-8 lg:gap-10" : "px-4 sm:px-8 lg:px-11 gap-3 sm:gap-6 lg:gap-8"
          }`}
        >
          {/* LOGO AREA (LEFT) */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0" aria-label="FashAI Universal Home">
            <div
              className={`relative flex-shrink-0 transition-all duration-300 group-hover:scale-105 ${
                isTopAtVideo
                  ? "w-10 h-10 sm:w-12 sm:h-12 md:w-10 md:h-10 xl:w-[42px] xl:h-[42px]"
                  : "w-9 h-9 sm:w-11 sm:h-11 md:w-9 md:h-9 xl:w-[38px] xl:h-[38px]"
              }`}
            >
              <Image
                src="/assets/brand/fashai_logo_final.png"
                alt="FashAI Universal Logo"
                fill
                priority
                sizes="(max-width: 640px) 48px, (max-width: 1024px) 40px, 44px"
                className="object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_1px_3px_rgba(212,175,55,0.25)]"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span
                className={`font-serif-display font-light tracking-wider uppercase leading-none transition-all duration-300 ${
                  isTopAtVideo
                    ? "text-lg sm:text-2xl md:text-lg lg:text-xl xl:text-2xl"
                    : "text-base sm:text-xl md:text-base lg:text-lg xl:text-xl"
                }`}
              >
                <span className="text-[#D4AF37] dark:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)] dark:drop-shadow-none">
                  FashAI
                </span>
                <span className="font-serif italic font-normal text-[#D4AF37] capitalize ml-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)] dark:drop-shadow-none">
                  Universal
                </span>
              </span>
            </div>
          </Link>

          {/* DESKTOP / LAPTOP CENTER NAVIGATION LINKS */}
          <nav
            className={`hidden lg:flex items-center text-xs font-syne tracking-[0.18em] font-semibold uppercase transition-all duration-300 ${
              isTopAtVideo ? "space-x-7 xl:space-x-12" : "space-x-6 xl:space-x-10"
            }`}
          >
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`group relative py-1.5 transition-colors duration-200 subpixel-antialiased ${
                    isActive
                      ? "font-bold text-[#FFEC69] dark:text-[#D4AF37]"
                      : "font-semibold text-[#D4AF37] dark:text-white/85 hover:text-[#FFEC69] dark:hover:text-[#D4AF37]"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-[#D4AF37] origin-center transition-transform duration-[250ms] ease-out ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* RIGHT CIRCULAR & PILL UNIFIED ACTION CONTROLS */}
          <div className="flex items-center shrink-0 gap-2 sm:gap-2.5">
            {/* CIRCULAR GLASS THEME TOGGLE (w-9 h-9 sm:w-10 sm:h-10) */}
            <ThemeToggle isHeroHeader={isOverVideo} />

            {/* HIRE TALENT CLIENT ACTION BUTTON */}
            <Link
              href="/hire-talent"
              onClick={() => trackEvent("hire_talent_click", { location: "header" })}
              className="hidden md:inline-flex items-center justify-center border border-[#D4AF37]/60 dark:border-white/30 text-[#111111] dark:text-white hover:border-[#D4AF37] hover:bg-[#D4AF37]/15 font-syne font-bold text-xs tracking-wider uppercase rounded-full h-9 sm:h-10 px-4 sm:px-5 transition-all duration-300 shrink-0 whitespace-nowrap"
            >
              HIRE TALENT
            </Link>

            {/* FULLY ROUNDED PILL CONTACT US CTA BUTTON (h-9 sm:h-10 px-5 sm:px-6) */}
            <Link
              href="/contact"
              onClick={() => trackEvent("contact_click", { location: "header" })}
              className="hidden sm:inline-flex items-center justify-center bg-[#D4AF37] text-[#111111] hover:bg-[#FFEC69] font-syne font-bold text-xs tracking-wider uppercase rounded-full h-9 sm:h-10 px-5 sm:px-6 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 shrink-0 whitespace-nowrap"
              data-cursor="explore"
            >
              <GradientFlowText variant="primary">
                CONTACT US →
              </GradientFlowText>
            </Link>

            {/* CIRCULAR MOBILE HAMBURGER BUTTON */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden rounded-full flex items-center justify-center shrink-0 transition-all duration-300 w-11 h-11 sm:w-12 sm:h-12 bg-[#D4AF37]/15 dark:bg-white/15 border border-[#D4AF37]/50 dark:border-white/20 backdrop-blur-md text-[#D4AF37] dark:text-white hover:bg-[#D4AF37]/25 dark:hover:bg-white/25 hover:border-[#D4AF37] shadow-sm"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4AF37] dark:text-white stroke-[2.2]" />
            </button>
          </div>
        </div>
      </header>

      {/* FULLSCREEN EDITORIAL MOBILE NAVIGATION MENU */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        items={navItems.map((n) => ({ label: n.label, href: n.href }))}
        currentPath={pathname}
      />
    </>
  );
}
