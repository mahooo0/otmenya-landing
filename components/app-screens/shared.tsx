"use client";

import React from "react";
import { TOKENS, typeOf, type ThemeTokens } from "@/lib/design-tokens";

export { TOKENS, typeOf };
export type { ThemeTokens };

// ---- Icons (Lucide-ish, 1.5pt strokes) ----
function makeIcon(d: React.ReactNode, opts: { vb?: string; f?: boolean } = {}) {
  const { vb = '0 0 24 24', f = false } = opts;
  return ({ s = 18, c = 'currentColor', sw = 1.5 }: { s?: number; c?: string; sw?: number }) => (
    <svg width={s} height={s} viewBox={vb} fill={f ? c : 'none'} stroke={f ? 'none' : c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      {d}
    </svg>
  );
}

export const Icon = {
  search:   makeIcon(<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>),
  chev:     makeIcon(<path d="m9 6 6 6-6 6" />),
  chevDown: makeIcon(<path d="m6 9 6 6 6-6" />),
  chevLeft: makeIcon(<path d="m15 6-6 6 6 6" />),
  plus:     makeIcon(<path d="M12 5v14M5 12h14" />),
  minus:    makeIcon(<path d="M5 12h14" />),
  close:    makeIcon(<path d="M6 6 18 18M18 6 6 18" />),
  bell:     makeIcon(<><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></>),
  home:     makeIcon(<><path d="M3 11.5 12 4l9 7.5" /><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" /></>),
  cards:    makeIcon(<><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18" /></>),
  user:     makeIcon(<><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" /></>),
  cal:      makeIcon(<><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>),
  arrow:    makeIcon(<path d="M5 12h14M13 5l7 7-7 7" />),
  check:    makeIcon(<path d="M4 12.5 10 18 20 6" />),
  trash:    makeIcon(<><path d="M4 7h16" /><path d="M9 7V4h6v3" /><path d="M6 7v13a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7" /><path d="M10 11v6M14 11v6" /></>),
  edit:     makeIcon(<><path d="M14 4l6 6L8 22H2v-6L14 4z" /></>),
  more:     makeIcon(<><circle cx="5" cy="12" r="1.4" /><circle cx="12" cy="12" r="1.4" /><circle cx="19" cy="12" r="1.4" /></>),
  filter:   makeIcon(<path d="M3 5h18l-7 9v6l-4-2v-4z" />),
  sort:     makeIcon(<><path d="M7 4v16M4 16l3 4 3-4" /><path d="M17 20V4M14 8l3-4 3 4" /></>),
  cancel:   makeIcon(<><circle cx="12" cy="12" r="9" /><path d="m15 9-6 6M9 9l6 6" /></>),
  pause:    makeIcon(<><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></>, { f: true }),
  refresh:  makeIcon(<><path d="M3 12a9 9 0 0 1 15.5-6.3L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-15.5 6.3L3 16" /><path d="M3 21v-5h5" /></>),
  settings: makeIcon(<><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 0 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 0 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 0 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" /></>),
  card:     makeIcon(<><rect x="2" y="6" width="20" height="14" rx="2" /><path d="M2 11h20" /></>),
  wallet:   makeIcon(<><path d="M3 7v12a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H5a2 2 0 0 1-2-2 2 2 0 0 1 2-2h13" /><circle cx="17" cy="14" r="1.3" /></>),
  pin:      makeIcon(<><path d="M12 21v-7" /><path d="M8 14h8l-1-9H9z" /></>),
  info:     makeIcon(<><circle cx="12" cy="12" r="9" /><path d="M12 11v5" /><circle cx="12" cy="8" r="0.8" fill="currentColor"/></>),
  alert:    makeIcon(<><path d="M12 3 2 21h20z" /><path d="M12 10v5" /><circle cx="12" cy="18" r="0.8" fill="currentColor"/></>),
};

// ---- LogoBox ----
export function LogoBox({ char, size = 40, t, tone = 'neutral' }: { char: string; size?: number; t: ThemeTokens; tone?: string }) {
  const palettes: any = {
    neutral: { bg: t.logoBg, fg: t.logoFg },
    accent:  { bg: t.accent, fg: t.onAccent },
    dark:    { bg: t.text,   fg: t.bg },
    warn:    { bg: t.warnBg, fg: t.text },
    crit:    { bg: t.critBg, fg: t.text },
  };
  const p = palettes[tone] || palettes.neutral;
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.28,
      background: p.bg, color: p.fg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'JetBrains Mono, monospace', fontWeight: 500, fontSize: size * 0.42,
      flexShrink: 0,
      boxShadow: `inset 0 0 0 1px ${t.border}`,
    }}>{char}</div>
  );
}

// ---- Button ----
export function Button({ children, kind = 'primary', size = 'md', t, full, icon, onClick, disabled, style }: any) {
  const T = TOKENS.type.btn;
  const heights: any = { sm: 36, md: 48, lg: 52 };
  const h = heights[size];
  const base: any = {
    height: h,
    borderRadius: 12,
    border: 'none',
    padding: '0 18px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    cursor: disabled ? 'not-allowed' : 'pointer',
    width: full ? '100%' : 'auto',
    transition: 'background .15s, transform .08s',
    ...typeOf(T),
  };
  const variants: any = {
    primary: { background: disabled ? t.disabled : t.accent, color: disabled ? t.text3 : t.onAccent },
    secondary: { background: 'transparent', color: disabled ? t.text3 : t.text, border: `1px solid ${disabled ? t.border : t.text}` },
    ghost: { background: 'transparent', color: disabled ? t.text3 : t.text },
    soft: { background: t.accentSoft, color: disabled ? t.text3 : t.accentDark },
    crit: { background: disabled ? t.disabled : t.crit, color: disabled ? t.text3 : '#fff' },
    critGhost: { background: 'transparent', color: disabled ? t.text3 : t.crit, border: `1px solid ${disabled ? t.border : t.crit}40` },
  };
  return (
    <button onClick={disabled ? undefined : onClick} disabled={disabled}
      style={{ ...base, ...variants[kind], ...style }}>
      {icon}
      {children}
    </button>
  );
}

// ---- TabBar ----
export function TabBar({ t, active = 0, tabs }: any) {
  const items = tabs || [
    { i: Icon.home,  l: 'Сервисы' },
    { i: Icon.cal,   l: 'Календарь' },
    { i: Icon.user,  l: 'Профиль' },
  ];
  return (
    <div style={{
      height: 64, borderRadius: 20, background: t.elev,
      border: `1px solid ${t.border}`,
      boxShadow: '0 4px 16px -8px rgba(0,0,0,0.12)',
      padding: '0 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-around',
    }}>
      {items.map((tab: any, i: number) => {
        const on = i === active;
        const I = tab.i;
        return (
          <div key={tab.l} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, color: on ? t.accent : t.text3, minWidth: 56 }}>
            <I s={22} sw={1.6} />
            <span style={{ fontSize: 10.5, fontWeight: on ? 500 : 400, fontFamily: 'IBM Plex Sans, sans-serif', letterSpacing: 0.1 }}>{tab.l}</span>
          </div>
        );
      })}
    </div>
  );
}

