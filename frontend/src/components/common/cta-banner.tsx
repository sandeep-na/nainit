"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Reveal } from "./reveal";

export function CtaBanner() {
  return (
    <section className="mx-auto max-w-7xl px-0 py-20 sm:px-6">
      <Reveal>
        <div className="relative w-full overflow-hidden rounded-none bg-[#0a1128] px-6 py-14 text-center text-white sm:rounded-3xl sm:px-12">
          <motion.div
            className="absolute -left-[6%] -top-[35%] aspect-square w-[45%] rounded-full bg-sky-500/30 blur-3xl"
            animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 8 }}
            aria-hidden
          />
          <motion.div
            className="absolute -bottom-[45%] -right-[5%] aspect-square w-1/2 rounded-full bg-violet-600/30 blur-3xl"
            animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 9 }}
            aria-hidden
          />
          <h2 className="relative text-3xl font-bold max-sm:text-[28px] sm:text-4xl">
            Have a project in mind? <span className="bg-[linear-gradient(92deg,#38bdf8_0%,#8b5cf6_55%,#2dd4bf_100%)] bg-clip-text text-transparent">Let&apos;s build it right.</span>
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-slate-300">
            Get a fixed-scope proposal within 48 hours — architecture, timeline and honest pricing.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact">Start your project →</Button>
            <Button href="/portfolio" variant="ghost" className="border-white/20 text-white">See our work</Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
