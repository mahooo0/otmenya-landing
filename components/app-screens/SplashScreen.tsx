"use client";

import React from "react";
import { TOKENS, typeOf } from "@/lib/design-tokens";

interface SplashScreenProps {
  theme?: 'light' | 'dark';
}

function Wordmark({ t, size = 60 }: { t: any; size?: number }) {
  return (
    <h1 style={{
      fontFamily: 'Lora, serif',
      fontWeight: 500,
      fontSize: size,
      lineHeight: 1,
      letterSpacing: -1.4,
      color: t.text,
      margin: 0,
      whiteSpace: 'nowrap',
    }}>
      Отмен<span style={{ fontStyle: 'italic', color: t.accent, fontWeight: 500 }}>Y</span>а
    </h1>
  );
}

function Tagline({ t }: { t: any }) {
  return (
    <p style={{
      ...typeOf(TOKENS.type.body),
      fontSize: 16,
      color: t.text2,
      margin: '14px 0 0',
      letterSpacing: 0.1,
      textAlign: 'center',
    }}>
      Подписки под контролем
    </p>
  );
}

function Colophon({ t }: { t: any }) {
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 50,
      textAlign: 'center',
      ...typeOf(TOKENS.type.mono),
      color: t.text3,
      letterSpacing: 1.4,
      textTransform: 'uppercase',
      fontSize: 10,
    }}>
      ru · ua · kz · by
    </div>
  );
}

export function SplashScreen({ theme = 'light' }: SplashScreenProps) {
  const t = TOKENS[theme];

  return (
    <div style={{
      width: '100%', height: '100%',
      background: t.bg,
      color: t.text,
      position: 'relative',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'relative',
        marginTop: -40,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        {/* App logo */}
        <div style={{ marginBottom: 24 }}>
          <svg width={72} height={72} viewBox="0 0 120 120" fill="none">
            <defs>
              <clipPath id="splashLogoClip">
                <rect width="120" height="120" rx="28" />
              </clipPath>
            </defs>
            <g clipPath="url(#splashLogoClip)">
              <rect width="120" height="120" fill={theme === 'dark' ? '#2a2a2a' : '#111'} />
              <rect y="58" width="120" height="62" fill={t.accent} />
              <text x="60" y="48" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="20" fill="#fff" letterSpacing="0.5">отмен</text>
              <text x="60" y="92" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="36" fill="#fff" letterSpacing="-1">Yа</text>
            </g>
          </svg>
        </div>
        <Wordmark t={t} size={60} />
        <Tagline t={t} />
      </div>
      <Colophon t={t} />
    </div>
  );
}
