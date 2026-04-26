"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Clock,
  CalendarCheck,
  Shield,
  Globe,
  Bell,
} from "lucide-react";
import Section from "./Section";

const features = [
  {
    icon: Brain,
    title: "Каталог СНГ-сервисов",
    description:
      "50+ локальных сервисов с типичными тарифами и длительностью триалов.",
    gradient: "from-violet-500/20 to-purple-500/20",
  },
  {
    icon: Clock,
    title: "Умные напоминания",
    description:
      "За 2 дня и за 1 день до конца триала — пуш с обратным отсчётом.",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: CalendarCheck,
    title: "Скрипт отмены",
    description:
      "Deep-link + пошаговая инструкция для каждого сервиса.",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: Shield,
    title: "Локальное хранение",
    description:
      "Без облаков, без аккаунтов, без банк-агрегатора.",
    gradient: "from-orange-500/20 to-amber-500/20",
  },
  {
    icon: Globe,
    title: "Мультивалютность",
    description:
      "₽, ₸, ₴, $, € — все валюты СНГ из коробки.",
    gradient: "from-pink-500/20 to-rose-500/20",
  },
  {
    icon: Bell,
    title: "Архив и экономия",
    description:
      "Смотри сколько сэкономил на отменённых подписках.",
    gradient: "from-teal-500/20 to-cyan-500/20",
  },
];

export default function FeaturesGrid() {
  return (
    <Section label="Возможности" title="Мощные функции">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="group rounded-3xl border border-border/50 bg-card p-6 transition-shadow hover:shadow-lg"
          >
            <div
              className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient}`}
            >
              <feature.icon className="h-6 w-6 text-foreground" />
            </div>
            <h3 className="text-lg font-bold tracking-tight">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
            <a
              href="#waitlist"
              className="mt-4 inline-flex items-center text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              Подробнее &gt;
            </a>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
