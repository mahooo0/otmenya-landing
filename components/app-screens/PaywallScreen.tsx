"use client";

import React from "react";
import { TOKENS, typeOf } from "@/lib/design-tokens";
import { Button } from "./shared";

interface PaywallScreenProps {
  theme?: 'light' | 'dark';
}

const BENEFITS_PW = [
  { id: 'limit',  text: 'Без лимита на число подписок', long: 'Сейчас можно 5. С Pro — сколько угодно.' },
  { id: 'widget', text: 'Виджеты на главный экран',     long: 'Видеть ближайшее списание не открывая приложение.' },
  { id: 'export', text: 'Экспорт в CSV / JSON',          long: 'Свои данные — в твоих руках. В любой момент.' },
  { id: 'backup', text: 'Бэкап в iCloud / Google Drive', long: 'Сменил телефон — всё на месте.' },
  { id: 'theme',  text: 'Все темы и кастомная иконка',   long: 'Настрой под себя — мелочь, а приятно.' },
  { id: 'analy',  text: 'Расширенная аналитика',         long: 'Тренды по категориям, прогнозы, сравнения по годам.' },
  { id: 'noads',  text: 'Без рекламы',                   long: 'Никогда. Даже маленькой.' },
];

function MakeBIcon(d: React.ReactNode) {
  return ({ c = 'currentColor', s = 18 }: { c?: string; s?: number }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"
      stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {d}
    </svg>
  );
}
const BIcon: Record<string, any> = {
  limit:  MakeBIcon(<><path d="M4 7h16M4 12h16M4 17h10" /><circle cx="19" cy="17" r="2.5" /><path d="M21 19l1.5 1.5" /></>),
  widget: MakeBIcon(<><rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="13" y="3" width="8" height="8" rx="1.5" /><rect x="3" y="13" width="8" height="8" rx="1.5" /><rect x="13" y="13" width="8" height="8" rx="1.5" strokeDasharray="2 2" /></>),
  export: MakeBIcon(<><path d="M12 4v12" /><path d="m7 9 5-5 5 5" /><path d="M5 20h14" /></>),
  backup: MakeBIcon(<><path d="M7 18a5 5 0 1 1 1.5 -9.8 6 6 0 0 1 11.5 2.3 4 4 0 0 1 -1 7.5" /><path d="M12 13v7" /><path d="m9 17 3 3 3 -3" /></>),
  theme:  MakeBIcon(<><circle cx="12" cy="12" r="9" /><path d="M12 3a9 9 0 0 0 0 18" fill="currentColor" stroke="none" opacity="0.3" /><path d="M12 3v18" /></>),
  analy:  MakeBIcon(<><path d="M4 19V5" /><path d="M4 19h16" /><path d="m7 14 4 -5 4 3 4 -7" /></>),
  noads:  MakeBIcon(<><circle cx="12" cy="12" r="9" /><path d="m6 6 12 12" /></>),
};

function CloseBtn({ t }: { t: any }) {
  return (
    <button style={{
      width: 34, height: 34, borderRadius: 17,
      border: 'none', background: 'transparent', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: t.text3,
    }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M6 6 18 18 M18 6 6 18" />
      </svg>
    </button>
  );
}

function FootLinks({ t }: { t: any }) {
  const sep = (
    <span style={{
      width: 2, height: 2, borderRadius: 1, background: t.text3,
      display: 'inline-block', flexShrink: 0,
    }} />
  );
  const Lk = ({ children }: { children: React.ReactNode }) => (
    <span style={{
      ...typeOf(TOKENS.type.body), fontSize: 12,
      color: t.text2, cursor: 'pointer',
    }}>{children}</span>
  );
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: 10, paddingTop: 14,
    }}>
      <Lk>Восстановить покупку</Lk>{sep}<Lk>Условия</Lk>{sep}<Lk>Политика</Lk>
    </div>
  );
}

function PricingPills({ t, selected = 'forever' }: { t: any; selected?: string }) {
  const A = { id: 'forever', eyebrow: 'КУПИТЬ НАВСЕГДА', big: '299', sub: 'разово, без подписки' };
  const B = { id: 'yearly', eyebrow: 'ГОДОВАЯ', big: '199', sub: '/год' };
  const Card = ({ p }: { p: any }) => {
    const on = p.id === selected;
    return (
      <div style={{
        flex: 1, padding: '14px 14px 12px', borderRadius: 16,
        background: on ? t.accentBg : t.elev,
        border: `${on ? 1.5 : 1}px solid ${on ? t.accent : t.border}`,
        position: 'relative', cursor: 'pointer',
      }}>
        {on && (
          <div style={{
            position: 'absolute', top: -8, right: 12,
            background: t.accent, color: t.onAccent,
            padding: '2px 8px', borderRadius: 999,
            ...typeOf(TOKENS.type.mono),
            fontSize: 9, letterSpacing: 1.2, fontWeight: 600,
          }}>ВЫБРАНО</div>
        )}
        <div style={{
          ...typeOf(TOKENS.type.mono),
          color: on ? t.accentDark : t.text3,
          fontSize: 9.5, letterSpacing: 1.4,
        }}>{p.eyebrow}</div>
        <div style={{
          marginTop: 6, display: 'flex', alignItems: 'baseline', gap: 4,
          fontFamily: 'Lora, serif',
        }}>
          <span style={{
            fontWeight: 500, fontSize: 30, color: t.text, letterSpacing: -0.8,
            lineHeight: 1,
          }}>{p.big}</span>
          <span style={{
            fontStyle: 'italic', fontSize: 17, color: on ? t.accent : t.text2,
            letterSpacing: -0.3,
          }}>₽</span>
        </div>
        <div style={{
          marginTop: 4,
          ...typeOf(TOKENS.type.body), fontSize: 11.5,
          color: t.text2, fontStyle: 'italic',
        }}>{p.sub}</div>
      </div>
    );
  };
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <Card p={A} /><Card p={B} />
    </div>
  );
}

