"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { projects, stats, testimonials } from "@/data/site";
import { useCountUp } from "@/hooks/hooks";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/services/service-card";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/common/reveal";
import { CtaBanner } from "@/components/common/cta-banner";
import { LogoMarquee } from "@/components/common/logo-marquee";
import { TestimonialSlider } from "@/components/common/testimonial-slider";
import { WorkCarousel } from "@/components/common/work-carousel";

// Lazy + client-only: never blocks LCP
const HeroScene = dynamic(() => import("@/components/three/hero-scene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_90%_70%_at_50%_30%,black_40%,transparent_100%)]" aria-hidden />,
});

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((s) => (
        <StatCard key={s.label} {...s} active={inView} />
      ))}
    </div>
  );
}

function StatCard({ value, suffix, label, active }: { value: number; suffix: string; label: string; active: boolean }) {
  const n = useCountUp(value, active);
  return (
    <Card hoverEffect="border" className="text-center">
      <div className="font-display text-4xl font-extrabold bg-[linear-gradient(92deg,#38bdf8_0%,#8b5cf6_55%,#2dd4bf_100%)] bg-clip-text text-transparent">{n}{suffix}</div>
      <div className="mt-1 text-sm text-slate-500">{label}</div>
    </Card>
  );
}

export function Home() {
  const [showAllServices, setShowAllServices] = useState(false);
  const [showAllIndustries, setShowAllIndustries] = useState(false);

  return (
    <div className="home-page">
      {/* ============ HERO ============ */}
      <section className="home-hero relative overflow-hidden">
        <div className="home-hero-background pointer-events-none absolute inset-0" aria-hidden />
        <div className="home-hero-layout relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 sm:px-6 sm:flex-row">
          <div className="home-hero-copy w-full min-w-0 text-center sm:text-left">
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
              <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky-700 backdrop-blur dark:bg-white/5 dark:text-sky-300">
                <span className="size-[0.5em] animate-pulse rounded-full bg-emerald-400" />
                Trusted by 120+ companies
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp} initial="hidden" animate="show" custom={1}
              className="home-hero-title mt-5 font-extrabold leading-[1.08]"
            >
              Software that ships. <span className="bg-[linear-gradient(92deg,#38bdf8_0%,#8b5cf6_55%,#2dd4bf_100%)] bg-clip-text text-transparent">Design that converts.</span>
            </motion.h1>
            <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2} className="mx-auto mt-5 max-w-xl text-lg text-slate-600 sm:mx-0 dark:text-slate-400">
              NainIT Solutions builds web platforms, mobile apps, cloud infrastructure and AI products — engineered for speed, SEO and revenue.
            </motion.p>
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="mt-8 flex flex-wrap justify-center gap-3 sm:justify-start">
              <Button href="/contact">Start your project →</Button>
              <Button href="/portfolio" variant="ghost">Explore our work</Button>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4} className="home-hero-rating mt-8 hidden flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500 sm:flex">
              <div className="flex" aria-label="5 star rating">
                {"★★★★★".split("").map((s, i) => (
                  <span key={i} className="text-amber-400">{s}</span>
                ))}
              </div>
              5.0 from 80+ Clutch reviews
            </motion.div>
          </div>
          <div className="home-hero-visual relative w-full min-w-0 shrink-0" aria-hidden>
            <HeroScene />
          </div>
        </div>
      </section>

      {/* ============ LOGO MARQUEE (Swiper infinite) ============ */}
      <LogoMarquee />

      {/* ============ SERVICES ============ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="What we do"
          title={<>Eight capabilities. <span className="bg-[linear-gradient(92deg,#38bdf8_0%,#8b5cf6_55%,#2dd4bf_100%)] bg-clip-text text-transparent">One accountable team.</span></>}
          copy="Fixed scope, senior engineers, weekly demos — no handoffs into the void."
        />
        <div id="home-services-grid" className="capabilities-grid mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <motion.div key={service.slug} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }} custom={index % 4} className={`h-full min-w-0 ${index >= 4 && !showAllServices ? "hidden sm:block" : ""}`}>
              <ServiceCard service={service} index={index} />
            </motion.div>
          ))}
        </div>
        <button type="button" className="home-cards-toggle sm:hidden" aria-expanded={showAllServices} aria-controls="home-services-grid" onClick={() => setShowAllServices(value => !value)}>
          {showAllServices ? "Show fewer services" : `Show all ${services.length} services`}
          <span aria-hidden>{showAllServices ? "−" : "+"}</span>
        </button>
      </section>

      {/* ============ STATS ============ */}
      <section className="border-y border-slate-200/60 bg-white/50 py-16 dark:border-white/10 dark:bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Stats />
        </div>
      </section>

      {/* ============ INDUSTRIES ============ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading eyebrow="Who we serve" title={<>Deep expertise in <span className="bg-[linear-gradient(92deg,#38bdf8_0%,#8b5cf6_55%,#2dd4bf_100%)] bg-clip-text text-transparent">your industry.</span></>} />
        <div id="home-industries-grid" className="home-industries-grid mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <Reveal variant="scale" key={ind.slug} delay={(i % 3) * 0.08} className={`h-full min-w-0 ${i >= 2 && !showAllIndustries ? "hidden sm:block" : ""}`}>
              <Link href={`/industries/${ind.slug}`} className="block h-full">
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/70 transition-all duration-300 [&_img]:transition-all [&_img]:duration-500 hover:[&_img]:scale-[1.035] hover:[&_img]:saturate-[1.12] hover:border-violet-400/40 dark:border-white/10">
                  <Image src={ind.image} alt={`${ind.title} illustration`} width={640} height={360} className="aspect-[16/9] w-full shrink-0 object-cover transition-transform duration-500" loading="lazy" />
                  <div className="flex flex-1 flex-col border-slate-200/70 bg-white bg-[radial-gradient(ellipse_at_100%_0%,#cee6fc93,transparent_65%),linear-gradient(145deg,#e0f3ff7a,#f8f9fff0_80%)] p-5 max-sm:p-4 dark:border-white/10 dark:bg-[#0c1530] dark:bg-[radial-gradient(ellipse_at_100%_0%,#cee6fc1a,transparent_70%),linear-gradient(140deg,#111e3b,#0c1429)]">
                    <h3 className="line-clamp-1 font-bold group-hover:text-violet-400">{ind.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">{ind.tagline}</p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <button type="button" className="home-cards-toggle sm:hidden" aria-expanded={showAllIndustries} aria-controls="home-industries-grid" onClick={() => setShowAllIndustries(value => !value)}>
          {showAllIndustries ? "Show fewer industries" : `Show all ${industries.length} industries`}
          <span aria-hidden>{showAllIndustries ? "−" : "+"}</span>
        </button>
      </section>

      {/* ============ SELECTED WORK (Swiper carousel) ============ */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <SectionHeading
          eyebrow="Selected work"
          title={<>Case studies with <span className="bg-[linear-gradient(92deg,#38bdf8_0%,#8b5cf6_55%,#2dd4bf_100%)] bg-clip-text text-transparent">numbers, not adjectives.</span></>}
          copy="Swipe through recent engagements across healthcare, fintech, commerce and education."
        />
        <Reveal className="mt-10">
          <WorkCarousel
            items={projects.map((p) => ({
              title: p.title,
              client: p.client,
              industry: p.industry,
              year: p.year,
              summary: p.summary,
              image: p.image,
              results: p.results,
              stack: p.stack,
              href: `/portfolio/${p.slug}`,
            }))}
          />
        </Reveal>
        <Reveal className="mt-4 text-center">
          <Button href="/portfolio" variant="ghost">View all work →</Button>
        </Reveal>
      </section>

      {/* ============ TESTIMONIALS (Swiper slider) ============ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading eyebrow="Client love" title={<>Don&apos;t take our word for it.</>} copy="Auto-playing reviews — pause on hover, swipe on mobile." />
        <Reveal className="mt-10">
          <TestimonialSlider
            items={[
              ...testimonials,
              { name: "Ananya Iyer", role: "Director, LearnLoop", quote: "Completion rates doubled. Teachers finally see which student needs help — before the exam, not after.", rating: 5 },
              { name: "Vikram Malhotra", role: "Director, UrbanNest Realty", quote: "Leads stopped leaking. Every enquiry reaches an agent in under a minute — closings followed.", rating: 5 },
              { name: "Rajesh Khanna", role: "Plant Head, ForgeTrack", quote: "We finally see the floor in real time. Breakdowns are predicted, not discovered at 2am.", rating: 5 },
            ]}
          />
        </Reveal>
      </section>

      <CtaBanner />
    </div>
  );
}
