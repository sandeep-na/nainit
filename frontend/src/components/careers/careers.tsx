"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/common/reveal";
import { CtaBanner } from "@/components/common/cta-banner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CareersHero } from "@/components/careers/careers-hero";
import { jobs } from "@/data/site";
import { u } from "@/lib/images";
import { cn } from "@/lib/utils";

const perks = [
  { icon: "◐", title: "Remote-first culture", copy: "Work from anywhere in India. Async by default, meetings by exception." },
  { icon: "✦", title: "Annual learning budget", copy: "₹1L per year for courses, conferences and certifications." },
  { icon: "⬢", title: "Health insurance", copy: "₹10L family cover from day one — parents included." },
  { icon: "▲", title: "Profit-share bonuses", copy: "When the company wins, you win. Quarterly payouts, transparent formula." },
  { icon: "☾", title: "No-meeting Fridays", copy: "One full day every week for deep work. No standups, no calls." },
  { icon: "▣", title: "Top-tier hardware", copy: "M-series MacBook + 4K monitor + home-office setup allowance." },
];

const steps = [
  { title: "20-min intro call", copy: "Culture, role and comp alignment. No trick questions." },
  { title: "Paid take-home", copy: "Real-world task, 3 hours max. We pay for your time." },
  { title: "Technical deep-dive", copy: "Walk us through your solution + past work discussion." },
  { title: "Offer in 5 days", copy: "Written offer with transparent salary band. No haggling games." },
];

const faqs = [
  { q: "Kya freshers apply kar sakte hain?", a: "Most roles need 2+ years of production experience since we're a senior-only team. Internships open twice a year — follow our LinkedIn for announcements." },
  { q: "Remote work permanent hai?", a: "Haan. Remote-first is our operating system, not a perk. A few roles are Hybrid/On-site (marked on each listing) for client-facing needs." },
  { q: "Interview process kitna lamba hai?", a: "Maximum 10 days, typically 5. Intro call → paid take-home → deep-dive → offer. You'll always know the next step and timeline." },
  { q: "Salary bands negotiable hain?", a: "Every listing shows the real band. Offers are made inside the band based on take-home + interview signal — same formula for everyone." },
  { q: "Referral bonus hai?", a: "Yes — ₹50k for every referred hire who completes 3 months. No cap." },
];

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="min-w-0 flex-1">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-slate-500">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white/70 px-4 py-3 text-sm outline-none transition-all dark:border-white/10 dark:bg-white/5"
      >
        <option value="">All {label.toLowerCase()}s</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

