import Link from "next/link";
import { ServiceIcon } from "@/components/common/service-icons";
import type { Service } from "@/types";
import type { ServiceContent } from "@/data/service-content";
import styles from "./service-detail.module.css";

export function ServiceHero({ service, content }: { service: Service; content: ServiceContent }) {
  return (
    <section aria-labelledby="service-title" className={`${styles.hero} relative isolate overflow-hidden`}>
      <div aria-hidden className={`${styles.backdrop} pointer-events-none absolute inset-0 -z-10`} />
      <div aria-hidden className={`${styles.orbit} pointer-events-none absolute left-1/2 top-1/2 -z-10 hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-300/20 sm:block dark:border-violet-300/10`} />
      <div className={`${styles.heroInner} mx-auto w-full max-w-7xl px-5 sm:px-8`}>
        <nav aria-label="Breadcrumb" className="flex items-center gap-3 text-xs text-[var(--muted)]">
          <Link href="/services" className="rounded-sm transition-colors hover:text-violet-600 dark:hover:text-violet-300">Services</Link>
          <span aria-hidden>/</span><span aria-current="page">{service.title}</span>
        </nav>
        <div className="relative mx-auto w-full max-w-4xl self-center text-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-violet-200 bg-[var(--surface)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-700 shadow-sm dark:border-violet-400/20 dark:text-violet-300 sm:text-xs">
            <ServiceIcon slug={service.slug} className="size-4" />{service.title}
          </div>
          <h1 id="service-title" className={`${styles.headline} mt-5 font-semibold tracking-[-0.055em]`}>
            {content.headline}<span className="bg-[linear-gradient(92deg,#38bdf8_0%,#8b5cf6_55%,#2dd4bf_100%)] bg-clip-text text-transparent mt-1 block">{content.highlight}</span>
          </h1>
          <p className={`${styles.intro} mx-auto mt-5 max-w-2xl text-[var(--muted)]`}>{content.intro}</p>
          <div className={`${styles.actions} mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4`}>
            <Link href="/contact" className="inline-flex items-center gap-5 rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-colors hover:bg-violet-700">Let’s build your next chapter <span aria-hidden>↗</span></Link>
            <a href="#service-scope" className="inline-flex items-center gap-3 rounded-full border border-slate-300 bg-[var(--surface)] px-5 py-3 text-sm font-semibold transition-colors hover:border-violet-400 dark:border-white/15">Explore the service <span aria-hidden>↓</span></a>
          </div>
          <p className={`${styles.audience} mt-5 text-xs leading-relaxed text-[var(--muted)]`}>Made for <span className="text-[var(--ink)]">{content.audience.join(" · ")}</span></p>
        </div>
        <div className={`${styles.principles} mx-auto grid w-full max-w-4xl grid-cols-3 gap-3 border-t border-slate-200/80 pt-5 text-center dark:border-white/10 sm:gap-6`}>
          {[
            { label: "01 / Clarity", text: "A scope you understand" },
            { label: "02 / Collaboration", text: "Progress you can review" },
            { label: "03 / Ownership", text: "A handover you can use" },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-violet-700 dark:text-violet-300 sm:text-[10px]">{item.label}</p>
              <p className="mt-2 text-[11px] font-medium leading-relaxed sm:text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
