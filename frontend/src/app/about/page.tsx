import type { Metadata } from "next";
import { About } from "@/components/about/about";
import { siteMetadata } from "@/lib/metadata";

export const metadata: Metadata = siteMetadata({
  title: "About — NainIT Solutions",
  description: "Senior-only team of engineers and designers. Our story, mission, leadership and 10-year timeline.",
});

export default function AboutPage() {
  return <About />;
}
