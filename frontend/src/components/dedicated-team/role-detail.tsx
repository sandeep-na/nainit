import Link from "next/link";
import { Reveal } from "@/components/common/reveal";
import { CtaBanner } from "@/components/common/cta-banner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllTeamRoles, vettingProcess } from "@/data/dedicated-team";
import type { TeamCategory, TeamRole } from "@/types";

const sectionClass = "mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16";
const eyebrowClass =
  "text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300";
const gradientText =
  "bg-[linear-gradient(92deg,#38bdf8_0%,#8b5cf6_55%,#2dd4bf_100%)] bg-clip-text text-transparent";

function splitTitle(title: string) {
  const words = title.trim().split(/\s+/);
  if (words.length === 1) return { head: "", tail: words[0] };
  return { head: words.slice(0, -1).join(" "), tail: words.slice(-1)[0] };
}

function RoleBadge() {
  // Inline badge — team-icons.tsx is owned by another agent, so keep this local.
  return (
    <span
      aria-hidden
      className="grid size-11 shrink-0 place-items-center rounded-2xl border border-sky-400/30 bg-gradient-to-br from-sky-500/15 via-violet-500/15 to-teal-400/15"
    >
      <svg viewBox="0 0 12 12" className="size-3 text-sky-500" fill="currentColor">
        <circle cx="6" cy="6" r="5" />
      </svg>
    </span>
  );
}

