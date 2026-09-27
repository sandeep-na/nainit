import { PageLoader } from "@/components/ui/toaster";

export default function Loading() {
  return (
    <div className="pt-24">
      <PageLoader />
      <div className="mx-auto grid max-w-7xl gap-5 px-4 pb-16 sm:px-6 md:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="animate-pulse bg-slate-400/20 aspect-[16/10] rounded-2xl" aria-hidden />
        ))}
      </div>
    </div>
  );
}
