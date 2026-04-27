"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import IphoneMockup from "./IphoneMockup";
import { useMockupTheme } from "./MockupThemeContext";
import { InteractiveApp } from "./app-screens/InteractiveApp";
import { WidgetHomeScreen } from "./app-screens/WidgetHomeScreen";
import { NotificationScreen } from "./app-screens/NotificationScreen";

function AnimateIn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0px)" : "translateY(100px)",
        transition: "all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1)",
      }}
    >
      {children}
    </div>
  );
}

export default function BentoGrid() {
  const { theme } = useMockupTheme();
  return (
    <section id="bento">
      <div className="sm:py-20 py-12 mx-auto max-w-screen-lg px-10">
        <div className="text-center space-y-4 pb-10 mx-auto">
          <motion.h2
            className="text-sm text-primary text-balance font-mono font-semibold tracking-wider uppercase"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
          >
            Преимущества
          </motion.h2>
          <motion.h3
            className="mx-0 mt-4 max-w-lg text-5xl text-balance font-bold sm:max-w-none sm:text-4xl md:text-5xl lg:text-6xl leading-[1.2] tracking-tighter text-foreground lowercase"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
          >
            Всё что нужно и ничего лишнего
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1 — wide, full phone centered */}
          <AnimateIn className="bg-muted p-4 sm:p-6 !pb-0 rounded-3xl md:col-span-2">
            <h2 className="text-xl sm:text-2xl font-bold mb-1 text-foreground">
              Умные напоминания
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6">
              За 2 дня и за 1 день до списания — пуш-уведомление с обратным отсчётом.
              Ты узнаешь о списании раньше, чем банк.
            </p>
            {/* Big phone showing lock screen with notifications */}
            <div className="flex justify-center overflow-hidden h-[350px] sm:h-[560px]">
              <IphoneMockup scale={0.6} className="sm:hidden">
                <NotificationScreen theme={theme} />
              </IphoneMockup>
              <IphoneMockup scale={1} className="hidden sm:block">
                <NotificationScreen theme={theme} />
              </IphoneMockup>
            </div>
          </AnimateIn>

          {/* Card 2 — half, clipped phone */}
          <AnimateIn className="bg-muted p-4 sm:p-6 !pb-0 rounded-3xl">
            <h2 className="text-xl sm:text-2xl font-bold mb-1 text-foreground">
              Локальное хранение
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-4">
              Данные только на твоём устройстве. Без облаков, без банковских данных.
            </p>
            <div className="flex justify-center overflow-hidden" style={{ height: 380 }}>
              <IphoneMockup scale={0.65}>
                <InteractiveApp theme={theme} initialScreen="add" />
              </IphoneMockup>
            </div>
          </AnimateIn>

          {/* Card 3 — half, clipped phone */}
          <AnimateIn className="bg-muted p-4 sm:p-6 !pb-0 rounded-3xl">
            <h2 className="text-xl sm:text-2xl font-bold mb-1 text-foreground">
              Аналитика расходов
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-4">
              Сколько тратишь в месяц и год. Какие подписки забыты. Потенциал экономии.
            </p>
            <div className="flex justify-center overflow-hidden" style={{ height: 380 }}>
              <IphoneMockup scale={0.65}>
                <InteractiveApp theme={theme} initialScreen="analytics" />
              </IphoneMockup>
            </div>
          </AnimateIn>

          {/* Card 4 — wide, widget home screen dark */}
          <AnimateIn className="bg-muted p-4 sm:p-6 !pb-0 rounded-3xl md:col-span-2">
            <h2 className="text-xl sm:text-2xl font-bold mb-1 text-foreground">
              Виджеты на домашний экран
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6">
              Триал и ближайшие списания всегда на виду — прямо на экране блокировки.
              Без лишних открытий приложения.
            </p>
            <div className="flex justify-center overflow-hidden h-[350px] sm:h-[560px]">
              <IphoneMockup scale={0.6} className="sm:hidden">
                <WidgetHomeScreen theme={theme} />
              </IphoneMockup>
              <IphoneMockup scale={1} className="hidden sm:block">
                <WidgetHomeScreen theme={theme} />
              </IphoneMockup>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
