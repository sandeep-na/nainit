"use client";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MegaItem {
  href: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

interface MegaDropdownProps {
  label: string;
  href: string;
  items: MegaItem[];
  footerLabel?: string;
  /** Current route — marks the matching item + parent as active. */
  currentPath?: string;
  /** Parent highlighted when true (e.g. path prefix match). */
  active?: boolean;
  columns?: 2 | 3;
  variant?: "dropdown" | "accordion";
  className?: string;
  /** Mobile: called after any navigation so the drawer can close. */
  onNavigate?: () => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;
const OPEN_DELAY = 120; // ms — avoids flicker when sweeping across the nav
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

/* ================= Desktop hover dropdown ================= */

function MegaMenu({ label, href, items, footerLabel, currentPath, active, columns = 2, className, onNavigate }: Omit<MegaDropdownProps, "variant">) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = useId();

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

  // Arrow-key navigation inside the panel
  const onMenuKeyDown = (e: React.KeyboardEvent) => {
    const focusables = itemRefs.current.filter(Boolean) as HTMLAnchorElement[];
    const idx = focusables.indexOf(document.activeElement as HTMLAnchorElement);
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      focusables[(idx + 1) % focusables.length]?.focus();
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      focusables[(idx - 1 + focusables.length) % focusables.length]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      focusables[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      focusables[focusables.length - 1]?.focus();
    }
  };

  return (
    <div ref={wrapRef} className={cn("relative", className)} onMouseEnter={scheduleOpen} onMouseLeave={scheduleClose}>
      <span className="inline-flex items-center gap-1">
        <Link
          href={href}
          data-active={active}
          onClick={closeNow}
          className="link-underline py-2 transition-colors hover:text-sky-500"
        >
          {label}
        </Link>
        <button
          ref={chevronRef}
          type="button"
          onClick={() => (open ? closeNow() : (clearTimers(), setOpen(true)))}
          aria-expanded={open}
          aria-haspopup="true"
          aria-controls={panelId}
          aria-label={`${label} submenu`}
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
            aria-label={`${label} submenu`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: EASE }}
            onKeyDown={onMenuKeyDown}
            className="absolute left-1/2 top-full z-50 w-[92vw] max-w-xl -translate-x-1/2 pt-3"
          >
            <div className="backdrop-blur-[18px] saturate-[1.4] overflow-hidden rounded-2xl border border-cyan-400/25 bg-[#0a1128]/90 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
              <ul className={cn("grid gap-1 p-3", columns === 3 ? "grid-cols-3" : "grid-cols-2")}>
                {items.map((item, i) => {
                  const itemActive = currentPath === item.href;
                  return (
                    <li key={item.href} role="none">
                      <Link
                        ref={(el) => {
                          itemRefs.current[i] = el;
                        }}
                        role="menuitem"
                        href={item.href}
                        data-active={itemActive}
                        onClick={() => {
                          closeNow();
                          onNavigate?.();
                        }}
                        className={cn(
                          "group flex items-start gap-3 rounded-xl border-l-2 border-transparent px-3 py-3 transition-all duration-200",
                          "hover:bg-gradient-to-r hover:from-cyan-400/10 hover:to-rose-500/10",
                          itemActive && "border-l-cyan-400 bg-cyan-400/10"
                        )}
                      >
                        {item.icon && (
                          <span className="mt-0.5 shrink-0 text-cyan-300 transition-colors duration-200 group-hover:text-amber-300">
                            {item.icon}
                          </span>
                        )}
                        <span className="block min-w-0 transition-transform duration-200 group-hover:translate-x-[0.2em]">
                          <span className="block text-sm font-semibold text-white">{item.title}</span>
                          {item.description && (
                            <span className="mt-0.5 block line-clamp-1 text-xs text-slate-400">{item.description}</span>
                          )}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              {footerLabel && (
                <div className="border-t border-white/10 px-5 py-3">
                  <Link
                    href={href}
                    onClick={() => {
                      closeNow();
                      onNavigate?.();
                    }}
                    className="link-underline link-underline-gold text-sm font-semibold text-amber-300"
                  >
                    {footerLabel} →
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ================= Mobile accordion (inside slide-in drawer) ================= */

function MegaAccordion({ label, href, items, footerLabel, currentPath, active, onNavigate }: Omit<MegaDropdownProps, "variant" | "columns">) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div
        className={cn(
          "flex items-center justify-between rounded-xl px-3 py-2.5",
          active ? "bg-sky-500/10 text-sky-500" : "hover:bg-slate-100 dark:hover:bg-white/5"
        )}
      >
        <Link href={href} onClick={onNavigate} className="flex-1">
          {label}
        </Link>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={`${label} submenu`}
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
            aria-label={`${label} submenu`}
          >
            <li className="space-y-0.5 px-2 py-1.5">
              {items.map((item) => {
                const itemActive = currentPath === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      "group flex items-center gap-3 rounded-lg border-l-2 border-transparent px-3 py-2 text-sm transition-all duration-200",
                      "hover:bg-gradient-to-r hover:from-cyan-400/10 hover:to-rose-500/10",
                      itemActive && "border-l-cyan-400 bg-cyan-400/10 text-cyan-600 dark:text-cyan-300"
                    )}
                  >
                    {item.icon && (
                      <span className="shrink-0 text-cyan-500 transition-colors duration-200 group-hover:text-amber-500 dark:text-cyan-300 dark:group-hover:text-amber-300">
                        {item.icon}
                      </span>
                    )}
                    <span className="block min-w-0 transition-transform duration-200 group-hover:translate-x-[0.2em]">
                      <span className="block font-medium">{item.title}</span>
                      {item.description && <span className="block truncate text-xs text-slate-500">{item.description}</span>}
                    </span>
                  </Link>
                );
              })}
              {footerLabel && (
                <Link
                  href={href}
                  onClick={onNavigate}
                  className="link-underline link-underline-gold block px-3 py-2 text-sm font-semibold text-amber-600 dark:text-amber-300"
                >
                  {footerLabel} →
                </Link>
              )}
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ================= Public API ================= */

export function MegaDropdown(props: MegaDropdownProps) {
  const { label, href, items, footerLabel, currentPath, active, onNavigate } = props;
  if (props.variant === "accordion") {
    return (
      <MegaAccordion
        label={label}
        href={href}
        items={items}
        footerLabel={footerLabel}
        currentPath={currentPath}
        active={active}
        onNavigate={onNavigate}
      />
    );
  }
  return (
    <MegaMenu
      label={label}
      href={href}
      items={items}
      footerLabel={footerLabel}
      currentPath={currentPath}
      active={active}
      columns={props.columns}
      onNavigate={onNavigate}
    />
  );
}
