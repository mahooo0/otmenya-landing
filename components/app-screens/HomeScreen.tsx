"use client";

import React from "react";
import { TOKENS, typeOf } from "@/lib/design-tokens";

interface HomeScreenProps {
  theme?: 'light' | 'dark';
}

// -- Service marks --
const MARK_HM: Record<string, (c: string) => React.ReactNode> = {
  netflix:   (c) => (<><path d="M16 12 L16 36" stroke={c} strokeWidth="2.6" strokeLinecap="round" /><path d="M32 12 L32 36" stroke={c} strokeWidth="2.6" strokeLinecap="round" /><path d="M16 12 L32 36" stroke={c} strokeWidth="2.6" strokeLinecap="round" /></>),
  spotify:   (c) => (<><circle cx="24" cy="24" r="13" stroke={c} strokeWidth="1.6" fill="none" opacity="0.4" /><path d="M14 19 Q24 15 34 19" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round" /><path d="M16 24 Q24 21 32 24" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round" /><path d="M18 28 Q24 26 30 28" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round" /></>),
  yaplus:    (c) => (<><path d="M16 14 L24 24 L32 14" stroke={c} strokeWidth="2.4" fill="none" strokeLinecap="round" /><path d="M24 24 L24 36" stroke={c} strokeWidth="2.4" strokeLinecap="round" /><circle cx="24" cy="40" r="1.6" fill={c} /></>),
  kinopoisk: (c) => (<><rect x="12" y="14" width="24" height="20" rx="2" stroke={c} strokeWidth="1.6" fill="none" />{[16, 20, 24, 28, 32].map((x) => <rect key={x} x={x - 0.8} y="14" width="1.6" height="2" fill={c} />)}{[16, 20, 24, 28, 32].map((x) => <rect key={x + 'b'} x={x - 0.8} y="32" width="1.6" height="2" fill={c} />)}<circle cx="24" cy="24" r="3" fill={c} /></>),
  yt:        (c) => (<><rect x="10" y="15" width="28" height="18" rx="4" stroke={c} strokeWidth="1.8" fill="none" /><path d="M21 20 L29 24 L21 28 Z" fill={c} /></>),
  chatgpt:   (c) => (<g stroke={c} strokeWidth="2" strokeLinecap="round" fill="none"><path d="M24 13 L24 35" /><path d="M14.5 18.5 L33.5 29.5" /><path d="M14.5 29.5 L33.5 18.5" /></g>),
  notion:    (c) => (<><rect x="14" y="12" width="20" height="24" rx="2" stroke={c} strokeWidth="1.6" fill="none" /><path d="M19 17 L19 31 M19 17 L29 31 M29 17 L29 31" stroke={c} strokeWidth="1.6" strokeLinecap="round" /></>),
  duolingo:  (c) => (<><circle cx="24" cy="24" r="11" stroke={c} strokeWidth="1.8" fill="none" /><circle cx="20" cy="22" r="1.6" fill={c} /><circle cx="28" cy="22" r="1.6" fill={c} /><path d="M19 28 Q24 31 29 28" stroke={c} strokeWidth="1.8" fill="none" strokeLinecap="round" /></>),
};

const SERVICES_HM: Record<string, { name: string; bg: string; fg: string; mark: (c: string) => React.ReactNode }> = {
  netflix:   { name: 'Netflix',     bg: '#A85A4A', fg: '#FCFAF4', mark: MARK_HM.netflix },
  spotify:   { name: 'Spotify',     bg: '#6B8E63', fg: '#FCFAF4', mark: MARK_HM.spotify },
  yaplus:    { name: 'Yandex Plus', bg: '#22251F', fg: '#FCFAF4', mark: MARK_HM.yaplus },
  kinopoisk: { name: 'Кинопоиск',   bg: '#B9925A', fg: '#FCFAF4', mark: MARK_HM.kinopoisk },
  yt:        { name: 'YouTube',     bg: '#A85A4A', fg: '#FCFAF4', mark: MARK_HM.yt },
  chatgpt:   { name: 'ChatGPT',     bg: '#22251F', fg: '#8FAE85', mark: MARK_HM.chatgpt },
  notion:    { name: 'Notion',      bg: '#506E48', fg: '#FCFAF4', mark: MARK_HM.notion },
  duolingo:  { name: 'Duolingo',    bg: '#6B8E63', fg: '#FCFAF4', mark: MARK_HM.duolingo },
};

const TRIALS = [
  { id: 'netflix', svc: 'netflix', priceAfter: '999 ₽/мес', endsIn: 2, endDate: '24 апреля' },
];

const ACTIVE = [
  { id: 'spotify',   svc: 'spotify',   price: 299, nextLabel: 'через 3 дня',  nextDate: '27 апреля', daysLeft: 3 },
  { id: 'yaplus',    svc: 'yaplus',    price: 399, nextLabel: 'через 5 дней', nextDate: '29 апреля', daysLeft: 5 },
  { id: 'chatgpt',   svc: 'chatgpt',   price: 1980, nextLabel: 'через 8 дней', nextDate: '02 мая',    daysLeft: 8 },
  { id: 'kinopoisk', svc: 'kinopoisk', price: 299, nextLabel: 'через 12 дней', nextDate: '06 мая',    daysLeft: 12 },
  { id: 'yt',        svc: 'yt',        price: 299, nextLabel: 'через 18 дней', nextDate: '12 мая',    daysLeft: 18 },
  { id: 'notion',    svc: 'notion',    price: 690, nextLabel: 'через 22 дня',  nextDate: '16 мая',    daysLeft: 22 },
  { id: 'duolingo',  svc: 'duolingo',  price: 599, nextLabel: 'через 26 дней', nextDate: '20 мая',    daysLeft: 26 },
];
const UPCOMING_7 = ACTIVE.filter((s) => s.daysLeft <= 7);

function ServiceMarkHm({ svc, size = 40, radius = 11 }: { svc: string; size?: number; radius?: number }) {
  const s = SERVICES_HM[svc];
  return (
    <div style={{
      width: size, height: size, borderRadius: radius,
      background: s.bg, color: s.fg, flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg width={size * 0.7} height={size * 0.7} viewBox="0 0 48 48">
        {s.mark(s.fg)}
      </svg>
    </div>
  );
}

function HomeTabBar({ t, active = 0 }: { t: any; active?: number }) {
  const items = [
    { l: 'Главная', icon: (
      <path d="M3 11 L12 3 L21 11 V20 a1 1 0 0 1 -1 1 H4 a1 1 0 0 1 -1 -1 Z" />
    ) },
    { l: 'Расходы', icon: (
      <><path d="M4 19 V9 M9 19 V5 M14 19 V12 M19 19 V7" strokeLinecap="round" /></>
    ) },
    { l: 'Настройки', icon: (
      <><circle cx="12" cy="12" r="3" /><path d="M12 3 v3 M12 18 v3 M3 12 h3 M18 12 h3 M5.6 5.6 l2.1 2.1 M16.3 16.3 l2.1 2.1 M5.6 18.4 l2.1 -2.1 M16.3 7.7 l2.1 -2.1" strokeLinecap="round" /></>
    ) },
  ];
  return (
    <div style={{
      borderTop: `1px solid ${t.border}`,
      background: t.bg,
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

function HomeFAB({ t, bottom = 84 }: { t: any; bottom?: number }) {
  return (
    <div style={{
      position: 'absolute', right: 20, bottom,
      width: 56, height: 56, borderRadius: 28,
      background: t.accent, color: t.onAccent,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: `0 12px 24px -8px ${t.accent}90, 0 2px 0 ${t.accentDark}`,
      cursor: 'pointer',
    }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14M5 12h14" />
      </svg>
    </div>
  );
}

function TrialCard({ t, trial, width = 240 }: { t: any; trial: any; width?: number }) {
  const s = SERVICES_HM[trial.svc];
  return (
    <div style={{
      flexShrink: 0, width,
      borderRadius: 18, padding: '14px 14px 14px 18px',
      background: t.warnBg,
      border: `1px solid ${t.warn}33`,
      borderLeft: `3px solid ${t.warn}`,
      display: 'flex', flexDirection: 'column', gap: 12,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <ServiceMarkHm svc={trial.svc} size={36} radius={10} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: 'Lora, serif', fontWeight: 500, fontSize: 16,
            color: t.text, letterSpacing: -0.2,
          }}>{s.name}</div>
          <div style={{
            ...typeOf(TOKENS.type.mono),
            color: t.text3, marginTop: 1,
          }}>триал</div>
        </div>
      </div>
      <div>
        <div style={{
          ...typeOf(TOKENS.type.cap), color: t.text3,
          letterSpacing: 1.4,
        }}>ОСТАЛОСЬ</div>
        <div style={{
          fontFamily: 'Lora, serif', fontWeight: 500, fontStyle: 'italic',
          fontSize: 28, color: t.warn, letterSpacing: -0.4, marginTop: 2,
        }}>
          {trial.endsIn} {trial.endsIn === 1 ? 'день' : 'дня'}
        </div>
        <div style={{
          ...typeOf(TOKENS.type.body), fontSize: 12.5,
          color: t.text2, marginTop: 4,
        }}>
          потом — {trial.priceAfter}
        </div>
      </div>
      <button style={{
        height: 36, padding: '0 14px',
        background: t.text, color: t.bg,
        border: 'none', borderRadius: 999,
        fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 500, fontSize: 13,
        cursor: 'pointer', alignSelf: 'flex-start',
      }}>Отменить</button>
    </div>
  );
}

function SubRow({ t, sub, last, dense, danger }: { t: any; sub: any; last?: boolean; dense?: boolean; danger?: boolean }) {
  const s = SERVICES_HM[sub.svc];
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: dense ? '10px 0' : '12px 0',
      borderBottom: last ? 'none' : `1px solid ${t.border}`,
    }}>
      <ServiceMarkHm svc={sub.svc} size={dense ? 36 : 40} radius={dense ? 10 : 11} />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{
          fontFamily: 'Lora, serif', fontWeight: 500, fontSize: dense ? 15 : 16,
          color: t.text, letterSpacing: -0.2,
        }}>{s.name}</span>
        <span style={{
          ...typeOf(TOKENS.type.mono),
          color: danger ? t.warn : t.text3,
        }}>
          {sub.nextLabel} · {sub.nextDate}
        </span>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{
          fontFamily: 'Lora, serif', fontWeight: 500, fontSize: dense ? 15 : 16,
          color: t.text, letterSpacing: -0.2,
        }}>{sub.price.toLocaleString('ru-RU')} ₽</div>
        <div style={{ ...typeOf(TOKENS.type.mono), color: t.text3 }}>мес</div>
      </div>
    </div>
  );
}

function HomeHeader({ t }: { t: any }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '4px 20px 0',
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{
          fontFamily: 'Lora, serif', fontWeight: 500, fontSize: 22,
          color: t.text, letterSpacing: -0.3,
        }}>Апрель</span>
      </div>
      <div style={{ display: 'flex', gap: 4 }}>
        {[
          (<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>),
          (<><path d="M3 6h18 M6 12h12 M9 18h6" /></>),
        ].map((p, i) => (
          <button key={i} style={{
            width: 38, height: 38, borderRadius: 12, border: 'none', background: 'transparent',
            color: t.text, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{p}</svg>
          </button>
        ))}
      </div>
    </div>
  );
}

function HeroBlock({ t }: { t: any }) {
  return (
    <div style={{ padding: '8px 20px 0' }}>
      <div style={{
        ...typeOf(TOKENS.type.mono),
        color: t.text3, letterSpacing: 1.6,
      }}>В ЭТОМ МЕСЯЦЕ</div>
      <div style={{
        fontFamily: 'Lora, serif', fontWeight: 500,
        fontSize: 64, lineHeight: 1.05, letterSpacing: -1.6,
        color: t.text, marginTop: 4,
      }}>
        2 480 <span style={{ color: t.text3, fontStyle: 'italic', fontWeight: 400 }}>₽</span>
      </div>
      <div style={{
        ...typeOf(TOKENS.type.body), fontSize: 13.5,
        color: t.text2, marginTop: 6,
      }}>
        из них <span style={{ color: t.warn, fontWeight: 500 }}>990 ₽</span> за триалы
      </div>
    </div>
  );
}

function SectionCap({ t, children, accent }: { t: any; children: React.ReactNode; accent?: boolean }) {
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

export function HomeScreen({ theme = 'light' }: HomeScreenProps) {
  const t = TOKENS[theme];

  return (
    <div style={{ width: '100%', height: '100%', background: t.bg, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 8 }}>
        <HomeHeader t={t} />
        <HeroBlock t={t} />

        {/* Trials */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <SectionCap t={t} accent>ТРИАЛЫ ЗАКАНЧИВАЮТСЯ · 1</SectionCap>
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', padding: '0 20px 4px', scrollbarWidth: 'none' }}>
            {TRIALS.map((tr) => <TrialCard key={tr.id} t={t} trial={tr} />)}
          </div>
        </div>

        {/* Upcoming 7 days */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <SectionCap t={t}>БЛИЖАЙШИЕ СПИСАНИЯ · 7 ДНЕЙ</SectionCap>
          <div style={{ padding: '0 20px' }}>
            {UPCOMING_7.map((s, i) => (
              <SubRow key={s.id} t={t} sub={s} last={i === UPCOMING_7.length - 1} danger={s.daysLeft <= 3} />
            ))}
          </div>
        </div>

        {/* Active subs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <SectionCap t={t}>АКТИВНЫЕ ПОДПИСКИ · 7</SectionCap>
          <div style={{ padding: '0 20px' }}>
            {ACTIVE.map((s, i) => (
              <SubRow key={s.id} t={t} sub={s} last={i === ACTIVE.length - 1} />
            ))}
          </div>
          <div style={{ height: 100 }} />
        </div>
      </div>
      <HomeFAB t={t} bottom={94} />
      <HomeTabBar t={t} active={0} />
    </div>
  );
}
