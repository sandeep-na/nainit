"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const LOGOS = [
  "MediCare+",
  "PayNest",
  "VelvetKart",
  "LearnLoop",
  "PropNest",
  "SteelCore",
  "EduSpark",
  "FinEdge",
];

export function LogoMarquee() {
  return (
    <section
      className="overflow-hidden border-y border-slate-200/60 py-5 dark:border-white/10"
      aria-label="Client logos"
    >
      <Swiper
        modules={[Autoplay]}
        slidesPerView="auto"
        spaceBetween={48}
        loop
        speed={2500}
        autoplay={{ delay: 0, disableOnInteraction: false }}
        allowTouchMove={false}
        className="!overflow-visible"
      >
        {[...LOGOS, ...LOGOS].map((b, i) => (
          <SwiperSlide key={i} className="!w-auto">
            <span className="whitespace-nowrap text-sm font-bold uppercase tracking-widest text-slate-400 transition-colors hover:text-sky-500">
              {b}
            </span>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
