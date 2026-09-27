import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ServiceIcon } from "@/components/common/service-icons";
import type { Service } from "@/types";

const tones = ["sky", "violet", "mint", "peach"] as const;

export function ServiceCard({ service, index, showPricing = false }: {
  service: Service;
  index: number;
  showPricing?: boolean;
}) {
  return (
    <Link href={`/services/${service.slug}`} aria-label={`${service.title} — ${service.tagline}`} className="group block h-full min-w-0 rounded-2xl focus-visible:outline-[3px] focus-visible:outline-offset-[5px] focus-visible:outline-[#0284c7]">
      <Card hoverEffect="spotlight" backgroundImage={service.image} tone={tones[index % tones.length]} className="flex h-full min-h-[342px] flex-col max-sm:min-h-[312px] max-sm:p-6">
        <div className="mb-10 flex items-center justify-between gap-4 max-sm:mb-5 max-sm:gap-2">
          <span className="grid size-12 place-items-center rounded-2xl border border-white/70 bg-white/80 text-sky-700 shadow-sm backdrop-blur transition-all duration-300 group-hover:-rotate-[4deg] dark:border-white/15 dark:bg-slate-950/50 dark:text-sky-300">
            <ServiceIcon slug={service.slug} className="size-6" />
          </span>
          <span className="font-display text-xs font-semibold tracking-widest text-slate-600 dark:text-slate-300" aria-hidden>
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h3 className="min-h-[2.75em] break-words text-lg font-bold leading-snug text-slate-900 max-sm:min-h-0 dark:text-white">{service.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{service.tagline}</p>
        <div className="mt-auto pt-6 max-sm:pt-4">
          {showPricing && (
            <div className="mb-4 flex flex-wrap justify-between gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
              <span>From {service.priceFrom}</span><span>{service.timeline}</span>
            </div>
          )}
          <span className="flex items-center justify-between gap-3 border-t border-slate-400/20 pt-4 text-sm font-semibold text-sky-700 dark:border-white/15 dark:text-sky-300">
            Explore service
            <span aria-hidden className="grid size-8 place-items-center rounded-full border border-sky-500/20 bg-white/70 text-base transition-all duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px] group-hover:bg-[#dceeff] dark:bg-white/5 dark:group-hover:bg-[#193854] max-sm:size-6 max-sm:text-sm">↗</span>
          </span>
        </div>
      </Card>
    </Link>
  );
}
