"use client";

import React from "react";
import { TOKENS, typeOf } from "@/lib/design-tokens";

interface ArchiveScreenProps {
  theme?: 'light' | 'dark';
}

const MARK_AR: Record<string, (c: string) => React.ReactNode> = {
  netflix:  (c) => (<><path d="M16 12 L16 36" stroke={c} strokeWidth="2.6" strokeLinecap="round" /><path d="M32 12 L32 36" stroke={c} strokeWidth="2.6" strokeLinecap="round" /><path d="M16 12 L32 36" stroke={c} strokeWidth="2.6" strokeLinecap="round" /></>),
  duolingo: (c) => (<><circle cx="24" cy="24" r="11" stroke={c} strokeWidth="2" fill="none" /><circle cx="20" cy="22" r="1.4" fill={c} /><circle cx="28" cy="22" r="1.4" fill={c} /><path d="M20 28 q4 3 8 0" stroke={c} strokeWidth="1.6" fill="none" strokeLinecap="round" /></>),
  ivi:      (c) => (<><rect x="14" y="14" width="3" height="20" fill={c} rx="1" /><rect x="22.5" y="14" width="3" height="20" fill={c} rx="1" /><rect x="31" y="14" width="3" height="20" fill={c} rx="1" /><circle cx="23.5" cy="11" r="1.6" fill={c} /></>),
  notion:   (c) => (<><path d="M14 14 V36 M14 14 L34 14 V32 L24 38 L14 36" stroke={c} strokeWidth="1.6" fill="none" strokeLinejoin="round" /><path d="M20 20 L28 30" stroke={c} strokeWidth="1.6" /></>),
  applemus: (c) => (<><path d="M30 14 v14 a4 3 0 1 1 -2 -2.5 V18 l-10 2 v10 a4 3 0 1 1 -2 -2.5 V16 z" stroke={c} strokeWidth="1.6" fill="none" strokeLinejoin="round" /></>),
  ny:       (c) => (<><path d="M14 14 v20 M34 14 v20 M14 14 L34 34" stroke={c} strokeWidth="2.4" strokeLinecap="round" /></>),
  yt:       (c) => (<><rect x="10" y="15" width="28" height="18" rx="4" stroke={c} strokeWidth="1.8" fill="none" /><path d="M21 20 L29 24 L21 28 Z" fill={c} /></>),
};

const ARCHIVE = [
  { id: 'netflix',  name: 'Netflix',         cancelled: '12 марта 2026',   monthsSaved: 2, price: 990, save: 1980, bg: '#A85A4A', fg: '#FCFAF4', mark: MARK_AR.netflix,  cat: 'Стриминг' },
  { id: 'duolingo', name: 'Duolingo Plus',   cancelled: '8 марта 2026',    monthsSaved: 2, price: 599, save: 1198, bg: '#506E48', fg: '#FCFAF4', mark: MARK_AR.duolingo, cat: 'Образование' },
  { id: 'ivi',      name: 'ivi',             cancelled: '24 февраля 2026', monthsSaved: 3, price: 399, save: 1197, bg: '#A85A4A', fg: '#FCFAF4', mark: MARK_AR.ivi,      cat: 'Стриминг' },
  { id: 'notion',   name: 'Notion Plus',     cancelled: '14 февраля 2026', monthsSaved: 3, price: 690, save: 2070, bg: '#22251F', fg: '#FCFAF4', mark: MARK_AR.notion,   cat: 'AI / Софт' },
  { id: 'applemus', name: 'Apple Music',     cancelled: '2 февраля 2026',  monthsSaved: 3, price: 169, save: 507,  bg: '#22251F', fg: '#FCFAF4', mark: MARK_AR.applemus, cat: 'Музыка' },
  { id: 'ny',       name: 'NYT Cooking',     cancelled: '20 января 2026',  monthsSaved: 4, price: 499, save: 1996, bg: '#B9925A', fg: '#FCFAF4', mark: MARK_AR.ny,       cat: 'Книги' },
  { id: 'yt',       name: 'YouTube Premium', cancelled: '6 января 2026',   monthsSaved: 4, price: 299, save: 1196, bg: '#A85A4A', fg: '#FCFAF4', mark: MARK_AR.yt,       cat: 'Стриминг' },
];

