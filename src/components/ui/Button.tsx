"use client";

import React from "react";
import Link from "next/link";
import GradientFlowText from "./GradientFlowText";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "secondary" | "gold" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  dataCursor?: string;
}

/**
 * Shared Button Component
 * Encapsulates standard FashAI button styling while automatically applying
 * the global GradientFlowText animation to button labels.
 */
export default function Button({
  href,
  variant = "primary",
  size = "md",
  children,
  className = "",
  dataCursor,
  disabled,
  ...props
}: ButtonProps) {
  const isPrimary = variant === "primary";

  const sizeClasses =
    size === "sm"
      ? "text-xs px-4 py-2 min-h-[38px]"
      : size === "lg"
      ? "text-sm sm:text-base px-8 py-3.5 min-h-[52px]"
      : "text-xs sm:text-sm px-6 py-3 min-h-[44px]";

  const baseClasses =
    "inline-flex items-center justify-center font-jost font-bold tracking-wider uppercase rounded-full transition-all duration-300 select-none whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-black";

  const variantClasses =
    variant === "primary"
      ? "bg-[#D4AF37] text-black hover:bg-[#FFEC69] hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
      : variant === "secondary"
      ? "border border-[#D4AF37]/70 bg-black/60 backdrop-blur-sm text-white hover:border-[#D4AF37] hover:scale-[1.02] active:scale-[0.98]"
      : variant === "gold"
      ? "bg-gradient-to-r from-[#D4AF37] to-[#C59B27] text-black hover:brightness-110 shadow-md"
      : variant === "outline"
      ? "border border-white/20 bg-black/40 text-white hover:border-[#D4AF37]"
      : "bg-transparent text-[#D4AF37] hover:text-[#FFEC69]";

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "";

  const textVariant = isPrimary || variant === "gold" ? "primary" : "gold";

  const content = (
    <GradientFlowText variant={disabled ? "primary" : textVariant}>
      {children}
    </GradientFlowText>
  );

  if (href && !disabled) {
    return (
      <Link
        href={href}
        data-cursor={dataCursor}
        className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled}
      data-cursor={dataCursor}
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${disabledClasses} ${className}`}
      {...props}
    >
      {content}
    </button>
  );
}