export function Careers() {
  const [query, setQuery] = useState("");
  const [team, setTeam] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const teams = useMemo(() => [...new Set(jobs.map((j) => j.team))], []);
  const locations = useMemo(() => [...new Set(jobs.map((j) => j.location))], []);
  const types = useMemo(() => [...new Set(jobs.map((j) => j.type))], []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter(
      (j) =>
        (!q || `${j.title} ${j.description} ${j.id}`.toLowerCase().includes(q)) &&
        (!team || j.team === team) &&
        (!location || j.location === location) &&
        (!type || j.type === type)
    );
  }, [query, team, location, type]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof jobs>();
    for (const j of filtered) {
      if (!map.has(j.team)) map.set(j.team, []);
      map.get(j.team)!.push(j);
    }
    return [...map.entries()];
  }, [filtered]);

  const hasFilters = query || team || location || type;

  return (
    <>
      <CareersHero />

      {/* STATS */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { value: `${jobs.length}`, label: "Open roles right now" },
            { value: `${teams.length}`, label: "Teams hiring" },
            { value: "5 days", label: "Max. time to offer" },
            { value: "98%", label: "Teammate retention" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="h-full">
              <Card hoverEffect="border" className="h-full w-full text-center">
                <div className="font-display text-3xl font-extrabold bg-[linear-gradient(92deg,#38bdf8_0%,#8b5cf6_55%,#2dd4bf_100%)] bg-clip-text text-transparent sm:text-4xl">{s.value}</div>
                <div className="mt-1 line-clamp-2 text-sm text-slate-500">{s.label}</div>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SEARCH + FILTERS + ROLES */}
      <section id="open-roles" className="mx-auto w-full max-w-5xl scroll-mt-28 px-4 py-6 sm:px-6">
        <Reveal>
          <Card className="w-full">
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="job-search" className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Search roles
                </label>
                <input
                  id="job-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Try “frontend”, “QA”, “manager”…"
                  className="w-full rounded-xl border border-slate-200 bg-white/70 px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400 dark:border-white/10 dark:bg-white/5 dark:placeholder:text-slate-500"
                />
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <FilterSelect label="Team" value={team} onChange={setTeam} options={teams} />
                <FilterSelect label="Location" value={location} onChange={setLocation} options={locations} />
                <FilterSelect label="Type" value={type} onChange={setType} options={types} />
              </div>
            </div>
          </Card>
        </Reveal>

        <div className="mt-6 flex items-center justify-between gap-3">
          <h2 className="text-2xl font-bold max-sm:text-[28px]">
            Open positions{" "}
            <span className="text-base font-semibold text-slate-500">
              ({filtered.length} of {jobs.length})
            </span>
          </h2>
          {hasFilters && (
            <button
              onClick={() => { setQuery(""); setTeam(""); setLocation(""); setType(""); }}
              className="shrink-0 rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold transition-colors hover:border-rose-400 hover:text-rose-500 dark:border-white/15"
            >
              Clear filters ✕
            </button>
          )}
        </div>

        {grouped.length === 0 ? (
          <Reveal className="mt-5">
            <Card className="w-full text-center">
              <div className="text-4xl">🔍</div>
              <h3 className="mt-3 font-bold">No roles match your filters</h3>
              <p className="mx-auto mt-1 max-w-md text-sm text-slate-600 dark:text-slate-400">
                Try a different keyword — or join our talent network and we&apos;ll ping you when the right role opens.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <Button href="/contact">Join talent network →</Button>
                <button
                  onClick={() => { setQuery(""); setTeam(""); setLocation(""); setType(""); }}
                  className="active:scale-[0.96] rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold dark:border-white/15"
                >
                  View all roles
                </button>
              </div>
            </Card>
          </Reveal>
        ) : (
          grouped.map(([teamName, list]) => (
            <div key={teamName} className="mt-8">
              <h3 className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-slate-500">
                <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-sky-500/15 to-violet-500/15 text-sky-500">
                  {teamName.charAt(0)}
                </span>
                {teamName}
                <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" aria-hidden />
                <span>{list.length} role{list.length > 1 ? "s" : ""}</span>
              </h3>
              <div className="mt-4 space-y-3">
                {list.map((j, i) => (
                  <Reveal key={j.id} delay={i * 0.05}>
                    <Link
                      href={`/careers/${j.slug}`}
                      aria-label={`${j.title} — view role details and apply`}
                      className="group flex w-full flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white p-5 backdrop-blur transition-all duration-300 hover:translate-x-1 hover:border-[#38bdf880] hover:border-sky-400/40 sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:bg-[#0c1530]"
                    >
                      <div className="min-w-0 flex-1">
                        <h4 className="line-clamp-1 font-bold transition-colors group-hover:text-sky-500">{j.title}</h4>
                        <p className="mt-1 line-clamp-1 text-xs text-slate-500">
                          {j.id} · {j.location} · {j.type} · {j.salary}
                        </p>
                        <p className="mt-1.5 line-clamp-1 text-sm text-slate-600 dark:text-slate-400">{j.description}</p>
                      </div>
                      <span className="inline-flex shrink-0 items-center gap-1 self-start rounded-full bg-gradient-to-r from-sky-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white sm:self-center">
                        View & apply <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          ))
        )}
      </section>

      {/* PERKS */}
      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6">
        <Reveal className="text-center">
          <span className="inline-flex rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-300">
            Benefits
          </span>
          <h2 className="mt-3 text-3xl font-extrabold max-sm:text-[28px] sm:text-4xl">
            Perks that <span className="bg-[linear-gradient(92deg,#38bdf8_0%,#8b5cf6_55%,#2dd4bf_100%)] bg-clip-text text-transparent">actually matter.</span>
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {perks.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 0.07} className="h-full">
              <Card hoverEffect="lift" className="flex h-full w-full flex-col">
                <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-sky-500/15 to-violet-500/15 text-xl">
                  {p.icon}
                </div>
                <h3 className="mt-3 line-clamp-1 font-bold">{p.title}</h3>
                <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">{p.copy}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CULTURE / LIFE */}
      <section id="culture" className="mx-auto w-full max-w-7xl scroll-mt-28 px-4 py-6 sm:px-6">
        <div className="grid items-stretch gap-5 lg:grid-cols-2">
          <Reveal className="h-full">
            <div className="relative h-full min-h-72 overflow-hidden rounded-3xl">
              <Image
                src={u("1497366811353-6870744d04b2", 1200)}
                alt="NainIT studio life"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060a18]/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="text-lg font-bold text-white">Noida HQ + remote across India</div>
                <div className="text-sm text-slate-300">Quarterly offsites · Monthly demo days · Annual retreat</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="h-full">
            <Card hoverEffect="lift" className="flex h-full w-full flex-col">
              <h2 className="text-2xl font-extrabold max-sm:text-[28px]">How we <span className="bg-[linear-gradient(92deg,#38bdf8_0%,#8b5cf6_55%,#2dd4bf_100%)] bg-clip-text text-transparent">work.</span></h2>
              <ul className="mt-4 flex-1 space-y-3 text-sm text-slate-600 dark:text-slate-400">
                {[
                  "Async-first: docs over meetings, Loom over calls.",
                  "Senior-only bar: no juniors learning on client budgets.",
                  "Blameless culture: retros fix systems, never people.",
                  "Real ownership: you ship to production in week one.",
                ].map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-xs font-bold text-emerald-500">✓</span>
                    <span className="min-w-0">{t}</span>
                  </li>
                ))}
              </ul>
              <div className="relative mt-5 h-auto w-full shrink-0 overflow-hidden rounded-2xl">
                <Image
                  src={u("1486406146926-c627a92ad1ab", 1000)}
                  alt="Office building"
                  width={800}
                  height={300}
                  className="aspect-[8/3] w-full object-cover"
                  loading="lazy"
                />
              </div>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* HIRING PROCESS */}
      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6">
        <Reveal className="text-center">
          <span className="inline-flex rounded-full border border-violet-400/30 bg-violet-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-300">
            Hiring process
          </span>
          <h2 className="mt-3 text-3xl font-extrabold max-sm:text-[28px] sm:text-4xl">
            Fast, fair, <span className="bg-[linear-gradient(92deg,#38bdf8_0%,#8b5cf6_55%,#2dd4bf_100%)] bg-clip-text text-transparent">transparent.</span>
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal variant="rise" key={s.title} delay={i * 0.07} className="h-full">
              <Card hoverEffect="underline" className="relative flex h-full w-full flex-col overflow-hidden">
                <div className="pointer-events-none absolute -right-2 -top-4 font-display text-7xl font-extrabold text-slate-100 dark:text-white/5">
                  {i + 1}
                </div>
                <div className="relative">
                  <span className="inline-flex rounded-full bg-gradient-to-r from-sky-500 to-violet-500 px-3 py-1 text-xs font-bold text-white">
                    Step {i + 1}
                  </span>
                  <h3 className="mt-3 line-clamp-1 font-bold">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">{s.copy}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6">
        <Reveal className="text-center">
          <h2 className="text-3xl font-extrabold max-sm:text-[28px]">Career <span className="bg-[linear-gradient(92deg,#38bdf8_0%,#8b5cf6_55%,#2dd4bf_100%)] bg-clip-text text-transparent">FAQs.</span></h2>
        </Reveal>
        <div className="mt-6 space-y-3">
          {faqs.map((f, i) => {
            const open = openFaq === i;
            return (
              <Reveal key={f.q} delay={i * 0.05}>
                <div className="w-full overflow-hidden rounded-2xl border border-slate-200/70 card-surface dark:border-white/10">
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                    aria-expanded={open}
                  >
                    <span className="min-w-0 text-sm font-bold sm:text-base">{f.q}</span>
                    <span className={cn("grid size-8 shrink-0 place-items-center rounded-full border transition-transform duration-300", open ? "rotate-45 border-sky-400 text-sky-500" : "border-slate-300 dark:border-white/15")}>+</span>
                  </button>
                  <div className={cn("grid transition-all duration-300", open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
