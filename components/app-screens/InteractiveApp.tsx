"use client";

import React, { useState, useCallback } from "react";
import { TOKENS, typeOf } from "@/lib/design-tokens";

interface InteractiveAppProps {
  theme?: "light" | "dark";
  initialScreen?: "home" | "analytics" | "settings" | "add" | "cancel-guide";
}

// ---- Service data ----
const SERVICES = [
  { id: "spotify", name: "Spotify", icon: "/app-icons/spotify.jpg", price: 299, nextLabel: "через 3 дня", nextDate: "27 апреля", daysLeft: 3, cat: "Музыка" },
  { id: "yaplus", name: "Yandex Plus", icon: "/app-icons/yaplus.jpg", price: 399, nextLabel: "через 5 дней", nextDate: "29 апреля", daysLeft: 5, cat: "Стриминг" },
  { id: "chatgpt", name: "ChatGPT", icon: "/app-icons/chatgpt.jpg", price: 1980, nextLabel: "через 8 дней", nextDate: "02 мая", daysLeft: 8, cat: "AI" },
  { id: "kinopoisk", name: "Кинопоиск", icon: "/app-icons/kinopoisk.jpg", price: 299, nextLabel: "через 12 дней", nextDate: "06 мая", daysLeft: 12, cat: "Стриминг" },
  { id: "youtube", name: "YouTube", icon: "/app-icons/youtube.jpg", price: 299, nextLabel: "через 18 дней", nextDate: "12 мая", daysLeft: 18, cat: "Стриминг" },
  { id: "notion", name: "Notion", icon: "/app-icons/notion.jpg", price: 690, nextLabel: "через 22 дня", nextDate: "16 мая", daysLeft: 22, cat: "Софт" },
  { id: "duolingo", name: "Duolingo", icon: "/app-icons/duolingo.jpg", price: 599, nextLabel: "через 26 дней", nextDate: "20 мая", daysLeft: 26, cat: "Софт" },
];

const CATALOG = [
  { id: "yaplus", name: "Yandex Plus", icon: "/app-icons/yaplus.jpg", price: "399 ₽", cat: "Стриминг" },
  { id: "kinopoisk", name: "Кинопоиск", icon: "/app-icons/kinopoisk.jpg", price: "299 ₽", cat: "Стриминг" },
  { id: "netflix", name: "Netflix", icon: "/app-icons/netflix.jpg", price: "599 ₽", cat: "Стриминг" },
  { id: "okko", name: "Okko", icon: "/app-icons/ivi.jpg", price: "499 ₽", cat: "Стриминг" },
  { id: "ivi", name: "ivi", icon: "/app-icons/ivi.jpg", price: "399 ₽", cat: "Стриминг" },
  { id: "youtube", name: "YouTube Premium", icon: "/app-icons/youtube.jpg", price: "299 ₽", cat: "Стриминг" },
  { id: "spotify", name: "Spotify", icon: "/app-icons/spotify.jpg", price: "299 ₽", cat: "Музыка" },
  { id: "applemusic", name: "Apple Music", icon: "/app-icons/applemusic.jpg", price: "169 ₽", cat: "Музыка" },
  { id: "chatgpt", name: "ChatGPT", icon: "/app-icons/chatgpt.jpg", price: "20 $/мес", cat: "AI" },
  { id: "icloud", name: "iCloud+", icon: "/app-icons/chatgpt.jpg", price: "89 ₽", cat: "Софт" },
  { id: "litres", name: "Литрес", icon: "/app-icons/litres.jpg", price: "399 ₽", cat: "Книги" },
  { id: "mybook", name: "MyBook", icon: "/app-icons/mybook.jpg", price: "279 ₽", cat: "Книги" },
];

const CATEGORIES_LIST = ["Все", "Стриминг", "Музыка", "AI", "Софт", "Книги"];

const ANALYTICS_CATEGORIES = [
  { name: "Стриминг", amount: 1596, color: "#A85A4A" },
  { name: "Музыка", amount: 598, color: "#6B8E63" },
  { name: "AI", amount: 1980, color: "#22251F" },
  { name: "Книги", amount: 399, color: "#B9925A" },
  { name: "Софт", amount: 89, color: "#506E48" },
];

const BAR_DATA = [
  { month: "Ноя", value: 0.65 },
  { month: "Дек", value: 0.75 },
  { month: "Янв", value: 0.80 },
  { month: "Фев", value: 0.85 },
  { month: "Мар", value: 0.90 },
  { month: "Апр", value: 1.0 },
];

