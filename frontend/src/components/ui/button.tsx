"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = {
  href?: string;
  variant?: "primary" | "ghost" | "dark";
  children: React.ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ href, variant = "primary", children, className, ...rest }: Props) {
  const styles = cn(
    "active:scale-[0.96] inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300",
    variant === "primary" &&
      "bg-gradient-to-r from-sky-500 via-violet-500 to-teal-400 text-white shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-sky-500/30 hover:brightness-110",
    variant === "ghost" &&
      "border border-slate-300/60 text-current hover:border-sky-400 hover:text-sky-500 dark:border-white/15",
    variant === "dark" && "bg-[#0a1128] text-white hover:bg-[#16205a] dark:bg-white dark:text-[#0a1128]",
    className
  );
  const inner = (
    <motion.span
      className="inline-flex items-center gap-2"
      whileHover={{ x: 2 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {children}
    </motion.span>
  );
  if (href) return <Link href={href} className={styles} aria-label={typeof children === "string" ? children : undefined}>{inner}</Link>;
  return <button className={styles} {...rest}>{inner}</button>;
}
