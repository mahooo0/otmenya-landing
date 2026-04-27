"use client";

import { useLaunchMode } from "./LaunchState";

function AppStoreBadge() {
  return (
    <a href="#" className="inline-block transition-transform hover:scale-105">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/badges/appstore.svg"
        alt="Загрузите в App Store"
        style={{ height: 40, width: "auto" }}
      />
    </a>
  );
}

function GooglePlayBadge() {
  return (
    <a href="#" className="inline-block transition-transform hover:scale-105">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/badges/googleplay.png"
        alt="Доступно в Google Play"
        style={{ height: 52, width: "auto", marginTop: -6, marginBottom: -6 }}
      />
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
      <div className={`flex items-center gap-2 flex-wrap justify-center ${className}`}>
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
