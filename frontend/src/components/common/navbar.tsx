"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { useScrolled } from "@/hooks/hooks";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { MegaDropdown, type MegaItem } from "@/components/ui/mega-dropdown";
import { TeamDropdown } from "@/components/ui/team-dropdown";
import { IndustryIcon } from "@/components/common/industry-icons";
import { ServiceIcon } from "@/components/common/service-icons";
import { cn } from "@/lib/utils";
import styles from "./navbar.module.css";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);
  useEffect(() => {
    if (!open) return;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawerRef.current?.querySelector<HTMLButtonElement>('button[aria-label="Close menu"]')?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); return; }
      if (event.key !== "Tab") return;
      const items = Array.from(drawerRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex="0"]') ?? []).filter(item => item.getClientRects().length > 0);
      const first = items[0];
      const last = items.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", onKeyDown); trigger?.focus(); };
  }, [open]);
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const industryItems: MegaItem[] = industries.map((i) => ({
    href: `/industries/${i.slug}`,
    title: i.title,
    description: i.tagline,
    icon: <IndustryIcon slug={i.slug} />,
  }));

  const serviceItems: MegaItem[] = services.map((s) => ({
    href: `/services/${s.slug}`,
    title: s.title,
    description: s.tagline,
    icon: <ServiceIcon slug={s.slug} />,
  }));

  return (
    <header className="font-display fixed inset-x-0 top-0 z-50">
      {/* ===== TOP TRUST BAR (desktop, collapses on scroll) ===== */}
      <div
        className={cn(
          "hidden overflow-hidden bg-[#060a18] text-slate-300 transition-all duration-300 md:block",
          scrolled ? "max-h-0 opacity-0" : "max-h-24 opacity-100"
        )}
      >
        <div className={`${styles.trustBar} mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs`}>
          <div className="flex items-center gap-4">
            <a href="mailto:hello@nainitsolutions.com" className="transition-colors hover:text-sky-300">
              ✉ hello@nainitsolutions.com
            </a>
            <span className="h-3 w-px bg-white/15" aria-hidden />
            <a href="tel:+911204567890" className="transition-colors hover:text-sky-300">
              ☎ +91 120 456 7890
            </a>
            <span className="h-3 w-px bg-white/15" aria-hidden />
            <span className="inline-flex items-center gap-1.5 text-emerald-300">
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
              Available for new projects
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-amber-300">★★★★★ <span className="text-slate-300">5.0 · 80+ reviews</span></span>
            <span className="h-3 w-px bg-white/15" aria-hidden />
            <Link href="/contact" className="font-semibold text-sky-300 transition-colors hover:text-white">
              Get proposal in 48 hrs →
            </Link>
          </div>
        </div>
      </div>

      <div className={cn(
        "backdrop-blur-[18px] saturate-[1.4] relative border-b transition-all duration-300",
        scrolled
          ? "border-slate-200/80 bg-white/90 shadow-lg shadow-slate-900/5 dark:border-white/10 dark:bg-[#060a18]/90"
          : "border-slate-200/50 bg-white/75 dark:border-white/5 dark:bg-[#060a18]/70"
      )}>
        <nav className={`${styles.nav} mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-4 sm:px-6`} aria-label="Main navigation">
          <Link href="/" className="shrink-0 font-display text-2xl font-extrabold" onClick={() => setOpen(false)}>
            Nain<span className="bg-[linear-gradient(92deg,#38bdf8_0%,#8b5cf6_55%,#2dd4bf_100%)] bg-clip-text text-transparent">IT</span>
            <span className="ml-1.5 hidden text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500 sm:inline">Solutions</span>
          </Link>
          <div className={`${styles.desktopLinks} hidden items-center gap-3 text-sm font-semibold md:flex`}>
            {links.slice(0, 2).map((l) => (
              <Link key={l.href} href={l.href} data-active={isActive(l.href)} className={cn("link-underline transition-colors hover:text-sky-500", isActive(l.href) && "text-sky-500")}>
                {l.label}
              </Link>
            ))}
            <MegaDropdown label="Services" href="/services" items={serviceItems} footerLabel="View all services" currentPath={pathname} active={pathname.startsWith("/services")} />
            <MegaDropdown label="Industries" href="/industries" items={industryItems} footerLabel="View all industries" currentPath={pathname} active={pathname.startsWith("/industries")} />
            <TeamDropdown />
            {links.slice(3).map((l) => (
              <Link key={l.href} href={l.href} data-active={isActive(l.href)} className={cn("link-underline transition-colors hover:text-sky-500", isActive(l.href) && "text-sky-500")}>
                {l.label}
              </Link>
            ))}
          </div>
          <div className={`${styles.desktopActions} hidden shrink-0 items-center gap-2 md:flex`}>
            <Link href="/dashboard?preview=1" className="rounded-full border border-violet-400/40 px-3 py-2.5 text-xs font-semibold text-violet-600 dark:text-violet-300">Preview Admin</Link>
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              className="active:scale-[0.96] grid size-10 place-items-center rounded-full border border-slate-300/60 text-lg transition-colors hover:border-sky-400 dark:border-white/15"
            >
              {dark ? "☀" : "☾"}
            </button>
            {user?.role === "admin" ? (
              <>
                <button
                  onClick={() => router.push("/dashboard")}
                  className="active:scale-[0.96] grid size-10 place-items-center rounded-full bg-gradient-to-r from-sky-500 to-violet-500 text-sm font-bold text-white"
                  aria-label="Open dashboard"
                >
                  {user.name.charAt(0).toUpperCase()}
                </button>
                <button
                  onClick={() => {
                    logout();
                    router.push("/");
                  }}
                  className="text-sm text-slate-500 hover:text-rose-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/schedule-call"
                  className="active:scale-[0.96] group relative overflow-hidden rounded-full bg-gradient-to-r from-sky-500 via-violet-500 to-teal-400 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl hover:shadow-sky-500/30 hover:brightness-110"
                >
                  <span className="relative z-10">Schedule Call With Us →</span>
                  <span
                    aria-hidden
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                  />
                </Link>
              </>
            )}
          </div>

          {/* mobile toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              className="active:scale-[0.96] rounded-full border border-slate-300/60 p-2 text-base dark:border-white/15"
            >
              {dark ? "☀" : "☾"}
            </button>
            <Link
              href="/schedule-call"
              className="active:scale-[0.96] rounded-full bg-gradient-to-r from-sky-500 to-violet-500 max-w-[142px] px-3 py-2 text-center text-[10px] leading-4 font-semibold text-white shadow-lg shadow-violet-500/25 sm:max-w-none sm:text-xs"
            >
              Schedule Call With Us
            </Link>
            <button
              className="rounded-lg p-2"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="company-mobile-menu"
            >
              <span className="block h-[0.14em] w-[1.5em] bg-current transition-all" style={{ transform: open ? "rotate(45deg) translateY(0.5em)" : "none" }} />
              <span className={cn("my-[0.375em] block h-[0.14em] w-[1.5em] bg-current transition-all", open && "opacity-0")} />
              <span className="block h-[0.14em] w-[1.5em] bg-current transition-all" style={{ transform: open ? "rotate(-45deg) translateY(-0.5em)" : "none" }} />
            </button>
          </div>
        </nav>
        <div className="border-t border-slate-200/50 px-4 py-1.5 text-right text-[10px] dark:border-white/10 md:hidden"><Link href="/dashboard?preview=1" onClick={() => setOpen(false)} className="font-semibold text-violet-600 dark:text-violet-300">Preview Admin Dashboard ↗</Link></div>

        {/* scroll progress */}
        <motion.div
          style={{ scaleX: progress }}
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-sky-500 via-violet-500 to-teal-400"
          aria-hidden
        />

        {/* mobile slide-in */}
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
                className="fixed inset-0 top-0 h-dvh z-[-1] bg-black/40 backdrop-blur-sm md:hidden"
                aria-hidden
              />
              <motion.div
                ref={drawerRef}
                id="company-mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Company navigation"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 32 }}
                className="backdrop-blur-[18px] saturate-[1.4] fixed right-0 top-0 z-[60] flex h-dvh w-[88vw] max-w-sm flex-col overflow-hidden border-l border-slate-200 bg-white/95 dark:border-white/10 dark:bg-[#060a18]/95 md:hidden"
              >
                <div className="flex shrink-0 items-center justify-between border-b border-slate-200/60 p-5 dark:border-white/10">
                  <span className="font-display text-base font-extrabold">
                    Nain<span className="bg-[linear-gradient(92deg,#38bdf8_0%,#8b5cf6_55%,#2dd4bf_100%)] bg-clip-text text-transparent">IT</span>
                    <span className="ml-1 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">Menu</span>
                  </span>
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                    className="grid size-9 place-items-center rounded-full border border-slate-300/60 text-lg dark:border-white/15"
                  >
                    ✕
                  </button>
                </div>
                <ul className="min-h-0 flex-1 overflow-y-auto overscroll-contain space-y-1 p-5 text-[15px] font-medium">
                  {links.slice(0, 2).map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "block rounded-xl px-3 py-2.5",
                          isActive(l.href) ? "bg-sky-500/10 text-sky-500" : "hover:bg-slate-100 dark:hover:bg-white/5"
                        )}
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <MegaDropdown
                      variant="accordion"
                      label="Services"
                      href="/services"
                      items={serviceItems}
                      footerLabel="View all services"
                      currentPath={pathname}
                      active={pathname.startsWith("/services")}
                      onNavigate={() => setOpen(false)}
                    />
                  </li>
                  <li>
                    <MegaDropdown
                      variant="accordion"
                      label="Industries"
                      href="/industries"
                      items={industryItems}
                      footerLabel="View all industries"
                      currentPath={pathname}
                      active={pathname.startsWith("/industries")}
                      onNavigate={() => setOpen(false)}
                    />
                  </li>
                  <li><TeamDropdown variant="accordion" onNavigate={() => setOpen(false)} /></li>
                  {links.slice(3).map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "block rounded-xl px-3 py-2.5",
                          isActive(l.href) ? "bg-sky-500/10 text-sky-500" : "hover:bg-slate-100 dark:hover:bg-white/5"
                        )}
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="shrink-0 space-y-3 border-t border-slate-200/60 p-5 dark:border-white/10">
                  <Link href="/dashboard?preview=1" onClick={() => setOpen(false)} className="block rounded-full border border-violet-400/40 px-4 py-3 text-center text-sm font-semibold text-violet-600 dark:text-violet-300">Preview Admin Dashboard ↗</Link>
                  {user?.role === "admin" ? (
                    <button
                      onClick={() => {
                        setOpen(false);
                        router.push("/dashboard");
                      }}
                      className="w-full rounded-full bg-gradient-to-r from-sky-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white"
                    >
                      Open Dashboard →
                    </button>
                  ) : (
                    <>
                      <Link
                        href="/schedule-call"
                        onClick={() => setOpen(false)}
                        className="block w-full rounded-full bg-gradient-to-r from-sky-500 via-violet-500 to-teal-400 px-5 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-violet-500/25"
                      >
                        Schedule Call With Us →
                      </Link>

                    </>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
