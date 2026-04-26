"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import IphoneMockup from "./IphoneMockup";
import { useMockupTheme } from "./MockupThemeContext";
import Section from "./Section";
import { HomeScreen } from "./app-screens/HomeScreen";
import { AnalyticsScreen } from "./app-screens/AnalyticsScreen";
import { ArchiveScreen } from "./app-screens/ArchiveScreen";

export default function FeatureScroll() {
  const { theme } = useMockupTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const y3 = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <Section
      id="features"
      label="Возможности"
      title="Приложение не похожее на другие"
    >
      <div ref={containerRef} className="flex items-start justify-center gap-4 md:gap-8">
        <motion.div style={{ y: y1 }} className="hidden md:block">
          <IphoneMockup scale={0.7}>
            <HomeScreen theme={theme} />
          </IphoneMockup>
        </motion.div>
        <motion.div style={{ y: y2 }}>
          <IphoneMockup scale={0.7}>
            <AnalyticsScreen theme={theme} />
          </IphoneMockup>
        </motion.div>
        <motion.div style={{ y: y3 }} className="hidden md:block">
          <IphoneMockup scale={0.7}>
            <ArchiveScreen theme={theme} />
          </IphoneMockup>
        </motion.div>
      </div>
    </Section>
  );
}
