"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, User, ShieldCheck, AlertCircle, Loader2, Eye, EyeOff, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function AdminLoginPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please fill in both Username and Password fields.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Authentication failed. Invalid username or password.");
        setLoading(false);
        return;
      }

      // Store auth session token in sessionStorage as fallback backup
      if (data.token) {
        sessionStorage.setItem("fashai_admin_token", data.token);
      }

      window.location.href = "/admin";
    } catch {
      setError("Network error. Could not connect to authentication server.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex flex-col items-center justify-center p-4 sm:p-6 select-none relative overflow-hidden font-sans">
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all z-20 shadow-lg"
        title="Toggle Theme"
      >
        {theme === "dark" ? <Sun className="w-4 h-4 text-[#D4AF37]" /> : <Moon className="w-4 h-4 text-white" />}
      </button>

      {/* Ambient Radial Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-[#F15E1C]/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[450px] h-[450px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-[#0F0E0D]/95 border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        {/* Brand Lockup */}
        <div className="text-center space-y-3 mb-8">
          <div className="flex justify-center">
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image
                src="/assets/brand/fashai_logo_final.png"
                alt="FashAI Universal Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          <div>
            <h1 className="font-serif-display text-2xl sm:text-3xl font-light text-white uppercase tracking-tight">
              FashAI Universal
            </h1>
            <p className="font-syne text-xs text-[#D4AF37] font-bold uppercase tracking-[0.22em] mt-1">
              MASTER CONTROL PORTAL
            </p>
          </div>
        </div>

        {/* Security Alert Header */}
        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#2E936F]/10 border border-[#2E936F]/30 text-[#2E936F] text-xs font-syne font-medium mb-6">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>Restricted Admin Portal · Authorised Access Only</span>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-sans mb-6">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-syne font-bold uppercase tracking-wider text-white/80 mb-2">
              ADMIN USERNAME
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                required
                className="w-full bg-[#181715] border border-white/15 focus:border-[#D4AF37] text-white text-sm rounded-xl pl-10 pr-4 py-3 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-syne font-bold uppercase tracking-wider text-white/80 mb-2">
              ADMIN PASSWORD
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full bg-[#181715] border border-white/15 focus:border-[#D4AF37] text-white text-sm rounded-xl pl-10 pr-10 py-3 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F15E1C] hover:bg-[#e04f10] text-white font-syne font-bold text-xs sm:text-sm uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>VERIFYING CREDENTIALS...</span>
              </>
            ) : (
              <span>AUTHENTICATE &amp; ENTER MASTER CONTROL</span>
            )}
          </button>
        </form>

        {/* Footer Note */}
        <div className="mt-8 pt-4 border-t border-white/10 text-center text-[11px] font-syne text-white/50 tracking-wider">
          FashAI Universal © 2026 · Powered by Arav Innovation
        </div>
      </div>
    </div>
  );
}