const HEADLINE_TOTAL = 14280;

function fmt(n: number) {
  return n.toLocaleString('ru-RU').replace(/,/g, ' ');
}

function MarkFaded({ s, size = 44, radius = 12, fade = 0.55 }: { s: any; size?: number; radius?: number; fade?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: radius,
      background: s.bg, color: s.fg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, opacity: fade,
    }}>
      <svg width={size * 0.7} height={size * 0.7} viewBox="0 0 48 48">
        {s.mark(s.fg)}
      </svg>
    </div>
  );
}

function HeaderAr({ t }: { t: any }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '6px 16px 12px', position: 'relative',
    }}>
      <div style={{ minWidth: 70, cursor: 'pointer' }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={t.text}
          strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 6 -6 6 6 6" />
        </svg>
      </div>
      <span style={{ minWidth: 70 }} />
    </div>
  );
}

function HeroV1Ar({ t }: { t: any }) {
  return (
    <div style={{ padding: '6px 20px 22px' }}>
      <span style={{
        ...typeOf(TOKENS.type.mono), color: t.text3,
        letterSpacing: 1.6, fontSize: 10.5,
      }}>СЭКОНОМЛЕНО С МОМЕНТА ОТМЕНЫ</span>
      <div style={{
        marginTop: 6, display: 'flex', alignItems: 'baseline', gap: 4,
      }}>
        <span style={{
          fontFamily: 'Lora, serif', fontWeight: 500, fontSize: 56,
          color: t.text, letterSpacing: -2, lineHeight: 1,
        }}>{fmt(HEADLINE_TOTAL)}</span>
        <span style={{
          fontFamily: 'Lora, serif', fontStyle: 'italic', fontSize: 28,
          color: t.accent, letterSpacing: -0.5,
        }}>₽</span>
      </div>
      <span style={{
        ...typeOf(TOKENS.type.body), color: t.text3, fontSize: 13.5,
        fontStyle: 'italic',
      }}>за последние 4 месяца · {ARCHIVE.length} отписок</span>
    </div>
  );
}

function RowV1Ar({ t, item, last }: { t: any; item: any; last?: boolean }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '13px 20px',
      borderBottom: last ? 'none' : `1px solid ${t.border}`,
      cursor: 'pointer',
    }}>
      <MarkFaded s={item} size={42} radius={11} fade={0.65} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: 'Lora, serif', fontWeight: 500, fontSize: 15.5,
          color: t.text, letterSpacing: -0.2,
        }}>{item.name}</div>
        <div style={{
          ...typeOf(TOKENS.type.mono), color: t.text3, marginTop: 2,
        }}>ОТМЕНЕНО {item.cancelled.toUpperCase()} · {fmt(item.price)} ₽/МЕС</div>
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 4,
        padding: '5px 9px', borderRadius: 8,
        background: t.succBg,
        color: t.accentDark,
      }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          <path d="M12 19 V5 M5 12 l7 -7 l7 7" />
        </svg>
        <span style={{
          ...typeOf(TOKENS.type.mono), fontWeight: 600, fontSize: 11.5,
        }}>{fmt(item.save)} ₽</span>
      </div>
    </div>
  );
}

export function ArchiveScreen({ theme = 'light' }: ArchiveScreenProps) {
  const t = TOKENS[theme];

  return (
    <div style={{ width: '100%', height: '100%', background: t.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <HeaderAr t={t} />
      <div style={{ flex: 1, overflow: 'auto', paddingTop: 50, paddingBottom: 24 }}>
        <HeroV1Ar t={t} />
        <div style={{
          padding: '0 20px 8px',
          ...typeOf(TOKENS.type.mono), color: t.text3,
          letterSpacing: 1.4, fontSize: 10.5,
        }}>{ARCHIVE.length} ОТПИСОК</div>
        <div>
          {ARCHIVE.map((it, i) => (
            <RowV1Ar key={it.id} t={t} item={it} last={i === ARCHIVE.length - 1} />
          ))}
        </div>
      </div>
    </div>
  );
}