// ---- Shared sub-components ----

function ServiceIcon({ src, size = 40, radius = 11 }: { src: string; size?: number; radius?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        objectFit: "cover",
        flexShrink: 0,
        display: "block",
      }}
    />
  );
}

function TabBar({
  t,
  active,
  onTab,
}: {
  t: any;
  active: number;
  onTab: (i: number) => void;
}) {
  const items = [
    {
      label: "Главная",
      icon: (
        <>
          <path d="M3 11 L12 3 L21 11 V20 a1 1 0 0 1 -1 1 H4 a1 1 0 0 1 -1 -1 Z" />
        </>
      ),
    },
    {
      label: "Расходы",
      icon: (
        <path d="M4 19 V9 M9 19 V5 M14 19 V12 M19 19 V7" strokeLinecap="round" />
      ),
    },
    {
      label: "Настройки",
      icon: (
        <>
          <circle cx="12" cy="12" r="3" />
          <path
            d="M12 3 v3 M12 18 v3 M3 12 h3 M18 12 h3 M5.6 5.6 l2.1 2.1 M16.3 16.3 l2.1 2.1 M5.6 18.4 l2.1 -2.1 M16.3 7.7 l2.1 -2.1"
            strokeLinecap="round"
          />
        </>
      ),
    },
  ];

  return (
    <div
      style={{
        borderTop: `1px solid ${t.border}`,
        background: t.bg,
        display: "flex",
        justifyContent: "space-around",
        padding: "8px 12px 22px",
        flexShrink: 0,
      }}
    >
      {items.map((it, i) => {
        const on = i === active;
        return (
          <div
            key={i}
            onClick={() => onTab(i)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              color: on ? t.text : t.text3,
              cursor: "pointer",
              minWidth: 52,
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={on ? 1.8 : 1.4}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {it.icon}
            </svg>
            <span
              style={{
                ...typeOf(TOKENS.type.cap),
                fontSize: 10.5,
                color: on ? t.text : t.text3,
                fontWeight: on ? 500 : 400,
              }}
            >
              {it.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function SectionCap({
  t,
  children,
  accent,
}: {
  t: any;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 20px" }}>
      <span
        style={{
          ...typeOf(TOKENS.type.mono),
          color: accent ? t.warn : t.text3,
          letterSpacing: 1.6,
          fontSize: 10.5,
        }}
      >
        {children}
      </span>
      <div style={{ flex: 1, height: 1, background: accent ? `${t.warn}40` : t.border }} />
    </div>
  );
}

// ---- HOME SCREEN ----

function HomeScreenView({
  t,
  onOpenAdd,
  onOpenCancel,
}: {
  t: any;
  onOpenAdd: () => void;
  onOpenCancel: () => void;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 20,
          paddingTop: 8,
          paddingBottom: 100,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "4px 20px 0",
          }}
        >
          <span
            style={{
              fontFamily: "Lora, serif",
              fontWeight: 500,
              fontSize: 22,
              color: t.text,
              letterSpacing: -0.3,
            }}
          >
            Апрель
          </span>
          <div style={{ display: "flex", gap: 4 }}>
            {/* Bell */}
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: t.text,
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
            </div>
            {/* Settings gear */}
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: t.text,
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M12 3 v3 M12 18 v3 M3 12 h3 M18 12 h3 M5.6 5.6 l2.1 2.1 M16.3 16.3 l2.1 2.1 M5.6 18.4 l2.1 -2.1 M16.3 7.7 l2.1 -2.1" />
              </svg>
            </div>
          </div>
        </div>

        {/* Hero */}
        <div style={{ padding: "8px 20px 0" }}>
          <div
            style={{
              fontFamily: "Lora, serif",
              fontWeight: 500,
              fontSize: 64,
              lineHeight: 1.05,
              letterSpacing: -1.6,
              color: t.text,
            }}
          >
            2 480{" "}
            <span style={{ color: t.text3, fontStyle: "italic", fontWeight: 400 }}>₽</span>
          </div>
          <div
            style={{
              ...typeOf(TOKENS.type.body),
              fontSize: 13.5,
              color: t.text2,
              marginTop: 6,
            }}
          >
            в этом месяце · 7 подписок
          </div>
        </div>

        {/* Trial section */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <SectionCap t={t} accent>
            ТРИАЛЫ ЗАКАНЧИВАЮТСЯ · 1
          </SectionCap>
          <div style={{ padding: "0 20px 4px" }}>
            <div
              style={{
                borderRadius: 18,
                padding: "14px 14px 14px 18px",
                background: t.warnBg,
                border: `1px solid ${t.warn}33`,
                borderLeft: `3px solid ${t.warn}`,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <ServiceIcon src="/app-icons/netflix.jpg" size={36} radius={10} />
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "Lora, serif",
                      fontWeight: 500,
                      fontSize: 16,
                      color: t.text,
                      letterSpacing: -0.2,
                    }}
                  >
                    Netflix
                  </div>
                  <div style={{ ...typeOf(TOKENS.type.mono), color: t.text3, marginTop: 1 }}>
                    триал · осталось 2 дня
                  </div>
                </div>
              </div>
              <div
                style={{
                  ...typeOf(TOKENS.type.body),
                  fontSize: 12.5,
                  color: t.text2,
                }}
              >
                потом — 999 ₽/мес
              </div>
              <button
                onClick={onOpenCancel}
                style={{
                  height: 36,
                  padding: "0 14px",
                  background: t.text,
                  color: t.bg,
                  border: "none",
                  borderRadius: 999,
                  fontFamily: "IBM Plex Sans, sans-serif",
                  fontWeight: 500,
                  fontSize: 13,
                  cursor: "pointer",
                  alignSelf: "flex-start",
                }}
              >
                Отменить
              </button>
            </div>
          </div>
        </div>

        {/* Upcoming 7 days */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <SectionCap t={t}>БЛИЖАЙШИЕ СПИСАНИЯ · 7 ДНЕЙ</SectionCap>
          <div style={{ padding: "0 20px" }}>
            {SERVICES.filter((s) => s.daysLeft <= 7).map((sub, i, arr) => (
              <div
                key={sub.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 0",
                  borderBottom: i === arr.length - 1 ? "none" : `1px solid ${t.border}`,
                }}
              >
                <ServiceIcon src={sub.icon} size={40} radius={11} />
                <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 2 }}>
                  <span
                    style={{
                      fontFamily: "Lora, serif",
                      fontWeight: 500,
                      fontSize: 16,
                      color: t.text,
                      letterSpacing: -0.2,
                    }}
                  >
                    {sub.name}
                  </span>
                  <span style={{ ...typeOf(TOKENS.type.mono), color: sub.daysLeft <= 3 ? t.warn : t.text3 }}>
                    {sub.nextLabel} · {sub.nextDate}
                  </span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontFamily: "Lora, serif",
                      fontWeight: 500,
                      fontSize: 16,
                      color: t.text,
                      letterSpacing: -0.2,
                    }}
                  >
                    {sub.price.toLocaleString("ru-RU")} ₽
                  </div>
                  <div style={{ ...typeOf(TOKENS.type.mono), color: t.text3 }}>мес</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active subs */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <SectionCap t={t}>АКТИВНЫЕ ПОДПИСКИ · 7</SectionCap>
          <div style={{ padding: "0 20px" }}>
            {SERVICES.map((sub, i) => (
              <div
                key={sub.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 0",
                  borderBottom: i === SERVICES.length - 1 ? "none" : `1px solid ${t.border}`,
                }}
              >
                <ServiceIcon src={sub.icon} size={40} radius={11} />
                <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 2 }}>
                  <span
                    style={{
                      fontFamily: "Lora, serif",
                      fontWeight: 500,
                      fontSize: 16,
                      color: t.text,
                      letterSpacing: -0.2,
                    }}
                  >
                    {sub.name}
                  </span>
                  <span style={{ ...typeOf(TOKENS.type.mono), color: t.text3 }}>
                    {sub.nextLabel} · {sub.nextDate}
                  </span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontFamily: "Lora, serif",
                      fontWeight: 500,
                      fontSize: 16,
                      color: t.text,
                      letterSpacing: -0.2,
                    }}
                  >
                    {sub.price.toLocaleString("ru-RU")} ₽
                  </div>
                  <div style={{ ...typeOf(TOKENS.type.mono), color: t.text3 }}>мес</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAB */}
      <div
        onClick={onOpenAdd}
        style={{
          position: "absolute",
          right: 20,
          bottom: 36,
          width: 56,
          height: 56,
          borderRadius: 28,
          background: t.accent,
          color: t.onAccent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 12px 24px -8px ${t.accent}90, 0 2px 0 ${t.accentDark}`,
          cursor: "pointer",
          zIndex: 10,
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </div>
    </div>
  );
}

// ---- ANALYTICS SCREEN ----

function AnalyticsScreenView({ t }: { t: any }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 22,
          paddingTop: 8,
          paddingBottom: 100,
        }}
      >
        {/* Header */}
        <div style={{ padding: "6px 20px 0" }}>
          <h1
            style={{
              fontFamily: "Lora, serif",
              fontWeight: 500,
              fontSize: 32,
              lineHeight: 1.1,
              letterSpacing: -0.6,
              color: t.text,
              margin: 0,
            }}
          >
            Расходы
          </h1>
        </div>

        {/* Segmented */}
        <div style={{ padding: "0 20px" }}>
          <div
            style={{
              display: "inline-flex",
              padding: 3,
              background: t.bg2,
              borderRadius: 12,
              border: `1px solid ${t.border}`,
            }}
          >
            {["Месяц", "Год", "Всё время"].map((l, i) => {
              const on = i === 0;
              return (
                <span
                  key={l}
                  style={{
                    ...typeOf(TOKENS.type.cap),
                    fontSize: 13,
                    fontWeight: on ? 500 : 400,
                    color: on ? t.text : t.text2,
                    background: on ? t.elev : "transparent",
                    border: on ? `1px solid ${t.border}` : "1px solid transparent",
                    padding: "7px 14px",
                    borderRadius: 9,
                    cursor: "pointer",
                    whiteSpace: "nowrap" as const,
                  }}
                >
                  {l}
                </span>
              );
            })}
          </div>
        </div>

        {/* Hero numbers */}
        <div style={{ padding: "0 20px" }}>
          <div
            style={{
              fontFamily: "Lora, serif",
              fontWeight: 500,
              fontSize: 56,
              lineHeight: 1.05,
              letterSpacing: -1.4,
              color: t.text,
            }}
          >
            2 480 <span style={{ color: t.text3, fontStyle: "italic", fontWeight: 400 }}>₽</span>
          </div>
          <div
            style={{
              fontFamily: "Lora, serif",
              fontWeight: 500,
              fontSize: 20,
              color: t.text2,
              marginTop: 4,
              letterSpacing: -0.3,
            }}
          >
            29 760 ₽ <span style={{ ...typeOf(TOKENS.type.mono), color: t.text3 }}>в год</span>
          </div>
        </div>

        {/* Bar chart */}
        <div style={{ padding: "0 20px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 100 }}>
            {BAR_DATA.map((bar, i) => {
              const isLast = i === BAR_DATA.length - 1;
              return (
                <div
                  key={bar.month}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: bar.value * 80,
                      borderRadius: 4,
                      background: isLast ? t.accent : t.accentDark,
                      opacity: isLast ? 1 : 0.7,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 9,
                      color: t.text3,
                      letterSpacing: 0.5,
                    }}
                  >
                    {bar.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Categories */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <SectionCap t={t}>ПО КАТЕГОРИЯМ</SectionCap>
          <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 10 }}>
            {ANALYTICS_CATEGORIES.map((cat) => (
              <div
                key={cat.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 3,
                    background: cat.color,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    ...typeOf(TOKENS.type.body),
                    fontSize: 14,
                    color: t.text,
                    flex: 1,
                  }}
                >
                  {cat.name}
                </span>
                <span
                  style={{
                    ...typeOf(TOKENS.type.mono),
                    color: t.text2,
                  }}
                >
                  {cat.amount.toLocaleString("ru-RU")} ₽
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- SETTINGS SCREEN ----

function SettingsScreenView({ t }: { t: any }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 20,
          paddingTop: 8,
          paddingBottom: 100,
        }}
      >
        {/* Header */}
        <div style={{ padding: "6px 20px 0" }}>
          <h1
            style={{
              fontFamily: "Lora, serif",
              fontWeight: 500,
              fontSize: 32,
              lineHeight: 1.1,
              letterSpacing: -0.6,
              color: t.text,
              margin: 0,
            }}
          >
            Настройки
          </h1>
        </div>

        {/* Pro upsell */}
        <div style={{ padding: "0 20px" }}>
          <div
            style={{
              background: t.accentBg,
              borderRadius: 18,
              padding: "18px 18px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div
              style={{
                fontFamily: "Lora, serif",
                fontWeight: 500,
                fontSize: 20,
                color: t.text,
                letterSpacing: -0.3,
              }}
            >
              Получить Pro
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {["Безлимитные подписки", "Экспорт данных", "Виджеты на экран блокировки"].map((f) => (
                <div
                  key={f}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={t.accent}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M4 12.5 10 18 20 6" />
                  </svg>
                  <span style={{ ...typeOf(TOKENS.type.body), fontSize: 13.5, color: t.text2 }}>{f}</span>
                </div>
              ))}
            </div>
            <button
              style={{
                height: 42,
                background: t.accent,
                color: t.onAccent,
                border: "none",
                borderRadius: 12,
                fontFamily: "IBM Plex Sans, sans-serif",
                fontWeight: 500,
                fontSize: 14,
                cursor: "pointer",
                marginTop: 4,
              }}
            >
              Попробовать бесплатно
            </button>
          </div>
        </div>

        {/* Settings groups */}
        <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Основные */}
          <div>
            <div
              style={{
                ...typeOf(TOKENS.type.mono),
                color: t.text3,
                letterSpacing: 1.4,
                fontSize: 10.5,
                marginBottom: 8,
              }}
            >
              ОСНОВНЫЕ
            </div>
            <div
              style={{
                background: t.elev,
                borderRadius: 14,
                border: `1px solid ${t.border}`,
                overflow: "hidden",
              }}
            >
              {[
                { label: "Валюта", value: "₽ (RUB)" },
                { label: "Регион", value: "Россия" },
                { label: "Тема", value: "Авто" },
              ].map((item, i, arr) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "13px 16px",
                    borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : "none",
                  }}
                >
                  <span style={{ ...typeOf(TOKENS.type.body), color: t.text }}>{item.label}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ ...typeOf(TOKENS.type.body), color: t.text3 }}>{item.value}</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={t.text3}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    >
                      <path d="m9 6 6 6-6 6" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Уведомления */}
          <div>
            <div
              style={{
                ...typeOf(TOKENS.type.mono),
                color: t.text3,
                letterSpacing: 1.4,
                fontSize: 10.5,
                marginBottom: 8,
              }}
            >
              УВЕДОМЛЕНИЯ
            </div>
            <div
              style={{
                background: t.elev,
                borderRadius: 14,
                border: `1px solid ${t.border}`,
                overflow: "hidden",
              }}
            >
              {[
                { label: "За 2 дня", on: true },
                { label: "За 1 день", on: true },
              ].map((item, i, arr) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "13px 16px",
                    borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : "none",
                  }}
                >
                  <span style={{ ...typeOf(TOKENS.type.body), color: t.text }}>{item.label}</span>
                  {/* Toggle */}
                  <div
                    style={{
                      width: 44,
                      height: 26,
                      borderRadius: 13,
                      background: item.on ? t.accent : t.bg2,
                      padding: 2,
                      cursor: "pointer",
                      transition: "background .15s",
                    }}
                  >
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 11,
                        background: "#fff",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                        transform: item.on ? "translateX(18px)" : "translateX(0)",
                        transition: "transform .15s",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Данные */}
          <div>
            <div
              style={{
                ...typeOf(TOKENS.type.mono),
                color: t.text3,
                letterSpacing: 1.4,
                fontSize: 10.5,
                marginBottom: 8,
              }}
            >
              ДАННЫЕ
            </div>
            <div
              style={{
                background: t.elev,
                borderRadius: 14,
                border: `1px solid ${t.border}`,
                overflow: "hidden",
              }}
            >
              {["Экспорт", "Бэкап"].map((label, i, arr) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "13px 16px",
                    borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : "none",
                  }}
                >
                  <span style={{ ...typeOf(TOKENS.type.body), color: t.text }}>{label}</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={t.text3}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  >
                    <path d="m9 6 6 6-6 6" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Version */}
        <div
          style={{
            textAlign: "center",
            ...typeOf(TOKENS.type.cap),
            color: t.text3,
            paddingBottom: 20,
          }}
        >
          ОтменYа v1.0
        </div>
      </div>
    </div>
  );
}

// ---- ADD SCREEN (MODAL) ----

function AddScreenView({
  t,
  onClose,
}: {
  t: any;
  onClose: () => void;
}) {
  const [activeCat, setActiveCat] = useState(0);

  const filtered =
    activeCat === 0
      ? CATALOG
      : CATALOG.filter((s) => s.cat === CATEGORIES_LIST[activeCat]);

  const rows: (typeof CATALOG)[] = [];
  for (let i = 0; i < filtered.length; i += 2) rows.push(filtered.slice(i, i + 2));

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Handle */}
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0 4px" }}>
        <div
          style={{
            width: 36,
            height: 5,
            borderRadius: 3,
            background: t.borderStrong,
            opacity: 0.6,
          }}
        />
      </div>

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "4px 16px 14px",
          position: "relative",
        }}
      >
        <span
          onClick={onClose}
          style={{
            ...typeOf(TOKENS.type.bodyM),
            color: t.text2,
            fontSize: 14,
            cursor: "pointer",
            minWidth: 70,
          }}
        >
          Закрыть
        </span>
        <h1
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            textAlign: "center",
            fontFamily: "Lora, serif",
            fontWeight: 500,
            fontSize: 18,
            color: t.text,
            letterSpacing: -0.2,
            margin: 0,
            pointerEvents: "none",
          }}
        >
          Что добавляем?
        </h1>
        <span style={{ minWidth: 70 }} />
      </div>

      {/* Search bar */}
      <div style={{ padding: "0 16px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 14px",
            background: t.elev,
            border: `1.5px solid ${t.accent}`,
            borderRadius: 12,
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke={t.accent}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <span style={{ ...typeOf(TOKENS.type.body), color: t.text3, flex: 1, fontSize: 14 }}>
            Поиск по сервисам
          </span>
          <span style={{ width: 1.5, height: 16, background: t.accent }} />
        </div>
      </div>

      {/* Category chips */}
      <div
        style={{
          display: "flex",
          gap: 8,
          overflowX: "auto",
          padding: "14px 16px 4px",
          scrollbarWidth: "none" as any,
        }}
      >
        {CATEGORIES_LIST.map((c, i) => {
          const on = i === activeCat;
          return (
            <span
              key={c}
              onClick={() => setActiveCat(i)}
              style={{
                flexShrink: 0,
                padding: "7px 13px",
                borderRadius: 999,
                background: on ? t.accent : t.elev,
                border: `1px solid ${on ? t.accent : t.border}`,
                color: on ? t.onAccent : t.text2,
                ...typeOf(TOKENS.type.bodyM),
                fontSize: 13.5,
                fontWeight: on ? 500 : 400,
                cursor: "pointer",
              }}
            >
              {c}
            </span>
          );
        })}
      </div>

      {/* Grid */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "14px 0 24px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <div
          style={{
            padding: "0 16px",
            ...typeOf(TOKENS.type.mono),
            color: t.text3,
            letterSpacing: 1.4,
            fontSize: 10.5,
          }}
        >
          ПОПУЛЯРНЫЕ В РОССИИ · {filtered.length}
        </div>
        <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          {rows.map((row, i) => (
            <div key={i} style={{ display: "flex", gap: 10 }}>
              {row.map((s) => (
                <div
                  key={s.id}
                  style={{
                    flex: 1,
                    minWidth: 0,
                    padding: "16px 8px 14px",
                    background: t.elev,
                    border: `1px solid ${t.border}`,
                    borderRadius: 16,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                    cursor: "pointer",
                  }}
                >
                  <ServiceIcon src={s.icon} size={48} radius={12} />
                  <div style={{ textAlign: "center", width: "100%" }}>
                    <div
                      style={{
                        ...typeOf(TOKENS.type.bodyM),
                        fontSize: 13,
                        color: t.text,
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {s.name}
                    </div>
                    <div style={{ ...typeOf(TOKENS.type.mono), color: t.text3, marginTop: 1 }}>
                      {s.price}
                    </div>
                  </div>
                </div>
              ))}
              {row.length === 1 && <div style={{ flex: 1 }} />}
            </div>
          ))}
        </div>

        {/* Manual add */}
        <div
          style={{
            margin: "6px 16px 0",
            padding: "14px 14px",
            background: "transparent",
            border: `1.5px dashed ${t.borderStrong}`,
            borderRadius: 14,
            display: "flex",
            alignItems: "center",
            gap: 12,
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: t.bg2,
              color: t.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 4 l4 4 l-12 12 l-5 1 l1 -5 z" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: "Lora, serif",
                fontWeight: 500,
                fontSize: 15,
                color: t.text,
                letterSpacing: -0.1,
              }}
            >
              Добавить вручную
            </div>
          </div>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke={t.text3}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 6 6 6-6 6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ---- CANCEL GUIDE SCREEN ----

function CancelGuideView({ t, onBack }: { t: any; onBack: () => void }) {
  const steps = [
    { num: "1", text: "Откройте приложение Netflix" },
    { num: "2", text: "Перейдите в «Аккаунт» → «Подписка»" },
    { num: "3", text: "Нажмите «Отменить подписку»" },
    { num: "4", text: "Подтвердите отмену" },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: "IBM Plex Sans, sans-serif",
      }}
    >
      {/* Nav bar */}
      <div
        style={{
          padding: "4px 20px 12px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          borderBottom: `1px solid ${t.border}`,
        }}
      >
        <svg
          onClick={onBack}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={t.accent}
          strokeWidth="2"
          strokeLinecap="round"
          style={{ cursor: "pointer", flexShrink: 0 }}
        >
          <path d="m15 6-6 6 6 6" />
        </svg>
        <span
          style={{
            ...typeOf(TOKENS.type.h3),
            color: t.text,
            flex: 1,
            textAlign: "center",
            paddingRight: 28,
          }}
        >
          Как отменить
        </span>
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px 20px 100px",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {/* Service header */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <ServiceIcon src="/app-icons/netflix.jpg" size={52} radius={14} />
          <div>
            <div
              style={{
                ...typeOf(TOKENS.type.h2),
                color: t.text,
                fontSize: 20,
              }}
            >
              Netflix
            </div>
            <div
              style={{
                ...typeOf(TOKENS.type.cap),
                color: t.warn,
                fontFamily: "JetBrains Mono, mono",
                fontSize: 11,
                letterSpacing: 0.8,
                marginTop: 2,
              }}
            >
              ТРИАЛ · ОСТАЛОСЬ 2 ДНЯ
            </div>
          </div>
        </div>

        {/* Deep link button */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 8,
            gap: 8,
            height: 48,
            borderRadius: 14,
            background: t.accent,
            color: t.onAccent,
            ...typeOf(TOKENS.type.btn),
            cursor: "pointer",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          Открыть экран отмены
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ flex: 1, height: 1, background: t.border }} />
          <span
            style={{
              ...typeOf(TOKENS.type.mono),
              color: t.text3,
              fontSize: 10,
              letterSpacing: 1.4,
            }}
          >
            ИЛИ ВРУЧНУЮ
          </span>
          <div style={{ flex: 1, height: 1, background: t.border }} />
        </div>

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <div
            style={{
              ...typeOf(TOKENS.type.mono),
              color: t.text3,
              fontSize: 10,
              letterSpacing: 1.4,
              marginBottom: 12,
            }}
          >
            ПОШАГОВАЯ ИНСТРУКЦИЯ
          </div>
          {steps.map((step, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 14,
                alignItems: "flex-start",
                paddingBottom: 16,
                marginBottom: i < steps.length - 1 ? 16 : 0,
                borderBottom: i < steps.length - 1 ? `1px solid ${t.border}` : "none",
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  background: i === 0 ? t.accent : t.accentSoft,
                  color: i === 0 ? t.onAccent : t.accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  ...typeOf(TOKENS.type.bodyM),
                  fontSize: 13,
                }}
              >
                {step.num}
              </div>
              <div
                style={{
                  ...typeOf(TOKENS.type.body),
                  color: t.text,
                  paddingTop: 3,
                }}
              >
                {step.text}
              </div>
            </div>
          ))}
        </div>

        {/* Info card */}
        <div
          style={{
            background: t.accentBg,
            borderRadius: 14,
            padding: "14px 16px",
            display: "flex",
            gap: 10,
            alignItems: "flex-start",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke={t.accent}
            strokeWidth="2"
            strokeLinecap="round"
            style={{ marginTop: 2, flexShrink: 0 }}
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
          <div
            style={{
              ...typeOf(TOKENS.type.cap),
              color: t.text2,
              fontSize: 12,
              lineHeight: "18px",
            }}
          >
            После отмены вы сможете пользоваться сервисом до конца оплаченного периода. Деньги не
            спишутся автоматически.
          </div>
        </div>

        {/* Savings badge */}
        <div
          style={{
            background: t.succBg,
            borderRadius: 14,
            padding: "16px 18px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              ...typeOf(TOKENS.type.mono),
              color: t.succ,
              fontSize: 10,
              letterSpacing: 1.4,
              marginBottom: 6,
            }}
          >
            ВЫ СЭКОНОМИТЕ
          </div>
          <div
            style={{
              fontFamily: "Lora, serif",
              fontWeight: 500,
              fontSize: 28,
              color: t.succ,
              letterSpacing: -0.5,
            }}
          >
            999 <span style={{ fontSize: 18, fontStyle: "italic" }}>₽/мес</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- MAIN COMPONENT ----

export function InteractiveApp({
  theme = "light",
  initialScreen = "home",
}: InteractiveAppProps) {
  const t = TOKENS[theme];

  // Map initialScreen to tab index
  const initialTab = initialScreen === "analytics" ? 1 : initialScreen === "settings" ? 2 : 0;
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showAdd, setShowAdd] = useState(initialScreen === "add");
  const [showCancelGuide, setShowCancelGuide] = useState(initialScreen === "cancel-guide");

  const handleTab = useCallback((i: number) => {
    setActiveTab(i);
    setShowAdd(false);
    setShowCancelGuide(false);
  }, []);

  const handleOpenAdd = useCallback(() => setShowAdd(true), []);
  const handleCloseAdd = useCallback(() => setShowAdd(false), []);
  const handleOpenCancel = useCallback(() => setShowCancelGuide(true), []);
  const handleCloseCancel = useCallback(() => {
    setShowCancelGuide(false);
    setActiveTab(0);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: t.bg,
        color: t.text,
        fontFamily: "IBM Plex Sans, sans-serif",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Status bar area */}
      <div style={{ height: 54, flexShrink: 0 }} />

      {/* Main content area */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        {/* Tab content — Home */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: activeTab === 0 && !showCancelGuide && !showAdd ? 1 : 0,
            transform: activeTab === 0 && !showCancelGuide && !showAdd ? "translateX(0)" : "translateX(-20px)",
            transition: "opacity .25s ease, transform .25s ease",
            pointerEvents: activeTab === 0 && !showCancelGuide && !showAdd ? "auto" : "none",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <HomeScreenView t={t} onOpenAdd={handleOpenAdd} onOpenCancel={handleOpenCancel} />
        </div>

        {/* Tab content — Analytics */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: activeTab === 1 && !showCancelGuide && !showAdd ? 1 : 0,
            transform: activeTab === 1 && !showCancelGuide && !showAdd ? "translateX(0)" : "translateX(20px)",
            transition: "opacity .25s ease, transform .25s ease",
            pointerEvents: activeTab === 1 && !showCancelGuide && !showAdd ? "auto" : "none",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <AnalyticsScreenView t={t} />
        </div>

        {/* Tab content — Settings */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: activeTab === 2 && !showCancelGuide && !showAdd ? 1 : 0,
            transform: activeTab === 2 && !showCancelGuide && !showAdd ? "translateX(0)" : "translateX(20px)",
            transition: "opacity .25s ease, transform .25s ease",
            pointerEvents: activeTab === 2 && !showCancelGuide && !showAdd ? "auto" : "none",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <SettingsScreenView t={t} />
        </div>

        {/* Cancel guide — pushed screen */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: t.bg,
            opacity: showCancelGuide ? 1 : 0,
            transform: showCancelGuide ? "translateX(0)" : "translateX(100%)",
            transition: "opacity .3s ease, transform .3s ease",
            pointerEvents: showCancelGuide ? "auto" : "none",
            zIndex: 20,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CancelGuideView t={t} onBack={handleCloseCancel} />
        </div>

        {/* Add modal — slides up */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: t.bg,
            opacity: showAdd ? 1 : 0,
            transform: showAdd ? "translateY(0)" : "translateY(100%)",
            transition: "opacity .3s ease, transform .3s ease",
            pointerEvents: showAdd ? "auto" : "none",
            zIndex: 25,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <AddScreenView t={t} onClose={handleCloseAdd} />
        </div>
      </div>

      {/* Tab bar — always visible unless modal/pushed is open */}
      <div
        style={{
          opacity: showAdd || showCancelGuide ? 0 : 1,
          transform: showAdd || showCancelGuide ? "translateY(20px)" : "translateY(0)",
          transition: "opacity .2s ease, transform .2s ease",
        }}
      >
        <TabBar t={t} active={activeTab} onTab={handleTab} />
      </div>
    </div>
  );
}
