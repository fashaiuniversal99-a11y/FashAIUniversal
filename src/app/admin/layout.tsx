"use client";

import React, { useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Globe,
  Sliders,
  Palette,
  LayoutTemplate,
  Image as ImageIcon,
  Grid,
  Calendar,
  Layers,
  FileText,
  Inbox,
  Navigation as NavIcon,
  MousePointer,
  Archive,
  Activity,
  LogOut,
  ExternalLink,
  Menu as MenuIcon,
  X,
  Zap,
  CheckCircle2,
  AlertCircle,
  Save,
  Send,
  Eye,
  User,
  RotateCcw,
  Sun,
  Moon,
  MessageSquare,
  MessageCircle,
  Users,
  HelpCircle,
  UserCheck,
} from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { useTheme } from "@/context/ThemeContext";
import { LivePreviewModal } from "@/components/admin/LivePreviewModal";
import { GlobalAdminSearch } from "@/components/admin/GlobalAdminSearch";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const {
    config,
    updateLocalDraftConfig,
    saveDraft,
    publish,
    refreshConfig,
    hasUnsavedChanges,
    saveStatus,
    toast,
    showToast,
    setIsPreviewOpen,
    discardUnsavedChanges,
  } = useSiteConfig();

  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileDrawerOpen]);

  useEffect(() => {
    if (isLoginPage) {
      setAuthChecked(true);
      return;
    }

    const verifyAuth = async () => {
      try {
        const token = typeof window !== "undefined" ? sessionStorage.getItem("fashai_admin_token") : null;
        const headers: Record<string, string> = {};
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }
        const res = await fetch("/api/admin/auth/me", { cache: "no-store", headers });
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setIsAuthenticated(true);
            setAuthChecked(true);
            return;
          }
        }
      } catch (e) {
        console.warn("Auth verify error:", e);
      }
      setIsAuthenticated(false);
      setAuthChecked(true);
      router.push("/admin/login");
    };

    verifyAuth();
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
    } catch (e) {
      console.warn("Logout error:", e);
    }
    sessionStorage.removeItem("fashai_admin_token");
    router.push("/admin/login");
  };

  const handleToggleMaintenance = async () => {
    const currentState = config?.maintenanceSettings?.enabled || false;
    const newState = !currentState;
    updateLocalDraftConfig((prev) => ({
      ...prev,
      maintenanceSettings: {
        ...prev.maintenanceSettings,
        enabled: newState,
      },
    }));
    const saved = await saveDraft();
    if (saved) {
      const published = await publish(`Maintenance Mode set to ${newState ? "ACTIVE" : "OFF"}`);
      if (published) {
        await refreshConfig();
        toast;
      }
    }
  };

  const handleSaveDraftClick = async () => {
    setIsSaving(true);
    await saveDraft();
    setIsSaving(false);
  };

  const handlePublishClick = async () => {
    setIsSaving(true);
    await publish("Admin published updates");
    setIsSaving(false);
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#080808] text-white flex flex-col items-center justify-center p-6 text-center select-none font-sans">
        <div className="w-9 h-9 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-syne text-[11px] uppercase tracking-widest text-[#D4AF37]">
          AUTHENTICATING MASTER ADMIN...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const isMaintenanceOn = config?.maintenanceSettings?.enabled;

  // Derive Current Page Title
  const getPageTitle = (path: string) => {
    if (path === "/admin") return "Dashboard";
    if (path === "/admin/chatbot") return "Chatbot Intelligence";
    if (path === "/admin/homepage") return "Homepage Editor";
    if (path === "/admin/pages") return "Page Manager";
    if (path === "/admin/events") return "Events Manager";
    if (path === "/admin/services") return "Services & Availability";
    if (path === "/admin/media") return "Media Library";
    if (path === "/admin/gallery") return "Gallery Manager";
    if (path === "/admin/applications") return "Talent Applications";
    if (path === "/admin/submissions") return "Submitted Forms";
    if (path === "/admin/theme") return "Theme Editor";
    if (path === "/admin/navigation") return "Navigation Control";
    if (path === "/admin/popup") return "Event Popup";
    if (path === "/admin/footer") return "Footer Control";
    if (path === "/admin/website") return "Website Status";
    if (path === "/admin/settings") return "Global Settings";
    if (path === "/admin/backups") return "Backups & Restore";
    if (path === "/admin/activity") return "Activity Log";
    return "Master Control";
  };

  const pageTitle = getPageTitle(pathname);

  // Complete CMS Navigation Groups as specified in User Requirement #18
  const navigationGroups = [
    {
      groupTitle: "DASHBOARD",
      items: [{ label: "Master Overview", href: "/admin", icon: LayoutDashboard }],
    },
    {
      groupTitle: "CHATBOT",
      items: [
        { label: "Overview & Analytics", href: "/admin/chatbot", icon: MessageSquare },
        { label: "Conversations", href: "/admin/chatbot?tab=conversations", icon: MessageCircle },
        { label: "Leads Captured", href: "/admin/chatbot?tab=leads", icon: Users },
        { label: "Chatbot Inquiries", href: "/admin/chatbot?tab=inquiries", icon: HelpCircle },
      ],
    },
    {
      groupTitle: "APPLICATIONS",
      items: [
        { label: "All Applications", href: "/admin/applications", icon: UserCheck },
        { label: "By Domain", href: "/admin/applications?view=domain", icon: Layers },
      ],
    },
    {
      groupTitle: "SUBMITTED FORMS",
      items: [
        { label: "Submissions & Inquiries", href: "/admin/submissions", icon: Inbox },
      ],
    },
    {
      groupTitle: "WEBSITE & SECTIONS",
      items: [
        { label: "Pages", href: "/admin/pages", icon: Zap },
        { label: "Homepage Sections", href: "/admin/homepage", icon: LayoutTemplate },
        { label: "Navigation", href: "/admin/navigation", icon: NavIcon },
        { label: "Footer", href: "/admin/footer", icon: MousePointer },
        { label: "Global Layout", href: "/admin/website", icon: Globe },
      ],
    },
    {
      groupTitle: "SERVICES & EVENTS",
      items: [
        { label: "Services & Availability", href: "/admin/services", icon: Layers },
        { label: "Collections & Shows", href: "/admin/events", icon: Calendar },
      ],
    },
    {
      groupTitle: "DESIGN & MEDIA",
      items: [
        { label: "Colors & Theme", href: "/admin/theme", icon: Palette },
        { label: "Typography", href: "/admin/typography", icon: FileText },
        { label: "Buttons & CTAs", href: "/admin/hero", icon: Sliders },
        { label: "Media Library", href: "/admin/media", icon: ImageIcon },
        { label: "Galleries", href: "/admin/gallery", icon: Grid },
      ],
    },
    {
      groupTitle: "SETTINGS & LOGS",
      items: [
        { label: "General & SEO", href: "/admin/settings", icon: Sliders },
        { label: "Backups & Snapshots", href: "/admin/backups", icon: Archive },
        { label: "Activity Logs", href: "/admin/activity", icon: Activity },
      ],
    },
  ];

  return (
    <div id="admin-root" className="admin-shell min-h-screen bg-[#080808] text-white flex flex-col font-sans select-none antialiased transition-colors duration-200">
      {/* TOP HEADER BAR (Section 3 & 6) */}
      <header className="h-16 sm:h-20 bg-[#0E0D0C] border-b border-white/10 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-[100] shadow-2xl backdrop-blur-md">
        {/* LEFT: Mobile Trigger & Page Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="lg:hidden p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white transition-all border border-white/10"
            aria-label="Toggle Navigation Drawer"
          >
            {mobileDrawerOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-3">
            <Link href="/admin" className="relative w-8 h-8 flex-shrink-0 hidden xs:block">
              <Image
                src="/assets/brand/fashai_logo_final.png"
                alt="FashAI Logo"
                fill
                className="object-contain"
              />
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/40 font-mono hidden sm:inline">/ admin /</span>
              <h1 className="font-serif-display text-sm sm:text-lg font-light text-white uppercase tracking-wider">
                {pageTitle}
              </h1>
            </div>
          </div>
        </div>

        {/* MIDDLE: GLOBAL SEARCH (Section 7 & 22) */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <GlobalAdminSearch />
        </div>

        {/* RIGHT ACTIONS & WEBSITE STATUS */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* WEBSITE ONLINE / MAINTENANCE STATUS BADGE */}
          <button
            onClick={handleToggleMaintenance}
            title="Click to toggle Website Maintenance Mode"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[11px] font-syne font-bold uppercase tracking-wider transition-all shadow-sm ${
              isMaintenanceOn
                ? "bg-[#F15E1C]/20 border-[#F15E1C] text-[#F15E1C] hover:bg-[#F15E1C]/30 animate-pulse"
                : "bg-[#2E936F]/20 border-[#2E936F] text-[#2E936F] hover:bg-[#2E936F]/30"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isMaintenanceOn ? "bg-[#F15E1C]" : "bg-[#2E936F]"
              }`}
            />
            <span className="hidden xs:inline">
              {isMaintenanceOn ? "● MAINTENANCE MODE" : "● WEBSITE ONLINE"}
            </span>
            <span className="xs:hidden">{isMaintenanceOn ? "MAINT" : "ONLINE"}</span>
          </button>

          {/* SAVE STATUS & DRAFT BUTTONS */}
          {hasUnsavedChanges ? (
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-syne text-[#D4AF37] font-bold uppercase tracking-wider hidden lg:inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
                Unsaved
              </span>

              <button
                onClick={handleSaveDraftClick}
                disabled={isSaving}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-syne font-medium transition-all border border-white/15"
              >
                <Save className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="hidden sm:inline">Save Draft</span>
              </button>

              <button
                onClick={handlePublishClick}
                disabled={isSaving}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-2xl bg-[#D4AF37] hover:bg-[#FFEC69] text-black text-xs font-syne font-bold transition-all shadow-lg hover:shadow-xl"
              >
                <Send className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Publish</span>
              </button>
            </div>
          ) : (
            <span className="text-[10px] font-mono text-white/50 hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2E936F]" />
              {saveStatus === "published" ? "Published" : "Saved"}
            </span>
          )}

          {/* THEME TOGGLE BUTTON */}
          <button
            onClick={toggleTheme}
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-white/90 hover:text-white transition-all font-syne"
          >
            {theme === "dark" ? (
              <>
                <Sun className="w-3.5 h-3.5 text-[#FFEC69]" />
                <span className="hidden lg:inline">Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="hidden lg:inline">Dark Mode</span>
              </>
            )}
          </button>

          {/* PREVIEW WEBSITE BUTTON */}
          <button
            onClick={() => setIsPreviewOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-white/90 hover:text-white transition-all font-syne"
          >
            <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="hidden sm:inline">Preview</span>
          </button>

          {/* ADMIN PROFILE / LOGOUT */}
          <button
            onClick={handleLogout}
            className="p-2 rounded-2xl bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors border border-white/10"
            title="Logout Admin Session"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* MAIN TWO-PART LAYOUT CONTAINER */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* LEFT SIDEBAR — SIGNIFICANTLY LARGER (290px - 320px) (Section 1) */}
        <aside className="hidden lg:flex flex-col w-[290px] xl:w-[310px] bg-[#0B0A0A] border-r border-white/10 flex-shrink-0 select-none">
          {/* SIDEBAR HEADER */}
          <div className="p-5 border-b border-white/10 flex items-center gap-3.5">
            <div className="relative w-9 h-9 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
              <Image
                src="/assets/brand/fashai_logo_final.png"
                alt="FashAI Logo"
                fill
                className="object-contain p-1.5"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif-display text-sm font-semibold tracking-wider text-white uppercase truncate">
                FashAI Universal
              </span>
              <span className="font-syne text-[9px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
                EDITORIAL CONTROL ROOM
              </span>
            </div>
          </div>

          {/* SIDEBAR NAVIGATION GROUPS (Section 1 & 5) */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
            {navigationGroups.map((group) => (
              <div key={group.groupTitle} className="space-y-1.5">
                <div className="px-3 py-1 text-[10px] font-syne font-bold uppercase tracking-[0.22em] text-white/40">
                  {group.groupTitle}
                </div>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`group relative flex items-center justify-between px-4 py-2.5 rounded-2xl text-xs font-syne transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-[#D4AF37]/15 via-white/5 to-transparent text-white font-bold border-l-2 border-[#D4AF37] shadow-sm"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon
                          className={`w-4 h-4 shrink-0 transition-colors ${
                            isActive ? "text-[#D4AF37]" : "text-white/40 group-hover:text-white/80"
                          }`}
                        />
                        <span className="truncate tracking-wide">{item.label}</span>
                      </div>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37] shrink-0" />
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>

          {/* SIDEBAR FOOTER & SYSTEM INFO */}
          <div className="p-4 border-t border-white/10 bg-[#0E0D0C] space-y-3">
            <div className="flex items-center justify-between text-[11px] text-white/60 px-2">
              <span className="flex items-center gap-2 font-syne font-medium">
                <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                Master Admin
              </span>
              <span className="text-[9px] font-mono bg-white/10 px-2 py-0.5 rounded-full text-white/80 border border-white/10">
                v2.6 Live
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white/70 hover:text-white transition-all font-syne"
            >
              <LogOut className="w-3.5 h-3.5 text-red-400" />
              Sign Out Session
            </button>
          </div>
        </aside>

        {/* MOBILE SLIDE-OUT DRAWER (Section 15 & 16) */}
        {mobileDrawerOpen && (
          <div className="lg:hidden fixed inset-0 z-[150] flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
              onClick={() => setMobileDrawerOpen(false)}
            />
            {/* Drawer content */}
            <div className="relative w-80 max-w-[85vw] bg-[#0E0D0C] border-r border-white/15 rounded-r-3xl flex flex-col h-full z-10 shadow-2xl animate-in slide-in-from-left duration-200">
              <div className="p-5 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h2 className="font-serif-display text-base font-semibold text-white uppercase tracking-wider">
                    FashAI Universal
                  </h2>
                  <p className="font-syne text-[10px] text-[#D4AF37] uppercase tracking-[0.2em] font-bold">
                    Editorial Control Room
                  </p>
                </div>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="p-4 border-b border-white/10">
                <GlobalAdminSearch />
              </div>

              <nav className="flex-1 overflow-y-auto p-4 space-y-5">
                {navigationGroups.map((group) => (
                  <div key={group.groupTitle} className="space-y-1.5">
                    <div className="px-3 py-1 text-[10px] font-syne font-bold uppercase tracking-[0.22em] text-white/40">
                      {group.groupTitle}
                    </div>
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileDrawerOpen(false)}
                          className={`flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-syne transition-all ${
                            isActive
                              ? "bg-[#D4AF37] text-black font-bold shadow-lg"
                              : "text-white/70 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="w-4 h-4" />
                            <span>{item.label}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </nav>

              <div className="p-4 border-t border-white/10 bg-black/40">
                <button
                  onClick={handleLogout}
                  className="w-full py-2.5 rounded-2xl bg-red-500/20 text-red-300 font-syne text-xs font-bold flex items-center justify-center gap-2 border border-red-500/30"
                >
                  <LogOut className="w-4 h-4" />
                  Logout Admin Session
                </button>
              </div>
            </div>
          </div>
        )}

        {/* RIGHT MAIN WORKSPACE */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10 bg-[#080808] relative">
          {children}
        </main>
      </div>

      {/* GLOBAL LIVE PREVIEW MODAL */}
      <LivePreviewModal />

      {/* TOAST NOTIFICATION FLOATING CONTAINER (Section 23) */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[200] flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#141312] border border-white/20 text-xs text-white shadow-2xl animate-in slide-in-from-bottom-3 duration-200">
          {toast.type === "success" && <CheckCircle2 className="w-4 h-4 text-[#2E936F]" />}
          {toast.type === "warning" && <AlertCircle className="w-4 h-4 text-[#D4AF37]" />}
          {toast.type === "error" && <AlertCircle className="w-4 h-4 text-[#F15E1C]" />}
          {toast.type === "info" && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
          <span className="font-syne font-medium">{toast.text}</span>
        </div>
      )}

      {/* UNSAVED CHANGES DISCARD MODAL (Section 19) */}
      {showDiscardModal && (
        <div className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121110] border border-white/20 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-serif-display text-lg text-white">UNSAVED CHANGES</h3>
            <p className="text-xs text-white/70 leading-relaxed font-sans">
              You have modifications in your draft that have not been saved or published yet.
              Discarding will revert back to the last published snapshot.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowDiscardModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-syne text-white/70 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  discardUnsavedChanges();
                  setShowDiscardModal(false);
                }}
                className="px-4 py-2 rounded-xl text-xs font-syne font-bold bg-red-500/20 border border-red-500/40 text-red-300 hover:bg-red-500/30"
              >
                Discard Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
