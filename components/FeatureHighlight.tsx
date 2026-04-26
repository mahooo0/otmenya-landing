"use client";

import { motion } from "framer-motion";
import IphoneMockup from "./IphoneMockup";
import { useMockupTheme } from "./MockupThemeContext";
import { HomeScreen } from "./app-screens/HomeScreen";
import { AddSubScreen } from "./app-screens/AddSubScreen";
import { PaywallScreen } from "./app-screens/PaywallScreen";

const features = [
  {
    title: "Триалы на первом экране",
    description:
      "Главный экран показывает триалы с обратным отсчётом. Кнопка «Отменить» прямо на карточке.",
    ScreenComp: HomeScreen,
    reverse: false,
  },
  {
    title: "Каталог СНГ-сервисов",
    description:
      'Больше 50 сервисов из коробки: Яндекс Плюс, Кинопоиск, Okko, Spotify, ChatGPT и другие.',
    ScreenComp: AddSubScreen,
    reverse: true,
  },
  {
    title: "Готовый скрипт отмены",
    description:
      "Deep-link в экран отмены сервиса. Плюс пошаговая инструкция. Один тап — и ты на месте.",
    ScreenComp: PaywallScreen,
    reverse: false,
  },
];

export default function FeatureHighlight() {
  const { theme } = useMockupTheme();
  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-24 md:gap-32">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col items-center gap-8 md:gap-16 ${
                feature.reverse ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              {/* Phone */}
              <div className="flex-shrink-0">
                <IphoneMockup scale={0.7}>
                  <feature.ScreenComp theme={theme} />
                </IphoneMockup>
              </div>

              {/* Text */}
              <motion.div
                initial={{ opacity: 0, x: feature.reverse ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex max-w-md flex-col"
              >
                <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                  {feature.title}
                </h3>
                <p className="mt-4 text-base text-muted-foreground md:text-lg">
                  {feature.description}
                </p>
                <a
                  href="#waitlist"
                  className="mt-6 inline-flex h-11 w-fit items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Получить доступ
                </a>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
