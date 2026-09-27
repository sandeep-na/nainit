"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api, type CallRequest } from "@/lib/api";
import { rules } from "@/lib/validation";
import styles from "./schedule-call.module.css";

const zones = [
  ["Asia/Kolkata", "India — Kolkata (IST)"],
  ["Asia/Dubai", "UAE — Dubai"],
  ["Asia/Singapore", "Singapore"],
  ["Europe/London", "UK — London"],
  ["Europe/Berlin", "Europe — Berlin"],
  ["America/New_York", "US — New York"],
  ["America/Chicago", "US — Chicago"],
  ["America/Los_Angeles", "US — Los Angeles"],
  ["Australia/Sydney", "Australia — Sydney"],
  ["UTC", "Coordinated Universal Time (UTC)"],
];
const times = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];
const services = ["Web development", "Mobile app development", "AI & machine learning", "Cloud & DevOps", "UI/UX design", "Digital marketing", "Something else"];

function localDateTime(timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
  const value = (type: string) => parts.find((part) => part.type === type)?.value;
  return `${value("year")}-${value("month")}-${value("day")}T${value("hour")}:${value("minute")}`;
}

export function ScheduleCall() {
  const [serverError, setServerError] = useState("");
  const [submitted, setSubmitted] = useState<CallRequest | null>(null);
  const { register, handleSubmit, getValues, reset, formState: { errors, isSubmitting } } = useForm<CallRequest>({ mode: "onBlur", defaultValues: { timeZone: "Asia/Kolkata", phone: "", company: "" } });
  async function onSubmit(data: CallRequest) {
    setServerError("");
    try {
      await api.scheduleCall(data);
      setSubmitted(data);
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "We could not save your request. Please try again.");
    }
  }

  return <div className={styles.page}>
    <header className={styles.hero}>
      <Link href="/" className={styles.back}>← Back to home</Link>
      <div className={styles.eyebrow}><span /> LET’S BUILD SOMETHING GREAT</div>
      <h1>Schedule a call.<br /><span>Start something better.</span></h1>
      <p>A conversation about your ideas, your challenges, and the right next step. Tell us when works for you.</p>
    </header>
    <div className={styles.layout}>
      <aside className={styles.intro}>
        <div className={styles.icon} aria-hidden="true"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 11h18m-14 5 3 3 6-6"/></svg></div>
        <div className={styles.eyebrow}>YOUR NEXT CHAPTER STARTS HERE</div>
        <h2>Big ideas.<br /> A simple first call.</h2>
        <p>Meet the NainIT team and explore how we can help turn your next project into something people love to use.</p>
        <div className={styles.callFacts}><span>◷ <strong>30 minutes</strong></span><span>↗ <strong>Online introduction</strong></span><span>✓ <strong>No obligation</strong></span></div>
        <h3>What we’ll cover</h3>
        <ol className={styles.agenda}>
          <li><span>01</span><div><strong>Your vision</strong><p>What you’re building and the problem you want to solve.</p></div></li>
          <li><span>02</span><div><strong>The possibilities</strong><p>Technology, design, scope, and the approach that fits.</p></div></li>
          <li><span>03</span><div><strong>A clear next step</strong><p>Priorities, timelines, and where to go from here.</p></div></li>
        </ol>
        <div className={styles.emailNote}>Prefer to write it down?<a href="mailto:hello@nainitsolutions.com">hello@nainitsolutions.com ↗</a></div>
      </aside>
      <section className={styles.formCard} aria-labelledby="schedule-title">
        {submitted ? <div className={styles.success} role="status">
          <span className={styles.successIcon} aria-hidden="true">✓</span>
          <div className={styles.eyebrow}>REQUEST RECEIVED</div>
          <h2 id="schedule-title">Let’s take the next step.</h2>
          <p>Thanks, {submitted.name}. Your call request has been saved. Our team will contact you at <strong>{submitted.email}</strong> to confirm the time and share meeting details.</p>
          <dl className={styles.summary}><div><dt>Preferred date</dt><dd>{new Date(`${submitted.preferredDate}T12:00:00Z`).toLocaleDateString("en-GB", { dateStyle: "long", timeZone: "UTC" })}</dd></div><div><dt>Preferred time</dt><dd>{submitted.preferredTime} · {submitted.timeZone}</dd></div><div><dt>Topic</dt><dd>{submitted.service}</dd></div></dl>
          <p className={styles.note}>This is a request, not a confirmed calendar booking. Please wait for our team’s confirmation.</p>
          <div className={styles.successActions}><Button href="/portfolio">Explore our work ↗</Button><button type="button" onClick={() => { setSubmitted(null); reset(); }}>Submit another request</button></div>
        </div> : <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={styles.formHeading}><div><div className={styles.eyebrow}>LET’S FIND A TIME</div><h2 id="schedule-title">Schedule Call With Us</h2></div><span>30 min</span></div>
          <p className={styles.formDescription}>Choose a preferred time and tell us a little about yourself. Fields marked * are required.</p>
          <fieldset disabled={isSubmitting} className={styles.fieldset}>
            <legend><span>1</span> Your preferred time</legend>
            <div className={styles.fieldGrid}>
              <Input label="Preferred date *" type="date" error={errors.preferredDate?.message} {...register("preferredDate", { required: "Choose your preferred date.", validate: (date) => /^\d{4}-\d{2}-\d{2}$/.test(date) && date >= localDateTime(getValues("timeZone")).slice(0, 10) || "Choose today or a future date." })} onFocus={(event) => { event.currentTarget.min = localDateTime(getValues("timeZone")).slice(0, 10); }} />
              <div className={styles.field}><label htmlFor="call-time-zone">Time zone *</label><select id="call-time-zone" {...register("timeZone", { required: true })}>{zones.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></div>
            </div>
            <fieldset className={styles.timeFieldset} aria-describedby={errors.preferredTime ? "call-time-error" : "call-time-hint"}><legend>Preferred start time *</legend><div className={styles.timeGrid}>{times.map((time) => <label key={time} className={styles.timeSlot}><input type="radio" value={time} {...register("preferredTime", { required: "Choose a preferred start time.", validate: (time) => `${getValues("preferredDate")}T${time}` > localDateTime(getValues("timeZone")) || "That time has passed in your selected time zone. Choose a later time." })} /><span>{time}</span></label>)}</div>{errors.preferredTime ? <p id="call-time-error" role="alert" className={styles.error}>{errors.preferredTime.message}</p> : <p id="call-time-hint" className={styles.note}>24-hour times in your selected time zone. Availability is confirmed by our team.</p>}</fieldset>
          </fieldset>
          <fieldset disabled={isSubmitting} className={styles.fieldset}>
            <legend><span>2</span> A little about you</legend>
            <div className={styles.fieldGrid}><Input label="Full name *" autoComplete="name" placeholder="Your full name" maxLength={80} error={errors.name?.message} {...register("name", rules.name)} /><Input label="Email address *" type="email" autoComplete="email" placeholder="you@company.com" maxLength={254} error={errors.email?.message} {...register("email", rules.email)} /><Input label="Company (optional)" autoComplete="organization" placeholder="Your company" maxLength={120} {...register("company")} /><Input label="Phone (optional)" type="tel" autoComplete="tel" placeholder="Include country code" error={errors.phone?.message} {...register("phone", rules.phone)} /></div>
            <div className={styles.field}><label htmlFor="call-service">What would you like to discuss? *</label><select id="call-service" aria-invalid={!!errors.service} aria-describedby={errors.service ? "call-service-error" : undefined} {...register("service", { required: "Select a topic for your call." })}><option value="">Choose a topic</option>{services.map((service) => <option key={service}>{service}</option>)}</select>{errors.service && <p id="call-service-error" role="alert" className={styles.error}>{errors.service.message}</p>}</div>
            <Input label="A little about your project *" textarea placeholder="What are you working on? Tell us your goals, timeline, or the challenge you want to solve." maxLength={2000} error={errors.message?.message} {...register("message", rules.message)} />
          </fieldset>
          {serverError && <p role="alert" className={styles.serverError}>{serverError}</p>}
          <Button type="submit" disabled={isSubmitting} className="mt-6 w-full disabled:cursor-wait disabled:opacity-60">{isSubmitting ? "Sending your request…" : "Request a call →"}</Button>
          <p className={styles.submitNote}>We’ll use these details to follow up on your call request. Your preferred time is subject to confirmation.</p>
        </form>}
      </section>
    </div>
    <section className={styles.nextSteps} aria-labelledby="next-title"><div className={styles.eyebrow}>FROM HELLO TO WHAT’S NEXT</div><h2 id="next-title">A conversation, then a clear direction.</h2><div>{[["Send your request", "Choose a time and share what you have in mind."], ["We confirm the details", "Our team follows up by email to agree on a time and meeting link."], ["Let’s talk possibilities", "Bring your questions. We’ll explore the next step together."]].map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
  </div>;
}
