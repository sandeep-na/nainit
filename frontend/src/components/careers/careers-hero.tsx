"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { jobs } from "@/data/site";
import { u } from "@/lib/images";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const AVATARS = [
  u("1573496359142-b8d87734a5a2", 100),
  u("1560250097-0b93528c311a", 100),
  u("1580489944761-15a19d654956", 100),
  u("1472099645785-5658abf4ff4e", 100),
];

export function CareersHero() {
  return (
    <section className="relative overflow-hidden pb-14 pt-32 sm:pt-40">
      {/* backdrop */}
      <div className="bg-[linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_90%_70%_at_50%_30%,black_40%,transparent_100%)] absolute inset-0" aria-hidden />
      <div
        className="absolute -top-32 left-1/2 aspect-[3/1] w-[90vw] max-w-3xl -translate-x-1/2 rounded-full bg-gradient-to-r from-sky-400/25 via-violet-500/25 to-teal-300/25 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
        {/* LEFT — copy */}
        <div>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-300">
              <span className="size-[0.5em] animate-pulse rounded-full bg-emerald-400" />
              We&apos;re hiring · {jobs.length} open roles
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-5 text-5xl font-extrabold leading-[1.05] sm:text-6xl"
          >
            Do the best work <span className="bg-[linear-gradient(92deg,#38bdf8_0%,#8b5cf6_55%,#2dd4bf_100%)] bg-clip-text text-transparent">of your career.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-5 max-w-xl text-lg text-slate-600 dark:text-slate-400"
          >
            Senior-only team, remote-first culture, zero politics. Real ownership from week one —
            and a hiring process that respects your time.
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="mt-8 flex flex-wrap gap-3">
            <Button href="#open-roles">Explore open roles ↓</Button>
            <Button href="#culture" variant="ghost">Life at NainIT</Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500"
          >
            <span className="flex items-center">
              {AVATARS.map((a, i) => (
                <Image
                  key={a}
                  src={a}
                  alt="NainIT teammate"
                  width={32}
                  height={32}
                  className="size-8 rounded-full border-2 border-white object-cover dark:border-[#060a18]"
                  style={{ marginLeft: i === 0 ? 0 : -10, zIndex: AVATARS.length - i }}
                  loading="lazy"
                />
              ))}
              <span className="ml-2.5 font-medium">Joined by 40+ engineers & designers</span>
            </span>
            <span className="hidden h-4 w-px bg-slate-300 sm:block dark:bg-white/15" aria-hidden />
            <span>
              <span className="text-amber-400">★★★★★</span> <strong className="text-current">4.9</strong> employee rating
            </span>
          </motion.div>
        </div>

        {/* RIGHT — collage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-lg lg:max-w-none"
        >
          <div className="img-sheen overflow-hidden rounded-3xl border border-slate-200/70 shadow-2xl shadow-violet-500/10 dark:border-white/10">
            <Image
              src={u("1497366811353-6870744d04b2", 1200)}
              alt="Inside the NainIT studio"
              width={900}
              height={700}
              className="aspect-[9/8] h-auto w-full object-cover sm:aspect-[4/3]"
              priority
            />
          </div>

          {/* floating card — offer speed */}
          <div className="absolute -right-2 top-6 rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-3 shadow-xl shadow-sky-500/10 backdrop-blur-md sm:-right-5 dark:border-white/10 dark:bg-[#0c1330]/90">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">Time to offer</div>
            <div className="font-display text-xl font-extrabold bg-[linear-gradient(92deg,#38bdf8_0%,#8b5cf6_55%,#2dd4bf_100%)] bg-clip-text text-transparent">5 days max</div>
          </div>

          {/* floating card — remote */}
          <div className="absolute -left-2 bottom-20 flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-3 shadow-xl shadow-violet-500/10 backdrop-blur-md sm:-left-5 dark:border-white/10 dark:bg-[#0c1330]/90">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-sm font-bold text-white">
              ✓
            </span>
            <div>
              <div className="text-sm font-bold">Remote-first</div>
              <div className="text-xs text-slate-500">Async by default</div>
            </div>
          </div>

          {/* floating card — team photo */}
          <div className="absolute -bottom-8 right-6 hidden w-44 overflow-hidden rounded-2xl border-4 border-white shadow-xl sm:block dark:border-[#0c1330]">
            <Image
              src={u("1522071820081-009f0129c71c", 500)}
              alt="Team collaborating"
              width={352}
              height={240}
              className="aspect-[3/2] h-auto w-full object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>

      {/* hiring-teams strip */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={5}
        className="relative mx-auto mt-14 flex w-full max-w-7xl flex-wrap items-center gap-2 px-4 sm:px-6"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Hiring in</span>
        {["Engineering", "AI Lab", "Design", "Platform", "Delivery"].map((t) => (
          <a
            key={t}
            href="#open-roles"
            className="rounded-full border border-slate-200/70 bg-white/60 px-3.5 py-1.5 text-xs font-semibold transition-colors hover:border-sky-400 hover:text-sky-500 dark:border-white/10 dark:bg-white/[0.04]"
          >
            {t}
          </a>
        ))}
      </motion.div>
    </section>
  );
}
