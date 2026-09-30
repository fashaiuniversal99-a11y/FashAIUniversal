"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { MasterSiteConfig } from "@/lib/admin/config-schema";
import { DEFAULT_MASTER_CONFIG } from "@/lib/admin/default-config";

export interface ToastNotification {
  id: string;
  text: string;
  type: "success" | "warning" | "info" | "error";
}

interface SiteConfigContextType {
  config: MasterSiteConfig;
  isLoaded: boolean;
  hasUnsavedChanges: boolean;
  saveStatus: "saved" | "unsaved" | "saving" | "published";
  toast: ToastNotification | null;
  showToast: (text: string, type?: "success" | "warning" | "info" | "error") => void;
  isPreviewOpen: boolean;
  setIsPreviewOpen: (open: boolean) => void;
  previewDevice: "desktop" | "tablet" | "mobile";
  setPreviewDevice: (device: "desktop" | "tablet" | "mobile") => void;
  refreshConfig: () => Promise<void>;
  updateLocalDraftConfig: (updater: (prev: MasterSiteConfig) => MasterSiteConfig) => void;
  saveDraft: () => Promise<boolean>;
  publish: (note?: string) => Promise<boolean>;
  resetThemeDefaults: () => void;
  discardUnsavedChanges: () => void;
}

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<MasterSiteConfig>(DEFAULT_MASTER_CONFIG);
  const [savedConfig, setSavedConfig] = useState<MasterSiteConfig>(DEFAULT_MASTER_CONFIG);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"saved" | "unsaved" | "saving" | "published">("saved");
  const [toast, setToast] = useState<ToastNotification | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const showToast = useCallback((text: string, type: "success" | "warning" | "info" | "error" = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToast({ id, text, type });
    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 3500);
  }, []);

  const fetchConfig = async () => {
    try {
      const res = await fetch("/api/config", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.config) {
          setConfig(data.config);
          setSavedConfig(data.config);
          setHasUnsavedChanges(false);
          setSaveStatus("published");
        }
      }
    } catch (e) {
      console.warn("Could not fetch published config, using default constants:", e);
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  // Warn on navigation/unload if unsaved changes exist
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "You have unsaved changes that will be lost.";
        return e.returnValue;
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Inject CSS Variables for Theme & Typography dynamically into root
  useEffect(() => {
    if (!config) return;
    const root = document.documentElement;

    root.style.setProperty("--admin-heading-scale", `${config.typographySettings?.headingScale || 1.0}`);
    root.style.setProperty("--admin-body-scale", `${config.typographySettings?.bodyScale || 1.0}`);

    const light = config.themeSettings?.light;
    const dark = config.themeSettings?.dark;

    if (light) {
      root.style.setProperty("--light-bg", light.background);
      root.style.setProperty("--light-text-primary", light.primaryText);
      root.style.setProperty("--light-text-secondary", light.secondaryText);
      root.style.setProperty("--light-accent-primary", light.primaryAccent);
      root.style.setProperty("--light-accent-secondary", light.secondaryAccent);
    }

    if (dark) {
      root.style.setProperty("--dark-bg", dark.background);
      root.style.setProperty("--dark-text-primary", dark.primaryText);
      root.style.setProperty("--dark-text-secondary", dark.secondaryText);
      root.style.setProperty("--dark-accent-primary", dark.primaryAccent);
      root.style.setProperty("--dark-accent-secondary", dark.secondaryAccent);
    }
  }, [config]);

  const updateLocalDraftConfig = (updater: (prev: MasterSiteConfig) => MasterSiteConfig) => {
    setConfig((prev) => {
      const updated = updater(prev);
      setHasUnsavedChanges(true);
      setSaveStatus("unsaved");
      return updated;
    });
  };

  const saveDraft = async (): Promise<boolean> => {
    setSaveStatus("saving");
    try {
      const token = typeof window !== "undefined" ? sessionStorage.getItem("fashai_admin_token") : null;
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      const res = await fetch("/api/admin/config", {
        method: "POST",
        headers,
        body: JSON.stringify({ config }),
      });
      if (res.ok) {
        setSavedConfig(config);
        setHasUnsavedChanges(false);
        setSaveStatus("saved");
        showToast("✓ Draft saved successfully", "info");
        return true;
      } else {
        setSaveStatus("unsaved");
        showToast("Failed to save draft", "error");
        return false;
      }
    } catch {
      setSaveStatus("unsaved");
      showToast("Error saving draft", "error");
      return false;
    }
  };

  const publish = async (note?: string): Promise<boolean> => {
    setSaveStatus("saving");
    try {
      const token = typeof window !== "undefined" ? sessionStorage.getItem("fashai_admin_token") : null;
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      const res = await fetch("/api/admin/config", {
        method: "PUT",
        headers,
        body: JSON.stringify({ config, note }),
      });
      if (res.ok) {
        setSavedConfig(config);
        setHasUnsavedChanges(false);
        setSaveStatus("published");
        showToast("✓ Published changes to live website!", "success");
        return true;
      } else {
        setSaveStatus("unsaved");
        showToast("Failed to publish changes", "error");
        return false;
      }
    } catch {
      setSaveStatus("unsaved");
      showToast("Error publishing changes", "error");
      return false;
    }
  };

  const discardUnsavedChanges = () => {
    setConfig(savedConfig);
    setHasUnsavedChanges(false);
    setSaveStatus(savedConfig === config ? "published" : "saved");
    showToast("Changes discarded", "info");
  };

  const resetThemeDefaults = () => {
    updateLocalDraftConfig((prev) => ({
      ...prev,
      themeSettings: DEFAULT_MASTER_CONFIG.themeSettings,
    }));
    showToast("Reset theme colors to FashAI defaults", "info");
  };

  return (
    <SiteConfigContext.Provider
      value={{
        config,
        isLoaded,
        hasUnsavedChanges,
        saveStatus,
        toast,
        showToast,
        isPreviewOpen,
        setIsPreviewOpen,
        previewDevice,
        setPreviewDevice,
        refreshConfig: fetchConfig,
        updateLocalDraftConfig,
        saveDraft,
        publish,
        resetThemeDefaults,
        discardUnsavedChanges,
      }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  const context = useContext(SiteConfigContext);
  if (!context) {
    return {
      config: DEFAULT_MASTER_CONFIG,
      isLoaded: true,
      hasUnsavedChanges: false,
      saveStatus: "saved" as const,
      toast: null,
      showToast: () => {},
      isPreviewOpen: false,
      setIsPreviewOpen: () => {},
      previewDevice: "desktop" as const,
      setPreviewDevice: () => {},
      refreshConfig: async () => {},
      updateLocalDraftConfig: () => {},
      saveDraft: async () => false,
      publish: async () => false,
      resetThemeDefaults: () => {},
      discardUnsavedChanges: () => {},
    };
  }
  return context;
}
