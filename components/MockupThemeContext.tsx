"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { Moon, Sun } from "lucide-react";

type MockupTheme = "light" | "dark";

const MockupThemeContext = createContext<{
  theme: MockupTheme;
  toggle: () => void;
}>({ theme: "dark", toggle: () => {} });

export function MockupThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<MockupTheme>("dark");
  const toggle = useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), []);
  return (
    <MockupThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </MockupThemeContext.Provider>
  );
}

export function useMockupTheme() {
  return useContext(MockupThemeContext);
}

export function MockupThemeToggle() {
  const { theme, toggle } = useMockupTheme();
  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300"
      style={{
        background: theme === "dark" ? "#1a1a1a" : "#fff",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(0,0,0,0.12)",
        color: theme === "dark" ? "#fff" : "#000",
        boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
      }}
      aria-label="Переключить тему мокапов"
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      <span>{theme === "dark" ? "Светлая" : "Тёмная"}</span>
    </button>
  );
}
