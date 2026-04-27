"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Drawer } from "vaul";
import { LogoIcon } from "./Logo";
import { CTAButton } from "./CTAButtons";

const navLinks = [
  { label: "Возможности", href: "#features" },
  { label: "Цены", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <div
        className="flex h-14 w-full max-w-3xl items-center justify-between rounded-full px-3 transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(255, 255, 255, 0.55)"
            : "rgba(255, 255, 255, 0.35)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.6)",
          boxShadow: scrolled
            ? "0 4px 30px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255,255,255,0.6)"
            : "0 2px 20px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255,255,255,0.5)",
        }}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 pl-1">
          <LogoIcon size={36} />
          <span className="text-base font-bold tracking-tight text-foreground">
            ОтменYа
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <Drawer.Root direction="right">
            <Drawer.Trigger asChild>
              <button className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/40 transition-colors">
                <Menu className="h-5 w-5 text-foreground" />
              </button>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40" />
              <Drawer.Content className="fixed top-0 right-0 bottom-0 z-50 flex w-[300px] flex-col bg-background p-6">
                <div className="mb-8 flex items-center justify-between">
                  <span className="text-lg font-bold">ОтменYа</span>
                  <Drawer.Close asChild>
                    <button className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-muted">
                      <X className="h-5 w-5" />
                    </button>
                  </Drawer.Close>
                </div>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Drawer.Close key={link.href} asChild>
                      <a
                        href={link.href}
                        className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                      >
                        {link.label}
                      </a>
                    </Drawer.Close>
                  ))}
                </nav>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>
      </div>
    </header>
  );
}