export function RoleDetail({ role, category }: { role: TeamRole; category: TeamCategory }) {
  const { head, tail } = splitTitle(role.title);
  const short = role.title.split(" ")[0];

  const sameCategory = category.roles.filter((r) => r.slug !== role.slug);
  const filler = getAllTeamRoles().filter(
    (r) => r.slug !== role.slug && !sameCategory.some((s) => s.slug === r.slug)
  );
  const related = [...sameCategory, ...filler].slice(0, 3);

  const meta = [
    { label: "Experience", value: role.experience },
    { label: "Vetting", value: "Top 3% pass" },
    { label: "Start in", value: role.hireTimeline },
  ];

  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-5 pt-8 sm:px-8">
        <ol className="flex flex-wrap items-center gap-2 text-xs font-medium text-[var(--muted)]">
          <li>
            <Link href="/dedicated-team" className="rounded-sm transition-colors hover:text-violet-600 dark:hover:text-violet-300">
              Dedicated Team
            </Link>
          </li>
          <li aria-hidden className="text-slate-400">/</li>
          <li>
            <Link href="/dedicated-team#roles" className="rounded-sm transition-colors hover:text-violet-600 dark:hover:text-violet-300">
              {category.title}
            </Link>
          </li>
          <li aria-hidden className="text-slate-400">/</li>
          <li aria-current="page" className="text-slate-900 dark:text-white">{role.title}</li>
        </ol>
      </nav>

      {/* Hero band */}
      <section className="mx-auto max-w-7xl px-5 pb-4 pt-8 sm:px-8 sm:pt-12">
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-sky-200/70 bg-gradient-to-br from-sky-100/80 via-sky-50/70 to-violet-100/70 p-6 dark:border-sky-400/15 dark:from-sky-500/10 dark:via-sky-500/5 dark:to-violet-500/10 sm:p-10 lg:p-12">
          <div aria-hidden className="pointer-events-none absolute -right-20 -top-24 -z-10 size-80 rounded-full bg-violet-500/20 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-28 -left-16 -z-10 size-72 rounded-full bg-sky-400/20 blur-3xl" />
          <Reveal>
            <div className="flex items-center gap-4">
              <RoleBadge />
              <p className={eyebrowClass}>{category.title}</p>
            </div>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
              {head && <>{head} </>}
              <span className={gradientText}>{tail}</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">
              {role.tagline} {role.description}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {meta.map((m) => (
                <li
                  key={m.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-4 py-2 text-xs font-semibold text-slate-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                >
                  <span className="text-[var(--muted)]">{m.label}:</span> {m.value}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact">Hire {short} →</Button>
              <Button href="/dedicated-team#roles" variant="ghost">All roles</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Two-column: what they do + sticky aside */}
      <section aria-labelledby="role-duties-title" className={sectionClass}>
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
          <div>
            <Reveal>
              <p className={eyebrowClass}>What they do</p>
              <h2 id="role-duties-title" className="mt-3 text-3xl font-semibold max-sm:text-[28px] sm:text-4xl">
                A {role.title.toLowerCase()} who <span className={gradientText}>ships with you.</span>
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--muted)]">{role.description}</p>
            </Reveal>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {role.responsibilities.map((item, index) => (
                <Reveal key={item} delay={(index % 2) * 0.05} className="h-full">
                  <li className="flex h-full items-start gap-3 rounded-2xl border border-slate-200 bg-[var(--surface)] p-4 text-sm leading-relaxed dark:border-white/10">
                    <span
                      aria-hidden
                      className="grid size-6 shrink-0 place-items-center rounded-full bg-teal-500/15 text-xs font-bold text-teal-600 dark:text-teal-300"
                    >
                      ✓
                    </span>
                    {item}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Reveal variant="scale">
              <Card tone="violet" hoverEffect="spotlight" className="!rounded-3xl sm:!p-8">
                <div className="flex items-center gap-3">
                  <RoleBadge />
                  <div>
                    <h3 className="text-lg font-semibold">{role.title}</h3>
                    <p className="text-xs text-[var(--muted)]">{category.title}</p>
                  </div>
                </div>
                <dl className="mt-6 space-y-3 border-t border-slate-200/70 pt-6 text-sm dark:border-white/10">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-[var(--muted)]">Experience</dt>
                    <dd className="font-semibold">{role.experience}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-[var(--muted)]">Pricing</dt>
                    <dd className="font-semibold">Fixed monthly</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-[var(--muted)]">Hire timeline</dt>
                    <dd className="font-semibold">{role.hireTimeline}</dd>
                  </div>
                </dl>
                <div className="mt-6 flex flex-wrap gap-2">
                  {role.skills.slice(0, 4).map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-violet-200/70 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <Button href="/contact" className="mt-6 w-full">Hire {short} →</Button>
                <p className="mt-3 text-center text-xs leading-relaxed text-[var(--muted)]">
                  Fixed monthly pricing. Swap or scale every month.
                </p>
              </Card>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* Skills chip cloud */}
      <section aria-labelledby="role-skills-title" className={`${sectionClass} !pt-0`}>
        <Reveal className="max-w-2xl">
          <p className={eyebrowClass}>Toolbox</p>
          <h2 id="role-skills-title" className="mt-3 text-3xl font-semibold max-sm:text-[28px] sm:text-4xl">
            Skills you can <span className={gradientText}>count on.</span>
          </h2>
        </Reveal>
        <div className="mt-8 flex flex-wrap gap-3">
          {role.skills.map((skill, index) => (
            <Reveal key={skill} delay={Math.min(index * 0.03, 0.3)}>
              <span className="inline-block rounded-2xl border border-sky-200 bg-[var(--surface)] px-5 py-3 text-sm font-semibold shadow-sm transition-colors hover:border-sky-400 dark:border-white/10 dark:hover:border-sky-400/50">
                {skill}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How every specialist is selected */}
      <section aria-labelledby="role-vetting-title" className={`${sectionClass} !pt-0`}>
        <Reveal className="max-w-2xl">
          <p className={eyebrowClass}>How we select</p>
          <h2 id="role-vetting-title" className="mt-3 text-3xl font-semibold max-sm:text-[28px] sm:text-4xl">
            Only 3% make it <span className={gradientText}>to your shortlist.</span>
          </h2>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            This {role.title.toLowerCase()} cleared the same 5-stage bar as everyone in our pool — before you ever see a profile.
          </p>
        </Reveal>
        <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {vettingProcess.map((v, index) => (
            <Reveal key={v.n} delay={Math.min(index * 0.05, 0.25)} className="h-full">
              <li className="h-full rounded-2xl border border-slate-200 bg-[var(--surface)] p-4 dark:border-white/10">
                <p className={`text-xs font-extrabold ${gradientText}`}>Stage {v.n}</p>
                <p className="mt-1.5 text-sm font-bold">{v.title}</p>
                <p className="mt-2 inline-block rounded-lg bg-sky-500/10 px-2.5 py-1 text-[11px] font-bold text-sky-700 dark:text-sky-300">
                  {v.stat}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
        <Reveal delay={0.1}>
          <Link
            href="/dedicated-team#selection"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-violet-600 hover:underline dark:text-violet-300"
          >
            See the full selection process →
          </Link>
        </Reveal>
      </section>

      {/* Related roles */}
      <section aria-labelledby="related-roles-title" className={`${sectionClass} !pt-0`}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className={eyebrowClass}>Keep building the pod</p>
            <h2 id="related-roles-title" className="mt-3 text-2xl font-semibold max-sm:text-[28px] sm:text-3xl">
              Related roles.
            </h2>
          </div>
          <Link
            href="/dedicated-team#roles"
            className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold transition-colors hover:border-sky-400 hover:text-sky-600 dark:border-white/15"
          >
            All roles →
          </Link>
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {related.map((item) => (
            <Link
              key={item.slug}
              href={`/dedicated-team/${item.slug}`}
              className="group rounded-2xl border border-slate-200 bg-[var(--surface)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#8b5cf680] hover:shadow-[0_16px_30px_-18px_#0f172a50] dark:border-white/10"
            >
              <div className="flex items-center justify-between">
                <span aria-hidden className="grid size-9 place-items-center rounded-xl border border-sky-400/25 bg-gradient-to-br from-sky-500/15 to-violet-500/15">
                  <svg viewBox="0 0 12 12" className="size-2.5 text-sky-500" fill="currentColor">
                    <circle cx="6" cy="6" r="5" />
                  </svg>
                </span>
                <span aria-hidden className="text-violet-500 transition-transform duration-300 group-hover:translate-x-1">↗</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.tagline}</p>
              <p className="mt-4 text-xs font-semibold text-violet-600 dark:text-violet-300">
                Senior-only · starts in {item.hireTimeline}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
