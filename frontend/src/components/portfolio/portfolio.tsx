"use client";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/common/page-hero";
import { Reveal } from "@/components/common/reveal";
import { CtaBanner } from "@/components/common/cta-banner";
import { Card } from "@/components/ui/card";
import { projects } from "@/data/site";

export function Portfolio() {
  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title={<>Case studies with <span className="bg-[linear-gradient(92deg,#38bdf8_0%,#8b5cf6_55%,#2dd4bf_100%)] bg-clip-text text-transparent">numbers, not adjectives.</span></>}
        copy="A sample of recent engagements across healthcare, fintech, commerce and education."
      />
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal variant="rise" key={p.slug} delay={(i % 2) * 0.08} className="h-full">
              <Link href={`/portfolio/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_30px_-18px_#0f172a50] hover:border-sky-400/40 dark:border-white/10">
                <div className="relative shrink-0">
                  <Image src={p.image} alt={p.title} width={800} height={420} className="aspect-[16/9] w-full object-cover transition-transform duration-500" loading="lazy" />
                  <span className="absolute left-[5%] top-[8%] rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur">{p.industry} · {p.year}</span>
                </div>
                <div className="flex flex-1 flex-col border-slate-200/70 bg-white bg-[radial-gradient(ellipse_at_100%_0%,#cee6fc93,transparent_65%),linear-gradient(145deg,#e0f3ff7a,#f8f9fff0_80%)] p-6 max-sm:p-4 dark:border-white/10 dark:bg-[#0c1530] dark:bg-[radial-gradient(ellipse_at_100%_0%,#cee6fc1a,transparent_70%),linear-gradient(140deg,#111e3b,#0c1429)]">
                  <h2 className="line-clamp-1 text-xl font-bold group-hover:text-sky-500">{p.title}</h2>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">{p.summary}</p>
                  <div className="mt-auto flex gap-6 pt-4">
                    {p.results.map((r) => (
                      <div key={r.label}>
                        <div className="font-display font-extrabold text-sky-500">{r.value}</div>
                        <div className="text-xs text-slate-500">{r.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBanner />
    </>
  );
}

export function PortfolioDetail({ slug }: { slug: string }) {
  const p = projects.find((x) => x.slug === slug);
  if (!p) return <div className="pt-32 text-center">Case study not found.</div>;
  return (
    <>
      <PageHero eyebrow={`${p.industry} · ${p.year}`} title={<>{p.title}</>} copy={`${p.client} — ${p.summary}`} />
      <section className="mx-auto max-w-5xl px-4 pb-8 sm:px-6">
        <Reveal>
          <Image src={p.image} alt={p.title} width={1200} height={520} className="aspect-[16/10] w-full rounded-3xl object-cover sm:aspect-[21/9]" priority />
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {p.results.map((r) => (
            <Card key={r.label} className="text-center">
              <div className="font-display text-3xl font-extrabold bg-[linear-gradient(92deg,#38bdf8_0%,#8b5cf6_55%,#2dd4bf_100%)] bg-clip-text text-transparent">{r.value}</div>
              <div className="mt-1 text-sm text-slate-500">{r.label}</div>
            </Card>
          ))}
        </div>
        <Card className="mt-5">
          <h2 className="font-bold">Stack</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {p.stack.map((t) => (
              <span key={t} className="rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-600 dark:text-sky-300">{t}</span>
            ))}
          </div>
        </Card>
      </section>
      <CtaBanner />
    </>
  );
}
