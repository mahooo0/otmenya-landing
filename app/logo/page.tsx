"use client";

// Logo concepts for ОтменYа

function LogoGrid() {
  const bg = "#111";
  const accent = "#6B8E63";
  const white = "#fff";

  const logos: { name: string; desc: string; render: (s: number) => React.ReactNode }[] = [
    {
      name: "Квадрат — полное имя",
      desc: "Чёрный скруглённый квадрат, внутри 'отменYа' в две строки, Y акцентом",
      render: (s: number) => (
        <svg width={s} height={s} viewBox="0 0 120 120" fill="none">
          <rect width="120" height="120" rx="28" fill={bg} />
          <text x="60" y="50" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="22" fill={white} letterSpacing="-0.5">
            отмен
          </text>
          <text x="60" y="82" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="32" letterSpacing="-1">
            <tspan fill={white}>Y</tspan>
            <tspan fill={accent}>а</tspan>
          </text>
        </svg>
      ),
    },
    {
      name: "Квадрат — одна строка",
      desc: "Компактно в одну строку, Y выделена цветом",
      render: (s: number) => (
        <svg width={s} height={s} viewBox="0 0 120 120" fill="none">
          <rect width="120" height="120" rx="28" fill={bg} />
          <text x="60" y="68" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="20" letterSpacing="-0.3">
            <tspan fill={white}>отмен</tspan>
            <tspan fill={accent} fontWeight="800" fontSize="24">Y</tspan>
            <tspan fill={white}>а</tspan>
          </text>
        </svg>
      ),
    },
    {
      name: "Квадрат — Y крупно",
      desc: "Большая Y акцентом, 'отмен' мелко сверху, 'а' мелко снизу",
      render: (s: number) => (
        <svg width={s} height={s} viewBox="0 0 120 120" fill="none">
          <rect width="120" height="120" rx="28" fill={bg} />
          <text x="60" y="34" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="500" fontSize="14" fill="rgba(255,255,255,0.5)" letterSpacing="3">
            ОТМЕН
          </text>
          <text x="60" y="82" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="60" fill={accent} letterSpacing="-2">
            Y
          </text>
          <text x="60" y="108" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="500" fontSize="14" fill="rgba(255,255,255,0.5)" letterSpacing="3">
            А
          </text>
        </svg>
      ),
    },
    {
      name: "Квадрат — serif",
      desc: "Serif шрифт как в приложении, Y в sage",
      render: (s: number) => (
        <svg width={s} height={s} viewBox="0 0 120 120" fill="none">
          <rect width="120" height="120" rx="28" fill={bg} />
          <text x="60" y="52" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="400" fontSize="18" fill="rgba(255,255,255,0.6)" letterSpacing="0.5" fontStyle="italic">
            отмен
          </text>
          <text x="60" y="86" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="700" fontSize="38" letterSpacing="-1">
            <tspan fill={accent} fontStyle="italic">Y</tspan>
            <tspan fill={white} fontStyle="italic">а</tspan>
          </text>
        </svg>
      ),
    },
    {
      name: "Квадрат — sage фон",
      desc: "Sage зелёный квадрат, белый текст",
      render: (s: number) => (
        <svg width={s} height={s} viewBox="0 0 120 120" fill="none">
          <rect width="120" height="120" rx="28" fill={accent} />
          <text x="60" y="50" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="18" fill="rgba(255,255,255,0.7)" letterSpacing="0.5">
            отмен
          </text>
          <text x="60" y="84" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="36" fill={white} letterSpacing="-1">
            Yа
          </text>
        </svg>
      ),
    },
    {
      name: "Квадрат — split",
      desc: "Разделён по горизонтали: верх тёмный 'отмен', низ sage 'Yа'",
      render: (s: number) => (
        <svg width={s} height={s} viewBox="0 0 120 120" fill="none">
          <rect width="120" height="120" rx="28" fill={bg} />
          <rect y="60" width="120" height="60" rx="0" fill={accent} />
          {/* Bottom corners */}
          <rect y="92" width="120" height="28" rx="28" fill={accent} />
          <rect y="60" width="120" height="34" fill={accent} />
          <text x="60" y="50" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="20" fill={white} letterSpacing="0.5">
            отмен
          </text>
          <text x="60" y="92" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="36" fill={white} letterSpacing="-1">
            Yа
          </text>
        </svg>
      ),
    },
    {
      name: "Y-Shield",
      desc: "Буква Y внутри щита — защита от списаний",
      render: (s: number) => (
        <svg width={s} height={s} viewBox="0 0 120 120" fill="none">
          <rect width="120" height="120" rx="28" fill={bg} />
          <path
            d="M60 18C60 18 28 30 28 58V82C28 82 38 102 60 108C82 102 92 82 92 82V58C92 30 60 18 60 18Z"
            fill="none"
            stroke={accent}
            strokeWidth="3"
            opacity="0.3"
          />
          <text
            x="60"
            y="78"
            textAnchor="middle"
            fontFamily="Inter, sans-serif"
            fontWeight="800"
            fontSize="52"
            fill={white}
          >
            Y
          </text>
        </svg>
      ),
    },
    {
      name: "Cancel Bell",
      desc: "Колокольчик с диагональной чертой — отмена уведомлений",
      render: (s: number) => (
        <svg width={s} height={s} viewBox="0 0 120 120" fill="none">
          <rect width="120" height="120" rx="28" fill={bg} />
          <g transform="translate(60,58)" stroke={white} strokeWidth="3.5" strokeLinecap="round" fill="none">
            <path d="M-20 2a20 20 0 0 1 40 0c0 14 6 18 6 18H-26s6-4 6-18" />
            <path d="M-4 20a6 6 0 0 0 8 0" />
          </g>
          <line x1="34" y1="86" x2="86" y2="34" stroke={accent} strokeWidth="4" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: "Y-Circle",
      desc: "Y в круге — минимализм, как у лучших приложений",
      render: (s: number) => (
        <svg width={s} height={s} viewBox="0 0 120 120" fill="none">
          <rect width="120" height="120" rx="28" fill={bg} />
          <circle cx="60" cy="60" r="36" stroke={accent} strokeWidth="3" />
          <text
            x="60"
            y="74"
            textAnchor="middle"
            fontFamily="Inter, sans-serif"
            fontWeight="700"
            fontSize="44"
            fill={white}
          >
            Y
          </text>
        </svg>
      ),
    },
    {
      name: "Slash-Y",
      desc: "Y с зачёркиванием — символ отмены подписки",
      render: (s: number) => (
        <svg width={s} height={s} viewBox="0 0 120 120" fill="none">
          <rect width="120" height="120" rx="28" fill={bg} />
          <text
            x="60"
            y="80"
            textAnchor="middle"
            fontFamily="Inter, sans-serif"
            fontWeight="800"
            fontSize="62"
            fill={white}
          >
            Y
          </text>
          <line x1="30" y1="90" x2="90" y2="30" stroke={accent} strokeWidth="5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: "O-dot",
      desc: "Буква О с точкой акцента — ОтменYа, фокус на 'отмену'",
      render: (s: number) => (
        <svg width={s} height={s} viewBox="0 0 120 120" fill="none">
          <rect width="120" height="120" rx="28" fill={bg} />
          <circle cx="60" cy="58" r="30" stroke={white} strokeWidth="5" />
          <circle cx="60" cy="58" r="6" fill={accent} />
        </svg>
      ),
    },
    {
      name: "Timer-Y",
      desc: "Y как стрелки таймера — время до отмены",
      render: (s: number) => (
        <svg width={s} height={s} viewBox="0 0 120 120" fill="none">
          <rect width="120" height="120" rx="28" fill={bg} />
          <circle cx="60" cy="62" r="34" stroke={white} strokeWidth="3" opacity="0.25" />
          {/* Y shape as clock hands */}
          <line x1="60" y1="62" x2="42" y2="40" stroke={white} strokeWidth="4" strokeLinecap="round" />
          <line x1="60" y1="62" x2="78" y2="40" stroke={white} strokeWidth="4" strokeLinecap="round" />
          <line x1="60" y1="62" x2="60" y2="88" stroke={accent} strokeWidth="4" strokeLinecap="round" />
          {/* Top pip */}
          <rect x="57" y="22" width="6" height="8" rx="2" fill={white} />
        </svg>
      ),
    },
    {
      name: "Check-Y",
      desc: "Y переходит в галочку — подписка отменена успешно",
      render: (s: number) => (
        <svg width={s} height={s} viewBox="0 0 120 120" fill="none">
          <rect width="120" height="120" rx="28" fill={bg} />
          {/* Y top branches */}
          <path
            d="M38 30 L60 60 M82 30 L60 60"
            stroke={white}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Y stem becomes a checkmark */}
          <path
            d="M60 60 L52 78 L80 50"
            stroke={accent}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      ),
    },
    {
      name: "Monogram",
      desc: "Стилизованная 'оY' — лигатура логотипа",
      render: (s: number) => (
        <svg width={s} height={s} viewBox="0 0 120 120" fill="none">
          <rect width="120" height="120" rx="28" fill={bg} />
          {/* о */}
          <circle cx="42" cy="62" r="18" stroke={white} strokeWidth="4" />
          {/* Y */}
          <path
            d="M66 38 L78 58 M90 38 L78 58 L78 86"
            stroke={accent}
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      name: "Bell-Y Minimal",
      desc: "Силуэт колокольчика, внутри Y",
      render: (s: number) => (
        <svg width={s} height={s} viewBox="0 0 120 120" fill="none">
          <rect width="120" height="120" rx="28" fill={bg} />
          <path
            d="M38 68a22 22 0 0 1 44 0c0 10 5 14 5 14H33s5-4 5-14Z"
            fill={accent}
            opacity="0.2"
          />
          <path
            d="M38 68a22 22 0 0 1 44 0c0 10 5 14 5 14H33s5-4 5-14Z"
            stroke={accent}
            strokeWidth="2.5"
            fill="none"
          />
          <path d="M54 82a8 8 0 0 0 12 0" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
          <text
            x="60"
            y="72"
            textAnchor="middle"
            fontFamily="Inter, sans-serif"
            fontWeight="800"
            fontSize="28"
            fill={white}
          >
            Y
          </text>
        </svg>
      ),
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#fafafa", padding: "60px 20px", fontFamily: "Inter, sans-serif" }}>
      <h1 style={{ textAlign: "center", fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
        Лого ОтменYа — варианты
      </h1>
      <p style={{ textAlign: "center", color: "#666", marginBottom: 48 }}>
        Нажми чтобы увидеть на тёмном и светлом фоне
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24, maxWidth: 1100, margin: "0 auto" }}>
        {logos.map((logo) => (
          <div
            key={logo.name}
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: 24,
              border: "1px solid #eee",
            }}
          >
            <div style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 16 }}>
              {/* Large */}
              {logo.render(100)}
              {/* Small sizes */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {logo.render(60)}
                {logo.render(32)}
              </div>
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{logo.name}</h3>
            <p style={{ fontSize: 14, color: "#888", margin: 0 }}>{logo.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LogoPage() {
  return <LogoGrid />;
}
