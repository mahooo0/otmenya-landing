import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

const siteUrl = "https://otmenya.holy-water.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ОтменYа — Трекер подписок и триалов для СНГ",
    template: "%s | ОтменYа",
  },
  description:
    "Не дай забыть отменить триал. Все подписки СНГ в одном приложении с готовым скриптом отмены. 50+ сервисов: Яндекс Плюс, Netflix, Spotify, ChatGPT. Бесплатно.",
  keywords: [
    "трекер подписок",
    "отмена подписки",
    "управление подписками",
    "отслеживание триалов",
    "отменить триал",
    "подписки приложение",
    "контроль подписок",
    "напоминание о подписке",
    "отмена Яндекс Плюс",
    "отмена Netflix",
    "отмена Spotify",
    "отмена ChatGPT",
    "подписки СНГ",
    "трекер подписок Россия",
    "экономия на подписках",
    "управление подписками приложение",
    "отменить подписку инструкция",
    "subscription tracker",
    "cancel subscription",
    "trial reminder",
  ],
  authors: [{ name: "ОтменYа", url: siteUrl }],
  creator: "ОтменYа",
  publisher: "Holy Water",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "ru-RU": siteUrl,
      "uk-UA": siteUrl,
      "kk-KZ": siteUrl,
    },
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    alternateLocale: ["uk_UA", "kk_KZ"],
    url: siteUrl,
    siteName: "ОтменYа",
    title: "ОтменYа — Не дай забыть отменить триал",
    description:
      "Все подписки СНГ в одном приложении. Готовый скрипт отмены к каждому сервису. 50+ сервисов из коробки. Бесплатно.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ОтменYа — трекер подписок и триалов для СНГ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ОтменYа — Не дай забыть отменить триал",
    description:
      "Все подписки СНГ в одном приложении. Готовый скрипт отмены. 50+ сервисов. Бесплатно.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://is1-ssl.mzstatic.com" />
        <link rel="dns-prefetch" href="https://is1-ssl.mzstatic.com" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
