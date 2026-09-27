"use client";
import Image from "next/image";
import { PageHero } from "@/components/common/page-hero";
import { Reveal } from "@/components/common/reveal";
import { CtaBanner } from "@/components/common/cta-banner";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { u } from "@/lib/images";

const team = [
  { name: "Aarav Nain", role: "Founder & CEO", image: u("1560250097-0b93528c311a", 600) },
  { name: "Sana Kapoor", role: "Head of AI Lab", image: u("1573496359142-b8d87734a5a2", 600) },
  { name: "Rohan Mehta", role: "VP Platform Engineering", image: u("1472099645785-5658abf4ff4e", 600) },
  { name: "Vikram Patel", role: "Design Director", image: u("1507003211169-0a1dd7228f2d", 600) },
];

const timeline = [
  { year: "2016", text: "Founded as a 3-person web studio." },
  { year: "2019", text: "Launched cloud & DevOps practice; 40+ clients." },
  { year: "2022", text: "Opened AI Lab; first RAG products in production." },
  { year: "2024", text: "120+ projects, SOC 2-ready delivery, 98% retention." },
  { year: "2026", text: "40+ engineers & designers shipping across 14 industries." },
];

export function About() {
  return (
    <>
      <PageHero
        eyebrow="About NainIT"
        title={<>Engineering with <span className="bg-[linear-gradient(92deg,#38bdf8_0%,#8b5cf6_55%,#2dd4bf_100%)] bg-clip-text text-transparent">taste and accountability.</span></>}
        copy="We're a senior-only team of engineers, designers and strategists. No juniors learning on your budget — just people who've shipped at scale."
      />
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-20 sm:px-6 lg:grid-cols-2">
        <Reveal>
          <Image src={u("1522071820081-009f0129c71c", 1200)} alt="NainIT team collaborating" width={640} height={400} className="aspect-[8/5] w-full rounded-3xl object-cover" loading="lazy" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-3xl font-bold max-sm:text-[28px]">Our story</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            NainIT started in 2016 with a simple frustration: agency work that looked good in decks and fell apart in production.
            So we built the opposite — a company where designers understand caching and engineers care about conversion.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Card hoverEffect="underline"><h3 className="font-bold text-sky-500">Mission</h3><p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Ship software that measurably moves client revenue.</p></Card>
            <Card hoverEffect="underline"><h3 className="font-bold text-violet-400">Vision</h3><p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Be the most trusted engineering partner for regulated, ambitious industries.</p></Card>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-slate-200/60 bg-white/50 py-20 dark:border-white/10 dark:bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Timeline" title="Ten years of shipping." />
          <ol className="relative mx-auto mt-10 max-w-2xl space-y-6 border-l-2 border-sky-400/30 pl-6">
            {timeline.map((t, i) => (
              <Reveal variant="fade" key={t.year} delay={i * 0.05}>
                <li className="relative">
                  <span className="absolute -left-[1.75em] top-0 grid size-[1.5em] place-items-center rounded-full bg-gradient-to-r from-sky-500 to-violet-500 text-[0.5em] font-bold text-white">●</span>
                  <span className="font-display font-bold text-sky-500">{t.year}</span>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{t.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading eyebrow="Leadership" title="The people behind the pixels." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <Reveal variant="fade" key={m.name} delay={i * 0.07} className="h-full">
              <Card hoverEffect="lift" className="flex h-full w-full flex-col text-center">
                <Image src={m.image} alt={m.name} width={300} height={200} className="mx-auto aspect-[3/2] h-auto w-full shrink-0 rounded-xl object-cover" loading="lazy" />
                <h3 className="mt-4 line-clamp-1 font-bold">{m.name}</h3>
                <p className="line-clamp-1 text-sm text-sky-500">{m.role}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
