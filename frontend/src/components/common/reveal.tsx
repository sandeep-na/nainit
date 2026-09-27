"use client";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

export function Reveal({
  children,
  delay = 0,
  className,
  variant = "fade",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  variant?: "fade" | "rise" | "scale" | "slide";
}) {
  const reducedMotion = useReducedMotion();
  const enter = {
    fade: { opacity: 0 },
    rise: { opacity: 0, y: 20 },
    scale: { opacity: 0, scale: 0.97 },
    slide: { opacity: 0, x: -16 },
  }[variant];

  return (
    <motion.div
      initial={reducedMotion ? false : enter}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      key={pathname}
      initial={reducedMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: reducedMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
