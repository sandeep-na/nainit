import type { Metadata } from "next";
import { ScheduleCall } from "@/components/schedule-call/schedule-call";
import { siteMetadata } from "@/lib/metadata";

export const metadata: Metadata = siteMetadata({
  title: "Schedule a Call — NainIT Solutions",
  description: "Request a 30-minute introductory call with NainIT. Share your project and preferred time, and our team will follow up to confirm the details.",
  alternates: { canonical: "/schedule-call" },
});

export default function ScheduleCallPage() {
  return <ScheduleCall />;
}
