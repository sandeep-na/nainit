"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export interface WorkSlide {
  title: string;
  client?: string;
  industry: string;
  year: string;
  summary: string;
  image: string;
  results: { label: string; value: string }[];
  stack?: string[];
  href?: string;
}

export function WorkCarousel({ items }: { items: WorkSlide[] }) {
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2 },
          1100: { slidesPerView: 3 },
        }}
        loop={items.length > 3}
        speed={600}
        autoplay={{ delay: 4200, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ clickable: true, el: ".work-pagination" }}
        navigation={{ prevEl, nextEl }}
        className="!pb-12"
      >
        {items.map((p) => {
          const card = (
            <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/70 transition-all duration-300 [&_img]:transition-all [&_img]:duration-500 hover:[&_img]:scale-[1.035] hover:[&_img]:saturate-[1.12] hover:border-sky-400/40 dark:border-white/10 dark:hover:border-violet-400/30">
              <div className="relative shrink-0">
                <Image
                  src={p.image}
                  alt={p.title}
                  width={640}
                  height={360}
                  className="aspect-[16/9] w-full object-cover transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                  {p.industry} · {p.year}
                </span>
              </div>
              <div className="flex flex-1 flex-col border-slate-200/70 bg-white bg-[radial-gradient(ellipse_at_100%_0%,#cee6fc93,transparent_65%),linear-gradient(145deg,#e0f3ff7a,#f8f9fff0_80%)] p-5 max-sm:p-4 dark:border-white/10 dark:bg-[#0c1530] dark:bg-[radial-gradient(ellipse_at_100%_0%,#cee6fc1a,transparent_70%),linear-gradient(140deg,#111e3b,#0c1429)]">
                {p.client && (
                  <div className="line-clamp-1 text-xs font-semibold uppercase tracking-widest text-slate-400">
                    {p.client}
                  </div>
                )}
                <h3 className="mt-1 line-clamp-1 font-bold group-hover:text-sky-500">{p.title}</h3>
                <p className="mt-1.5 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
                  {p.summary}
                </p>
                <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-200/70 pt-4 dark:border-white/10">
                  {p.results.map((r) => (
                    <div key={r.label}>
                      <div className="font-display text-sm font-extrabold text-sky-500">{r.value}</div>
                      <div className="text-[11px] text-slate-500">{r.label}</div>
                    </div>
                  ))}
                </div>
                {p.stack && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.stack.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-sky-500/10 px-2.5 py-1 text-[11px] font-semibold text-sky-600 dark:text-sky-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          );
          return (
            <SwiperSlide key={p.title} className="h-auto">
              {p.href ? (
                <Link href={p.href} className="block h-full">
                  {card}
                </Link>
              ) : (
                <div className="h-full">{card}</div>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className="mt-2 flex items-center justify-between">
        <div className="work-pagination flex gap-2 [&_.swiper-pagination-bullet]:size-2 [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:bg-slate-300 dark:[&_.swiper-pagination-bullet]:bg-white/20 [&_.swiper-pagination-bullet-active]:!w-6 [&_.swiper-pagination-bullet-active]:!bg-gradient-to-r [&_.swiper-pagination-bullet-active]:from-sky-500 [&_.swiper-pagination-bullet-active]:to-violet-500" />
        <div className="flex gap-2">
          <button
            ref={(n) => setPrevEl(n)}
            aria-label="Previous work"
            className="active:scale-[0.96] grid size-10 place-items-center rounded-full border border-slate-300/60 text-lg transition-colors hover:border-sky-400 hover:text-sky-500 dark:border-white/15"
          >
            ←
          </button>
          <button
            ref={(n) => setNextEl(n)}
            aria-label="Next work"
            className="active:scale-[0.96] grid size-10 place-items-center rounded-full border border-slate-300/60 text-lg transition-colors hover:border-sky-400 hover:text-sky-500 dark:border-white/15"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
