"use client";

import { useState } from "react";
import { X, Send, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LogoIcon } from "./Logo";

interface BookingDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function BookingDialog({ open, onClose }: BookingDialogProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setError("Не удалось отправить. Попробуй ещё раз.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setEmail("");
      setSubmitted(false);
    }, 300);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100]"
            style={{
              background: "rgba(0,0,0,0.4)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
            onClick={handleClose}
          />

          {/* Dialog centering wrapper */}
          <div
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            onClick={handleClose}
          >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative w-full max-w-md rounded-3xl p-8"
              style={{
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(40px) saturate(180%)",
                WebkitBackdropFilter: "blur(40px) saturate(180%)",
                border: "1px solid rgba(255,255,255,0.6)",
                boxShadow: "0 24px 80px rgba(0,0,0,0.15), 0 8px 24px rgba(0,0,0,0.1)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full hover:bg-black/5 transition-colors"
              >
                <X size={18} className="text-foreground/60" />
              </button>

              {!submitted ? (
                <>
                  {/* Logo */}
                  <div className="flex justify-center mb-6">
                    <LogoIcon size={56} />
                  </div>

                  <h2 className="text-2xl font-bold tracking-tight text-center mb-2">
                    Забронируй ранний доступ
                  </h2>
                  <p className="text-sm text-muted-foreground text-center mb-8">
                    Мы отправим письмо когда приложение будет готово к скачиванию.
                    Первые 100 пользователей получат Pro бесплатно.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="твой@email.com"
                        className="w-full h-12 rounded-xl border border-border bg-white/60 px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                      />
                    </div>
                    {error && <p className="text-red-500 text-xs text-center">{error}</p>}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-medium text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                      {loading ? "Отправляем..." : <><Send size={16} /> Забронировать</>}
                    </button>
                  </form>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Без спама. Только одно письмо когда откроется TestFlight.
                  </p>
                </>
              ) : (
                /* Success state */
                <div className="text-center py-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, delay: 0.1 }}
                    className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
                  >
                    <Check size={28} className="text-green-600" />
                  </motion.div>
                  <h2 className="text-2xl font-bold tracking-tight mb-2">
                    Готово!
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Мы отправим письмо на <strong>{email}</strong> когда
                    приложение будет доступно для скачивания.
                  </p>
                  <button
                    onClick={handleClose}
                    className="h-10 rounded-xl border border-border px-6 text-sm font-medium hover:bg-muted transition-colors"
                  >
                    Закрыть
                  </button>
                </div>
              )}
            </div>
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
