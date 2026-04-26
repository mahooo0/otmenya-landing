"use client";

import { useLaunchMode } from "./LaunchState";

function AppStoreBadge() {
  return (
    <a href="#" className="inline-block transition-transform hover:scale-105">
      <svg width="140" height="42" viewBox="0 0 140 42" fill="none">
        <rect width="140" height="42" rx="8" fill="#000" />
        <text x="70" y="16" textAnchor="middle" fontFamily="-apple-system, sans-serif" fontWeight="400" fontSize="8" fill="#fff" letterSpacing="0.3">Загрузите в</text>
        <text x="70" y="30" textAnchor="middle" fontFamily="-apple-system, sans-serif" fontWeight="600" fontSize="14" fill="#fff">App Store</text>
        <g transform="translate(18,12)" fill="#fff">
          <path d="M11.5 0C11.5 0 12.3 1.6 12.3 3.2C12.3 5.1 10.7 6.5 10.7 6.5C10.7 6.5 9.1 5.1 9.1 3.2C9.1 1.6 11.5 0 11.5 0Z" fillRule="evenodd"/>
          <path d="M7.5 7C9 7 10.2 8 11.5 8C12.8 8 14 7 15.5 7C17.5 7 19 9 19 9C19 9 16.5 10.5 16.5 13.5C16.5 17 19.5 18 19.5 18C19.5 18 17.5 23 15 23C13.5 23 13 22 11.5 22C10 22 9.5 23 8 23C5.5 23 3 18 3 14C3 10 5.5 7 7.5 7Z" fillRule="evenodd"/>
        </g>
      </svg>
    </a>
  );
}

function GooglePlayBadge() {
  return (
    <a href="#" className="inline-block transition-transform hover:scale-105">
      <svg width="152" height="42" viewBox="0 0 152 42" fill="none">
        <rect width="152" height="42" rx="8" fill="#000" />
        <text x="80" y="16" textAnchor="middle" fontFamily="-apple-system, sans-serif" fontWeight="400" fontSize="8" fill="#fff" letterSpacing="0.3">ДОСТУПНО В</text>
        <text x="80" y="30" textAnchor="middle" fontFamily="-apple-system, sans-serif" fontWeight="600" fontSize="14" fill="#fff">Google Play</text>
        <g transform="translate(14,10)">
          <path d="M3 2L14 11L3 20V2Z" fill="#4285F4"/>
          <path d="M3 2L14 11L18 7.5L3 2Z" fill="#EA4335"/>
          <path d="M3 20L14 11L18 14.5L3 20Z" fill="#34A853"/>
          <path d="M18 7.5L14 11L18 14.5L21 11L18 7.5Z" fill="#FBBC04"/>
        </g>
      </svg>
    </a>
  );
}

export function CTAButton({ className = "", size = "default" }: { className?: string; size?: "default" | "lg" }) {
  const { mode, openDialog } = useLaunchMode();

  const h = size === "lg" ? "h-12" : "h-11";
  const px = size === "lg" ? "px-8" : "px-6";
  const text = size === "lg" ? "text-base" : "text-sm";

  if (mode === "launched") {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <AppStoreBadge />
        <GooglePlayBadge />
      </div>
    );
  }

  return (
    <button
      onClick={openDialog}
      className={`inline-flex ${h} items-center justify-center rounded-full bg-primary ${px} ${text} font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg ${className}`}
    >
      Забронировать доступ
    </button>
  );
}
