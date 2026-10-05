"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import GradientFlowText from "./GradientFlowText";

interface DistortionCTAButtonProps {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
  className?: string;
  dataCursor?: string;
  onClick?: () => void;
}

export default function DistortionCTAButton({
  href,
  label,
  variant = "primary",
  className = "",
  dataCursor = "explore",
  onClick,
}: DistortionCTAButtonProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLAnchorElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });
  const animFrameIdRef = useRef<number | null>(null);
  const timeRef = useRef(0);

  const isPrimary = variant === "primary";

  const updateCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const width = rect.width;
    const height = rect.height;

    // Interpolate progress toward target (0 -> 1 on enter, 1 -> 0 on leave)
    const pDiff = targetProgressRef.current - progressRef.current;
    progressRef.current += pDiff * 0.12;

    // Interpolate mouse coordinates for directional fluid wave
    mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.14;
    mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.14;

    const p = progressRef.current;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (p > 0.002) {
      timeRef.current += 0.035 + p * 0.045;
      const t = timeRef.current;
      const mx = mouseRef.current.x * width;
      const my = mouseRef.current.y * height;

      ctx.save();
      ctx.beginPath();
      ctx.roundRect(0, 0, width, height, height / 2);
      ctx.clip();

      if (isPrimary) {
        // Base Gold Fill
        const baseGrad = ctx.createLinearGradient(0, 0, width, height);
        baseGrad.addColorStop(0, "#D4AF37");
        baseGrad.addColorStop(1, "#C59B27");
        ctx.fillStyle = baseGrad;
        ctx.fillRect(0, 0, width, height);

        // Fluid Radial Displacement Wave (Lemon Gold Highlight)
        const radius1 = Math.max(width, height) * (0.35 + p * 0.65);
        const grad1 = ctx.createRadialGradient(mx, my, 0, mx, my, radius1);
        grad1.addColorStop(0, `rgba(255, 236, 105, ${0.95 * p})`);
        grad1.addColorStop(0.45, `rgba(212, 175, 55, ${0.7 * p})`);
        grad1.addColorStop(1, "rgba(212, 175, 55, 0)");

        ctx.fillStyle = grad1;
        ctx.beginPath();
        ctx.arc(mx, my, radius1, 0, Math.PI * 2);
        ctx.fill();

        // Liquid Displacement Wave Lines (Sunset Orange Accents)
        ctx.fillStyle = `rgba(241, 94, 28, ${0.3 * p})`;
        ctx.beginPath();
        for (let x = 0; x <= width; x += 4) {
          const waveY =
            my +
            Math.sin(x * 0.03 + t) * 14 * p +
            Math.cos(x * 0.018 - t * 0.9) * 9 * p;
          if (x === 0) ctx.moveTo(x, waveY);
          else ctx.lineTo(x, waveY);
        }
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fill();
      } else {
        // Secondary CTA: Dark Glass Surface with Gold/Orange Fluid Wave
        const baseGrad = ctx.createLinearGradient(0, 0, width, height);
        baseGrad.addColorStop(0, "rgba(5, 5, 5, 0.92)");
        baseGrad.addColorStop(1, "rgba(18, 14, 11, 0.92)");
        ctx.fillStyle = baseGrad;
        ctx.fillRect(0, 0, width, height);

        // Fluid Gold Radial Wave
        const radius1 = Math.max(width, height) * (0.3 + p * 0.7);
        const grad1 = ctx.createRadialGradient(mx, my, 0, mx, my, radius1);
        grad1.addColorStop(0, `rgba(212, 175, 55, ${0.55 * p})`);
        grad1.addColorStop(0.5, `rgba(241, 94, 28, ${0.3 * p})`);
        grad1.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = grad1;
        ctx.beginPath();
        ctx.arc(mx, my, radius1, 0, Math.PI * 2);
        ctx.fill();

        // Wave lines
        ctx.fillStyle = `rgba(212, 175, 55, ${0.25 * p})`;
        ctx.beginPath();
        for (let x = 0; x <= width; x += 4) {
          const waveY =
            my +
            Math.sin(x * 0.035 + t * 1.1) * 12 * p +
            Math.cos(x * 0.02 - t) * 7 * p;
          if (x === 0) ctx.moveTo(x, waveY);
          else ctx.lineTo(x, waveY);
        }
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fill();
      }

      ctx.restore();
    }

    if (p > 0.002 || targetProgressRef.current > 0) {
      animFrameIdRef.current = requestAnimationFrame(updateCanvas);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      animFrameIdRef.current = null;
    }
  }, [isPrimary]);

  const syncCanvasSize = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  }, []);

  useEffect(() => {
    syncCanvasSize();
    window.addEventListener("resize", syncCanvasSize);
    return () => window.removeEventListener("resize", syncCanvasSize);
  }, [syncCanvasSize]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (shouldReduceMotion) return;
    targetProgressRef.current = 1;

    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current.targetX = (e.clientX - rect.left) / rect.width;
    mouseRef.current.targetY = (e.clientY - rect.top) / rect.height;
    mouseRef.current.x = mouseRef.current.targetX;
    mouseRef.current.y = mouseRef.current.targetY;

    if (!animFrameIdRef.current) {
      animFrameIdRef.current = requestAnimationFrame(updateCanvas);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current.targetX = (e.clientX - rect.left) / rect.width;
    mouseRef.current.targetY = (e.clientY - rect.top) / rect.height;
  };

  const handleMouseLeave = () => {
    targetProgressRef.current = 0;
  };

  return (
    <Link
      ref={containerRef}
      href={href}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor={dataCursor}
      className={`relative overflow-hidden group select-none transition-all duration-300 transform rounded-full min-h-[50px] flex items-center justify-center text-center px-8 py-4 ${
        isPrimary
          ? "bg-[#D4AF37] text-black hover:bg-[#FFEC69] hover:scale-[1.03] active:scale-[0.98] shadow-[0_0_25px_rgba(212,175,55,0.35)]"
          : "border border-[#D4AF37]/70 bg-black/60 backdrop-blur-sm text-white keep-white hover:border-[#D4AF37] hover:scale-[1.03] active:scale-[0.98]"
      } ${className}`}
    >
      {/* WEBGL-STYLE FLUID CANVAS DISPLACEMENT LAYER */}
      {!shouldReduceMotion && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none rounded-full"
        />
      )}

      {/* STABLE CRISP GRADIENT FLOW TEXT LAYER */}
      <span className="relative z-10 pointer-events-none font-syne font-bold tracking-caps text-xs sm:text-sm uppercase flex items-center justify-center gap-1.5">
        <GradientFlowText variant={isPrimary ? "primary" : "secondary"}>
          {label}
        </GradientFlowText>
      </span>
    </Link>
  );
}
