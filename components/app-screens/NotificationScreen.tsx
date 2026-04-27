"use client";

import React from "react";
import { TOKENS } from "@/lib/design-tokens";

interface NotificationScreenProps {
  theme?: "light" | "dark";
}

function NotificationCard({
  isDark,
  accent,
  icon,
  title,
  body,
  time,
  isNew,
}: {
  isDark: boolean;
  accent: string;
  icon: React.ReactNode;
  title: string;
  body: string;
  time: string;
  isNew?: boolean;
}) {
  return (
    <div
      style={{
        background: isDark ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.85)",
        backdropFilter: "blur(30px)",
        borderRadius: 20,
        padding: "12px 14px",
        display: "flex",
        gap: 10,
        alignItems: "flex-start",
        border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.04)",
        boxShadow: isDark ? "none" : "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      {/* App icon */}
      <div style={{ flexShrink: 0, marginTop: 2 }}>{icon}</div>
      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: isDark ? "#fff" : "#000",
              fontFamily: "-apple-system, sans-serif",
            }}
          >
            {title}
          </span>
          <span
            style={{
              fontSize: 12,
              color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.35)",
              fontFamily: "-apple-system, sans-serif",
              flexShrink: 0,
              marginLeft: 8,
            }}
          >
            {time}
          </span>
        </div>
        <p
          style={{
            fontSize: 13,
            lineHeight: 1.35,
            color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)",
            fontFamily: "-apple-system, sans-serif",
            margin: 0,
          }}
        >
          {body}
        </p>
      </div>
    </div>
  );
}

function AppLogo({ size = 34, accent }: { size?: number; accent: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <defs>
        <clipPath id="notifLogoClip">
          <rect width="120" height="120" rx="28" />
        </clipPath>
      </defs>
      <g clipPath="url(#notifLogoClip)">
        <rect width="120" height="120" fill="#111" />
        <rect y="58" width="120" height="62" fill={accent} />
        <text x="60" y="48" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="20" fill="#fff" letterSpacing="0.5">
          отмен
        </text>
        <text x="60" y="92" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="36" fill="#fff" letterSpacing="-1">
          Yа
        </text>
      </g>
    </svg>
  );
}

export function NotificationScreen({ theme = "light" }: NotificationScreenProps) {
  const t = TOKENS[theme];
  const isDark = theme === "dark";

  const notifications = [
    {
      title: "ОтменYа",
      body: "⚠️ Через 2 дня закончится триал Netflix. После этого спишут 999 ₽/мес. Отменить сейчас?",
      time: "сейчас",
      isNew: true,
    },
    {
      title: "ОтменYа",
      body: "📊 Завтра списание Spotify — 299 ₽. Всё под контролем.",
      time: "10 мин",
      isNew: true,
    },
    {
      title: "ОтменYа",
      body: "✅ Подписка Кинопоиск успешно отменена. Сэкономлено 299 ₽/мес.",
      time: "1 ч",
      isNew: false,
    },
    {
      title: "ОтменYа",
      body: "🔔 Через 1 день заканчивается триал ChatGPT Plus. Отменить или оставить?",
      time: "3 ч",
      isNew: false,
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundImage: "url(https://devicescss.xyz/assets/img/bg-iphone-14-pro.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Status bar */}
      <div
        style={{
          height: 54,
          padding: "14px 20px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#fff",
          fontSize: 15,
          fontWeight: 600,
        }}
      >
        <span>9:41</span>
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor">
            <rect x="0" y="3" width="3" height="9" rx="1" opacity="0.3" />
            <rect x="4.5" y="2" width="3" height="10" rx="1" opacity="0.5" />
            <rect x="9" y="0.5" width="3" height="11.5" rx="1" opacity="0.7" />
            <rect x="13.5" y="0" width="3" height="12" rx="1" />
          </svg>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="currentColor">
            <rect x="0" y="1" width="21" height="10" rx="2.5" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.35" />
            <rect x="22" y="4" width="1.5" height="4" rx="0.5" opacity="0.35" />
            <rect x="1.5" y="2.5" width="14" height="7" rx="1.5" />
          </svg>
        </div>
      </div>

      {/* Lock icon — closed */}
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <svg width="14" height="18" viewBox="0 0 24 28" fill="none" style={{ opacity: 0.7 }}>
          <rect x="2" y="12" width="20" height="14" rx="4" fill="#fff" fillOpacity="0.25" />
          <rect x="2" y="12" width="20" height="14" rx="4" stroke="#fff" strokeWidth="1.5" />
          <path d="M7 12V8a5 5 0 0 1 10 0v4" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Time */}
      <div style={{ textAlign: "center", marginTop: 8 }}>
        <div style={{ fontSize: 72, fontWeight: 700, color: "#fff", letterSpacing: -3, lineHeight: 1 }}>
          9:41
        </div>
        <div style={{ fontSize: 18, color: "rgba(255,255,255,0.7)", marginTop: 4, fontWeight: 400 }}>
          среда, 23 апреля
        </div>
      </div>

      {/* Notifications */}
      <div style={{ flex: 1, padding: "28px 14px 0", display: "flex", flexDirection: "column", gap: 8, overflow: "hidden" }}>
        {notifications.map((n, i) => (
          <NotificationCard
            key={i}
            isDark={isDark}
            accent={t.accent}
            icon={<AppLogo size={34} accent={t.accent} />}
            title={n.title}
            body={n.body}
            time={n.time}
            isNew={n.isNew}
          />
        ))}
      </div>

      {/* Home indicator */}
      <div style={{ padding: "16px 0 8px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: 134, height: 5, borderRadius: 3, background: "rgba(255,255,255,0.3)" }} />
      </div>
    </div>
  );
}
