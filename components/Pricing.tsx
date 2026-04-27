"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Section from "./Section";

const plans = [
  {
    name: "Бесплатно",
    price: "0 ₽",
    period: "",
    description: "Для старта",
    features: [
      "До 5 подписок",
      "Основные функции",
      "Пуш-напоминания",
      "Каталог СНГ-сервисов",
    ],
    cta: "Начать бесплатно",
    featured: false,
  },
  {
    name: "Pro",
    price: "299 ₽",
    period: "разово",
    description: "Полный контроль",
    features: [
      "Без лимита подписок",
      "Виджеты для iOS",
      "Аналитика расходов",
      "Экспорт данных",
      "Бэкап и восстановление",
      "Все темы оформления",
    ],
    cta: "Получить Pro",
    featured: true,
  },
];

export default function Pricing() {
  return (
    <Section id="pricing" label="Цены" title="Простые цены">
      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`relative overflow-hidden rounded-3xl border p-8 ${
              plan.featured
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card"
            }`}
          >
            {plan.featured && (
              <div className="absolute top-4 right-4 rounded-full bg-primary-foreground/20 px-3 py-1 text-xs font-semibold">
                Популярный
              </div>
            )}
            <p className="text-sm font-medium opacity-80">{plan.description}</p>
            <h3 className="mt-2 text-2xl font-bold">{plan.name}</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-black tracking-tight">
                {plan.price}
              </span>
              {plan.period && (
                <span className="text-sm opacity-60">{plan.period}</span>
              )}
            </div>
            <ul className="mt-6 flex flex-col gap-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2.5 text-sm">
                  <Check className="h-4 w-4 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href="#waitlist"
              className={`mt-8 flex h-12 w-full items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                plan.featured
                  ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              {plan.cta}
            </a>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
