"use client";

import { useState, useRef } from "react";
import { LogoIcon } from "./Logo";

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function AdminPanel({ onClose }: { onClose: () => void }) {
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [stats, setStats] = useState<{ count: number; emails: string[] } | null>(null);

  const loadStats = async () => {
    const res = await fetch("/api/book");
    const data = await res.json();
    setStats(data);
  };

  const sendLaunch = async () => {
    if (!secret) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/launch-notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret }),
      });
      const data = await res.json();
      if (data.success) {
        setResult(`Отправлено ${data.sent} писем!`);
      } else {
        setResult(`Ошибка: ${data.error}`);
      }
    } catch {
      setResult("Ошибка сети");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-[201] flex items-center justify-center p-4">
        <div
          className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">Admin Panel</h2>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-xl">&times;</button>
          </div>

          {/* Stats */}
          <button
            onClick={loadStats}
            className="w-full mb-4 h-10 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
          >
            Загрузить статистику
          </button>

          {stats && (
            <div className="mb-4 p-4 rounded-lg bg-muted text-sm">
              <p className="font-bold text-lg text-green-600 mb-1">{stats.count} подписчиков</p>
              <div className="max-h-32 overflow-y-auto space-y-1">
                {stats.emails.map((e, i) => (
                  <p key={i} className="text-muted-foreground text-xs">{e}</p>
                ))}
              </div>
            </div>
          )}

          {/* Launch */}
          <div className="border-t border-border pt-4 mt-4">
            <p className="text-sm font-bold text-red-500 mb-2">🚀 Запустить рассылку</p>
            <p className="text-xs text-muted-foreground mb-3">
              Все подписчики получат письмо &quot;Мы запустились!&quot;
            </p>
            <input
              type="password"
              placeholder="Секретный ключ"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              className="w-full h-10 rounded-lg border border-border px-3 text-sm mb-3"
            />
            <button
              onClick={sendLaunch}
              disabled={loading || !secret}
              className="w-full h-10 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 disabled:opacity-50 transition-colors"
            >
              {loading ? "Отправляем..." : "Отправить всем"}
            </button>
            {result && (
              <p className="mt-2 text-sm text-center font-medium">{result}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default function Footer() {
  const [taps, setTaps] = useState(0);
  const [showAdmin, setShowAdmin] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLogoTap = () => {
    const newTaps = taps + 1;
    setTaps(newTaps);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setTaps(0), 3000);

    if (newTaps >= 15) {
      setShowAdmin(true);
      setTaps(0);
    }
  };

  return (
    <>
      <footer className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            {/* Logo — tap 15 times for admin */}
            <div
              className="flex items-center gap-2 cursor-pointer select-none"
              onClick={handleLogoTap}
            >
              <LogoIcon size={32} />
              <span className="text-lg font-bold tracking-tight">ОтменYа</span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6">
              <a href="#pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Цены</a>
              <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Контакты</a>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted">
                <TelegramIcon className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted">
                <XIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-8 text-center">
            <p className="text-xs text-muted-foreground">Все права защищены.</p>
          </div>
        </div>
      </footer>

      {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}
    </>
  );
}
