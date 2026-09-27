"use client";
import { motion } from "framer-motion";

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "center",
}: {
  eyebrow: string;
  title: React.ReactNode;
  copy?: string;
  align?: "center" | "left";
}) {
  const centered = align === "center";
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-300">
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-bold max-sm:text-[28px] sm:text-4xl">{title}</h2>
      {copy && <p className="mt-3 text-slate-600 dark:text-slate-400">{copy}</p>}
    </motion.div>
  );
}
