"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { teamCategories, vettingProcess } from "@/data/dedicated-team";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/common/reveal";
import { CtaBanner } from "@/components/common/cta-banner";

const GRADIENT_TEXT =
  "bg-[linear-gradient(92deg,#38bdf8_0%,#8b5cf6_55%,#2dd4bf_100%)] bg-clip-text text-transparent";

const tones = ["sky", "violet", "mint", "peach"] as const;

function CategoryIcon({ icon }: { icon: string }) {
  const cls = "h-5 w-5";
  switch (icon) {
    case "users":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "chart":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden>
          <path d="M3 3v16a2 2 0 0 0 2 2h16" />
          <path d="M7 13l3 3 7-7" />
        </svg>
      );
    case "chip":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden>
          <rect x="6" y="6" width="12" height="12" rx="2" />
          <rect x="10" y="10" width="4" height="4" />
          <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden>
          <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
        </svg>
      );
  }
}

const heroStats = [
  { value: "17", label: "specialists" },
  { value: "48-hr", label: "shortlist" },
  { value: "4.9/5", label: "avg rating" },
  { value: "No", label: "hiring fees" },
];

const steps = [
  {
    n: "01",
    title: "Tell us the gap",
    copy: "A 30-min call to map the roles, stack and outcomes you need. We scope the pod the same day.",
  },
  {
    n: "02",
    title: "Shortlist in 48 hrs",
    copy: "Hand-picked CVs with code samples and intro videos. Interview only the ones worth your time.",
  },
  {
    n: "03",
    title: "Trial sprint",
    copy: "Two weeks embedded in your rituals — with a free replacement if the fit isn't perfect.",
  },
  {
    n: "04",
    title: "Scale monthly",
    copy: "Add or release specialists every month. One invoice, no hiring fees, no lock-in drama.",
  },
];

const firstMonth = [
  {
    week: "Week 1",
    title: "Kickoff & onboarding",
    copy: "Meet your pod on a kickoff call. We map your board, repo, rituals and definition of done — access and introductions finished in days, not weeks.",
    points: ["Kickoff call + success metrics", "Access, repo & board setup", "Communication norms locked"],
  },
  {
    week: "Week 2",
    title: "Trial sprint",
    copy: "Your specialists join standups and pick up real tickets from your backlog. You see velocity, code quality and communication first-hand.",
    points: ["Real tickets, real code", "Daily async updates", "Mid-sprint check-in"],
  },
  {
    week: "Week 3",
    title: "Full velocity",
    copy: "The pod runs at full speed inside your sprint cycle — planning, reviews and demos, with a delivery lead keeping every risk visible.",
    points: ["Own sprint commitments", "Demo at sprint review", "Risks flagged early"],
  },
  {
    week: "Week 4",
    title: "Review & scale",
    copy: "Month-end review against the success metrics from week one. Keep the pod, adjust roles or scale up — your call, every single month.",
    points: ["Outcome review", "Adjust roles anytime", "Next-month roadmap"],
  },
];

const why = [
  {
    title: "Senior-only",
    copy: "3–6 yrs average experience. No juniors billed as seniors — every profile shows real shipped work.",
    glyph: "★",
  },
  {
    title: "Timezone overlap",
    copy: "4+ hours of shared workday with EU & US teams. Standups in your morning, demos in your afternoon.",
    glyph: "◐",
  },
  {
    title: "Your tools",
    copy: "Slack, Jira, Linear, GitHub — we plug into your stack on day one instead of forcing ours.",
    glyph: "⎔",
  },
  {
    title: "Replace-free guarantee",
    copy: "Not the right fit in the first two weeks? We swap the specialist free and restart the trial.",
    glyph: "↺",
  },
];

