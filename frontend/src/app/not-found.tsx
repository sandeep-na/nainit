import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden pt-16">
      <div className="bg-[linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_90%_70%_at_50%_30%,black_40%,transparent_100%)] absolute inset-0" aria-hidden />
      <div className="relative px-4 text-center">
        <div className="font-display text-8xl font-extrabold sm:text-9xl">
          <span className="bg-[linear-gradient(92deg,#38bdf8_0%,#8b5cf6_55%,#2dd4bf_100%)] bg-clip-text text-transparent">404</span>
        </div>
        <h1 className="mt-4 text-2xl font-bold">This page took a wrong turn.</h1>
        <p className="mx-auto mt-2 max-w-md text-slate-600 dark:text-slate-400">
          The link may be broken or the page moved. Let&apos;s get you back to something useful.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/" className="active:scale-[0.96] rounded-full bg-gradient-to-r from-sky-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white">
            Back home
          </Link>
          <Link href="/contact" className="active:scale-[0.96] rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold dark:border-white/15">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
