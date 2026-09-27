"use client";
import { motion } from "framer-motion";

export function PageHero({ eyebrow, title, copy }: { eyebrow: string; title: React.ReactNode; copy?: string }) {
  return (
    <section className="relative overflow-hidden pb-14 pt-32 sm:pt-36">
      <div className="bg-[linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_90%_70%_at_50%_30%,black_40%,transparent_100%)] absolute inset-0" aria-hidden />
      <div className="absolute left-1/2 top-0 aspect-[3/1] w-[84vw] max-w-[42rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-gradient-to-r from-sky-400/25 via-violet-500/25 to-teal-300/25 blur-3xl" aria-hidden />
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-4xl px-4 text-center sm:px-6"
      >
        <span className="inline-flex rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-300">
          {eyebrow}
        </span>
        <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">{title}</h1>
        {copy && <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-400">{copy}</p>}
      </motion.div>
    </section>
  );
}
