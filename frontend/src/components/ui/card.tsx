"use client";
import Image from "next/image";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type HoverEffect = "none" | "lift" | "spotlight" | "border" | "underline" | "image";

const toneStyles: Record<string, string> = {
  sky: "border-slate-200/70 bg-white bg-[radial-gradient(ellipse_at_100%_0%,#cee6fc93,transparent_65%),linear-gradient(145deg,#e0f3ff7a,#f8f9fff0_80%)] dark:border-white/10 dark:bg-[#0c1530] dark:bg-[radial-gradient(ellipse_at_100%_0%,#cee6fc1a,transparent_70%),linear-gradient(140deg,#111e3b,#0c1429)]",
  violet:
    "border-slate-200/70 bg-white bg-[radial-gradient(ellipse_at_100%_0%,#ddd3fb93,transparent_65%),linear-gradient(145deg,#ede5ff7a,#f8f9fff0_80%)] dark:border-white/10 dark:bg-[#0c1530] dark:bg-[radial-gradient(ellipse_at_100%_0%,#ddd3fb1a,transparent_70%),linear-gradient(140deg,#111e3b,#0c1429)]",
  mint: "border-slate-200/70 bg-white bg-[radial-gradient(ellipse_at_100%_0%,#c1ebe093,transparent_65%),linear-gradient(145deg,#def8f07a,#f8f9fff0_80%)] dark:border-white/10 dark:bg-[#0c1530] dark:bg-[radial-gradient(ellipse_at_100%_0%,#c1ebe01a,transparent_70%),linear-gradient(140deg,#111e3b,#0c1429)]",
  peach:
    "border-slate-200/70 bg-white bg-[radial-gradient(ellipse_at_100%_0%,#f6dac893,transparent_65%),linear-gradient(145deg,#fff0e57a,#f8f9fff0_80%)] dark:border-white/10 dark:bg-[#0c1530] dark:bg-[radial-gradient(ellipse_at_100%_0%,#f6dac81a,transparent_70%),linear-gradient(140deg,#111e3b,#0c1429)]",
};

const hoverStyles: Record<HoverEffect, string> = {
  none: "transition-all duration-300",
  lift: "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_30px_-18px_#0f172a50]",
  spotlight:
    "group transition-all duration-300 hover:border-[#8b5cf670] hover:shadow-[0_0_28px_-14px_#8b5cf660]",
  border:
    "transition-all duration-300 hover:border-[#8b5cf680] hover:shadow-[inset_0_0_0_1px_#8b5cf625]",
  underline:
    "relative transition-all duration-300 after:absolute after:inset-x-6 after:bottom-0 after:h-[3px] after:z-[2] after:bg-[linear-gradient(90deg,#8b5cf6,#2dd4bf)] after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:pointer-events-none hover:after:scale-x-100",
  image:
    "group transition-all duration-300 [&_img]:transition-all [&_img]:duration-500 hover:[&_img]:scale-[1.035] hover:[&_img]:saturate-[1.12]",
};

export function Card({
  children,
  className,
  hoverEffect = "none",
  spotlight,
  backgroundImage,
  tone = "sky",
}: {
  children: React.ReactNode;
  className?: string;
  backgroundImage?: string;
  tone?: "sky" | "violet" | "mint" | "peach";
  hoverEffect?: HoverEffect;
  /** Optional override for the spotlight variant. */
  spotlight?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const showSpotlight = spotlight ?? hoverEffect === "spotlight";

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      data-tone={tone}
      onPointerMove={showSpotlight ? onMove : undefined}
      className={cn(
        "relative isolate min-w-0 overflow-hidden rounded-2xl border p-6",
        toneStyles[tone],
        hoverStyles[hoverEffect],
        showSpotlight && "group",
        className
      )}
    >
      {backgroundImage && (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Image src={backgroundImage} alt="" fill sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 33vw" className="object-cover opacity-40 saturate-[0.65] transition-transform duration-500 dark:opacity-30" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#e0f3ff47_0%,#e0f3ffc7_38%,#e0f3fff7_68%,#e0f3ff_100%)] dark:bg-[linear-gradient(180deg,#0d173230,#101d36d9_42%,#0c152bf5_70%,#0c152b)]" />
        </div>
      )}
      {showSpotlight && <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 bg-[radial-gradient(420px_circle_at_var(--mx,50%)_var(--my,50%),#38bdf824,#8b5cf614_40%,transparent_65%)] group-hover:opacity-100" />}
      <div className="relative z-10 flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
