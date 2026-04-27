"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import IphoneMockup from "./IphoneMockup";
import { LogoIcon } from "./Logo";
import { CTAButton } from "./CTAButtons";
import { useMockupTheme } from "./MockupThemeContext";
import { InteractiveApp } from "./app-screens/InteractiveApp";
import { NotificationScreen } from "./app-screens/NotificationScreen";
import { WidgetHomeScreen } from "./app-screens/WidgetHomeScreen";

function useScreens() {
  const { theme } = useMockupTheme();
  return [
    { el: <InteractiveApp theme={theme} initialScreen="add" />, key: "add" },
    { el: <NotificationScreen theme={theme} />, key: "notif" },
    { el: <InteractiveApp theme={theme} initialScreen="home" />, key: "home" },
    { el: <WidgetHomeScreen theme={theme} />, key: "widget" },
    { el: <InteractiveApp theme={theme} initialScreen="cancel-guide" />, key: "cancel" },
  ];
}

function StaggeredPhone({
  children,
  offset,
  delay,
  scrollProgress,
  className = "",
}: {
  children: React.ReactNode;
  offset: number;
  delay: number;
  scrollProgress: any;
  className?: string;
}) {
  const y = useTransform(scrollProgress, [0, 0.5, 1], [offset, offset * 0.3, 0]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 + offset }}
      animate={{ opacity: 1, y: offset }}
      transition={{
        duration: 0.8,
        delay: 1.5 + delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ y }}
      className={className}
    >
      <IphoneMockup scale={0.6}>
        {children}
      </IphoneMockup>
    </motion.div>
  );
}

function HeroPhones({
  screens,
  theme,
}: {
  screens: { el: React.ReactNode; key: string }[];
  theme: "light" | "dark";
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const offsets = [100, 50, 0, 50, 100];
  const delays = [0.15, 0.08, 0, 0.08, 0.15];

  return (
    <div ref={ref} className="mt-16">
      <div className="flex items-start justify-center gap-4 md:gap-6">
        {screens.map((s, i) => (
          <StaggeredPhone
            key={s.key}
            offset={offsets[i]}
            delay={delays[i]}
            scrollProgress={scrollYProgress}
            className="hidden sm:block first:hidden last:hidden lg:first:block lg:last:block"
          >
            {s.el}
          </StaggeredPhone>
        ))}
        {/* Mobile — only center phone */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="block sm:hidden"
        >
          <IphoneMockup scale={0.7}>
            <InteractiveApp theme={theme} initialScreen="home" />
          </IphoneMockup>
        </motion.div>
      </div>
    </div>
  );
}

export default function Hero() {
  const screens = useScreens();
  const { theme } = useMockupTheme();

  // Animation timeline:
  // 0s      - icon appears large in center (scale 2.5)
  // 0-0.8s  - icon shrinks to normal size, moves to its position
  // 0.6s    - title fades in
  // 0.9s    - subtitle + CTA fade in
  // 1.2s    - phones rise up

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
      {/* Background text */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <span className="select-none whitespace-nowrap text-[12rem] font-black uppercase tracking-tighter text-foreground/[0.03] sm:text-[16rem] md:text-[20rem]">
          Отмен<span style={{ color: 'rgba(107,142,99,0.08)' }}>Y</span>а
        </span>
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* App icon — starts large and centered, shrinks to position */}
        <motion.div
          initial={{ scale: 2.5, opacity: 0, y: 120 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{
            scale: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
            opacity: { duration: 0.4 },
            y: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
          }}
          className="mx-auto mb-8 flex items-center justify-center"
        >
          <LogoIcon size={80} />
        </motion.div>

        {/* Title — appears after icon settles */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Не дай забыть отменить триал.
          </h1>
        </motion.div>

        {/* Subtitle + CTA — staggered after title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl">
            Все подписки в одном приложении. Готовый скрипт отмены к каждому
            сервису. Никаких сюрпризов в день списания.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex justify-center"
        >
          <CTAButton size="lg" />
        </motion.div>

        {/* 5 iPhones — staggered, align on scroll */}
        <HeroPhones screens={screens} theme={theme} />
      </div>
    </section>
  );
}
