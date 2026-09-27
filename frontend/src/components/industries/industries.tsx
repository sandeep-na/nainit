"use client";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/common/page-hero";
import { Reveal } from "@/components/common/reveal";
import { CtaBanner } from "@/components/common/cta-banner";
import { industries } from "@/data/industries";

export function Industries() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={<>We speak <span className="bg-[linear-gradient(92deg,#38bdf8_0%,#8b5cf6_55%,#2dd4bf_100%)] bg-clip-text text-transparent">your industry&apos;s language.</span></>}
        copy="Compliance, workflows and KPIs — not generic templates. Pick your vertical."
      />
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <Reveal variant="scale" key={ind.slug} delay={(i % 3) * 0.07} className="h-full">
              <Link href={`/industries/${ind.slug}`} className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200/70 transition-all duration-300 [&_img]:transition-all [&_img]:duration-500 hover:[&_img]:scale-[1.035] hover:[&_img]:saturate-[1.12] hover:border-violet-400/40 dark:border-white/10">
                <Image src={ind.image} alt={ind.title} width={640} height={360} className="aspect-[16/9] h-auto w-full shrink-0 object-cover transition-transform duration-500" loading="lazy" />
                <div className="flex w-full flex-1 flex-col border-slate-200/70 bg-white bg-[radial-gradient(ellipse_at_100%_0%,#cee6fc93,transparent_65%),linear-gradient(145deg,#e0f3ff7a,#f8f9fff0_80%)] p-5 max-sm:p-4 dark:border-white/10 dark:bg-[#0c1530] dark:bg-[radial-gradient(ellipse_at_100%_0%,#cee6fc1a,transparent_70%),linear-gradient(140deg,#111e3b,#0c1429)]">
                  <h2 className="line-clamp-1 font-bold group-hover:text-violet-400">{ind.title}</h2>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">{ind.tagline}</p>
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
