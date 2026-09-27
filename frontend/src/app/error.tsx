"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <section className="flex min-h-[70vh] items-center justify-center pt-16">
      <div className="px-4 text-center">
        <h1 className="text-3xl font-bold">Something went wrong.</h1>
        <p className="mt-2 text-sm text-slate-500">{error.message || "An unexpected error occurred."}</p>
        <button
          onClick={reset}
          className="active:scale-[0.96] mt-6 rounded-full bg-gradient-to-r from-sky-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white"
        >
          Try again
        </button>
      </div>
    </section>
  );
}
