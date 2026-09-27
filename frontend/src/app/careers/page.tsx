import type { Metadata } from "next";
import { Careers } from "@/components/careers/careers";
import { siteMetadata } from "@/lib/metadata";

export const metadata: Metadata = siteMetadata({
  title: "Careers — NainIT Solutions",
  description: "Join a senior-only, remote-first engineering team. Open roles in frontend, AI, design and DevOps.",
});

export default function CareersPage() {
  return <Careers />;
}
