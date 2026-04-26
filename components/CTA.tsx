"use client";

import { motion } from "framer-motion";
import { HeartHandshake } from "lucide-react";
import Marquee from "./Marquee";
import { CTAButton } from "./CTAButtons";
import { useLaunchMode } from "./LaunchState";

const testimonialTexts = [
  "Забыл отменить Яндекс Плюс — списали 299 рублей. С ОтменYа такого не будет.",
  "Все подписки в одном месте — удобно!",
  "Скрипт отмены — гениально. Один тап и готово.",
  "Сэкономила 8000 рублей за полгода.",
  "Наконец-то приложение для СНГ!",
  "Данные хранятся только на устройстве. Без облаков.",
  "Аналитика расходов — очень наглядно.",
  "Мультивалютность — живу в Казахстане, всё работает.",
  "Простой дизайн, ничего лишнего.",
  "Виджет на главном экране — супер удобно.",
  "Перешёл с SubsCrab — тут каталог СНГ намного лучше.",
  "Лучший трекер подписок для СНГ.",
];

export default function CTA() {
  const { mode } = useLaunchMode();

  return (
    <section id="waitlist" className="relative overflow-hidden py-32 md:py-40">
      {/* Rotated marquee background */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 -rotate-12 scale-125 opacity-[0.06]">
        <Marquee duration="30s">
          {testimonialTexts.slice(0, 4).map((t, i) => (
            <span key={i} className="mx-4 whitespace-nowrap text-lg font-semibold">{t}</span>
          ))}
        </Marquee>
        <Marquee duration="35s" reverse>
          {testimonialTexts.slice(4, 8).map((t, i) => (
            <span key={i} className="mx-4 whitespace-nowrap text-lg font-semibold">{t}</span>
          ))}
        </Marquee>
        <Marquee duration="25s">
          {testimonialTexts.slice(8, 12).map((t, i) => (
            <span key={i} className="mx-4 whitespace-nowrap text-lg font-semibold">{t}</span>
          ))}
        </Marquee>
        <Marquee duration="40s" reverse>
          {testimonialTexts.slice(0, 4).map((t, i) => (
            <span key={i} className="mx-4 whitespace-nowrap text-lg font-semibold">{t}</span>
          ))}
        </Marquee>
        <Marquee duration="32s">
          {testimonialTexts.slice(4, 8).map((t, i) => (
            <span key={i} className="mx-4 whitespace-nowrap text-lg font-semibold">{t}</span>
          ))}
        </Marquee>
      </div>

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-2xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
            <HeartHandshake className="h-8 w-8 text-primary-foreground" />
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {mode === "pre-launch"
              ? "Готов взять подписки под контроль?"
              : "Скачай и начни экономить"}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            {mode === "pre-launch"
              ? "Запускаемся скоро. Забронируй ранний доступ — первые 100 пользователей получат Pro бесплатно."
              : "Доступно для iOS и Android. Бесплатно до 5 подписок."}
          </p>
          <div className="mt-8 flex justify-center">
            <CTAButton size="lg" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
