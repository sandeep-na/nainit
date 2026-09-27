"use client";
import { PageHero } from "@/components/common/page-hero";
import { Reveal } from "@/components/common/reveal";
import { CtaBanner } from "@/components/common/cta-banner";
import { ServiceCard } from "./service-card";
import { services } from "@/data/services";

export function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={<>Everything you need to <span className="bg-[linear-gradient(92deg,#38bdf8_0%,#8b5cf6_55%,#2dd4bf_100%)] bg-clip-text text-transparent">ship & scale.</span></>}
        copy="Fixed-scope proposals in 48 hours. Senior engineers, weekly demos, production-grade code."
      />
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((s, i) => (
            <Reveal variant="rise" key={s.slug} delay={(i % 3) * 0.07} className="h-full">
              <ServiceCard service={s} index={i} showPricing />
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
