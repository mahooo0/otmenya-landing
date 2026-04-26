"use client";

import React from "react";
import { TOKENS, typeOf } from "@/lib/design-tokens";

interface WidgetHomeScreenProps {
  theme?: "light" | "dark";
}

// Service marks (reused from home)
const MARKS: Record<string, (c: string) => React.ReactNode> = {
  netflix: (c) => (<><path d="M16 12 L16 36" stroke={c} strokeWidth="2.6" strokeLinecap="round" /><path d="M32 12 L32 36" stroke={c} strokeWidth="2.6" strokeLinecap="round" /><path d="M16 12 L32 36" stroke={c} strokeWidth="2.6" strokeLinecap="round" /></>),
  spotify: (c) => (<><circle cx="24" cy="24" r="13" stroke={c} strokeWidth="1.6" fill="none" opacity="0.4" /><path d="M14 19 Q24 15 34 19" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round" /><path d="M16 24 Q24 21 32 24" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round" /><path d="M18 28 Q24 26 30 28" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round" /></>),
  yaplus: (c) => (<><path d="M16 14 L24 24 L32 14" stroke={c} strokeWidth="2.4" fill="none" strokeLinecap="round" /><path d="M24 24 L24 36" stroke={c} strokeWidth="2.4" strokeLinecap="round" /><circle cx="24" cy="40" r="1.6" fill={c} /></>),
};

const SERVICES: Record<string, { name: string; bg: string; fg: string }> = {
  netflix: { name: "Netflix", bg: "#A85A4A", fg: "#FCFAF4" },
  spotify: { name: "Spotify", bg: "#6B8E63", fg: "#FCFAF4" },
  yaplus: { name: "Yandex Plus", bg: "#22251F", fg: "#FCFAF4" },
};

function ServiceMark({ svc, size = 22 }: { svc: string; size?: number }) {
  const s = SERVICES[svc];
  const mark = MARKS[svc];
  if (!s || !mark) return null;
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.26,
      background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    }}>
      <svg width={size * 0.7} height={size * 0.7} viewBox="0 0 48 48">{mark(s.fg)}</svg>
    </div>
  );
}

function AppDot({ t, size = 14 }: { t: any; size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.28,
      background: t.accent, color: t.onAccent,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "Lora, serif", fontStyle: "italic", fontWeight: 500,
      fontSize: size * 0.6, flexShrink: 0,
    }}>о</div>
  );
}

