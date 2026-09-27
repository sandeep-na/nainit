"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { PageHero } from "@/components/common/page-hero";
import { Reveal } from "@/components/common/reveal";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toaster";
import { api } from "@/lib/api";
import { rules } from "@/lib/validation";

type ContactInputs = {
  name: string;
  email: string;
  company: string;
  message: string;
};

export function Contact() {
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInputs>({ mode: "onBlur" });

  const onSubmit = async (data: ContactInputs) => {
    setServerError("");
    try {
      await api.contact(data);
      toast("Message sent! We'll reply within 24 hours.");
      reset();
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Unable to send. Please try again.");
    }
  };

  return (
    <>
      <PageHero eyebrow="Contact" title={<>Let&apos;s talk about <span className="bg-[linear-gradient(92deg,#38bdf8_0%,#8b5cf6_55%,#2dd4bf_100%)] bg-clip-text text-transparent">your project.</span></>} copy="Fixed-scope proposal within 48 hours. No spam, no pushy sales calls." />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-20 sm:px-6 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <Card className="h-auto w-full">
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              {serverError && <p role="alert" className="rounded-lg border border-rose-300 bg-rose-50 p-3 text-sm text-rose-700">{serverError}</p>}
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Name" placeholder="Jane Cooper" autoComplete="name" error={errors.name?.message} {...register("name", rules.name)} />
                <Input label="Email" type="email" placeholder="jane@company.com" autoComplete="email" error={errors.email?.message} {...register("email", rules.email)} />
              </div>
              <Input label="Company (optional)" placeholder="Acme Inc." autoComplete="organization" {...register("company")} />
              <Input label="Project details" textarea placeholder="What are you building? Timeline? Budget range?" error={errors.message?.message} {...register("message", rules.message)} />
              <Button disabled={isSubmitting} className="w-full sm:w-auto">
                {isSubmitting ? "Sending…" : "Send message →"}
              </Button>
            </form>
          </Card>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-2">
          <div className="space-y-4">
            <Card>
              <h2 className="font-bold">Offices</h2>
              <ul className="mt-3 space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <li><strong className="text-current">HQ — Noida, India</strong><br />3rd Floor, Cyber Towers, Sector 62<br />hello@nainitsolutions.com<br />+91 120 456 7890</li>
                <li><strong className="text-current">US — Austin, TX</strong><br />801 Congress Ave, Suite 200<br />us@nainitsolutions.com</li>
              </ul>
            </Card>
            <Image src="/images/office-map.svg" alt="Office locations map" width={520} height={320} className="aspect-[16/10] w-full rounded-2xl border border-slate-200/70 object-cover dark:border-white/10" loading="lazy" />
          </div>
        </Reveal>
      </section>
    </>
  );
}
