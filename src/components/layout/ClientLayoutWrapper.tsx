"use client";

import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CursorInteraction from "@/components/cinematic/CursorInteraction";
import Preloader from "@/components/cinematic/Preloader";
import PageTransition from "@/components/cinematic/PageTransition";
import { ThemeProvider } from "@/context/ThemeContext";
import { SiteConfigProvider, useSiteConfig } from "@/context/SiteConfigContext";
import MaintenanceScreen from "@/components/layout/MaintenanceScreen";

const EventInfoModal = dynamic(() => import("@/components/ui/EventInfoModal"));
const FashAiConcierge = dynamic(() => import("@/components/concierge/FashAiConcierge"));
const LocalDevicePreview = dynamic(() => import("@/components/ui/LocalDevicePreview"));
const StickyWhatsAppButton = dynamic(() => import("@/components/ui/StickyWhatsAppButton"));

function ContentRenderer({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { config } = useSiteConfig();

  const isAdminRoute = pathname?.startsWith("/admin");
  const isMaintenanceOn = config?.maintenanceSettings?.enabled;

  if (isAdminRoute) {
    return <main className="min-h-screen bg-[#050505] text-white">{children}</main>;
  }

  if (isMaintenanceOn) {
    return (
      <MaintenanceScreen
        title={config.maintenanceSettings.title}
        message={config.maintenanceSettings.message}
      />
    );
  }

  return (
    <>
      {/* Cinematic Initial Preloader */}
      {config.motionSettings?.globalAnimations && <Preloader />}

      {/* First-Visit Event Information Popup */}
      {config.popupSettings?.enabled && <EventInfoModal />}

      {/* Custom Fine-Pointer Editorial Cursor */}
      {config.motionSettings?.customCursor && <CursorInteraction />}

      {/* Fixed Editorial Navigation Header */}
      <Header />

      {/* Main Content Sections */}
      <main>
        {config.motionSettings?.pageTransitions ? (
          <PageTransition>{children}</PageTransition>
        ) : (
          children
        )}
      </main>

      {/* Haute Couture Footer */}
      <Footer />

      {/* Sticky WhatsApp Floating Button (Renders safely null if unconfigured) */}
      <StickyWhatsAppButton />

      {/* FashAI Universal Event Concierge Assistant */}
      <FashAiConcierge />

      {/* Local Development Only Device Preview Switcher */}
      <LocalDevicePreview />
    </>
  );
}

export default function ClientLayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <SiteConfigProvider>
      <ThemeProvider>
        <ContentRenderer>{children}</ContentRenderer>
      </ThemeProvider>
    </SiteConfigProvider>
  );
}
