"use client";

import React from "react";
import { TOKENS, typeOf } from "@/lib/design-tokens";

interface CancelGuideScreenProps {
  theme?: "light" | "dark";
}

export function CancelGuideScreen({ theme = "light" }: CancelGuideScreenProps) {
  const t = TOKENS[theme];

  const steps = [
    { num: "1", text: "Откройте приложение Netflix" },
    { num: "2", text: 'Перейдите в «Аккаунт» → «Подписка»' },
    { num: "3", text: 'Нажмите «Отменить подписку»' },
    { num: "4", text: "Подтвердите отмену" },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: t.bg,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        fontFamily: "IBM Plex Sans, sans-serif",
      }}
    >
      {/* Nav bar */}
      <div
        style={{
          padding: "54px 20px 12px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          borderBottom: `1px solid ${t.border}`,
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={t.accent}
          strokeWidth="2"
          strokeLinecap="round"
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
          overflow: "auto",
          padding: "20px 20px 100px",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {/* Service header */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* Netflix icon — real App Store logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/badges/netflix.jpg"
            alt="Netflix"
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              flexShrink: 0,
              objectFit: "cover",
            }}
          />
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
        <a
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
            textDecoration: "none",
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
        </a>

        {/* Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
        >
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
                borderBottom:
                  i < steps.length - 1
                    ? `1px solid ${t.border}`
                    : "none",
              }}
            >
              {/* Step number */}
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
            После отмены вы сможете пользоваться сервисом до конца оплаченного
            периода. Деньги не спишутся автоматически.
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
            999{" "}
            <span style={{ fontSize: 18, fontStyle: "italic" }}>₽/мес</span>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div
        style={{
          borderTop: `1px solid ${t.border}`,
          background: t.bg,
          padding: "8px 0 24px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {["Главная", "Расходы", "Настройки"].map((label, i) => (
          <div
            key={label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke={i === 0 ? t.accent : t.text3}
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              {i === 0 && (
                <>
                  <path d="M3 11.5 12 4l9 7.5" />
                  <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
                </>
              )}
              {i === 1 && (
                <path d="M4 19V9M9 19V5M14 19V12M19 19V7" />
              )}
              {i === 2 && (
                <>
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
                </>
              )}
            </svg>
            <span
              style={{
                fontSize: 10,
                color: i === 0 ? t.accent : t.text3,
                fontWeight: i === 0 ? 600 : 400,
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