function ReassureLine({ t, align = 'center' }: { t: any; align?: string }) {
  return (
    <div style={{
      ...typeOf(TOKENS.type.body),
      fontSize: 12, color: t.text2, textAlign: align as any, fontStyle: 'italic',
      lineHeight: 1.45, marginTop: 12,
    }}>
      Без сюрпризов. Без авто-продлений <span style={{ color: t.text3 }}>(для разовой)</span>.
    </div>
  );
}

function KeyMark({ t, size = 64 }: { t: any; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <g stroke={t.accent} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
        transform="rotate(-18 40 40)">
        <circle cx="26" cy="40" r="11" />
        <circle cx="26" cy="40" r="3.5" />
        <path d="M37 40 L66 40" />
        <path d="M58 40 L58 47" />
        <path d="M50 40 L50 46" />
      </g>
      <circle cx="68" cy="20" r="1.2" fill={t.accent} opacity="0.5" />
      <circle cx="14" cy="62" r="1" fill={t.accent} opacity="0.4" />
    </svg>
  );
}

function BenefitEditorial({ t, b, idx }: { t: any; b: any; idx: number }) {
  const I = BIcon[b.id];
  return (
    <div style={{
      display: 'flex', gap: 14, alignItems: 'flex-start',
      padding: '14px 0',
      borderTop: idx === 0 ? `1px solid ${t.border}` : 'none',
      borderBottom: `1px solid ${t.border}`,
    }}>
      <div style={{
        width: 28, paddingTop: 2,
        color: t.accent, flexShrink: 0,
        display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start',
      }}>
        <I s={20} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          ...typeOf(TOKENS.type.bodyM),
          color: t.text, fontSize: 15, letterSpacing: -0.1,
        }}>{b.text}</div>
        <div style={{
          ...typeOf(TOKENS.type.body), fontSize: 13,
          color: t.text2, marginTop: 2, lineHeight: 1.45,
          fontStyle: 'italic',
        }}>{b.long}</div>
      </div>
    </div>
  );
}

export function PaywallScreen({ theme = 'light' }: PaywallScreenProps) {
  const t = TOKENS[theme];

  return (
    <div style={{ width: '100%', height: '100%', background: t.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Top bar */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '6px 12px 0' }}>
        <CloseBtn t={t} />
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '50px 24px 28px' }}>
        {/* Hero */}
        <div style={{ marginBottom: 22 }}>
          <KeyMark t={t} size={56} />
          <h1 style={{
            margin: '14px 0 8px',
            fontFamily: 'Lora, serif', fontWeight: 500, fontSize: 38,
            color: t.text, letterSpacing: -1, lineHeight: 1.05,
          }}>Получи <span style={{ fontStyle: 'italic', color: t.accent }}>Pro</span></h1>
          <p style={{
            margin: 0, ...typeOf(TOKENS.type.body),
            fontSize: 16, lineHeight: 1.5, color: t.text2,
            maxWidth: 320,
          }}>
            Без рекламы и лимитов — навсегда. Один платёж, без подписки и сюрпризов.
          </p>
        </div>

        {/* Eyebrow */}
        <div style={{
          ...typeOf(TOKENS.type.mono),
          color: t.text3, letterSpacing: 1.4, fontSize: 10.5,
          marginBottom: 4,
        }}>ЧТО ТЫ ПОЛУЧИШЬ</div>

        {/* Benefits */}
        <div>
          {BENEFITS_PW.map((b, i) => (
            <BenefitEditorial key={b.id} t={t} b={b} idx={i} />
          ))}
        </div>

        {/* Pricing */}
        <div style={{ marginTop: 22 }}>
          <PricingPills t={t} selected="forever" />
          <ReassureLine t={t} align="left" />
        </div>

        {/* Action */}
        <div style={{ marginTop: 18 }}>
          <Button kind="primary" size="lg" t={t} full>Купить Pro</Button>
          <FootLinks t={t} />
        </div>
      </div>
    </div>
  );
}
