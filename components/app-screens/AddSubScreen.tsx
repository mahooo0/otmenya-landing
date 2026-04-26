"use client";

import React from "react";
import { TOKENS, typeOf } from "@/lib/design-tokens";

interface AddSubScreenProps {
  theme?: 'light' | 'dark';
}

// -- Real App Store icons (100x100) --
const CATALOG = [
  { id: 'yaplus',   name: 'Yandex Plus',     cat: 'Стриминг', price: 'от 399 ₽', icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/ce/11/18/ce111890-2481-d677-a932-b5255d347bb0/AppIcon-0-0-1x_U007epad-0-1-0-0-sRGB-85-220.png/100x100bb.jpg' },
  { id: 'kinopoisk',name: 'Кинопоиск',       cat: 'Стриминг', price: 'от 299 ₽', icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/75/43/d4/7543d4df-0a0d-467d-e10c-566d8cee5fbc/AppIcon-0-0-1x_U007epad-0-1-0-85-220.png/100x100bb.jpg' },
  { id: 'netflix',  name: 'Netflix',          cat: 'Стриминг', price: 'от 599 ₽', icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/1c/5e/36/1c5e36a5-ba02-8501-e95f-bf210d0fa9e4/AppIcon-0-0-1x_U007emarketing-0-11-0-sRGB-0-85-220.png/100x100bb.jpg' },
  { id: 'okko',     name: 'Okko',             cat: 'Стриминг', price: 'от 499 ₽', icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/ca/37/21/ca37218b-2318-088c-92c6-4f0d2327aa99/AppIcon-0-0-1x_U007epad-0-1-0-85-220.png/100x100bb.jpg' },
  { id: 'ivi',      name: 'ivi',              cat: 'Стриминг', price: 'от 399 ₽', icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/ca/37/21/ca37218b-2318-088c-92c6-4f0d2327aa99/AppIcon-0-0-1x_U007epad-0-1-0-85-220.png/100x100bb.jpg' },
  { id: 'yt',       name: 'YouTube Premium',  cat: 'Стриминг', price: 'от 299 ₽', icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/75/aa/76/75aa76e8-aebd-475f-6a09-346b103e19a3/logo_youtube_2024_q4_color-0-0-1x_U007emarketing-0-0-0-7-0-0-0-85-220.png/100x100bb.jpg' },
  { id: 'spotify',  name: 'Spotify',          cat: 'Музыка',   price: 'от 299 ₽', icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/fc/90/9b/fc909b97-ceca-3bff-1112-196bd8a09f65/AppIcon-0-0-1x_U007epad-0-1-0-0-sRGB-85-220.png/100x100bb.jpg' },
  { id: 'applemus', name: 'Apple Music',      cat: 'Музыка',   price: 'от 169 ₽', icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/31/6c/c3/316cc33a-5e7d-8902-58eb-f4e16c5d9440/music-0-0-1x_U007epad-0-1-0-sRGB-85-220.png/100x100bb.jpg' },
  { id: 'chatgpt',  name: 'ChatGPT',          cat: 'AI',       price: '20 $/мес', icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/1b/45/d6/1b45d659-d8bf-94b0-dfa6-0449fc565333/AppIcon-0-0-1x_U007epad-0-0-0-1-0-P3-85-220.png/100x100bb.jpg' },
  { id: 'litres',   name: 'Литрес',           cat: 'Книги',    price: 'от 399 ₽', icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/af/3a/4a/af3a4ae8-c94a-0c50-c87f-99d359cccc3f/app_icon-0-0-1x_U007epad-0-1-0-sRGB-85-220.png/100x100bb.jpg' },
  { id: 'mybook',   name: 'MyBook',           cat: 'Книги',    price: 'от 279 ₽', icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/05/0c/0f/050c0f92-a638-deb1-5e02-d626616f23ef/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/100x100bb.jpg' },
  { id: 'icloud',   name: 'iCloud+',          cat: 'Софт',     price: 'от 89 ₽',  icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/1b/45/d6/1b45d659-d8bf-94b0-dfa6-0449fc565333/AppIcon-0-0-1x_U007epad-0-0-0-1-0-P3-85-220.png/100x100bb.jpg' },
];

const CATEGORIES_AD = ['Все', 'Стриминг', 'Музыка', 'AI', 'Софт', 'Книги', 'Игры'];

function MarkBox({ s, size = 56, radius = 14 }: { s: any; size?: number; radius?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: radius,
      overflow: 'hidden', flexShrink: 0, background: '#f0f0f0',
    }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={s.icon}
        alt={s.name}
        width={size}
        height={size}
        style={{ width: size, height: size, objectFit: 'cover', display: 'block' }}
      />
    </div>
  );
}

function ModalHandle({ t }: { t: any }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0 4px' }}>
      <div style={{ width: 36, height: 5, borderRadius: 3, background: t.borderStrong, opacity: 0.6 }} />
    </div>
  );
}

function ModalHeader({ t }: { t: any }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '4px 16px 14px', position: 'relative',
    }}>
      <span style={{
        ...typeOf(TOKENS.type.bodyM), color: t.text2, fontSize: 14,
        cursor: 'pointer', minWidth: 70,
      }}>Закрыть</span>
      <h1 style={{
        position: 'absolute', left: 0, right: 0, textAlign: 'center',
        fontFamily: 'Lora, serif', fontWeight: 500, fontSize: 18,
        color: t.text, letterSpacing: -0.2, margin: 0, pointerEvents: 'none',
      }}>Что добавляем?</h1>
      <span style={{ minWidth: 70 }} />
    </div>
  );
}

function AddSearchBar({ t, focused = true }: { t: any; focused?: boolean }) {
  return (
    <div style={{ padding: '0 16px' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '12px 14px',
        background: t.elev,
        border: `1.5px solid ${focused ? t.accent : t.border}`,
        borderRadius: 12, transition: 'border .15s',
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke={focused ? t.accent : t.text3}
          strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
        </svg>
        <span style={{ ...typeOf(TOKENS.type.body), color: t.text3, flex: 1, fontSize: 14 }}>
          Поиск по сервисам
        </span>
        {focused && (
          <span style={{
            width: 1.5, height: 16, background: t.accent,
          }} />
        )}
      </div>
    </div>
  );
}

function CategoryChips({ t, active = 0 }: { t: any; active?: number }) {
  return (
    <div style={{
      display: 'flex', gap: 8, overflowX: 'auto',
      padding: '0 16px 4px',
      scrollbarWidth: 'none',
    }}>
      {CATEGORIES_AD.map((c, i) => {
        const on = i === active;
        return (
          <span key={c} style={{
            flexShrink: 0,
            padding: '7px 13px', borderRadius: 999,
            background: on ? t.accent : t.elev,
            border: `1px solid ${on ? t.accent : t.border}`,
            color: on ? t.onAccent : t.text2,
            ...typeOf(TOKENS.type.bodyM), fontSize: 13.5, fontWeight: on ? 500 : 400,
            cursor: 'pointer',
          }}>{c}</span>
        );
      })}
    </div>
  );
}

function ManualRow({ t, full }: { t: any; full?: boolean }) {
  return (
    <div style={{
      margin: full ? '6px 16px 0' : '0 16px',
      padding: '14px 14px',
      background: 'transparent', border: `1.5px dashed ${t.borderStrong}`,
      borderRadius: 14,
      display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: t.bg2, color: t.accent,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 4 l4 4 l-12 12 l-5 1 l1 -5 z" />
        </svg>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: 'Lora, serif', fontWeight: 500, fontSize: 15,
          color: t.text, letterSpacing: -0.1,
        }}>Не нашёл свой?</div>
        <div style={{
          ...typeOf(TOKENS.type.body), fontSize: 12.5,
          color: t.text2, marginTop: 1,
        }}>Введи вручную — занимает 30 секунд</div>
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={t.text3}
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 6 6 6-6 6" />
      </svg>
    </div>
  );
}

function GridTileAd({ t, s, hint = false }: { t: any; s: any; hint?: boolean }) {
  return (
    <div style={{
      flex: 1, minWidth: 0,
      padding: '16px 8px 14px',
      background: t.elev, border: `1px solid ${t.border}`, borderRadius: 16,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
      cursor: 'pointer',
    }}>
      <MarkBox s={s} size={48} radius={12} />
      <div style={{ textAlign: 'center', width: '100%' }}>
        <div style={{
          ...typeOf(TOKENS.type.bodyM), fontSize: 13,
          color: t.text, fontWeight: 500,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{s.name}</div>
        {hint && (
          <div style={{ ...typeOf(TOKENS.type.mono), color: t.text3, marginTop: 1 }}>
            {s.price}
          </div>
        )}
      </div>
    </div>
  );
}

export function AddSubScreen({ theme = 'light' }: AddSubScreenProps) {
  const t = TOKENS[theme];
  const rows: any[][] = [];
  for (let i = 0; i < CATALOG.length; i += 2) rows.push(CATALOG.slice(i, i + 2));

  return (
    <div style={{ width: '100%', height: '100%', background: t.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <ModalHandle t={t} />
      <ModalHeader t={t} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <AddSearchBar t={t} focused />
        <CategoryChips t={t} active={0} />
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '14px 0 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{
          padding: '0 16px',
          ...typeOf(TOKENS.type.mono),
          color: t.text3, letterSpacing: 1.4, fontSize: 10.5,
        }}>ПОПУЛЯРНЫЕ В РОССИИ · 12</div>
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {rows.map((row, i) => (
            <div key={i} style={{ display: 'flex', gap: 10 }}>
              {row.map((s) => <GridTileAd key={s.id} t={t} s={s} hint />)}
            </div>
          ))}
        </div>
        <ManualRow t={t} full />
      </div>
    </div>
  );
}
