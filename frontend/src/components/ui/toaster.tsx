"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Toast {
  id: number;
  message: string;
}

let pushToast: (msg: string) => void = () => {};

export function toast(message: string) {
  pushToast(message);
}

export function Toaster() {
  const [items, setItems] = useState<Toast[]>([]);

  useEffect(() => {
    pushToast = (message: string) => {
      const id = Date.now() + Math.random();
      setItems((prev) => [...prev, { id, message }]);
      setTimeout(() => setItems((prev) => prev.filter((t) => t.id !== id)), 3600);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2" aria-live="polite">
      <AnimatePresence>
        {items.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.95 }}
            className="rounded-xl border border-white/10 bg-[#0a1128]/95 px-5 py-3 text-sm font-medium text-white shadow-2xl backdrop-blur"
          >
            <span className="mr-2 inline-block size-[0.5em] rounded-full bg-emerald-400" />
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4" role="status" aria-label="Loading">
      <div className="font-display text-2xl font-bold">
        Nain<span className="bg-[linear-gradient(92deg,#38bdf8_0%,#8b5cf6_55%,#2dd4bf_100%)] bg-clip-text text-transparent">IT</span>
      </div>
      <div className="h-[0.35em] w-[11em] overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
        <motion.div
          className="h-full w-1/2 rounded-full bg-gradient-to-r from-sky-400 to-violet-500"
          animate={{ x: [-80, 180] }}
          transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
