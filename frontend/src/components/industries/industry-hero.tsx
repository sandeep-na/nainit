import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { IndustryIcon } from "@/components/common/industry-icons";
import type { Industry } from "@/types";
import type { IndustryContent } from "@/data/industry-content";
import styles from "./industry-hero.module.css";

export function IndustryHero({ industry, content }: { industry: Industry; content: IndustryContent }) {
  const { hero } = content;

  return (
    <section
      aria-labelledby="industry-title"
      className={`${styles.hero} relative isolate bg-[var(--bg)] text-[var(--ink)]`}
      style={{ "--industry-accent": hero.accent } as CSSProperties}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_85%_40%,#8b5cf60c,transparent_55%),radial-gradient(ellipse_at_10%_80%,#14b8a609,transparent_50%)]" />
      <div className={`${styles.inner} mx-auto w-full max-w-7xl px-5 sm:px-8`}>
        <nav aria-label="Breadcrumb" className="flex items-center gap-3 text-xs text-[var(--muted)]">
          <Link href="/industries" className="rounded-sm hover:text-violet-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-500 dark:hover:text-violet-300">Industries</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-[var(--ink)]">{industry.title}</span>
        </nav>

        <div className={`${styles.main} grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_260px] lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16`}>
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300 sm:text-xs">
              <span className="grid size-8 place-items-center rounded-lg border border-violet-200 bg-violet-50 dark:border-violet-400/20 dark:bg-violet-400/10">
                <IndustryIcon slug={industry.slug} className="size-4" />
              </span>
              {industry.title} / Reimagined
            </div>
            <h1 id="industry-title" className={`${styles.title} mt-4 font-semibold tracking-[-0.055em]`}>
              {hero.headline}
              <span className="mt-1 block bg-[linear-gradient(92deg,#38bdf8_0%,#8b5cf6_55%,#2dd4bf_100%)] bg-clip-text text-transparent">{hero.highlight}</span>
            </h1>
            <p className={`${styles.description} mt-4 max-w-xl text-[var(--muted)]`}>{industry.description}</p>
            <div className={`${styles.actions} mt-6 flex flex-wrap items-center gap-x-6 gap-y-2`}>
              <Link href="/contact" className="inline-flex items-center gap-5 rounded-full bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/15 transition-colors hover:bg-violet-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-500">
                Let’s build together <span aria-hidden="true">↗</span>
              </Link>
              <a href="#capabilities" className="inline-flex items-center gap-2 py-3 text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-500">
                Explore solutions <span aria-hidden="true">↓</span>
              </a>
            </div>
            <div className={`${styles.badges} mt-5 flex flex-wrap gap-x-5 gap-y-2`}>
              {content.badges.slice(0, 3).map((badge) => (
                <span key={badge} className="flex items-center gap-2 text-[11px] text-[var(--muted)]">
                  <span aria-hidden="true" className="text-teal-600 dark:text-teal-300">✓</span>{badge}
                </span>
              ))}
            </div>
          </div>

          <aside aria-label={`${industry.title} focus`} className={`${styles.visual} relative hidden md:block`}>
            <div aria-hidden="true" className="absolute -inset-3 rotate-3 rounded-3xl border border-violet-300/40 dark:border-violet-400/20" />
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-[var(--surface)] shadow-xl shadow-slate-900/5 dark:border-white/10">
              <div className="flex items-center justify-between px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                <span>Built around your world</span>
                <span aria-hidden="true" className="size-1.5 rounded-full bg-teal-500" />
              </div>
              <Image src={industry.image} alt={`${industry.title} industry`} width={640} height={360} priority sizes="(min-width: 1024px) 320px, 260px" className={`${styles.image} aspect-video w-full object-cover`} />
              <div className="p-5">
                <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-violet-700 dark:text-violet-300">People. Platforms. Possibilities.</span>
                <p className="mt-2 text-xl font-medium leading-snug">{hero.imageLabel}</p>
                <div className="mt-4 flex items-center gap-3 border-t border-slate-200 pt-4 dark:border-white/10">
                  <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full bg-[var(--industry-accent)] text-slate-900">↗</span>
                  <p className="text-xs text-[var(--muted)]"><strong className="mr-1.5 text-base text-[var(--ink)]">{industry.kpis[0]?.value}</strong>{industry.kpis[0]?.label}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className={`${styles.metrics} grid gap-4 border-t border-slate-200/80 pt-5 sm:grid-cols-[1fr_3fr] sm:gap-8 dark:border-white/10`}>
          <p className="hidden text-xs leading-relaxed text-[var(--muted)] sm:block"><span className="block font-semibold uppercase tracking-[0.16em] text-[var(--ink)]">Built for impact</span><span className="mt-1 block">Outcomes that matter.</span></p>
          <dl className="grid grid-cols-3 gap-3 sm:gap-6">
            {industry.kpis.map((kpi) => (
              <div key={kpi.label} className="border-l border-slate-200 pl-3 dark:border-white/10 sm:pl-6">
                <dt className="text-[10px] leading-relaxed text-[var(--muted)] sm:text-xs">{kpi.label}</dt>
                <dd className="mt-1 font-display text-[clamp(1.3rem,2.5vw,2rem)] font-semibold tracking-tight">{kpi.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
