import Link from "next/link";
import type { IndustryContent } from "@/data/industry-content";

export function IndustryWorkflow({ title, workflow }: { title: string; workflow: IndustryContent["workflow"] }) {
  return (
    <section aria-labelledby="workflow-title" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-violet-50/80 via-[var(--surface)] to-teal-50/50 p-5 dark:border-white/10 dark:from-violet-500/5 dark:to-teal-500/5 sm:p-8 lg:p-10">
        <div className="grid items-end gap-5 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-300">The everyday difference</p>
            <h2 id="workflow-title" className="mt-3 text-3xl font-semibold tracking-tight max-sm:text-[28px] sm:text-4xl">Less friction.<br /><span className="bg-[linear-gradient(92deg,#38bdf8_0%,#8b5cf6_55%,#2dd4bf_100%)] bg-clip-text text-transparent">A better way to work.</span></h2>
          </div>
          <p className="max-w-lg text-sm leading-relaxed text-[var(--muted)]">What can change for your {title.toLowerCase()} team? Here’s how our solutions connect the everyday tasks that slow people down.</p>
        </div>

        <div className="mt-8 space-y-3">
          {workflow.map((item, index) => (
            <article key={item.title} className="grid gap-4 rounded-2xl border border-slate-200/80 bg-[var(--surface)] p-5 dark:border-white/10 md:grid-cols-[0.75fr_1fr_1.2fr] md:gap-6 sm:p-6">
              <h3 className="flex items-start gap-3 text-sm font-semibold"><span aria-hidden="true" className="font-mono text-xs text-violet-500">0{index + 1}</span>{item.title}</h3>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">Before / The friction</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.before}</p>
              </div>
              <div className="border-t border-teal-100 pt-4 dark:border-teal-400/15 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-teal-700 dark:text-teal-300">After / With our solution</p>
                <p className="mt-2 text-sm leading-relaxed">{item.after}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6 dark:border-white/10">
          <p className="text-sm text-[var(--muted)]">Start with the workflow that costs your team the most time.</p>
          <Link href="/contact" className="rounded-full bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-500">Let’s map your workflow <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>
  );
}
