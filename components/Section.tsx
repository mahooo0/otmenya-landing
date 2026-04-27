"use client";

import { motion } from "framer-motion";

interface SectionProps {
  id?: string;
  label?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  align?: "center" | "left";
}

export default function Section({
  id,
  label,
  title,
  subtitle,
  children,
  className = "",
  align = "center",
}: SectionProps) {
  return (
    <section id={id} className={`py-20 md:py-32 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(label || title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className={`mb-12 md:mb-16 ${
              align === "center" ? "text-center" : "text-left"
            }`}
          >
            {label && (
              <p className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-primary/60">
                {label}
              </p>
            )}
            {title && (
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
