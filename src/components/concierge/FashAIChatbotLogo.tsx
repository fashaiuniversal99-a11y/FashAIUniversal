"use client";

import Image from "next/image";

interface FashAIChatbotLogoProps {
  size?: number;
  className?: string;
}

export default function FashAIChatbotLogo({ size = 36, className = "" }: FashAIChatbotLogoProps) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative rounded-full overflow-hidden shrink-0 flex items-center justify-center bg-transparent ${className}`}
    >
      <Image
        src="/assets/brand/chatbot_logo.png"
        alt="FashAI Logo"
        width={size}
        height={size}
        priority
        className="object-contain w-full h-full rounded-full"
      />
    </div>
  );
}
