"use client";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { teamCategories } from "@/data/dedicated-team";
import { TeamIcon } from "@/components/common/team-icons";
import { cn } from "@/lib/utils";

interface TeamDropdownProps {
  variant?: "dropdown" | "accordion";
  /** Mobile: called after any navigation so the drawer can close. */
  onNavigate?: () => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;
const OPEN_DELAY = 120;
const CLOSE_DELAY = 160;

function Chevron({ open, className }: { open: boolean; className?: string }) {
  return (
    <motion.span
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.2, ease: EASE }}
      className={cn("inline-flex", className)}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="size-[0.875em]" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </motion.span>
  );
}

/* ================= Desktop hover dropdown (nested: categories -> roles) ================= */

function TeamMenu({ onNavigate }: Pick<TeamDropdownProps, "onNavigate">) {
  const pathname = usePathname();
  const active = pathname.startsWith("/dedicated-team");
  const [open, setOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState(teamCategories[0]?.slug ?? "");
  const wrapRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLButtonElement>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = useId();

  const activeCategory =
    teamCategories.find((c) => c.slug === activeSlug) ?? teamCategories[0];

  const clearTimers = () => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const scheduleOpen = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (open) return;
    openTimer.current = setTimeout(() => setOpen(true), OPEN_DELAY);
  };

  const scheduleClose = () => {
    if (openTimer.current) clearTimeout(openTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY);
  };

  const closeNow = useCallback(() => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(false);
  }, []);

  useEffect(
    () => () => {
      if (openTimer.current) clearTimeout(openTimer.current);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    []
  );

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) closeNow();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeNow();
        chevronRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, closeNow]);

  return (
    <div ref={wrapRef} onMouseEnter={scheduleOpen} onMouseLeave={scheduleClose} className="relative">
      <span className="inline-flex items-center gap-1">
        <Link
          href="/dedicated-team"
          data-active={active}
          onClick={closeNow}
          className="link-underline py-2 transition-colors hover:text-sky-500"
        >
          Dedicated Team
        </Link>
        <button
          ref={chevronRef}
          type="button"
          onClick={() => (open ? closeNow() : (clearTimers(), setOpen(true)))}
          aria-expanded={open}
          aria-haspopup="true"
          aria-controls={panelId}
          aria-label="Dedicated Team submenu"
          className="active:scale-[0.96] rounded-md p-1 transition-colors hover:text-sky-500"
        >
          <Chevron open={open} />
        </button>
      </span>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            role="menu"
            aria-label="Dedicated Team submenu"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="absolute left-1/2 top-full z-50 w-[92vw] max-w-2xl -translate-x-1/2 pt-3"
          >
            <div className="backdrop-blur-[18px] saturate-[1.4] overflow-hidden rounded-2xl border border-cyan-400/25 bg-[#0a1128]/90 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
              <div className="grid grid-cols-[12rem_1fr]">
                {/* LEFT: categories */}
                <ul className="space-y-1 border-r border-white/10 p-3" aria-label="Team categories">
                  {teamCategories.map((c) => {
                    const selected = c.slug === activeCategory?.slug;
                    return (
                      <li key={c.slug}>
                        <button
                          type="button"
                          onMouseEnter={() => setActiveSlug(c.slug)}
                          onFocus={() => setActiveSlug(c.slug)}
                          onClick={() => setActiveSlug(c.slug)}
                          aria-current={selected ? "true" : undefined}
                          className={cn(
                            "group flex w-full items-start gap-2.5 rounded-xl px-3 py-2.5 text-left transition-all duration-200",
                            "hover:bg-gradient-to-r hover:from-cyan-400/10 hover:to-rose-500/10",
                            selected && "bg-cyan-400/10"
                          )}
                        >
                          <span className="mt-0.5 shrink-0 text-cyan-300 transition-colors duration-200 group-hover:text-amber-300">
                            <TeamIcon slug={c.icon} />
                          </span>
                          <span className="block min-w-0">
                            <span className="block text-sm font-semibold text-white">{c.title}</span>
                            <span className="mt-0.5 block line-clamp-2 text-xs text-slate-400">{c.tagline}</span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
                {/* RIGHT: active category roles */}
                <div className="p-3">
                  {activeCategory && (
                    <ul className="grid grid-cols-2 gap-1" aria-label={`${activeCategory.title} roles`}>
                      {activeCategory.roles.map((role) => {
                        const href = `/dedicated-team/${role.slug}`;
                        const itemActive = pathname === href;
                        return (
                          <li key={role.slug} role="none">
                            <Link
                              role="menuitem"
                              href={href}
                              data-active={itemActive}
                              onClick={() => {
                                closeNow();
                                onNavigate?.();
                              }}
                              className={cn(
                                "group block rounded-xl border-l-2 border-transparent px-3 py-2.5 transition-all duration-200",
                                "hover:bg-gradient-to-r hover:from-cyan-400/10 hover:to-rose-500/10",
                                itemActive && "border-l-cyan-400 bg-cyan-400/10"
                              )}
                            >
                              <span className="block min-w-0 transition-transform duration-200 group-hover:translate-x-[0.2em]">
                                <span className="block text-sm font-semibold text-white">{role.title}</span>
                                <span className="mt-0.5 block truncate text-xs text-slate-400">{role.tagline}</span>
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>
              <div className="border-t border-white/10 px-5 py-3">
                <Link
                  href="/dedicated-team"
                  onClick={() => {
                    closeNow();
                    onNavigate?.();
                  }}
                  className="link-underline link-underline-gold text-sm font-semibold text-amber-300"
                >
                  View all team →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ================= Mobile accordion (nested per-category accordions) ================= */

function TeamAccordion({ onNavigate }: Pick<TeamDropdownProps, "onNavigate">) {
  const pathname = usePathname();
  const active = pathname.startsWith("/dedicated-team");
  const [open, setOpen] = useState(false);
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  return (
    <div>
      <div
        className={cn(
          "flex items-center justify-between rounded-xl px-3 py-2.5",
          active ? "bg-sky-500/10 text-sky-500" : "hover:bg-slate-100 dark:hover:bg-white/5"
        )}
      >
        <Link href="/dedicated-team" onClick={onNavigate} className="flex-1">
          Dedicated Team
        </Link>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Dedicated Team submenu"
          className="active:scale-[0.96] rounded-md p-1.5"
        >
          <Chevron open={open} />
        </button>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="overflow-hidden"
            aria-label="Dedicated Team submenu"
          >
            <li className="space-y-1 px-2 py-1.5">
              {teamCategories.map((c) => {
                const expanded = expandedSlug === c.slug;
                return (
                  <div key={c.slug} className="rounded-lg">
                    <button
                      type="button"
                      onClick={() => setExpandedSlug((s) => (s === c.slug ? null : c.slug))}
                      aria-expanded={expanded}
                      aria-label={`${c.title} roles`}
                      className="active:scale-[0.99] flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-slate-100 dark:hover:bg-white/5"
                    >
                      <span className="flex min-w-0 items-center gap-2.5">
                        <span className="shrink-0 text-cyan-500 dark:text-cyan-300">
                          <TeamIcon slug={c.icon} />
                        </span>
                        <span className="truncate font-medium">{c.title}</span>
                      </span>
                      <span className="flex shrink-0 items-center gap-1.5">
                        <span className="rounded-full bg-slate-200/70 px-2 py-0.5 text-xs font-semibold text-slate-600 dark:bg-white/10 dark:text-slate-300">
                          {c.roles.length}
                        </span>
                        <Chevron open={expanded} />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {expanded && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: EASE }}
                          className="overflow-hidden"
                          aria-label={`${c.title} roles`}
                        >
                          <li className="space-y-0.5 py-1 pl-11 pr-1">
                            {c.roles.map((role) => {
                              const href = `/dedicated-team/${role.slug}`;
                              const itemActive = pathname === href;
                              return (
                                <Link
                                  key={role.slug}
                                  href={href}
                                  onClick={onNavigate}
                                  className={cn(
                                    "block rounded-lg border-l-2 border-transparent px-3 py-2 text-sm transition-all duration-200",
                                    "hover:bg-gradient-to-r hover:from-cyan-400/10 hover:to-rose-500/10",
                                    itemActive && "border-l-cyan-400 bg-cyan-400/10 text-cyan-600 dark:text-cyan-300"
                                  )}
                                >
                                  <span className="block font-medium">{role.title}</span>
                                  <span className="block truncate text-xs text-slate-500">{role.tagline}</span>
                                </Link>
                              );
                            })}
                          </li>
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
              <Link
                href="/dedicated-team"
                onClick={onNavigate}
                className="link-underline link-underline-gold block px-3 py-2 text-sm font-semibold text-amber-600 dark:text-amber-300"
              >
                View all team →
              </Link>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ================= Public API ================= */

export function TeamDropdown({ variant = "dropdown", onNavigate }: TeamDropdownProps) {
  if (variant === "accordion") {
    return <TeamAccordion onNavigate={onNavigate} />;
  }
  return <TeamMenu onNavigate={onNavigate} />;
}
