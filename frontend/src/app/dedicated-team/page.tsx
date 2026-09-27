import type { Metadata } from "next";
import { DedicatedTeam } from "@/components/dedicated-team/dedicated-team";
import { siteMetadata } from "@/lib/metadata";

export const metadata: Metadata = siteMetadata({
  title: "Dedicated Team — Your Team Without the Hiring Pain | NainIT Solutions",
  description:
    "Hire senior developers, delivery leads, analysts and AI engineers in 48 hours. Monthly pods, part-time specialists and trial-to-hire — zero hiring fees.",
});

export default function DedicatedTeamPage() {
  return <DedicatedTeam />;
}
