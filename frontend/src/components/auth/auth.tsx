"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PageHero } from "@/components/common/page-hero";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toaster";
import { useAuth } from "@/context/AuthContext";
import { rules } from "@/lib/validation";

type LoginInputs = { email: string; password: string };

export function AdminLogin() {
  const [serverError, setServerError] = useState("");
  const { login } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInputs>({ mode: "onBlur" });

  const onSubmit = async (data: LoginInputs) => {
    setServerError("");
    try {
      await login(data.email, data.password);
      toast("Welcome back!");
      router.push("/dashboard");
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Unable to sign in. Please try again.");
    }
  };

  return (
    <>
      <PageHero eyebrow="Administration" copy="Sign in with your administrator account to manage NainIT inquiries." title={<>Admin <span className="bg-[linear-gradient(92deg,#38bdf8_0%,#8b5cf6_55%,#2dd4bf_100%)] bg-clip-text text-transparent">login.</span></>} />
      <section className="mx-auto w-full max-w-md px-4 pb-20 sm:px-6">
        <Card className="h-auto w-full">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            {serverError && <p role="alert" className="rounded-lg border border-rose-300 bg-rose-50 p-3 text-sm text-rose-700">{serverError}</p>}
            <Input label="Email" type="email" placeholder="admin@company.com" autoComplete="email" error={errors.email?.message} {...register("email", rules.email)} />
            <Input label="Password" type="password" placeholder="••••••••" autoComplete="current-password" error={errors.password?.message} {...register("password", rules.password)} />
            <Button disabled={isSubmitting} className="w-full">{isSubmitting ? "Signing in…" : "Sign in as admin →"}</Button>
          </form>
          <p className="mt-4 text-center text-sm text-slate-500">
            Administrator access only. <Link href="/" className="font-semibold text-sky-500 hover:underline">Back to website</Link>
          </p>
        </Card>
      </section>
    </>
  );
}

