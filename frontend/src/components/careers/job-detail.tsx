"use client";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/common/page-hero";
import { Reveal } from "@/components/common/reveal";
import { CtaBanner } from "@/components/common/cta-banner";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toaster";
import { getJob } from "@/data/site";
import { api } from "@/lib/api";
import { rules } from "@/lib/validation";

type ApplyInputs = {
  name: string;
  email: string;
  phone: string;
  link: string;
  experience: string;
  coverNote: string;
};

const EXPERIENCE = ["0–1 years", "1–2 years", "2–4 years", "4–6 years", "6+ years"];

function ApplyForm({ jobSlug, jobTitle }: { jobSlug: string; jobTitle: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ApplyInputs>({ mode: "onBlur", defaultValues: { experience: "" } });
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (data: ApplyInputs) => {
    setServerError(null);
    try {
      await api.apply({ jobSlug, jobTitle, ...data });
      setSent(true);
      reset();
      toast(`Application sent for ${jobTitle}!`);
    } catch (e) {
      setServerError(e instanceof Error ? e.message : "Couldn't submit — please try again.");
    }
  };

  if (sent) {
    return (
      <div className="mt-3 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-5 text-center" role="status">
        <div className="mx-auto grid size-11 place-items-center rounded-full bg-emerald-500/15 text-xl text-emerald-500">✓</div>
        <h3 className="mt-3 font-bold text-emerald-600 dark:text-emerald-300">Application received!</h3>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Our hiring team replies within 5 days. Keep an eye on your inbox.
        </p>
        <Link href="/careers" className="mt-3 inline-block text-sm font-semibold text-sky-500 hover:underline">
          ← Browse more roles
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-3 space-y-3">
      {serverError && (
        <div role="alert" className="rounded-xl border border-rose-400/30 bg-rose-400/10 p-3 text-sm text-rose-500">
          {serverError}
        </div>
      )}
      <Input label="Full name" placeholder="Jane Cooper" autoComplete="name" error={errors.name?.message} {...register("name", rules.name)} />
      <Input label="Email" type="email" placeholder="you@email.com" autoComplete="email" error={errors.email?.message} {...register("email", rules.email)} />
      <Input label="Phone (optional)" type="tel" placeholder="+91 98765 43210" autoComplete="tel" error={errors.phone?.message} {...register("phone", rules.phone)} />
      <Input label="Portfolio / GitHub / LinkedIn" placeholder="https://…" autoComplete="url" error={errors.link?.message} {...register("link", rules.link)} />
      <div className="w-full space-y-1.5">
        <label htmlFor="experience" className="text-sm font-medium">Experience</label>
        <select
          id="experience"
          defaultValue=""
          {...register("experience", rules.experience)}
          className="w-full rounded-xl border border-slate-200 bg-white/70 px-4 py-3 text-sm outline-none transition-all dark:border-white/10 dark:bg-white/5"
        >
          <option value="" disabled>Select your experience</option>
          {EXPERIENCE.map((e) => (
            <option key={e} value={e}>{e}</option>
          ))}
        </select>
        {errors.experience && <p role="alert" className="text-xs font-medium text-rose-500">{errors.experience.message}</p>}
      </div>
      <Input label="Cover note (optional)" textarea placeholder="Why are you a great fit? 20+ characters…" error={errors.coverNote?.message} {...register("coverNote", rules.coverNote)} />
      <Button className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting…" : "Submit application →"}
      </Button>
    </form>
  );
}

export function JobDetail({ slug }: { slug: string }) {
  const job = getJob(slug);
  if (!job) notFound();

  return (
    <>
      <PageHero
        eyebrow={`${job.id} · ${job.team} · ${job.type}`}
        title={<>{job.title}</>}
        copy={`${job.location} · ${job.salary}`}
      />
      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 pb-8 sm:px-6 lg:grid-cols-3">
        {/* main */}
        <div className="min-w-0 space-y-5 lg:col-span-2">
          <Reveal>
            <Card className="h-auto w-full">
              <h2 className="font-bold">The role</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600 dark:text-slate-400">{job.description}</p>
            </Card>
          </Reveal>
          <Reveal delay={0.05}>
            <Card className="h-auto w-full">
              <h2 className="font-bold">What you&apos;ll do</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                {job.responsibilities.map((r) => (
                  <li key={r} className="flex gap-2"><span className="shrink-0 text-sky-500">→</span><span className="min-w-0">{r}</span></li>
                ))}
              </ul>
            </Card>
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="h-auto w-full">
              <h2 className="font-bold">What we&apos;re looking for</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                {job.requirements.map((r) => (
                  <li key={r} className="flex gap-2"><span className="shrink-0 text-emerald-400">✓</span><span className="min-w-0">{r}</span></li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>

        {/* sidebar — apply */}
        <Reveal delay={0.08} className="min-w-0">
          <div className="space-y-4 lg:sticky lg:top-24">
            <Card className="h-auto w-full">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">At a glance</h2>
              <dl className="mt-3 space-y-2 text-sm">
                {[["Team", job.team], ["Location", job.location], ["Type", job.type], ["Compensation", job.salary]].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-3">
                    <dt className="shrink-0 text-slate-500">{k}</dt>
                    <dd className="min-w-0 text-right font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
            </Card>
            <Card className="h-auto w-full">
              <h2 className="font-bold" id="apply">Apply for this role</h2>
              <ApplyForm jobSlug={job.slug} jobTitle={job.title} />
            </Card>
            <Link href="/careers" className="block text-center text-sm font-semibold text-sky-500 hover:underline">
              ← All open roles
            </Link>
          </div>
        </Reveal>
      </section>
      <CtaBanner />
    </>
  );
}