const compareRows = [
  {
    label: "Vetting",
    us: "5-stage process, only 3% pass",
    freelancers: "Self-reported profiles",
    inhouse: "2–3 month hiring cycle",
  },
  {
    label: "Start time",
    us: "Shortlist in 48 hours",
    freelancers: "Days of searching + interviews",
    inhouse: "6–12 weeks to onboard",
  },
  {
    label: "If it's not a fit",
    us: "Free replacement in 15 days",
    freelancers: "Start over from zero",
    inhouse: "Restart hiring + notice periods",
  },
  {
    label: "Delivery oversight",
    us: "Delivery lead included",
    freelancers: "Your time, your risk",
    inhouse: "Your managers' bandwidth",
  },
  {
    label: "Contracts & IP",
    us: "NDA + full IP transfer",
    freelancers: "Varies, often unclear",
    inhouse: "Payroll, benefits, overhead",
  },
];

const guarantees = [
  { title: "2-week trial sprint", copy: "Real work in your repo before you commit to anything." },
  { title: "Free replacement", copy: "Not a fit in 15 days? We swap the specialist, free." },
  { title: "Your IP, always", copy: "NDA signed up front, 100% IP transfer on payment." },
  { title: "Pause anytime", copy: "Month-to-month after the trial. No lock-in, ever." },
];

const faqs = [
  {
    q: "How fast can we start?",
    a: "You'll get a curated shortlist within 48 hours of the scoping call. Most teams interview in week one and kick off the trial sprint in week two.",
  },
  {
    q: "How does the 2-week trial sprint work?",
    a: "Your specialist joins your standups, board and repo for two real weeks of work. If the fit isn't right for any reason, we replace them free and the trial restarts — you only continue with people you'd hire.",
  },
  {
    q: "Can we scale the team up or down?",
    a: "Yes — every engagement is month-to-month after the trial. Add roles as the roadmap grows, or release specialists with 2 weeks' notice. One consolidated invoice either way.",
  },
  {
    q: "Do they work in our timezone and tools?",
    a: "We guarantee at least 4 hours of overlap with your workday, and the pod works inside your Slack, Jira/Linear, GitHub and CI setup from day one — no parallel process, no translation layer.",
  },
  {
    q: "What does it cost? Are there hiring fees?",
    a: "Every pod is scoped on a 30-min call and billed monthly — one invoice, no hourly meters running. There are zero hiring, conversion or placement fees, and you can pause or scale every month.",
  },
];

