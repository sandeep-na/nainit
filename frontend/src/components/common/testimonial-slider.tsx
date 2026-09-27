"use client";
import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { u } from "@/lib/images";
import type { Testimonial } from "@/types";

// Dummy avatars — real professional portraits (Unsplash), site content se related
const AVATARS = [
  u("1573496359142-b8d87734a5a2", 200),
  u("1560250097-0b93528c311a", 200),
  u("1580489944761-15a19d654956", 200),
  u("1573497019940-1c28c88b4f3e", 200),
  u("1472099645785-5658abf4ff4e", 200),
  u("1507003211169-0a1dd7228f2d", 200),
];

function SlideCard({ t, index }: { t: Testimonial; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <Card hoverEffect="border" className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <div className="text-amber-400" aria-label={`${t.rating} stars`}>
          {"★".repeat(t.rating)}
        </div>
        <span className="font-display text-3xl leading-none text-sky-500/25">&rdquo;</span>
      </div>
      <p className={cn("mt-2 flex-1 text-[15px] leading-relaxed", !open && "line-clamp-4")}>
        &ldquo;{t.quote}&rdquo;
      </p>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="mt-1.5 self-start text-xs font-semibold text-sky-500 hover:underline"
      >
        {open ? "Show less" : "Read more"}
      </button>
      <div className="mt-4 flex items-center gap-3 border-t border-slate-200/60 pt-4 dark:border-white/10">
        <Image
          src={AVATARS[index % AVATARS.length]}
          alt={t.name}
          width={40}
          height={40}
          className="size-10 shrink-0 rounded-full border border-sky-400/30 object-cover"
          loading="lazy"
        />
        <div className="min-w-0">
          <div className="line-clamp-1 text-sm font-bold">{t.name}</div>
          <div className="line-clamp-1 text-xs text-slate-500">{t.role}</div>
        </div>
      </div>
    </Card>
  );
}

export function TestimonialSlider({ items }: { items: Testimonial[] }) {
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2 },
          1100: { slidesPerView: 3 },
        }}
        loop={items.length > 3}
        speed={600}
        autoplay={{ delay: 3800, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ clickable: true, el: ".testimonial-pagination" }}
        navigation={{ prevEl, nextEl }}
        className="!pb-12"
      >
        {items.map((t, i) => (
          <SwiperSlide key={t.name} className="h-auto">
            <SlideCard t={t} index={i} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-2 flex items-center justify-between">
        <div className="testimonial-pagination flex gap-2 [&_.swiper-pagination-bullet]:size-2 [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:bg-slate-300 dark:[&_.swiper-pagination-bullet]:bg-white/20 [&_.swiper-pagination-bullet-active]:!w-6 [&_.swiper-pagination-bullet-active]:!bg-gradient-to-r [&_.swiper-pagination-bullet-active]:from-sky-500 [&_.swiper-pagination-bullet-active]:to-violet-500" />
        <div className="flex gap-2">
          <button
            ref={(n) => setPrevEl(n)}
            aria-label="Previous testimonials"
            className="active:scale-[0.96] grid size-10 place-items-center rounded-full border border-slate-300/60 text-lg transition-colors hover:border-sky-400 hover:text-sky-500 dark:border-white/15"
          >
            ←
          </button>
          <button
            ref={(n) => setNextEl(n)}
            aria-label="Next testimonials"
            className="active:scale-[0.96] grid size-10 place-items-center rounded-full border border-slate-300/60 text-lg transition-colors hover:border-sky-400 hover:text-sky-500 dark:border-white/15"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
