"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IndustryHero } from "@/components/industries/industry-hero";
import { Reveal } from "@/components/common/reveal";
import { CtaBanner } from "@/components/common/cta-banner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IndustryIcon } from "@/components/common/industry-icons";
import { industries } from "@/data/industries";
import type { IndustryContent } from "@/data/industry-content";
import type { Industry } from "@/types";
import { IndustryCaseStudies } from "@/components/industries/industry-case-studies";
import { IndustryWorkflow } from "@/components/industries/industry-workflow";
import { ExpandableText } from "@/components/ui/expandable-text";

export function IndustryDetail({ industry: ind, content }: { industry: Industry; content: IndustryContent }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <IndustryHero industry={ind} content={content} />

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6">
        {/* Overview */}
        {content && (
          <div className="mt-8 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
            <Reveal className="h-full">
              <Card className="h-full w-full">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-sky-500 to-violet-600 text-white">
                    <IndustryIcon slug={ind.slug} className="size-6" />
                  </span>
                  <h2 className="line-clamp-2 text-lg font-bold">Our work in {ind.title.toLowerCase()}</h2>
                </div>
                {content.overview.map((p) => (
                  <p key={p.slice(0, 24)} className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {p}
                  </p>
                ))}
                <p className="mt-3 line-clamp-2 text-sm font-medium text-sky-600 dark:text-sky-300">{ind.tagline}</p>
              </Card>
            </Reveal>
            <Reveal delay={0.08} className="h-full">
              <Card className="h-full w-full">
                <h2 className="font-bold">Challenges we solve</h2>
                <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  {ind.challenges.map((c) => (
                    <li key={c} className="flex gap-2">
                      <span className="shrink-0 text-rose-400">✕</span>
                      <span className="min-w-0">{c}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 border-t border-slate-200/70 pt-4 dark:border-white/10">
                  <h2 className="font-bold">How we deliver</h2>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    {ind.solutions.map((s) => (
                      <li key={s} className="flex gap-2">
                        <span className="shrink-0 text-emerald-400">✓</span>
                        <span className="min-w-0">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </Reveal>
          </div>
        )}
      </section>

      {content && (
        <>
          {/* BG IMAGE SECTION 1 */}
          <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl">
                <Image
                  src={ind.image}
                  alt=""
                  aria-hidden
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#060a18]/95 via-[#0a1128]/85 to-[#0a1128]/40" />
                <div className="relative grid gap-8 p-8 sm:p-12 lg:grid-cols-2">
                  <div>
                    <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky-200">
                      Why NainIT for {ind.title}
                    </span>
                    <h2 className="mt-4 text-3xl font-extrabold text-white max-sm:text-[28px] sm:text-4xl">
                      {content.banner1Title}
                    </h2>
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-300">
                      {content.banner1Copy}
                    </p>
                    <div className="mt-6">
                      <Button href="/contact">Discuss your {ind.title.toLowerCase()} project →</Button>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center gap-3">
                    {content.banner1Points.map((pt, i) => (
                      <Reveal key={pt} delay={i * 0.06}>
                        <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-sm font-bold text-white">
                            ✓
                          </span>
                          <span className="text-sm font-semibold text-white">{pt}</span>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          {/* CAPABILITIES */}
          <section id="capabilities" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-10 sm:px-6">
            <Reveal className="text-center">
              <span className="inline-flex rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-300">
                Capabilities
              </span>
              <h2 className="mt-3 text-3xl font-extrabold max-sm:text-[28px] sm:text-4xl">
                Everything {ind.title.toLowerCase()} needs, <span className="bg-[linear-gradient(92deg,#38bdf8_0%,#8b5cf6_55%,#2dd4bf_100%)] bg-clip-text text-transparent">under one roof.</span>
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {content.capabilities.map((c, i) => (
                <Reveal variant="scale" key={c.title} delay={(i % 3) * 0.07} className="h-full">
                  <Card hoverEffect="spotlight" className="flex h-full flex-col">
                    <div className="font-display text-sm font-bold text-sky-500">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="mt-2 line-clamp-1 font-bold">{c.title}</h3>
                    <ExpandableText text={c.copy} lines={2} className="mt-1.5" />
                  </Card>
                </Reveal>
              ))}
            </div>
          </section>

          {/* OFFERINGS */}
          <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <div className="grid gap-5 md:grid-cols-2">
              {content.offerings.map((o, i) => (
                <Reveal key={o.title} delay={i * 0.08} className="h-full">
                  <Card hoverEffect="border" className="flex h-full w-full flex-col">
                    <h3 className="line-clamp-2 text-lg font-bold">{o.title}</h3>
                    <ul className="mt-4 space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
                      {o.points.map((p) => (
                        <li key={p} className="flex gap-2">
                          <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-xs font-bold text-emerald-500">
                            ✓
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </Reveal>
              ))}
            </div>
          </section>

          <IndustryCaseStudies key={ind.slug} title={ind.title} projects={content.projects} />
          <IndustryWorkflow title={ind.title} workflow={content.workflow} />

          {/* PROCESS */}
          <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <Reveal className="text-center">
              <h2 className="text-3xl font-extrabold max-sm:text-[28px] sm:text-4xl">
                How we <span className="bg-[linear-gradient(92deg,#38bdf8_0%,#8b5cf6_55%,#2dd4bf_100%)] bg-clip-text text-transparent">deliver.</span>
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600 dark:text-slate-400">
                Start with a focused pilot. Measure the impact, then scale with confidence.
              </p>
            </Reveal>
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {content.process.map((s, i) => (
                <Reveal variant="rise" key={s.title} delay={i * 0.07} className="h-full">
                  <Card hoverEffect="underline" className="relative flex h-full flex-col overflow-hidden">
                    <div className="pointer-events-none absolute -right-2 -top-4 font-display text-7xl font-extrabold text-slate-100 dark:text-white/5">
                      {i + 1}
                    </div>
                    <div className="relative">
                      <span className="inline-flex rounded-full bg-gradient-to-r from-sky-500 to-violet-500 px-3 py-1 text-xs font-bold text-white">
                        Step {i + 1}
                      </span>
                      <h3 className="mt-3 line-clamp-1 font-bold">{s.title}</h3>
                      <ExpandableText text={s.copy} lines={2} className="mt-1.5" />
                    </div>
                  </Card>
                </Reveal>
              ))}
            </div>
          </section>

          {/* BG IMAGE SECTION 2 — testimonial / outcome banner */}
          <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl">
                <Image
                  src={content.projects[0]?.image ?? ind.image}
                  alt=""
                  aria-hidden
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-violet-950/95 via-[#0a1128]/90 to-sky-950/70" />
                <div className="relative grid gap-8 p-8 sm:p-12 lg:grid-cols-[1.3fr_1fr]">
                  <div>
                    <div className="flex gap-1 text-amber-400" aria-label="5 star rating">
                      {"★★★★★"}
                    </div>
                    <blockquote className="mt-4 text-xl font-semibold leading-relaxed text-white sm:text-2xl">
                      “{content.testimonial.quote}”
                    </blockquote>
                    <div className="mt-4 text-sm text-slate-300">
                      <span className="font-bold text-white">{content.testimonial.name}</span> ·{" "}
                      {content.testimonial.role}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md">
                    <h3 className="text-lg font-bold text-white">{content.banner2Title}</h3>
                    <p className="mt-2 text-sm text-slate-300">{content.banner2Copy}</p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Button href="/portfolio">See {ind.title.toLowerCase()} work →</Button>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          {/* FAQ */}
          <section className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
            <Reveal className="text-center">
              <h2 className="text-3xl font-extrabold max-sm:text-[28px]">
                {ind.title} <span className="bg-[linear-gradient(92deg,#38bdf8_0%,#8b5cf6_55%,#2dd4bf_100%)] bg-clip-text text-transparent">FAQs.</span>
              </h2>
            </Reveal>
            <div className="mt-6 space-y-3">
              {content.faqs.map((f, i) => {
                const open = openFaq === i;
                return (
                  <Reveal key={f.q} delay={i * 0.05}>
                    <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white bg-[radial-gradient(ellipse_at_100%_0%,#cee6fc93,transparent_65%),linear-gradient(145deg,#e0f3ff7a,#f8f9fff0_80%)] dark:border-white/10 dark:bg-[#0c1530] dark:bg-[radial-gradient(ellipse_at_100%_0%,#cee6fc1a,transparent_70%),linear-gradient(140deg,#111e3b,#0c1429)]">
                      <button
                        onClick={() => setOpenFaq(open ? null : i)}
                        className="flex w-full items-center justify-between gap-4 p-5 text-left"
                        aria-expanded={open}
                      >
                        <span className="text-sm font-bold sm:text-base">{f.q}</span>
                        <span
                          className={`grid size-8 shrink-0 place-items-center rounded-full border transition-transform duration-300 ${
                            open ? "rotate-45 border-sky-400 text-sky-500" : "border-slate-300 dark:border-white/15"
                          }`}
                        >
                          +
                        </span>
                      </button>
                      <div
                        className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                      >
                        <div className="overflow-hidden">
                          <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                            {f.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </section>

          {/* OTHER INDUSTRIES */}
          <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
            <Reveal className="flex flex-wrap items-end justify-between gap-3">
              <h2 className="text-2xl font-extrabold max-sm:text-[28px]">
                Explore other <span className="bg-[linear-gradient(92deg,#38bdf8_0%,#8b5cf6_55%,#2dd4bf_100%)] bg-clip-text text-transparent">industries.</span>
              </h2>
              <Link
                href="/industries"
                className="active:scale-[0.96] rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold dark:border-white/15"
              >
                All industries →
              </Link>
            </Reveal>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {industries
                .filter((x) => x.slug !== ind.slug)
                .slice(0, 5)
                .map((x, i) => (
                  <Reveal variant="slide" key={x.slug} delay={i * 0.05} className="h-full">
                    <Link
                      href={`/industries/${x.slug}`}
                      className="group flex h-full w-full flex-col rounded-2xl border border-slate-200/70 bg-white p-4 transition-all duration-300 hover:translate-x-1 hover:border-[#38bdf880] max-sm:p-3 dark:border-white/10 dark:bg-[#0c1530]"
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-sky-500/15 to-violet-500/15 text-sky-500">
                        <IndustryIcon slug={x.slug} />
                      </span>
                      <div className="mt-3 line-clamp-1 text-sm font-bold group-hover:text-violet-400">{x.title}</div>
                      <div className="mt-1 line-clamp-2 text-xs text-slate-500">{x.tagline}</div>
                    </Link>
                  </Reveal>
                ))}
            </div>
          </section>
        </>
      )}

      <CtaBanner />
    </>
  );
}