export function DedicatedTeam() {
  return (
    <div>
      {/* ============ HERO (custom) ============ */}
      <section className="relative overflow-hidden pb-16 pt-28 sm:pt-36">
        <div
          className="bg-[linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_90%_70%_at_50%_30%,black_40%,transparent_100%)] absolute inset-0"
          aria-hidden
        />
        <div
          className="absolute left-1/2 top-0 aspect-[3/1] w-[84vw] max-w-[42rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-gradient-to-r from-sky-400/25 via-violet-500/25 to-teal-300/25 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-300">
              <span className="size-[0.5em] animate-pulse rounded-full bg-emerald-400" />
              Dedicated Team
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-6xl">
              Your team, <span className={GRADIENT_TEXT}>minus the hiring pain.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-600 dark:text-slate-400">
              Senior developers, delivery leads, analysts and AI engineers who join your rituals,
              tools and roadmap — shortlisted in 48 hours, productive by week two.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact">Build my team →</Button>
              <Button href="#roles" variant="ghost">
                Browse roles
              </Button>
            </div>
            <dl className="mt-10 flex flex-wrap gap-2.5">
              {heroStats.map((s) => (
                <div
                  key={s.label}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-4 py-2 text-sm backdrop-blur dark:border-white/10 dark:bg-white/5"
                >
                  <dt className="sr-only">{s.label}</dt>
                  <dd className={`font-extrabold ${GRADIENT_TEXT}`}>{s.value}</dd>
                  <span className="text-slate-500 dark:text-slate-400">{s.label}</span>
                </div>
              ))}
            </dl>
          </motion.div>

          {/* Pod preview card — the distinctive visual */}
          <motion.div
            initial={{ opacity: 0, y: 26, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div
              className="absolute -inset-6 rounded-[2rem] bg-gradient-to-r from-sky-400/15 via-violet-500/15 to-teal-300/15 blur-2xl"
              aria-hidden
            />
            <Card tone="violet" hoverEffect="lift" className="relative">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Your pod this month
                </p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-300">
                  <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
                  In sprint
                </span>
              </div>
              <ul className="mt-5 space-y-3">
                {[
                  { r: "Next.js Developer", m: "Full-time · Senior", dot: "bg-sky-400" },
                  { r: "AI Engineer", m: "Full-time · Senior", dot: "bg-violet-400" },
                  { r: "Scrum Master", m: "Part-time · Senior", dot: "bg-teal-400" },
                ].map((m) => (
                  <li
                    key={m.r}
                    className="flex items-center gap-3 rounded-xl border border-slate-200/60 bg-white/60 px-4 py-3 dark:border-white/10 dark:bg-white/5"
                  >
                    <span className={`size-2.5 shrink-0 rounded-full ${m.dot}`} aria-hidden />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{m.r}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{m.m}</p>
                    </div>
                    <span className="ml-auto text-xs font-semibold text-emerald-600 dark:text-emerald-300">
                      ✓ Vetted
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-center justify-between rounded-xl bg-[#0a1128] px-4 py-3 text-sm text-white dark:bg-white dark:text-[#0a1128]">
                <span className="font-semibold">Shortlist ready in</span>
                <span className="font-extrabold tabular-nums">48 hrs</span>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ============ CHOOSE YOUR SQUAD ============ */}
      <section id="roles" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Choose your squad"
          title={
            <>
              Four squads. <span className={GRADIENT_TEXT}>Seventeen specialists.</span>
            </>
          }
          copy="Pick a role to see skills, responsibilities and timelines — every profile is senior-only and trial-backed."
        />
        <div className="mt-14 space-y-16">
          {teamCategories.map((cat, ci) => (
            <Reveal key={cat.slug} variant="rise">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-violet-500 to-teal-400 text-white shadow-lg shadow-violet-500/25">
                    <CategoryIcon icon={cat.icon} />
                  </span>
                  <div>
                    <h2 className="text-3xl font-bold max-sm:text-[28px] sm:text-4xl">{cat.title}</h2>
                    <p className="mt-1 font-medium text-slate-600 dark:text-slate-300">{cat.tagline}</p>
                  </div>
                </div>
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200/70 bg-white/60 px-4 py-1.5 text-xs font-semibold text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
                  {cat.roles.length} roles · senior-only
                </span>
              </div>
              <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-400">{cat.description}</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {cat.roles.map((role, ri) => (
                  <Reveal key={role.slug} variant="rise" delay={(ri % 3) * 0.07} className="h-full">
                    <Link
                      href={`/dedicated-team/${role.slug}`}
                      className="block h-full rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-500"
                      aria-label={`Hire a ${role.title} — ${role.tagline}`}
                    >
                      <Card
                        tone={tones[(ci + ri) % tones.length]}
                        hoverEffect="spotlight"
                        className="h-full transition-transform duration-300 hover:-translate-y-1"
                      >
                        <span
                          className="h-1 w-12 rounded-full bg-[linear-gradient(92deg,#38bdf8_0%,#8b5cf6_55%,#2dd4bf_100%)]"
                          aria-hidden
                        />
                        <h3 className="mt-4 text-lg font-bold">{role.title}</h3>
                        <p className="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
                          {role.tagline}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {role.skills.slice(0, 4).map((s) => (
                            <span
                              key={s}
                              className="rounded-full border border-slate-200/70 bg-white/60 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                        <div className="mt-5 flex items-center justify-between border-t border-slate-200/60 pt-4 text-sm dark:border-white/10">
                          <span>
                            <span className="font-extrabold">{role.experience}</span>
                            <span className="text-slate-500 dark:text-slate-400"> · starts in {role.hireTimeline}</span>
                          </span>
                          <span
                            className={`font-bold ${GRADIENT_TEXT}`}
                            aria-hidden
                          >
                            →
                          </span>
                        </div>
                      </Card>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ SELECTION PROCESS ============ */}
      <section id="selection" className="scroll-mt-24 border-y border-slate-200/60 bg-white/50 py-20 dark:border-white/10 dark:bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="How we select your team"
            title={
              <>
                Hired like it&apos;s <span className={GRADIENT_TEXT}>our own product on the line.</span>
              </>
            }
            copy="Every specialist in the pool cleared the same 5-stage bar — before you ever see their profile."
          />
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {vettingProcess.map((v, i) => (
              <Reveal key={v.n} variant="rise" delay={i * 0.07} className="h-full">
                <li className="flex h-full flex-col rounded-2xl border border-slate-200/70 bg-white p-6 dark:border-white/10 dark:bg-[#0c1530]">
                  <span className={`text-sm font-extrabold ${GRADIENT_TEXT}`}>Stage {v.n}</span>
                  <h3 className="mt-2 font-bold">{v.title}</h3>
                  <p className="mt-1.5 flex-1 text-sm text-slate-600 dark:text-slate-400">{v.copy}</p>
                  <p className="mt-4 rounded-xl bg-gradient-to-r from-sky-500/10 via-violet-500/10 to-teal-400/10 px-3 py-2 text-center text-xs font-bold text-slate-700 dark:text-slate-200">
                    {v.stat}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ US VS THEM ============ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Why teams switch"
          title={
            <>
              The pod, <span className={GRADIENT_TEXT}>versus the alternatives.</span>
            </>
          }
          copy="Freelancers gamble your timeline. In-house hiring eats quarters. Here's the third option."
        />
        <Reveal variant="rise" className="mt-10">
          <div className="overflow-x-auto rounded-2xl border border-slate-200/70 dark:border-white/10">
            <table className="w-full min-w-[640px] border-collapse bg-white text-left text-sm dark:bg-[#0c1530]">
              <thead>
                <tr>
                  <th className="p-5 font-semibold text-slate-500 dark:text-slate-400">
                    <span className="sr-only">Compare on</span>
                  </th>
                  <th className="bg-[#0a1128] p-5 font-extrabold text-white dark:bg-violet-500/20">
                    NainIT Pod
                  </th>
                  <th className="p-5 font-semibold text-slate-500 dark:text-slate-400">Freelancers</th>
                  <th className="p-5 font-semibold text-slate-500 dark:text-slate-400">In-house hiring</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, i) => (
                  <tr
                    key={row.label}
                    className={i % 2 === 0 ? "bg-slate-50/70 dark:bg-white/[0.02]" : ""}
                  >
                    <th className="border-t border-slate-200/60 p-5 font-bold dark:border-white/10">
                      {row.label}
                    </th>
                    <td className="border-t border-slate-200/60 bg-sky-500/[0.06] p-5 font-semibold text-slate-800 dark:border-white/10 dark:bg-violet-500/10 dark:text-slate-100">
                      <span className="mr-2 text-emerald-500" aria-hidden>
                        ✓
                      </span>
                      {row.us}
                    </td>
                    <td className="border-t border-slate-200/60 p-5 text-slate-600 dark:border-white/10 dark:text-slate-400">
                      {row.freelancers}
                    </td>
                    <td className="border-t border-slate-200/60 p-5 text-slate-600 dark:border-white/10 dark:text-slate-400">
                      {row.inhouse}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>

      {/* ============ GUARANTEE BAND ============ */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <Reveal variant="scale">
          <div className="relative overflow-hidden rounded-3xl bg-[#0a1128] px-6 py-12 sm:px-12">
            <div
              className="absolute -left-[10%] -top-[40%] aspect-square w-[40%] rounded-full bg-sky-500/25 blur-3xl"
              aria-hidden
            />
            <div
              className="absolute -bottom-[50%] -right-[5%] aspect-square w-[40%] rounded-full bg-violet-600/25 blur-3xl"
              aria-hidden
            />
            <div className="relative flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-sky-300">
                  Zero-risk hiring
                </p>
                <h2 className="mt-2 text-3xl font-bold text-white max-sm:text-[28px] sm:text-4xl">
                  Hire with <span className={GRADIENT_TEXT}>a safety net.</span>
                </h2>
              </div>
              <Button href="/contact">Claim trial sprint →</Button>
            </div>
            <div className="relative mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {guarantees.map((g) => (
                <div
                  key={g.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
                >
                  <p className="font-bold text-white">{g.title}</p>
                  <p className="mt-1 text-sm text-slate-300">{g.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="border-y border-slate-200/60 bg-white/50 py-20 dark:border-white/10 dark:bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="How it works"
            title={
              <>
                From gap to <span className={GRADIENT_TEXT}>productive pod in 2 weeks.</span>
              </>
            }
            copy="A hiring pipeline without the hiring — you approve every profile, we handle everything else."
          />
          <ol className="relative mt-12 grid gap-5 md:grid-cols-4">
            <div
              className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-sky-400/40 via-violet-500/40 to-teal-300/40 md:block"
              aria-hidden
            />
            {steps.map((s, i) => (
              <Reveal key={s.n} variant="rise" delay={i * 0.08} className="h-full">
                <li className="relative h-full rounded-2xl border border-slate-200/70 bg-white p-6 dark:border-white/10 dark:bg-[#0c1530]">
                  <span className="relative inline-flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-violet-500 to-teal-400 font-extrabold text-white shadow-lg shadow-violet-500/25">
                    {s.n}
                  </span>
                  <h3 className="mt-4 font-bold">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">{s.copy}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ FIRST 30 DAYS ============ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="First 30 days"
          title={
            <>
              Know exactly <span className={GRADIENT_TEXT}>what happens after you say go.</span>
            </>
          }
          copy="No black box. Every pod follows the same month-one playbook — visible to you from day one."
        />
        <ol className="relative mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div
            className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-sky-400/40 via-violet-500/40 to-teal-300/40 xl:block"
            aria-hidden
          />
          {firstMonth.map((w, i) => (
            <Reveal key={w.week} variant="rise" delay={i * 0.08} className="h-full">
              <li className="relative flex h-full flex-col rounded-2xl border border-slate-200/70 bg-white p-6 dark:border-white/10 dark:bg-[#0c1530]">
                <span className="relative w-fit rounded-full bg-gradient-to-r from-sky-500 via-violet-500 to-teal-400 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-white shadow-lg shadow-violet-500/25">
                  {w.week}
                </span>
                <h3 className="mt-4 text-lg font-bold">{w.title}</h3>
                <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">{w.copy}</p>
                <ul className="mt-4 space-y-2 border-t border-slate-200/60 pt-4 text-sm dark:border-white/10">
                  {w.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <span className="text-emerald-500" aria-hidden>
                        ✓
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </li>
            </Reveal>
          ))}
        </ol>
        <Reveal variant="rise" className="mt-10 text-center">
          <Button href="/contact">Start week one →</Button>
        </Reveal>
      </section>

      {/* ============ WHY NAINIT ============ */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <SectionHeading
          eyebrow="Why NainIT"
          title={
            <>
              The pod feels <span className={GRADIENT_TEXT}>like your own team.</span>
            </>
          }
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {why.map((f, i) => (
            <Reveal key={f.title} variant="rise" delay={(i % 4) * 0.07} className="h-full">
              <Card tone={tones[i % tones.length]} hoverEffect="border" className="h-full text-center sm:text-left">
                <span
                  className={`mx-auto inline-flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 via-violet-500 to-teal-400 text-lg font-bold text-white shadow-lg shadow-violet-500/25 sm:mx-0`}
                  aria-hidden
                >
                  {f.glyph}
                </span>
                <h3 className="mt-4 font-bold">{f.title}</h3>
                <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">{f.copy}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              Questions? <span className={GRADIENT_TEXT}>Answered.</span>
            </>
          }
        />
        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} variant="rise" delay={i * 0.05}>
              <details className="group rounded-2xl border border-slate-200/70 bg-white/70 px-5 py-4 transition-colors open:border-violet-400/40 dark:border-white/10 dark:bg-white/5 dark:open:border-violet-400/40">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 via-violet-500 to-teal-400 text-sm font-bold text-white transition-transform duration-300 group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}
