import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/common/reveal";
import { ServiceIcon } from "@/components/common/service-icons";
import { Card } from "@/components/ui/card";
import { services } from "@/data/services";
import type { ServiceContent } from "@/data/service-content";
import type { Service } from "@/types";
import { ServiceHero } from "./service-hero";
import styles from "./service-detail.module.css";

const sectionClass = "mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16";
const eyebrowClass = "text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300";

export function ServiceDetail({ service, content }: { service: Service; content: ServiceContent }) {
  const related = content.related.flatMap((slug) => {
    const match = services.find((item) => item.slug === slug);
    return match ? [match] : [];
  });

  return (
    <>
      <ServiceHero service={service} content={content} />

      <nav aria-label="On this service page" className="sticky top-[72px] z-30 border-y border-slate-200/80 bg-[var(--bg)]/95 backdrop-blur-xl dark:border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 sm:px-8">
          <span className="hidden shrink-0 text-xs font-semibold lg:block">{service.title}</span>
          <div className="flex min-w-0 gap-5 overflow-x-auto py-4 text-xs font-medium text-[var(--muted)] sm:gap-8">
            {[["service-scope", "What’s included"], ["service-use-cases", "Use cases"], ["service-process", "Our approach"], ["service-handover", "What you receive"], ["service-faq", "FAQs"]].map(([id, title]) => <a key={id} href={`#${id}`} className="shrink-0 rounded-sm transition-colors hover:text-violet-600 dark:hover:text-violet-300">{title}</a>)}
          </div>
          <Link href="/contact" className="hidden shrink-0 text-xs font-semibold text-violet-700 dark:text-violet-300 sm:block">Discuss your project ↗</Link>
        </div>
      </nav>

      <section aria-labelledby="service-value-title" className={sectionClass}>
        <div className="grid gap-8 rounded-[2rem] border border-sky-200/70 bg-gradient-to-br from-sky-100/80 via-sky-50/70 to-violet-100/70 p-6 dark:border-sky-400/15 dark:from-sky-500/10 dark:via-sky-500/5 dark:to-violet-500/10 sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12 lg:p-10">
          <Reveal variant="slide">
            <p className={eyebrowClass}>Built around the business</p>
            <h2 id="service-value-title" className="mt-4 text-3xl font-semibold leading-tight max-sm:text-[28px] sm:text-4xl">Good technology.<br /><span className="bg-[linear-gradient(92deg,#38bdf8_0%,#8b5cf6_55%,#2dd4bf_100%)] bg-clip-text text-transparent">A meaningful difference.</span></h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-[var(--muted)]">{service.description}</p>
            <figure className="relative mt-6 overflow-hidden rounded-2xl border border-white/60 shadow-lg shadow-sky-900/5 dark:border-white/10">
              <Image src={service.image} alt={`${service.title} workspace and technology`} width={720} height={440} sizes="(min-width: 1024px) 440px, (min-width: 640px) 85vw, 90vw" className="aspect-[16/9] w-full object-cover" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#060a18]/85 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-4 text-white">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-white/25 bg-white/10 backdrop-blur"><ServiceIcon slug={service.slug} className="size-4" /></span>
                <span className="text-xs font-medium">Your goals set the direction.</span>
              </figcaption>
            </figure>
          </Reveal>
          <div className="divide-y divide-slate-200 dark:divide-white/10">
            {content.outcomes.map((item, index) => (
              <Reveal key={item.title} className="py-6 first:pt-0 last:pb-0">
                <div className="flex gap-4">
                  <span aria-hidden className="mt-1 font-mono text-xs text-violet-500">0{index + 1}</span>
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-[var(--muted)]">{item.problem}</p>
                    <p className="mt-3 border-l-2 border-teal-400 pl-4 text-sm leading-relaxed">{item.solution}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="service-scope" aria-labelledby="service-scope-title" className={`${sectionClass} ${styles.anchor}`}>
        <Reveal className="flex flex-wrap items-end justify-between gap-5">
          <div><p className={eyebrowClass}>The scope / {service.title}</p><h2 id="service-scope-title" className="mt-3 text-3xl font-semibold max-sm:text-[28px] sm:text-4xl">Everything connects.<br /><span className="bg-[linear-gradient(92deg,#38bdf8_0%,#8b5cf6_55%,#2dd4bf_100%)] bg-clip-text text-transparent">Here’s what we do.</span></h2></div>
          <p className="max-w-sm text-sm leading-relaxed text-[var(--muted)]">Choose the capabilities you need. We shape them into one clear scope, with agreed priorities and deliverables.</p>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {content.capabilities.map((item, index) => (
            <Reveal variant="scale" key={item.title} delay={(index % 2) * 0.06} className="h-full">
              <Card hoverEffect="spotlight" tone={index % 2 ? "violet" : "sky"} className="flex h-full flex-col !rounded-3xl sm:!p-8">
                <div className="flex items-center justify-between"><span className="font-mono text-xs text-violet-600 dark:text-violet-300">0{index + 1} / CAPABILITY</span><ServiceIcon slug={service.slug} className="size-6 text-violet-500/70" /></div>
                <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.copy}</p>
                <ul className="mt-5 space-y-2 border-t border-slate-200/70 pt-5 text-sm dark:border-white/10">
                  {item.points.map((point) => <li key={point} className="flex items-start gap-2.5"><span aria-hidden className="text-teal-600 dark:text-teal-300">✓</span>{point}</li>)}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="service-use-cases" aria-labelledby="service-use-cases-title" className={`${sectionClass} ${styles.anchor}`}>
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-violet-400/20 bg-gradient-to-br from-[#111a38] via-[#24164d] to-[#0c3e4c] p-6 text-white sm:p-10">
          <div aria-hidden className="pointer-events-none absolute -left-20 -top-24 -z-10 size-80 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_300px] lg:gap-12">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">Where it fits</p>
              <h2 id="service-use-cases-title" className="mt-3 max-w-2xl text-3xl font-semibold max-sm:text-[28px] sm:text-4xl">What could we build <span className="text-teal-300">for you?</span></h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">A few ways this service can support your next stage. Your starting point shapes the engagement.</p>
            </Reveal>
            <Reveal variant="scale">
              <div className="relative mx-auto max-w-md rounded-2xl border border-white/20 bg-white/5 p-2 lg:max-w-none">
                <Image src={content.visual.image} alt={content.visual.alt} width={640} height={400} sizes="(min-width: 1024px) 300px, (min-width: 640px) 448px, 85vw" className="aspect-[16/9] w-full rounded-xl object-cover" />
                <span aria-hidden className="absolute bottom-5 right-5 grid size-9 place-items-center rounded-full border border-white/30 bg-[#111a38]/70 text-lg text-teal-200 backdrop-blur">↗</span>
              </div>
            </Reveal>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {content.useCases.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06} className="h-full">
                <article className="relative h-full rounded-2xl border border-white/15 bg-white/[0.06] p-6 transition-all duration-300 after:absolute after:inset-x-6 after:bottom-0 after:h-[3px] after:z-[2] after:bg-[linear-gradient(90deg,#8b5cf6,#2dd4bf)] after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:pointer-events-none hover:after:scale-x-100">
                  <div className="flex items-center justify-between"><span className="font-mono text-xs text-sky-200">0{index + 1}</span><span aria-hidden className="text-xl text-teal-300">↗</span></div>
                  <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="service-process" aria-labelledby="service-process-title" className={`${sectionClass} ${styles.anchor}`}>
        <Reveal className="max-w-2xl"><p className={eyebrowClass}>A clear path forward</p><h2 id="service-process-title" className="mt-3 text-3xl font-semibold max-sm:text-[28px] sm:text-4xl">From first conversation<br /><span className="bg-[linear-gradient(92deg,#38bdf8_0%,#8b5cf6_55%,#2dd4bf_100%)] bg-clip-text text-transparent">to something that works.</span></h2><p className="mt-4 text-sm leading-7 text-[var(--muted)]">Review the important decisions as we go. Each stage has a clear purpose, so you always know what comes next.</p></Reveal>
        <ol className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {content.process.map((item, index) => <li key={item.title}><Reveal variant="rise" delay={index * 0.06}><div className="flex items-center gap-4"><span className="grid size-11 shrink-0 place-items-center rounded-full border border-violet-200 bg-violet-50 font-mono text-sm text-violet-700 dark:border-violet-400/30 dark:bg-violet-400/10 dark:text-violet-300">0{index + 1}</span><span aria-hidden className="h-px flex-1 bg-gradient-to-r from-violet-300 to-transparent dark:from-violet-500/40" /></div><h3 className="mt-5 text-base font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.copy}</p></Reveal></li>)}
        </ol>
      </section>

      <section id="service-handover" aria-labelledby="service-handover-title" className={`${sectionClass} ${styles.anchor}`}>
        <div className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-[var(--surface)] dark:border-white/10 lg:grid-cols-2">
          <div className="p-6 sm:p-10"><p className={eyebrowClass}>A useful handover</p><h2 id="service-handover-title" className="mt-3 text-3xl font-semibold max-sm:text-[28px]">More than a finished task.<br /><span className="bg-[linear-gradient(92deg,#38bdf8_0%,#8b5cf6_55%,#2dd4bf_100%)] bg-clip-text text-transparent">Something you can own.</span></h2><p className="mt-4 text-sm leading-7 text-[var(--muted)]">We define the handover at the start. Your proposal confirms the assets, access and documentation included in your engagement.</p><ul className="mt-6 grid gap-3 sm:grid-cols-2">{service.deliverables.map((item) => <li key={item} className="flex items-start gap-3 rounded-xl border border-slate-200 p-3 text-sm dark:border-white/10"><span aria-hidden className="text-teal-600 dark:text-teal-300">✓</span>{item}</li>)}</ul></div>
          <div className="border-t border-slate-200 bg-sky-50/60 p-6 dark:border-white/10 dark:bg-sky-500/5 lg:border-l lg:border-t-0 sm:p-10"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700 dark:text-sky-300">The toolkit</p><h3 className="mt-4 text-2xl font-semibold">Chosen for the problem.</h3><p className="mt-3 text-sm leading-7 text-[var(--muted)]">We work with established tools and choose the combination that fits your constraints, existing systems and team.</p><div className="mt-6 flex flex-wrap gap-3">{service.tech.map((item) => <span key={item} className="rounded-xl border border-sky-200 bg-[var(--surface)] px-4 py-3 text-sm font-semibold dark:border-sky-400/20">{item}</span>)}</div><p className="mt-6 border-t border-slate-200 pt-5 text-xs leading-relaxed text-[var(--muted)] dark:border-white/10">Already have a stack? We start by understanding what you have before recommending changes.</p></div>
        </div>
      </section>

      <section id="service-faq" aria-labelledby="service-faq-title" className={`${sectionClass} ${styles.anchor}`}>
        <div className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16">
          <div><p className={eyebrowClass}>Before we begin</p><h2 id="service-faq-title" className="mt-3 text-3xl font-semibold max-sm:text-[28px] sm:text-4xl">Good questions.<br /><span className="bg-[linear-gradient(92deg,#38bdf8_0%,#8b5cf6_55%,#2dd4bf_100%)] bg-clip-text text-transparent">Clear answers.</span></h2><p className="mt-4 text-sm text-[var(--muted)]">A little more about {service.title.toLowerCase()}.</p></div>
          <div className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-white/10 dark:border-white/10">
            {content.faqs.map((faq) => <details key={faq.question} className={`${styles.faq} py-1`}><summary className="flex cursor-pointer items-center justify-between gap-5 rounded-sm py-5 text-sm font-semibold sm:text-base"><span>{faq.question}</span><span aria-hidden className="grid size-7 shrink-0 place-items-center rounded-full border border-slate-200 text-lg transition-transform dark:border-white/15">+</span></summary><p className="max-w-2xl pb-5 pr-8 text-sm leading-7 text-[var(--muted)]">{faq.answer}</p></details>)}
          </div>
        </div>
      </section>

      <section aria-labelledby="related-services-title" className={sectionClass}>
        <div className="flex flex-wrap items-end justify-between gap-4"><div><p className={eyebrowClass}>Connect the next piece</p><h2 id="related-services-title" className="mt-3 text-2xl font-semibold max-sm:text-[28px] sm:text-3xl">Better together.</h2></div><Link href="/services" className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold dark:border-white/15">All services →</Link></div>
        <div className="mt-7 grid gap-4 md:grid-cols-3">{related.map((item) => <Link key={item.slug} href={`/services/${item.slug}`} className="group rounded-2xl border border-slate-200 bg-[var(--surface)] p-6 transition-all duration-300 hover:translate-x-1 hover:border-[#38bdf880] dark:border-white/10"><div className="flex justify-between text-violet-500"><ServiceIcon slug={item.slug} className="size-6" /><span aria-hidden>↗</span></div><h3 className="mt-5 text-lg font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.tagline}</p></Link>)}</div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 pt-4 sm:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-violet-200 bg-gradient-to-br from-sky-100/70 via-violet-100/60 to-teal-100/60 px-6 py-12 text-center dark:border-white/10 dark:from-sky-500/10 dark:via-violet-500/10 dark:to-teal-500/10 sm:px-12">
          <p className={eyebrowClass}>Your next chapter starts here</p><h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold leading-tight max-sm:text-[28px] sm:text-4xl">Let’s make {service.title.toLowerCase()} <span className="bg-[linear-gradient(92deg,#38bdf8_0%,#8b5cf6_55%,#2dd4bf_100%)] bg-clip-text text-transparent">work for your business.</span></h2><p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[var(--muted)]">Bring the idea, the challenge or the system you’ve outgrown. We’ll help you work out a practical next step.</p><Link href="/contact" className="mt-7 inline-flex items-center gap-6 rounded-full bg-violet-600 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-violet-700">Tell us what you’re planning <span aria-hidden>↗</span></Link>
        </div>
      </section>
    </>
  );
}