// ---- Screen scaffold ----
export function Screen({ t, children, header, footer, padX = 20, padTop = 0, padBottom = 100, bg }: any) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: bg || t.bg,
      color: t.text,
      fontFamily: 'IBM Plex Sans, sans-serif',
      display: 'flex', flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {header}
      <div style={{ flex: 1, overflow: 'auto', padding: `${padTop}px ${padX}px ${padBottom}px` }}>
        {children}
      </div>
      {footer}
    </div>
  );
}

// ---- SubCard ----
export function SubCard({ t, char, name, meta, price, days, period = 'мес', tone = 'neutral', trial, onClick, dense }: any) {
  const danger = days != null && days <= 3;
  const accentTone = trial ? 'accent' : tone;
  return (
    <div onClick={onClick} style={{
      background: t.elev, borderRadius: 16,
      padding: dense ? '12px 14px' : '14px 16px',
      display: 'flex', alignItems: 'center', gap: dense ? 12 : 14,
      border: `1px solid ${t.border}`,
      cursor: onClick ? 'pointer' : 'default',
    }}>
      <LogoBox char={char} size={dense ? 36 : 44} t={t} tone={accentTone} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ ...typeOf(TOKENS.type.bodyM), color: t.text, letterSpacing: -0.1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</div>
        <div style={{ ...typeOf(TOKENS.type.cap), color: t.text2, marginTop: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
          {trial && <span style={{ background: t.accentSoft, color: t.accentDark, padding: '1px 6px', borderRadius: 4, fontSize: 10, fontWeight: 500, letterSpacing: 0.3, textTransform: 'uppercase' }}>триал</span>}
          <span>{meta}</span>
        </div>
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ ...typeOf(TOKENS.type.bodyM), color: t.text, fontVariantNumeric: 'tabular-nums' }}>{price}<span style={{ color: t.text3, fontWeight: 400, fontSize: 12 }}> /{period}</span></div>
        {days != null && (
          <div style={{ ...typeOf(TOKENS.type.cap), color: danger ? t.crit : t.text3, marginTop: 2 }}>
            {days === 0 ? 'сегодня' : days < 0 ? `${-days} дн. назад` : `через ${days} дн.`}
          </div>
        )}
      </div>
    </div>
  );
}

// ---- Segmented ----
export function Segmented({ t, items, active = 0 }: any) {
  return (
    <div style={{ display: 'inline-flex', padding: 3, background: t.bg2, borderRadius: 10, border: `1px solid ${t.border}` }}>
      {items.map((it: string, i: number) => (
        <div key={it} style={{
          padding: '7px 14px', borderRadius: 8,
          background: i === active ? t.elev : 'transparent',
          color: i === active ? t.text : t.text2,
          boxShadow: i === active ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
          ...typeOf(TOKENS.type.cap), fontWeight: 500, fontSize: 13,
          cursor: 'pointer',
        }}>{it}</div>
      ))}
    </div>
  );
}

// ---- StatCard ----
export function StatCard({ t, label, value, hint }: any) {
  return (
    <div style={{ background: t.elev, border: `1px solid ${t.border}`, borderRadius: 16, padding: 16 }}>
      <div style={{ ...typeOf(TOKENS.type.cap), color: t.text2, textTransform: 'uppercase', letterSpacing: 0.6, fontSize: 11 }}>{label}</div>
      <div style={{ ...typeOf(TOKENS.type.h1), color: t.text, fontSize: 26, marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>{value}</div>
      {hint && <div style={{ ...typeOf(TOKENS.type.cap), color: t.text3, marginTop: 4 }}>{hint}</div>}
    </div>
  );
}
