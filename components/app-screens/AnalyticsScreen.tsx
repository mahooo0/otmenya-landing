"use client";

import React from "react";
import { TOKENS, typeOf } from "@/lib/design-tokens";

interface AnalyticsScreenProps {
  theme?: 'light' | 'dark';
}

// -- Service marks --
const SVCS_AN: Record<string, { name: string; bg: string; fg: string }> = {
  netflix:   { name: 'Netflix',     bg: '#A85A4A', fg: '#FCFAF4' },
  spotify:   { name: 'Spotify',     bg: '#6B8E63', fg: '#FCFAF4' },
  yaplus:    { name: 'Yandex Plus', bg: '#22251F', fg: '#FCFAF4' },
  kinopoisk: { name: 'Кинопоиск',   bg: '#B9925A', fg: '#FCFAF4' },
  yt:        { name: 'YouTube',     bg: '#A85A4A', fg: '#FCFAF4' },
  chatgpt:   { name: 'ChatGPT',     bg: '#22251F', fg: '#8FAE85' },
  notion:    { name: 'Notion',      bg: '#506E48', fg: '#FCFAF4' },
  duolingo:  { name: 'Duolingo',    bg: '#6B8E63', fg: '#FCFAF4' },
};

const MARK_AN: Record<string, (c: string) => React.ReactNode> = {
  netflix:   (c) => (<><path d="M16 12 L16 36" stroke={c} strokeWidth="2.6" strokeLinecap="round" /><path d="M32 12 L32 36" stroke={c} strokeWidth="2.6" strokeLinecap="round" /><path d="M16 12 L32 36" stroke={c} strokeWidth="2.6" strokeLinecap="round" /></>),
  spotify:   (c) => (<><circle cx="24" cy="24" r="13" stroke={c} strokeWidth="1.6" fill="none" opacity="0.4" /><path d="M14 19 Q24 15 34 19" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round" /><path d="M16 24 Q24 21 32 24" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round" /><path d="M18 28 Q24 26 30 28" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round" /></>),
  yaplus:    (c) => (<><path d="M16 14 L24 24 L32 14" stroke={c} strokeWidth="2.4" fill="none" strokeLinecap="round" /><path d="M24 24 L24 36" stroke={c} strokeWidth="2.4" strokeLinecap="round" /><circle cx="24" cy="40" r="1.6" fill={c} /></>),
  kinopoisk: (c) => (<><rect x="12" y="14" width="24" height="20" rx="2" stroke={c} strokeWidth="1.6" fill="none" />{[16, 20, 24, 28, 32].map((x) => <rect key={x} x={x - 0.8} y="14" width="1.6" height="2" fill={c} />)}{[16, 20, 24, 28, 32].map((x) => <rect key={x + 'b'} x={x - 0.8} y="32" width="1.6" height="2" fill={c} />)}<circle cx="24" cy="24" r="3" fill={c} /></>),
  chatgpt:   (c) => (<g stroke={c} strokeWidth="2" strokeLinecap="round" fill="none"><path d="M24 13 L24 35" /><path d="M14.5 18.5 L33.5 29.5" /><path d="M14.5 29.5 L33.5 18.5" /></g>),
  notion:    (c) => (<><rect x="14" y="12" width="20" height="24" rx="2" stroke={c} strokeWidth="1.6" fill="none" /><path d="M19 17 L19 31 M19 17 L29 31 M29 17 L29 31" stroke={c} strokeWidth="1.6" strokeLinecap="round" /></>),
  duolingo:  (c) => (<><circle cx="24" cy="24" r="11" stroke={c} strokeWidth="1.8" fill="none" /><circle cx="20" cy="22" r="1.6" fill={c} /><circle cx="28" cy="22" r="1.6" fill={c} /><path d="M19 28 Q24 31 29 28" stroke={c} strokeWidth="1.8" fill="none" strokeLinecap="round" /></>),
  yt:        (c) => (<><rect x="10" y="15" width="28" height="18" rx="4" stroke={c} strokeWidth="1.8" fill="none" /><path d="M21 20 L29 24 L21 28 Z" fill={c} /></>),
};

function ServiceMarkAn({ svc, size = 36, radius = 10 }: { svc: string; size?: number; radius?: number }) {
  const s = SVCS_AN[svc];
  return (
    <div style={{
      width: size, height: size, borderRadius: radius,
      background: s.bg, color: s.fg, flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg width={size * 0.7} height={size * 0.7} viewBox="0 0 48 48">
        {MARK_AN[svc](s.fg)}
      </svg>
    </div>
  );
}

const MONTHS = ['Окт', 'Ноя', 'Дек', 'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен'];
const SPEND  = [2100, 2280, 2400, 2350, 2420, 2480, 2480, 2480, 2480, 2480, 2480, 2480];
const PAST_N = 6;

const CATEGORIES = [
  { id: 'streaming', name: 'Стриминг', amount: 1200, color: '#A85A4A' },
  { id: 'music',     name: 'Музыка',   amount: 380,  color: '#6B8E63' },
  { id: 'ai',        name: 'AI/Софт',  amount: 520,  color: '#22251F' },
  { id: 'books',     name: 'Книги',    amount: 180,  color: '#B9925A' },
  { id: 'other',     name: 'Другое',   amount: 200,  color: '#506E48' },
];

const TOP5 = [
  { svc: 'chatgpt',  amount: 1980 },
  { svc: 'notion',   amount: 690 },
  { svc: 'duolingo', amount: 599 },
  { svc: 'netflix',  amount: 599 },
  { svc: 'yaplus',   amount: 399 },
];

const FORGOTTEN = [
  { svc: 'kinopoisk', name: 'Кинопоиск',  reason: 'не открывал 3 мес.', price: 299 },
  { svc: 'duolingo',  name: 'Duolingo',   reason: 'не открывал 5 мес.', price: 599 },
  { svc: 'yt',        name: 'YouTube',    reason: 'дубль с Premium',    price: 92 },
];

function ScreenHeader({ t, title }: { t: any; title: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      padding: '6px 20px 0',
    }}>
      <h1 style={{
        fontFamily: 'Lora, serif', fontWeight: 500,
        fontSize: 32, lineHeight: 1.1, letterSpacing: -0.6,
        color: t.text, margin: 0,
      }}>{title}</h1>
      <button style={{
        width: 38, height: 38, borderRadius: 12, border: 'none', background: 'transparent',
        color: t.text, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 6 12 2 8 6" />
          <path d="M12 2 v14" />
          <path d="M4 14 v5 a2 2 0 0 0 2 2 h12 a2 2 0 0 0 2 -2 v-5" />
        </svg>
      </button>
    </div>
  );
}

function PeriodSegmented({ t, active = 0 }: { t: any; active?: number }) {
  const items = ['Месяц', 'Год', 'Всё время'];
  return (
    <div style={{
      margin: '0 20px',
      display: 'inline-flex', padding: 3, alignSelf: 'flex-start',
      background: t.bg2, borderRadius: 12, border: `1px solid ${t.border}`,
    }}>
      {items.map((l, i) => {
        const on = i === active;
        return (
          <span key={l} style={{
            ...typeOf(TOKENS.type.cap),
            fontSize: 13, fontWeight: on ? 500 : 400,
            color: on ? t.text : t.text2,
            background: on ? t.elev : 'transparent',
            border: on ? `1px solid ${t.border}` : '1px solid transparent',
            padding: '7px 14px', borderRadius: 9,
            cursor: 'pointer', whiteSpace: 'nowrap',
          }}>{l}</span>
        );
      })}
    </div>
  );
}

function HomeTabBarAn({ t, active = 1 }: { t: any; active?: number }) {
  const items = [
    { l: 'Главная', icon: <path d="M3 11 L12 3 L21 11 V20 a1 1 0 0 1 -1 1 H4 a1 1 0 0 1 -1 -1 Z" /> },
    { l: 'Расходы', icon: <><path d="M4 19 V9 M9 19 V5 M14 19 V12 M19 19 V7" strokeLinecap="round" /></> },
    { l: 'Настройки', icon: <><circle cx="12" cy="12" r="3" /><path d="M12 3 v3 M12 18 v3 M3 12 h3 M18 12 h3 M5.6 5.6 l2.1 2.1 M16.3 16.3 l2.1 2.1 M5.6 18.4 l2.1 -2.1 M16.3 7.7 l2.1 -2.1" strokeLinecap="round" /></> },
  ];
  return (
    <div style={{
      borderTop: `1px solid ${t.border}`, background: t.bg,
      display: 'flex', justifyContent: 'space-around',
      padding: '8px 12px 22px',
    }}>
      {items.map((it, i) => {
        const on = i === active;
        return (
          <div key={i} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            color: on ? t.text : t.text3, cursor: 'pointer', minWidth: 52,
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth={on ? 1.8 : 1.4} strokeLinecap="round" strokeLinejoin="round">
              {it.icon}
            </svg>
            <span style={{
              ...typeOf(TOKENS.type.cap),
              fontSize: 10.5, color: on ? t.text : t.text3,
              fontWeight: on ? 500 : 400,
            }}>{it.l}</span>
          </div>
        );
      })}
    </div>
  );
}

function BarChart({ t, w = 320, h = 140, minimal }: { t: any; w?: number; h?: number; minimal?: boolean }) {
  const max = Math.max(...SPEND);
  const barW = (w - 24) / SPEND.length - 4;
  return (
    <svg width={w} height={h + 24} viewBox={`0 0 ${w} ${h + 24}`} style={{ display: 'block' }}>
      <line x1="12" y1={h} x2={w - 12} y2={h} stroke={t.border} strokeWidth="1" />
      {SPEND.map((v, i) => {
        const past = i < PAST_N;
        const cur = i === PAST_N - 1;
        const bh = (v / max) * (h - 16);
        const x = 12 + i * (barW + 4);
        const y = h - bh;
        return (
          <g key={i}>
            {past
              ? (
                <rect x={x} y={y} width={barW} height={bh} rx="2"
                  fill={cur ? t.accent : t.accentDark} opacity={cur ? 1 : 0.85} />
              )
              : (
                <rect x={x + 0.5} y={y + 0.5} width={barW - 1} height={bh - 1} rx="2"
                  fill="none" stroke={t.accent} strokeWidth="1.2"
                  strokeDasharray="3 3" opacity={minimal ? 0.5 : 0.7} />
              )}
            <text x={x + barW / 2} y={h + 14} textAnchor="middle"
              fontFamily="JetBrains Mono, monospace" fontSize="9"
              fill={t.text3} letterSpacing="0.5">{MONTHS[i]}</text>
          </g>
        );
      })}
      <g>
        <line x1={12 + (PAST_N - 0.5) * (barW + 4)} y1="0" x2={12 + (PAST_N - 0.5) * (barW + 4)} y2={h}
          stroke={t.text3} strokeWidth="1" strokeDasharray="2 3" opacity="0.5" />
      </g>
    </svg>
  );
}

function Donut({ t, size = 130, thickness = 22, minimal }: { t: any; size?: number; thickness?: number; minimal?: boolean }) {
  const r = size / 2 - thickness / 2;
  const cx = size / 2, cy = size / 2;
  const total = CATEGORIES.reduce((a, c) => a + c.amount, 0);
  const C = 2 * Math.PI * r;
  let acc = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={t.border} strokeWidth={thickness} />
      {CATEGORIES.map((c, i) => {
        const frac = c.amount / total;
        const dash = frac * C;
        const dashGap = C - dash;
        const offset = -acc * C + C / 4;
        acc += frac;
        return (
          <circle key={c.id} cx={cx} cy={cy} r={r}
            fill="none"
            stroke={minimal ? t.text : c.color}
            opacity={minimal ? (0.85 - i * 0.12) : 1}
            strokeWidth={thickness - (minimal ? 8 : 0)}
            strokeDasharray={`${dash} ${dashGap}`}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${cx} ${cy})`} />
        );
      })}
      <text x={cx} y={cy - 2} textAnchor="middle"
        fontFamily="Lora, serif" fontStyle="italic" fontWeight="500"
        fontSize="22" fill={t.text} letterSpacing="-0.5">{total.toLocaleString('ru-RU')}</text>
      <text x={cx} y={cy + 16} textAnchor="middle"
        fontFamily="JetBrains Mono, monospace" fontSize="9"
        fill={t.text3} letterSpacing="1.4">₽ В МЕСЯЦ</text>
    </svg>
  );
}

function DonutLegend({ t, minimal }: { t: any; minimal?: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, minWidth: 0 }}>
      {CATEGORIES.map((c, i) => (
        <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {minimal
            ? <span style={{ width: 10, height: 10, background: t.text, opacity: 0.85 - i * 0.12, borderRadius: 2, flexShrink: 0 }} />
            : <span style={{ width: 10, height: 10, background: c.color, borderRadius: 2, flexShrink: 0 }} />}
          <span style={{
            ...typeOf(TOKENS.type.body), fontSize: 13, color: t.text, flex: 1,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>{c.name}</span>
          <span style={{
            ...typeOf(TOKENS.type.mono), color: t.text3,
          }}>{c.amount.toLocaleString('ru-RU')} ₽</span>
        </div>
      ))}
    </div>
  );
}

function Top5Row({ t, item, rank, last }: { t: any; item: any; rank: number; last?: boolean }) {
  const s = SVCS_AN[item.svc];
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '10px 0',
      borderBottom: last ? 'none' : `1px solid ${t.border}`,
    }}>
      <span style={{
        ...typeOf(TOKENS.type.mono),
        color: t.text3, width: 18, textAlign: 'center',
      }}>{rank}</span>
      <ServiceMarkAn svc={item.svc} size={32} radius={9} />
      <span style={{
        flex: 1,
        fontFamily: 'Lora, serif', fontWeight: 500, fontSize: 15,
        color: t.text, letterSpacing: -0.2,
      }}>{s.name}</span>
      <span style={{
        ...typeOf(TOKENS.type.mono), color: t.text,
      }}>{item.amount.toLocaleString('ru-RU')} ₽</span>
    </div>
  );
}

function ForgottenRow({ t, item, last }: { t: any; item: any; last?: boolean }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '8px 0',
      borderBottom: last ? 'none' : `1px solid ${t.warn}22`,
    }}>
      <ServiceMarkAn svc={item.svc} size={28} radius={8} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: 'Lora, serif', fontWeight: 500, fontSize: 14,
          color: t.text, letterSpacing: -0.2,
        }}>{item.name}</div>
        <div style={{
          ...typeOf(TOKENS.type.mono), color: t.text3, fontSize: 10,
        }}>{item.reason}</div>
      </div>
      <span style={{
        ...typeOf(TOKENS.type.mono), color: t.text2, fontSize: 11,
      }}>{item.price} ₽</span>
      <span style={{
        ...typeOf(TOKENS.type.bodyM),
        fontSize: 12.5, color: t.warn, cursor: 'pointer',
        borderBottom: `1px solid ${t.warn}66`, paddingBottom: 0,
      }}>Отменить</span>
    </div>
  );
}

function SavingsBlock({ t }: { t: any }) {
  return (
    <div style={{
      background: t.warnBg,
      border: `1px solid ${t.warn}33`,
      borderLeft: `3px solid ${t.warn}`,
      borderRadius: 16,
      padding: '14px 16px 16px',
      display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      <div>
        <div style={{
          ...typeOf(TOKENS.type.mono),
          color: t.warn, letterSpacing: 1.4, fontSize: 10.5,
        }}>ВОЗМОЖНАЯ ЭКОНОМИЯ</div>
        <div style={{
          fontFamily: 'Lora, serif', fontWeight: 500,
          fontSize: 22, lineHeight: 1.2, letterSpacing: -0.4,
          color: t.text, marginTop: 4,
        }}>
          ~<span style={{ color: t.warn, fontStyle: 'italic' }}>990 ₽</span> в месяц
        </div>
        <div style={{
          ...typeOf(TOKENS.type.body), fontSize: 13,
          color: t.text2, marginTop: 4,
        }}>
          На забытых подписках. Можешь отменить прямо отсюда.
        </div>
      </div>
      <div>
        {FORGOTTEN.map((f, i) => (
          <ForgottenRow key={f.svc} t={t} item={f} last={i === FORGOTTEN.length - 1} />
        ))}
      </div>
    </div>
  );
}

function ShareBtn({ t }: { t: any }) {
  return (
    <button style={{
      height: 48, width: '100%',
      background: 'transparent', color: t.text,
      border: `1px solid ${t.borderStrong}`, borderRadius: 14,
      fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 500, fontSize: 15,
      cursor: 'pointer',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 6 12 2 8 6" />
        <path d="M12 2 v14" />
        <path d="M4 14 v5 a2 2 0 0 0 2 2 h12 a2 2 0 0 0 2 -2 v-5" />
      </svg>
      Поделиться отчётом
    </button>
  );
}

function CapAn({ t, children, accent }: { t: any; children: React.ReactNode; accent?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 20px' }}>
      <span style={{
        ...typeOf(TOKENS.type.mono),
        color: accent ? t.warn : t.text3,
        letterSpacing: 1.6, fontSize: 10.5,
      }}>{children}</span>
      <div style={{ flex: 1, height: 1, background: accent ? `${t.warn}40` : t.border }} />
    </div>
  );
}

export function AnalyticsScreen({ theme = 'light' }: AnalyticsScreenProps) {
  const t = TOKENS[theme];

  return (
    <div style={{ width: '100%', height: '100%', background: t.bg, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 22, paddingTop: 56 }}>
        <ScreenHeader t={t} title="Расходы" />
        <PeriodSegmented t={t} active={0} />

        {/* Hero numbers */}
        <div style={{ padding: '0 20px', display: 'flex', alignItems: 'flex-end', gap: 24 }}>
          <div>
            <div style={{ ...typeOf(TOKENS.type.mono), color: t.text3, letterSpacing: 1.6 }}>
              В МЕСЯЦ
            </div>
            <div style={{
              fontFamily: 'Lora, serif', fontWeight: 500,
              fontSize: 56, lineHeight: 1.05, letterSpacing: -1.4,
              color: t.text, marginTop: 4,
            }}>
              2 480 <span style={{ color: t.text3, fontStyle: 'italic', fontWeight: 400 }}>₽</span>
            </div>
          </div>
          <div style={{ paddingBottom: 8 }}>
            <div style={{ ...typeOf(TOKENS.type.mono), color: t.text3, letterSpacing: 1.6 }}>
              В ГОД
            </div>
            <div style={{
              fontFamily: 'Lora, serif', fontWeight: 500,
              fontSize: 24, lineHeight: 1.05, letterSpacing: -0.4,
              color: t.text2, marginTop: 4,
            }}>
              29 760 ₽
            </div>
          </div>
        </div>

        {/* Bar chart */}
        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <CapAn t={t}>ПО МЕСЯЦАМ · ФАКТ И ПРОГНОЗ</CapAn>
          <div style={{ marginTop: 4 }}>
            <BarChart t={t} w={350} h={120} minimal />
          </div>
        </div>

        {/* Donut + legend */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <CapAn t={t}>КАТЕГОРИИ</CapAn>
          <div style={{ padding: '0 20px', display: 'flex', alignItems: 'center', gap: 18 }}>
            <Donut t={t} size={130} thickness={20} minimal />
            <DonutLegend t={t} minimal />
          </div>
        </div>

        {/* Top 5 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <CapAn t={t}>ТОП-5 САМЫХ ДОРОГИХ</CapAn>
          <div style={{ padding: '0 20px' }}>
            {TOP5.map((s, i) => (
              <Top5Row key={s.svc} t={t} item={s} rank={i + 1} last={i === TOP5.length - 1} />
            ))}
          </div>
        </div>

        {/* Savings */}
        <div style={{ padding: '0 20px' }}>
          <SavingsBlock t={t} />
        </div>

        {/* Share */}
        <div style={{ padding: '0 20px 24px' }}>
          <ShareBtn t={t} />
        </div>
      </div>
      <HomeTabBarAn t={t} active={1} />
    </div>
  );
}
