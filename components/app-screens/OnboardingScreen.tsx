"use client";

import React from "react";
import { TOKENS, typeOf } from "@/lib/design-tokens";
import { Button } from "./shared";

interface OnboardingScreenProps {
  theme?: 'light' | 'dark';
}

function HeroIllo({ accent, bg, w = 320, h = 320 }: { accent: string; bg: string; w?: number; h?: number }) {
  return (
    <svg width={w} height={h} viewBox="0 0 320 320" fill="none"
      stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ display: 'block' }}>
      {/* horizon dots */}
      {[60, 100, 140, 180, 220, 260].map((x) => (
        <circle key={x} cx={x} cy="290" r="0.9" fill={accent} stroke="none" opacity="0.4" />
      ))}

      {/* phone */}
      <rect x="118" y="170" width="84" height="130" rx="12" />
      <path d="M148 178 h24" opacity="0.5" />
      <circle cx="160" cy="290" r="1.2" fill={accent} stroke="none" opacity="0.6" />

      {/* calendar dot */}
      <circle cx="190" cy="186" r="2.4" fill={accent} stroke="none" opacity="0.7" />

      {/* back card */}
      <rect x="78"  y="74" width="164" height="42" rx="8" opacity="0.45" />
      <circle cx="98" cy="95" r="9" opacity="0.45" />
      <path d="M118 88 h70" opacity="0.4" />
      <path d="M118 100 h44" opacity="0.35" />
      <path d="M214 95 h18" opacity="0.45" />

      {/* middle card */}
      <rect x="68" y="108" width="184" height="46" rx="9" opacity="0.7" />
      <circle cx="91" cy="131" r="10" opacity="0.7" />
      <path d="M114 124 h82" opacity="0.6" />
      <path d="M114 138 h54" opacity="0.5" />
      <path d="M222 131 h22" opacity="0.7" />

      {/* front card */}
      <rect x="58" y="142" width="204" height="50" rx="10" />
      <circle cx="84" cy="167" r="11" />
      <text x="84" y="171" textAnchor="middle"
        fontFamily="JetBrains Mono, monospace" fontSize="11" fill={accent} stroke="none">Я</text>
      <path d="M108 160 h94" />
      <path d="M108 174 h60" opacity="0.55" />
      <path d="M226 167 h22" />

      {/* motion ticks */}
      <path d="M120 60 v6 M160 56 v6 M200 60 v6" opacity="0.5" />
      {/* checkmark */}
      <path d="M252 50 l8 8 14 -16" opacity="0.65" />
    </svg>
  );
}

function ProgressTop({ t, step = 0, total = 4 }: { t: any; step?: number; total?: number }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '10px 20px 0',
    }}>
      <div style={{ display: 'flex', gap: 6 }}>
        {Array.from({ length: total }).map((_, i) => (
          <span key={i} style={{
            width: i === step ? 18 : 6, height: 6, borderRadius: 3,
            background: i === step ? t.accent : t.borderStrong,
            transition: 'all .25s',
          }} />
        ))}
      </div>
      <span style={{ ...typeOf(TOKENS.type.cap), color: t.text3, cursor: 'pointer' }}>Пропустить</span>
    </div>
  );
}

function BottomAction({ t }: { t: any }) {
  return (
    <div style={{ padding: '0 24px 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Button t={t} kind="primary" full>Дальше</Button>
    </div>
  );
}

function HeadBlock({ t, align = 'left', sizes = { h: 30, s: 16 } }: { t: any; align?: string; sizes?: { h: number; s: number } }) {
  return (
    <div style={{ textAlign: align as any, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <h1 style={{
        fontFamily: 'Lora, "SF Pro Display", -apple-system, serif',
        fontWeight: 500, fontSize: sizes.h, lineHeight: 1.1, letterSpacing: -0.6,
        color: t.text, margin: 0,
      }}>
        Все подписки<br/>в одном месте
      </h1>
      <p style={{
        ...typeOf(TOKENS.type.body),
        fontSize: sizes.s, color: t.text2, margin: 0, lineHeight: 1.5, maxWidth: 320,
        marginLeft: align === 'center' ? 'auto' : 0,
        marginRight: align === 'center' ? 'auto' : 0,
      }}>
        Не теряй деньги на забытые подписки и триалы.
      </p>
    </div>
  );
}

export function OnboardingScreen({ theme = 'light' }: OnboardingScreenProps) {
  const t = TOKENS[theme];

  return (
    <div style={{ width: '100%', height: '100%', background: t.bg, display: 'flex', flexDirection: 'column' }}>
      <ProgressTop t={t} step={0} />
      <div style={{ flex: 1, padding: '16px 24px 20px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <HeroIllo accent={t.accent} bg={t.bg} w={320} h={320} />
        </div>
        <div style={{ paddingBottom: 24 }}>
          <HeadBlock t={t} align="left" sizes={{ h: 30, s: 16 }} />
        </div>
      </div>
      <BottomAction t={t} />
    </div>
  );
}
