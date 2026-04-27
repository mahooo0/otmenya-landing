"use client";

import IphoneMockup from "./IphoneMockup";
import { useMockupTheme } from "./MockupThemeContext";
import { InteractiveApp } from "./app-screens/InteractiveApp";

const features = [
  {
    title: "Триалы на первом экране",
    description:
      "Главный экран показывает триалы с обратным отсчётом. Кнопка «Отменить» прямо на карточке.",
    initialScreen: "home" as const,
    reverse: false,
  },
  {
    title: "Каталог СНГ-сервисов",
    description:
      "Больше 50 сервисов из коробки: Яндекс Плюс, Кинопоиск, Okko, Spotify, ChatGPT и другие.",
    initialScreen: "add" as const,
    reverse: true,
  },
  {
    title: "Готовый скрипт отмены",
    description:
      "Deep-link в экран отмены сервиса. Плюс пошаговая инструкция. Один тап — и ты на месте.",
    initialScreen: "cancel-guide" as const,
    reverse: false,
  },
];

export default function FeatureHighlight() {
  const { theme } = useMockupTheme();
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-16 md:gap-32">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`flex flex-col items-center gap-6 md:gap-16 ${
                feature.reverse ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              {/* Phone */}
              <div className="flex-shrink-0">
                <div className="hidden md:block">
                  <IphoneMockup scale={0.7}>
                    <InteractiveApp theme={theme} initialScreen={feature.initialScreen} />
                  </IphoneMockup>
                </div>
                <div className="md:hidden">
                  <IphoneMockup scale={0.55}>
                    <InteractiveApp theme={theme} initialScreen={feature.initialScreen} />
                  </IphoneMockup>
                </div>
              </div>

              {/* Text */}
              <div className="flex max-w-md flex-col text-center md:text-left">
                <h3 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-4xl">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground md:mt-4 md:text-lg">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
