"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { IndustryProject } from "@/data/industry-content";

export function IndustryCaseStudies({ title, projects }: { title: string; projects: IndustryProject[] }) {
  const [selected, setSelected] = useState(0);
  if (!projects.length) return null;

  return (
    <section id="project-stories" aria-labelledby="project-stories-title" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-12 sm:px-6 sm:py-16">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700 dark:text-violet-300">Inside our {title.toLowerCase()} work</p>
          <h2 id="project-stories-title" className="mt-3 text-3xl font-semibold tracking-tight max-sm:text-[28px] sm:text-4xl">A real challenge.<br /><span className="bg-[linear-gradient(92deg,#38bdf8_0%,#8b5cf6_55%,#2dd4bf_100%)] bg-clip-text text-transparent">A considered solution.</span></h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">Explore each project to see the problem we tackled, what we built and the outcomes that followed.</p>
        </div>
        <Link href="/portfolio" className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-violet-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-500 dark:border-white/15">Explore our work <span aria-hidden="true">↗</span></Link>
      </div>

      <div role="group" aria-label="Choose a project" className="mt-8 grid gap-2 sm:grid-cols-3">
        {projects.map((project, index) => (
          <button
            key={project.title}
            id={`project-choice-${index}`}
            type="button"
            aria-pressed={selected === index}
            aria-controls={`project-story-${index}`}
            onClick={() => setSelected(index)}
            className={`flex min-w-0 items-center gap-3 rounded-xl border p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-500 ${selected === index ? "border-violet-300 bg-violet-50 text-violet-900 dark:border-violet-400/40 dark:bg-violet-400/10 dark:text-violet-200" : "border-slate-200 bg-[var(--surface)] text-[var(--muted)] hover:border-violet-300 dark:border-white/10 dark:hover:border-violet-400/40"}`}
          >
            <span aria-hidden="true" className="text-xs opacity-60">0{index + 1}</span>
            <span className="min-w-0 flex-1 text-sm font-semibold">{project.client}</span>
            <span aria-hidden="true">{selected === index ? "↗" : "→"}</span>
          </button>
        ))}
      </div>

      {projects.map((project, index) => (
        <article key={project.title} id={`project-story-${index}`} aria-labelledby={`project-choice-${index}`} hidden={selected !== index} className="mt-4 overflow-hidden rounded-3xl border border-slate-200 bg-[var(--surface)] dark:border-white/10">
          <div className="grid lg:grid-cols-[280px_minmax(0,1fr)]">
            <div className="border-b border-slate-200 bg-slate-50/70 p-5 dark:border-white/10 dark:bg-white/[0.02] sm:p-7 lg:border-b-0 lg:border-r">
              <div className="flex items-center gap-4 lg:block">
                <Image src={project.image} alt={`${project.client} project`} width={480} height={300} sizes="(min-width: 1024px) 224px, 80px" className="h-20 w-20 shrink-0 rounded-xl object-cover lg:aspect-[16/10] lg:h-auto lg:w-full" />
                <div className="min-w-0 lg:mt-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">{title} · {project.year}</p>
                  <h3 className="mt-2 text-lg font-semibold leading-snug">{project.title}</h3>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.stack.map((item) => <span key={item} className="rounded-full border border-slate-200 px-2.5 py-1 text-[10px] text-[var(--muted)] dark:border-white/10">{item}</span>)}
              </div>
            </div>

            <div className="min-w-0 p-5 sm:p-8">
              <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
                <div>
                  <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em]"><span aria-hidden="true" className="grid size-6 place-items-center rounded-full bg-rose-50 text-rose-700 dark:bg-rose-400/10 dark:text-rose-300">01</span>The problem</h4>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{project.problem}</p>
                </div>
                <div>
                  <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em]"><span aria-hidden="true" className="grid size-6 place-items-center rounded-full bg-violet-50 text-violet-700 dark:bg-violet-400/10 dark:text-violet-300">02</span>What we built</h4>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{project.summary}</p>
                </div>
              </div>
              <div className="mt-7 rounded-2xl border border-teal-200/70 bg-teal-50/60 p-4 dark:border-teal-400/15 dark:bg-teal-400/5 sm:p-5">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.16em] text-teal-800 dark:text-teal-300">03 / The outcome</h4>
                <dl className="mt-4 grid grid-cols-3 gap-3">
                  {project.results.map((result) => (
                    <div key={result.label} className="min-w-0">
                      <dt className="text-[10px] leading-relaxed text-[var(--muted)] sm:text-xs">{result.label}</dt>
                      <dd className="mt-1 font-display text-xl font-semibold tracking-tight text-teal-900 dark:text-teal-200 sm:text-3xl">{result.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