// Small widget
function WidgetSmall({ t }: { t: any }) {
  return (
    <div style={{
      width: 158, height: 158, borderRadius: 22,
      background: t.elev,
      boxShadow: "0 12px 28px -10px rgba(20,20,18,0.18), 0 2px 6px -2px rgba(20,20,18,0.08)",
      overflow: "hidden", position: "relative",
      display: "flex", flexDirection: "column",
    }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 22, boxShadow: `inset 0 0 0 1px ${t.border}`, pointerEvents: "none" }} />
      <div style={{ flex: 1, padding: "14px 14px 12px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <AppDot t={t} size={12} />
          <span style={{ fontFamily: "JetBrains Mono, mono", fontSize: 9, letterSpacing: 1.4, color: t.text3 }}>СЛЕДУЮЩАЯ</span>
        </div>
        <div>
          <div style={{ fontFamily: "Lora, serif", fontWeight: 500, fontSize: 60, color: t.text, letterSpacing: -2.5, lineHeight: 0.9 }}>2</div>
          <div style={{ fontFamily: "IBM Plex Sans, sans", fontSize: 12, color: t.text2, marginTop: 1, fontStyle: "italic" }}>дня</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <ServiceMark svc="netflix" size={22} />
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontFamily: "Lora, serif", fontWeight: 500, fontSize: 13.5, color: t.text, letterSpacing: -0.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Netflix</div>
            <div style={{ fontFamily: "JetBrains Mono, mono", fontSize: 8.5, color: t.warn, letterSpacing: 0.8 }}>ТРИАЛ КОНЧАЕТСЯ</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Medium widget
function WidgetMedium({ t }: { t: any }) {
  const items = [
    { svc: "netflix", days: 2, label: "триал" },
    { svc: "spotify", days: 3, label: "299 ₽" },
  ];
  return (
    <div style={{
      width: 338, height: 158, borderRadius: 22,
      background: t.elev,
      boxShadow: "0 12px 28px -10px rgba(20,20,18,0.18), 0 2px 6px -2px rgba(20,20,18,0.08)",
      overflow: "hidden", position: "relative",
      display: "flex",
    }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 22, boxShadow: `inset 0 0 0 1px ${t.border}`, pointerEvents: "none" }} />
      {/* Left: month total */}
      <div style={{ flex: 1, padding: "14px 0 14px 16px", display: "flex", flexDirection: "column", justifyContent: "space-between", borderRight: `1px solid ${t.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <AppDot t={t} size={12} />
          <span style={{ fontFamily: "JetBrains Mono, mono", fontSize: 9, letterSpacing: 1.2, color: t.text3 }}>АПРЕЛЬ</span>
        </div>
        <div>
          <div style={{ fontFamily: "Lora, serif", fontWeight: 500, fontSize: 36, color: t.text, letterSpacing: -1.5, lineHeight: 1 }}>2 480</div>
          <div style={{ fontFamily: "Lora, serif", fontSize: 14, color: t.accent, fontStyle: "italic" }}>₽</div>
        </div>
        <div style={{ fontFamily: "JetBrains Mono, mono", fontSize: 8.5, color: t.text3, letterSpacing: 0.6 }}>7 ПОДПИСОК</div>
      </div>
      {/* Right: next 2 */}
      <div style={{ flex: 1, padding: "14px 16px 14px 14px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "JetBrains Mono, mono", fontSize: 9, letterSpacing: 1.2, color: t.text3 }}>БЛИЖАЙШИЕ</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {items.map((item) => (
            <div key={item.svc} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <ServiceMark svc={item.svc} size={28} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "Lora, serif", fontWeight: 500, fontSize: 13, color: t.text, letterSpacing: -0.2 }}>{SERVICES[item.svc]?.name}</div>
                <div style={{ fontFamily: "JetBrains Mono, mono", fontSize: 9, color: item.svc === "netflix" ? t.warn : t.text3, letterSpacing: 0.5 }}>
                  {item.days === 2 ? "ЧЕРЕЗ 2 ДНЯ" : `ЧЕРЕЗ ${item.days} ДНЯ`} · {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// iOS Home screen with widgets
export function WidgetHomeScreen({ theme = "light" }: WidgetHomeScreenProps) {
  const t = TOKENS[theme];
  const isDark = theme === "dark";

  return (
    <div style={{
      width: "100%", height: "100%",
      background: isDark ? "#000" : "#f2f2f7",
      display: "flex", flexDirection: "column",
      fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
      position: "relative", overflow: "hidden",
    }}>
      {/* Status bar */}
      <div style={{
        height: 54, padding: "14px 20px 0", display: "flex",
        justifyContent: "space-between", alignItems: "center",
        color: isDark ? "#fff" : "#000", fontSize: 15, fontWeight: 600,
      }}>
        <span>9:41</span>
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor"><rect x="0" y="3" width="3" height="9" rx="1" opacity="0.3" /><rect x="4.5" y="2" width="3" height="10" rx="1" opacity="0.5" /><rect x="9" y="0.5" width="3" height="11.5" rx="1" opacity="0.7" /><rect x="13.5" y="0" width="3" height="12" rx="1" /></svg>
          <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor"><path d="M7.5 3.5C9.3 3.5 10.9 4.2 12 5.3L13.4 3.9C11.9 2.4 9.8 1.5 7.5 1.5S3.1 2.4 1.6 3.9L3 5.3C4.1 4.2 5.7 3.5 7.5 3.5Z" opacity="0.5" /><path d="M7.5 6.5C8.6 6.5 9.5 7 10.2 7.6L11.6 6.2C10.5 5.2 9.1 4.5 7.5 4.5S4.5 5.2 3.4 6.2L4.8 7.6C5.5 7 6.4 6.5 7.5 6.5Z" opacity="0.7" /><circle cx="7.5" cy="10" r="1.5" /></svg>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="currentColor"><rect x="0" y="1" width="21" height="10" rx="2.5" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.35" /><rect x="22" y="4" width="1.5" height="4" rx="0.5" opacity="0.35" /><rect x="1.5" y="2.5" width="14" height="7" rx="1.5" /></svg>
        </div>
      </div>

      {/* Date header */}
      <div style={{ padding: "8px 20px 12px", textAlign: "left" }}>
        <div style={{ fontSize: 13, color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)", fontWeight: 500 }}>Среда, 23 апреля</div>
      </div>

      {/* Widgets area */}
      <div style={{ flex: 1, padding: "0 16px", display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Row 1: small widget + small placeholder */}
        <div style={{ display: "flex", gap: 16 }}>
          <WidgetSmall t={t} />
          {/* Placeholder clock-style widget */}
          <div style={{
            width: 158, height: 158, borderRadius: 22,
            background: isDark ? "#1c1c1e" : "#fff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            gap: 4,
          }}>
            <div style={{ fontSize: 42, fontWeight: 300, color: isDark ? "#fff" : "#000", letterSpacing: -1 }}>9:41</div>
            <div style={{ fontSize: 11, color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)", fontWeight: 500 }}>Москва</div>
          </div>
        </div>

        {/* Row 2: medium widget */}
        <WidgetMedium t={t} />

        {/* Row 3: app icons row */}
        <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 8 }}>
          {[
            { bg: "#007AFF", icon: "M", label: "Почта" },
            { bg: "#34C759", icon: "Т", label: "Телефон" },
            { bg: "#FF9500", icon: "Н", label: "Настройки" },
            { bg: "", icon: "logo", label: "ОтменYа" },
          ].map((app, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              {app.icon === "logo" ? (
                <svg width={60} height={60} viewBox="0 0 120 120" fill="none">
                  <defs><clipPath id="wgLogoClip"><rect width="120" height="120" rx="28" /></clipPath></defs>
                  <g clipPath="url(#wgLogoClip)">
                    <rect width="120" height="120" fill="#111" />
                    <rect y="58" width="120" height="62" fill={t.accent} />
                    <text x="60" y="48" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="20" fill="#fff" letterSpacing="0.5">отмен</text>
                    <text x="60" y="92" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="36" fill="#fff" letterSpacing="-1">Yа</text>
                  </g>
                </svg>
              ) : (
                <div style={{
                  width: 60, height: 60, borderRadius: 14,
                  background: app.bg, color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, fontWeight: 600,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                }}>{app.icon}</div>
              )}
              <div style={{ fontSize: 10, color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)" }}>
                {app.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Home indicator */}
      <div style={{ padding: "16px 0 8px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: 134, height: 5, borderRadius: 3, background: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.18)" }} />
      </div>
    </div>
  );
}
