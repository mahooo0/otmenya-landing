"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import IphoneMockup from "./IphoneMockup";
import { useMockupTheme } from "./MockupThemeContext";
import { ArchiveScreen } from "./app-screens/ArchiveScreen";
import { AddSubScreen } from "./app-screens/AddSubScreen";
import { HomeScreen } from "./app-screens/HomeScreen";
import { AnalyticsScreen } from "./app-screens/AnalyticsScreen";
import { motion } from "framer-motion";

const benefits = [
  { text: "Экономь до 24 000 ₽ в год на забытых подписках.", Screen: ArchiveScreen },
  { text: "Все подписки СНГ в одном месте.", Screen: AddSubScreen },
  { text: "Один тап — отмена любого сервиса.", Screen: HomeScreen },
  { text: "Контроль расходов без банковских данных.", Screen: AnalyticsScreen },
];

export default function Benefits() {
  const { theme: mockupTheme } = useMockupTheme();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.querySelector<HTMLElement>("[data-card]");
    const cardWidth = card ? card.offsetWidth + 16 : 400;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section id="benefits">
      <div className="sm:py-20 py-12 bg-muted relative">
        {/* Header */}
        <div className="text-center space-y-4 pb-10 mx-auto">
          <motion.h2
            className="text-sm text-primary text-balance font-mono font-semibold tracking-wider uppercase"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Преимущества
          </motion.h2>
          <motion.h3
            className="mx-0 mt-4 max-w-lg text-5xl text-balance font-bold sm:max-w-none sm:text-4xl md:text-5xl lg:text-6xl leading-[1.2] tracking-tighter text-foreground lowercase"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Что ты получишь с ОтменYа
          </motion.h3>
        </div>

        {/* Horizontal scroll */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* Left spacer */}
          <div className="hidden md:block flex-shrink-0 w-16 lg:w-24 xl:w-32 snap-start" aria-hidden="true" />

          {benefits.map((benefit, i) => {
            const Screen = benefit.Screen;
            return (
              <div
                key={i}
                data-card
                className="flex-shrink-0 snap-center md:snap-start select-none px-3"
                style={{ width: 380 }}
              >
                {/* Phone container — fixed height, overflow hidden at bottom */}
                <div className="relative" style={{ height: 580, overflow: "hidden", borderRadius: 16 }}>
                  <div
                    className="flex justify-center transition-all duration-500 ease-out cursor-pointer"
                    style={{ paddingTop: 40 }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-20px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0px)";
                    }}
                  >
                    <IphoneMockup scale={0.8}>
                      <Screen theme={mockupTheme} />
                    </IphoneMockup>
                  </div>
                  {/* Bottom fade */}
                  <div
                    className="absolute inset-x-0 bottom-0 pointer-events-none"
                    style={{
                      height: 160,
                      background: "linear-gradient(to top, hsl(var(--muted)), hsl(var(--muted)) 15%, transparent)",
                    }}
                  />
                </div>
                {/* Text */}
                <div className="mt-4">
                  <h2 className="text-balance text-xl tracking-tight font-semibold leading-[1.25] text-left text-foreground/80">
                    {benefit.text}
                  </h2>
                </div>
              </div>
            );
          })}

          {/* Right spacer */}
          <div className="hidden md:block flex-shrink-0 w-16 lg:w-24 xl:w-32 snap-start" aria-hidden="true" />
        </div>

        {/* Arrows */}
        <div className="flex justify-center md:justify-end mt-4 md:mt-8 md:pr-32">
          <div className="flex gap-4">
            <button
              onClick={() => scroll("left")}
              className="inline-flex items-center justify-center border border-input bg-background hover:bg-accent hover:text-accent-foreground size-8 rounded-full transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="inline-flex items-center justify-center border border-input bg-background hover:bg-accent hover:text-accent-foreground size-8 rounded-full transition-colors"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
